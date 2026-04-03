import type { Metadata } from "next";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import StructuredData from "@/components/structured-data";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

const faqs = [
  {
    question: "Kann der Agent Box- oder Saugernummern erfassen?",
    answer:
      "Ja. Standortbezug ist zentral, damit Techniker ohne Rückruf direkt reagieren können.",
  },
  {
    question: "Wie trennt das System niedrig und kritisch?",
    answer:
      "Kritische Fälle wie Gesamtausfall bekommen sofortige Eskalation, geringere Störungen gehen in geplante Bearbeitung.",
  },
  {
    question: "Ist Vandalismus separat kennzeichnbar?",
    answer:
      "Ja. Vandalismus kann als eigene Kategorie und Eskalationsklasse gepflegt werden.",
  },
  {
    question: "Wie schnell ist die Rückmeldung für den Betrieb?",
    answer:
      "Ticket und Priorität stehen direkt nach dem Intake-Flow bereit.",
  },
  {
    question: "Unterstützt das Setup mehrere Standorte?",
    answer:
      "Ja. Mehrere Standorte lassen sich über tenant-spezifische Standort- und Asset-Strukturen abbilden.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Use-Case Cleanpark",
  description:
    "Incident-Management für Cleanparks und Waschstraßen: Störungen früh erkennen, priorisieren und schnell beheben.",
  path: "/use-cases/cleanpark",
});

export default function CleanparkUseCasePage() {
  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Start",
              item: absoluteUrl("/"),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Use-Cases",
              item: absoluteUrl("/use-cases/cleanpark"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Cleanpark",
              item: absoluteUrl("/use-cases/cleanpark"),
            },
          ],
        }}
      />

      <Section
        eyebrow="Use-Case"
        title="Cleanpark: Service-Ausfälle früh erkennen und steuern"
        description="Bei Wasser- und Payment-Störungen entscheidet Reaktionszeit direkt über Umsatz und Kundenerlebnis."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <h2 className="text-lg font-semibold">Typische Incidents</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
              <li>Waschbox ohne Druck</li>
              <li>Muenz-/Kartenzahlung stoert</li>
              <li>Sauger ohne Leistung</li>
              <li>Vandalismus oder Sicherheitsmeldung</li>
            </ul>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold">Nutzen / ROI</h2>
            <p className="mt-3 text-sm text-slate-600">
              Techniker fahren zielgerichteter raus, das Team bearbeitet Vorfälle
              nach Priorität statt nach Lautstärke.
            </p>
          </Card>
        </div>
      </Section>

      <Section title="Prozess und Output" description="Standardisiert über alle Standorte.">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>1. Voice Intake mit Box-Bezug</Card>
          <Card>2. Incident-Bewertung via Impact-Matrix</Card>
          <Card>3. Ticket/Email plus Eskalationsroute</Card>
        </div>
      </Section>

      <Section title="FAQ Cleanpark" description="Häufige Umsetzungsfragen.">
        <FAQAccordion items={faqs} />
        <div className="mt-8">
          <Button href="/demo">Demo für Cleanparks anfragen</Button>
        </div>
      </Section>
    </>
  );
}
