import { NextResponse } from "next/server";

const AGENT_ID = "65a8c361-9d97-4d35-b99f-6105982dfbae";
const ULTRAVOX_API_URL = `https://api.ultravox.ai/api/agents/${AGENT_ID}/calls`;

export async function POST() {
  const apiKey = process.env.ULTRAVOX_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Voice-Demo nicht verfuegbar" },
      { status: 503 },
    );
  }

  const res = await fetch(ULTRAVOX_API_URL, {
    method: "POST",
    headers: {
      "X-API-Key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      medium: { webRtc: {} },
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("Ultravox API error", res.status, text);
    return NextResponse.json(
      { error: "Agent konnte nicht gestartet werden" },
      { status: 502 },
    );
  }

  const data = (await res.json()) as { joinUrl?: string };

  if (!data.joinUrl) {
    return NextResponse.json(
      { error: "Keine joinUrl erhalten" },
      { status: 502 },
    );
  }

  return NextResponse.json({ joinUrl: data.joinUrl });
}
