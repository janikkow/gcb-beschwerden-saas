# FAQ-Kontextsammlung (Live-Bestand)

**Quelle der Live-FAQs:** [`web/messages/de.json`](../messages/de.json) → Namespace `faq.items`  
**Rendering:** [`web/src/app/[locale]/faq/page.tsx`](../src/app/[locale]/faq/page.tsx)  
**Stand:** abgeleitet aus FAQ-Texten plus Marketing-/Produktkontext auf der Site (Home, Voice-Demo, Ticket-Preview, Preise).

Dieses Dokument ist die **Rohkontext-Basis** für spätere längere FAQ-Antworten. Es ersetzt keine Rechtsberatung (v. a. DSGVO-Abschnitt).

---

## 1) Themen-Cluster (26 Einträge)

| Block | Nr. | Kurzthema |
| --- | --- | --- |
| **A – Eingang & Meldungsprozess** | 1–3 | Kanäle, Ablauf nach Meldung, erfasste Felder |
| **B – KI, Priorisierung & Review** | 4–11 | KI vs. Team, Skills, Problemtypen, Regeln, Kategorien, Human-in-the-loop |
| **C – Pilot, Integration & Start** | 12–15, 26 | Zeit bis Live, Pilotablauf, Leads, Integrationen, schnellster Einstieg |
| **D – Datenschutz & Datenhaltung** | 16–19 | Mandantentrennung, Schutzmaßnahmen, DSGVO-Rahmen, Verarbeitungsorte |
| **E – Betrieb, Skalierung & Erfolg** | 20–25 | Eskalation, Muster, Last, Rollout, KPIs, bestehende Prozesse |

---

## 2) Block A – Eingang & Meldungsprozess

### FAQ-1 – Wie kann eine Beschwerde gemeldet werden?

**Live-Antwort:** Per Telefon oder per Webformular. Beide Wege laufen in denselben Bearbeitungsprozess.

| Dimension | Rohkontext |
| --- | --- |
| **Leserintention** | Welche Kanäle gibt es konkret? Muss der Kunde eine App haben? Was kostet es mich als Betreiber? |
| **Betriebssituation** | 24/7-Anrufe vs. „nur Tagsüber“; Filialen mit/ohne Personal; Kunden, die lieber schreiben als anrufen. |
| **Lücken der Kurzantwort** | Kein Hinweis auf Voice-Agent / Demo-Erwartung („unter 2 Min“); keine Erwähnung von Weiterleitung/Rufnummer im Pilot; kein Webformular-Kontext (z. B. Light-Tarif). |
| **Einwände / Missverständnisse** | „KI ersetzt unseren Laden.“ – Abgrenzung: Annahme/Triage vs. Entscheidung vor Ort. |
| **Beispiele / Grenzen** | Telefon: strukturierter Dialog; Formular: asynchron, gleiche strukturierte Ausgabe. |
| **Rohmaterial (Stichpunkte)** | Parallele zu Home: „Frust-Anruf“, 24/7; Voice-Demo: Name, Problem, Kontakt; Pricing Light: Webformular + Voice-Minuten; beide Kanäle → einheitlicher Prozess / gleiche Ticket-Logik. |
| **Ausbaupriorität später** | **muss länger werden** – Kanäle und Erwartungshaltung sind Kernkaufargument. |

---

### FAQ-2 – Was passiert nach einer Meldung?

**Live-Antwort:** Die KI sortiert die Meldung vor, setzt eine Dringlichkeit und erstellt automatisch eine klare E-Mail oder ein Ticket.

| Dimension | Rohkontext |
| --- | --- |
| **Leserintention** | Wie schnell? Wo landet es? Was sehe ich als Betreiber? Was ist der nächste physische Schritt? |
| **Betriebssituation** | Inbox-Chaos vs. klare Queue; Nachtschicht vs. nächster Morgen. |
| **Lücken der Kurzantwort** | Keine Reihenfolge (Intake → Klassifikation → Output); kein „Impact“/Labels (vgl. Ticket-Preview: hoch/mittel/niedrig/review); keine Erwähnung von Zusammenfassung vs. Rohdaten. |
| **Einwände / Missverständnisse** | „Die KI entscheidet die Erstattung.“ – Klarstellung mit FAQ-5 verzahnen. |
| **Beispiele / Grenzen** | Output „E-Mail oder Ticket“ je nach Integration (FAQ-15); Eskalation bei „hoch“ (FAQ-20). |
| **Rohmaterial (Stichpunkte)** | Schritte analog Home „5 Schritte“; Ticket-Preview-Felder: Name, Kontakt, Zeit, Nachricht, Referenz, Impact; Voice-Demo: Klassifikation + Ticket-Vorbereitung. |
| **Ausbaupriorität später** | **muss länger werden** – Prozessverständnis reduziert Sales-Reibung. |

---

### FAQ-3 – Welche Informationen werden direkt erfasst?

