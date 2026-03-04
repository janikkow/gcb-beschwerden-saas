import type { Metadata } from "next";
import Link from "next/link";
import StructuredData from "@/components/structured-data";
import TicketPreviewShowcase from "@/components/ticket-preview-showcase";
import VoiceDemoCard from "@/components/voice-demo-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Beschwerden für Automatenläden einfach bearbeiten",
  description:
    "Kundinnen und Kunden melden Probleme per Telefon oder Webformular. Die KI sortiert Beschwerden vor und dein Team erhält sofort eine klare Aufgabe.",
  path: "/",
  keywords: [
    "beschwerdemanagement automatenläden",
    "webformular beschwerde",
    "beschwerdemanagement",
    "automatenladen",
    "ki support",
  ],
});

const steps = [
  {
    number: "01",
    title: "Beschwerde kommt rein",
    body: "Kundinnen und Kunden melden sich per Telefon oder Webformular.",
  },
  {
    number: "02",
    title: "KI sortiert automatisch",
    body: "Die KI erkennt Problemart und Dringlichkeit direkt aus der Meldung.",
  },
  {
    number: "03",
    title: "Daten werden strukturiert",
    body: "Name, Kontakt und Problem werden sauber aufbereitet und gespeichert.",
  },
  {
    number: "04",
    title: "Team bekommt klare Aufgabe",
    body: "Automatisch entsteht eine verständliche E-Mail oder ein Ticket mit Referenz.",
  },
  {
    number: "05",
    title: "Mensch prüft nur Sonderfälle",
    body: "Unklare oder sensible Meldungen werden für Review markiert.",
  },
];

const useCases = [
  {
    title: "Typische Beschwerden",
    description: "Geld geschluckt, Produkt bleibt hängen, Kartenzahlung geht nicht.",
    href: "/use-cases/automaten",
  },
  {
    title: "Meldung ohne App",
    description: "Kundinnen und Kunden nutzen einfach Telefon oder Webformular.",
  },
  {
    title: "KI übernimmt Vorarbeit",
    description: "Kategorie und Priorität werden automatisch vorbereitet.",
  },
];

export default function HomePage() {
  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "GCB Incident Management",
          url: absoluteUrl("/"),
          description:
            "Beschwerden für Automatenläden per Telefon oder Webformular erfassen und durch KI vorsortieren.",
        }}
      />

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="pb-16 pt-16 sm:pt-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="default">Beschwerdemanagement für Automatenläden</Badge>
            <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.12] text-white sm:text-5xl lg:text-6xl">
              Weniger Support-Chaos bei Beschwerden aus dem Automatenladen.
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-zinc-300">
              Ob per Telefon oder Webformular: Beschwerden werden automatisch
              aufgenommen, von KI vorsortiert und als klare Aufgabe an dein Team
              weitergegeben.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/demo">Demo anfragen</Button>
            </div>
          </div>

          {/* Feature chips */}
          <div className="flex flex-wrap gap-3">
            {[
              "Telefon und Webformular als Eingang",
              "KI sortiert Beschwerden automatisch",
              "Klare Meldung statt unstrukturiertem Text",
              "Menschlicher Review nur wenn nötig",
            ].map((feat) => (
              <span
                key={feat}
                className="glass rounded-full px-4 py-1.5 text-sm font-medium text-zinc-200"
              >
                {feat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-400">
              So funktioniert es
            </p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Ein klarer Ablauf für den Alltag im Automatenladen
            </h2>
            <p className="mt-3 max-w-2xl text-pretty text-base text-zinc-400">
              Meldung rein, KI sortiert, Team arbeitet gezielt ab.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="glass-card group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:border-white/20"
              >
                <span className="absolute right-4 top-4 select-none font-mono text-3xl font-bold text-white/5">
                  {step.number}
                </span>
                <h3 className="text-base font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Voice Demo + Ticket Preview ──────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-400">
              Live Demo
            </p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Demo-Anruf und Ticket-Vorschau
            </h2>
            <p className="mt-3 max-w-2xl text-pretty text-base text-zinc-400">
              Starte ein Gespräch im Browser oder ruf direkt an. Danach siehst du,
              welche Meldung dein Team konkret erhält.
            </p>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-2">
            <VoiceDemoCard />
            <TicketPreviewShowcase />
          </div>
        </div>
      </section>

      {/* ── Use Cases ────────────────────────────────────────────────── */}
      <section className="pb-20 pt-4">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-400">
              Fokus
            </p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Zunächst nur für Automatenläden
            </h2>
            <p className="mt-3 max-w-2xl text-pretty text-base text-zinc-400">
              Die ersten Prozesse sind auf typische Beschwerden in Automatenläden ausgerichtet.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {useCases.map((uc) => (
              <div
                key={uc.title}
                className="glass-card group rounded-2xl p-6 transition-all duration-300 hover:border-white/20"
              >
                <h3 className="text-lg font-semibold text-white">{uc.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {uc.description}
                </p>
                {uc.href ? (
                  <Link
                    href={uc.href}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-400 transition-colors hover:text-brand-300"
                  >
                    Use-Case lesen
                    <span aria-hidden>→</span>
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
