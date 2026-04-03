export const siteConfig = {
  name: "OUTAG3",
  legalName: "DTK Workflows",
  description:
    "Der digitale Front-Desk für deine Automaten. Wir verwandeln unstrukturierte Frust-Anrufe in klare, priorisierte Aufgaben – damit du 24/7 ruhig schlafen kannst.",
  url: "https://outag3.com",
  phoneDisplay: "+49 89 1234 5678",
  phoneTel: "+498912345678",
  email: "ai@outag3.com",
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
