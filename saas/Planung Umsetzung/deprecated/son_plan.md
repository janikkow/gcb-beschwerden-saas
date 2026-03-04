# SaaS-Infrastrukturplan: Beschwerdemanagement auf bestehendem Server

## Ausgangslage

**Server:** `n8n.gcbavaria.com` (AMD EPYC, 2 Kerne, 3,73 GiB RAM)
**Bestehend:** 1x n8n v2.4.8 (SQLite), 17 Docker-Container, PostgreSQL (pgvector/pg16), Caddy als Reverse Proxy
**Ziel:** Multi-tenant Beschwerdemanagement SaaS — Tenant Zero zuerst, dann externe Kunden

---

## Kritische Voraussetzungen (vor erstem Kunden)

### 1. RAM-Upgrade (Kritisch)
Aktuell: 3,73 GiB RAM, 1 GB Swap aktiv bei Idle-Betrieb.
Ziel: **Minimum 8 GB RAM**

Begründung: Jeder eingehende Anruf erzeugt 3–5 n8n-Executions (Webhook + Ultravox-Session + LLM-Klassifikation + DB-Schreibzugriff). n8n allein kann bei 5 parallelen Calls auf 800 MB+ steigen. Bei 8 GB RAM: 15–20 parallele Calls ohne OOM-Risiko.

### 2. n8n auf PostgreSQL-Backend migrieren (Hoch)

Aktuell nutzt n8n SQLite. SQLite sperrt die gesamte DB bei Schreibzugriffen — bei parallelen Executions ein Bottleneck.

```bash
# In n8n docker-compose.yml / Environment:
DB_TYPE=postgresdb
DB_POSTGRESDB_HOST=postgres-db
DB_POSTGRESDB_DATABASE=n8n_main
DB_POSTGRESDB_USER=n8n_user
DB_POSTGRESDB_PASSWORD=<sicheres-passwort>
```

Neue Datenbank `n8n_main` in der bestehenden PostgreSQL-Instanz anlegen — getrennt von `GlobalCollectiveBv` und `relational_data`.

### 3. RAM-Limits für alle Container setzen (Hoch)

14 von 17 Containern haben kein `mem_limit`. Ein entlaufener Workflow killt den ganzen Server.

```yaml
# Empfohlene Limits (angepasst auf 8 GB Ziel-RAM):
n8n:          mem_limit: 1536m   # war: unlimited
postgres-db:  mem_limit: 512m    # war: unlimited
caddy:        mem_limit: 128m    # war: unlimited
nocodb:       mem_limit: 512m    # war: unlimited
whatsapp-api: mem_limit: 256m    # war: unlimited
```

### 4. Port 5678 auf localhost sperren (Hoch)

n8n ist aktuell unverschlüsselt direkt auf Port 5678 erreichbar — parallel zu Caddy/TLS.

```bash
# UFW-Regel (oder iptables):
ufw deny 5678
# oder in docker-compose.yml ports ändern von:
# "5678:5678"  →  "127.0.0.1:5678:5678"
```

---

## Zielarchitektur auf dem bestehenden Server

```
Internet
    │
    ▼
Caddy (Port 80/443)
    ├── n8n.gcbavaria.com       → n8n-customer (Data Plane, bestehend)
    └── internal.gcbavaria.de   → n8n-internal (Control Plane, NEU)
                                   [+ Tailscale-only Zugriffsregel]

n8n-customer (Data Plane)           n8n-internal (Control Plane)
├── Twilio Webhook Intake            ├── Tenant Provisioning
├── Ultravox Voice Routing           ├── Health Monitoring
├── Summary Extraction               └── Billing Automation
└── LLM Klassifikation
         │                                    │
         └──────────────┬─────────────────────┘
                        ▼
              PostgreSQL (bestehend: postgres-db)
              ├── DB: n8n_main          (n8n-Backend, NEU)
              └── DB: GlobalCollectiveBv (bestehend)
                  ├── Schema: internal      (Control Plane, NEU)
                  ├── Schema: tenant_0      (eigene Beschwerden, NEU)
                  └── Schema: tenant_a      (Kunde A, später)
```

---

## Implementierungsphasen

### Phase 0 — Server-Härtung (sofort, vor allem anderen)

| Aufgabe | Befehl / Datei |
|---|---|
| RAM-Upgrade | Hoster-Aktion |
| Port 5678 sperren | `ufw deny 5678` + `docker-compose.yml` anpassen |
| RAM-Limits setzen | `docker-compose.yml` aller Dienste |
| Unhealthy Container debuggen | `docker logs dashboard-worker` |

### Phase 1 — n8n auf PostgreSQL migrieren

1. Neue DB anlegen: `CREATE DATABASE n8n_main;`
2. DB-User anlegen: `CREATE USER n8n_user WITH PASSWORD '...';`
3. n8n Environment-Variablen setzen (siehe oben)
4. n8n-Container neu starten — n8n migriert Schema automatisch
5. SQLite-Backup aufbewahren (`/home/node/.n8n/database.sqlite`)

### Phase 2 — PostgreSQL Tenant-Struktur anlegen

