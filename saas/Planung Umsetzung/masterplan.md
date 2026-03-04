# Masterplan: GCB SaaS Beschwerdemanagement

Konsolidiertes Destillat aus `codex_plan.md`, `Gemini_Plan.md` und `son_plan.md`.

---

## 1. Leitprinzip

**"Code is Shared, Data is Isolated."**

- Es gibt genau ein Set operativer n8n-Workflows (den "Core").
- Nichts ist hardcoded: Kategorien, Impact-Regeln, Prompts, Credentials werden zur Laufzeit pro Tenant geladen.
- Ein Bugfix oder Prompt-Update wirkt sofort fuer alle Tenants.
- Jeder Tenant ist auf Datenbankebene strikt isoliert (Schema + dedizierter DB-User).

---

## 2. Ausgangslage

| Parameter | Wert |
|---|---|
| Server | `n8n.gcbavaria.com` (AMD EPYC, 2 Kerne, 3,73 GiB RAM) |
| n8n | v2.4.8, aktuell SQLite-Backend |
| Container | 17 Docker-Container, kein `mem_limit` bei 14 davon |
| Datenbank | PostgreSQL 16 (pgvector), DBs: `GlobalCollectiveBv`, `relational_data` |
| Reverse Proxy | Caddy |
| Sicherheitsproblem | Port 5678 oeffentlich erreichbar (unverschluesselt) |

---

## 3. Zielarchitektur

```
Internet
    |
    v
Caddy (Port 80/443)
    |-- n8n.gcbavaria.com       -> n8n-customer  (Data Plane)
    '-- internal.gcbavaria.de   -> n8n-internal  (Control Plane)
                                   [Tailscale-only]

n8n-customer (Data Plane)           n8n-internal (Control Plane)
|-- Twilio Webhook Intake            |-- Tenant Provisioning
|-- Ultravox Voice Routing           |-- Workflow Deployment / Rollback
|-- Summary Extraction               |-- Health Monitoring
'-- LLM Klassifikation               '-- Billing Automation
         |                                    |
         '----------------+-------------------'
                          v
               PostgreSQL (postgres-db)
               |-- DB: n8n_main            (n8n-Backend)
               '-- DB: GlobalCollectiveBv
                   |-- Schema: internal       (Control Plane Metadaten)
                   |-- Schema: tenant_0       (eigene Beschwerden)
                   '-- Schema: tenant_<id>    (pro Kunde)
```

### Control Plane (`n8n-internal`)

- Nicht oeffentlich erreichbar (nur Tailscale/VPN/SSH)
- Aufgaben: Provisioning, Workflow-Versionierung, Monitoring, Billing
- Kein Zugriff fuer externe Webhooks

### Data Plane (`n8n-customer`)

- Oeffentliche Endpunkte fuer Twilio, Chatbots, Formulare
- Fuehrt ausschliesslich Core-Flows aus
- Kein Zugriff auf Root-DB oder globale System-Konfiguration

---

## 4. Verbindliche Interfaces

### 4.1 Tenant-Resolution (Ingress)

Jeder eingehende Request muss `tenant_id` deterministisch aufloesen:
- Twilio-Nummer -> Tenant-Mapping (`internal.tenant_mappings`)
- Webhook-Header / Token
- Chat-Channel-ID

### 4.2 Tenant-Config (Schema `internal`)

Pflichtfelder in `internal.tenant_config`:

| Key | Typ | Beschreibung |
|---|---|---|
| `tenant_id` | INT | FK auf `internal.tenants` |
| `status` | TEXT | `active`, `suspended`, `onboarding` |
| `twilio_mapping` | JSONB | Nummern-zu-Tenant-Zuordnung |
| `asset_model` | JSONB | Standort-/Geraetehierarchie |
| `impact_matrix` | JSONB | Kategorien -> Schweregrad-Mapping |
| `category_rules` | JSONB | Erlaubte Kategorien + Labels |
| `escalation_rules` | JSONB | SLA-Zeiten, Eskalationsstufen |
| `custom_system_prompt` | TEXT | Tenant-spezifischer LLM-Prompt-Kontext |

