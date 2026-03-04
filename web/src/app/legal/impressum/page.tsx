import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Impressum",
  description: "Rechtliche Anbieterkennzeichnung (MVP-Platzhalter, juristisch finalisieren).",
  path: "/legal/impressum",
});

export default function ImpressumPage() {
  return (
    <Section title="Impressum" description="Angaben gemaess § 5 TMG (MVP-Platzhalter).">
      <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-700">
        <p>
          <strong>GCB Bavaria (Platzhalter)</strong>
          <br />
          Musterstrasse 1
          <br />
          12345 Musterstadt
        </p>
        <p>
          <strong>Vertreten durch:</strong>
          <br />
          Vorname Nachname
        </p>
        <p>
          <strong>Kontakt:</strong>
          <br />
          Telefon: +49 89 1234 5678
          <br />
          E-Mail: info@gcbavaria.com
        </p>
        <p className="text-xs text-slate-500">
          Hinweis: Vor Go-Live juristisch final pruefen und Platzhalter ersetzen.
        </p>
      </div>
    </Section>
  );
}
