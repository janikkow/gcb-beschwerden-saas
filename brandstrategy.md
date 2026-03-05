# OUTAG3 — Brand Strategy & Design Reference

> Template-Dokument für konsistente Markenführung, UI-Entwicklung und externe Kommunikation.

---

## 1. Markenidentität

| Attribut | Wert |
|---|---|
| **Produktname** | OUTAG3 |
| **Schreibweise** | `OUTAG` + `3` (die "3" immer in Lime `#ccff00` hervorgehoben) |
| **Typ** | B2B SaaS — Voice-basiertes Incident Management |
| **Zielgruppe** | Betreiber autonomer Standorte (Automatenladen, Parkhaus, Carwash) |
| **Rechtsform** | Dutz Jonas, Kowalsky Janik, Then Philipp GbR |
| **Kontakt** | info@gcbavaria.com |
| **Kernversprechen** | "Kunden melden Probleme per Anruf. Du bekommst sofort eine klare Aufgabe mit Priorität — ohne Papierchaos und ohne IT-Kenntnisse." |

### Tonalität
- Direkt, operativ, keine Marketing-Floskeln
- Technikaffin ohne Fachjargon — redet mit dem Betreiber, nicht über ihn
- Problemlöser-Sprache: konkrete Zahlen, klare Aktionen
- Deutsch (du-Form bei Betreibern, keine förmliche Anrede)

---

## 2. Farbsystem

### Brand-Palette (Custom CSS Tokens)

| Token | Hex | Beschreibung | Hauptverwendung |
|---|---|---|---|
| `--brand-400` | `#ccff00` | **Lime — Primär-CTA** | Buttons, Eyebrow-Labels, aktive States |
| `--brand-300` | `#a8ff60` | Hellgrün — Akzent | Bullet Points, Hover-States |
| `--brand-100` | `#edffd6` | Sehr hell Lime — Tint | Hintergründe, Badges |
| `--brand-500` | `#00e5ff` | **Cyan — Sekundär-Akzent** | Glows, Highlights |
| `--brand-600` | `#d400ff` | **Magenta — Tertiär-Akzent** | Retro-Borders, Gradients |
| `--brand-700` | `#5b00d4` | Violet — Tiefe | Gradient-Anker |
| `--ink-900` | `#0f1a2b` | **Dunkel-Navy — Body/BG** | Seitenhintergrund, Text auf hellem BG |
| `--ink-700` | `#2d3b51` | Navy-Mittel | Sekundäre Hintergründe |
| `--sand-50` | `#f9f7f3` | Sand-Weiß | Helle Varianten, Callouts |

### Semantische Status-Farben

| Zustand | Farbe | Tailwind |
|---|---|---|
| Kritisch / Hoch | Rot | `rose-400 / rose-500` |
| Warnung / Mittel | Amber | `amber-400 / amber-500` |
| OK / Niedrig | Grün | `emerald-400 / emerald-500` |
| Review / Offen | Violet | `violet-400 / violet-500` |
| Erfolg (allgemein) | Emerald | `emerald-300` (Ping-Dot) |

### Hintergrunds-System

```
Seite:        Foto /background.jpg + Overlay rgba(6, 10, 20, 0.58)
Glasskarten:  rgba(255,255,255, 0.07) + 1px border rgba(255,255,255, 0.13) + blur(24px)
Retro-Border: linear-gradient(90deg, #ccff00, #00e5ff, #d400ff)
```

---

## 3. Typografie

### Schriften

| Rolle | Schriftfamilie | Quelle | CSS-Variable |
|---|---|---|---|
| **Display / Überschriften** | `Share Tech Mono` | Google Fonts (`next/font`) | `--font-display` |
| **Body / UI** | `Avenir Next` → `Segoe UI` → `Helvetica Neue` | System | CSS `body` |
| **Blog / Longform** | `Iowan Old Style` → `Palatino Linotype` → `Book Antiqua` | System-Serif | `--font-serif` |

> Share Tech Mono ist die **einzige geladene externe Schrift** — alle anderen sind System-Stacks.

### Typografie-Hierarchie

| Element | Mobile | Tablet+ | Desktop | Gewicht | Klasse |
|---|---|---|---|---|---|
| Hero H1 | `text-4xl` (2.25rem) | `text-5xl` | `text-6xl` | `semibold` | `font-display`, `leading-[1.12]` |
| Page H1 | `text-3xl` | `text-4xl` | — | `semibold` | `tracking-tight` |
| Section H2 | `text-3xl` | `text-4xl` | — | `semibold` | `tracking-tight` |
| Card H3 | `text-lg` | — | — | `semibold` | — |
| Body (groß) | `text-lg` | — | — | normal | `text-zinc-300`, `leading-relaxed` |
| Body (standard) | `text-base` | — | — | normal | `text-zinc-400` |
| Body (klein) | `text-sm` | — | — | normal | `text-zinc-400` |
| Micro / Caption | `text-xs` | — | — | `semibold` | `text-zinc-400` |
| **Eyebrow-Label** | `text-xs` | — | — | `semibold` | `uppercase tracking-[0.14em] text-brand-400` |
| Preis-Anzeige | `text-2xl` | — | — | `semibold` | `text-white` |
| ROI-Zahl | `text-5xl` | — | — | `bold` | `text-brand-400` |

