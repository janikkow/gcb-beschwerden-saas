export const siteConfig = {
  name: "OUTAG3",
  legalName: "Dutz Jonas, Kowalsky Janik, Then Philipp GbR",
  description:
    "Kunden melden Probleme am Automaten per Anruf. Du bekommst sofort eine klare Aufgabe mit Priorität – ohne Papierchaos und ohne IT-Kenntnisse.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ??
    "https://outag3.com",
  phoneDisplay: "+49 89 1234 5678",
  phoneTel: "+498912345678",
  email: "info@gcbavaria.com",
  nav: [
    { href: "/", label: "Start" },
    { href: "/preise", label: "Preise" },
    { href: "/faq", label: "FAQ" },
    { href: "/blog", label: "Blog" },
  ],
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
