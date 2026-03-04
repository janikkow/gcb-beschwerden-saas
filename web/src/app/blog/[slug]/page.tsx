import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { getAllPosts, getPostBySlug, mdxLikeToHtml } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
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

  return (
    <Section
      eyebrow="Blogartikel"
      title={post.title}
      description={`${new Date(post.date).toLocaleDateString("de-DE")} · ${post.tags.join(", ")}`}
    >
      <Card className="blog-prose">
        <div dangerouslySetInnerHTML={{ __html: mdxLikeToHtml(post.body) }} />
      </Card>
    </Section>
  );
}
