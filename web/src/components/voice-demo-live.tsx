"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { UltravoxSession } from "ultravox-client";
import { cn } from "@/lib/utils";

type Transcript = {
  speaker: "agent" | "user";
  text: string;
  isFinal: boolean;
};

type VoiceStatus =
  | "idle"
  | "connecting"
  | "listening"
  | "thinking"
  | "speaking"
  | "disconnecting"
  | "disconnected"
  | "error";

const barColor: Record<VoiceStatus, string> = {
  idle: "bg-white/20",
  connecting: "bg-amber-400",
  listening: "bg-brand-400",
  thinking: "bg-amber-400",
  speaking: "bg-emerald-400",
  disconnecting: "bg-white/30",
  disconnected: "bg-white/20",
  error: "bg-rose-500",
};

const micButtonStyle: Record<VoiceStatus, string> = {
  idle: "bg-white/10 hover:bg-white/15 text-white",
  connecting: "bg-brand-500/30 text-brand-200 border border-brand-400/30",
  listening: "bg-brand-500/40 text-white border border-brand-400/50 shadow-[0_0_20px_rgba(204,255,0,0.2)]",
  thinking: "bg-amber-500/30 text-amber-200 border border-amber-400/30",
  speaking: "bg-emerald-500/30 text-emerald-100 border border-emerald-400/30 shadow-[0_0_20px_rgba(52,211,153,0.15)]",
  disconnecting: "bg-white/10 text-zinc-400",
  disconnected: "bg-white/10 hover:bg-white/15 text-white",
  error: "bg-rose-500/30 hover:bg-rose-500/40 text-rose-100 border border-rose-400/30",
};

const isVoiceStatus = (value: string): value is VoiceStatus => {
  return value in barColor;
};

const BAR_COUNT = 48;
const BAR_DELAYS = Array.from({ length: BAR_COUNT }, (_, i) =>
  ((i * 0.045) % 0.85).toFixed(2),
);

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

// Vercel Best Practice: Extract expensive/frequent rendering sub-components
const TranscriptItem = memo(
  ({
    transcript,
    agentLabel,
    userLabel,
  }: {
    transcript: Transcript;
    agentLabel: string;
    userLabel: string;
  }) => (
  <div className={cn("flex w-full", transcript.speaker === "user" ? "justify-end" : "justify-start")}>
    <div
      className={cn(
        "max-w-[85%] rounded-xl px-3 py-1.5 text-sm leading-relaxed shadow-sm transition-all duration-300",
        transcript.speaker === "agent"
          ? "bg-brand-500/20 text-brand-50 border border-brand-400/20"
          : "bg-white/10 text-zinc-50 border border-white/5",
        !transcript.isFinal && "opacity-70 italic"
      )}
    >
      <span className="block text-[10px] font-bold uppercase tracking-wider opacity-50 mb-0.5">
        {transcript.speaker === "agent" ? agentLabel : userLabel}
      </span>
      {transcript.text}
    </div>
  </div>
));
TranscriptItem.displayName = "TranscriptItem";

