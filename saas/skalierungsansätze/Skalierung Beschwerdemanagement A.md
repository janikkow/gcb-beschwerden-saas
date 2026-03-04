# Architektur-Plan: B2B SaaS Voice-Beschwerdemanagement (GCB)

## 1. Übersicht & Zielsetzung
Skalierbares, mandantenfähiges (Multi-Tenant) Beschwerdemanagement als SaaS-Lösung. Fokussiert auf autonome Unternehmen (Automatenmärkte, Parkhäuser, Cleanparks).
Der Tech-Stack umfasst Twilio (Call-Eingang), Ultravox (Voice AI), n8n (Orchestrierung & Logik), LLMs (Klassifizierung) und PostgreSQL (Datenhaltung). 
Ziel ist eine strikte Trennung von Kundendaten bei gleichzeitiger zentraler Wartbarkeit der Core-Logik.

---

## 2. Ingress & Routing (Eingangsschicht)
* **Zentrales API-Gateway / Webhook-Receiver:** Nimmt alle eingehenden Events (Twilio-Anrufe, Ultravox-Transkripte, Chatbot-Tickets) zentral entgegen.
* **Tenant-Erkennung:** Identifiziert den Kunden (Tenant-ID) anhand der eingehenden Telefonnummer oder der aufgerufenen Webhook-URL.
* **Routing:** Leitet den strukturierten Payload an die isolierte n8n-Instanz des jeweiligen Kunden weiter.

---

## 3. Data Plane (Kunden-Ebene / Execution)
* **Single-Tenant Compute:** Jeder Kunde erhält einen eigenen, isolierten n8n-Container (z.B. via Docker/Kubernetes).
* **Standardisierte Core-Logik:** Alle Kunden-Container führen exakt denselben, zentral entwickelten Code aus (Call Handling, Summary, Kategorisierung, HTML-Generierung).
* **Isolierte Konfiguration:** Jeder Container läuft mit kundenindividuellen Umgebungsvariablen (Eigene Ultravox-Keys, OpenAI-Keys, DB-Credentials).
* **Dynamische Regel-Injektion:** Der standardisierte n8n-Flow lädt zur Laufzeit kundenindividuelle Definitionen (z.B. "Auswirkungs-Metriken" für Parkhäuser vs. Staubsauger) aus der Datenbank und übergibt diese als Kontext an das LLM.

---

## 4. Control Plane (Interne Verwaltungs-Ebene)
* **Master n8n-Instanz:** Eine rein interne Instanz, losgelöst vom operativen Kundengeschäft.
* **Aufgaben:**
    * **Automatisches Onboarding:** Fährt per Skript/API neue Kunden-Container hoch, legt DB-Schemata an und generiert sichere Passwörter.
    * **Deployment:** Pusht Updates der Core-Workflows in alle aktiven Kunden-Instanzen.
    * **Billing & Monitoring:** Überwacht Token-Verbrauch und API-Calls über alle Mandanten hinweg.

---

## 5. Data Layer (Datenbank & Storage)
* **PostgreSQL Cluster (Shared DB, Isolated Schemas):** Ein leistungsstarker Datenbank-Server für alle, aber strikte Trennung durch das *Schema-per-Tenant*-Prinzip (z.B. `schema_kunde_a`, `schema_kunde_b`).
* **Strikte LLM-Firewall:** Die Kunden-n8n-Instanz (und damit das LLM) verbindet sich ausschließlich mit einem dedizierten DB-User, der *nur* Lese-/Schreibrechte für das eigene Schema hat. Cross-Tenant Data Leakage ist auf Datenbankebene blockiert.
* **Schema-lose Erweiterbarkeit (JSONB):** Flexible, kundenspezifische Daten (individuelle Kategorien, variable Auswirkungsgrade) werden als `JSONB`-Payload in der relationalen DB gespeichert. Das verhindert ständige und fehleranfällige Datenbank-Migrationen bei neuen Kundenanforderungen.

---

## 6. Vorteile dieses Designs
* **Sicherheit (Blast Radius):** Fällt eine Kunden-Instanz aus oder halluziniert ein LLM, sind andere Kunden nicht betroffen. Niemand hat Zugriff auf fremde Daten.
* **Wartbarkeit:** Der Kernprozess muss nur einmal entwickelt und gewartet werden.
* **Skalierbarkeit:** Rechenintensive Aufgaben (Voice-Processing, LLM-Analysen) verteilen sich auf isolierte Worker, während die zentrale Datenbank extrem performant bleibt.