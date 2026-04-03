import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import StructuredData from "@/components/structured-data";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { absoluteUrl } from "@/lib/site";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.faq" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { languages: { de: absoluteUrl("/de/faq"), en: absoluteUrl("/en/faq") } },
  };
}

export default async function FaqPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });

  const faqItems = (t.raw("items") as Array<{ q: string; a: string }>).map((item) => ({
    question: item.q,
    answer: item.a,
  }));

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
              {t("pageLabel")}
            </p>
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {t("pageHeadline")}
            </h1>
            <p className="mt-3 text-pretty text-base text-zinc-400">
              {t("pageBody")}
            </p>
          </div>

          <FAQAccordion items={faqItems} />
        </div>
      </section>
    </>
  );
}
