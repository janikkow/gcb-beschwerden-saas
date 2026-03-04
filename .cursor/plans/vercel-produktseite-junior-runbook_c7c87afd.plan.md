---
name: vercel-produktseite-junior-runbook
overview: Umsetzungsplan (granular, junior-friendly) für eine Vercel-Produktseite (Next.js) inkl. Voice-Agent-Demo auf der Startseite und HTML-Ticket-Mail-Preview, plus SEO/AISO, Blog und Go-Live Ops.
todos:
  - id: repo-decide-location
    content: "Entscheide Ablage: neues Repo ODER Unterordner im bestehenden Repo (z.B. `site/`). Ergebnis dokumentieren (README/Notiz), damit jeder weiß wo die Website liegt."
    status: pending
  - id: next-init
    content: Next.js App Router Projekt initialisieren (TypeScript, ESLint). Lokalen Dev-Start prüfen und 1. Deploy auf Vercel (Preview) verifizieren.
    status: pending
  - id: base-layout
    content: "Basis-Layout implementieren: `app/layout.tsx` (Metadata defaults), Header (Logo/Nav/CTA), Footer (Legal Links), Container/Spacing System. Ziel: jede Seite sieht sofort \"produktionsnah\" aus."
    status: pending
  - id: routing-skeleton
    content: "Alle MVP-Routen anlegen (`/`, `/produkt`, `/use-cases/*`, `/security`, `/preise`, `/faq`, `/demo`, `/blog`, `/legal/*`). Pro Route: H1 + Platzhalter-Sections + interne Links."
    status: pending
  - id: design-tokens
    content: "Design Tokens festlegen (Farben, Typografie, Buttons, Badges). Kleine Component-Library bauen: `Button`, `Card`, `Badge`, `Section`, `Callout`, `FAQAccordion`."
    status: pending
  - id: home-hero-copy
    content: "Startseite: Hero-Text finalisieren (Headline, Subheadline, 2 CTAs). Copy muss klar Positionierung treffen: Voice Intake → AI Klassifikation → Ticket/Email Output."
    status: pending
  - id: home-how-it-works
    content: "Startseite: \"How it works\" Sektion mit 5–7 Steps umsetzen, textlich an eure Workflows angelehnt (Twilio/Ultravox/Summary/LLM/Email). Optional: kompaktes Diagramm."
    status: pending
  - id: home-voice-demo-v1
    content: "Startseite: Voice-Demo Phase 1 bauen: (a) sichtbare Rufnummer, (b) `tel:` CTA für Mobile, (c) Desktop Modal mit QR-Code + Erklärung. Copy enthält Erwartungsmanagement (was wird abgefragt: Name/Problem/Email)."
    status: pending
  - id: home-ticket-preview-component
    content: "Komponente `TicketEmailPreview` implementieren (max 600px Email-Style). Felder: Kategorie, Priorität/Auswirkung, Name, Email, Telefon, Nachricht, Timestamp, Referenz. Styling an das bestehende HTML aus `workflows/Beschwerden Analyse Test.json` anlehnen (Header, Badges, Message-Box, Footer)."
    status: pending
  - id: home-ticket-preview-scenarios
    content: "3–5 Szenario-Datensätze definieren (JSON/TS): z.B. \"Geld geschluckt (hoch)\", \"Ausgabe Fehler (mittel)\", \"Kartenzahlung (niedrig)\", \"Alkoholautomat (Review)\". UI Toggle (Select/Buttons) baut Preview um."
    status: pending
  - id: product-page
    content: "`/produkt` ausarbeiten: Features (Intake, Klassifikation, Impact, Routing, Reporting), \"Für wen\" (3 Verticals), \"Outputs\" (Ticket/Email, SLA/Eskalation) und Links zu Use-Cases/FAQ."
    status: pending
  - id: usecase-pages
    content: "3 Use-Case Seiten schreiben (Automaten/Parkhaus/Cleanpark): Problem-Statements, typische Incidents, Nutzen/ROI, Prozess, Output. Jede Seite bekommt eigene FAQ (mind. 5 Q&As) + CTA."
    status: pending
  - id: security-page
    content: "`/security` Seite: Mandantenfähigkeit erklären (Schema-per-Tenant, DB-User-Isolation, Control/Data Plane), LLM-Isolation (kein cross-tenant Prompting), DSGVO/PII-Grundsätze. Inhalte aus Skalierungsdocs in Marketing-Sprache übersetzen."
    status: pending
  - id: pricing-page
    content: "`/preise` Seite: 2–3 Pakete definieren (Start/Pro/Enterprise). Klarer Preisanker (oder \"ab\"), was inkludiert ist (Anrufe/Monat, Workflows, Support). CTA \"Demo\"."
    status: pending
  - id: faq-page
    content: "`/faq` Seite als zentrale Q&A-Bibliothek (20–30 Fragen mittelfristig, MVP: 10–15). Struktur: Voice, Klassifikation, Datenschutz, Integration, Pricing."
    status: pending
  - id: demo-page-form
    content: "`/demo` Seite: Formular bauen (Name, Firma, Email, Telefon optional, Vertical, Nachricht). Anti-Spam: Honeypot + Rate limit (wenn eigene API) oder Provider-Schutz (bei Drittanbieterform)."
    status: pending
  - id: lead-delivery
    content: "Lead-Zustellung wählen und umsetzen: (A) schnell: Tally/Formspark; (B) minimal: `app/api/lead/route.ts` → E-Mail/Webhook. Test: 3 Test-Leads kommen an."
    status: pending
  - id: mdx-blog-plumbing
    content: "MDX Pipeline einrichten: Ordner `content/blog`, Frontmatter, Listing `/blog`, Detail `/blog/[slug]`, Tags optional. 2–3 Seed-Posts erstellen (Pillar + 2 Support-Posts)."
    status: pending
  - id: seo-metadata
    content: "SEO: Pro Seite `generateMetadata` (Title/Description/OG). Default OG Image Strategie definieren (statisch oder per Template). Canonical URLs korrekt setzen."
    status: pending
  - id: seo-sitemap-robots
    content: "SEO: `app/sitemap.ts` und `app/robots.ts` implementieren. Sitemap enthält statische Seiten + Blogposts. Robots erlaubt Indexing in Prod."
    status: pending
  - id: structured-data
    content: "Schema.org JSON-LD implementieren: `Organization` global, `SoftwareApplication`/`Product` auf Produktseite, `FAQPage` auf FAQ/Use-Case, `BreadcrumbList` auf Unterseiten. Validierung mit Rich Results Test einplanen."
    status: pending
  - id: aiso-llms-txt
    content: "AISO: `public/llms.txt` erstellen (Kurzbeschreibung, wichtigste URLs, Glossar-Links, Kontakt/Demo)."
    status: pending
  - id: glossary
    content: "Glossar-Seite anlegen (oder Abschnitt auf FAQ): Begriffe definieren (Incident, Impact-Matrix, Tenant, Voice Intake, Data Plane/Control Plane). Intern stark verlinken."
    status: pending
  - id: performance-pass
    content: "Performance-Pass: Bilder via `next/image`, Fonts optimieren, unnötige Client Components reduzieren. Ziel: sehr gute Lighthouse Scores (insb. LCP/CLS)."
    status: pending
  - id: legal-pages
    content: Impressum/Datenschutz Seiten erstellen (MVP-Text + Platzhalter, später juristisch finalisieren). In Footer verlinken.
    status: pending
  - id: go-live-domain
    content: Custom Domain auf Vercel konfigurieren. Canonicals prüfen. Redirects (www/non-www) festlegen.
    status: pending
  - id: go-live-search-console
    content: "Google Search Console + Bing Webmaster Tools: Verifizieren, Sitemap einreichen, Indexing prüfen. Erste Indexing-Checks dokumentieren."
    status: pending
  - id: post-launch-content-loop
    content: "Post-Launch Plan: 4 Wochen Content-Routine (1 Post/Woche): Use-Case Keywords + Pain-Point Queries. Interne Links + CTA in jedem Post."
    status: pending