### Eyebrow-Pattern (konsistent in allen Sektionen)
```
text-xs font-semibold uppercase tracking-[0.14em] text-brand-400
```

---

## 4. Komponenten & UI-Muster

### Glassmorphismus (dominantes Card-Pattern)

```css
.glass       { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.10); backdrop-filter: blur(16px); }
.glass-card  { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.13); backdrop-filter: blur(24px); }
.glass-highlight { background: rgba(204,255,0,0.10); border: 1px solid rgba(204,255,0,0.25);  backdrop-filter: blur(24px); }
```

### Button-Muster

**Primärer CTA (ausgefüllt, Pill):**
```
rounded-full border border-brand-300/60 bg-brand-500 px-6 text-white
shadow-[0_0_32px_rgba(47,132,255,0.45)]
transition hover:-translate-y-0.5 hover:bg-brand-400
```

**Sekundärer CTA (Ghost, Pill):**
```
rounded-full border border-white/20 bg-white/10 px-5 text-zinc-100 hover:bg-white/15
```

**Hero CTA (größer, stärker):**
```
rounded-full border border-brand-300/70 bg-brand-400 px-8 py-3.5 text-sm font-semibold text-zinc-950
shadow-[0_10px_30px_rgba(98,164,255,0.4)]
hover:scale-[1.02] hover:bg-white hover:text-zinc-950 active:scale-[0.98]
```

> Hinweis: Der Hero-CTA verwendet `text-zinc-950` auf Lime-Hintergrund (dunkler Text auf hellem Button) — das ist der einzige Ausnahme-Fall.

### Card-Muster

```
glass-card rounded-2xl p-6          (Standard-Card)
glass-card rounded-2xl p-8          (Feature/Calculator-Card)
glass-card rounded-3xl p-6 sm:p-8   (Hero CTA-Box)
```

Featured/hervorgehobene Cards:
```
border-brand-300/45 shadow-[0_0_35px_rgba(47,132,255,0.3)]
```

### Status-Badges / Chips

```
rounded-full bg-white/10 border border-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-200
```

Live-Dot (pulsierend):
```html
<span class="relative inline-flex h-2.5 w-2.5">
  <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300/80" />
  <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
</span>
```

---

## 5. Ikonografie & Logo

### Favicon (`/public/outag3-favicon.svg`)
- Gelber (`#facc15`) abgerundeter Quadrat-Container (`rx="6"`)
- Pixelart-Blitz-Icon in Dunkel-Slate (`#0f172a`)
- Format: 32×32 SVG

### Pixel-Icon-System (`src/components/pixel-icons.tsx`)
Alle Icons: Inline SVG, 32×32 viewBox, `fill="currentColor"`

| Icon | Bedeutung | Standardfarbe |
|---|---|---|
| `PixelPhone` | Voice-Eingang | `text-brand-400` |
| `PixelRobot` | KI / Automation | `text-brand-400` |
| `PixelFilter` | Sortierung / Priorisierung | `text-brand-400` |
| `PixelEmail` | Ticket / Output | `text-brand-400` |
| `PixelUser` | Mensch / Review | `text-brand-400` |
| `PixelAlert` | Warnung | situativ |
| `PixelRocket` | Launch / Early Adopter | situativ |
| `PixelTrophy` | Erfolg | situativ |

Standardgröße in Schritten-Cards: `h-7 w-7 text-brand-400`

### Logo-Wordmark (Navbar)
```html
OUTAG<span class="text-brand-400">3</span>
```
Die "3" in `#ccff00` (Lime) ist das visuelle Ankerelement der Marke.

---

## 6. Layout & Spacing

### Container
```
mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8
```
Max-Breite: **1152px** (`max-w-6xl`)

### Sektion-Abstände
```
py-16 sm:py-20     (Standard-Sektion)
py-16 sm:py-24     (Hero / Opener)
pb-20 pt-4         (letzte Sektion)
pb-24              (Final CTA)
```

### Grid-Muster
```
grid gap-4 md:grid-cols-2 lg:grid-cols-3   (Schritt-Cards)
grid gap-5 lg:grid-cols-3                  (Pricing-Cards)
grid gap-8 lg:grid-cols-2                  (Split-Layouts)
grid gap-5 lg:grid-cols-[2fr_1fr]          (Feature + Aside)
```

### Border-Radius-Hierarchie

