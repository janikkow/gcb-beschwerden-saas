# AGENTS.md

Operational guide for coding agents working in `beschwerden_SaaS`.

## 1) Repository Overview
Monorepo with two active subprojects:
```
beschwerden_SaaS/
|-- saas/                  n8n workflow exports, architecture docs, rollout plans
|   |-- workflows/         n8n JSON workflows (runtime artifacts)
|   |-- skalierungsansaetze/
|   |-- Planung Umsetzung/
|   '-- AGENTS/
|
|-- web/                   Next.js 16 marketing web app (TypeScript, Tailwind)
|   |-- src/app/           App Router pages and API routes
|   |-- src/components/    UI and feature components
|   '-- src/lib/           shared utils, SEO, blog/site helpers
|
'-- .claude/               local tooling settings
```
Use the root guide for monorepo-level behavior.
Use `saas/AGENTS/AGENTS.md` for deep workflow-specific conventions.

## 2) Rule Files (Cursor / Copilot)
Checked locations:
- `.cursor/rules/`
- `.cursorrules`
- `.github/copilot-instructions.md`
Current status: no Cursor/Copilot rule files found.
If these files are added later, treat them as higher-priority instructions.

## 3) Build, Lint, Test Commands
### Root-level quick checks
```bash
# inspect changes
git status --short
git diff
git diff --staged
```
### `web/` (Next.js)
```bash
# install dependencies
npm install --prefix web

# local development
npm run dev --prefix web
npm run dev:3000 --prefix web

# lint and production build
npm run lint --prefix web
npm run build --prefix web

# run production server locally (after build)
npm run start --prefix web
```
### `saas/` (n8n workflows)
```bash
# validate all workflow JSON files
for f in saas/workflows/*.json; do jq empty "$f"; done

# validate one workflow JSON file
jq empty "saas/workflows/Twillio zu Ultravox.json"

# validate only changed workflows
git diff --name-only -- saas/workflows/*.json | while read -r f; do jq empty "$f"; done
```

## 4) Single-Test Guidance (Important)
There is no dedicated test framework in this repository right now.
Single-test equivalent for `web/`:
1. Run `npm run build --prefix web`.
2. Manually verify only the affected route/component in browser.
3. For API changes, exercise the specific endpoint and inspect JSON/status.
Single-test equivalent for `saas/`:
1. Run `jq empty` against the single changed workflow file.
2. Execute that workflow path in n8n test environment (manual runtime check).

## 5) Web Code Style and Standards
### TypeScript and types
- Keep TypeScript strict-safe (`web/tsconfig.json` has `strict: true`).
- Avoid `any`; prefer explicit `type` / `interface` and narrow unions.
- Validate untrusted request data before use.
- Keep API payload shapes stable; update callers when schema changes.
### Imports and module structure
- Keep imports grouped in this order: React/Next, third-party, internal `@/`, then type-only imports.
- Prefer `@/*` path alias over deep relative paths.
- Use `import type { ... }` for type-only imports.
### Formatting and syntax
- Follow ESLint (`npm run lint --prefix web`) as source of truth.
- Use semicolons consistently.
- Prefer `const`; use `let` only for reassignment.
- Prefer small focused functions and early returns.
- Keep comments minimal; only explain non-obvious logic.
### Naming conventions
- Component filenames: kebab-case (`demo-form.tsx`).
- App routes: folder-based naming in `src/app/**`.
- React components/types: PascalCase.
- Variables/functions: camelCase.
- Constants: UPPER_SNAKE_CASE only for true constants.
### React / Next patterns
- Default to Server Components; add `"use client"` only when needed.
- Keep metadata/SEO in route files using shared helpers when available.
- Keep UI styles in Tailwind utility classes; avoid extra CSS files except global styles.

## 6) Web Error Handling Rules
- API routes must validate input and return structured JSON errors.
- Use explicit status codes (`400`, `401`, `403`, `404`, `409`, `429`, `500+`).
- Wrap JSON parsing/network calls in `try/catch`.
- Do not swallow errors silently; log actionable context server-side.
- Client components should model clear states: `idle | loading | success | error`.
- Always provide user-visible failure feedback for form/API actions.

## 7) SaaS Workflow Editing Rules
- Workflows in `saas/workflows/*.json` are source of truth.
- Preserve n8n structure; avoid mass reformatting unrelated nodes.
- Keep node IDs/connections stable unless change is intentional.
- If changing embedded JS in Code nodes, validate required fields, fail fast on critical missing data, output structured error payloads, and avoid hidden side effects.

## 8) Security and Data Hygiene
- Never commit secrets, API keys, tokens, or credential IDs.
- Redact PII in examples/docs (email, phone, tenant/customer data).
- Keep secrets in environment variables (`.env*`), not in source.
- Do not commit production webhook endpoints with live credentials.

## 9) Git and Commit Conventions
- Commit format: `<type>(<scope>): <summary>`
- Allowed types: `feat`, `fix`, `docs`, `chore`
- Scope: `web`, `saas`, or empty for root-level change
- Keep one logical change per commit.
- Do not rewrite history (`--amend`, force push) unless explicitly requested.

## 10) Web Mirror Repository Sync
`web/` is mirrored to a separate repository:
- target: `https://github.com/janikkow/gcb-beschwerden-saas-web.git`
- remote in monorepo: `web-origin`
After relevant changes to `web/`, sync mirror with:
```bash
git subtree push --prefix web web-origin main
```

## 11) Agent Completion Checklist
Before finishing work, agents should:
1. Run relevant lint/build/validation commands.
2. Perform single-test equivalent for changed area.
3. Confirm no secrets/PII were introduced.
4. Document assumptions and manual verification steps in handoff.
