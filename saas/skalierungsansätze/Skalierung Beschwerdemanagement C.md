Das ist der vollständige Architekturplan für deinen SaaS-Beschwerdenmanagement-Service:

```markdown
# SaaS Architekturplan: GCB Beschwerdenmanagement
## Multi-Tenant Automatisierungsplattform für Automatenmärkte, Parkhäuser & Cleanparks

---

## 1. Architektur-Überblick

### 1.1 Design-Prinzipien
- **Single-Tenant Isolation**: Jeder Kunde bekommt dedizierte Ressourcen (n8n + Postgres)
- **Template-basierte Standardisierung**: Identische Flow-Logik, kundenspezifische Konfiguration
- **Physikalische Daten-Trennung**: Keine Datenvermischung bei LLM/RAG-Operationen
- **Zweistufige Infrastruktur**: Kunden-Stacks + Internal Operations Stack

### 1.2 System-Komponenten
```
┌─────────────────────────────────────────────────────────────┐
│                     GLOBAL LAYER                            │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │   Twilio     │  │   Ultravox   │  │   Trenio/Chat   │   │
│  │  (Eingang)   │  │  (Voice AI)  │  │   (Eingang)     │   │
│  └──────┬───────┘  └──────┬───────┘  └────────┬────────┘   │
└─────────┼─────────────────┼───────────────────┼────────────┘
          │                 │                   │
          ▼                 ▼                   ▼
┌─────────────────────────────────────────────────────────────┐
│                  TENANT ROUTING LAYER                       │
│              (Subdomain/Header-basiert)                     │
│     kunde1.gcb-service.de → Tenant A Stack                 │
│     kunde2.gcb-service.de → Tenant B Stack                 │
└─────────────────────────────────────────────────────────────┘
          │                 │                   │
          ▼                 ▼                   ▼
┌─────────────────────────────────────────────────────────────┐
│                   TENANT STACKS (pro Kunde)                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  n8n Instance (Workflow Engine)                      │   │
│  │  ├── Flow 1: Call Handling (Twilio → Ultravox)      │   │
│  │  ├── Flow 2: Summary Generation                     │   │
│  │  ├── Flow 3: Kategorisierung & Impact-Bewertung     │   │
│  │  └── Flow 4: Ticket-Erfassung & Notification        │   │
│  └────────────────────────┬────────────────────────────┘   │
│                           │                                  │
│                           ▼                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  PostgreSQL (Dedizierte DB pro Tenant)              │   │
│  │  ├── complaints (Beschwerden-Tabelle)               │   │
│  │  ├── categories (Kundenspezifische Kategorien)      │   │
│  │  ├── impact_rules (Auswirkungs-Definitionen)        │   │
│  │  └── audit_log (Audit-Trail)                        │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────┐
│              INTERNAL OPERATIONS STACK                      │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  n8n Internal Instance                               │   │
│  │  ├── Cross-Tenant Reporting (Dashboard Aggregation) │   │
│  │  ├── Billing Automation (Usage → Rechnung)          │   │
│  │  ├── Tenant Onboarding (Stack Provisioning)         │   │
│  │  ├── Monitoring & Health Checks                     │   │
│  │  └── LLM Training Data (anonymisiert, opt-in)       │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Tenant Stack Spezifikation (pro Kunde)

### 2.1 Ressourcen-Allokation
| Komponente | Spezifikation |
|------------|---------------|
| n8n Instance | 2 CPU, 4GB RAM (Docker Container) |
| PostgreSQL | 1 CPU, 2GB RAM, 20GB Storage |
| Vector Store (optional) | Isolierte Collection für RAG |

### 2.2 Workflow-Struktur

#### Flow 1: Call Handling
```
Twilio Webhook → Tenant-Resolution → Ultravox Session Init → 
Session Indexing → Call Transcription → Flow 2 Trigger
```

#### Flow 2: Summary Generation
```
Transcription Input → LLM Summary Prompt → Structured Data → 
Flow 3 Trigger
```

#### Flow 3: Kategorisierung & Impact-Bewertung
```
Summary + Tenant-Config (Categories, Impact-Rules) → 
AI Classification → Impact Calculation → HTML Generation → 
Flow 4 Trigger
```

#### Flow 4: Ticket-Erfassung & Notification
```
Data Persistence (Postgres) → Notification Trigger → 
Dashboard Update
```

### 2.3 Tenant-Konfiguration
Jeder Stack lädt bei Initialisierung:
- `tenant-config.json`:
  ```json
  {
    "tenant_id": "kunde_001",
    "business_domain": "cleanpark|parkhaus|automat",
    "twilio_config": { "sid": "...", "auth_token": "..." },
    "ultravox_config": { "api_key": "...", "model": "..." },
    "categories": [...],
    "impact_rules": [...],
    "sla_rules": [...]
  }
  ```

---

## 3. Internal Operations Stack

### 3.1 Verantwortlichkeiten
1. **Cross-Tenant Reporting**
   - Aggregierte Dashboards (Read-Only Zugriff auf alle Tenant-DBs)
   - Nightly Analytics Jobs
   
2. **Billing Automation**
   - Usage-Monitoring pro Tenant
   - Rechnungsgenerierung (z. B. basierend auf Anrufanzahl)

