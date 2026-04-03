import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

export default function SiteFooter() {
  const t = useTranslations("footer");
  const tSite = useTranslations();

  return (
    <footer className="mt-16 border-t border-white/10 bg-black/20 py-10 backdrop-blur-xl">
      <Container>
        <div className="grid gap-8 md:grid-cols-3">
          <section>
            <h3 className="text-sm font-semibold text-white">{siteConfig.name}</h3>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-zinc-300 break-words">
              {tSite("siteDescription")}
            </p>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-zinc-200">{t("nav")}</h3>
            <ul className="mt-2 space-y-2 text-sm text-zinc-300">
              <li>
                <Link href="/preise" className="transition hover:text-zinc-200">{t("preise")}</Link>
              </li>
              <li>
                <Link href="/faq" className="transition hover:text-zinc-200">{t("faq")}</Link>
              </li>
              <li>
                <Link href="/blog" className="transition hover:text-zinc-200">{t("blog")}</Link>
              </li>
              <li>
                <Link href="/glossar" className="transition hover:text-zinc-200">{t("glossar")}</Link>
              </li>
              <li>
                <Link href="/demo" className="transition hover:text-zinc-200">{t("demo")}</Link>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-zinc-200">{t("legal")}</h3>
            <ul className="mt-2 space-y-2 text-sm text-zinc-300">
              <li>
                <Link href="/legal/impressum" className="transition hover:text-zinc-200">{t("impressum")}</Link>
              </li>
              <li>
                <Link href="/legal/datenschutz" className="transition hover:text-zinc-200">{t("datenschutz")}</Link>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="transition hover:text-zinc-200">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </section>
        </div>

        <p className="mt-8 text-xs text-zinc-400">
          © {new Date().getFullYear()} {siteConfig.legalName}. {t("rights")}
        </p>
      </Container>
    </footer>
  );
}
