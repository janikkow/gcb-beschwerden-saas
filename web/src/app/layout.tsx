import type { Metadata, Viewport } from "next";
import { Share_Tech_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import SiteFooter from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";
import PreloaderWrapper from "@/components/preloader-wrapper";
import StructuredData from "@/components/structured-data";
import { absoluteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

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
  icons: {
    icon: [
      { url: "/outag3-favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/outag3-favicon.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={shareTechMono.variable}>
      <body className="scanlines" style={{ backgroundColor: "#000" }}>
        <StructuredData
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: siteConfig.name,
            legalName: siteConfig.legalName,
            url: siteConfig.url,
            email: siteConfig.email,
            logo: absoluteUrl("/og-default.svg"),
            foundingDate: "2025",
            founders: [
              { "@type": "Person", name: "Jonas Dutz" },
              { "@type": "Person", name: "Janik Kowalsky" },
              { "@type": "Person", name: "Philipp Then" },
            ],
            address: {
              "@type": "PostalAddress",
              streetAddress: "Beethovenweg 14",
              addressLocality: "Mellrichstadt",
              postalCode: "97638",
              addressCountry: "DE",
            },
            contactPoint: [
              {
                "@type": "ContactPoint",
                contactType: "sales",
                telephone: siteConfig.phoneTel,
                email: siteConfig.email,
                areaServed: "DE",
                availableLanguage: "de",
              },
            ],
          }}
        />
        <StructuredData
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteConfig.name,
            url: siteConfig.url,
            inLanguage: "de-DE",
            publisher: {
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
            },
          }}
        />
        <PreloaderWrapper>
          <div className="min-h-screen bg-site-gradient">
            <SiteHeader />
            {children}
            <SiteFooter />
          </div>
        </PreloaderWrapper>
        <Analytics />
      </body>
    </html>
  );
}
