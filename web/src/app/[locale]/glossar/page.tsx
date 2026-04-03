import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/container";
import StructuredData from "@/components/structured-data";
import { absoluteUrl } from "@/lib/site";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.glossary" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: {
        de: absoluteUrl("/de/glossar"),
        en: absoluteUrl("/en/glossar"),
      },
    },
  };
}

export default async function GlossarPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "glossary" });

  const terms = t.raw("terms") as Array<{ term: string; definition: string }>;

  return (
    <main className="py-14 sm:py-20">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: t("breadcrumbHome"), item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: t("breadcrumbPage"), item: absoluteUrl("/glossar") },
          ],
        }}
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          name: t("structuredDataName"),
          description: t("structuredDataDesc"),
          inLanguage: t("structuredDataLang"),
          hasDefinedTerm: terms.map((item) => ({
            "@type": "DefinedTerm",
            name: item.term,
            description: item.definition,
          })),
        }}
      />
      <Container>
        <header className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-400">
            {t("pageLabel")}
          </p>
          <h1 className="text-balance font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
            {t("pageHeadline")}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base text-zinc-400 sm:text-lg">
            {t("pageBody")}
          </p>
        </header>

        <div className="grid gap-4">
          {terms.map((item) => (
            <div
              key={item.term}
              className="rounded-xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl"
            >
              <h2 className="text-balance break-words text-lg font-semibold text-white">{item.term}</h2>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-zinc-400 break-words">
                {item.definition}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-zinc-500">
          {t("furtherReading")}{" "}
          <Link
            className="text-brand-400 underline transition hover:text-brand-300"
            href="/faq"
          >
            FAQ
          </Link>
          .
        </p>
      </Container>
    </main>
  );
}
