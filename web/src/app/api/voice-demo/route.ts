import { NextResponse } from "next/server";

const AGENT_ID = "65a8c361-9d97-4d35-b99f-6105982dfbae";
const ULTRAVOX_API_URL = `https://api.ultravox.ai/api/agents/${AGENT_ID}/calls`;
const DEFAULT_TIMEOUT_MS = 10000;

const getTimeoutMs = (): number => {
  const raw = process.env.VOICE_DEMO_TIMEOUT_MS;
  const parsed = raw ? Number(raw) : DEFAULT_TIMEOUT_MS;
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return DEFAULT_TIMEOUT_MS;
  }
  return Math.min(parsed, 30000);
};

const mapUpstreamToClient = (status: number): { status: number; error: string } => {
  if (status === 429) {
    return {
      status: 503,
      error: "Voice-Demo ist derzeit ausgelastet. Bitte gleich erneut versuchen.",
    };
  }

  if (status >= 400 && status < 500) {
    return {
      status: 502,
      error: "Voice-Demo konnte nicht gestartet werden.",
    };
  }

  if (status >= 500) {
    return {
      status: 502,
      error: "Voice-Demo Dienst ist momentan nicht erreichbar.",
    };
  }

  return {
    status: 502,
    error: "Voice-Demo Anfrage fehlgeschlagen.",
  };
};

export async function POST() {
  try {
    const apiKey = process.env.ULTRAVOX_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Voice-Demo nicht verfuegbar" },
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
      const mapped = mapUpstreamToClient(res.status);
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
        { error: "Keine gueltige Sitzungs-URL erhalten." },
        { status: 502 },
      );
    }

    return NextResponse.json({ joinUrl: data.joinUrl });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return NextResponse.json(
        { error: "Voice-Demo Zeitlimit ueberschritten. Bitte erneut versuchen." },
        { status: 504 },
      );
    }

    console.error("voice-demo route failed unexpectedly", error);
    return NextResponse.json(
      { error: "Interner Fehler beim Starten der Voice-Demo." },
      { status: 500 },
    );
  }
}
