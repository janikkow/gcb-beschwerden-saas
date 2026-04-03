# GEMINI.md - Project Context & Instructions

## Project Overview: Beschwerden SaaS (OUTAG3)
**OUTAG3** is a multi-tenant B2B SaaS platform designed for automated complaint management using Voice AI. It targets operators of autonomous businesses such as vending machine networks, parking garages, and car washes. The system filters trivial complaints, automates data collection for refunds (IBAN/PayPal), and alerts operators only for critical incidents during peak hours.

### Core Architecture
- **Monorepo Structure:**
    - `web/`: Next.js frontend (Landing Page, User Dashboard, API).
    - `saas/`: n8n-based logic layer (Workflows, Architecture planning).
- **Multi-Tenancy:** "Code is Shared, Data is Isolated." Strict PostgreSQL schema-per-tenant isolation.
- **Data Plane (n8n-customer):** Public endpoints for Twilio, Ultravox, and Webhooks.
- **Control Plane (n8n-internal):** Internal management for provisioning, monitoring, and billing (Tailscale-protected).

---

## Tech Stack
### Frontend (`web/`)
- **Framework:** Next.js 15/16 (App Router), React 19, TypeScript.
- **Styling:** Tailwind CSS v4 (using `@tailwindcss/postcss`), Framer Motion.
- **UI Components:** Radix UI, shadcn/ui, Lucide React.
- **Visuals:** Three.js (for 3D/Interactive elements).
- **Integrations:** `ultravox-client` (Voice AI), Vercel Analytics.

### Backend & Logic (`saas/`)
- **Orchestration:** n8n (v2.4.8+).
- **Voice AI:** Ultravox (Real-time Voice AI), Twilio (Telephony).
- **LLM:** OpenAI (GPT-4o) for classification, triage, and summarization.
- **Database:** PostgreSQL 16 (pgvector) with multi-tenant schema isolation.
- **Proxy/Ingress:** Caddy (Reverse Proxy).

---

## Building and Running
### Web Subproject (`web/`)
```bash
# Install dependencies
npm install --prefix web

# Start development server (Port 3000)
npm run dev:3000 --prefix web

# Production build
npm run build --prefix web

# Linting
npm run lint --prefix web
```

### SaaS/Workflows (`saas/`)
Workflows are stored as JSON in `saas/workflows/`. They do not have a build system but should be validated before committing.
```bash
# Validate all workflows
for f in saas/workflows/*.json; do jq empty "$f"; done
```

---

## Development Conventions
### General
- **Commits:** Use Conventional Commits: `<type>(<scope>): <summary>` (Scopes: `web`, `saas`).
- **Security:** Never commit secrets. Use `.env.local` in `web/`.
- **Data Isolation:** LLM nodes must never have root database access. Use tenant-scoped DB users.

### Web Style (`web/`)
- **Naming:** Kebab-case for component files (`signup-form.tsx`).
- **Styling:** Strict Tailwind CSS. Avoid custom CSS except in `globals.css`.
- **Components:** Functional components with Arrow Functions. TypeScript strict mode.
- **API Routes:** Always validate input and return structured JSON errors.

### Monorepo Workflow
The `web/` directory is mirrored to a separate repository: `https://github.com/janikkow/gcb-beschwerden-saas-web.git`.
- **Deploying Web:** `git subtree push --prefix web web-origin main`.

---

## Key Directories & Files
- `saas/Planung Umsetzung/masterplan.md`: The definitive architectural roadmap.
- `web/src/app/`: Next.js App Router structure.
- `web/src/components/`: Reusable UI components.
- `saas/workflows/`: Core business logic (n8n exports).
- `.agents/`: Instructional context and skills for AI agents.
- `design-system/outag3/`: Documentation for the "Outag3" design system.
