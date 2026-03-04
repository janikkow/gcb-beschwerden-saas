# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**GCB B2B SaaS Voice-Beschwerdemanagement** — a multi-tenant SaaS platform for autonomous businesses (vending machines, parking garages, car washes) to manage complaints and operational incidents via voice calls, chatbots, and forms.

This is a **documentation-first, workflow-centric** repository. Runtime logic lives in n8n workflows (JSON); strategy and architecture decisions live in Markdown files.

## Commands

No package-based build system. Use these before committing:

```bash
# Validate all workflow JSON files
for f in workflows/*.json; do jq empty "$f"; done

# Preview changes
git status --short
git diff --staged
```

If n8n CLI is available locally, import-test changed workflows in a non-production instance.

## Architecture

### Core Stack
- **Workflow engine**: n8n (two instances — Control Plane + Data Plane)
- **Voice/Telephony**: Twilio (intake) + Ultravox (voice AI agent)
- **AI**: OpenAI `gpt-4o-mini` for classification, categorization, and sentiment analysis
- **Database**: PostgreSQL with schema-per-tenant isolation
- **Infrastructure**: Docker + Docker Compose; Tailscale for internal access; Traefik/Nginx as reverse proxy

### Dual n8n Instance Pattern
| Instance | Role | Network |
|---|---|---|
| `n8n-internal` | Control Plane (provisioning, billing, monitoring, tenant management) | Tailscale-only, no public routes |
| `n8n-customer` | Data Plane (call handling, classification, notifications) | Public via reverse proxy |

Both connect to PostgreSQL using **tenant-scoped DB users** — each tenant gets a dedicated PostgreSQL user with permissions limited to their own schema (`tenant_a`, `tenant_b`, etc.). The `internal` schema is reserved for the control plane.

### Tenant Isolation (Bridge Pattern)
- **Shared**: n8n flow logic (standardized workflows)
- **Isolated**: PostgreSQL schema per tenant, separate DB user per tenant
- **Tenant resolution**: Twilio number / webhook header / chat channel ID
- **Config injection**: Tenant-specific config (asset hierarchy, impact matrix, categories, SLA rules) is loaded from the `internal` schema and injected into LLM system prompts — never hardcoded in workflows

### Incident Processing Pipeline
1. **Input**: Twilio call, chatbot, or form
2. **Tenant resolution**: Identify customer
3. **Config load**: Fetch tenant config from DB
4. **Processing**: Call handling → transcription via Ultravox → summary extraction → LLM classification → impact assessment
5. **Output**: Store in PostgreSQL → send notification → generate HTML report

### Scalability
- **Horizontal**: New customer = new schema + DB user (automated provisioning flow)
- **Vertical**: Increase container resources per tenant
- **Cell-based**: At >50 customers, split into geographic cells

## Key Files

| File/Directory | Purpose |
|---|---|
| `workflows/*.json` | Exported n8n workflow definitions (source of truth for runtime logic) |
| `Skalierung Beschwerdemanagement B.md` | Primary architecture reference (current recommended plan) |
| `Skalierung Beschwerdemanagement D.md` | Detailed implementation plan with provisioning and GitOps |
| `AGENTS.md` | Repository guidelines (naming, testing, commit format) |

## Conventions

- **JSON**: 2-space indentation, valid UTF-8, no trailing commas
- **Workflow filenames**: lowercase kebab-case (e.g., `incident-summary-selection.json`)
- **Workflow `name` fields**: stable and descriptive — no temporary suffixes like `_test_nicht_aktiv` in production exports
- **Commits**: `<type>: <short summary>` — types: `feat`, `fix`, `docs`, `chore`; one logical change per commit
- **PRs**: include purpose/scope, touched files, validation performed, and n8n execution screenshots when behavior changed