**Live-Antwort:** Standardisiert werden Name, Kontakt, Standort, Problemtyp, Zeitstempel und Dringlichkeit erfasst, damit dein Team sofort handeln kann.

| Dimension | Rohkontext |
| --- | --- |
| **Leserintention** | Reicht das für Erstattung (IBAN/PayPal)? Welche Pflichtfelder? DSGVO? |
| **Betriebssituation** | Erstattungslisten vs. reine Störungsannahme; mehrere Automaten pro Standort. |
| **Lücken der Kurzantwort** | Home erwähnt explizit IBAN/PayPal für Erstattung – in FAQ noch nicht; keine freien Textfelder vs. strukturierte Slots. |
| **Einwände / Missverständnisse** | „Wir speichern zu viel.“ – Datensparsamkeit (FAQ-17) und Zweckbindung. |
| **Beispiele / Grenzen** | Szenario „Geld geschluckt“: Betrag, Automat, Uhrzeit; Karte: Versuch 1/2. |
| **Rohmaterial (Stichpunkte)** | Abgleich mit `ticketPreview`-Labels; Home Step 3 „Name, Standort, IBAN/PayPal“; optional Referenz-ID für Kunden. |
| **Ausbaupriorität später** | **muss länger werden** – Erstattungs-Story ist differenzierend. |

---

#### Block-A-Verdichtung

- **Dopplungen:** FAQ-2 und FAQ-4 überschneiden sich (Vorsortierung); FAQ-3 und FAQ-4 (was erfasst vs. was KI tut).
- **Abgrenzung für spätere Texte:** Ablauf (2) vs. Datenfelder (3) vs. KI-Rolle (4).
- **Neue FAQ-Ideen:** „Brauchen Kunden eine App?“ / „Was passiert nachts mit Meldungen?“ / „Wie sieht eine typische Meldung im Postfach aus?“
- **Block-Priorität:** Hoch – erstes Berührungspunkt-Cluster.

---

## 3) Block B – KI, Priorisierung & Review

### FAQ-4 – Was übernimmt die KI?

**Live-Antwort:** Sie übernimmt die Vorsortierung: Problemart erkennen, Dringlichkeit einschätzen und Daten aufbereiten.

| Dimension | Rohkontext |
| --- | --- |
| **Leserintention** | Genau welche Teilaufgaben? Wo sind Fehler möglich? |
| **Betriebssituation** | Viele gleichartige Kleinfälle vs. seltene kritische Ausfälle. |
| **Lücken der Kurzantwort** | Kein „Triage: Bagatelle vs. Notfall“ (Home); kein Review-Pfad (FAQ-11). |
| **Einwände / Missverständnisse** | „Blackbox.“ – Transparenz: nachvollziehbare Kategorien + Impact. |
| **Beispiele / Grenzen** | Glossar: Impact-Matrix, Voice Intake; Ticket-Szenarien als Illustration. |
| **Rohmaterial (Stichpunkte)** | KI = Intake + Klassifikation + Strukturierung; Mensch = Entscheidung + Ausnahmen; Verweis Glossar „Triage“. |
| **Ausbaupriorität später** | **muss länger werden** – Vertrauensaufbau. |

---

### FAQ-5 – Was bleibt beim Team?

**Live-Antwort:** Die Entscheidung über Erstattung, Rückruf und finale Maßnahmen bleibt immer beim Team. OUTAG3 bereitet vor, ersetzt aber keine Betriebsentscheidung.

| Dimension | Rohkontext |
| --- | --- |
| **Leserintention** | Haftung, Kundenkommunikation, wirtschaftliche Entscheidung. |
| **Betriebssituation** | Franchise vs. Zentralentscheidung; dokumentierte Erstattungsrichtlinien. |
| **Lücken der Kurzantwort** | Optional: Eskalation „du musst ran“ vs. „nur vorbereitet“. |
| **Einwände / Missverständnisse** | „Wenn die KI falsch priorisiert …“ – Review + Anpassung Regeln (9–11). |
| **Beispiele / Grenzen** | Alkohol / sensibel → Review (Ticket-Szenario `alkohol-review`). |
| **Rohmaterial (Stichpunkte)** | Klare Verantwortungsmatrix: OUTAG3 liefert strukturierten Fall; Betreiber entscheidet Policy. |
| **Ausbaupriorität später** | **reicht fast** – evtl. um 1 Satz Compliance/Erstattungspolicy ergänzen. |

---

### FAQ-6 – Muss mein Team dafür technisch sein?

**Live-Antwort:** Nein. Das Team arbeitet mit klaren, verständlichen Meldungen und muss keine KI-Tools bedienen.