Beispiel Config-Payload (zur Laufzeit geladen):

```json
{
  "tenant_id": "C_001",
  "type": "parkhaus",
  "impact_rules": {
    "schranke_defekt": "KRITISCH",
    "ticket_automat_nimmt_kein_bargeld": "MITTEL"
  },
  "custom_system_prompt": "Du sprichst mit genervten Autofahrern. Sei extrem kurz angebunden und loesungsorientiert."
}
```

### 4.3 Incident-Datensatz (pro Tenant-Schema)

Pflichtfelder:
- `id` (PK)
- `tenant_id`
- `source` (`call`, `chat`, `form`)
- `severity` (`Hoch`, `Mittel`, `Niedrig`)
- `category`
- `needs_human_review` (BOOLEAN)
- `payload_jsonb` (Rohdaten)
- `created_at` (TIMESTAMPTZ)

---

## 5. Standard-Datenfluss

```
1. Event empfangen (Webhook / Twilio Call / Chat)
2. Tenant aufloesen (Telefonnummer / Header / Channel)
3. Tenant-Config aus internal-Schema laden
4. Tenant-DB-Credentials setzen (dynamisch, nicht Root)
5. Core-Workflow ausfuehren:
   a. Transkription / Summary Extraction (Ultravox)
   b. Klassifikation (OpenAI, tenant-spezifische Kategorien)
   c. Impact-Bewertung (OpenAI, tenant-spezifische Matrix)
   d. Daten konsolidieren
6. Ergebnis in Tenant-Schema speichern
7. Notification / Eskalation ausloesen (Email, Slack, etc.)
```

---

## 6. LLM-Sicherheitsregeln (nicht verhandelbar)

Diese Regeln gelten ab Tag 1 und sind nicht optional:

1. **Kein freier DB-Zugriff fuer LLM-Nodes.** LLM-Knoten erhalten niemals Root-Credentials.
2. **Tenant-gescopte Queries.** Jeder DB-Zugriff nutzt den dedizierten Tenant-DB-User.
3. **Prompt-Firewall.** Nur explizit whitelisted Felder duerfen in den LLM-Prompt. Kein Durchreichen von Rohdaten ohne Filterung.
4. **Dynamische Credentials.** DB-Verbindung wird zur Laufzeit anhand `tenant_id` aufgebaut — nie mit globalem User.
5. **Audit-Logging.** Prompt-/Response-Metadaten (Tokens, Latenz, Modell, Tenant) werden geloggt. Keine sensitiven Rohdaten im Log.
6. **Blast-Radius-Garantie.** Selbst bei LLM-Halluzination kann technisch nur auf das Schema des aktuellen Tenants zugegriffen werden.

---

## 7. Umsetzungsphasen

### Phase 0 — Server-Haertung (sofort, vor allem anderen)

| Aufgabe | Details | Aufwand |
|---|---|---|
| Port 5678 sperren | `ufw deny 5678` + docker-compose: `"127.0.0.1:5678:5678"` | 10 Min |
| RAM-Limits setzen | `n8n: 1536m`, `postgres: 512m`, `caddy: 128m`, `nocodb: 512m`, `whatsapp-api: 256m` | 30 Min |
| Unhealthy Container debuggen | `docker logs dashboard-worker` etc. | 1h |
| RAM-Upgrade beauftragen | Hoster-Aktion, Ziel: min. 8 GB | extern |

### Phase 1 — n8n auf PostgreSQL migrieren

1. `CREATE DATABASE n8n_main;`
2. `CREATE USER n8n_user WITH PASSWORD '<sicher>';`
3. n8n Environment setzen:
   ```bash
   DB_TYPE=postgresdb
   DB_POSTGRESDB_HOST=postgres-db
   DB_POSTGRESDB_DATABASE=n8n_main
   DB_POSTGRESDB_USER=n8n_user
   DB_POSTGRESDB_PASSWORD=<sicher>
   ```
