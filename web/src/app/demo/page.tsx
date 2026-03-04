import type { Metadata } from "next";
import DemoForm from "@/components/forms/demo-form";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Demo",
  description:
    "Demo-Anfrage für Beschwerdemanagement in Automatenläden. Einfaches Formular mit Spam-Schutz.",
  path: "/demo",
});

export default function DemoPage() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-400">
            Demo
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Demo anfragen
          </h1>
          <p className="mt-3 text-pretty text-base text-zinc-400">
            Erzähle uns kurz eure Situation im Automatenladen und wir zeigen
            dir einen passenden Pilot-Flow.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[2fr_1fr]">
          <DemoForm />

          <div className="space-y-4">
            <div
              className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-2xl"
              style={{ WebkitBackdropFilter: "blur(24px)" }}
            >
              <p className="mb-1 text-sm font-semibold text-white">
                Was passiert nach Absenden?
              </p>
              <p className="text-sm leading-relaxed text-zinc-400">
                Deine Anfrage landet direkt bei uns. Wir melden uns innerhalb
                eines Werktags mit einem konkreten Vorschlag für deinen Pilot.
              </p>
            </div>
            <div
              className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-5 backdrop-blur-2xl"
              style={{ WebkitBackdropFilter: "blur(24px)" }}
            >
              <p className="mb-1 text-sm font-semibold text-emerald-300">
                Spam-Schutz aktiv
              </p>
              <p className="text-sm leading-relaxed text-zinc-400">
                Honeypot-Feld und serverseitiges Rate-Limit schützen das
                Formular automatisch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
