import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import StructuredData from "@/components/structured-data";
import PricingCalculator from "@/components/pricing-calculator";
import { Button } from "@/components/ui/button";
import { absoluteUrl, siteConfig } from "@/lib/site";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.pricing" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { languages: { de: absoluteUrl("/de/preise"), en: absoluteUrl("/en/preise") } },
  };
}

const planKeys = ["light", "starter", "professional", "enterprise"] as const;
const includedKeys = ["i1", "i2", "i3", "i4"] as const;

export default async function PricingPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });

  const plans = planKeys.map((key) => ({
    key,
    name: key.charAt(0).toUpperCase() + key.slice(1),
    price: t(`plans.${key}.price`),
    note: t(`plans.${key}.note`),
    cta: t(`plans.${key}.cta`),
    featured: key === "professional",
    points: (["p1", "p2", "p3", "p4", "p5"] as const).map((p) => t(`plans.${key}.${p}`)),
  }));

  const included = includedKeys.map((k) => t(`included.${k}`));

  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Start", item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: t("pageHeadline"), item: absoluteUrl("/preise") },
          ],
        }}
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
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

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {plans.map((plan) => (
              <article
                key={plan.key}
                className={`glass-card flex h-full flex-col rounded-2xl p-6 ${
                  plan.featured ? "border-white/25 ring-1 ring-white/10" : "border-white/15"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="min-w-0 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400">
                    {plan.name}
                  </p>
                  {plan.featured && (
                    <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-white ring-1 ring-white/20">
                      {t("popularBadge")}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-2xl font-semibold text-white">{plan.price}</p>
                <p className="mt-2 text-sm text-zinc-400">{plan.note}</p>

                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-zinc-300">
                  {plan.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-1 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-brand-300" />
                      <span className="min-w-0 text-pretty break-words">{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <Button
                    href={`/demo?plan=${plan.key}`}
                    size="lg"
                    className={`w-full justify-center rounded-full text-sm font-semibold ${
                      plan.featured
                        ? "bg-white text-zinc-950 hover:bg-zinc-200 transition-all"
                        : "border border-white/15 bg-white/5 text-zinc-100 hover:bg-white/10"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[2fr_1fr]">
            <div className="glass-card rounded-2xl border border-white/15 p-6">
              <h2 className="text-xl font-semibold text-white">{t("includedHeadline")}</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-300">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />
                    <span className="min-w-0 text-pretty break-words">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="glass-card rounded-2xl border border-brand-300/35 p-6">
              <p className="text-sm font-semibold text-white">{t("noHiddenCostsTitle")}</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">{t("noHiddenCostsBody")}</p>
              <p className="mt-4 text-xs text-zinc-400">{t("noHiddenCostsNote")}</p>
              <Button
                href={`tel:${siteConfig.phoneTel}`}
                variant="secondary"
                className="mt-5 w-full justify-center rounded-full border border-white/20 bg-white/10 text-zinc-100 hover:bg-white/15"
              >
                {t("askQuestions")}
              </Button>
            </aside>
          </div>

          <div className="mt-20">
            <div className="mx-auto max-w-3xl text-center mb-10">
              <h2 className="text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {t("roiHeadline")}
              </h2>
              <p className="mt-3 text-pretty text-base text-zinc-400">{t("roiBody")}</p>
            </div>
            <PricingCalculator />
          </div>
        </div>
      </section>
    </>
  );
}
