import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/container";
import StructuredData from "@/components/structured-data";
import { Card } from "@/components/ui/card";
import { getAllPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Blog – Incident Management & Voice Intake Insights",
  description:
    "Pillar- und Support-Artikel zu Incident Management, Voice Intake und Priorisierung im Betrieb autonomer Standorte.",
  path: "/blog",
  keywords: [
    "incident management blog",
    "voice intake artikel",
    "beschwerdemanagement insights",
    "automatenläden priorisierung",
    "ki support blog",
  ],
});

const editorialAccents = [
  "from-sky-500/90 via-brand-500/80 to-indigo-700/90",
  "from-emerald-500/90 via-teal-500/80 to-cyan-700/90",
  "from-amber-500/90 via-orange-500/80 to-rose-700/90",
  "from-fuchsia-500/90 via-violet-500/80 to-indigo-700/90",
] as const;

const averageReadingTimeMinutes = (text: string): number => {
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 220));
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="py-14 sm:py-20">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Start", item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
          ],
        }}
      />
      <Container>
        <header className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-300">
            Blog
          </p>
          <h1 className="text-balance font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Insights für Incident-Management im Alltag
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base text-zinc-300 sm:text-lg">
            Praxisnahe Artikel zu Voice Intake, Priorisierung und stabilen
            Support-Prozessen für Betreiber autonomer Standorte.
          </p>
        </header>

        <div className="space-y-6 sm:space-y-8">
          {posts.map((post, index) => {
            const isMirrored = index % 2 === 1;
            const accent = editorialAccents[index % editorialAccents.length];
            const formattedDate = new Date(post.date).toLocaleDateString("de-DE");
            const readingTime = averageReadingTimeMinutes(post.body);

            return (
              <Card
                key={post.slug}
                className="overflow-hidden border-white/15 bg-white/[0.06] p-0 backdrop-blur-xl"
              >
                <article className="grid md:grid-cols-10">
                  <div
                    className={cn(
                      "relative min-h-52 overflow-hidden p-6 sm:min-h-64 md:col-span-4",
                      isMirrored && "md:order-2",
                    )}
                  >
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-br opacity-90",
                        accent,
                      )}
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.24),transparent_55%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(11,22,44,0.35),transparent_50%)]" />

                    <div className="relative flex h-full flex-col justify-between">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
                        {formattedDate}
                      </p>
                      <p className="max-w-[16rem] text-sm font-medium leading-relaxed text-white/90">
                        {post.tags.slice(0, 2).join(" · ") || "Incident Management"}
                      </p>
                    </div>
                  </div>

                  <div
                    className={cn(
                      "flex flex-col justify-between p-6 sm:p-7 md:col-span-6",
                      isMirrored && "md:order-1",
                    )}
                  >
                    <div>
                      <div className="mb-4 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h2 className="text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                        <Link href={`/blog/${post.slug}`} className="hover:underline">
                          {post.title}
                        </Link>
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">
                        {post.description}
                      </p>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                      <p className="text-xs text-zinc-400">
                        GCB Redaktion · ca. {readingTime} Min. Lesezeit
                      </p>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-brand-300 hover:text-brand-200"
                      >
                        Artikel lesen
                        <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              </Card>
            );
          })}
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-xl">
          <p className="text-sm text-zinc-300">
            Neue Artikel erscheinen laufend aus dem Repository und werden statisch
            ausgeliefert.
          </p>
          <div className="mt-4">
            <Link
              href="/demo"
              className="inline-flex items-center gap-1 text-sm font-semibold text-brand-300 hover:text-brand-200"
            >
              Demo sichern
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
