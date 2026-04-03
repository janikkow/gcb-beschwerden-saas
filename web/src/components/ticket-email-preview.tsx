import type { TicketScenario } from "@/content/ticket-scenarios";

type Props = { scenario: TicketScenario };


const impactConfig: Record<
  TicketScenario["impact"],
  { label: string; dot: string; pill: string; border: string; glow: string }
> = {
  Hoch: {
    label: "Hoch",
    dot: "bg-rose-400",
    pill: "bg-rose-500/20 text-rose-300 border-rose-400/30",
    border: "border-rose-500/40",
    glow: "from-rose-500/10",
  },
  Mittel: {
    label: "Mittel",
    dot: "bg-amber-400",
    pill: "bg-amber-500/20 text-amber-300 border-amber-400/30",
    border: "border-amber-500/40",
    glow: "from-amber-500/10",
  },
  Niedrig: {
    label: "Niedrig",
    dot: "bg-emerald-400",
    pill: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
    border: "border-emerald-500/40",
    glow: "from-emerald-500/10",
  },
  Review: {
    label: "Review",
    dot: "bg-violet-400",
    pill: "bg-violet-500/20 text-violet-300 border-violet-400/30",
    border: "border-violet-500/40",
    glow: "from-violet-500/10",
  },
};

export default function TicketEmailPreview({ scenario }: Props) {
  const cfg = impactConfig[scenario.impact];

  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-white/[0.05] backdrop-blur-2xl ${cfg.border}`}
      style={{ WebkitBackdropFilter: "blur(24px)" }}
    >
      {/* ── Header ─────────────────────────────────────────────── */}
      <div
        className={`relative overflow-hidden border-b border-white/10 bg-gradient-to-br ${cfg.glow} to-white/[0.03] px-5 py-4`}
      >
        {/* Subtle top-left glow blob */}
        <div className="pointer-events-none absolute -left-6 -top-6 h-24 w-24 rounded-full bg-brand-500/10 blur-2xl" />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-zinc-500">
              Ticket-Preview
            </p>
            <h3 className="text-pretty text-sm font-semibold text-white break-words">
              Neue Meldung eingegangen
            </h3>
          </div>

          {/* Priority pill */}
          <span
            className={`flex w-fit shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold sm:mt-0.5 ${cfg.pill}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
            {cfg.label}
          </span>
        </div>

        {/* Category tag */}
        <div className="mt-3">
          <span className="rounded-md border border-brand-400/25 bg-brand-500/15 px-2.5 py-1 text-xs font-semibold text-brand-300">
            {scenario.category}
          </span>
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────────── */}
      <div className="space-y-4 px-5 py-4">
        {/* Metadata grid */}
        <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
          {[
            { label: "Name",      value: scenario.name },
            { label: "E-Mail",    value: scenario.email },
            { label: "Telefon",   value: scenario.phone },
            { label: "Zeitpunkt", value: scenario.timestamp },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-600">
                {label}
              </p>
              <p className="mt-0.5 break-words text-sm text-zinc-200 sm:truncate">{value}</p>
            </div>
          ))}
        </div>

        {/* Message */}
        <div className={`rounded-xl border-l-2 ${cfg.border} bg-white/[0.04] p-3`}>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-600">
            Nachricht
          </p>
          <p className="text-sm leading-relaxed text-zinc-300">
            {scenario.message}
          </p>
        </div>
      </div>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <div className="border-t border-white/[0.07] bg-white/[0.02] px-5 py-3">
        <p className="text-xs text-zinc-600">
          Referenz:{" "}
          <span className="font-mono font-semibold text-zinc-300">
            {scenario.reference}
          </span>
        </p>
      </div>
    </div>
  );
}
