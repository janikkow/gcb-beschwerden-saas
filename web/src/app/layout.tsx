import type { Metadata } from "next";
import SiteFooter from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";
import StructuredData from "@/components/structured-data";
import { absoluteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: absoluteUrl("/og-default.svg"),
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>
        <StructuredData
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: siteConfig.name,
            legalName: siteConfig.legalName,
            url: siteConfig.url,
            email: siteConfig.email,
            contactPoint: [
              {
                "@type": "ContactPoint",
                contactType: "sales",
                telephone: siteConfig.phoneTel,
                areaServed: "DE",
              },
            ],
          }}
        />
        <div className="min-h-screen bg-site-gradient">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
