# SaaS-Skalierungsplan – Incident Management System
*Stand: März 2026*

---

## 1. Vision & Produkt-Einordnung

Das System ist kein klassisches Beschwerdemanagement – es ist ein **Operational Incident Management System** für physische, unbeaufsichtigte Infrastruktur. Zielkunden sind autonome Unternehmen: Automatenmärkte, Parkhäuser, Cleanparks und vergleichbare Betreiber.

Kernfunktionen des bestehenden Systems:
- Eingang über Telefon (Twilio/Ultravox) und Chatbot
- Automatische Klassifizierung und Impact-Bewertung von Incidents
- Erfassung in PostgreSQL
- Benachrichtigung und Ticket-Erstellung bei kritischen Vorfällen

Das System funktioniert. Ziel ist es, die bestehende Core-Logik **mehrfach deploybar** zu machen – für N Kunden, ohne N-fachen manuellen Aufwand.

---

## 2. Architektur-Entscheidungen

### 2.1 Multi-Tenancy Modell: Bridge (Shared Core, isolierte Daten)

Gewähltes Modell: **Shared Flow Engine + isolierter Daten-Layer pro Tenant**

```
Control Plane (intern)          Data Plane (Kunden)
──────────────────────          ──────────────────────
Tenant Management               Kunde A – Schema + Config
Provisioning                    Kunde B – Schema + Config
System Monitoring               Kunde C – Schema + Config
Onboarding Automation           Tenant Zero – eigene Instanz
```

- Die Flow-Logik (Call Handling, Summary, Klassifizierung) bleibt **einmal zentral** gepflegt
- Alle Kunden profitieren automatisch von Verbesserungen an der Core-Logik
- Datentrennung erfolgt über PostgreSQL Schemas
- Konfiguration (Asset-Typen, Impact-Matrix, Kategorien) ist pro Tenant individuell

### 2.2 Datenisolation: PostgreSQL Schemas

Separate Datenbanken: **Nein** (zu hoher Ops-Overhead bei gleichem Sicherheitsgewinn)
Separate Schemas: **Ja**

```
PostgreSQL
├── schema: internal       ← Control Plane Daten
├── schema: tenant_0       ← eigene Instanz (Tenant Zero)
├── schema: tenant_a       ← Kunde A
├── schema: tenant_b       ← Kunde B
└── schema: tenant_c       ← Kunde C
```

Pro Tenant wird ein dedizierter **DB-User** angelegt, der ausschließlich Zugriff auf sein eigenes Schema hat. Damit ist es technisch unmöglich, dass ein LLM-Query cross-tenant Daten zieht.

**Kritischer Punkt LLM-Isolation:** Die Datenvermischung passiert nicht in der DB, sondern im Kontext-Fenster des LLM. Jeder DB-Query der in einen LLM-Prompt mündet, läuft über den Tenant-spezifischen DB-User. Kein Query ohne hartes Tenant-Scoping.

Separate DBs als **Premium-Tier** optional anbieten für Enterprise-Kunden mit Compliance-Anforderungen.

### 2.3 N8N: Zwei Instanzen, eine Server-Infrastruktur

```
Server
├── n8n-internal (Control Plane)
│   ├── Nur über Tailscale erreichbar – keine öffentliche Route
│   ├── Provisioning Flows
│   ├── System Monitoring & Health
│   └── Tenant Management
│
├── n8n-customer (Data Plane)
│   ├── Öffentlich erreichbar (Twilio Webhooks, Chatbot)
│   ├── Alle Customer Flows – tenant-aware
│   └── Tenant Zero = eigene Nutzung
│
└── PostgreSQL
    ├── Hängt in beiden Docker-Netzwerken
    └── Zugriff über Tenant-spezifische DB-User
```

**Netzwerk-Trennung via Docker:**

```yaml
networks:
  internal-net:       # nur Tailscale-seitig exponiert
    internal: true
  customer-net:       # öffentlich via Reverse Proxy
    internal: false
```

- N8N Internal → nur `internal-net` → kein DNS-Eintrag, kein Reverse Proxy, nur Tailscale
- N8N Customer → `customer-net` → normaler öffentlicher Endpunkt (Twilio, Chatbot)
- PostgreSQL → beide Netzwerke, getrennte DB-User pro Tenant

---

## 3. Tenant-Konfiguration

Jeder Tenant definiert seine eigene Logik – kein Hardcoding in den Flows:

### Asset-Hierarchie (kundenspezifisch)
```
Tenant: Automatmarkt GmbH
├── Standort: München Hauptbahnhof
│   ├── Automat #1 (Kaffee)
│   ├── Automat #2 (Snacks)
│   └── Bezahlterminal
└── Standort: München Ost
    └── ...
```

### Impact-Matrix (kundenspezifisch)
```
Ausfall Bezahlterminal  → KRITISCH  (100% Umsatzausfall)
Ausfall 1 Automat       → HOCH      (30% Umsatzausfall)
Ausfall Beleuchtung     → MITTEL    (Sicherheitsrisiko)
Ausfall WLAN            → NIEDRIG   (Monitoring betroffen)
```

Impact ist nicht universell – ein WLAN-Ausfall beim Automatmarkt ist niedrig, beim Parkhaus mit Schrankensteuerung ist er kritisch.

### Config-Injection in LLM-Flows

Die bestehende LLM-basierte Klassifizierung wird um Tenant-Kontext erweitert:

