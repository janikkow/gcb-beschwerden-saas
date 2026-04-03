"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("voiceDemo");
  const telLink = `tel:${siteConfig.phoneTel}`;
  const qrUrl = useMemo(
    () =>
      `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(telLink)}`,
    [telLink],
  );

  return (
    <div className="glass-card flex h-full flex-col overflow-hidden rounded-2xl">
      {/* Tab bar */}
      <div className="flex flex-col divide-y divide-white/10 sm:flex-row sm:divide-y-0 sm:border-b sm:border-white/10">
        {(["live", "phone"] as Tab[]).map((tabKey) => (
          <button
            key={tabKey}
            type="button"
            onClick={() => setTab(tabKey)}
            className={`w-full px-3 py-3 text-center text-sm font-semibold leading-snug transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:flex-1 ${
              tab === tabKey
                ? "bg-brand-500/10 text-brand-300 sm:bg-transparent sm:border-b-2 sm:border-brand-400"
                : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300 sm:border-b-2 sm:border-transparent sm:hover:bg-transparent"
            }`}
            aria-pressed={tab === tabKey}
          >
            {tabKey === "live" ? t("tabLive") : t("tabPhone")}
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
                {t("phoneLabel")}
              </p>
              <h3 className="mt-2 text-balance break-words text-xl font-semibold text-white">
                {t("phoneHeadline")} {siteConfig.phoneDisplay}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {t("phoneBody")}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button href={telLink}>{t("callMobile")}</Button>
              <Button
                variant="secondary"
                onClick={() => setQrOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={qrOpen}
              >
                {t("showQr")}
              </Button>
            </div>

            <aside className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-relaxed text-zinc-400">
              <p className="mb-1 text-xs font-semibold text-zinc-300">
                {t("expectationTitle")}
              </p>
              {t("expectationBody")}
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
            {t("qrTitle")}
          </DialogTitle>
          <DialogDescription className="mt-1 text-sm text-zinc-300">
            {t("qrDesc")}
          </DialogDescription>
          <Image
            src={qrUrl}
            alt={t("qrAlt")}
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
            {t("qrClose")}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
