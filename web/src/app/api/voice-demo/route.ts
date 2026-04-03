import { NextRequest, NextResponse } from "next/server";

const AGENT_ID = "65a8c361-9d97-4d35-b99f-6105982dfbae";
const ULTRAVOX_API_URL = `https://api.ultravox.ai/api/agents/${AGENT_ID}/calls`;
const DEFAULT_TIMEOUT_MS = 10000;
type Locale = "de" | "en";

const messages = {
  de: {
    overloaded: "Voice-Demo ist derzeit ausgelastet. Bitte gleich erneut versuchen.",
    startFailed: "Voice-Demo konnte nicht gestartet werden.",
    serviceUnavailable: "Voice-Demo Dienst ist momentan nicht erreichbar.",
    requestFailed: "Voice-Demo Anfrage fehlgeschlagen.",
    notAvailable: "Voice-Demo nicht verfuegbar",
    invalidSessionUrl: "Keine gueltige Sitzungs-URL erhalten.",
    timeout: "Voice-Demo Zeitlimit ueberschritten. Bitte erneut versuchen.",
    internal: "Interner Fehler beim Starten der Voice-Demo.",
  },
  en: {
    overloaded: "Voice demo is currently busy. Please try again shortly.",
    startFailed: "Voice demo could not be started.",
    serviceUnavailable: "Voice demo service is currently unavailable.",
    requestFailed: "Voice demo request failed.",
    notAvailable: "Voice demo not available",
    invalidSessionUrl: "No valid session URL received.",
    timeout: "Voice demo timed out. Please try again.",
    internal: "Internal error while starting the voice demo.",
  },
} as const;

const getLocale = (request: NextRequest): Locale => {
  const localeHeader = request.headers.get("x-locale")?.toLowerCase() ?? "";
  if (localeHeader.startsWith("en")) {
    return "en";
  }
  if (localeHeader.startsWith("de")) {
    return "de";
  }

  const acceptLanguage = request.headers.get("accept-language")?.toLowerCase() ?? "";
  return acceptLanguage.includes("en") ? "en" : "de";
};

const getTimeoutMs = (): number => {
  const raw = process.env.VOICE_DEMO_TIMEOUT_MS;
  const parsed = raw ? Number(raw) : DEFAULT_TIMEOUT_MS;
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return DEFAULT_TIMEOUT_MS;
  }
  return Math.min(parsed, 30000);
};

const mapUpstreamToClient = (locale: Locale, status: number): { status: number; error: string } => {
  if (status === 429) {
    return {
      status: 503,
      error: messages[locale].overloaded,
    };
  }

  if (status >= 400 && status < 500) {
    return {
      status: 502,
      error: messages[locale].startFailed,
    };
  }

  if (status >= 500) {
    return {
      status: 502,
      error: messages[locale].serviceUnavailable,
    };
  }

  return {
    status: 502,
    error: messages[locale].requestFailed,
  };
};

export async function POST(request: NextRequest) {
  const locale = getLocale(request);

  try {
    const apiKey = process.env.ULTRAVOX_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: messages[locale].notAvailable },
        { status: 503 },
      );
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), getTimeoutMs());

    let res: Response;

    try {
      res = await fetch(ULTRAVOX_API_URL, {
        method: "POST",
        headers: {
          "X-API-Key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          medium: { webRtc: {} },
        }),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    if (!res.ok) {
      const bodyText = await res.text().catch(() => "");
      const mapped = mapUpstreamToClient(locale, res.status);
      console.error("Ultravox API error", {
        status: res.status,
        body: bodyText.slice(0, 1000),
      });
      return NextResponse.json(
        { error: mapped.error },
        { status: mapped.status },
      );
    }

    const data = (await res.json()) as { joinUrl?: string };

    if (!data.joinUrl) {
      return NextResponse.json(
        { error: messages[locale].invalidSessionUrl },
        { status: 502 },
      );
    }

    return NextResponse.json({ joinUrl: data.joinUrl });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return NextResponse.json(
        { error: messages[locale].timeout },
        { status: 504 },
      );
    }

    console.error("voice-demo route failed unexpectedly", error);
    return NextResponse.json(
      { error: messages[locale].internal },
      { status: 500 },
    );
  }
}
