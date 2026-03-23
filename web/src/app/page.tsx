import type { Metadata } from "next";
import Link from "next/link";
import {
  PixelPhone,
  PixelRobot,
  PixelFilter,
  PixelEmail,
  PixelUser,
} from "@/components/pixel-icons";
import StructuredData from "@/components/structured-data";
import TicketPreviewShowcase from "@/components/ticket-preview-showcase";
import TypewriterHeading from "@/components/typewriter-heading";
import VoiceDemoCard from "@/components/voice-demo-card";
import HomeCtaActions from "@/components/home-cta-actions";
import { Badge } from "@/components/ui/badge";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Digitaler Front-Desk für Automatenbetreiber",
  description:
    "Schluss mit 24/7 Support-Stress: OUTAG3 filtert Frust-Anrufe, bereitet Auszahlungslisten vor und alarmiert dich bei Ausfällen in Stoßzeiten – damit du nachts ruhig schlafen kannst.",
  path: "/",
  keywords: [
    "automatenladen support",
    "beschwerdemanagement automaten",
    "vending support automation",
    "ki voice agent vending",
    "umsatzsicherung automaten",
  ],
});

const steps = [
  {
    number: "01",
    title: "Frust-Anruf geht ein",
    body: "Kunden rufen 24/7 an – doch du musst nicht mehr selbst abheben.",
    icon: PixelPhone,
  },
  {
    number: "02",
    title: "KI-Triage in Echtzeit",
    body: "Die KI erkennt sofort, ob nur 2€ fehlen oder die Schranke im Stoßbetrieb klemmt.",
    icon: PixelRobot,
  },
  {
    number: "03",
    title: "Daten werden strukturiert",
    body: "Name, Standort und IBAN/PayPal für die Erstattung sind sofort erfasst.",
    icon: PixelFilter,
  },
  {
    number: "04",
    title: "Fertige Auszahlungsliste",
    body: "Kein Nachtelefonieren mehr: Du bekommst eine fertige Liste aller offenen Erstattungen.",
    icon: PixelEmail,
  },
  {
    number: "05",
    title: "Umsatz in Stoßzeiten gesichert",
    body: "Kritische Fehler lösen sofort Alarm aus, wenn es in deinem Laden gerade brennt.",
    icon: PixelUser,
  },
];

const useCases: Array<{ title: string; description: string; href?: string }> = [
  {
    title: "Schutz in Stoßzeiten",
    description: "Kartenleser-Ausfall am Samstagabend? OUTAG3 alarmiert dich sofort, bevor der Umsatz wegbricht.",
  },
  {
    title: "Nie wieder 2€-Ping-Pong",
    description: "Statt jedem Kunden einzeln wegen Kleinstbeträgen nachzulaufen, erledigst du alles gesammelt per Liste.",
  },
  {
    title: "Wachsen ohne Stress",
    description: "Betreue mehr Standorte mit dem gleichen Aufwand, weil dein Support-Filter alles für dich vorarbeitet.",
  },
];

