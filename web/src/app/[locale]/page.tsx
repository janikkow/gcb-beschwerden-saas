import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import {
  PixelPhone,
  PixelRobot,
  PixelFilter,
  PixelEmail,
  PixelUser,
} from "@/components/pixel-icons";
import StructuredData from "@/components/structured-data";
import TicketPreviewShowcase from "@/components/ticket-preview-showcase";
import TypewriterHeading from "@/components/typewriter-heading";
import VoiceDemoCard from "@/components/voice-demo-card";
import HomeCtaActions from "@/components/home-cta-actions";
import { Badge } from "@/components/ui/badge";
import { absoluteUrl, siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: absoluteUrl(`/${locale}`),
      languages: {
        de: absoluteUrl("/de"),
        en: absoluteUrl("/en"),
      },
    },
  };
}

const stepIcons = [PixelPhone, PixelRobot, PixelFilter, PixelEmail, PixelUser];
const stepKeys = ["01", "02", "03", "04", "05"] as const;
const ucKeys = ["uc1", "uc2", "uc3"] as const;

export default function HomePage() {
  const t = useTranslations("home");

  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `${siteConfig.name} – ${t("heroHeadline")}`,
          url: absoluteUrl("/"),
          description: t("heroBody"),
          inLanguage: "de-DE",
          dateModified: "2026-03-23",
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
          },
        }}
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: siteConfig.name,
          description: t("heroBody"),
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web-basiert",
          url: absoluteUrl("/"),
          offers: [
            { "@type": "Offer", name: "Light", price: "39", priceCurrency: "EUR", priceSpecification: { "@type": "UnitPriceSpecification", price: "39", priceCurrency: "EUR", unitText: "Monat" } },
            { "@type": "Offer", name: "Starter", price: "89", priceCurrency: "EUR", priceSpecification: { "@type": "UnitPriceSpecification", price: "89", priceCurrency: "EUR", unitText: "Monat" } },
            { "@type": "Offer", name: "Professional", price: "199", priceCurrency: "EUR", priceSpecification: { "@type": "UnitPriceSpecification", price: "199", priceCurrency: "EUR", unitText: "Monat" } },
          ],
          provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
        }}
      />

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="pb-16 pt-16 sm:pt-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="default">{t("badge")}</Badge>
            <TypewriterHeading
              text={t("heroHeadline")}
              className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.12] text-white sm:text-5xl lg:text-6xl"
            />
            <p className="hero-description mt-5 max-w-2xl text-pretty text-base leading-relaxed text-zinc-300 sm:text-lg">
              {t("heroBody")}
            </p>
          </div>

          <div className="glass-card mx-auto w-full max-w-5xl rounded-3xl border border-brand-400/40 px-6 py-7 text-center shadow-[0_24px_60px_rgba(10,20,40,0.5)] sm:px-8 sm:py-9">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-300">
              {t("earlyAdopterLabel")}
            </p>
            <h2 className="mt-2 text-balance break-words text-2xl font-semibold text-white sm:text-3xl">
              {t("earlyAdopterHeadline")}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-300 sm:text-base">
              {t("earlyAdopterBody")}
            </p>
            <div className="mt-6">
              <HomeCtaActions />
            </div>
            <p className="mt-3 text-xs text-zinc-500">
              {t("earlyAdopterNote")}
            </p>
          </div>

          <div className="mt-2 flex flex-wrap gap-3 opacity-85 sm:mt-4">
            {(["feat1", "feat2", "feat3", "feat4"] as const).map((key) => (
              <span
                key={key}
                className="glass max-w-full rounded-full px-4 py-1.5 text-center text-sm font-medium text-pretty text-zinc-200 [text-wrap:balance]"
              >
                {t(key)}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-400">
              {t("howLabel")}
            </p>
            <h2 className="text-balance break-words text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {t("howHeadline")}
            </h2>
            <p className="mt-3 max-w-2xl text-pretty text-base text-zinc-300">
              {t("howBody")}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stepKeys.map((key, idx) => {
              const Icon = stepIcons[idx]!;
              return (
                <div
                  key={key}
                  className="glass-card group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:border-white/20"
                >
                  <span className="absolute right-4 top-4 select-none font-mono text-3xl font-bold text-white/5">
                    {key}
                  </span>
                  <Icon className="mb-3 h-7 w-7 text-brand-400" />
                  <h3 className="text-balance break-words text-base font-semibold text-white">
                    {t(`steps.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-zinc-400">
                    {t(`steps.${key}.body`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Voice Demo + Ticket Preview ──────────────────────────────── */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 bg-brand-500/10 blur-[120px] rounded-full" />
        <div className="absolute right-0 top-0 -z-10 h-[300px] w-[300px] bg-brand-600/5 blur-[80px] rounded-full" />

        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-400">
              {t("demoLabel")}
            </p>
            <h2 className="text-balance break-words text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {t("demoHeadline")}
            </h2>
            <p className="mt-4 max-w-2xl text-pretty text-lg text-zinc-300">
              {t("demoBody")}
            </p>
          </div>

          <div className="grid items-stretch gap-12 lg:grid-cols-2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-400/20 to-brand-500/20 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500" />
              <div className="relative z-10 h-full">
                <VoiceDemoCard />
              </div>
            </div>
            <TicketPreviewShowcase />
          </div>
        </div>
      </section>

      {/* ── Use Cases ────────────────────────────────────────────────── */}
      <section className="pb-20 pt-4">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-400">
              {t("whyLabel")}
            </p>
            <h2 className="text-balance break-words text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {t("whyHeadline")}
            </h2>
            <p className="mt-3 max-w-2xl text-pretty text-base text-zinc-300">
              {t("whyBody")}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {ucKeys.map((key) => (
              <div
                key={key}
                className="glass-card group rounded-2xl p-6 transition-all duration-300 hover:border-white/20"
              >
                <h3 className="text-balance break-words text-lg font-semibold text-white">{t(`useCases.${key}.title`)}</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-zinc-400">
                  {t(`useCases.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────────────── */}
      <section className="pb-24">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance break-words text-2xl font-semibold text-white sm:text-3xl">
              {t("ctaHeadline")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">
              {t("ctaBody")}
            </p>
            <div className="mt-6">
              <HomeCtaActions />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
