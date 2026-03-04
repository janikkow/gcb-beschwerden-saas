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
  idle: "Bereit",
  connecting: "Verbinde ...",
  listening: "Hoert zu",
  thinking: "Denkt nach",
  speaking: "Antwortet",
  disconnecting: "Beende ...",
  disconnected: "Beendet",
  error: "Fehler",
};

const statusHint: Record<DemoStatus, string> = {
  idle: "Tippe auf das Mikrofon, um zu starten",
  connecting: "Session wird aufgebaut",
  listening: "Sprich normal ins Mikrofon",
  thinking: "Agent verarbeitet deine Anfrage",
  speaking: "Agent gibt eine Antwort",
  disconnecting: "Gespräch wird geschlossen",
  disconnected: "Tippe auf das Mikrofon für einen neuen Versuch",
  error: "Bitte erneut starten",
};

const BAR_COUNT = 48;
const BAR_DELAYS = Array.from({ length: BAR_COUNT }, (_, i) =>
  ((i * 0.045) % 0.85).toFixed(2),
);

const barColor: Record<DemoStatus, string> = {
  idle: "bg-white/12",
  connecting: "bg-amber-300/70",
  listening: "bg-brand-300/80",
  thinking: "bg-amber-300/75",
  speaking: "bg-emerald-300/80",
  disconnecting: "bg-white/20",
  disconnected: "bg-white/12",
  error: "bg-rose-400/80",
};

