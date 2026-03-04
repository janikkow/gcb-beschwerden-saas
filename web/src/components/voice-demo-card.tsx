"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import VoiceDemoLive from "@/components/voice-demo-live";
import { siteConfig } from "@/lib/site";

type Tab = "live" | "phone";

export default function VoiceDemoCard() {
  const [tab, setTab] = useState<Tab>("live");
  const [qrOpen, setQrOpen] = useState(false);
  const telLink = `tel:${siteConfig.phoneTel}`;
  const qrUrl = useMemo(
    () =>
      `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(telLink)}`,
    [telLink],
  );

  return (
    <div className="glass-card overflow-hidden rounded-2xl">
      {/* Tab bar */}
      <div className="flex border-b border-white/10">
        {(["live", "phone"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              tab === t
                ? "border-b-2 border-brand-400 text-brand-300"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {t === "live" ? "Im Browser testen" : "Per Telefon anrufen"}
          </button>
        ))}
      </div>

      <div className="p-6">
        {tab === "live" ? (
          <VoiceDemoLive />
        ) : (
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-400">
                Voice-Demo per Telefon
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white">
                Jetzt anrufen: {siteConfig.phoneDisplay}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Im Demo-Call werden Name, Problem und Kontakt abgefragt. Danach
                wird die Meldung automatisch klassifiziert und als Ticket
                vorbereitet.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button href={telLink}>Auf Mobile anrufen</Button>
              <Button variant="secondary" onClick={() => setQrOpen(true)}>
                Desktop: QR-Code zeigen
              </Button>
            </div>

            <aside className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-relaxed text-zinc-400">
              <p className="mb-1 text-xs font-semibold text-zinc-300">
                Erwartungsmanagement
              </p>
              Der Agent ist auf die schnelle Aufnahme von Beschwerden ausgelegt.
              Ziel ist eine klare Meldung in unter 2 Minuten.
            </aside>
          </div>
        )}
      </div>

      {/* QR Modal */}
      {qrOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="glass-card w-full max-w-sm rounded-2xl p-6">
            <h4 className="text-lg font-semibold text-white">Demo per QR starten</h4>
            <p className="mt-1 text-sm text-zinc-400">
              Kamera öffnen und Code scannen, um direkt anzurufen.
            </p>
            <Image
              src={qrUrl}
              alt="QR-Code zum Starten des Demo-Anrufs"
              width={208}
              height={208}
              unoptimized
              className="mx-auto mt-4 rounded-lg border border-white/15"
            />
            <button
              type="button"
              onClick={() => setQrOpen(false)}
              className="mt-5 w-full rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Schließen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