export default function VoiceDemoLive() {
  const [status, setStatus] = useState<VoiceStatus>("idle");
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [muted, setMuted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [duration, setDuration] = useState(0);

  const locale = useLocale();
  const t = useTranslations("voiceDemo.live");
  const sessionRef = useRef<UltravoxSession | null>(null);
  const transcriptScrollRef = useRef<HTMLDivElement>(null);

  const isSessionActive = ["connecting", "listening", "thinking", "speaking", "disconnecting"].includes(status);
  const isRunningState = ["connecting", "listening", "thinking", "speaking"].includes(status);

  const statusLabel: Record<VoiceStatus, string> = {
    idle: t("status.idle"),
    connecting: t("status.connecting"),
    listening: t("status.listening"),
    thinking: t("status.thinking"),
    speaking: t("status.speaking"),
    disconnecting: t("status.disconnecting"),
    disconnected: t("status.disconnected"),
    error: t("status.error"),
  };

  const statusHint: Record<VoiceStatus, string> = {
    idle: t("hint.idle"),
    connecting: t("hint.connecting"),
    listening: t("hint.listening"),
    thinking: t("hint.thinking"),
    speaking: t("hint.speaking"),
    disconnecting: t("hint.disconnecting"),
    disconnected: t("hint.disconnected"),
    error: t("hint.error"),
  };

  // Vercel Best Practice: Derive state during render instead of useEffect where possible
  const currentStatusLabel = statusLabel[status];
  const currentStatusHint = statusHint[status];

  useEffect(() => {
    if (transcriptScrollRef.current) {
      transcriptScrollRef.current.scrollTop = transcriptScrollRef.current.scrollHeight;
    }
  }, [transcripts]);

  useEffect(() => {
    if (!isSessionActive) return;
    const interval = window.setInterval(() => setDuration((prev) => prev + 1), 1000);
    return () => window.clearInterval(interval);
  }, [isSessionActive]);

  const startCall = useCallback(async () => {
    setStatus("connecting");
    setTranscripts([]);
    setErrorMsg("");
    setMuted(false);
    setDuration(0);

    try {
      const response = await fetch("/api/voice-demo", {
        method: "POST",
        headers: { "x-locale": locale },
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error ?? t("connectionError"));
      }

      const { joinUrl } = await response.json();
      const session = new UltravoxSession();
      sessionRef.current = session;

      session.addEventListener("status", () => {
        const nextStatus = session.status?.toLowerCase() ?? "idle";
        setStatus(isVoiceStatus(nextStatus) ? nextStatus : "idle");
      });

      session.addEventListener("transcripts", () => {
        setTranscripts(
          session.transcripts.map((item) => ({
            speaker: item.speaker?.toLowerCase() === "user" ? "user" : "agent",
            text: item.text,
            isFinal: item.isFinal,
          }))
        );
      });

      session.joinCall(joinUrl);
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : t("unknownError"));
      setStatus("error");
    }
  }, [locale, t]);

  const endCall = useCallback(() => {
    setStatus("disconnecting");
    sessionRef.current?.leaveCall();
    sessionRef.current = null;
    setMuted(false);
    setStatus("disconnected");
  }, []);

  const toggleMute = useCallback(() => {
    if (!sessionRef.current || !isSessionActive) return;
    if (muted) {
      sessionRef.current.unmuteMic();
      setMuted(false);
    } else {
      sessionRef.current.muteMic();
      setMuted(true);
    }
  }, [isSessionActive, muted]);

  return (
    <div className="flex h-full min-h-0 flex-col gap-5">
      <div className="shrink-0 rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-inner">
        <div className="flex flex-col items-center">
          {/* Main Interaction Button */}
          <button
            type="button"
            onClick={isSessionActive ? endCall : startCall}
            disabled={status === "connecting" || status === "disconnecting"}
            className={cn(
              "group flex h-20 w-20 items-center justify-center rounded-3xl transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
              micButtonStyle[status] || micButtonStyle["idle"]
            )}
            aria-label={isSessionActive ? t("ariaEndCall") : t("ariaStartCall")}
          >
            {status === "connecting" ? (
              <svg className="h-6 w-6 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
            ) : isSessionActive ? (
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="6" width="12" height="12" rx="2" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1a4 4 0 014 4v6a4 4 0 01-8 0V5a4 4 0 014-4zm-1 14.93A7.001 7.001 0 015 9H3a9 9 0 008 8.94V21h-2v2h6v-2h-2v-3.07z" />
              </svg>
            )}
          </button>

          <div className="mt-4 text-center" role="status" aria-live="polite" aria-atomic="true">
            <p className="font-mono text-lg font-medium tracking-wider text-white">
              {formatDuration(duration)}
            </p>
            <p className="mt-1 text-sm font-bold uppercase tracking-widest text-brand-400">
              {currentStatusLabel}
            </p>
            <p className="mt-1 text-xs font-medium text-zinc-300">
              {currentStatusHint}
            </p>
          </div>

          {/* Visualization bars */}
          <div className="mt-5 flex h-10 items-end gap-[3px]">
            {BAR_DELAYS.map((delay, index) => {
              const baseHeight = 20 + ((index * 19) % 75);
              return (
                <span
                  key={`${delay}-${index}`}
                  className={cn(
                    "w-[3px] rounded-full transition-all duration-300",
                    isRunningState ? "wave-bar" : "",
                    barColor[status] || barColor["idle"]
                  )}
                  style={isRunningState ? { height: `${baseHeight}%`, animationDelay: `${delay}s` } : { height: "25%" }}
                />
              );
            })}
          </div>
        </div>

        {isSessionActive && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={toggleMute}
              className={cn(
                "rounded-full border px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                muted
                  ? "border-rose-500/50 bg-rose-500/20 text-rose-100"
                  : "border-white/20 bg-white/10 text-white hover:bg-white/20"
              )}
            >
              {muted ? t("muteOff") : t("muteOn")}
            </button>
          </div>
        )}
      </div>

      {/* Transcript: wächst mit Zeilenhöhe der Ticket-Vorschau, scrollt intern */}
      <div className="flex min-h-0 flex-1 flex-col gap-1.5">
        <p className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
          {t("transcriptLabel")}
        </p>
        <div
          ref={transcriptScrollRef}
          className="min-h-[7rem] flex-1 space-y-3 overflow-y-auto rounded-xl border border-white/10 bg-black/30 p-4 scroll-smooth"
        >
          {transcripts.length === 0 ? (
            <div className="flex min-h-[4.5rem] items-center justify-center px-2 py-2 text-center text-xs italic text-zinc-500 opacity-60">
              {t("emptyTranscript")}
            </div>
          ) : (
            transcripts.map((transcript, index) => (
              <TranscriptItem
                key={index}
                transcript={transcript}
                agentLabel={t("speakerAgent")}
                userLabel={t("speakerUser")}
              />
            ))
          )}
        </div>
      </div>

      {errorMsg && (
        <div role="alert" className="shrink-0 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs font-medium text-rose-200 shadow-lg">
          <span className="font-bold mr-2 uppercase tracking-tight">{t("errorPrefix")}</span>
          {errorMsg}
        </div>
      )}

      <p className="shrink-0 text-center text-[10px] font-medium uppercase tracking-widest text-zinc-500 opacity-80">
        {t("footer")}
      </p>
    </div>
  );
}