| Dimension | Rohkontext |
| --- | --- |
| **Leserintention** | Schulungsaufwand? Admin-UI? Wer konfiguriert Regeln? |
| **Betriebssituation** | Kleine Familienbetriebe vs. Ops-Team mit Ticketing. |
| **Lücken der Kurzantwort** | Pricing: „Self-Service Setup“ vs. „Done-for-you“; professionelles Dashboard erwähnt. |
| **Einwände / Missverständnisse** | „Wir brauchen einen ITler für Integration.“ – Teilweise ja für Webhook (FAQ-15). |
| **Beispiele / Grenzen** | Endnutzer: E-Mail lesen; Ops: optional tiefer (Enterprise). |
| **Rohmaterial (Stichpunkte)** | Botschaft: Frontline nutzt E-Mail/Ticket; Konfiguration kann beim Onboarding anliegen. |
| **Ausbaupriorität später** | **muss länger werden** – differenziere Endnutzer vs. Admin. |

---

### FAQ-7 – Welche Probleme passen für Automatenläden?

**Live-Antwort:** Zum Beispiel Geld geschluckt, Produkt bleibt hängen, Kartenzahlung fehlgeschlagen oder unklare Altersüberprüfung.

| Dimension | Rohkontext |
| --- | --- |
| **Leserintention** | Passt mein Vertical? Was ist „out of scope“? |
| **Betriebssituation** | Snack/Kaltgetränk vs. Alkohol; Stoßzeiten-Themen. |
| **Lücken der Kurzantwort** | Home: Kartenleser-Ausfall als Umsatzrisiko; Hygiene/Vandalismus nicht genannt (bewusst?). |
| **Einwände / Missverständnisse** | „Nur Verkaufsautomaten.“ – Klarheit Branchenfokus. |
| **Beispiele / Grenzen** | 1:1 aus `ticketPreview.scenarios` ableitbar. |
| **Rohmaterial (Stichpunkte)** | Vier Musterfälle als Marketing-Story; erweiterbar um „Schranke klemmt“ (Home). |
| **Ausbaupriorität später** | **muss länger werden** – SEO + ICP-Schärfe durch konkrete Liste. |

---

### FAQ-8 – Wie wird die Priorität festgelegt?

**Live-Antwort:** Die Priorität richtet sich nach Problemart und Inhalt der Meldung. Wichtige Fälle können sofort markiert werden.

| Dimension | Rohkontext |
| --- | --- |
| **Leserintention** | Welche Faktoren? Kann ich das steuern? |
| **Betriebssituation** | Samstagabend vs. Montagmorgen; gleicher Vorfall, anderer Impact. |
| **Lücken der Kurzantwort** | Kein Bezug zu Impact-Matrix / Stichwort „Stoßzeit“ (Home). |
| **Einwände / Missverständnisse** | „Sofort markiert“ – wie? Regel vs. manuell? |
| **Beispiele / Grenzen** | Hoch: Zahlung + keine Ausgabe; Niedrig: Karte zweiter Versuch OK. |
| **Rohmaterial (Stichpunkte)** | Regelbasiert + Inhalt; Verknüpfung FAQ-9; Eskalation FAQ-20. |
| **Ausbaupriorität später** | **muss länger werden**. |

---

### FAQ-9 – Kann ich eigene Prioritätsregeln definieren?

**Live-Antwort:** Ja. Ihr könnt Regeln pro Störungstyp und Standort definieren, zum Beispiel Kartenleser-Ausfall als hoch und Kleinstbeträge als normal.

| Dimension | Rohkontext |
| --- | --- |
| **Leserintention** | Wie granular? Wer pflegt das? Änderungen im laufenden Betrieb? |
| **Betriebssituation** | Ketten mit heterogenen Standorten; eine Location mit Alkohol, andere ohne. |
| **Lücken der Kurzantwort** | Glossar „Impact-Matrix“, „Tenant“ – könnte verlinkt/erklärt werden. |
| **Einwände / Missverständnisse** | „Ist das Standard oder Enterprise?“ – Preis-Feature-Mapping klären (intern). |
| **Beispiele / Grenzen** | Beispiel aus Live-Antwort ist gut; plus Zeitfenster (Stoßzeiten). |
| **Rohmaterial (Stichpunkte)** | Pro Standort / Störungstyp; Feinjustierung nach Pilot (FAQ-13). |
| **Ausbaupriorität später** | **muss länger werden** – B2B-Entscheider wollen Kontrolle. |

---

### FAQ-10 – Kann ich Kategorien anpassen?

**Live-Antwort:** Ja. Kategorien und Regeln können auf euren Betrieb angepasst werden.

| Dimension | Rohkontext |
| --- | --- |
| **Leserintention** | Unterschied Kategorien vs. Priorität vs. Eskalationskanal. |
| **Betriebssituation** | Eigene Produktgruppen, eigene interne Codes. |
| **Lücken der Kurzantwort** | Sehr generisch; Überschneidung mit FAQ-9. |
| **Einwände / Missverständnisse** | „Anpassbar“ ohne Aufwand zu nennen. |
| **Beispiele / Grenzen** | Mapping auf Ticket-Typen; Reporting (FAQ-21). |
| **Rohmaterial (Stichpunkte)** | Zusammenführen oder trennen: Kategorie = Label, Regel = Priorität/Eskalation. |
| **Ausbaupriorität später** | **muss länger werden** oder mit FAQ-9 **zusammenlegen** (Redundanz). |

