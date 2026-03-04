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

type LeadEntry = {
  name: string;
  company: string;
  email: string;
  phone: string;
  vertical: string;
  message: string;
  createdAt: string;
  ip: string;
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

async function persistLeadLocal(entry: LeadEntry) {
  const configuredDir = process.env.LEAD_LOCAL_STORE_DIR?.trim();
  const dataDirs = [
    configuredDir,
    path.join(process.cwd(), "data"),
    path.join("/tmp", "beschwerden_saas"),
  ].filter((value): value is string => Boolean(value));

  for (const dataDir of dataDirs) {
    const filePath = path.join(dataDir, "leads.json");
    try {
      await fs.mkdir(dataDir, { recursive: true });
      const existing = await fs.readFile(filePath, "utf-8").catch(() => "[]");
      const rows = JSON.parse(existing) as LeadEntry[];
      rows.push(entry);
      await fs.writeFile(filePath, JSON.stringify(rows, null, 2), "utf-8");
      return;
    } catch (error) {
      console.error(`Lead local store error (${dataDir})`, error);
    }
  }
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

  const entry: LeadEntry = {
    name: payload.name.trim(),
    company: payload.company.trim(),
    email: payload.email.trim().toLowerCase(),
    vertical: payload.vertical.trim(),
    message: payload.message?.trim() ?? "",
    phone: payload.phone?.trim() ?? "",
    createdAt: new Date().toISOString(),
    ip,
  };

  await persistLeadLocal(entry);

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
