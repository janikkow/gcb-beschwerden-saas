"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

type State = "idle" | "loading" | "success" | "error";

const inputClass =
  "mt-1 w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-white placeholder-zinc-400 outline-none transition focus:border-brand-400/50 focus:bg-white/[0.09] focus:ring-1 focus:ring-brand-400/40";

const labelClass = "block text-sm font-medium text-zinc-200";

const planOptions = [
  { value: "essentials", label: "Essentials – 89€" },
  { value: "professional", label: "Professional – 249€" },
  { value: "enterprise", label: "Enterprise – ab 799€" },
  { value: "", label: "Noch nicht sicher" },
];

export default function DemoForm() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<State>("idle");
  const [error, setError] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");

  useEffect(() => {
    const planFromUrl = searchParams.get("plan");
    if (planFromUrl && planOptions.some((p) => p.value === planFromUrl)) {
      setSelectedPlan(planFromUrl);
    }
  }, [searchParams]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      company: String(formData.get("company") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      vertical: String(formData.get("vertical") ?? ""),
      plan: String(formData.get("plan") ?? ""),
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
    };

    const form = event.currentTarget;
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error ?? "Anfrage konnte nicht gesendet werden.");
      }
      form.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unbekannter Fehler.");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 backdrop-blur-2xl"
        style={{ WebkitBackdropFilter: "blur(24px)" }}
      >
        <h3 className="text-lg font-semibold text-emerald-300">
          Danke für dein Interesse.
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          Du bist auf der Liste. Sobald der Pilot startet, bist du dabei.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl"
      style={{ WebkitBackdropFilter: "blur(24px)" }}
    >
      {/* Plan selection */}
      <div>
        <span className={labelClass}>Preisplan</span>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {planOptions.map((opt) => (
            <label
              key={opt.value}
              className={`cursor-pointer rounded-lg border px-3 py-2.5 text-sm transition ${
                selectedPlan === opt.value
                  ? "border-brand-400/50 bg-brand-400/15 text-brand-300"
                  : "border-white/10 bg-white/[0.04] text-zinc-400 hover:border-white/20"
              }`}
            >
              <input
                type="radio"
                name="plan"
                value={opt.value}
                checked={selectedPlan === opt.value}
                onChange={() => setSelectedPlan(opt.value)}
                className="sr-only"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      <div className="pixel-divider" />

      <div className="grid gap-4 sm:grid-cols-2">
        <label>
          <span className={labelClass}>Name *</span>
          <input
            name="name"
            required
            className={inputClass}
            placeholder="Max Mustermann"
          />
        </label>
        <label>
          <span className={labelClass}>Firma *</span>
          <input
            name="company"
            required
            className={inputClass}
            placeholder="Muster GmbH"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label>
          <span className={labelClass}>E-Mail *</span>
          <input
            name="email"
            type="email"
            required
            className={inputClass}
            placeholder="max@beispiel.de"
          />
        </label>
        <label>
          <span className={labelClass}>Telefon (optional)</span>
          <input name="phone" className={inputClass} placeholder="+49 ..." />
        </label>
      </div>

      <div className="rounded-lg border border-brand-400/25 bg-brand-500/10 px-3 py-2 text-sm text-brand-300">
        Fokus für den Pilot:{" "}
        <span className="font-semibold">Automatenläden</span>
      </div>
      <input type="hidden" name="vertical" value="automaten" />

      <label>
        <span className={labelClass}>Nachricht</span>
        <textarea
          name="message"
          rows={3}
          className={inputClass}
          placeholder="Wie viele Standorte betreibt ihr? Welche Beschwerden treten am häufigsten auf?"
        />
      </label>

      {/* Honeypot */}
      <input
        type="text"
        name="website"
        autoComplete="off"
        tabIndex={-1}
        className="hidden"
      />

      {status === "error" && (
        <p className="rounded-lg border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full border border-brand-300/70 bg-brand-400 text-sm font-semibold text-zinc-950 shadow-[0_8px_26px_rgba(98,164,255,0.35)] transition-all hover:bg-white hover:text-zinc-950 sm:w-auto"
      >
        {status === "loading" ? "Wird gesendet..." : "Auf die Waitlist"}
      </Button>
    </form>
  );
}