isProject: false
---

# Vercel Produktseite – Umsetzungsplan (granular)

## Kontext (aus deinem Projekt)

- Produktpositionierung: **Operational Incident Management** für unbeaufsichtigte Infrastruktur (Automatenmärkte, Parkhäuser, Cleanparks). Siehe z.B. `[skalierungsansätze/Skalierung Beschwerdemanagement B.md](skalierungsansätze/Skalierung Beschwerdemanagement B.md)`.
- Voice-Flow (Demo-relevant): Twilio → Ultravox Agent. Siehe `[workflows/Twillio zu Ultravox.json](workflows/Twillio zu Ultravox.json)`.
- Summary/Extraction/Weiterleitung: call.ended → Extraction → Übergabe an Analyse-Flow. Siehe `[workflows/Zusammenfassung Daten Auswahl.json](workflows/Zusammenfassung Daten Auswahl.json)`.
- Ticket/Email-HTML (Preview-relevant): HTML-Template wird im Flow generiert und per Mail versendet. Siehe `[workflows/Beschwerden Analyse Test.json](workflows/Beschwerden Analyse Test.json)`.

## Ziel

- Eine **deutsche** Produktseite auf **Vercel** mit:
  - **Startseite**: Voice-Demo (Call-to-action) + **Ticket-/Email-Preview** (HTML-ähnlich)
  - **SEO/AISO**: sehr gut indexierbar + maschinenlesbar
  - **Blog** (MDX) als Content-Hub
  - **Lead-Capture** (Demo-Anfrage) mit messbarer Conversion

