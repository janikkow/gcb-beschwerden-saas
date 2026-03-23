# AGENTS.md

Agent operating guide for `beschwerden_SaaS` (Monorepo).

## Repository Structure

```
beschwerden_SaaS/
|-- saas/                 SaaS-Backend: n8n Workflows, Architektur, Planung
|   |-- workflows/        Exportierte n8n-Workflows (*.json)
|   |-- skalierungsansaetze/   Architekturvarianten A-D
|   |-- Planung Umsetzung/    Umsetzungsplaene + Masterplan
|   '-- AGENTS/           Agent-Guides, CLAUDE.md, GEMINI.md
|
|-- web/                  Vercel-Webapp: Next.js Early-Adopter Landing Page
|   |-- src/app/          App Router (page, layout, API routes)
|   |-- src/app/api/      Backend API (signup etc.)
|   '-- src/app/components/  React-Komponenten
|
'-- .claude/              Lokale Tool-Settings
```

## Subproject: saas/

Workflow-zentrisch, kein Build-System. Validierung ueber `jq`.
Detaillierter Guide: `saas/AGENTS/AGENTS.md`

### Befehle

```bash
# Alle Workflows validieren
for f in saas/workflows/*.json; do jq empty "$f"; done

# Einzelnen Workflow validieren
jq empty "saas/workflows/Twillio zu Ultravox.json"
```

## Subproject: web/

Next.js 16 App (TypeScript, Tailwind, App Router). Deployment-Ziel: Vercel.

### Mirror Repository (wichtig)

Das `web/` Subprojekt wird zusaetzlich in ein eigenes Repository gespiegelt:

- Ziel-Repo: `https://github.com/janikkow/gcb-beschwerden-saas-web.git`
- Remote im Monorepo: `web-origin`

Fuer Agenten/CLI-Workflows gilt:

```bash
# web/ als eigenes Repo (Branch main) pushen
git subtree push --prefix web web-origin main
```

Hinweis: Aenderungen im Monorepo an `web/` muessen nach relevanten Updates per `git subtree push` in das Mirror-Repo veroeffentlicht werden.

### Befehle

```bash
# Dependencies installieren
npm install --prefix web

# Dev-Server starten
npm run dev --prefix web

# Production Build
npm run build --prefix web

# Lint
npm run lint --prefix web
```

### Einzeltest (wichtig)

Es gibt bisher kein Testframework. "Einzeltest" bedeutet:
1. `npm run build --prefix web` muss fehlerfrei durchlaufen.
2. Manueller Browser-Test der betroffenen Seite/Route.

### Code-Style (web/)

- TypeScript strict mode (Next.js Default).
- Imports: React/Next oben, dann lokale Module, dann Typen.
- Prefer `const` und Arrow Functions in Komponenten.
- Semicolons immer.
- Komponenten-Dateien: kebab-case (`signup-form.tsx`).
- API-Routes: Eingabe validieren, frueh mit strukturiertem JSON-Error antworten.
- Tailwind fuer alles Visuelle — kein separates CSS ausser `globals.css`.
- Keine `any`-Typen. Interfaces fuer API-Payloads definieren.

### Error Handling (web/)

- API-Routes: try/catch um JSON-Parsing, strukturierte Fehler-Responses (`{ error: "..." }`).
- Client-Komponenten: Loading/Error/Success-States explizit modellieren.
- Keine stillen Fehler — immer User-Feedback oder Console-Log.

## Globale Regeln

### Commits

- Format: `<type>(<scope>): <summary>`
- Typen: `feat`, `fix`, `docs`, `chore`
- Scopes: `saas`, `web`, oder leer fuer Root-Aenderungen
- Ein logischer Change pro Commit

### Security

- Keine API-Keys, Tokens oder Credentials committen.
- PII (Telefonnummern, Emails, Tenant-Daten) in Beispielen redaktieren.
- `.env*` ist in web/.gitignore — dort Secrets ablegen.

### Cursor / Copilot Rules

Geprueft: `.cursor/rules/`, `.cursorrules`, `.github/copilot-instructions.md` — keine vorhanden.
Falls spaeter hinzugefuegt: als hoehere Prioritaet behandeln.
