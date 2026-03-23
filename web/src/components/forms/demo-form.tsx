"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

type State = "idle" | "loading" | "success" | "error";

const inputClass =
  "mt-1 w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-white placeholder-zinc-400 outline-none transition focus:border-brand-400/50 focus:bg-white/[0.09] focus:ring-1 focus:ring-brand-400/40";

const labelClass = "block text-sm font-medium text-zinc-200";

const planOptions = [
  { value: "light", label: "Light - 39 EUR / Monat" },
  { value: "starter", label: "Starter - 89 EUR / Monat" },
  { value: "professional", label: "Professional - 199 EUR / Monat" },
  { value: "enterprise", label: "Enterprise - auf Anfrage" },
  { value: "", label: "Noch nicht sicher" },
];

export default function DemoForm() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<State>("idle");
  const [error, setError] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const errorRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const planFromUrl = searchParams.get("plan");
    if (planFromUrl && planOptions.some((p) => p.value === planFromUrl)) {
      setSelectedPlan(planFromUrl);
    }
  }, [searchParams]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      const firstInvalid = form.querySelector<HTMLElement>(
        "input:not([type='hidden']):invalid, textarea:invalid, select:invalid",
      );
      firstInvalid?.focus();
      firstInvalid?.scrollIntoView({ block: "center", behavior: "smooth" });
      form.reportValidity();
      setStatus("error");
      setError("Bitte korrigiere die markierten Pflichtfelder.");
      return;
    }

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

  useEffect(() => {
    if (status === "error") {
      errorRef.current?.focus();
    }
  }, [status]);

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
      noValidate
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
            autoComplete="name"
            aria-describedby={status === "error" ? "demo-form-error" : undefined}
          />
        </label>
        <label>
          <span className={labelClass}>Firma *</span>
          <input
            name="company"
            required
            className={inputClass}
            placeholder="Muster GmbH"
            autoComplete="organization"
            aria-describedby={status === "error" ? "demo-form-error" : undefined}
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
            autoComplete="email"
            spellCheck={false}
            aria-describedby={status === "error" ? "demo-form-error" : undefined}
          />
        </label>
        <label>
          <span className={labelClass}>Telefon (optional)</span>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={inputClass}
            placeholder="+49 ..."
            aria-describedby={status === "error" ? "demo-form-error" : undefined}
          />
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
          aria-describedby={status === "error" ? "demo-form-error" : undefined}
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
        <p
          id="demo-form-error"
          ref={errorRef}
          tabIndex={-1}
          role="alert"
          className="rounded-lg border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300"
        >
          {error}
        </p>
      )}

      <p
        className="sr-only"
        role={status === "error" ? "alert" : "status"}
        aria-live={status === "error" ? "assertive" : "polite"}
        aria-atomic="true"
      >
        {status === "loading"
          ? "Anfrage wird gesendet."
          : status === "error"
            ? error
            : ""}
      </p>

      <Button
        type="submit"
        variant="cta"
        disabled={status === "loading"}
        className="w-full sm:w-auto"
      >
        {status === "loading" ? "Wird gesendet..." : "Demo sichern"}
      </Button>
    </form>
  );
}
