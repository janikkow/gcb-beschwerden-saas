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
    question: "Was uebernimmt die KI?",
    answer:
      "Sie uebernimmt die Vorsortierung: Problemart erkennen, Dringlichkeit einschaetzen und Daten aufbereiten.",
  },
  {
    question: "Muss mein Team dafuer technisch sein?",
    answer:
      "Nein. Das Team arbeitet mit klaren, verstaendlichen Meldungen und muss keine KI-Tools bedienen.",
  },
  {
    question: "Welche Probleme passen fuer Automatenlaeden?",
    answer:
      "Zum Beispiel Geld geschluckt, Produkt bleibt haengen, Kartenzahlung fehlgeschlagen oder unklare Alterspruefung.",
  },
  {
    question: "Wie wird die Prioritaet festgelegt?",
    answer:
      "Die Prioritaet richtet sich nach Problemart und Inhalt der Meldung. Wichtige Faelle koennen sofort markiert werden.",
  },
  {
    question: "Kann ich Kategorien anpassen?",
    answer:
      "Ja. Kategorien und Regeln koennen auf euren Betrieb angepasst werden.",
  },
  {
    question: "Wann wird ein Mensch eingeschaltet?",
    answer:
      "Wenn ein Fall unklar oder sensibel ist, wird er fuer manuellen Review markiert.",
  },
  {
    question: "Wie schnell ist ein Pilot fuer Automatenlaeden live?",
    answer:
      "Ein fokussierter Pilot ist meist in wenigen Tagen moeglich, sobald Telefonnummer und Weiterleitung geklaert sind.",
  },
  {
    question: "Wie werden Leads verarbeitet?",
    answer:
      "Demo-Anfragen laufen ueber ein geschuetztes Formular und werden per API an E-Mail oder Webhook weitergeleitet.",
  },
  {
    question: "Sind Kundendaten getrennt speicherbar?",
    answer:
      "Ja. Eine getrennte Datenhaltung pro Kunde ist moeglich.",
  },
  {
    question: "Kann ich bestehende Prozesse weiter nutzen?",
    answer:
      "Ja. Bestehende Ticket- und E-Mail-Prozesse koennen weiter genutzt werden.",
  },
];
