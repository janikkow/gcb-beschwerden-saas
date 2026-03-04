# plan_saas_gcb.md

## Ziel

Das bestehende System zur automatisierten Erfassung und Klassifizierung von Beschwerden und Ausfällen (Telefon via Twilio, Voice-Agent über Ultrawox, Verarbeitung über n8n, Speicherung in Postgres) soll zu einer **skalierbaren SaaS‑Plattform** weiterentwickelt werden.

Der Fokus liegt darauf, die **bestehende Core‑Logik unverändert wiederzuverwenden**, aber sie so zu strukturieren, dass mehrere Kunden (Tenants) sicher und effizient betrieben werden können.

---

# 1. Grundprinzip der Architektur

Die bestehende Pipeline bleibt bestehen und wird zum **standardisierten Incident‑Processing‑Core**.

## Incident Pipeline

Input Channels

* Twilio (Telefon)
* Chatbot

Pipeline

1. Call / Message Ingestion
2. Gesprächsführung (Ultrawox Agent)
3. Summary / Transkript Verarbeitung
4. Incident / Complaint Extraction
5. Klassifikation
6. Impact Bewertung
7. Speicherung in Postgres
8. Ticket / Notification / HTML Report

Diese Pipeline ist für **alle Kunden identisch**.

Die Unterschiede zwischen Kunden werden **nicht in Workflows implementiert**, sondern über **Konfigurationen pro Tenant** gesteuert.

---

# 2. Multi‑Tenant Strategie

Jeder Kunde wird als **Tenant** betrachtet.

Alle Daten und Konfigurationen werden mit einer **tenant_id** verbunden.

## Tenant Kontext

Ein Tenant enthält:

* Kategorien
* Impact‑Definitionen
* Eskalationsregeln
* Templates (HTML / Reports)
* Integrationen
* Standorte
* Assets

### Beispielstruktur

Tenant

* Locations

  * Assets

    * Komponenten

Beispiele

Automatenmarkt

Store

* Automat
* Zahlungssystem
* Kühlung

Parkhaus

Parkhaus

* Schranke
* Ticketautomat
* Kennzeichenerkennung

Cleanpark

Standort

* Waschstraße
* Staubsauger
* Münzautomat

Diese Struktur ermöglicht eine **automatische Impact‑Bewertung von Ausfällen**.

---

# 3. Datenbank‑Isolation

Ziel ist eine sichere Trennung von Kundendaten bei gleichzeitig moderatem Betriebsaufwand.

## Empfohlener Standard

**Postgres Cluster mit Schema pro Tenant**

Beispiel

public

tenant_parkhaus

tenant_automat

tenant_cleanpark

Vorteile

* gute Isolation
* geringeres Risiko von Datenvermischung
* einfacher Betrieb
* moderater Ops‑Aufwand

### Alternative Modelle

Shared Tables + tenant_id

Vorteile

* minimaler Infrastrukturaufwand

Nachteile

* höheres Risiko bei Fehlern

DB pro Tenant

Vorteile

* maximale Isolation

Nachteile

* deutlich mehr Operations‑Aufwand

## Entscheidung

Standard: **Schema pro Tenant**

Enterprise Kunden optional

* eigene Datenbank
* eigene Runtime

---

# 4. Workflow‑Architektur

Die bestehenden n8n Workflows bleiben erhalten.

Workflows werden **versioniert und standardisiert deployt**.

## Prinzip

Workflows enthalten **keine kundenspezifische Logik**.

Alle kundenspezifischen Regeln werden über eine **Tenant Config** geladen.

### Flow Ablauf

1. Request kommt rein
2. Tenant wird bestimmt
3. Tenant Config wird geladen
4. Workflow verarbeitet Incident
5. Ergebnis wird gespeichert

---

# 5. Tenant Resolution

Der Tenant wird am Systemeingang bestimmt.

Mögliche Methoden

* Twilio Telefonnummer
* Webhook Token
* Chat Channel ID

Beispiel

Telefonnummer → Tenant

+49 123 → Automatenmarkt A

+49 456 → Parkhaus B

---

# 6. LLM Sicherheitskonzept

Das LLM darf **keinen direkten Datenbankzugriff** erhalten.

Stattdessen werden **tenant‑scoped Tools** verwendet.

Prinzip

LLM → Tool

Tool erzwingt

* tenant_id
* Zugriffsbeschränkung

Damit wird verhindert, dass Daten zwischen Kunden vermischt werden.

Optional

* separater Vector Index pro Tenant
* Retrieval Filter nach tenant_id

---

# 7. Infrastruktur‑Skalierung

Die Plattform wird horizontal skalierbar aufgebaut.

Komponenten

* n8n Orchestrator
* Worker
* Queue System
* Postgres

Skalierung erfolgt über

* zusätzliche Worker
* parallele Flows

---

# 8. Environment‑Trennung

Die Plattform wird in zwei Hauptumgebungen betrieben.

## Internal / Staging

Zweck

* Entwicklung
* Tests
* Prompt‑Optimierung
* interne Automatisierung

Enthält

* interne Tenants
* Testdaten

## Customer Production

Zweck

* Verarbeitung echter Kundendaten

Eigenschaften

* strenge Zugriffskontrollen
* Monitoring
* SLA

---

# 9. Deployment‑Strategie

Workflows werden als **versionierte Releases** behandelt.

Prozess

1. Entwicklung in Internal
2. Tests
3. Release Tag
4. Canary Deployment
5. Rollout an alle Tenants

---

# 10. Provisioning neuer Kunden

Onboarding eines neuen Tenants erfolgt automatisiert.

Provisioning umfasst

1. Schema anlegen
2. Tenant Config erstellen
3. Twilio Routing konfigurieren
4. Integrationen konfigurieren
5. Standorte und Assets importieren

---

# 11. Service Tiers

## Standard

* Shared Runtime
* Schema pro Tenant

## Enterprise

* dedizierte Runtime
* eigene Datenbank

---

# 12. Zielbild der Plattform

Die Plattform entwickelt sich zu einem

**AI Incident Intelligence System für autonome Standorte**

Anwendungsfälle

* Automatenmärkte
* Parkhäuser
* Waschparks
* weitere autonome Infrastrukturen

Funktionen

* automatische Incident‑Erkennung
* Klassifikation
* Impact‑Bewertung
* Eskalation
* Reporting

---

# Zusammenfassung

Der bestehende Core bleibt erhalten.

Skalierung erfolgt über

* Multi‑Tenant Architektur
* Tenant Config
* Schema‑basierte Datenisolation
* versionierte Workflows
* getrennte Umgebungen

Damit kann das System von einer einzelnen Automatisierung zu einer **skalierbaren SaaS Plattform** wachsen.
