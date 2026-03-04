# GCB B2B SaaS Voice-Beschwerdemanagement

## Project Overview
This directory contains architectural documentation and n8n workflow exports for a scalable, multi-tenant B2B SaaS Voice-Beschwerdemanagement (Complaint Management) solution. The system is designed for autonomous businesses like vending machines, parking garages, and car washes.

The core tech stack involves:
- **Twilio:** For voice call ingress.
- **Ultravox:** For Voice AI.
- **n8n:** For workflow orchestration and logic execution.
- **LLMs (OpenAI):** For text classification, categorization, and sentiment/impact analysis.
- **PostgreSQL:** For data storage, utilizing a strict schema-per-tenant architecture to ensure data isolation.

## Directory Overview
The directory is structured to separate high-level architectural planning documents from the exported operational workflows. It serves as a knowledge base and backup for the automated business processes.

## Key Files
- `Skalierung Beschwerdemanagement A.md` (and B, C, D): These markdown files detail the architectural plan for scaling the SaaS platform. They cover the ingress and routing layer, isolated data planes (single-tenant compute with n8n), a central control plane for provisioning, and the data layer strategy (PostgreSQL schemas + JSONB for flexible tenant data).
- `workflows/`: This directory contains the actual exported n8n workflows in JSON format.
  - `Beschwerden Analyse Test.json`: An n8n workflow that processes incoming complaint forms. It validates the input, uses OpenAI (gpt-4o-mini) to categorize the complaint (e.g., "Geld geschluckt", "Ausgabe Fehler", "Alkoholautomat"), analyzes the severity/impact (Hoch, Mittel, Niedrig), formats HTML emails, and determines if manual human review is necessary.
  - `Twillio zu Ultravox.json`: A workflow likely responsible for connecting incoming Twilio voice calls to the Ultravox Voice AI for transcription and interaction.
  - `Zusammenfassung Daten Auswahl.json`: A workflow handling data summarization and selection processes.

## Usage
This repository acts as the central documentation and workflow repository for the Beschwerdemanagement SaaS platform.
- **Documentation:** Refer to the `.md` files to understand the multi-tenant architecture, scaling strategy, and security model (Blast Radius isolation).
- **Workflows:** The `.json` files in the `workflows/` directory can be directly imported into n8n instances (whether the central master control plane or isolated tenant instances) to deploy, restore, or update the core complaint handling logic.