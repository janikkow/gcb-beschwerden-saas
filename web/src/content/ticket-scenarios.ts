export type TicketScenario = {
  id: string;
  label: string;
  category: string;
  impact: "Hoch" | "Mittel" | "Niedrig" | "Review";
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
  reference: string;
};

export const ticketScenarios: TicketScenario[] = [
  {
    id: "geld-hoch",
    label: "Geld geschluckt (hoch)",
    category: "Geld geschluckt",
    impact: "Hoch",
    name: "Mara Klein",
    email: "m.klein@example.de",
    phone: "+49 151 23456789",
    message:
      "Automat hat 8 EUR abgebucht, aber kein Produkt ausgegeben. Bitte sofort prüfen.",
    timestamp: "04.03.2026, 08:14",
    reference: "BSW-KR29A",
  },
  {
    id: "ausgabe-mittel",
    label: "Ausgabe Fehler (mittel)",
    category: "Ausgabe Fehler",
    impact: "Mittel",
    name: "Jan Weber",
    email: "jan.weber@example.de",
    phone: "+49 170 9988776",
    message:
      "Snack ist im Schacht hängen geblieben. Nach zweitem Versuch funktionierte die Ausgabe.",
    timestamp: "04.03.2026, 10:37",
    reference: "BSW-QP71D",
  },
  {
    id: "karte-niedrig",
    label: "Kartenzahlung (niedrig)",
    category: "Kartenzahlung fehlgeschlagen",
    impact: "Niedrig",
    name: "Lena Ott",
    email: "l.ott@example.de",
    phone: "+49 176 55667788",
    message:
      "Erster Kartenversuch wurde abgelehnt, beim zweiten Mal ging es durch. Bitte beobachten.",
    timestamp: "04.03.2026, 12:02",
    reference: "BSW-DF55J",
  },
  {
    id: "alkohol-review",
    label: "Alkoholautomat (review)",
    category: "Alkoholautomat",
    impact: "Review",
    name: "Tim Berger",
    email: "tim.berger@example.de",
    phone: "+49 152 44112233",
    message:
      "Unklare Altersüberprüfung am Alkoholautomaten. Bitte manuelle Überprüfung und Rückmeldung.",
    timestamp: "04.03.2026, 14:21",
    reference: "BSW-ZX90P",
  },
];
