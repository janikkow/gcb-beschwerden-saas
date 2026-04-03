"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const localeLabels: Record<string, string> = {
  de: "DE",
  en: "EN",
};

const localeAriaKeys: Record<string, "switchToGerman" | "switchToEnglish"> = {
  de: "switchToGerman",
  en: "switchToEnglish",
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("nav");

  const handleSwitch = (next: string) => {
    router.replace(pathname, { locale: next });
  };

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-white/15 bg-white/5 p-0.5">
      {routing.locales.map((loc) => {
        const active = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => handleSwitch(loc)}
            aria-label={t(localeAriaKeys[loc]!)}
            aria-pressed={active}
            className={`min-w-[2rem] rounded-full px-2.5 py-1 text-xs font-bold tracking-wide transition-all duration-200 ${
              active
                ? "bg-brand-400 text-zinc-950 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {localeLabels[loc]}
          </button>
        );
      })}
    </div>
  );
}
