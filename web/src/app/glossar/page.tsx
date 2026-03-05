import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Glossar",
  description:
    "Begriffe wie Incident, Impact-Matrix, Tenant, Voice Intake und Control/Data Plane.",
  path: "/glossar",
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
