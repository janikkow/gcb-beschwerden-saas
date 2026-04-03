import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteConfig, absoluteUrl } from "@/lib/site";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.datenschutz" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: {
        de: absoluteUrl("/de/legal/datenschutz"),
        en: absoluteUrl("/en/legal/datenschutz"),
      },
    },
  };
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
        {title}
      </p>
      <div className="space-y-3 text-pretty text-sm leading-relaxed text-zinc-300 break-words">
        {children}
      </div>
    </div>
  );
}

export default async function DatenschutzPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "datenschutz" });

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto w-full max-w-2xl px-5 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-400">
            {t("pageLabel")}
          </p>
          <h1 className="text-balance break-words text-3xl font-semibold text-white">
            {t("pageHeadline")}
          </h1>
          <p className="mt-2 text-pretty text-sm text-zinc-500">
            {t("pageSubheadline")}
          </p>
        </div>

        <div
          className="space-y-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-6 text-sm leading-relaxed backdrop-blur-2xl"
          style={{ WebkitBackdropFilter: "blur(24px)" }}
        >
          {/* 1. Controller */}
          <Block title={t("s1Title")}>
            <p>{t("s1Intro")}</p>
            <p className="text-zinc-200">
              {siteConfig.legalName}
              <br />
              Beethovenweg 14
              <br />
              97638 Mellrichstadt
              <br />
              {t("s1Country")}
            </p>
            <p>
              {t("s1PhoneLabel")}{" "}
              <a
                href={`tel:${siteConfig.phoneTel}`}
                className="text-brand-400 transition-colors hover:text-brand-300"
              >
                {siteConfig.phoneDisplay}
              </a>
              <br />
              {t("s1EmailLabel")}{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-brand-400 transition-colors hover:text-brand-300"
              >
                {siteConfig.email}
              </a>
            </p>
          </Block>

          {/* 2. Hosting */}
          <Block title={t("s2Title")}>
            <p>
              {t.rich("s2p1", {
                strong: (chunks) => (
                  <strong className="text-zinc-200">{chunks}</strong>
                ),
              })}
            </p>
            <p>
              {t.rich("s2p2", {
                a: (chunks) => (
                  <a
                    href="https://vercel.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-400 transition-colors hover:text-brand-300"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>
          </Block>

          {/* 3. Waitlist / contact form */}
          <Block title={t("s3Title")}>
            <p>{t("s3Intro")}</p>
            <ul className="list-inside list-disc space-y-1 text-zinc-300">
              <li>{t("s3li1")}</li>
              <li>{t("s3li2")}</li>
              <li>{t("s3li3")}</li>
              <li>{t("s3li4")}</li>
              <li>{t("s3li5")}</li>
              <li>{t("s3li6")}</li>
            </ul>
            <p>{t("s3p2")}</p>
            <p>{t("s3p3")}</p>
          </Block>

          {/* 4. AI voice processing */}
          <Block title={t("s4Title")}>
            <p>
              {t.rich("s4p1", {
                strong: (chunks) => (
                  <strong className="text-zinc-200">{chunks}</strong>
                ),
              })}
            </p>
            <p>{t("s4p2")}</p>
            <p>
              {t.rich("s4p3", {
                a: (chunks) => (
                  <a
                    href="https://ultravox.ai/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-400 transition-colors hover:text-brand-300"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>
          </Block>

          {/* 5. Cookies */}
          <Block title={t("s5Title")}>
            <p>{t("s5p1")}</p>
            <p>{t("s5p2")}</p>
            <p>{t("s5p3")}</p>
          </Block>

          {/* 6. Rights */}
          <Block title={t("s6Title")}>
            <p>{t("s6Intro")}</p>
            <ul className="list-inside list-disc space-y-1 text-zinc-300">
              <li>{t("s6li1")}</li>
              <li>{t("s6li2")}</li>
              <li>{t("s6li3")}</li>
              <li>{t("s6li4")}</li>
              <li>{t("s6li5")}</li>
              <li>{t("s6li6")}</li>
            </ul>
            <p>
              {t.rich("s6p2", {
                email: () => (
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-brand-400 transition-colors hover:text-brand-300"
                  >
                    {siteConfig.email}
                  </a>
                ),
              })}
            </p>
            <p>
              {t.rich("s6p3", {
                strong: (chunks) => (
                  <strong className="text-zinc-200">{chunks}</strong>
                ),
                a: (chunks) => (
                  <a
                    href="https://www.lda.bayern.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-400 transition-colors hover:text-brand-300"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>
          </Block>

          {/* 7. Updates */}
          <Block title={t("s7Title")}>
            <p>
              {t.rich("s7p1", {
                link: (chunks) => (
                  <Link
                    href="/legal/datenschutz"
                    className="text-brand-400 transition-colors hover:text-brand-300"
                  >
                    {chunks}
                  </Link>
                ),
              })}
            </p>
            <p className="text-xs text-zinc-500">{t("s7date")}</p>
          </Block>
        </div>
      </div>
    </section>
  );
}
