import Link from "next/link";
import Container from "@/components/ui/container";
import { siteConfig } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50/70 py-10">
      <Container>
        <div className="grid gap-8 md:grid-cols-3">
          <section>
            <h3 className="text-sm font-semibold text-ink-900">{siteConfig.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Voice Intake, AI-Klassifikation und Ticket-Ausgabe fuer
              unbeaufsichtigte Infrastruktur.
            </p>
          </section>
          <section>
            <h3 className="text-sm font-semibold text-ink-900">Navigation</h3>
            <ul className="mt-2 space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/produkt" className="hover:text-brand-700">
                  Produkt
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-brand-700">
                  Security
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-brand-700">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/glossar" className="hover:text-brand-700">
                  Glossar
                </Link>
              </li>
            </ul>
          </section>
          <section>
            <h3 className="text-sm font-semibold text-ink-900">Legal</h3>
            <ul className="mt-2 space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/legal/impressum" className="hover:text-brand-700">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/legal/datenschutz" className="hover:text-brand-700">
                  Datenschutz
                </Link>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-brand-700">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </section>
        </div>
        <p className="mt-8 text-xs text-slate-500">
          © {new Date().getFullYear()} {siteConfig.legalName}. Alle Rechte
          vorbehalten.
        </p>
      </Container>
    </footer>
  );
}
