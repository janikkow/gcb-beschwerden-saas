"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
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
    <div className="glass-card flex h-full flex-col overflow-hidden rounded-2xl">
      {/* Tab bar */}
      <div className="flex border-b border-white/10">
        {(["live", "phone"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`flex-1 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
              tab === t
                ? "border-b-2 border-brand-400 text-brand-300"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
            aria-pressed={tab === t}
          >
            {t === "live" ? "Im Browser testen" : "Per Telefon anrufen"}
          </button>
        ))}
      </div>

      <div className="flex flex-1 flex-col p-6">
        {tab === "live" ? (
          <div className="flex h-full flex-col justify-center">
            <VoiceDemoLive />
          </div>
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
              <Button
                variant="secondary"
                onClick={() => setQrOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={qrOpen}
              >
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

      <Dialog open={qrOpen} onOpenChange={setQrOpen}>
        <DialogContent
          showCloseButton={false}
          className="glass-card z-[9999] w-full max-w-sm rounded-2xl border-white/15 bg-black/70 p-6"
        >
          <DialogTitle className="text-lg font-semibold text-white">
            Demo per QR starten
          </DialogTitle>
          <DialogDescription className="mt-1 text-sm text-zinc-300">
            Kamera öffnen und Code scannen, um direkt anzurufen.
          </DialogDescription>
          <Image
            src={qrUrl}
            alt="QR-Code zum Starten des Demo-Anrufs"
            width={208}
            height={208}
            unoptimized
            className="mx-auto mt-1 rounded-lg border border-white/15"
          />
          <Button
            type="button"
            variant="secondary"
            onClick={() => setQrOpen(false)}
            className="w-full rounded-full border border-white/15 bg-white/10 text-white hover:bg-white/15"
          >
            Schließen
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
