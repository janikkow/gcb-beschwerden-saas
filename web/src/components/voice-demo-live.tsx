"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { UltravoxSession, UltravoxSessionStatus } from "ultravox-client";

type Transcript = {
  speaker: "agent" | "user";
  text: string;
  isFinal: boolean;
};

type DemoStatus =
  | "idle"
  | "connecting"
  | "listening"
  | "thinking"
  | "speaking"
  | "disconnecting"
  | "disconnected"
  | "error";

const statusLabel: Record<DemoStatus, string> = {
  idle:          "Bereit",
  connecting:    "Verbinde …",
  listening:     "Zuhoeren …",
  thinking:      "Denkt …",
  speaking:      "Agent spricht …",
  disconnecting: "Trennt …",
  disconnected:  "Beendet",
  error:         "Fehler",
};

// 16 bars with staggered animation delays
const BAR_COUNT = 16;
const BAR_DELAYS = Array.from({ length: BAR_COUNT }, (_, i) =>
  ((i * 0.07) % 0.9).toFixed(2),
);

// Bar height range per status
const barColor: Record<DemoStatus, string> = {
  idle:          "bg-white/20",
  connecting:    "bg-amber-400/60",
  listening:     "bg-brand-400/80",
  thinking:      "bg-amber-400/70",
  speaking:      "bg-emerald-400/80",
  disconnecting: "bg-white/20",
  disconnected:  "bg-white/20",
  error:         "bg-rose-500/70",
};

const ringColor: Record<DemoStatus, string> = {
  idle:          "bg-white/10",
  connecting:    "bg-amber-400/20",
  listening:     "bg-brand-500/25",
  thinking:      "bg-amber-400/20",
  speaking:      "bg-emerald-500/25",
  disconnecting: "bg-white/10",
  disconnected:  "bg-white/10",
  error:         "bg-rose-500/20",
};

const micBg: Record<DemoStatus, string> = {
  idle:          "bg-brand-600 hover:bg-brand-500",
  connecting:    "bg-amber-500",
  listening:     "bg-brand-500",
  thinking:      "bg-amber-500",
  speaking:      "bg-emerald-500",
  disconnecting: "bg-white/20",
  disconnected:  "bg-brand-600 hover:bg-brand-500",
  error:         "bg-rose-600 hover:bg-rose-500",
};

