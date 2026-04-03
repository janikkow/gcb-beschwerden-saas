"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

export default function PricingCalculator() {
  const [distance, setDistance] = useState(15);
  const [incidents, setIncidents] = useState(8);
  const [hourlyRate, setHourlyRate] = useState(50);
  const t = useTranslations("calculator");

  const kmRate = 0.3;
  const averageSpeed = 40;
  const timePerIncidentOnSite = 20;

  const travelTimeMin = (distance / averageSpeed) * 60;
  const totalTimePerIncident = travelTimeMin + timePerIncidentOnSite;
  const timeSavingsHours = (totalTimePerIncident * incidents) / 60;

  const fuelCosts = distance * 2 * incidents * kmRate;
  const timeCosts = timeSavingsHours * hourlyRate;
  const totalSavings = fuelCosts + timeCosts;

  const recoveryRevenue = incidents * 10;
  const totalImpact = totalSavings + recoveryRevenue;

  return (
    <div className="mx-auto max-w-4xl px-3 py-8 sm:px-4 sm:py-12">
      <Card className="glass-card overflow-hidden border-brand-400/30 p-5 shadow-2xl sm:p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white">{t("headline")}</h2>
          <p className="mt-2 text-zinc-400">{t("body")}</p>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                <label className="font-medium text-zinc-300 [text-wrap:balance]">{t("distanceLabel")}</label>
                <span className="shrink-0 font-mono text-brand-400">{distance} km</span>
              </div>
              <Slider value={[distance]} onValueChange={(v) => setDistance(v[0]!)} max={50} step={1} className="py-4" />
              <p className="text-[11px] text-zinc-500">{t("distanceHint")}</p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                <label className="font-medium text-zinc-300 [text-wrap:balance]">{t("incidentsLabel")}</label>
                <span className="shrink-0 font-mono text-brand-400">{incidents}</span>
              </div>
              <Slider value={[incidents]} onValueChange={(v) => setIncidents(v[0]!)} max={40} step={1} className="py-4" />
              <p className="text-[11px] text-zinc-500">{t("incidentsHint")}</p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                <label className="font-medium text-zinc-300 [text-wrap:balance]">{t("hourlyLabel")}</label>
                <span className="shrink-0 font-mono text-brand-400">{hourlyRate} €</span>
              </div>
              <Slider value={[hourlyRate]} onValueChange={(v) => setHourlyRate(v[0]!)} min={20} max={150} step={5} className="py-4" />
              <p className="text-[11px] text-zinc-500">{t("hourlyHint")}</p>
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white/5 p-8 text-center ring-1 ring-white/10">
            <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">{t("savingsLabel")}</p>
            <div className="mt-2 text-4xl font-bold text-brand-400 sm:text-5xl">
              {Math.round(totalImpact)} €
            </div>
            <p className="mt-4 text-pretty text-xs leading-relaxed text-zinc-400">
              {t("savingsDetail", { savings: Math.round(totalSavings), revenue: Math.round(recoveryRevenue) })}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 border-t border-white/10 pt-6 sm:grid-cols-2">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-zinc-500">{t("timeGainLabel")}</p>
                <p className="text-lg font-semibold text-white">
                  {t("timeGainValue", { hours: Math.round(timeSavingsHours) })}
                </p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-zinc-500">{t("amortLabel")}</p>
                <p className="text-lg font-semibold text-white">
                  {totalImpact > 249
                    ? t("amortImmediate")
                    : t("amortMessages", { n: Math.ceil(249 / (totalImpact / incidents || 1)) })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
