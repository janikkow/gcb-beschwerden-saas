import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Datenschutz",
  description: "MVP-Datenschutzhinweise für Website, Lead-Formular und Voice-Verarbeitung.",
  path: "/legal/datenschutz",
});

export default function DatenschutzPage() {
  return (
    <Section
      title="Datenschutzerklärung"
      description="MVP-Text als Platzhalter. Vor Go-Live rechtlich finalisieren."
    >
      <article className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-relaxed text-slate-700">
        <section>
          <h2 className="text-base font-semibold text-ink-900">1. Verantwortlicher</h2>
          <p>
            GCB Bavaria (Platzhalter), Musterstrasse 1, 12345 Musterstadt, info@gcbavaria.com
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-ink-900">2. Hosting</h2>
          <p>
            Diese Website wird auf Vercel betrieben. Betriebsdaten der Incident-Workflows
            werden getrennt verarbeitet.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-ink-900">3. Lead-Formular</h2>
          <p>
            Bei Demo-Anfragen verarbeiten wir Name, Firma, E-Mail, Telefonnummer
            (optional), Vertical und Nachricht zur Kontaktaufnahme.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-ink-900">4. Voice-Processing</h2>
          <p>
            Eingehende Meldungen werden zur Incident-Bearbeitung transkribiert und
            klassifiziert. Trainingsnutzung ist vertraglich auszuschließen.
          </p>
        </section>
        <p className="text-xs text-slate-500">
          Hinweis: Dieser Text ist kein Rechtsrat. Juristische Finalprüfung ist Pflicht.
        </p>
      </article>
    </Section>
  );
}
