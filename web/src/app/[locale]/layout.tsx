import type { Metadata, Viewport } from "next";
import { Share_Tech_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import CookieConsent from "@/components/cookie-consent";
import SiteFooter from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";
import PreloaderWrapper from "@/components/preloader-wrapper";
import StructuredData from "@/components/structured-data";
import { routing } from "@/i18n/routing";
import { absoluteUrl, siteConfig } from "@/lib/site";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const description = t("siteDescription");
  const ogLocale = locale === "en" ? "en_US" : "de_DE";

  return {
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    metadataBase: new URL(siteConfig.url),
    description,
    alternates: {
      canonical: absoluteUrl(`/${locale}`),
      languages: {
        de: absoluteUrl("/de"),
        en: absoluteUrl("/en"),
      },
    },
    openGraph: {
      title: siteConfig.name,
      description,
      url: absoluteUrl(`/${locale}`),
      siteName: siteConfig.name,
      locale: ogLocale,
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
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.png", type: "image/png", sizes: "1024x1024" },
        { url: "/outag3-favicon.svg", type: "image/svg+xml" },
      ],
      shortcut: ["/favicon.ico"],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "de" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={shareTechMono.variable}>
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
                availableLanguage: ["de", "en"],
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
            inLanguage: locale === "en" ? "en-US" : "de-DE",
            publisher: {
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
            },
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <PreloaderWrapper>
            <div className="min-h-screen bg-site-gradient">
              <SiteHeader />
              {children}
              <SiteFooter />
            </div>
          </PreloaderWrapper>
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
