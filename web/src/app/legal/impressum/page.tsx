import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Impressum",
  description: "Rechtliche Anbieterkennzeichnung gemäß § 5 TMG.",
  path: "/legal/impressum",
});

export default function ImpressumPage() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto w-full max-w-2xl px-5 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-400">
            Rechtliches
          </p>
          <h1 className="text-3xl font-semibold text-white">Impressum</h1>
          <p className="mt-2 text-sm text-zinc-500">Angaben gemäß § 5 TMG</p>
        </div>

        <div
          className="space-y-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-6 text-sm leading-relaxed backdrop-blur-2xl"
          style={{ WebkitBackdropFilter: "blur(24px)" }}
        >
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
              Anbieter
            </p>
            <p className="text-zinc-200">
              Dutz Jonas, Kowalsky Janik, Then Philipp GbR
              <br />
              Beethovenweg 14
              <br />
              97638 Mellrichstadt
            </p>
          </div>

          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
              Vertreten durch
            </p>
            <p className="text-zinc-200">Janik Kowalsky</p>
          </div>

          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
              Kontakt
            </p>
            <p className="text-zinc-200">
              Telefon: {siteConfig.phoneDisplay}
              <br />
              E-Mail:{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-brand-400 hover:text-brand-300 transition-colors"
              >
                {siteConfig.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
