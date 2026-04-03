"use client";

import { useLocale, useTranslations } from "next-intl";
import type { TicketImpact, TicketScenario } from "@/content/ticket-scenarios";

type Props = { scenario: TicketScenario };

const impactStyles: Record<
  TicketImpact,
  { dot: string; pill: string; border: string; glow: string }
> = {
  high: {
    dot: "bg-rose-400",
    pill: "bg-rose-500/20 text-rose-300 border-rose-400/30",
    border: "border-rose-500/40",
    glow: "from-rose-500/10",
  },
  medium: {
    dot: "bg-amber-400",
    pill: "bg-amber-500/20 text-amber-300 border-amber-400/30",
    border: "border-amber-500/40",
    glow: "from-amber-500/10",
  },
  low: {
    dot: "bg-emerald-400",
    pill: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
    border: "border-emerald-500/40",
    glow: "from-emerald-500/10",
  },
  review: {
    dot: "bg-violet-400",
    pill: "bg-violet-500/20 text-violet-300 border-violet-400/30",
    border: "border-violet-500/40",
    glow: "from-violet-500/10",
  },
};

function formatScenarioTime(isoLocal: string, locale: string): string {
  const d = new Date(isoLocal);
  if (Number.isNaN(d.getTime())) {
    return isoLocal;
  }
  const intlLocale = locale === "de" ? "de-DE" : "en-US";
  return new Intl.DateTimeFormat(intlLocale, {
    dateStyle: "short",
    timeStyle: "short",
  }).format(d);
}

export default function TicketEmailPreview({ scenario }: Props) {
  const t = useTranslations("ticketPreview");
  const locale = useLocale();
  const cfg = impactStyles[scenario.impact];
  const impactLabel = t(`impact.${scenario.impact}`);
  const category = t(`scenarios.${scenario.id}.category`);
  const messageBody = t(`scenarios.${scenario.id}.body`);
  const timeDisplay = formatScenarioTime(scenario.timestamp, locale);

  return (
    <div
      className={`overflow-hidden rounded-3xl border bg-white/[0.05] backdrop-blur-2xl ${cfg.border}`}
      style={{ WebkitBackdropFilter: "blur(24px)" }}
    >
      <div
        className={`relative overflow-hidden border-b border-white/10 bg-gradient-to-br ${cfg.glow} to-white/[0.03] px-6 py-5 sm:px-7 sm:py-6`}
      >
        <div className="pointer-events-none absolute -left-6 -top-6 h-28 w-28 rounded-full bg-brand-500/10 blur-2xl" />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.13em] text-zinc-500">
              {t("kicker")}
            </p>
            <h3 className="text-pretty text-base font-semibold text-white break-words sm:text-lg">
              {t("title")}
            </h3>
          </div>

          <span
            className={`flex w-fit shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold sm:mt-0.5 ${cfg.pill}`}
          >
            <span className={`h-2 w-2 rounded-full ${cfg.dot}`} />
            {impactLabel}
          </span>
        </div>

        <div className="mt-4">
          <span className="rounded-lg border border-brand-400/25 bg-brand-500/15 px-3 py-1.5 text-sm font-semibold text-brand-300">
            {category}
          </span>
        </div>
      </div>

      <div className="space-y-5 px-6 py-5 sm:px-7 sm:py-6">
        <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
          {[
            { key: "name", label: t("name"), value: scenario.name },
            { key: "email", label: t("email"), value: scenario.email },
            { key: "phone", label: t("phone"), value: scenario.phone },
            { key: "time", label: t("time"), value: timeDisplay },
          ].map(({ key, label, value }) => (
            <div key={key}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-600">
                {label}
              </p>
              <p className="mt-1 break-words text-base text-zinc-200 sm:truncate">{value}</p>
            </div>
          ))}
        </div>

        <div className={`rounded-xl border-l-[3px] ${cfg.border} bg-white/[0.04] p-4 sm:p-5`}>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-600">
            {t("message")}
          </p>
          <p className="text-base leading-relaxed text-zinc-300">{messageBody}</p>
        </div>
      </div>

      <div className="border-t border-white/[0.07] bg-white/[0.02] px-6 py-4 sm:px-7">
        <p className="text-sm text-zinc-600">
          {t("referencePrefix")}{" "}
          <span className="font-mono text-base font-semibold text-zinc-300">
            {scenario.reference}
          </span>
        </p>
      </div>
    </div>
  );
}
