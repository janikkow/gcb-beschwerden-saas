export type TicketImpact = "high" | "medium" | "low" | "review";

export type TicketScenario = {
  id: string;
  impact: TicketImpact;
  name: string;
  email: string;
  phone: string;
  /** ISO 8601 local-style datetime string for locale-aware formatting in the UI */
  timestamp: string;
  reference: string;
};

export const ticketScenarios: TicketScenario[] = [
  {
    id: "geld-hoch",
    impact: "high",
    name: "Mara Klein",
    email: "m.klein@example.de",
    phone: "+49 151 23456789",
    timestamp: "2026-03-04T08:14:00",
    reference: "BSW-KR29A",
  },
  {
    id: "ausgabe-mittel",
    impact: "medium",
    name: "Jan Weber",
    email: "jan.weber@example.de",
    phone: "+49 170 9988776",
    timestamp: "2026-03-04T10:37:00",
    reference: "BSW-QP71D",
  },
  {
    id: "karte-niedrig",
    impact: "low",
    name: "Lena Ott",
    email: "l.ott@example.de",
    phone: "+49 176 55667788",
    timestamp: "2026-03-04T12:02:00",
    reference: "BSW-DF55J",
  },
  {
    id: "alkohol-review",
    impact: "review",
    name: "Tim Berger",
    email: "tim.berger@example.de",
    phone: "+49 152 44112233",
    timestamp: "2026-03-04T14:21:00",
    reference: "BSW-ZX90P",
  },
];
