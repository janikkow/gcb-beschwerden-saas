"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Analytics } from "@vercel/analytics/react";

type ConsentState = "essential" | "all" | null;

const CONSENT_KEY = "outag3-cookie-consent-v1";
const LEGACY_CONSENT_KEYS = ["outag3-cookie-consent"];
const CONSENT_COOKIE = "outag3_cookie_consent";
const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;
const ANALYTICS_COOKIE_PREFIXES = ["_ga", "_gid", "_gcl", "_cl", "_hj", "_fbp", "_vercel"];

const parseConsentValue = (value: string | null): ConsentState => {
  if (value === "essential" || value === "all") {
    return value;
  }
  return null;
};

const readConsentCookie = (): ConsentState => {
  if (typeof document === "undefined") {
    return null;
  }

  const cookieChunk = document.cookie
    .split(";")
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith(`${CONSENT_COOKIE}=`));

  if (!cookieChunk) {
    return null;
  }

  const value = decodeURIComponent(cookieChunk.slice(CONSENT_COOKIE.length + 1));
  return parseConsentValue(value);
};

const readConsent = (): ConsentState => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const current = parseConsentValue(window.localStorage.getItem(CONSENT_KEY));
    if (current) {
      return current;
    }

    for (const legacyKey of LEGACY_CONSENT_KEYS) {
      const legacy = parseConsentValue(window.localStorage.getItem(legacyKey));
      if (legacy) {
        window.localStorage.setItem(CONSENT_KEY, legacy);
        return legacy;
      }
    }

    const cookieConsent = readConsentCookie();
    if (cookieConsent) {
      window.localStorage.setItem(CONSENT_KEY, cookieConsent);
      for (const legacyKey of LEGACY_CONSENT_KEYS) {
        window.localStorage.removeItem(legacyKey);
      }
      return cookieConsent;
    }
  } catch (error) {
    console.warn("Cookie consent read failed", error);
  }

  try {
    return readConsentCookie();
  } catch (error) {
    console.warn("Cookie consent cookie read failed", error);
  }

  return null;
};

const persistConsentCookie = (value: Exclude<ConsentState, null>) => {
  if (typeof window === "undefined") {
    return;
  }

  const securePart = window.location.protocol === "https:" ? "; Secure" : "";
  const encoded = encodeURIComponent(value);
  const base = `${CONSENT_COOKIE}=${encoded}; Max-Age=${CONSENT_MAX_AGE_SECONDS}; Path=/; SameSite=Lax${securePart}`;

  document.cookie = base;
  document.cookie = `${base}; Domain=${window.location.hostname}`;
  document.cookie = `${base}; Domain=.${window.location.hostname}`;

  if (window.location.hostname.endsWith("outag3.com")) {
    document.cookie = `${base}; Domain=outag3.com`;
    document.cookie = `${base}; Domain=.outag3.com`;
  }
};

const persistConsent = (value: Exclude<ConsentState, null>) => {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
    for (const legacyKey of LEGACY_CONSENT_KEYS) {
      window.localStorage.removeItem(legacyKey);
    }
  } catch (error) {
    console.warn("Cookie consent persist failed", error);
  }

  try {
    persistConsentCookie(value);
  } catch (error) {
    console.warn("Cookie consent cookie persist failed", error);
  }
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
  try {
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
  } catch (error) {
    console.warn("Cookie cleanup failed", error);
  }
};

export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState>(() => readConsent());
  const t = useTranslations("cookie");

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
        <div className="fixed inset-x-3 bottom-3 z-[80] mx-auto w-[calc(100%-1.5rem)] max-w-2xl rounded-2xl border border-white/15 bg-black/70 p-4 text-sm text-zinc-200 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:inset-x-6 sm:bottom-4 sm:w-full sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-400">
            {t("heading")}
          </p>
          <p className="mt-2 text-pretty leading-relaxed text-zinc-300 break-words">
            {t("body")}
          </p>
          <p className="mt-2 text-pretty text-xs text-zinc-500 break-words">
            {t("detailsPrefix")}{" "}
            <Link href="/legal/datenschutz" className="text-brand-300 hover:text-brand-200">
              {t("detailsLink")}
            </Link>
            .
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => chooseConsent("essential")}
              className="rounded-full border border-white/20 bg-white/5 px-4 py-2 font-semibold text-zinc-200 transition hover:border-white/30 hover:bg-white/10"
            >
              {t("essential")}
            </button>
            <button
              type="button"
              onClick={() => chooseConsent("all")}
              className="rounded-full border border-brand-300/70 bg-brand-400 px-4 py-2 font-semibold text-zinc-950 transition hover:bg-white"
            >
              {t("acceptAll")}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
