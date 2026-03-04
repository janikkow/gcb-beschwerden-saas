import Link from "next/link";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/30 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="text-sm font-bold tracking-wide text-white">
          NODE<span className="text-brand-400">ZERO</span>
        </Link>
        <nav className="hidden items-center gap-5 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-zinc-300 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button href="/demo" className="hidden sm:inline-flex">
          Demo anfragen
        </Button>
      </Container>
    </header>
  );
}
