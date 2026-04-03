import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/container";
import StructuredData from "@/components/structured-data";
import { Card } from "@/components/ui/card";
import {
  extractHeadings,
  getAllPosts,
  getPostBySlug,
  mdxLikeToHtml,
} from "@/lib/blog";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type BlogDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

const averageReadingTimeMinutes = (text: string): number => {
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 220));
};

export async function generateStaticParams() {
  const [dePosts, enPosts] = await Promise.all([
    getAllPosts("de"),
    getAllPosts("en"),
  ]);
  const slugs = new Set([
    ...dePosts.map((p) => p.slug),
    ...enPosts.map((p) => p.slug),
  ]);
  return ["de", "en"].flatMap((locale) =>
    [...slugs].map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const post = await getPostBySlug(slug, locale);

  if (!post) {
    return {
      title: t("articleNotFound"),
      description: t("articleNotFoundDesc"),
    };
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: absoluteUrl(`/${locale}/blog/${slug}`),
      languages: {
        de: absoluteUrl(`/de/blog/${slug}`),
        en: absoluteUrl(`/en/blog/${slug}`),
      },
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const post = await getPostBySlug(slug, locale);

  if (!post) notFound();

  const headings = extractHeadings(post.body);
  const html = mdxLikeToHtml(post.body);
  const readingTime = averageReadingTimeMinutes(post.body);
  const date = new Date(post.date).toLocaleDateString(locale === "en" ? "en-GB" : "de-DE");

  return (
    <main className="py-14 sm:py-20">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Start", item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl(`/${locale}/blog`) },
            { "@type": "ListItem", position: 3, name: post.title, item: absoluteUrl(`/${locale}/blog/${slug}`) },
          ],
        }}
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.description,
          url: absoluteUrl(`/${locale}/blog/${slug}`),
          datePublished: post.date,
          dateModified: post.date,
          inLanguage: locale === "en" ? "en-US" : "de-DE",
          author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
            logo: { "@type": "ImageObject", url: absoluteUrl("/og-default.svg") },
          },
          mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(`/${locale}/blog/${slug}`) },
          keywords: post.tags,
          wordCount: post.body.trim().split(/\s+/).length,
        }}
      />
      <Container>
        <header className="mb-8 max-w-4xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-300">
            {t("articleLabel")}
          </p>
          <h1 className="text-balance break-words font-display text-3xl font-semibold leading-tight text-white sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 max-w-3xl text-pretty text-base text-zinc-300 break-words sm:text-lg">
            {post.description}
          </p>

          <div className="mt-5 flex flex-col gap-1 text-sm text-zinc-400 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2">
            <span>{date}</span>
            <span>{t("readingTime", { min: readingTime })}</span>
            <span>{t("author")}</span>
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
                  {t("tocTitle")}
                </h2>
                <ul className="mt-3 space-y-2">
                  {headings.map((heading) => (
                    <li key={heading.id}>
                      <a
                        href={`#${heading.id}`}
                        className={cn(
                          "text-pretty break-words text-sm text-zinc-300 hover:text-brand-300",
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

            <Card className="blog-prose border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl sm:p-8">
              <article dangerouslySetInnerHTML={{ __html: html }} />
            </Card>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <Card className="border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-200">
                  {t("tocTitle")}
                </h2>
                {headings.length ? (
                  <ul className="mt-3 space-y-2">
                    {headings.map((heading) => (
                      <li key={heading.id}>
                        <a
                          href={`#${heading.id}`}
                          className={cn(
                            "text-pretty break-words text-sm text-zinc-300 hover:text-brand-300",
                            heading.level === 3 && "pl-3 text-zinc-400",
                          )}
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-zinc-400">{t("tocEmpty")}</p>
                )}
              </Card>

              <Card className="border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                <p className="text-sm text-zinc-300">{t("moreArticles")}</p>
                <Link
                  href="/blog"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-300 hover:text-brand-200"
                >
                  {t("toBlogOverview")}
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
