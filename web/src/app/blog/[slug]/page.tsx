import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/container";
import StructuredData from "@/components/structured-data";
import { Card } from "@/components/ui/card";
import {
  extractHeadings,
  getAllPosts,
  getPostBySlug,
  mdxLikeToHtml,
} from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

const averageReadingTimeMinutes = (text: string): number => {
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 220));
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return buildMetadata({
      title: "Artikel nicht gefunden",
      description: "Der angefragte Blogpost existiert nicht.",
      path: `/blog/${slug}`,
    });
  }

  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
  });
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const headings = extractHeadings(post.body);
  const html = mdxLikeToHtml(post.body);
  const readingTime = averageReadingTimeMinutes(post.body);
  const date = new Date(post.date).toLocaleDateString("de-DE");

  return (
    <main className="py-14 sm:py-20">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Start", item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
            { "@type": "ListItem", position: 3, name: post.title, item: absoluteUrl(`/blog/${slug}`) },
          ],
        }}
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.description,
          url: absoluteUrl(`/blog/${slug}`),
          datePublished: post.date,
          dateModified: post.date,
          inLanguage: "de-DE",
          author: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
          },
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
            logo: {
              "@type": "ImageObject",
              url: absoluteUrl("/og-default.svg"),
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": absoluteUrl(`/blog/${slug}`),
          },
          keywords: post.tags,
          wordCount: post.body.trim().split(/\s+/).length,
        }}
      />
      <Container>
        <header className="mb-8 max-w-4xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-300">
            Blogartikel
          </p>
          <h1 className="text-balance font-display text-3xl font-semibold leading-tight text-white sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 max-w-3xl text-pretty text-base text-zinc-300 sm:text-lg">
            {post.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-400">
            <span>{date}</span>
            <span>ca. {readingTime} Min. Lesezeit</span>
            <span>GCB Redaktion</span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="space-y-4">
            {headings.length > 0 ? (
              <Card className="border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl lg:hidden">
                <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-200">
                  Inhaltsverzeichnis
                </h2>
                <ul className="mt-3 space-y-2">
                  {headings.map((heading) => (
                    <li key={heading.id}>
                      <a
                        href={`#${heading.id}`}
                        className={cn(
                          "text-sm text-zinc-300 hover:text-brand-300",
                          heading.level === 3 && "pl-3 text-zinc-400",
                        )}
                      >
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </Card>
            ) : null}

            <Card className="blog-prose border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl sm:p-8">
              <article dangerouslySetInnerHTML={{ __html: html }} />
            </Card>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <Card className="border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-200">
                  Inhaltsverzeichnis
                </h2>
                {headings.length ? (
                  <ul className="mt-3 space-y-2">
                    {headings.map((heading) => (
                      <li key={heading.id}>
                        <a
                          href={`#${heading.id}`}
                          className={cn(
                            "text-sm text-zinc-300 hover:text-brand-300",
                            heading.level === 3 && "pl-3 text-zinc-400",
                          )}
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-zinc-400">
                    Dieser Artikel hat keine Zwischenüberschriften.
                  </p>
                )}
              </Card>

              <Card className="border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                <p className="text-sm text-zinc-300">
                  Weitere Artikel aus dem Incident-Management Hub.
                </p>
                <Link
                  href="/blog"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-300 hover:text-brand-200"
                >
                  Zur Blog-Übersicht
                  <span aria-hidden>{"->"}</span>
                </Link>
              </Card>
            </div>
          </aside>
        </div>
      </Container>
    </main>
  );
}
