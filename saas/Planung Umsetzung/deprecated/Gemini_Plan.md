# Architektur & Skalierungs-Plan: "Shared Core mit Hardened Data Layer"
*Best Practice Ansatz für das GCB B2B SaaS Voice-Beschwerdemanagement*

## 1. Executive Summary
Dieser Plan definiert die Ziel-Architektur für die Skalierung der GCB Plattform. Er kombiniert die Effizienz eines "Shared Core" (eine zentrale Code-Basis für alle Kunden) mit der Enterprise-Sicherheit einer harten "Data Isolation" (physisch getrennte Datenhaltung pro Kunde). 

Ziel ist es, 50+ B2B-Kunden (Automatenmärkte, Parkhäuser, Cleanparks) auf der bestehenden Infrastruktur zu hosten, ohne den Wartungsaufwand exponentiell ansteigen zu lassen und gleichzeitig höchste Datensicherheit zu garantieren.

---

## 2. Das Grundprinzip: "Code is Shared, Data is Isolated"
Der wichtigste Architektur-Entscheid: Wir kopieren keine n8n-Workflows für neue Kunden.

*   **Zentrale Flow-Engine:** Es gibt genau *ein* Set an operativen n8n-Workflows (den "Core"). Alle eingehenden Anrufe und Nachrichten durchlaufen diese zentral gewarteten Flows.
*   **Dynamische Ausführung:** Nichts in den Flows (Kategorien, OpenAI-Keys, Auswirkungs-Metriken) ist fest kodiert ("hardcoded"). Alles wird zur Laufzeit dynamisch geladen.
*   **Vorteil:** Ein Bugfix oder eine Prompt-Verbesserung im Core-Flow kommt sofort allen Tenants zugute.

---

## 3. Daten-Isolation (Der "Blast Radius" Guard)
B2B-Kunden fordern garantierte Datensicherheit, insbesondere beim Einsatz von LLMs.

*   **PostgreSQL "Schema-per-Tenant":** Die bestehende PostgreSQL-Datenbank wird beibehalten, aber streng strukturiert. Jeder Kunde erhält ein eigenes, komplett isoliertes Schema (z.B. `schema_kunde_a`, `schema_kunde_b`).
*   **Dynamische Credentials (Die LLM-Firewall):** 
    * Der n8n-Flow verbindet sich niemals mit einem globalen Root-User mit der Datenbank.
    * Stattdessen nutzt der Flow anhand der erkannten Telefonnummer **dynamisch die Datenbank-Credentials des jeweiligen Tenants**. 
    * *Sicherheits-Garantie:* Selbst wenn ein LLM-Prompt halluziniert oder falsch formuliert ist, kann der Flow technisch *nur* auf das Schema dieses einen Kunden zugreifen. Cross-Tenant Data Leakage ist auf Datenbankebene blockiert.

---

## 4. Die Control Plane: Zwei N8N-Welten
Trennung zwischen dem Ausführen von Kundenprozessen und der Verwaltung der SaaS-Plattform.

### 4.1 n8n Customer Instance (Public / Data Plane)
*   Die aktuelle Instanz (z.B. `n8n-docker-caddy-n8n-1`).
*   Öffentlich erreichbar (für Twilio-Webhooks, Chatbots).
*   Führt *ausschließlich* die Incident-Abarbeitung (Core-Flows) durch.
*   Hat keinen Zugriff auf globale System-Konfigurationen oder Root-Datenbanken.

### 4.2 n8n Internal Instance (Private / Control Plane)
*   Eine zweite, versteckte n8n-Instanz auf demselben Server.
*   **Nicht** öffentlich erreichbar (Zugriff nur via VPN/Tailscale oder SSH-Tunnel).
*   **Aufgaben (Automatisierung First):**
    *   **Automatisches Onboarding:** Wird im CRM (z.B. NocoDB) ein Deal auf "Won" gesetzt, triggert das die interne Instanz. Diese:
        1. Legt das DB-Schema für den neuen Tenant an.
        2. Erstellt die dedizierten DB-User und sicheren Passwörter.
        3. Konfiguriert Webhooks (z.B. Twilio Nummern-Kauf & Mapping).
        4. Pusht die Standard-Konfiguration (Kategorien, Impact-Rules) in die Konfigurations-Datenbank.
    *   System-Monitoring und internes Billing.

---

## 5. Tenant Config-Injection (Das Herzstück der Logik)
Damit der "Shared Core" weiß, wie er kundenindividuell reagieren muss.

1.  **Tenant Resolution:** Eingehender Call (z.B. an +49 12345) wird auf eine `Tenant_ID` gemappt.
2.  **Config Fetching:** Am Start des Flows wird ein JSON-Objekt aus einem internen Konfigurations-Schema geladen.
3.  **Die Config-Matrix:** Dieses JSON enthält die spezifischen Geschäftsregeln des Kunden:
    ```json
    {
      "tenant_id": "C_001",
      "type": "parkhaus",
      "impact_rules": {
        "schranke_defekt": "KRITISCH",
        "ticket_automat_nimmt_kein_bargeld": "MITTEL"
      },
      "custom_system_prompt": "Du sprichst mit genervten Autofahrern. Sei extrem kurz angebunden und lösungsorientiert."
    }
    ```
4.  **Prompt Injection:** Dieses JSON wird als dynamischer Kontext in die Langchain/OpenAI Nodes übergeben. Das LLM bewertet denselben Vorfall beim Parkhaus ("Schranke defekt") als 'Kritisch', beim Automatenmarkt als 'Irrelevant'.

---

## 6. Infrastruktur & Skalierungs-Pfad (Vertical vor Horizontal)
Der aktuelle Docker-Monolith ist hervorragend geeignet, um ressourcenschonend zu skalieren.

*   **Phase 1 (Jetzt):** Shared n8n Customer Instanz + Schema-Isolation in der bestehenden Postgres-DB. Der aktuelle Server kann so problemlos die ersten 20-50 Kunden bedienen.
*   **Phase 2 (Bei hoher Auslastung):** Aktivierung des **n8n Queue Mode**. 
    * Wir nutzen den bestehenden Redis-Container (z.B. `twenty-redis-1`), um die Arbeitslast der Customer Instanz auf mehrere "n8n-Worker"-Container aufzuteilen.
    * Dies passiert erst, wenn die CPU/RAM-Auslastung des Main-Containers an ihre Grenzen stößt.

---

## 7. Zusammenfassung der Vorteile
1.  **Entwickler-Ergonomie:** Single Point of Truth für Code & Prompts.
2.  **Enterprise-Sicherheit:** Harte DB-Isolation verhindert Data Leakage zu 100%.
3.  **Wirtschaftlichkeit:** Minimaler RAM/CPU Overhead pro neuem Kunden.
4.  **Zero-Touch Operations:** Die Architektur zwingt zur Automatisierung des Onboardings von Tag 1 an.