import type { Metadata } from "next";
import StructuredData from "@/components/structured-data";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { faqItems } from "@/content/faqs";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "FAQ",
  description:
    "Einfache Antworten zu Beschwerdemanagement für Automatenläden: Meldung, KI-Unterstützung, Datenschutz und Start.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
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
            { "@type": "ListItem", position: 1, name: "Start", item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "FAQ", item: absoluteUrl("/faq") },
          ],
        }}
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-400">
              FAQ
            </p>
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Häufige Fragen
            </h1>
            <p className="mt-3 text-pretty text-base text-zinc-400">
              Kurz und verständlich erklärt für Betreiber und Support-Teams
              von Automatenläden.
            </p>
          </div>

          <FAQAccordion items={faqItems} />
        </div>
      </section>
    </>
  );
}
