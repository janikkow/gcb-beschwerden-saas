# codex_plan.md
## Best-Practice Zielplan fuer die SaaS-Skalierung (A/B/C/D)

## 1. Zielbild
Wir setzen ein **Bridge-Modell** um:
- zentral gepflegte, versionierte Core-Workflows
- strikte Mandantentrennung ueber `schema-per-tenant` in PostgreSQL
- klare Trennung zwischen interner Steuerung (Control Plane) und kundenwirksamer Ausfuehrung (Data Plane)

Damit erhalten wir den besten Trade-off aus Sicherheit, Wartbarkeit, Skalierung und Betriebskosten.

## 2. Scope
**In Scope**
- Zielarchitektur (n8n + Postgres + Tenant-Isolation)
- Tenant-Konfiguration und Tenant-Resolution
- LLM-Sicherheitskonzept
- Provisioning- und Rollout-Strategie

**Out of Scope**
- Vollstaendiges Kundenportal/UI
- Multi-Region/HA-Architektur
- Finales Billing-Produkt inkl. Rechnungslauf

## 3. Zielarchitektur
### 3.1 Control Plane (`n8n-internal`)
- rein intern erreichbar (z. B. Tailscale/VPN)
- Aufgaben: Tenant-Provisioning, Workflow-Deployment, Monitoring, Billing-Events

### 3.2 Data Plane (`n8n-customer`)
- oeffentliche Endpunkte fuer Twilio/Chatbot/API
- tenant-aware Ausfuehrung mit identischer Core-Logik fuer alle Kunden

### 3.3 PostgreSQL
- `internal` Schema fuer Metadaten/Steuerung
- `tenant_<id>` Schema pro Kunde
- DB-User pro Tenant, Rechte nur auf eigenes Schema

## 4. Verbindliche Interfaces
### 4.1 Tenant-Resolution am Ingress
Jeder eingehende Request muss `tenant_id` deterministisch aufloesen, z. B. ueber:
- Telefonnummer-Mapping
- Header/Token
- Webhook-Mapping

### 4.2 Tenant-Config (im `internal` Schema)
Mindestens folgende Felder:
- `tenant_id`
- `status`
- `twilio_mapping`
- `asset_model`
- `impact_matrix`
- `category_rules`
- `escalation_rules`

### 4.3 Incident-Datensatz (pro Tenant-Schema)
Pflichtfelder:
- `tenant_id`
- `source`
- `severity`
- `created_at`
- `payload_jsonb`

## 5. Standard-Datenfluss
1. Event empfangen (Webhook/Call/Chat)
2. Tenant aufloesen
3. Tenant-Config laden
4. Tenant-DB-User/Schema setzen
5. Core-Workflow ausfuehren (Summary, Klassifikation, Impact, Ticket)
6. Ergebnis im Tenant-Schema speichern
7. Notification/Eskalation ausloesen

## 6. LLM-Sicherheitsregeln (nicht verhandelbar)
- Kein freier DB-Zugriff fuer LLM-Knoten
- Nur tenant-gescopte Queries mit dedizierten Credentials
- Prompt-Firewall: nur whitelisted Felder in den Prompt
- Audit-Logging fuer Prompt/Response-Metadaten (ohne sensitive Rohdaten)

## 7. Umsetzungsphasen
### Phase 1: Fundament (MVP)
- Zwei n8n-Instanzen aufsetzen (`internal`, `customer`)
- Postgres mit `internal` + `tenant_0` einrichten
- Tenant-Resolution + Config-Injection implementieren
- Bestehende Nutzung als `tenant_0` migrieren (kein Sondercode)

### Phase 2: Hardening
- Rollen- und Rechtehaertung
- Healthchecks, Alerting, Retry-/Dead-letter-Muster
- Versionierter Workflow-Rollout mit Rollback-Strategie

### Phase 3: Enterprise-Optionen
- Optional dedizierte DB pro Premium-Tenant
- Optional dedizierte Runtime pro Premium-Tenant
- Erweiterte Compliance-Features (Retention/Export/Audit)

## 8. Tests und Abnahme
**Muss-Kriterien**
- Tenant A kann nie Daten von Tenant B lesen/schreiben
- Gleicher Input wird tenant-spezifisch nach jeweiliger Impact-Matrix bewertet
- Onboarding erzeugt einen voll funktionsfaehigen neuen Tenant ohne manuelle Nacharbeit
- Workflow-Update ist kontrolliert ausrollbar und rollback-faehig
- Kritische Pfade (Ingress, DB, LLM, Notification) sind monitoring-faehig

## 9. Annahmen und Defaults
- Standard-Isolation: `schema-per-tenant` (nicht DB-per-tenant)
- Shared Core-Workflows ohne kundenspezifische Forks
- Enterprise-Isolation bleibt optionale Upgrade-Stufe
- Tenant Zero laeuft im exakt gleichen Modell wie externe Kunden

## 10. Konkrete naechste Umsetzungsschritte
1. `internal.tenants` + `internal.tenant_mappings` + `internal.tenant_configs` anlegen.
2. In allen eingehenden Workflows den Schritt "Tenant-Resolution" als ersten Block etablieren.
3. DB-Credentials pro Tenant aus sicherem Secret-Store laden.
4. Klassifizierungs-Prompts auf Prompt-Firewall und Field-Whitelist umstellen.
5. Interne Deployment-Pipeline fuer Workflow-Versionierung/Rollback einrichten.
6. Smoke-Test fuer neuen Tenant (Provisioning bis erster Incident-End-to-End).
