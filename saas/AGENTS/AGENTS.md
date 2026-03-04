# AGENTS.md

Operational guide for coding agents in `beschwerden_SaaS`.

## 1) Repository Scope

This repository is workflow-centric and documentation-first.
There is no classic app runtime (no `package.json`, no Python project file).
Primary executable artifacts are n8n workflow exports in `workflows/*.json`.

Key locations:
- `workflows/*.json`: runtime automation logic (source of truth).
- `Skalierung Beschwerdemanagement *.md`: architecture and rollout docs.
- `CLAUDE.md`: project context, stack, and architecture notes.
- `.claude/`: local tool settings; do not store product logic here.

## 2) Cursor / Copilot Rule Check

Checked for agent rules in:
- `.cursor/rules/`
- `.cursorrules`
- `.github/copilot-instructions.md`

Current status: none found.
If added later, treat them as higher-priority instructions and update this file.

## 3) Build, Lint, Test Commands

There is no compile step and no unit-test framework in this repo.
Validation = JSON integrity + targeted manual runtime checks in n8n.

### Baseline validation

```bash
# Validate all workflows (required)
for f in workflows/*.json; do jq empty "$f"; done

# Inspect workspace changes
git status --short
git diff
git diff --staged
```

### Single-test equivalents (important)

```bash
# Validate one workflow file
jq empty "workflows/Twillio zu Ultravox.json"

# Validate one changed file (replace path as needed)
f="workflows/Zusammenfassung Daten Auswahl.json"; jq empty "$f"
```

### Validate changed workflows only

```bash
git diff --name-only -- workflows/*.json | while read -r f; do jq empty "$f"; done
```

### Optional runtime checks (non-production n8n)

For each changed flow path:
1. Trigger webhook (or corresponding trigger node).
2. Verify key input mapping and tenant resolution fields.
3. Confirm expected downstream nodes execute.
4. Confirm error branch for invalid payloads.

Record evidence in PR: input, expected output, actual output, execution log/screenshot.

## 4) Project Editing Standards

### Workflow JSON

- Use valid UTF-8 JSON, 2-space indentation, no trailing commas.
- Preserve n8n export structure and unrelated key order where possible.
- Do not mass-reformat unrelated node blocks.
- Keep node IDs and connections stable unless change is intentional.

### Markdown

- Use short, clear headings and concise operational prose.
- Prefer actionable bullets over long paragraphs.
- Mark assumptions and open questions explicitly.

## 5) Naming Conventions

### Filenames

- New workflow filenames should be lowercase kebab-case.
- Example: `incident-summary-selection.json`.
- Avoid renaming existing files unless explicitly required.

### Workflow `name`

- Use stable, descriptive names.
- Avoid temporary suffixes in production-ready exports (e.g. `_test_nicht_aktiv`).
- Keep naming readable for German/English operators.

### Node names

- Prioritize intent-based names; emojis are optional.
- Use deterministic names for critical steps (`Webhook`, `Respond`, `Insert row`).
- Avoid duplicate names in one workflow unless intentionally versioned.

## 6) Code Style for n8n `Code` Nodes (JavaScript)

Use these rules when editing `jsCode` blocks embedded in workflow JSON.

### Imports / dependencies

- Do not introduce package imports unless runtime support is confirmed.
- Assume no repository-wide dependency manager is available.
- Prefer native JS APIs and n8n expressions.

### Formatting and structure

- Prefer `const`; use `let` only when reassignment is required.
- Use semicolons consistently.
- Keep logic in small, readable blocks with explicit branches.
- Avoid hidden side effects in utility snippets.

### Types and data contracts

- Treat all incoming JSON as untrusted input.
- Validate required fields before usage.
- Normalize important keys early (e.g. `CallSid`, phone, category, priority).
- Keep output shape stable for downstream nodes.
- If output schema changes, update all dependent expressions/nodes.

### Error handling

- Fail fast for missing critical fields.
- Return structured error payloads (for example `error`, `originalData`).
- Route errors through explicit workflow branches.
- Never swallow exceptions silently.

## 7) Security and Data Hygiene

- Never commit real API keys, tokens, secrets, or credential IDs.
- Redact PII in docs/examples (phone, email, tenant identifiers).
- Do not commit production webhook URLs or sensitive account metadata.

## 8) Commit and PR Expectations

- Commit format: `<type>: <short summary>`.
- Preferred types: `feat`, `fix`, `docs`, `chore`.
- Keep commits scoped to one logical change.

PRs should include:
- purpose and scope,
- touched files,
- validation commands run,
- manual test evidence when behavior changed.

## 9) Agent Default Behavior

- Prefer minimal diffs and preserve existing workflow structure.
- Validate changed JSON files before finishing.
- If behavior changed, describe one reproducible manual test path.
- If context is missing, choose conservative defaults and note assumptions.
