import type { Metadata } from "next";
import Link from "next/link";
import {
  PixelPhone,
  PixelRobot,
  PixelFilter,
  PixelEmail,
  PixelUser,
  PixelList,
  PixelTrophy,
} from "@/components/pixel-icons";
import StructuredData from "@/components/structured-data";
import TicketPreviewShowcase from "@/components/ticket-preview-showcase";
import TypewriterHeading from "@/components/typewriter-heading";
import VoiceDemoCard from "@/components/voice-demo-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui/gradient-button";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Beschwerdemanagement für Automatenläden",
  description:
    "Beschwerden kommen per Telefon oder Webformular rein. OUTAG3 priorisiert automatisch und erstellt eine klare Aufgabe (Kategorie, Priorität, Kontakt) – damit dein Team ohne Nachfragen handeln kann.",
  path: "/",
  keywords: [
    "beschwerdemanagement automatenläden",
    "beschwerden automatenladen",
    "webformular beschwerde",
    "beschwerdemanagement",
    "automatenladen",
    "ki support",
    "priorisierung support",
  ],
});

const steps = [
  {
    number: "01",
    title: "Beschwerde kommt rein",
    body: "Kundinnen und Kunden melden sich per Telefon oder Webformular.",
    icon: PixelPhone,
  },
  {
    number: "02",
    title: "KI sortiert automatisch",
    body: "Die KI erkennt Problemart und Dringlichkeit direkt aus der Meldung.",
    icon: PixelRobot,
  },
  {
    number: "03",
    title: "Daten werden strukturiert",
    body: "Name, Kontakt und Problem werden sauber aufbereitet und gespeichert.",
    icon: PixelFilter,
  },
  {
    number: "04",
    title: "Team bekommt klare Aufgabe",
    body: "Automatisch entsteht eine verständliche E-Mail oder ein Ticket mit Referenz.",
    icon: PixelEmail,
  },
  {
    number: "05",
    title: "Mensch prüft nur Sonderfälle",
    body: "Unklare oder sensible Meldungen werden für Review markiert.",
    icon: PixelUser,
  },
];

