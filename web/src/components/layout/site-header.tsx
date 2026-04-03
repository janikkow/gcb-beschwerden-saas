"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui/gradient-button";
import LanguageSwitcher from "@/components/language-switcher";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/lib/site";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("nav");

  const navItems = [
    { href: "/" as const, label: t("start") },
    { href: "/preise" as const, label: t("preise") },
    { href: "/faq" as const, label: t("faq") },
    { href: "/blog" as const, label: t("blog") },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <Container className="flex h-16 items-center justify-between gap-6">
          <Link href="/" className="text-lg font-extrabold tracking-[0.06em] text-white sm:text-xl">
            OUTAG<span className="text-brand-400">3</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-5 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-zinc-300 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right: lang switcher + CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher />
            <GradientButton
              asChild
              className="min-w-0 rounded-full px-5 py-2 text-sm"
            >
              <Link href="/demo">{t("demoButton")}</Link>
            </GradientButton>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 md:hidden"
                aria-label={open ? t("menuClose") : t("menuOpen")}
                aria-expanded={open}
                aria-controls="mobile-menu-sheet"
                aria-haspopup="dialog"
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
            </SheetTrigger>

            <SheetContent
              id="mobile-menu-sheet"
              side="top"
              showCloseButton={false}
              className="mt-16 border-t border-white/10 bg-black/80 p-0 backdrop-blur-2xl md:hidden"
            >
              <SheetTitle className="sr-only">{t("mainNav")}</SheetTitle>
              <SheetDescription className="sr-only">
                {t("mainNavDesc")}
              </SheetDescription>
              <nav className="flex flex-col px-6 pt-8">
                {navItems.map((item) => (
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
                  variant="cta"
                  className="w-full justify-center"
                  onClick={() => setOpen(false)}
                >
                  {t("demoButton")}
                </Button>
              </div>

              <div className="px-6 pt-4 flex justify-center">
                <LanguageSwitcher />
              </div>

              <p className="mt-auto px-6 pb-8 text-center text-pretty text-xs leading-relaxed text-zinc-500 break-words">
                {siteConfig.legalName}
              </p>
            </SheetContent>
          </Sheet>
        </Container>
      </header>
    </>
  );
}
