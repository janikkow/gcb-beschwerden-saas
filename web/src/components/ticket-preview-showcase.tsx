"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import TicketEmailPreview from "@/components/ticket-email-preview";
import { ticketScenarios, type TicketImpact } from "@/content/ticket-scenarios";
import { cn } from "@/lib/utils";

const impactDot: Record<TicketImpact, string> = {
  high: "bg-rose-400",
  medium: "bg-amber-400",
  low: "bg-emerald-400",
  review: "bg-violet-400",
};

export default function TicketPreviewShowcase() {
  const t = useTranslations("ticketPreview");
  const [selectedId, setSelectedId] = useState(ticketScenarios[0]?.id ?? "");

  const scenario = useMemo(
    () => ticketScenarios.find((s) => s.id === selectedId) ?? ticketScenarios[0],
    [selectedId],
  );

  if (!scenario) return null;

  return (
    <div className="flex h-full min-h-0 flex-col gap-2">
      <div className="flex shrink-0 flex-wrap gap-2">
        {ticketScenarios.map((item) => {
          const active = item.id === scenario.id;
          const chipLabel = t(`scenarios.${item.id}.chip`);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              className={cn(
                "flex max-w-full items-center gap-1.5 rounded-full border px-3 py-1.5 text-left text-xs font-semibold transition-all duration-200 [text-wrap:balance] active:scale-95",
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
              {chipLabel}
            </button>
          );
        })}
      </div>

      <div className="min-h-0 shrink-0">
        <TicketEmailPreview scenario={scenario} />
      </div>
    </div>
  );
}
