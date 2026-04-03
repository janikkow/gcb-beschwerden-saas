import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";

const locales = ["de", "en"];

const staticPaths = [
  "/",
  "/preise",
  "/faq",
  "/demo",
  "/blog",
  "/glossar",
  "/legal/impressum",
  "/legal/datenschutz",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const posts = await getAllPosts();

  const staticEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: absoluteUrl(`/${locale}${path === "/" ? "" : path}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.7,
    })),
  );

  const blogEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    posts.map((post) => ({
      url: absoluteUrl(`/${locale}/blog/${post.slug}`),
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  );

  return [...staticEntries, ...blogEntries];
}
