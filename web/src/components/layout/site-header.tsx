"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui/gradient-button";
import { siteConfig } from "@/lib/site";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <Container className="flex h-16 items-center justify-between gap-6">
          <Link href="/" className="text-lg font-extrabold tracking-[0.06em] text-white sm:text-xl">
            OUTAG<span className="text-brand-400">3</span>
          </Link>

          {/* Desktop nav */}
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

          {/* Desktop CTA */}
          <GradientButton
            asChild
            className="hidden md:inline-flex min-w-0 rounded-full px-5 py-2 text-sm"
          >
            <Link href="/demo">Auf die Waitlist</Link>
          </GradientButton>

          {/* Hamburger button */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 md:hidden"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
          >
            <span
              className={`absolute h-0.5 w-4 rounded-full bg-white transition-all duration-300 ${
                open ? "translate-y-0 rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute h-0.5 w-4 rounded-full bg-white transition-all duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute h-0.5 w-4 rounded-full bg-white transition-all duration-300 ${
                open ? "translate-y-0 -rotate-45" : "translate-y-1.5"
              }`}
            />
          </button>
        </Container>
      </header>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-50 flex flex-col transition-all duration-300 md:pointer-events-none md:hidden ${
          open
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          onClick={() => setOpen(false)}
        />

        {/* Menu content */}
        <div
          className={`relative mt-16 flex flex-1 flex-col border-t border-white/10 bg-black/80 backdrop-blur-2xl transition-transform duration-300 ${
            open ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          <nav className="flex flex-col px-6 pt-8">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`border-b border-white/5 py-4 text-lg font-medium transition ${
                  pathname === item.href
                    ? "text-brand-300"
                    : "text-zinc-200 active:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="px-6 pt-6">
            <Button
              href="/demo"
              className="w-full justify-center rounded-full border border-brand-300/70 bg-brand-400 text-sm font-semibold text-zinc-950 shadow-[0_8px_26px_rgba(98,164,255,0.35)] transition-all hover:bg-white hover:text-zinc-950"
              onClick={() => setOpen(false)}
            >
              Auf die Waitlist
            </Button>
          </div>

          <p className="mt-auto px-6 pb-8 text-xs text-zinc-600">
            {siteConfig.legalName}
          </p>
        </div>
      </div>
    </>
  );
}
