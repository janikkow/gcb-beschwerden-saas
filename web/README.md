# GCB Marketing Site (Next.js on Vercel)

## Projektstandort (Entscheidung)
Die Produktseite liegt im bestehenden Repository unter `web/`.
Damit bleiben Skalierungsdokumente und Workflow-Referenzen im selben Workspace.

## Mirror-Repo Sync (wichtig)
Das `web/` Verzeichnis wird in ein separates Repository gespiegelt:

- Ziel: `https://github.com/janikkow/gcb-beschwerden-saas-web.git`
- Monorepo-Remote: `web-origin`

Nach Aenderungen an `web/` im Monorepo den Mirror-Stand synchronisieren:

```bash
git subtree push --prefix web web-origin main
```

## Lokale Entwicklung
```bash
npm run dev
```
App unter `http://localhost:3000`.

## Wichtige Pfade
- `src/app/` Seiten, API-Routen, `sitemap.ts`, `robots.ts`
- `src/components/` UI- und Feature-Komponenten
- `src/lib/` SEO-, Blog- und Site-Utilities
- `content/blog/` MDX-Posts mit Frontmatter
- `docs/faq-kontextsammlung.md` Rohkontext & Redaktionsbasis für Live-FAQs (`messages/*.json`)
- `public/llms.txt` AISO-Datei

## Lead-Flow
- Formularseite: `/demo`
- API: `POST /api/lead`
- Schutz: Honeypot (`website`) + IP-Rate-Limit
- Optionaler Forwarding-Hook: `LEAD_WEBHOOK_URL`

## SEO/AISO
- Seitenspezifische Metadata ueber `buildMetadata(...)`
- Sitemap inkl. Blogposts: `/sitemap.xml`
- Robots via `src/app/robots.ts`
- JSON-LD fuer Organization/FAQ/Breadcrumb/Product
- `public/llms.txt` fuer LLM-Crawler

## Build und Checks
```bash
npm run lint
npm run build
```

## Go-Live (manuell ausserhalb Repo)
1. Vercel-Projekt mit `web/` Root verbinden.
2. `NEXT_PUBLIC_SITE_URL` auf echte Domain setzen.
3. Custom Domain + Redirects (`www`/`non-www`) konfigurieren.
4. Search Console/Bing verifizieren und Sitemap einreichen.
