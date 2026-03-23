"use client";

import { useMemo, useState } from "react";
import TicketEmailPreview from "@/components/ticket-email-preview";
import { ticketScenarios } from "@/content/ticket-scenarios";
import { cn } from "@/lib/utils";

const impactDot: Record<string, string> = {
  Hoch:    "bg-rose-400",
  Mittel:  "bg-amber-400",
  Niedrig: "bg-emerald-400",
  Review:  "bg-violet-400",
};

export default function TicketPreviewShowcase() {
  const [selectedId, setSelectedId] = useState(ticketScenarios[0]?.id ?? "");

  const scenario = useMemo(
    () => ticketScenarios.find((s) => s.id === selectedId) ?? ticketScenarios[0],
    [selectedId],
  );

  if (!scenario) return null;

  return (
    <div className="flex h-full flex-col gap-4">
      {/* Scenario selector */}
      <div className="flex flex-wrap gap-2">
        {ticketScenarios.map((item) => {
          const active = item.id === scenario.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200 active:scale-95",
                active
                  ? "border-brand-400/50 bg-brand-500/20 text-brand-300 shadow-[0_0_15px_rgba(204,255,0,0.15)]"
                  : "border-white/10 bg-white/[0.05] text-zinc-400 hover:border-white/20 hover:text-zinc-200",
              )}
            >
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  impactDot[item.impact] ?? "bg-zinc-500",
                )}
              />
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="flex-1 min-h-0">
        <TicketEmailPreview scenario={scenario} />
      </div>
    </div>
  );
}