```sql
-- Schemas anlegen
CREATE SCHEMA internal;
CREATE SCHEMA tenant_0;

-- Tenant-Registry in internal
CREATE TABLE internal.tenants (
    id          SERIAL PRIMARY KEY,
    slug        TEXT UNIQUE NOT NULL,       -- 'tenant_0', 'tenant_a'
    name        TEXT NOT NULL,
    twilio_number TEXT,
    schema_name TEXT NOT NULL,
    created_at  TIMESTAMPTZ DEFAULT now()
);

-- Tenant-Config (Asset-Hierarchie, Impact-Matrix, Kategorien)
CREATE TABLE internal.tenant_config (
    tenant_id   INT REFERENCES internal.tenants(id),
    key         TEXT NOT NULL,
    value       JSONB NOT NULL,
    PRIMARY KEY (tenant_id, key)
);

-- Dedizierter DB-User pro Tenant
CREATE USER tenant_0_user WITH PASSWORD '...';
GRANT USAGE ON SCHEMA tenant_0 TO tenant_0_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA tenant_0 TO tenant_0_user;
```

### Phase 3 — Workflows importieren & tenant-aware machen

Bestehende Workflows importieren:
- `workflows/Beschwerden Analyse Test.json`
- `workflows/Twillio zu Ultravox.json`
- `workflows/Zusammenfassung Daten Auswahl.json`

Jeder Workflow bekommt als ersten Node einen **Tenant-Resolver**:
1. Tenant-ID aus Twilio-Nummer / Webhook-Header extrahieren
2. Tenant-Config aus `internal.tenant_config` laden
3. Config in Workflow-Context injizieren (für LLM-System-Prompt)

Config vs. Code-Prinzip: Kategorien, Impact-Matrix, Asset-Hierarchie leben in der DB — nie im Workflow-Code.

### Phase 4 — Zweite n8n-Instanz als Control Plane

Neue `docker-compose.yml` (oder Service in bestehender):

```yaml
n8n-internal:
  image: docker.n8n.io/n8nio/n8n:latest
  environment:
    - N8N_HOST=internal.gcbavaria.de
    - WEBHOOK_URL=https://internal.gcbavaria.de/
    - DB_TYPE=postgresdb
    - DB_POSTGRESDB_DATABASE=n8n_main
    - DB_POSTGRESDB_SCHEMA=n8n_internal
    # Tailscale-Only: kein public routing
  networks:
    - internal-net
  mem_limit: 1024m
```

Caddy-Routing so konfigurieren, dass `internal.gcbavaria.de` nur via Tailscale-IP erreichbar ist (ACL auf Tailscale-Subnet-Range).

### Phase 5 — Provisioning-Automatisierung

Ein n8n-Workflow in `n8n-internal` übernimmt das vollständige Tenant-Onboarding:

```
Trigger: Manuell / Webhook
  → Schema erstellen (PostgreSQL)
  → DB-User anlegen + Rechte vergeben
  → Tenant in internal.tenants registrieren
  → Twilio-Nummer zu Tenant mappen
  → n8n-Credentials für neuen Tenant anlegen
  → Test-Webhook auslösen (Smoke Test)
  → Bestätigungs-Slack/Mail
```

---

## Lastabschätzung

| Szenario | CPU | RAM | Bewertung |
|---|---|---|---|
| Idle (aktuell) | 0,04 Load | 2,6 GB | OK |
| 5 parallele Anrufe | ~0,3 Load | ~3,5 GB | OK bei 8 GB |
| 15 parallele Anrufe | ~0,8 Load | ~5,5 GB | OK bei 8 GB |
| 20+ parallele Anrufe | ~1,2 Load | ~7 GB | Grenze erreicht |
| >20 parallele Anrufe | Bottleneck | OOM-Risiko | Dedizierter Server nötig |

**Fazit:** Mit 8 GB RAM trägt dieser Server problemlos die ersten 3–5 Kunden (realistisch: max. 5–10 gleichzeitige Anrufe pro Tenant). Für >5 produktive Kunden → dedizierter SaaS-Server oder Server-Upgrade auf 4 Kerne / 16 GB.

---

## Skalierungsschwellen & nächste Schritte

| Schwelle | Maßnahme |
|---|---|
| Tenant Zero live | Phase 0–3 abgeschlossen |
| 1. externer Kunde | Phase 4–5 abgeschlossen (Control Plane + Provisioning) |
| 3–5 Kunden | RAM-Monitor einrichten, n8n Queue Mode + Redis prüfen |
| >5 Kunden | Dedizierter SaaS-Server (4 Kerne, 16 GB RAM) |
| >20 Kunden | Terraform + GitOps (Plan C), Cell-Architektur planen |

---

## Sofortmaßnahmen (Priorität-Reihenfolge)

1. **Port 5678 schließen** — 10 Minuten, sofort
2. **RAM-Limits in docker-compose setzen** — 30 Minuten
3. **Unhealthy Container untersuchen** (`dashboard-worker`, `dashboard-frontend`, `dashboard-web`)
4. **RAM-Upgrade beauftragen** beim Hoster
5. **n8n auf PostgreSQL-Backend migrieren** (nach RAM-Upgrade)
6. **Tenant-Schemas anlegen** + Workflows importieren
