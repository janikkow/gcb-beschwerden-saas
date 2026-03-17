import type { Metadata } from "next";
import StructuredData from "@/components/structured-data";
import PricingCalculator from "@/components/pricing-calculator";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Preise & Rentabilität – Beschwerdemanagement ab 39 EUR/Monat",
  description:
    "Transparente Preise und ROI-Rechner für Beschwerdemanagement in Automatenläden. Ab 39 EUR/Monat mit Voice Intake und KI-Priorisierung.",
  path: "/preise",
  keywords: [
    "beschwerdemanagement preise",
    "incident management kosten",
    "automatenläden software preise",
    "roi beschwerdemanagement",
    "voice intake kosten",
  ],
});

const plans = [
  {
    key: "light",
    name: "Light",
    price: "39 EUR / Monat",
    note: "Für kleine Volumina und den schnellen Einstieg",
    featured: false,
    cta: "Light wählen",
    points: [
      "1 Standort inklusive",
      "40 Voice-Minuten / Monat",
      "Webformular für Beschwerden",
      "KI-Basiskategorisierung",
      "E-Mail Zusammenfassung",
    ],
  },
  {
    key: "starter",
    name: "Starter",
    price: "89 EUR / Monat",
    note: "Der Einstieg für Einzelaufsteller",
    featured: false,
    cta: "Starter wählen",
    points: [
      "2 Standorte inklusive",
      "150 Voice-Minuten / Monat",
      "Standard KI-Stimme",
      "E-Mail Reporting",
      "Self-Service Setup",
    ],
  },
  {
    key: "professional",
    name: "Professional",
    price: "199 EUR / Monat",
    note: "Operations Hub für wachsende Betriebe",
    featured: true,
    cta: "Professional wählen",
    points: [
      "Bis zu 10 Standorte",
      "500 Voice-Minuten / Monat",
      "Volles Dashboard & Historie",
      "SMS Eskalation bei Notfällen",
      "Done-for-you Setup (+490€ einmalig)",
    ],
  },
  {
    key: "enterprise",
    name: "Enterprise",
    price: "auf Anfrage",
    note: "Maximale Leistung für große Ketten",
    featured: false,
    cta: "Angebot anfragen",
    points: [
      "Unlimitierte Standorte & Minuten",
      "Voice-Cloning (Eigene Stimme)",
      "WhatsApp Integration",
      "Eigene Wissens-Datenbank",
      "Priorisierter Support & SLA",
    ],
  },
] as const;

const included = [
  "Einrichtung und Konfiguration auf euren Ablauf",
  "Datenschutzfreundliche Verarbeitung nach aktuellem Stand",
  "Laufende Optimierung von Erkennung und Routing",
  "Support per E-Mail und Termin-Call",
] as const;

export default function PricingPage() {
  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Start", item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "Preise", item: absoluteUrl("/preise") },
          ],
        }}
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-400">
              Pricing & ROI
            </p>
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Einfache, faire Preise
            </h1>
            <p className="mt-3 text-pretty text-base text-zinc-400">
              Wähle den passenden Tarif für deinen Automatenbetrieb und starte als Early Adopter.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`glass-card flex h-full flex-col rounded-2xl p-6 ${
                  plan.featured
                    ? "border-white/25 ring-1 ring-white/10"
                    : "border-white/15"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400">
                    {plan.name}
                  </p>
                  {plan.featured && (
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-white ring-1 ring-white/20">
                      BELIEBT
                    </span>
                  )}
                </div>
                <p className="mt-3 text-2xl font-semibold text-white">{plan.price}</p>
                <p className="mt-2 text-sm text-zinc-400">{plan.note}</p>

                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-zinc-300">
                  {plan.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-brand-300" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <Button
                    href={`/demo?plan=${plan.key}`}
                    size="lg"
                    className={`w-full justify-center rounded-full text-sm font-semibold ${
                      plan.featured
                        ? "bg-white text-zinc-950 hover:bg-zinc-200 transition-all"
                        : "border border-white/15 bg-white/5 text-zinc-100 hover:bg-white/10"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[2fr_1fr]">
            <div className="glass-card rounded-2xl border border-white/15 p-6">
              <h2 className="text-xl font-semibold text-white">In jedem Plan inklusive</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-300">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="glass-card rounded-2xl border border-brand-300/35 p-6">
              <p className="text-sm font-semibold text-white">Keine versteckten Kosten</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                Preise inkl. MwSt. Mehr-Minuten für Voice werden fair zum Selbstkostenpreis abgerechnet.
              </p>
              <p className="mt-4 text-xs text-zinc-400">
                Setup-Fee einmalig ab 490 EUR (Light ohne Setup-Fee).
              </p>
              <Button
                href={`tel:${siteConfig.phoneTel}`}
                variant="secondary"
                className="mt-5 w-full justify-center rounded-full border border-white/20 bg-white/10 text-zinc-100 hover:bg-white/15"
              >
                Fragen klären
              </Button>
            </aside>
          </div>

          <div className="mt-20">
            <div className="mx-auto max-w-3xl text-center mb-10">
              <h2 className="text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                ROI-Rechner: Lohnt es sich?
              </h2>
              <p className="mt-3 text-pretty text-base text-zinc-400">
                Berechne dein monatliches Sparpotenzial basierend auf deinen aktuellen Kosten.
              </p>
            </div>
            <PricingCalculator />
          </div>
        </div>
      </section>
    </>
  );
}
