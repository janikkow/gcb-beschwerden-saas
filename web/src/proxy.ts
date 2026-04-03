import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const CANONICAL_HOST = "outag3.com";
const DACH_COUNTRIES = new Set(["DE", "AT", "CH"]);

const isLocalHost = (hostname: string) =>
  hostname === "localhost" || hostname === "127.0.0.1" || hostname === "0.0.0.0";

const isPreviewHost = (hostname: string) => hostname.endsWith(".vercel.app");

const intlMiddleware = createMiddleware(routing);

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const hasLocalePrefix = routing.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (!hasLocalePrefix) {
    const country = (request.headers.get("x-vercel-ip-country") ?? "").toUpperCase();

    if (DACH_COUNTRIES.has(country)) {
      const localizedUrl = request.nextUrl.clone();
      localizedUrl.pathname = `/de${pathname === "/" ? "" : pathname}`;
      return NextResponse.redirect(localizedUrl, 307);
    }
  }

  const forwardedHost = request.headers.get("x-forwarded-host");
  const hostHeader = forwardedHost ?? request.headers.get("host") ?? "";
  const hostname = hostHeader.split(":")[0]?.toLowerCase() ?? "";
  const protoHeader = request.headers.get("x-forwarded-proto");
  const protocol = (protoHeader ?? request.nextUrl.protocol.replace(":", "")).toLowerCase();

  if (!hostname || isLocalHost(hostname) || isPreviewHost(hostname)) {
    return intlMiddleware(request);
  }

  const shouldRedirectHost = hostname !== CANONICAL_HOST;
  const shouldRedirectProtocol = protocol !== "https";

  if (shouldRedirectHost || shouldRedirectProtocol) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.protocol = "https";
    redirectUrl.host = CANONICAL_HOST;
    return NextResponse.redirect(redirectUrl, 308);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