| Radius | Klasse | Verwendung |
|---|---|---|
| `rounded-full` | — | Buttons (Pills), Chips, Badges, Toggles |
| `rounded-2xl` | 18px | **Primär-Cards, Glass-Container** |
| `rounded-3xl` | 22px | Hero CTA-Box |
| `rounded-xl` | 14px | Sekundäre Aside-Blocks |
| `rounded-lg` | 10px | Alert-Komponenten, Images |
| `rounded-md` | 6px | Kleine UI-Elemente, Inputs |
| `rounded-sm` | 4px | Mini-Badges, Tags |

### Schatten-System
```
Hero-Box:      shadow-[0_24px_60px_rgba(10,20,40,0.5)]
Pricing-Card:  shadow-[0_14px_42px_rgba(10,20,40,0.55)]
Featured Card: shadow-[0_0_35px_rgba(47,132,255,0.3)]
CTA-Button:    shadow-[0_10px_30px_rgba(98,164,255,0.4)]
```

### Letter-Spacing
```
Eyebrow:     tracking-[0.14em]   (konsistentes Marken-Detail)
Ticket-Meta: tracking-[0.12em]
Headings:    tracking-tight
Nav:         tracking-wide
```

---

## 7. Seiten-Struktur & Inhaltsmuster

### Hero-Sektion (Standardaufbau)
```
[Eyebrow Badge]
[H1 — TypewriterHeading, font-display]
[Body-Text p, text-zinc-300, max-w-2xl]
[glass-card CTA-Box]
  → [Live-Dot Pill + Label]
  → [Beschreibungstext]
  → [Button-Gruppe: Primär + Sekundär]
  → [Micro-Copy]
[Feature Chips]
```

### Sektions-Muster (Inhalt)
```
[Eyebrow — text-xs uppercase tracking-[0.14em] text-brand-400]
[H2 — text-3xl sm:text-4xl font-semibold text-white tracking-tight]
[Beschreibung — text-base text-zinc-400 max-w-2xl]
[Grid mit Cards]
```

### Pricing-Seitenstruktur
1. Hero-Text (zentriert)
2. Pricing Cards (3 Spalten, Featured = Mitte)
3. ROI-Calculator (Calculator unterhalb der Cards)
4. "In jedem Plan inklusive" + Seitenleiste

---

## 8. Early Adopter Programm — Messaging

Aktuelle CTA-Strategie (keine Demo-Versprechungen, kein "unter 1 Werktag"):

| Element | Text |
|---|---|
| Badge/Pill | "Early Adopter Programm" |
| Primär-CTA | "Interesse bekunden" |
| Sub-CTA | "Jetzt anrufen" |
| Micro-Copy | "Sichere dir Sonderkonditionen als einer der ersten Partner." |
| Final CTA Tagline | "Werde Teil des Early Adopter Programms." |

---

## 9. Tailwind Konfiguration (Referenz)

### Benutzerdefinierte Tokens in `tailwind.config.ts` / `globals.css`
```css
--font-display: var(--font-share-tech-mono), monospace
--font-serif:   "Iowan Old Style", "Palatino Linotype", "Book Antiqua", serif

--color-brand-100: #edffd6
--color-brand-300: #a8ff60
--color-brand-400: #ccff00   /* Primär */
--color-brand-500: #00e5ff   /* Sekundär */
--color-brand-600: #d400ff   /* Tertiär */
--color-brand-700: #5b00d4
--color-brand-200: (interpoliert)

--color-ink-900:  #0f1a2b
--color-ink-700:  #2d3b51
--color-sand-50:  #f9f7f3

--radius:    0.625rem  (Basis)
--radius-lg: 0.625rem
--radius-xl: 0.875rem
--radius-2xl: 1.125rem
--radius-3xl: 1.375rem
```

---

## 10. Cheatsheet (1-Seite Referenz)

```
MARKE          OUTAG3  —  die "3" immer in #ccff00
VERSPRECHEN    Klare, priorisierte Aufgabe aus jedem Anruf
ZIELGRUPPE     Automatenläden, Parkhäuser, autonome Standorte

SCHRIFTEN
  Display:     Share Tech Mono  (Überschriften, Brand)
  Body:        Avenir Next / Segoe UI / Helvetica Neue
  Blog:        Iowan Old Style / Palatino

FARBEN (Primär)
  Lime / CTA   #ccff00   --brand-400
  Cyan         #00e5ff   --brand-500
  Magenta      #d400ff   --brand-600
  Violet       #5b00d4   --brand-700
  Dark Navy    #0f1a2b   --ink-900

KARTEN         .glass-card  rounded-2xl  p-6
BUTTONS (CTA)  rounded-full bg-brand-500 text-white border border-brand-300/60
BUTTONS (Ghost) rounded-full bg-white/10 text-zinc-100 border border-white/20

CONTAINER      max-w-6xl  px-5 sm:px-6 lg:px-8
SEKTIONEN      py-16 sm:py-20 bis py-16 sm:py-24
EYEBROW        text-xs font-semibold uppercase tracking-[0.14em] text-brand-400

FAVICON        Gelb (#facc15) + Pixel-Blitz (#0f172a)
LOGO           OUTAG + <span text-brand-400>3</span>
```
