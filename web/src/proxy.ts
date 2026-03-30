import { NextResponse, type NextRequest } from "next/server";

const CANONICAL_HOST = "outag3.com";

const isLocalHost = (hostname: string) => {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "0.0.0.0"
  );
};

const isPreviewHost = (hostname: string) => {
  return hostname.endsWith(".vercel.app");
};

export function proxy(request: NextRequest) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const hostHeader = forwardedHost ?? request.headers.get("host") ?? "";
  const hostname = hostHeader.split(":")[0]?.toLowerCase() ?? "";
  const protoHeader = request.headers.get("x-forwarded-proto");
  const protocol = (protoHeader ?? request.nextUrl.protocol.replace(":", "")).toLowerCase();

  if (!hostname || isLocalHost(hostname) || isPreviewHost(hostname)) {
    return NextResponse.next();
  }

  const shouldRedirectHost = hostname !== CANONICAL_HOST;
  const shouldRedirectProtocol = protocol !== "https";

  if (!shouldRedirectHost && !shouldRedirectProtocol) {
    return NextResponse.next();
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.protocol = "https";
  redirectUrl.host = CANONICAL_HOST;

  return NextResponse.redirect(redirectUrl, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