## Architektur (Marketing-Website)

- **Next.js (App Router) auf Vercel**
- Rendering: primär **SSG** (optional ISR für Blog)
- Content: **MDX im Repo**
- Keine DB für Website

## UX-Flow (Startseite)

```mermaid
flowchart LR
Visitor[Visitor] --> Hero[Hero_CTA]
Hero --> CallCTA[Call_Now_tel_QR]
Hero --> DemoCTA[Request_Demo_Form]
Visitor --> TicketPreview[Ticket_Email_Preview]
Visitor --> UseCases[Use_Cases]
UseCases --> Blog[Blog_Content]
Blog --> DemoCTA
```



## Scope der Seiten (MVP)

- `/` Startseite (Voice-Demo + Ticket Preview + Use-Cases + CTA)
- `/produkt` Features + How-it-works
- `/use-cases/automaten`
- `/use-cases/parkhaus`
- `/use-cases/cleanpark`
- `/security` (Multi-Tenant Isolation, Daten/LLM-Firewall, DSGVO)
- `/preise`
- `/faq`
- `/demo`
- `/blog` + `/blog/[slug]`
- `/legal/impressum`, `/legal/datenschutz`

## Definition of Done (global)

- Jede Seite hat: **H1**, **Title**, **Description**, saubere interne Links.
- `sitemap.xml` enthält alle Seiten + Blogposts.
- Keine Index-Blocker in Prod (robots/noindex).
- Startseite erklärt das Produkt in <10 Sekunden (Headline + 1 Satz + CTA).

## Risiken/Entscheidungen (bewusst)

- Voice-Demo Phase 1: **„Jetzt anrufen“** (tel-Link + Nummer + QR auf Desktop). Das ist am schnellsten, zuverlässig und ohne WebRTC/Token/Browser-Audio-Komplexität.
- Ticket-Preview: als **React-Komponente**, die das Email-Layout nachbaut (statt HTML in iframe), damit SEO/Performance gut bleiben.

## Rollenmodell (Dev-Zuordnung)

### Rollen

- **Codex (unbegrenzt)**: strukturiert, stringent, fehlerarm → Owner für Setup/Architektur/Implementierung/Go-Live.
- **Gemini (unbegrenzt)**: sehr schnell, eher oberflächlich → Owner für Drafts (Copy, FAQs, Blog-Seed), Support für Boilerplate.
- **Opus (begrenzt)**: extrem lösungsstark → nur für knifflige Themen mit hohem Risiko/Impact (Security-Claims, AISO/SEO-Strategie-Review, ggf. Voice Phase 2).
- **Sonnet (begrenzt)**: sehr guter Senior, teuer → punktuell für Conversion-/Brand-Copy und UI-Polish (Startseite, Pricing, ausgewählte Posts).

### Steuerungsregeln (damit Opus/Sonnet nicht „verbrannt“ werden)

- **Opus nur auf Review/High-risk Deliverables** einplanen (max. 2 kurze Slots: Security + SEO/AISO Review).
- **Sonnet in 1–2 geblockten Sessions**: Startseite (Hero/Story) + optional Pricing/Polish.
- Alles andere: **Codex baut**, **Gemini liefert Draft-Content**, Codex/Sonnet prüfen je nach Risiko.

### Owner/Support/Review pro Todo

- Siehe Frontmatter `todos:` oben: jedes Todo enthält **owner**, **support** und **review** (und ggf. `notes`).