---

### FAQ-11 – Wann wird ein Mensch eingeschaltet?

**Live-Antwort:** Wenn ein Fall unklar oder sensibel ist, wird er für manuellen Review markiert.

| Dimension | Rohkontext |
| --- | --- |
| **Leserintention** | Wer bekommt Review? SLA? Was passiert bis dahin mit dem Kunden? |
| **Betriebssituation** | Alkohol, Beschwerde mit Widerspruch, unvollständige Infos. |
| **Lücken der Kurzantwort** | Ticket-Impact „Review“ nicht benannt; keine Kundenkommunikation. |
| **Einwände / Missverständnisse** | „KI lässt Kunden hängen.“ – Erwartung: Rückmeldung/Prozess vom Betreiber. |
| **Beispiele / Grenzen** | Alkoholautomat-Szenario; niedrige Modellkonfidenz → Review (falls zutreffend). |
| **Rohmaterial (Stichpunkte)** | Human-in-the-loop als Qualitätssicherung; Verbindung zu Eskalation. |
| **Ausbaupriorität später** | **muss länger werden**. |

---

#### Block-B-Verdichtung

- **Dopplungen:** FAQ-8/9/10 (Priorität vs. Regeln vs. Kategorien); FAQ-4/2/11 (KI vs. Ablauf vs. Mensch).
- **Empfehlung später:** FAQ-9+10 in einem Eintrag „Regeln, Kategorien & Priorität“ oder klar gegeneinander abgrenzen.
- **Neue FAQ-Ideen:** „Wie verhindert ihr Fehlklassifikationen?“ / „Kann der Kunde einen Status sehen?“
- **Block-Priorität:** Sehr hoch – Produktverständnis + Vertrauen.

---

## 4) Block C – Pilot, Integration & Start

### FAQ-12 – Wie schnell ist ein Pilot für Automatenläden live?

**Live-Antwort:** Ein fokussierter Pilot ist meist in wenigen Tagen möglich, sobald Telefonnummer und Weiterleitung geklärt sind.

| Dimension | Rohkontext |
| --- | --- |
| **Leserintention** | Konkrete Vorlaufzeit; was blockiert typischerweise? |
| **Betriebssituation** | Nur Webformular vs. Voice; Provider-Rufnummer; rechtliche Freigaben. |
| **Lücken der Kurzantwort** | „Wenige Tage“ ohne Setup-Fee/Plan (Light ohne Setup vs. Professional done-for-you). |
| **Einwände / Missverständnisse** | Enterprise vs. Light unterscheiden. |
| **Beispiele / Grenzen** | Minimalpilot: ein Standort + Formular schneller als Voice-Routing. |
| **Rohmaterial (Stichpunkte)** | Abhängigkeiten: Nummer, Routing, Kategorien, Testcalls; Demo 20 Min (FAQ-26). |
| **Ausbaupriorität später** | **muss länger werden** – Erwartungsmanagement. |

---

### FAQ-13 – Wie läuft der Pilot konkret ab?

**Live-Antwort:** Der Pilot startet mit einem Standort, klaren Kategorien und festen Eskalationsregeln. Nach 2 bis 4 Wochen wird anhand echter Meldungen optimiert.

| Dimension | Rohkontext |
| --- | --- |
| **Leserintention** | Meilensteine, wer macht was, Erfolgskriterien. |
| **Betriebssituation** | Erste echte Peaks (Wochenende) als Test. |
| **Lücken der Kurzantwort** | Keine Weekly Review erwähnt; keine KPI-Verknüpfung (FAQ-24). |
| **Einwände / Missverständnisse** | „2–4 Wochen“ = Pflicht oder Richtwert? |
| **Beispiele / Grenzen** | Start klein → KPI → Regelanpassung (FAQ-9). |
| **Rohmaterial (Stichpunkte)** | Onboarding-Checkliste mental: Standortliste, Eskalationskanal, Testfälle, Go-Live. |
| **Ausbaupriorität später** | **muss länger werden**. |

---

### FAQ-14 – Wie werden Leads verarbeitet?

**Live-Antwort:** Demo-Anfragen laufen über ein geschütztes Formular und werden per API an E-Mail oder Webhook weitergeleitet.

