import type { Metadata } from "next";
import DemoForm from "@/components/forms/demo-form";
import { Callout } from "@/components/ui/callout";
import { Section } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Demo",
  description:
    "Demo-Anfrage fuer Beschwerdemanagement in Automatenlaeden. Einfaches Formular mit Spam-Schutz.",
  path: "/demo",
});

export default function DemoPage() {
  return (
    <Section
      eyebrow="Demo"
      title="Demo anfragen"
      description="Erzaehle uns kurz eure Situation im Automatenladen und wir zeigen dir einen passenden Pilot-Flow."
    >
      <div className="grid items-start gap-6 lg:grid-cols-[2fr_1fr]">
        <DemoForm />
        <div className="space-y-4">
          <Callout title="Was passiert nach Absenden?" tone="info">
            Das Lead-API sendet die Anfrage an Webhook oder E-Mail-Bridge und
            speichert optional eine lokale Spur fuer den MVP.
          </Callout>
          <Callout title="Anti-Spam aktiv" tone="success">
            Honeypot-Feld und IP-basiertes Rate-Limit sind serverseitig eingebaut.
          </Callout>
        </div>
      </div>
    </Section>
  );
}
