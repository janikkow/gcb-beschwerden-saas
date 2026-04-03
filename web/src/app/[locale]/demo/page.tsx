import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import DemoForm from "@/components/forms/demo-form";
import { absoluteUrl } from "@/lib/site";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.demo" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { languages: { de: absoluteUrl("/de/demo"), en: absoluteUrl("/en/demo") } },
  };
}

export default async function DemoPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "demo" });

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-400">
            {t("pageLabel")}
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {t("pageHeadline")}
          </h1>
          <p className="mt-3 text-pretty text-base text-zinc-300">
            {t("pageBody")}
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[2fr_1fr]">
          <Suspense
            fallback={
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 text-sm text-zinc-400">
                {t("formLoading")}
              </div>
            }
          >
            <DemoForm />
          </Suspense>

          <div className="space-y-4">
            <div
              className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-2xl"
              style={{ WebkitBackdropFilter: "blur(24px)" }}
            >
              <p className="mb-1 text-sm font-semibold text-white">{t("afterSubmitTitle")}</p>
              <p className="text-pretty text-sm leading-relaxed text-zinc-300 break-words">{t("afterSubmitBody")}</p>
            </div>
            <div
              className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-5 backdrop-blur-2xl"
              style={{ WebkitBackdropFilter: "blur(24px)" }}
            >
              <p className="mb-1 text-sm font-semibold text-emerald-300">{t("spamTitle")}</p>
              <p className="text-pretty text-sm leading-relaxed text-zinc-300 break-words">{t("spamBody")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
