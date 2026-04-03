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
    question: "Wie werden Mehrfachanrufe zur gleichen Störung behandelt?",
    answer:
      "Gleiche Meldungen können auf ein Hauptticket konsolidiert werden, damit kein Alert-Sturm entsteht.",
  },
  {
    question: "Welche Vorfälle gelten typischerweise als kritisch?",
    answer:
      "Ausfahrtsschranke defekt, Kassenautomat Totalausfall und sicherheitsrelevante Vorfälle.",
  },
  {
    question: "Kann die Bereitschaft sofort benachrichtigt werden?",
    answer:
      "Ja. Bei Hoch-Priorität geht die Meldung direkt an den hinterlegten Eskalationskanal.",
  },
  {
    question: "Ist Standort-/Ebenen-Erkennung möglich?",
    answer:
      "Ja. Ebene, Ein-/Ausfahrt und Geräte-ID können im Intake abgefragt werden.",
  },
  {
    question: "Gibt es eine Historie pro Standort?",
    answer:
      "Ja. Jeder Vorfall hat Referenz, Zeitstempel und Kategorie für wiederkehrende Analysen.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Use-Case Parkhaus",
  description:
    "Incident-Management für Parkhäuser: schnelle Erfassung, priorisierte Eskalation und gebündelte Störungsbilder.",
  path: "/use-cases/parkhaus",
});

export default function ParkhausUseCasePage() {
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
              item: absoluteUrl("/use-cases/parkhaus"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Parkhaus",
              item: absoluteUrl("/use-cases/parkhaus"),
            },
          ],
        }}
      />

      <Section
        eyebrow="Use-Case"
        title="Parkhaus: Kritische Vorfälle in Sekunden sichtbar"
        description="Wenn Schranken, Ticketsystem oder Payment ausfallen, zählt jede Minute."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <h2 className="text-lg font-semibold">Typische Incidents</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
              <li>Schranke öffnet nicht</li>
              <li>Kassenautomat nimmt keine Zahlung an</li>
              <li>Ticket-Probleme an Ein-/Ausfahrt</li>
              <li>Sicherheits- oder Vandalismusfall</li>
            </ul>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold">Nutzen / ROI</h2>
            <p className="mt-3 text-sm text-slate-600">
              Weniger operative Überlastung im Leitstand und schnellere
              Reaktionszeit bei wirklich kritischen Situationen.
            </p>
          </Card>
        </div>
      </Section>

      <Section title="Prozess und Output" description="Inklusive Priorisierung und Eskalation.">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>1. Notruf wird strukturiert aufgenommen</Card>
          <Card>2. Impact für Betrieb und Verkehr wird berechnet</Card>
          <Card>3. Team bekommt priorisierte Aktionsempfehlung</Card>
        </div>
      </Section>

      <Section title="FAQ Parkhaus" description="Häufige Fragen aus dem Betrieb.">
        <FAQAccordion items={faqs} />
        <div className="mt-8">
          <Button href="/demo">Demo für Parkhäuser anfragen</Button>
        </div>
      </Section>
    </>
  );
}