const micButtonStyle: Record<DemoStatus, string> = {
  idle: "bg-white/5 hover:bg-white/10 text-zinc-100",
  connecting: "bg-brand-500/25 text-brand-200",
  listening: "bg-brand-500/25 text-brand-100",
  thinking: "bg-amber-500/25 text-amber-100",
  speaking: "bg-emerald-500/25 text-emerald-100",
  disconnecting: "bg-white/5 text-zinc-400",
  disconnected: "bg-white/5 hover:bg-white/10 text-zinc-100",
  error: "bg-rose-500/20 hover:bg-rose-500/30 text-rose-100",
};

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export default function VoiceDemoLive() {
  const [status, setStatus] = useState<DemoStatus>("idle");
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [muted, setMuted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [duration, setDuration] = useState(0);

  const sessionRef = useRef<UltravoxSession | null>(null);
  const transcriptScrollRef = useRef<HTMLDivElement>(null);

  const isSessionActive =
    status === "connecting" ||
    status === "listening" ||
    status === "thinking" ||
    status === "speaking" ||
    status === "disconnecting";

  const isRunningState =
    status === "connecting" ||
    status === "listening" ||
    status === "thinking" ||
    status === "speaking";

  useEffect(() => {
    transcriptScrollRef.current?.scrollTo({
      top: transcriptScrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [transcripts]);

  useEffect(() => {
    if (!isSessionActive) return;

    const interval = window.setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isSessionActive]);

  const startCall = useCallback(async () => {
    setStatus("connecting");
    setTranscripts([]);
    setErrorMsg("");
    setMuted(false);
    setDuration(0);

    try {
      const response = await fetch("/api/voice-demo", { method: "POST" });
      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Verbindungsfehler");
      }

      const { joinUrl } = (await response.json()) as { joinUrl: string };

      const session = new UltravoxSession();
      sessionRef.current = session;

      session.addEventListener("status", () => {
        const nextStatus = session.status as UltravoxSessionStatus | string;
        setStatus((nextStatus as DemoStatus) ?? "idle");
      });

      session.addEventListener("transcripts", () => {
        setTranscripts(
          session.transcripts.map((item) => ({
            speaker: item.speaker as "agent" | "user",
            text: item.text,
            isFinal: item.isFinal,
          })),
        );
      });

      session.joinCall(joinUrl);
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : "Unbekannter Fehler");
      setStatus("error");
    }
  }, []);

  const endCall = useCallback(() => {
    setStatus("disconnecting");
    sessionRef.current?.leaveCall();
    sessionRef.current = null;
    setMuted(false);
    setStatus("disconnected");
  }, []);

  const toggleMute = useCallback(() => {
    const session = sessionRef.current;
    if (!session || !isSessionActive) return;

    if (muted) {
      session.unmuteMic();
      setMuted(false);
      return;
    }

    session.muteMic();
    setMuted(true);
  }, [isSessionActive, muted]);

  const onMainButtonClick = () => {
    if (isSessionActive) {
      endCall();
      return;
    }
    startCall();
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex flex-col items-center">
          <button
            type="button"
            onClick={onMainButtonClick}
            disabled={status === "connecting" || status === "disconnecting"}
            className={`group flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${micButtonStyle[status]}`}
            aria-label={isSessionActive ? "Gespräch beenden" : "Gespräch starten"}
          >
            {status === "connecting" ? (
              <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            ) : isSessionActive ? (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="6" width="12" height="12" rx="2" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1a4 4 0 014 4v6a4 4 0 01-8 0V5a4 4 0 014-4zm-1 14.93A7.001 7.001 0 015 9H3a9 9 0 008 8.94V21h-2v2h6v-2h-2v-3.07z" />
              </svg>
            )}
          </button>

          <p className="mt-3 font-mono text-sm text-zinc-300">{formatDuration(duration)}</p>

          <div className="mt-3 flex h-8 items-end gap-[2px]">
            {BAR_DELAYS.map((delay, index) => {
              const baseHeight = 20 + ((index * 19) % 70);
              return (
                <span
                  key={`${delay}-${index}`}
                  className={
                    isRunningState
                      ? `wave-bar w-[2px] rounded-full ${barColor[status]}`
                      : `w-[2px] rounded-full transition-colors duration-300 ${barColor[status]}`
                  }
                  style={
                    isRunningState
                      ? {
                          height: `${baseHeight}%`,
                          animationDelay: `${delay}s`,
                        }
                      : { height: "20%" }
                  }
                />
              );
            })}
          </div>

          <p className="mt-3 text-sm font-medium text-zinc-200">{statusLabel[status]}</p>
          <p className="mt-1 text-xs text-zinc-400">{statusHint[status]}</p>
        </div>

        {isSessionActive ? (
          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={toggleMute}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all ${
                muted
                  ? "border-rose-400/45 bg-rose-500/15 text-rose-200"
                  : "border-white/15 bg-white/10 text-zinc-300 hover:bg-white/15"
              }`}
            >
              {muted ? "Stummschaltung aufheben" : "Stummschalten"}
            </button>
          </div>
        ) : null}
      </div>

      {transcripts.length > 0 ? (
        <div
          ref={transcriptScrollRef}
          className="flex max-h-52 flex-col gap-2 overflow-y-auto rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm"
        >
          {transcripts.map((transcript, index) => (
            <div
              key={`${transcript.speaker}-${index}`}
              className={`flex ${transcript.speaker === "user" ? "justify-end" : "justify-start"}`}
            >
              <span
                className={`max-w-[80%] rounded-2xl px-3 py-1.5 leading-snug ${
                  transcript.speaker === "agent"
                    ? "bg-brand-500/18 text-brand-200"
                    : "bg-white/10 text-zinc-200"
                } ${transcript.isFinal ? "" : "opacity-60"}`}
              >
                {transcript.text}
              </span>
            </div>
          ))}
        </div>
      ) : null}

      {errorMsg ? (
        <p className="rounded-lg border border-rose-400/30 bg-rose-500/10 px-4 py-2 text-xs text-rose-200">
          {errorMsg}
        </p>
      ) : null}

      <p className="text-center text-[11px] text-zinc-500">
        Mikrofon-Zugriff wird vom Browser einmalig angefragt. Demo-Budget ist begrenzt.
      </p>
    </div>
  );
}