3. **Tenant Lifecycle Management**
   - Automatisches Provisioning neuer Stacks
   - Config-Deployment bei Updates
   - Stack-Decommissioning

4. **Monitoring & Alerting**
   - Health-Checks aller Tenant-Stacks
   - Alerting bei Ausfällen

### 3.2 Sicherheitsmodell
- **Read-Only Credentials** für Reporting auf Tenant-DBs
- **Service-Account** mit Elevated Rights für Onboarding
- Keine Schreibzugriffe auf Tenant-Daten (außer explizit für Maintenance)

---

## 4. Provisioning & Deployment

### 4.1 Infrastructure-as-Code (Terraform/Ansible)
```hcl
# Beispiel: Tenant Stack Module
module "tenant_stack" {
  source = "./modules/tenant-stack"
  
  tenant_id        = var.tenant_id
  subdomain        = "${var.tenant_id}.gcb-service.de"
  business_domain  = var.business_domain  # cleanpark|parkhaus|automat
  
  # Config Injection
  tenant_config    = var.tenant_config
  
  # Ressourcen
  n8n_cpu          = 2
  n8n_memory       = "4Gi"
  postgres_size    = "20Gi"
}
```

### 4.2 GitOps Workflow
1. **Neuer Kunde**: PR mit Tenant-Config → Review → Merge
2. **CI/CD Pipeline**: Terraform Apply → Stack Provisionierung
3. **Config Deployment**: Template-Flows + kundenspezifische Config-JSON
4. **DNS Eintrag**: Subdomain → Load Balancer → Tenant Stack

### 4.3 Update-Strategie
- **Template-Updates**: Änderungen an Core-Flows werden über alle Stacks ausgerollt
- **Config-Updates**: Hot-Reload ohne Stack-Restart möglich
- **Zero-Downtime Deployment**: Blue/Green für kritische Flow-Änderungen

---

## 5. Daten-Isolation & Sicherheit

### 5.1 Isolations-Level
| Ebene | Mechanismus | Sicherheit |
|-------|-------------|------------|
| **Netzwerk** | Subdomain + Reverse Proxy | Routing-Isolation |
| **Compute** | Dedizierte Docker Container | Prozess-Isolation |
| **Datenbank** | Separate Postgres-Instanzen | Physikalische Isolation |
| **Storage** | Tenant-spezifische Volumes | Datei-System-Isolation |
| **LLM/RAG** | Isolierte Vector-Collections | Keine Cross-Contamination |

### 5.2 Warum keine Shared-DB?
- **LLM-Risiko**: RAG-Queries können bei Bugs fremde Daten ziehen
- **Compliance**: Einfachere Auditierung bei dedizierten Instanzen
- **Backup/Restore**: Tenant kann unabhängig restored werden
- **Performance**: Kein "Noisy Neighbor" zwischen Kunden

---

## 6. Skalierungsstrategie

### 6.1 Horizontal (mehr Kunden)
- Provisioning neuer Stacks via Terraform
- Keine Limits bei 10, 50, 100 Kunden (nur Ressourcen-Kosten)
- Möglichkeit: Cell-basiertes Sharding bei >50 Kunden (EU-Cell, US-Cell)

### 6.2 Vertikal (mehr Last pro Kunde)
- Scale-Up: Mehr CPU/RAM für n8n-Container
- Scale-Out: n8n Queue Mode mit Redis für parallele Worker
- Postgres: Read-Replicas für Reporting-Last

### 6.3 Cell-Architektur (Zukunft)
Wenn >50 Kunden:
```
EU-Cell: 25 Kunden
US-Cell: 25 Kunden
Enterprise-Cell: Dedizierte High-Performance Stacks
```

---

## 7. Kostenstruktur (pro Kunde)

| Komponente | Kosten/Monat (Schätzung) |
|------------|--------------------------|
| n8n Container | ~20-40€ |
| PostgreSQL | ~10-20€ |
| Storage/Backup | ~5-10€ |
| LLM API Usage | Variable (nach Anrufvolumen) |
| **Total Basiskosten** | **~35-70€/Monat** |

---

## 8. Nächste Schritte

1. **Template-Flows finalisieren**: Call Handling, Summary, Kategorisierung als n8n-JSON-Export
2. **IaC aufsetzen**: Terraform-Module für Tenant-Stack + Internal Stack
3. **Provisioning-Script**: Automatisiertes Onboarding (CLI-Tool)
4. **Migration**: Bestehenden Kunden auf neuen Stack migrieren
5. **Internal Stack bauen**: Reporting, Billing, Monitoring Workflows

---

## 9. Zusammenfassung

- **Single-Tenant** ist für deinen Use-Case (10 Kunden, LLM-Integration, sensible Daten) die richtige Wahl
- **Physikalische Isolation** (eigene n8n + eigene DB) schützt vor Datenvermischung und vereinfacht Compliance
- **Template-basierte Standardisierung** ermöglicht effizientes Management ohne Feature-Divergenz
- **Internal Operations Stack** trennt Kunden-Traffic von Cross-Tenant-Operationen
- **IaC + GitOps** macht Provisioning skalierbar und reproduzierbar
```

Dieser Plan bildet die komplette Architektur ab, die wir diskutiert haben. Du kannst diese Datei als Grundlage für die Implementierung nutzen.