export default function VoiceDemoLive() {
  const [status, setStatus] = useState<DemoStatus>("idle");
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [muted, setMuted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const sessionRef = useRef<UltravoxSession | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [transcripts]);

  const startCall = useCallback(async () => {
    setStatus("connecting");
    setTranscripts([]);
    setErrorMsg("");
    try {
      const res = await fetch("/api/voice-demo", { method: "POST" });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Verbindungsfehler");
      }
      const { joinUrl } = (await res.json()) as { joinUrl: string };
      const session = new UltravoxSession();
      sessionRef.current = session;
      session.addEventListener("status", () => {
        const s = session.status as UltravoxSessionStatus | string;
        setStatus((s as DemoStatus) ?? "idle");
      });
      session.addEventListener("transcripts", () => {
        setTranscripts(
          session.transcripts.map((t) => ({
            speaker: t.speaker as "agent" | "user",
            text: t.text,
            isFinal: t.isFinal,
          })),
        );
      });
      session.joinCall(joinUrl);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Unbekannter Fehler");
      setStatus("error");
    }
  }, []);

  const endCall = useCallback(() => {
    sessionRef.current?.leaveCall();
    sessionRef.current = null;
    setStatus("disconnected");
  }, []);

  const toggleMute = useCallback(() => {
    const session = sessionRef.current;
    if (!session) return;
    if (muted) { session.unmuteMic(); setMuted(false); }
    else        { session.muteMic();  setMuted(true);  }
  }, [muted]);

  const isActive      = status === "listening" || status === "thinking" || status === "speaking";
  const isConnecting  = status === "connecting";
  const isOver        = status === "disconnected" || status === "error";
  const isAnimated    = isActive || isConnecting;

  return (
    <div className="flex flex-col gap-5">
      {/* ── Visualizer + mic button ───────────────────────────────── */}
      <div className="flex flex-col items-center gap-4 py-4">

        {/* Status label */}
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
          {statusLabel[status]}
        </p>

        {/* Mic button with pulsing ring */}
        <div className="relative flex items-center justify-center">
          {/* Pulsing ring */}
          {isAnimated && (
            <span
              className={`absolute inline-flex h-24 w-24 rounded-full ${ringColor[status]}`}
              style={{ animation: "ring-ping 1.4s cubic-bezier(0,0,0.2,1) infinite" }}
            />
          )}
          {/* Mic button */}
          <button
            type="button"
            onClick={isActive ? endCall : isOver ? startCall : startCall}
            disabled={isConnecting || status === "disconnecting"}
            className={`relative flex h-20 w-20 items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 disabled:opacity-50 ${micBg[status]}`}
            aria-label={isActive ? "Gespräch beenden" : "Gespräch starten"}
          >
            {isConnecting ? (
              /* Spinner */
              <svg className="h-7 w-7 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
            ) : isActive ? (
              /* Stop icon */
              <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="6" width="12" height="12" rx="2" />
              </svg>
            ) : (
              /* Mic icon */
              <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1a4 4 0 014 4v6a4 4 0 01-8 0V5a4 4 0 014-4zm-1 14.93A7.001 7.001 0 015 9H3a9 9 0 008 8.94V21h-2v2h6v-2h-2v-3.07z"/>
              </svg>
            )}
          </button>
        </div>

        {/* Waveform bars */}
        <div className="flex h-10 items-end gap-[3px]">
          {BAR_DELAYS.map((delay, i) => (
            <span
              key={i}
              className={
                isAnimated
                  ? `wave-bar w-1.5 rounded-full ${barColor[status]}`
                  : `w-1.5 rounded-full transition-colors duration-500 ${barColor[status]}`
              }
              style={
                isAnimated
                  ? {
                      height: "100%",
                      animationDelay: `${delay}s`,
                    }
                  : { height: "20%" }
              }
            />
          ))}
        </div>

        {/* Secondary controls when active */}
        {isActive && (
          <button
            type="button"
            onClick={toggleMute}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all ${
              muted
                ? "border-rose-400/50 bg-rose-500/20 text-rose-300"
                : "border-white/15 bg-white/10 text-zinc-300 hover:bg-white/15"
            }`}
          >
            {muted ? "Stummschaltung aufheben" : "Stummschalten"}
          </button>
        )}
      </div>

      {/* ── Transcript window ─────────────────────────────────────── */}
      {transcripts.length > 0 && (
        <div
          ref={scrollRef}
          className="flex max-h-48 flex-col gap-2 overflow-y-auto rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm"
        >
          {transcripts.map((t, i) => (
            <div
              key={i}
              className={`flex gap-2 ${t.speaker === "user" ? "justify-end" : "justify-start"}`}
            >
              <span
                className={`max-w-[80%] rounded-2xl px-3 py-1.5 leading-snug text-sm ${
                  t.speaker === "agent"
                    ? "bg-brand-500/20 text-brand-200"
                    : "bg-white/10 text-zinc-200"
                } ${!t.isFinal ? "opacity-50" : ""}`}
              >
                {t.text}
              </span>
            </div>
          ))}
        </div>
      )}

      {errorMsg && (
        <p className="rounded-lg border border-rose-400/30 bg-rose-500/10 px-4 py-2 text-xs text-rose-300">
          {errorMsg}
        </p>
      )}

      <p className="text-center text-[11px] text-zinc-500">
        Mikrofon-Zugriff wird vom Browser einmalig angefragt · Demo-Budget begrenzt
      </p>
    </div>
  );
}