| Dimension | Rohkontext |
| --- | --- |
| **Leserintention** | Betrifft das meinen Automatenbetrieb oder nur eure Sales-Seite? |
| **Betriebssituation** | Misstrauen gegenüber Formularspam; CRM-Anbindung. |
| **Lücken der Kurzantwort** | Demo-Formular erwähnt Honeypot + Rate-Limit (`de.json` demo-Form) – optional ergänzen. |
| **Einwände / Missverständnisse** | Vermischung mit Beschwerde-Intake – klar trennen. |
| **Beispiele / Grenzen** | Nur für **Website-Demo-Leads**, nicht für Endkunden-Beschwerden. |
| **Rohmaterial (Stichpunkte)** | Zwei Welten: (1) Marketing-Leads (2) Betreiber-Meldungen; gleiche Technik möglich, anderer Zweck. |
| **Ausbaupriorität später** | **evtl. streichen oder umbenennen** („Demo-Anfragen“ statt „Leads“) bzw. in **Sales-FAQ** auslagern – sonst Verwechslungsrisiko für ICP. |

---

### FAQ-15 – Ist eine Integration in bestehende Tools möglich?

**Live-Antwort:** Ja. Übergaben sind per Webhook, E-Mail und API möglich, sodass bestehende Ticket- oder CRM-Prozesse weiter genutzt werden können.

| Dimension | Rohkontext |
| --- | --- |
| **Leserintention** | Welche Systeme? OAuth? Felder-Mapping? |
| **Betriebssituation** | Zendesk/Jira/Outlook-Workflow; dediziertes Ops-Team. |
| **Lücken der Kurzantwort** | Keine Beispiel-Payloads; keine „was ist Standard (E-Mail)?“. |
| **Einwände / Missverständnisse** | „API“ klingt nach Dev-Aufwand – honest framing. |
| **Beispiele / Grenzen** | E-Mail = schnellster Start; Webhook = Automatisierung. |
| **Rohmaterial (Stichpunkte)** | Align mit FAQ-25; Enterprise „WhatsApp“ (Pricing) als separates Integrationsnarrativ. |
| **Ausbaupriorität später** | **muss länger werden** für technische Buyer. |

---

### FAQ-26 – Wie starte ich am schnellsten?

**Live-Antwort:** Trag dich auf die Warteliste ein. Wir sammeln Early-Tester ohne Zusage eines festen Testzeitraums; sobald es losgeht, klären wir Pilot-Scoping und den Start für den ersten Standort.

| Dimension | Rohkontext |
| --- | --- |
| **Leserintention** | Call-to-Action; was muss ich vorbereiten? |
| **Betriebssituation** | Entscheider will „nächste Schritte“. |
| **Lücken der Kurzantwort** | Link zur Warteliste / Voice testen; optional Light-Tarif. |
| **Einwände / Missverständnisse** | „Pilot“ klingt teuer – Setup-Fees erwähnen wenn relevant. |
| **Beispiele / Grenzen** | Parallel FAQ-12/13. |
| **Rohmaterial (Stichpunkte)** | Einheitliche Story: Warteliste → Scoping → Pilot → Messen (24). |
| **Ausbaupriorität später** | **reicht fast** – eher CTA-scharf als lang. |

---

#### Block-C-Verdichtung

- **Dopplungen:** FAQ-12, 13, 26 (Zeit, Ablauf, Start); FAQ-15 und FAQ-25.
- **Risiko:** FAQ-14 wirkt wie Produkt-Beschwerde statt Marketing – **Zielgruppe klar labeln**.
- **Neue FAQ-Ideen:** „Was brauche ich vor dem Go-Live?“ / „Geht nur Webformular ohne Telefon?“
- **Block-Priorität:** Hoch für Conversion; FAQ-14 strategisch prüfen.

---

## 5) Block D – Datenschutz & Datenhaltung

### FAQ-16 – Sind Kundendaten getrennt speicherbar?

**Live-Antwort:** Ja. Eine getrennte Datenhaltung pro Kunde ist möglich.

| Dimension | Rohkontext |
| --- | --- |
| **Leserintention** | Multi-Tenant, White-Label, Konzern mit Tochterfirmen. |
| **Betriebssituation** | Franchisegeber will Trennung pro Partner. |
| **Lücken der Kurzantwort** | Glossar „Tenant“ – inhaltlich anbinden; keine technische Architektur. |
| **Einwände / Missverständnisse** | „Möglich“ ≠ „Standard in jedem Plan“ – Plan-Abhängigkeit intern klären. |
| **Beispiele / Grenzen** | Mandantenfähigkeit vs. gemeinsame Instanz. |
| **Rohmaterial (Stichpunkte)** | Begriff Tenant; Datenisolation als Verkaufs- und Compliance-Argument. |
| **Ausbaupriorität später** | **muss länger werden** – juristische/technische Prüfung nötig bevor starke Claims. |

---

### FAQ-17 – Wie ist das Thema Datenschutz gelöst?

**Live-Antwort:** Datensparsamkeit, Zugriffskontrolle und nachvollziehbare Verarbeitung sind Standard. Auf Wunsch können Aufbewahrungsfristen pro Datentyp definiert werden.

