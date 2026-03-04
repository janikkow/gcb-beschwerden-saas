import { promises as fs } from "node:fs";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";

type LeadPayload = {
  name: string;
  company: string;
  email: string;
  phone?: string;
  vertical: string;
  message?: string;
  website?: string; // honeypot
};

const ipHits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 6;

function isEmail(input: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
}

function getIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string, now: number) {
  const bucket = ipHits.get(ip) ?? [];
  const recent = bucket.filter((ts) => now - ts < WINDOW_MS);
  recent.push(now);
  ipHits.set(ip, recent);
  return recent.length > MAX_HITS;
}

export async function POST(request: NextRequest) {
  let payload: LeadPayload;
  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Ungueltige Anfrage." }, { status: 400 });
  }

  if (payload.website) {
    return NextResponse.json({ ok: true }, { status: 202 });
  }

  const missing = !payload.name || !payload.company || !payload.email || !payload.vertical;
  if (missing) {
    return NextResponse.json(
      { error: "Name, Firma, E-Mail und Vertical sind Pflicht." },
      { status: 400 },
    );
  }

  if (!isEmail(payload.email)) {
    return NextResponse.json({ error: "Ungueltige E-Mail-Adresse." }, { status: 400 });
  }

  const ip = getIp(request);
  if (isRateLimited(ip, Date.now())) {
    return NextResponse.json(
      { error: "Zu viele Anfragen. Bitte spaeter erneut versuchen." },
      { status: 429 },
    );
  }

  const entry = {
    ...payload,
    name: payload.name.trim(),
    company: payload.company.trim(),
    email: payload.email.trim().toLowerCase(),
    vertical: payload.vertical.trim(),
    message: payload.message?.trim() ?? "",
    phone: payload.phone?.trim() ?? "",
    createdAt: new Date().toISOString(),
    ip,
  };

  const dataDir = path.join(process.cwd(), "data");
  const filePath = path.join(dataDir, "leads.json");
  await fs.mkdir(dataDir, { recursive: true });

  try {
    const existing = await fs.readFile(filePath, "utf-8").catch(() => "[]");
    const rows = JSON.parse(existing) as typeof entry[];
    rows.push(entry);
    await fs.writeFile(filePath, JSON.stringify(rows, null, 2), "utf-8");
  } catch (err) {
    console.error("Lead local store error", err);
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    const webhookHeaders: Record<string, string> = {
      "Content-Type": "application/json",
    };
    const apiKey = process.env.LEAD_WEBHOOK_API_KEY;
    if (apiKey) {
      webhookHeaders["api"] = apiKey;
    }
    try {
      await fetch(webhook, {
        method: "POST",
        headers: webhookHeaders,
        body: JSON.stringify(entry),
      });
    } catch (err) {
      console.error("Lead webhook error", err);
    }
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
