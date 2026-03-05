"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

export default function PricingCalculator() {
  const [distance, setDistance] = useState(15);
  const [incidents, setIncidents] = useState(8);
  const [hourlyRate, setHourlyRate] = useState(50);

  // Kalkulations-Konstanten
  const kmRate = 0.3; // Euro pro km
  const averageSpeed = 40; // km/h (inkl. Stadtverkehr)
  const timePerIncidentOnSite = 20; // Minuten vor Ort pro Störung

  // Berechnungen
  const travelTimeMin = (distance / averageSpeed) * 60; // Fahrzeit in Minuten
  const totalTimePerIncident = travelTimeMin + timePerIncidentOnSite;
  const timeSavingsHours = (totalTimePerIncident * incidents) / 60;
  
  const fuelCosts = distance * 2 * incidents * kmRate; // Hin & Rückweg
  const timeCosts = timeSavingsHours * hourlyRate;
  const totalSavings = fuelCosts + timeCosts;

  // Geschätzter Mehrumsatz durch bessere Erreichbarkeit (konservativ 10€ pro Incident)
  const recoveryRevenue = incidents * 10;
  const totalImpact = totalSavings + recoveryRevenue;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Card className="glass-card overflow-hidden border-brand-400/30 p-8 shadow-2xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white">Rentabilitäts-Check</h2>
          <p className="mt-2 text-zinc-400">
            Berechne, wie viel Zeit und Geld du monatlich durch automatisierte Störungsannahme sparst.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <label className="font-medium text-zinc-300">Entfernung zum Laden (km)</label>
                <span className="font-mono text-brand-400">{distance} km</span>
              </div>
              <Slider
                value={[distance]}
                onValueChange={(v) => setDistance(v[0])}
                max={50}
                step={1}
                className="py-4"
              />
              <p className="text-[11px] text-zinc-500">Einfacher Weg von deinem Standort.</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <label className="font-medium text-zinc-300">Störungsmeldungen / Monat</label>
                <span className="font-mono text-brand-400">{incidents}</span>
              </div>
              <Slider
                value={[incidents]}
                onValueChange={(v) => setIncidents(v[0])}
                max={40}
                step={1}
                className="py-4"
              />
              <p className="text-[11px] text-zinc-500">Wie oft klingelt das Telefon wegen Problemen?</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <label className="font-medium text-zinc-300">Wert deiner Zeit (€/Std.)</label>
                <span className="font-mono text-brand-400">{hourlyRate} €</span>
              </div>
              <Slider
                value={[hourlyRate]}
                onValueChange={(v) => setHourlyRate(v[0])}
                min={20}
                max={150}
                step={5}
                className="py-4"
              />
              <p className="text-[11px] text-zinc-500">Dein kalkulatorischer Stundenlohn für Einsätze.</p>
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white/5 p-8 text-center ring-1 ring-white/10">
            <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Monatliches Sparpotenzial</p>
            <div className="mt-2 text-5xl font-bold text-brand-400">
              {Math.round(totalImpact)} €
            </div>
            <p className="mt-4 text-xs leading-relaxed text-zinc-400">
              Davon <span className="text-white">{Math.round(totalSavings)} €</span> direkte Kostenersparnis (Sprit & Zeit) 
              und ca. <span className="text-white">{Math.round(recoveryRevenue)} €</span> geretteter Umsatz durch schnellere Reaktionszeit.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-zinc-500">Zeitgewinn</p>
                <p className="text-lg font-semibold text-white">{Math.round(timeSavingsHours)} Std.</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-zinc-500">Amortisation</p>
                <p className="text-lg font-semibold text-white">
                  {totalImpact > 249 ? "Sofort" : `${Math.ceil(249 / (totalImpact / incidents || 1))} Meldungen`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