const useCases: Array<{ title: string; description: string; href?: string }> = [
  {
    title: "Typische Beschwerden",
    description: "Geld geschluckt, Produkt bleibt hängen, Kartenzahlung geht nicht.",
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
          name: `${siteConfig.name} – Beschwerdemanagement für Automatenläden`,
          url: absoluteUrl("/"),
          description:
            "Beschwerden per Telefon oder Webformular erfassen, automatisch priorisieren und als klare Aufgabe an das Team weitergeben.",
          inLanguage: "de-DE",
          dateModified: "2026-03-17",
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
          },
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: ["h1", ".hero-description", "h2"],
          },
        }}
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: siteConfig.name,
          description:
            "KI-gestütztes Beschwerdemanagement für Automatenläden. Beschwerden per Telefon oder Webformular erfassen, automatisch kategorisieren und priorisieren.",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web-basiert",
          url: absoluteUrl("/"),
          offers: [
            {
              "@type": "Offer",
              name: "Light",
              price: "39",
              priceCurrency: "EUR",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: "39",
                priceCurrency: "EUR",
                unitText: "Monat",
              },
            },
            {
              "@type": "Offer",
              name: "Starter",
              price: "89",
              priceCurrency: "EUR",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: "89",
                priceCurrency: "EUR",
                unitText: "Monat",
              },
            },
            {
              "@type": "Offer",
              name: "Professional",
              price: "199",
              priceCurrency: "EUR",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: "199",
                priceCurrency: "EUR",
                unitText: "Monat",
              },
            },
          ],
          featureList: [
            "Voice Intake per Telefon (24/7 KI-Agent)",
            "Webformular für Beschwerden",
            "Automatische Kategorisierung und Priorisierung",
            "Strukturierte Ticket-Erstellung",
            "E-Mail- und SMS-Benachrichtigungen",
            "Multi-Standort-Unterstützung",
          ],
          provider: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
          },
        }}
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Beschwerdemanagement für Automatenläden",
          description:
            "Automatisiertes Beschwerde- und Incident Intake mit KI-Priorisierung. Meldungen per Telefon oder Webformular werden strukturiert erfasst und als priorisierte Aufgaben an das Team weitergegeben.",
          serviceType: "Beschwerde- und Incident Intake mit KI-Priorisierung",
          areaServed: {
            "@type": "Country",
            name: "DE",
          },
          provider: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
          },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "OUTAG3 Tarife",
            itemListElement: [
              { "@type": "Offer", name: "Light", price: "39", priceCurrency: "EUR" },
              { "@type": "Offer", name: "Starter", price: "89", priceCurrency: "EUR" },
              { "@type": "Offer", name: "Professional", price: "199", priceCurrency: "EUR" },
            ],
          },
        }}
      />

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="pb-16 pt-16 sm:pt-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="default">Beschwerdemanagement für Automatenläden</Badge>
            <TypewriterHeading
              text="Beschwerden aus Automatenläden in klare, priorisierte Aufgaben verwandeln."
              className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.12] text-white sm:text-5xl lg:text-6xl"
            />
            <p className="hero-description mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-zinc-300">
              Ob per Telefon oder Webformular: OUTAG3 erfasst Beschwerden, ordnet sie einer
              Kategorie zu, setzt die Priorität und liefert deinem Team alle nötigen
              Informationen für die Problembehebung.
            </p>
          </div>

          <div className="glass-card mx-auto w-full max-w-5xl rounded-3xl border border-brand-400/40 px-6 py-7 text-center shadow-[0_24px_60px_rgba(10,20,40,0.5)] sm:px-8 sm:py-9">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-300">
              Pilot 2026
            </p>
            <h2 className="mt-2 text-balance text-2xl font-semibold text-white sm:text-3xl">
              Starte jetzt mit der Waitlist für automatisiertes Beschwerdemanagement.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-300 sm:text-base">
              Für Automatenläden mit klarer Priorisierung, schnellerer Bearbeitung und weniger
              Rückfragen im Team.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <GradientButton
                asChild
                className="h-12 rounded-full px-10"
              >
                <Link href="/demo" className="inline-flex items-center justify-center gap-2.5">
                  <PixelList className="h-5 w-5 text-white" />
                  Auf die Waitlist
                </Link>
              </GradientButton>
              <Button
                href="/preise"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 text-base font-semibold text-white transition hover:border-white/25 hover:bg-white/10"
              >
                Preise ansehen
              </Button>
            </div>
            <p className="mt-3 text-xs text-zinc-500">
              Unverbindlich. Begrenzte Plätze.
            </p>
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
              Vom Anruf zum Ticket: in 5 Schritten zur klaren Aufgabe
            </h2>
            <p className="mt-3 max-w-2xl text-pretty text-base text-zinc-400">
              Meldung rein, KI priorisiert, dein Team arbeitet gezielt ab. Antworten auf typische Fragen findest du in den{" "}
              <Link href="/faq" className="text-brand-300 hover:text-brand-200 hover:underline">
                FAQs
              </Link>
              .
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="glass-card group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:border-white/20"
                >
                  <span className="absolute right-4 top-4 select-none font-mono text-3xl font-bold text-white/5">
                    {step.number}
                  </span>
                  <Icon className="mb-3 h-7 w-7 text-brand-400" />
                  <h3 className="text-base font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {step.body}
                  </p>
                </div>
              );
            })}
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
              Ruf an und sieh die fertige Meldung, die dein Team bekommt
            </h2>
            <p className="mt-3 max-w-2xl text-pretty text-base text-zinc-400">
              Starte ein Gespräch im Browser oder ruf direkt an. Direkt danach siehst du,
              wie Kategorie, Priorität und Kontaktdaten strukturiert ankommen.
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
              Optimiert für Automatenläden (und eure typischen Fälle)
            </h2>
            <p className="mt-3 max-w-2xl text-pretty text-base text-zinc-400">
              Wir starten bewusst schlank: Beschwerden, die im Alltag wirklich passieren — und
              die sofort eine klare Aktion auslösen sollen.
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

      {/* ── Final CTA ───────────────────────────────────────────────── */}
      <section className="pb-24">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-2xl font-semibold text-white sm:text-3xl">
              Fragen offen? Wir zeigen dir den Ablauf live.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
              In 20 Minuten siehst du, wie Beschwerden per Telefon und Webformular als klare
              Aufgaben bei deinem Team landen.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <GradientButton
                asChild
                className="h-12 rounded-full px-10"
              >
                <Link href="/demo" className="inline-flex items-center gap-2.5">
                  <PixelList className="h-5 w-5 text-white" />
                  Auf die Waitlist
                </Link>
              </GradientButton>
              <Button
                href="/preise"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 text-base font-semibold text-white transition hover:border-white/25 hover:bg-white/10"
              >
                Preise ansehen
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