4. Container neu starten — n8n migriert automatisch
5. SQLite-Backup sichern (`/home/node/.n8n/database.sqlite`)

### Phase 2 — Tenant-Datenschicht anlegen

```sql
-- Schemas
CREATE SCHEMA internal;
CREATE SCHEMA tenant_0;

-- Tenant-Registry
CREATE TABLE internal.tenants (
    id           SERIAL PRIMARY KEY,
    slug         TEXT UNIQUE NOT NULL,
    name         TEXT NOT NULL,
    status       TEXT NOT NULL DEFAULT 'onboarding',
    twilio_number TEXT,
    schema_name  TEXT NOT NULL,
    created_at   TIMESTAMPTZ DEFAULT now()
);

-- Tenant-Config (Key-Value mit JSONB)
CREATE TABLE internal.tenant_config (
    tenant_id    INT REFERENCES internal.tenants(id),
    key          TEXT NOT NULL,
    value        JSONB NOT NULL,
    PRIMARY KEY (tenant_id, key)
);

-- Tenant-Mappings (Telefonnummer -> Tenant)
CREATE TABLE internal.tenant_mappings (
    mapping_key  TEXT PRIMARY KEY,
    tenant_id    INT REFERENCES internal.tenants(id),
    channel      TEXT NOT NULL DEFAULT 'phone'
);

-- Dedizierter DB-User pro Tenant
CREATE USER tenant_0_user WITH PASSWORD '<sicher>';
GRANT USAGE ON SCHEMA tenant_0 TO tenant_0_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA tenant_0 TO tenant_0_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA tenant_0
    GRANT ALL PRIVILEGES ON TABLES TO tenant_0_user;
```

### Phase 3 — Workflows tenant-aware machen

Bestehende Workflows importieren:
- `workflows/Beschwerden Analyse Test.json`
- `workflows/Twillio zu Ultravox.json`
- `workflows/Zusammenfassung Daten Auswahl.json`

Jeden Workflow erweitern:
1. **Tenant-Resolver** als erster Node nach Trigger
2. **Config-Fetch** aus `internal.tenant_config`
3. **Config-Injection** in LLM-System-Prompts (Kategorien, Impact-Matrix, Ton)
4. **DB-Credential-Switch** auf Tenant-spezifischen User

Regel: Kategorien, Impact-Matrix, Asset-Hierarchie leben in der DB — nie im Workflow-Code.

### Phase 4 — Control Plane aufsetzen

```yaml
n8n-internal:
  image: docker.n8n.io/n8nio/n8n:latest
  environment:
    - N8N_HOST=internal.gcbavaria.de
    - WEBHOOK_URL=https://internal.gcbavaria.de/
    - DB_TYPE=postgresdb
    - DB_POSTGRESDB_DATABASE=n8n_main
    - DB_POSTGRESDB_SCHEMA=n8n_internal
  networks:
    - internal-net
  mem_limit: 1024m
```

Caddy-Routing: `internal.gcbavaria.de` nur via Tailscale-Subnet erreichbar.

### Phase 5 — Provisioning-Automatisierung

n8n-Workflow in `n8n-internal` fuer vollautomatisches Onboarding:

```
Trigger: Manuell / Webhook / CRM-Event ("Deal Won")
  -> PostgreSQL Schema erstellen
  -> DB-User anlegen + Rechte vergeben
  -> Tenant in internal.tenants registrieren
  -> Twilio-Nummer kaufen/mappen
  -> Standard-Config (Kategorien, Impact-Rules) einspielen
  -> n8n-Credentials fuer neuen Tenant anlegen
  -> Smoke-Test Webhook ausloesen
  -> Bestaetigungs-Notification (Slack/Mail)
```