```
System Prompt:
"Du bist ein Incident-Analyst für [Tenant: Automatmarkt GmbH].
 Asset-Typen: [Automat, Terminal, Kamera...]
 Impact-Definitionen: [Kritisch = Bezahlterminal, ...]
 Kategorien: [Technisch, Vandalismus, Verschleiß...]
 Klassifiziere den folgenden gemeldeten Ausfall..."
```

Keine separate Rule Engine nötig – der LLM klassifiziert nach den kundenspezifischen Definitionen.

---

## 4. Flow-Architektur – tenant-aware

Die bestehenden Flows bleiben strukturell unverändert. Erweiterung am Anfang jedes Flows:

```
Webhook/Trigger eingehend
  → Tenant-ID aus Twilio-Nummer / Chatbot-Header bestimmen
  → Tenant-Config aus schema: internal laden
  → Tenant-spezifischen DB-User aktivieren
  → Flow ausführen mit Tenant-Kontext
  → Output in schema: tenant_x schreiben
```

### Bestehende Flows (bleiben wie sie sind, werden erweitert):
1. **Call Handling Flow** – Twilio/Ultravox Session-Management
2. **Summary Processing Flow** – Verarbeitung der Gesprächszusammenfassung
3. **Klassifizierungs- & Einordnungs-Flow** – Impact-Bewertung, Kategorisierung, HTML-Generierung

### Neue interne Flows:
4. **Provisioning Flow** – Automatisches Onboarding neuer Kunden
5. **System Monitoring Flow** – Health Checks, Alerts
6. **Tenant Management Flow** – Config-Verwaltung

---

## 5. Tenant Zero – Migration der bestehenden Instanz

Die bestehende Datenbank wird in das neue Schema-Modell migriert:

```sql
ALTER TABLE incidents   SET SCHEMA tenant_0;
ALTER TABLE complaints  SET SCHEMA tenant_0;
-- alle weiteren relevanten Tabellen
```

- Tenant Zero läuft durch exakt dieselben Flows wie alle anderen Kunden
- Kein Sondercode, keine Ausnahmen
- Produktive Nutzung = kontinuierlicher Integrationstest der Customer Flows

---

## 6. Provisioning – neuer Kunde onboarden

Ein einziger Trigger im internen N8N startet den vollautomatischen Onboarding-Flow:

```
Trigger (manuell oder API)
  → PostgreSQL: Schema für neuen Tenant anlegen
  → PostgreSQL: DB-User anlegen + Schema-Rechte setzen
  → Tenant-Config eintragen (Assets, Impact-Matrix, Kategorien)
  → Twilio: Nummer zuweisen + Webhook-Mapping eintragen
  → N8N Customer: Verbindung für neuen Tenant konfigurieren
  → Kunde ist operational
```

Neuer Kunde = ein Trigger, alles andere ist automatisch.

---

## 7. Umsetzungsplan

### Phase 1 – Fundament
- [ ] Zwei N8N-Container aufsetzen (internal + customer)
- [ ] Docker-Netzwerktrennung konfigurieren
- [ ] Tailscale für n8n-internal einrichten
- [ ] PostgreSQL Schema-Struktur aufbauen (internal, tenant_0)
- [ ] Tenant-Registry Tabelle in schema: internal anlegen
- [ ] Bestehende Daten nach schema: tenant_0 migrieren

### Phase 2 – Flows tenant-aware machen
- [ ] Tenant-ID Lookup am Flow-Anfang implementieren
- [ ] Tenant-Config Laden in alle drei Customer Flows
- [ ] LLM-Prompts mit Tenant-Kontext erweitern
- [ ] DB-User pro Tenant anlegen mit Schema-Isolation
- [ ] Alle DB-Writes mit Tenant-Schema verknüpfen

### Phase 3 – Provisioning automatisieren
- [ ] Provisioning Flow in n8n-internal bauen
- [ ] Twilio-Nummer-Zuweisung automatisieren
- [ ] Onboarding-Prozess testen mit Tenant Zero
- [ ] Ersten externen Kunden onboarden

### Phase 4 – Produkt ausbauen (optional)
- [ ] Kunden-UI für Selbst-Konfiguration (Asset-Typen, Impact-Matrix)
- [ ] Premium-Tier: Separate DB-Instanz für Enterprise-Kunden
- [ ] Monitoring-Dashboard für alle Tenants (intern)

---

## 8. Technologie-Stack

| Komponente | Technologie | Notiz |
|---|---|---|
| Flow-Orchestrierung | N8N (2 Instanzen) | Internal + Customer |
| Datenbank | PostgreSQL | Schema-Trennung pro Tenant |
| Telefonie Eingang | Twilio | Nummer → Tenant Mapping |
| Voice Agent | Ultravox | Ausgekoppelt, bleibt wie ist |
| Klassifizierung | LLM (bestehend) | Tenant-Config als Prompt-Kontext |
| Netzwerk-Isolation | Docker Networks | internal-net + customer-net |
| Interner Zugang | Tailscale | Nur für n8n-internal |
| Reverse Proxy | Traefik/Nginx | Nur für n8n-customer |

---

## 9. Kernprinzipien der Architektur

1. **Core-Logik einmal** – Flows werden zentral gepflegt, alle Tenants profitieren
2. **Konfiguration isoliert** – jeder Tenant definiert seine eigene Geschäftslogik
3. **Daten physisch getrennt** – Schemas + dedizierte DB-User, kein Cross-Tenant möglich
4. **Tenant Zero = Produktion** – eigene Nutzung ist der kontinuierliche Integrationstest
5. **Onboarding automatisiert** – neuer Kunde durch einen Trigger, kein manueller Aufwand
6. **Control Plane nicht öffentlich** – interne Automatisierung nur über Tailscale erreichbar
