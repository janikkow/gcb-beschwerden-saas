import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.NODE_ENV === "production";

  return {
    rules: {
      userAgent: "*",
      allow: isProd ? "/" : "",
      disallow: isProd ? "" : "/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