| Dimension | Rohkontext |
| --- | --- |
| **Leserintention** | Welche Rollen? Logs? Unterauftragsverarbeiter? |
| **Betriebssituation** | DSB fragt nach Verzeichnis der Verarbeitungstätigkeiten. |
| **Lücken der Kurzantwort** | Verweis auf `datenschutz`-Seite; keine konkreten Tools (Vercel, Voice-Provider …) – in FAQ bewusst kurz halten oder mit Policy verlinken. |
| **Einwände / Missverständnisse** | „Standard“ ohne Nachweis – vorsichtige Formulierung in Langfassung. |
| **Beispiele / Grenzen** | Cookie-Banner/Analytics-Einwilligung auf Website getrennt von Produkt. |
| **Rohmaterial (Stichpunkte)** | Privacy by design narrative; Retention pro Datentyp; Zugriff nur für berechtigte Accounts. |
| **Ausbaupriorität später** | **muss länger werden** + **Link zur Datenschutzerklärung**. |

---

### FAQ-18 – Ist OUTAG3 DSGVO-konform einsetzbar?

**Live-Antwort:** Ja, bei korrekter Konfiguration von Rollen, Speicherfristen und Auftragsverarbeitung ist ein DSGVO-konformer Einsatz im Regelfall möglich.

| Dimension | Rohkontext |
| --- | --- |
| **Leserintention** | AV-Vertrag? TOM? Drittlandtransfer? |
| **Betriebssituation** | Enterprise Procurement Checkliste. |
| **Lücken der Kurzantwort** | „Im Regelfall möglich“ ist gut – Langfassung: was Betreiber selbst tun muss vs. Anbieter. |
| **Einwände / Missverständnisse** | Kein absolutes „konform“ ohne Konfiguration – Live-Antwort ist bereits vorsichtig; beibehalten. |
| **Beispiele / Grenzen** | Kundenkontakte von Endverbrauchern: Zweckbindung Erstattung. |
| **Rohmaterial (Stichpunkte)** | AV, Rollen, Löschkonzepte, Unterauftragnehmer-Liste; keine Rechtsberatung in Copy. |
| **Ausbaupriorität später** | **muss länger werden** mit **Disclaimer** + Verweis Legal. |

---

### FAQ-19 – Wo werden Daten verarbeitet?

**Live-Antwort:** Die Verarbeitung richtet sich nach der gewählten Infrastruktur und den angebundenen Diensten. Für den Betrieb werden nur notwendige Daten verarbeitet.

| Dimension | Rohkontext |
| --- | --- |
| **Leserintention** | EU-Region? US-Subprozessoren? Telefonie/Voice-Anbieter. |
| **Betriebssituation** | Öffentliche Auftraggeber, Banken, interne IT-Policies. |
| **Lücken der Kurzantwort** | Bewusst unspezifisch – für Langfassung **tatsächliche Hosting- und Subprocessor-Fakten** aus Datenschutzerklärung übernehmen. |
| **Einwände / Missverständnisse** | Zu vage könnte Misstrauen erzeugen – Balance Transparenz vs. Wartbarkeit. |
| **Beispiele / Grenzen** | Trennung: Website vs. Produkt-Backend vs. Voice. |
| **Rohmaterial (Stichpunkte)** | Abgleich mit `datenschutz`-Content im Repo; ggf. Region EU als Zielbild formulieren wenn zutreffend. |
| **Ausbaupriorität später** | **muss länger werden** sobald **faktische Liste** freigegeben ist. |

---

#### Block-D-Verdichtung

- **Dopplungen:** FAQ-16–19 überschneiden sich (Ort, Trennung, Schutz).
- **Risiko:** Zu viele konkrete Tech-Claims ohne Legal-Review – Langfassung mit Legal abstimmen.
- **Neue FAQ-Ideen:** „Wer ist Verantwortlicher – ich oder OUTAG3?“ / „Wie lange speichert ihr Transkripte?“
- **Block-Priorität:** Hoch für Enterprise, mittel für SMB wenn kurz + Link.

---

## 6) Block E – Betrieb, Skalierung & Erfolg

### FAQ-20 – Wie werden kritische Vorfälle eskaliert?

**Live-Antwort:** Kritische Fälle werden sofort markiert und über den definierten Alarmkanal eskaliert, damit Ausfälle in Stoßzeiten nicht unentdeckt bleiben.

| Dimension | Rohkontext |
| --- | --- |
| **Leserintention** | SMS, Anruf, Slack, E-Mail? Wer ist Empfänger? |
| **Betriebssituation** | Samstag 22 Uhr; Professional Plan erwähnt „SMS Eskalation“. |
| **Lücken der Kurzantwort** | Kanal nicht benannt; Plan-Abhängigkeit. |
| **Einwände / Missverständnisse** | „Sofort“ = wie schnell in Sekunden vs. Minuten. |
| **Beispiele / Grenzen** | Home „Sofort-Alarm in Stoßzeiten“. |
| **Rohmaterial (Stichpunkte)** | Alarmkanal konfigurierbar; Testing im Pilot; Verknüpfung FAQ-8/9. |
| **Ausbaupriorität später** | **muss länger werden** (Kanäle + Beispiel). |

