"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

type State = "idle" | "loading" | "success" | "error";

export default function DemoForm() {
  const [status, setStatus] = useState<State>("idle");
  const [error, setError] = useState("");

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

      setStatus("success");
      event.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unbekannter Fehler.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
        <h3 className="text-lg font-semibold text-emerald-900">Danke fuer deine Anfrage.</h3>
        <p className="mt-2 text-sm text-emerald-800">
          Wir melden uns mit einem Vorschlag fuer deinen Demo-Slot im Automaten-Kontext.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">
          Name *
          <input
            name="name"
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-brand-500 transition focus:ring-2"
          />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Firma *
          <input
            name="company"
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-brand-500 transition focus:ring-2"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">
          E-Mail *
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-brand-500 transition focus:ring-2"
          />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Telefon (optional)
          <input
            name="phone"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-brand-500 transition focus:ring-2"
          />
        </label>
      </div>

      <div className="rounded-lg border border-brand-200 bg-brand-50 px-3 py-2 text-sm text-brand-800">
        Fokus fuer den Pilot: <span className="font-semibold">Automatenlaeden</span>
      </div>
      <input type="hidden" name="vertical" value="automaten" />

      <label className="text-sm font-medium text-slate-700">
        Nachricht
        <textarea
          name="message"
          rows={4}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-brand-500 transition focus:ring-2"
          placeholder="Welche Beschwerden treten bei euren Automaten am haeufigsten auf?"
        />
      </label>

      <input
        type="text"
        name="website"
        autoComplete="off"
        tabIndex={-1}
        className="hidden"
      />

      {status === "error" ? <p className="text-sm text-rose-600">{error}</p> : null}
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Wird gesendet..." : "Demo anfragen"}
      </Button>
    </form>
  );
}