### Phase 6 — Hardening & Observability

- Healthchecks fuer alle kritischen Container
- Retry- und Dead-Letter-Muster fuer fehlgeschlagene Workflows
- Versionierter Workflow-Rollout mit Rollback-Option
- Monitoring: Ingress, DB-Verbindungen, LLM-Latenz, Error-Rate
- Alerting bei Tenant-Isolation-Verletzung oder OOM

---

## 8. Lastabschaetzung

| Szenario | CPU Load | RAM | Bewertung |
|---|---|---|---|
| Idle (aktuell) | 0,04 | 2,6 GB | OK |
| 5 parallele Anrufe | ~0,3 | ~3,5 GB | OK bei 8 GB |
| 15 parallele Anrufe | ~0,8 | ~5,5 GB | OK bei 8 GB |
| 20+ parallele Anrufe | ~1,2 | ~7 GB | Grenze |
| >20 parallele Anrufe | Bottleneck | OOM-Risiko | Upgrade noetig |

Pro eingehender Anruf: 3-5 n8n-Executions (Webhook + Ultravox + LLM-Klassifikation + DB + Notification).

---

## 9. Skalierungsschwellen

| Schwelle | Massnahme |
|---|---|
| Tenant Zero live | Phase 0-3 abgeschlossen |
| 1. externer Kunde | Phase 4-5 (Control Plane + Provisioning) |
| 3-5 Kunden | RAM-Monitor, n8n Queue Mode + Redis evaluieren |
| >5 Kunden | Dedizierter Server (4 Kerne, 16 GB RAM) |
| >20 Kunden | Cell-Architektur, Terraform + GitOps |
| >50 Kunden | Multi-Region, HA, dedizierte DB fuer Premium-Tenants |

Skalierungspfad: **Vertical vor Horizontal.** Queue Mode (Redis) erst bei CPU/RAM-Engpass aktivieren.

---

## 10. Akzeptanzkriterien (Muss-Kriterien)

- [ ] Tenant A kann nie Daten von Tenant B lesen oder schreiben
- [ ] Gleicher Input wird nach jeweiliger tenant-spezifischer Impact-Matrix bewertet
- [ ] Onboarding erzeugt einen voll funktionsfaehigen Tenant ohne manuelle Nacharbeit
- [ ] Workflow-Update ist kontrolliert ausrollbar und rollback-faehig
- [ ] Kritische Pfade (Ingress, DB, LLM, Notification) sind monitoring-faehig
- [ ] LLM-Nodes haben keinen Root-DB-Zugriff
- [ ] Port 5678 ist nicht oeffentlich erreichbar
- [ ] Alle Container haben definierte RAM-Limits

---

## 11. Scope-Grenzen (explizit Out of Scope)

- Vollstaendiges Kundenportal / Self-Service UI
- Multi-Region / High-Availability Architektur
- Finales Billing-Produkt mit Rechnungslauf
- Dedizierte DB-per-Tenant (bleibt optionales Enterprise-Upgrade)

---

## 12. Sofortmassnahmen (Prioritaet)

1. **Port 5678 schliessen** — sofort, 10 Minuten
2. **RAM-Limits in docker-compose setzen** — 30 Minuten
3. **Unhealthy Container untersuchen** — 1 Stunde
4. **RAM-Upgrade beauftragen** — Hoster-Aktion
5. **n8n auf PostgreSQL migrieren** — nach RAM-Upgrade
6. **Tenant-Schemas anlegen** + Workflows tenant-aware machen

---

## Quellen

- `codex_plan.md`: Interface-Definitionen, LLM-Sicherheitsregeln, Akzeptanzkriterien
- `Gemini_Plan.md`: Architekturprinzip, Config-Injection, Skalierungsstrategie
- `son_plan.md`: Infrastruktur-Realitaet, operative Phasen, SQL/Docker-Snippets, Lastabschaetzung
