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
    question: "Welche Informationen werden direkt erfasst?",
    answer:
      "Standardisiert werden Name, Kontakt, Standort, Problemtyp, Zeitstempel und Dringlichkeit erfasst, damit dein Team sofort handeln kann.",
  },
  {
    question: "Was übernimmt die KI?",
    answer:
      "Sie übernimmt die Vorsortierung: Problemart erkennen, Dringlichkeit einschätzen und Daten aufbereiten.",
  },
  {
    question: "Was bleibt beim Team?",
    answer:
      "Die Entscheidung über Erstattung, Rückruf und finale Maßnahmen bleibt immer beim Team. OUTAG3 bereitet vor, ersetzt aber keine Betriebsentscheidung.",
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
    question: "Kann ich eigene Prioritätsregeln definieren?",
    answer:
      "Ja. Ihr könnt Regeln pro Störungstyp und Standort definieren, zum Beispiel Kartenleser-Ausfall als hoch und Kleinstbeträge als normal.",
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
    question: "Wie läuft der Pilot konkret ab?",
    answer:
      "Der Pilot startet mit einem Standort, klaren Kategorien und festen Eskalationsregeln. Nach 2 bis 4 Wochen wird anhand echter Meldungen optimiert.",
  },
  {
    question: "Wie werden Leads verarbeitet?",
    answer:
      "Wartelisten- und Interessenanfragen laufen über ein geschütztes Formular und werden per API an E-Mail oder Webhook weitergeleitet.",
  },
  {
    question: "Ist eine Integration in bestehende Tools möglich?",
    answer:
      "Ja. Übergaben sind per Webhook, E-Mail und API möglich, sodass bestehende Ticket- oder CRM-Prozesse weiter genutzt werden können.",
  },
  {
    question: "Sind Kundendaten getrennt speicherbar?",
    answer:
      "Ja. Eine getrennte Datenhaltung pro Kunde ist möglich.",
  },
  {
    question: "Wie ist das Thema Datenschutz gelöst?",
    answer:
      "Datensparsamkeit, Zugriffskontrolle und nachvollziehbare Verarbeitung sind Standard. Auf Wunsch können Aufbewahrungsfristen pro Datentyp definiert werden.",
  },
  {
    question: "Ist OUTAG3 DSGVO-konform einsetzbar?",
    answer:
      "Ja, bei korrekter Konfiguration von Rollen, Speicherfristen und Auftragsverarbeitung ist ein DSGVO-konformer Einsatz im Regelfall möglich.",
  },
  {
    question: "Wo werden Daten verarbeitet?",
    answer:
      "Die Verarbeitung richtet sich nach der gewählten Infrastruktur und den angebundenen Diensten. Für den Betrieb werden nur notwendige Daten verarbeitet.",
  },
  {
    question: "Wie werden kritische Vorfälle eskaliert?",
    answer:
      "Kritische Fälle werden sofort markiert und über den definierten Alarmkanal eskaliert, damit Ausfälle in Stoßzeiten nicht unentdeckt bleiben.",
  },
  {
    question: "Gibt es eine Auswertung über wiederkehrende Probleme?",
    answer:
      "Ja. Wiederkehrende Muster wie Kartenleser- oder Produktausgabe-Störungen können gruppiert werden, um Ursachen schneller zu beheben.",
  },
  {
    question: "Wie stabil ist der Betrieb bei hohem Anfragevolumen?",
    answer:
      "Für Peaks werden technische Schutzmechanismen wie Ratenbegrenzung und klare Fallbacks genutzt, damit das System auch bei Last stabil bleibt.",
  },
  {
    question: "Kann ich mit einem Standort starten und später skalieren?",
    answer:
      "Ja. Der übliche Weg ist ein Pilot pro Standort und danach schrittweiser Rollout auf weitere Standorte mit denselben Kernprozessen.",
  },
  {
    question: "Wie messe ich den Erfolg nach dem Start?",
    answer:
      "Typische Kennzahlen sind Reaktionszeit, Anteil automatisch vorsortierter Fälle, Zahl kritischer Eskalationen und Zeitersparnis im Support.",
  },
  {
    question: "Kann ich bestehende Prozesse weiter nutzen?",
    answer:
      "Ja. Bestehende Ticket- und E-Mail-Prozesse können weiter genutzt werden.",
  },
  {
    question: "Wie starte ich am schnellsten?",
    answer:
      "Trag dich auf die Warteliste ein. Wir sammeln Early-Tester ohne Zusage eines festen Testzeitraums; sobald es losgeht, klären wir Pilot-Scope und den Start für den ersten Standort.",
  },
];
