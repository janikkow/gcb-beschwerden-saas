export const siteConfig = {
  name: "GCB Incident Management",
  legalName: "GCB Bavaria",
  description:
    "Beschwerdemanagement fuer Automatenlaeden: Meldung per Telefon oder Webformular, KI-Vorsortierung und sofortige Ticket- oder E-Mail-Ausgabe.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ??
    "https://gcb-incident.example",
  phoneDisplay: "+49 89 1234 5678",
  phoneTel: "+498912345678",
  email: "info@gcbavaria.com",
  nav: [
    { href: "/", label: "Start" },
    { href: "/faq", label: "FAQ" },
    { href: "/blog", label: "Blog" },
  ],
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
