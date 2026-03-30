"use client";

import Link from "next/link";
import { useState } from "react";
import { Analytics } from "@vercel/analytics/react";

type ConsentState = "essential" | "all" | null;

const CONSENT_KEY = "outag3-cookie-consent-v1";
const ANALYTICS_COOKIE_PREFIXES = ["_ga", "_gid", "_gcl", "_cl", "_hj", "_fbp", "_vercel"];

const readConsent = (): ConsentState => {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = window.localStorage.getItem(CONSENT_KEY);
  if (stored === "essential" || stored === "all") {
    return stored;
  }
  return null;
};

const persistConsent = (value: Exclude<ConsentState, null>) => {
  window.localStorage.setItem(CONSENT_KEY, value);
};

const deleteCookieEverywhere = (name: string) => {
  const expires = "Expires=Thu, 01 Jan 1970 00:00:00 GMT";
  const base = `${name}=; ${expires}; path=/`;

  document.cookie = base;
  document.cookie = `${base}; domain=${window.location.hostname}`;
  document.cookie = `${base}; domain=.${window.location.hostname}`;

  if (window.location.hostname.endsWith("outag3.com")) {
    document.cookie = `${base}; domain=outag3.com`;
    document.cookie = `${base}; domain=.outag3.com`;
  }
};

const clearNonEssentialCookies = () => {
  const cookies = document.cookie
    .split(";")
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  for (const cookie of cookies) {
    const [name] = cookie.split("=");
    if (!name) continue;

    const isNonEssential = ANALYTICS_COOKIE_PREFIXES.some((prefix) =>
      name.toLowerCase().startsWith(prefix.toLowerCase()),
    );

    if (isNonEssential) {
      deleteCookieEverywhere(name);
    }
  }
};

export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState>(() => readConsent());

  const chooseConsent = (value: Exclude<ConsentState, null>) => {
    persistConsent(value);
    setConsent(value);

    if (value !== "all") {
      clearNonEssentialCookies();
    }
  };

  return (
    <>
      {consent === "all" ? <Analytics /> : null}

      {consent === null ? (
        <div className="fixed inset-x-4 bottom-4 z-50 mx-auto w-full max-w-2xl rounded-2xl border border-white/15 bg-black/70 p-4 text-sm text-zinc-200 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:inset-x-6 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-400">
            Datenschutz
          </p>
          <p className="mt-2 leading-relaxed text-zinc-300">
            Wir verwenden nur technisch notwendige Cookies. Optionale Analytics werden erst
            nach deiner Einwilligung aktiviert.
          </p>
          <p className="mt-2 text-xs text-zinc-500">
            Details in der{" "}
            <Link href="/legal/datenschutz" className="text-brand-300 hover:text-brand-200">
              Datenschutzerklärung
            </Link>
            .
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => chooseConsent("essential")}
              className="rounded-full border border-white/20 bg-white/5 px-4 py-2 font-semibold text-zinc-200 transition hover:border-white/30 hover:bg-white/10"
            >
              Nur notwendige Cookies
            </button>
            <button
              type="button"
              onClick={() => chooseConsent("all")}
              className="rounded-full border border-brand-300/70 bg-brand-400 px-4 py-2 font-semibold text-zinc-950 transition hover:bg-white"
            >
              Alle akzeptieren
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
