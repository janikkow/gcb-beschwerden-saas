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
      "Ja. Standortbezug ist zentral, damit Techniker ohne Rueckruf direkt reagieren koennen.",
  },
  {
    question: "Wie trennt das System niedrig und kritisch?",
    answer:
      "Kritische Faelle wie Gesamtausfall bekommen sofortige Eskalation, geringere Stoerungen gehen in geplante Bearbeitung.",
  },
  {
    question: "Ist Vandalismus separat kennzeichnbar?",
    answer:
      "Ja. Vandalismus kann als eigene Kategorie und Eskalationsklasse gepflegt werden.",
  },
  {
    question: "Wie schnell ist die Rueckmeldung fuer den Betrieb?",
    answer:
      "Ticket und Prioritaet stehen direkt nach dem Intake-Flow bereit.",
  },
  {
    question: "Unterstuetzt das Setup mehrere Standorte?",
    answer:
      "Ja. Mehrere Standorte lassen sich ueber tenant-spezifische Standort- und Asset-Strukturen abbilden.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Use-Case Cleanpark",
  description:
    "Incident-Management fuer Cleanparks und Waschstrassen: Stoerungen frueh erkennen, priorisieren und schnell beheben.",
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
        title="Cleanpark: Service-Ausfaelle frueh erkennen und steuern"
        description="Bei Wasser- und Payment-Stoerungen entscheidet Reaktionszeit direkt ueber Umsatz und Kundenerlebnis."
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
              Techniker fahren zielgerichteter raus, das Team bearbeitet Vorfaelle
              nach Prioritaet statt nach Lautstaerke.
            </p>
          </Card>
        </div>
      </Section>

      <Section title="Prozess und Output" description="Standardisiert ueber alle Standorte.">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>1. Voice Intake mit Box-Bezug</Card>
          <Card>2. Incident-Bewertung via Impact-Matrix</Card>
          <Card>3. Ticket/Email plus Eskalationsroute</Card>
        </div>
      </Section>

      <Section title="FAQ Cleanpark" description="Hauefige Umsetzungsfragen.">
        <FAQAccordion items={faqs} />
        <div className="mt-8">
          <Button href="/demo">Demo fuer Cleanparks anfragen</Button>
        </div>
      </Section>
    </>
  );
}
