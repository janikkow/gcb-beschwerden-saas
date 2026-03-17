import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/container";
import StructuredData from "@/components/structured-data";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Glossar – Fachbegriffe im Incident Management",
  description:
    "Begriffe wie Incident, Impact-Matrix, Tenant, Voice Intake und Control/Data Plane verständlich erklärt für Betreiber autonomer Standorte.",
  path: "/glossar",
  keywords: [
    "incident management glossar",
    "impact matrix definition",
    "voice intake bedeutung",
    "tenant definition",
    "control plane data plane",
    "beschwerdemanagement fachbegriffe",
  ],
});

const terms = [
  {
    term: "Incident",
    definition:
      "Ein Störfall an einem Standort, der technische oder operative Reaktion auslöst.",
  },
  {
    term: "Impact-Matrix",
    definition:
      "Regelwerk zur Priorisierung je Vertical und Tenant, z. B. Hoch/Mittel/Niedrig.",
  },
  {
    term: "Tenant",
    definition:
      "Isolierter Mandant mit eigenen Daten, Konfigurationen und Zugriffspfaden.",
  },
  {
    term: "Voice Intake",
    definition:
      "Strukturierte Erfassung eines Vorfalls über Telefon-/Voice-Agent-Flow.",
  },
  {
    term: "Data Plane / Control Plane",
    definition:
      "Data Plane verarbeitet operative Vorfälle, Control Plane steuert Provisioning, Deploy und Monitoring.",
  },
];

export default function GlossarPage() {
  return (
    <main className="py-14 sm:py-20">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Start", item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "Glossar", item: absoluteUrl("/glossar") },
          ],
        }}
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          name: "Incident Management Glossar",
          description:
            "Fachbegriffe rund um Störungsmeldungen, Priorisierung und Datentrennung für Betreiber autonomer Standorte.",
          inLanguage: "de-DE",
          hasDefinedTerm: terms.map((item) => ({
            "@type": "DefinedTerm",
            name: item.term,
            description: item.definition,
          })),
        }}
      />
      <Container>
        <header className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-400">
            Glossar
          </p>
          <h1 className="text-balance font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Begriffe für ein gemeinsames Betriebsverständnis
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base text-zinc-400 sm:text-lg">
            Die wichtigsten Fachbegriffe rund um Störungsmeldungen, Priorisierung und Datentrennung.
          </p>
        </header>

        <div className="grid gap-4">
          {terms.map((item) => (
            <div
              key={item.term}
              className="rounded-xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl"
            >
              <h2 className="text-lg font-semibold text-white">{item.term}</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {item.definition}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-zinc-500">
          Weiterführend:{" "}
          <Link
            className="text-brand-400 underline transition hover:text-brand-300"
            href="/faq"
          >
            FAQ
          </Link>
          .
        </p>
      </Container>
    </main>
  );
}
