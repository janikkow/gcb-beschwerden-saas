import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
}: MetadataInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "de_DE",
      type: "website",
      images: [
        {
          url: absoluteUrl("/og-default.svg"),
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} Open Graph`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl("/og-default.svg")],
    },
  };
}