export default function HomePage() {
  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `${siteConfig.name} – Digitaler Front-Desk für Automatenläden`,
          url: absoluteUrl("/"),
          description:
            "Dein digitaler Front-Desk: 24/7 Erreichbarkeit ohne Stress. OUTAG3 filtert Anrufe und bereitet deine To-Do-Liste automatisch vor.",
          inLanguage: "de-DE",
          dateModified: "2026-03-23",
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
            "KI-gestütztes Incident Management für Automaten. Filtert Support-Anrufe und alarmiert bei kritischen Ausfällen.",
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
            "24/7 Voice-Agent (Digitaler Front-Desk)",
            "Fertige Auszahlungslisten (Kein Nachtelefonieren)",
            "Intelligente Triage (Bagatelle vs. Notfall)",
            "Sofort-Alarm bei Ausfällen in Stoßzeiten",
            "Keine App für Kunden nötig",
            "Multi-Standort Dashboard",
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
          name: "Digitaler Front-Desk für Automatenbetreiber",
          description:
            "KI-Support-Automation für Automatenbetreiber. Verwandelt unstrukturierte Anrufe in eine klare To-Do-Liste.",
          serviceType: "Customer Support Automation",
          areaServed: {
            "@type": "Country",
            name: "DE",
          },
          provider: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
          },
        }}
      />

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="pb-16 pt-16 sm:pt-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="default">Dein digitaler Front-Desk</Badge>
            <TypewriterHeading
              text="Schluss mit 24/7 Support-Stress: Wir filtern deine Anrufe."
              className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.12] text-white sm:text-5xl lg:text-6xl"
            />
            <p className="hero-description mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-zinc-300">
              Deine Automaten laufen rund um die Uhr – dein Handy muss das nicht. 
              OUTAG3 nimmt Beschwerden entgegen, sammelt alle Daten für Erstattungen 
              und alarmiert dich nur, wenn es wirklich brennt.
            </p>
          </div>

          <div className="glass-card mx-auto w-full max-w-5xl rounded-3xl border border-brand-400/40 px-6 py-7 text-center shadow-[0_24px_60px_rgba(10,20,40,0.5)] sm:px-8 sm:py-9">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-300">
              Early Adopter Programm 2026
            </p>
            <h2 className="mt-2 text-balance text-2xl font-semibold text-white sm:text-3xl">
              Sichere dir 90% mehr Zeit für dein Kerngeschäft.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-300 sm:text-base">
              Werde einer der ersten Partner und verabschiede dich von Support-Chaos, 
              ewigem Nachtelefonieren und unentdeckten Ausfällen.
            </p>
            <div className="mt-6">
              <HomeCtaActions />
            </div>
            <p className="mt-3 text-xs text-zinc-500">
              Exklusive Sonderkonditionen für die ersten 10 Standorte.
            </p>
          </div>

          <div className="mt-2 flex flex-wrap gap-3 opacity-85 sm:mt-4">
            {[
              "Digitaler Front-Desk (24/7 KI-Agent)",
              "Triage: Bagatelle vs. Notfall",
              "Sofort-Alarm in Stoßzeiten",
              "Fertige Auszahlungslisten (PayPal/IBAN)",
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
              Der Support-Filter
            </p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              In 5 Schritten vom Stress-Anruf zur fertigen Liste
            </h2>
              <p className="mt-3 max-w-2xl text-pretty text-base text-zinc-300">
                Wir fangen den Frust ab, sammeln die Fakten und bereiten alles für dich vor.
                So sicherst du deinen Umsatz und deinen Schlaf.
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
      <section className="relative py-24 sm:py-32 overflow-hidden">
        {/* Subtiler Brand-Glow Hintergrund */}
        <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 bg-brand-500/10 blur-[120px] rounded-full" />
        <div className="absolute right-0 top-0 -z-10 h-[300px] w-[300px] bg-brand-600/5 blur-[80px] rounded-full" />

        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-400">
              Live Demo
            </p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Teste deinen neuen digitalen Mitarbeiter
            </h2>
            <p className="mt-4 max-w-2xl text-pretty text-lg text-zinc-300">
              Sprich jetzt im Browser mit unserem KI-Agenten. Direkt danach siehst du,
              wie aus dem unstrukturierten Gespräch eine fertige Aufgabe für dich wird.
            </p>
          </div>

          <div className="grid items-stretch gap-12 lg:grid-cols-2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-400/20 to-brand-500/20 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500" />
              <div className="relative z-10 h-full">
                <VoiceDemoCard />
              </div>
            </div>
            <TicketPreviewShowcase />
          </div>
        </div>
      </section>

      {/* ── Use Cases ────────────────────────────────────────────────── */}
      <section className="pb-20 pt-4">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-400">
              Warum OUTAG3?
            </p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Gebaut für Betreiber, die skalieren wollen
            </h2>
            <p className="mt-3 max-w-2xl text-pretty text-base text-zinc-300">
              Wir wissen: Support ist der größte Flaschenhals, wenn du wachsen willst. 
              Wir lösen dieses Problem, damit du den Kopf für neue Standorte frei hast.
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
              Bereit für echtes Wachstum ohne Support-Wahnsinn?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">
              Verpasse nie wieder einen Ausfall in Stoßzeiten und gewinne deinen Feierabend zurück. 
              Wir zeigen dir den Ablauf in einer 20-minütigen Live-Demo.
            </p>
            <div className="mt-6">
              <HomeCtaActions />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
