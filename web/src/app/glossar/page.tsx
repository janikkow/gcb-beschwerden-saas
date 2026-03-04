import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
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
    <Section
      eyebrow="Glossar"
      title="Begriffe für ein gemeinsames Betriebsverständnis"
      description="Die wichtigsten Fachbegriffe rund um Störungsmeldungen, Priorisierung und Datentrennung."
    >
      <div className="grid gap-4">
        {terms.map((item) => (
          <Card key={item.term}>
            <h2 className="text-lg font-semibold text-ink-900">{item.term}</h2>
            <p className="mt-2 text-sm text-slate-600">{item.definition}</p>
          </Card>
        ))}
      </div>
      <p className="mt-6 text-sm text-slate-600">
        Weiterführend: <Link className="text-brand-700 underline" href="/faq">FAQ</Link>.
      </p>
    </Section>
  );
}