---

### FAQ-21 – Gibt es eine Auswertung über wiederkehrende Probleme?

**Live-Antwort:** Ja. Wiederkehrende Muster wie Kartenleser- oder Produktausgabe-Störungen können gruppiert werden, um Ursachen schneller zu beheben.

| Dimension | Rohkontext |
| --- | --- |
| **Leserintention** | Dashboard? Export? Wöchentlicher Report? |
| **Betriebssituation** | Wartungsplanung, Lieferanten eskalieren, Automat tauschen. |
| **Lücken der Kurzantwort** | Pricing: „Historie“ ab Professional; sonst evtl. nur E-Mail-Reports. |
| **Einwände / Missverständnisse** | „Analytics“ klingt nach Endkunden-Tracking – klären: Auswertung **Meldungen**. |
| **Beispiele / Grenzen** | Gleiche Maschine N× „Ausgabe hängt“. |
| **Rohmaterial (Stichpunkte)** | Ops-Insight: Kategorie-Zeitreihen; ROI-Story mit FAQ-24. |
| **Ausbaupriorität später** | **muss länger werden** + **Plan-Transparenz**. |

---

### FAQ-22 – Wie stabil ist der Betrieb bei hohem Anfragevolumen?

**Live-Antwort:** Für Peaks werden technische Schutzmechanismen wie Ratenbegrenzung und klare Fallbacks genutzt, damit das System auch bei Last stabil bleibt.

| Dimension | Rohkontext |
| --- | --- |
| **Leserintention** | Black Friday, lokales Event, viraler Shitstorm. |
| **Betriebssituation** | Viele parallele Anrufe; Demo-Budget vs. Produktion. |
| **Lücken der Kurzantwort** | Was ist Fallback (Voicemail, Callback, Nur-Formular)? |
| **Einwände / Missverständnisse** | Rate-Limit trifft auch legitime Kunden – kommunizieren wie? |
| **Beispiele / Grenzen** | Voice-Demo: „Demo-Budget begrenzt“ – Produktionsstory separat. |
| **Rohmaterial (Stichpunkte)** | Schutz vor Missbrauch + Lastspitzen; Monitoring; faire Nutzung. |
| **Ausbaupriorität später** | **muss länger werden** für risk-averse Buyer. |

---

### FAQ-23 – Kann ich mit einem Standort starten und später skalieren?

**Live-Antwort:** Ja. Der übliche Weg ist ein Pilot pro Standort und danach schrittweiser Rollout auf weitere Standorte mit denselben Kernprozessen.

| Dimension | Rohkontext |
| --- | --- |
| **Leserintention** | Preis pro Standort; Klonen von Regeln. |
| **Betriebssituation** | Zwei Shops diese Jahr, zehn nächstes Jahr. |
| **Lücken der Kurzantwort** | Pricing-Staffelung (1/2/10 Standorte) andeuten ohne zu werben. |
| **Einwände / Missverständnisse** | „Pilot pro Standort“ klingt teuer – Alternativen (Template-Rollout). |
| **Beispiele / Grenzen** | Gleiche Kategorien, andere Telefonnummer pro Store. |
| **Rohmaterial (Stichpunkte)** | Wachstums-Pfad; gleiche Kernprozesse laut Home „skalieren“. |
| **Ausbaupriorität später** | **reicht fast** – leicht mit Pricing verzahnen. |

---

### FAQ-24 – Wie messe ich den Erfolg nach dem Start?

**Live-Antwort:** Typische Kennzahlen sind Reaktionszeit, Anteil automatisch vorsortierter Fälle, Zahl kritischer Eskalationen und Zeitersparnis im Support.

| Dimension | Rohkontext |
| --- | --- |
| **Leserintention** | Wie bekomme ich diese Zahlen aus dem System? |
| **Betriebssituation** | CFO will ROI; Ops will MTTR. |
| **Lücken der Kurzantwort** | Rechner auf Pricing-Seite (`calculator` Copy) als Hook. |
| **Einwände / Missverständnisse** | KPIs ohne Baseline-Messung – Pilot-Week-0 empfehlen. |
| **Beispiele / Grenzen** | Vorher/Nachher Telefonminuten; „geretteter Umsatz“ Narrative. |
| **Rohmaterial (Stichpunkte)** | KPI-Liste ist stark; Ergänzung: Messmethode + Review-Zyklus (FAQ-13). |
| **Ausbaupriorität später** | **muss länger werden** um **messbar** zu wirken. |

---

### FAQ-25 – Kann ich bestehende Prozesse weiter nutzen?

**Live-Antwort:** Ja. Bestehende Ticket- und E-Mail-Prozesse können weiter genutzt werden.

