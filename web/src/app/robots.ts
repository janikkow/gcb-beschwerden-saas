import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.NODE_ENV === "production";

  return {
    rules: [
      {
        userAgent: "*",
        allow: isProd ? "/" : "",
        disallow: isProd ? "" : "/",
      },
      {
        userAgent: "GPTBot",
        allow: isProd ? "/" : "",
        disallow: isProd ? "" : "/",
      },
      {
        userAgent: "ChatGPT-User",
        allow: isProd ? "/" : "",
        disallow: isProd ? "" : "/",
      },
      {
        userAgent: "PerplexityBot",
        allow: isProd ? "/" : "",
        disallow: isProd ? "" : "/",
      },
      {
        userAgent: "ClaudeBot",
        allow: isProd ? "/" : "",
        disallow: isProd ? "" : "/",
      },
      {
        userAgent: "anthropic-ai",
        allow: isProd ? "/" : "",
        disallow: isProd ? "" : "/",
      },
      {
        userAgent: "Googlebot",
        allow: isProd ? "/" : "",
        disallow: isProd ? "" : "/",
      },
      {
        userAgent: "Bingbot",
        allow: isProd ? "/" : "",
        disallow: isProd ? "" : "/",
      },
    ],
    host: absoluteUrl("/"),
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
