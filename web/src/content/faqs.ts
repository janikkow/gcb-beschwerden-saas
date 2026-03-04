export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "Wie kann eine Beschwerde gemeldet werden?",
    answer:
      "Per Telefon oder per Webformular. Beide Wege laufen in denselben Bearbeitungsprozess.",
  },
  {
    question: "Was passiert nach einer Meldung?",
    answer:
      "Die KI sortiert die Meldung vor, setzt eine Dringlichkeit und erstellt automatisch eine klare E-Mail oder ein Ticket.",
  },
  {
    question: "Was übernimmt die KI?",
    answer:
      "Sie übernimmt die Vorsortierung: Problemart erkennen, Dringlichkeit einschätzen und Daten aufbereiten.",
  },
  {
    question: "Muss mein Team dafür technisch sein?",
    answer:
      "Nein. Das Team arbeitet mit klaren, verständlichen Meldungen und muss keine KI-Tools bedienen.",
  },
  {
    question: "Welche Probleme passen für Automatenläden?",
    answer:
      "Zum Beispiel Geld geschluckt, Produkt bleibt hängen, Kartenzahlung fehlgeschlagen oder unklare Altersüberprüfung.",
  },
  {
    question: "Wie wird die Priorität festgelegt?",
    answer:
      "Die Priorität richtet sich nach Problemart und Inhalt der Meldung. Wichtige Fälle können sofort markiert werden.",
  },
  {
    question: "Kann ich Kategorien anpassen?",
    answer:
      "Ja. Kategorien und Regeln können auf euren Betrieb angepasst werden.",
  },
  {
    question: "Wann wird ein Mensch eingeschaltet?",
    answer:
      "Wenn ein Fall unklar oder sensibel ist, wird er für manuellen Review markiert.",
  },
  {
    question: "Wie schnell ist ein Pilot für Automatenläden live?",
    answer:
      "Ein fokussierter Pilot ist meist in wenigen Tagen möglich, sobald Telefonnummer und Weiterleitung geklärt sind.",
  },
  {
    question: "Wie werden Leads verarbeitet?",
    answer:
      "Demo-Anfragen laufen über ein geschütztes Formular und werden per API an E-Mail oder Webhook weitergeleitet.",
  },
  {
    question: "Sind Kundendaten getrennt speicherbar?",
    answer:
      "Ja. Eine getrennte Datenhaltung pro Kunde ist möglich.",
  },
  {
    question: "Kann ich bestehende Prozesse weiter nutzen?",
    answer:
      "Ja. Bestehende Ticket- und E-Mail-Prozesse können weiter genutzt werden.",
  },
];