| Dimension | Rohkontext |
| --- | --- |
| **Leserintention** | Change Management minimieren. |
| **Betriebssituation** | Team gewohnt an Outlook/Jira. |
| **Lücken der Kurzantwort** | Doppelpunkt zu FAQ-15 – nahezu redundant. |
| **Einwände / Missverständnisse** | „Weiternutzen“ = Eingang ersetzen, nicht kompletten Prozess. |
| **Beispiele / Grenzen** | OUTAG3 als **Front-Desk-Schicht** vor bestehendem Tool. |
| **Rohmaterial (Stichpunkte)** | Gleiche Story wie FAQ-15 in Kürze; Konsolidierung erwägen. |
| **Ausbaupriorität später** | **evtl. mit FAQ-15 zusammenlegen** oder **ein Satz + Verweis**. |

---

#### Block-E-Verdichtung

- **Dopplungen:** FAQ-20/8/9; FAQ-21/24; FAQ-25/15.
- **Neue FAQ-Ideen:** „Was passiert bei Totalausfall Voice?“ / „Gibt es SLAs?“ (Enterprise)
- **Block-Priorität:** Hoch für Ops- und Wachstums-ICP.

---

## 7) Basis für spätere Langfassungen (redaktionelle Leitlinien)

### Ton & Zielgruppen

- **Primär:** Automatenladen-Betreiber, oft ohne großes IT-Team → einfache Sprache, konkrete Beispiele.
- **Sekundär:** Ops/Office, ggf. Einkauf/Legal → eigene kurze Unterabschnitte oder Verweise auf Datenschutz/Integration.

### Struktur-Vorlage pro FAQ (für `de.json`-Antworten)

1. **Kurzantwort** (1–2 Sätze, wie heute).  
2. **Typischer Ablauf** (3–5 Stichpunkte, optional).  
3. **Was ihr konfigurieren könnt** (Regeln, Kanäle, Eskalation).  
4. **Was bei euch im Laden bleibt** (Entscheidung, Kundenkommunikation).  
5. **Nächster Schritt** (Demo/Pilot) – nur bei passenden FAQs.

### SEO / GEO-Hinweise

- Natürliche Long-Tail-Varianten: „Beschwerde Automat“, „Erstattung Automat“, „Kartenleser defekt Automatenladen“.
- Schema.org FAQPage bleibt konsistent mit sichtbarem Text auf der Seite (keine Hidden-Claims).

### Rechtliches (DSGVO-Block)

- Keine absoluten Compliance-Garantien ohne Legal-Review.
- Konkrete Subprozessoren und Regionen nur aus freigegebener Datenschutzerklärung übernehmen.
- FAQ-14 klar als **Website-Demo-Lead** labeln, nicht als Beschwerde-Feature.

### Konsolidierungskandidaten (vor dem Schreiben der Langtexte)

| Kandidaten | Vorschlag |
| --- | --- |
| FAQ-9 + FAQ-10 | Eintrag „Regeln, Kategorien & Priorität“ oder starke Abgrenzung |
| FAQ-15 + FAQ-25 | Ein Integration-/Prozess-Eintrag mit Zwei-Zeilen-„schnell E-Mail, tief Webhook“ |
| FAQ-12 + FAQ-13 + FAQ-26 | Optional „Go-Live“-Master-FAQ mit Unterüberschriften |
| FAQ-14 | Umbenennen oder in separates Sales-FAQ verschieben |

---

## 8) Abgleich mit verwandten Site-Inhalten (für Copy-Iteration)

- **Home / Nutzenversprechen:** 24/7, Triage, Alarm in Stoßzeiten, Erstattungslisten, 5-Schritte-Flow.  
- **Voice-Demo:** Erwartung &lt; 2 Min, Klassifikation, Ticket-Vorbereitung.  
- **Ticket-Preview:** Impact-Labels und vier Szenario-Chips.  
- **Preise:** Standorte, Voice-Minuten, SMS-Eskalation, Dashboard/Historie, Setup-Fees.  
- **Demo-Formular:** Spam-Schutz (Honeypot, Rate-Limit).  

Diese Artefakte sollten in den **Langfassungen** dort eingehängt werden, wo sie glaubwürdig und plankonform sind.

---

## 9) Nächste Schritte (nach dieser Rohsammlung)

1. Intern: Plan- und Produktwahrheit für FAQ-14, 19–22 klären (was ist in welchem Tarif wirklich drin).  
2. Legal: DSGVO-Formulierungen und Verarbeitungsorte mit Datenschutzseite synchronisieren.  
3. Redaktion: Konsolidierungskandidaten entscheiden, dann `faq.items` in `de.json` / `en.json` iterativ verlängern.  
4. QA: FAQ-Seite im Browser prüfen (Accordion-Länge, Mobile Lesbarkeit).

---

*Ende der Kontextsammlung.*
