import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Datenschutzerklärung",
  description:
    "Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.",
  path: "/legal/datenschutz",
});

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
        {title}
      </p>
      <div className="space-y-3 text-sm leading-relaxed text-zinc-300">
        {children}
      </div>
    </div>
  );
}

export default function DatenschutzPage() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto w-full max-w-2xl px-5 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-400">
            Rechtliches
          </p>
          <h1 className="text-3xl font-semibold text-white">
            Datenschutzerklärung
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Informationen gemäß Art. 13, 14 DSGVO
          </p>
        </div>

        <div
          className="space-y-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-6 text-sm leading-relaxed backdrop-blur-2xl"
          style={{ WebkitBackdropFilter: "blur(24px)" }}
        >
          {/* 1. Verantwortlicher */}
          <Block title="1. Verantwortlicher">
            <p>
              Verantwortlich für die Verarbeitung personenbezogener Daten auf
              dieser Website ist:
            </p>
            <p className="text-zinc-200">
              {siteConfig.legalName}
              <br />
              Beethovenweg 14
              <br />
              97638 Mellrichstadt
              <br />
              Deutschland
            </p>
            <p>
              Telefon:{" "}
              <a
                href={`tel:${siteConfig.phoneTel}`}
                className="text-brand-400 transition-colors hover:text-brand-300"
              >
                {siteConfig.phoneDisplay}
              </a>
              <br />
              E-Mail:{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-brand-400 transition-colors hover:text-brand-300"
              >
                {siteConfig.email}
              </a>
            </p>
          </Block>

          {/* 2. Hosting */}
          <Block title="2. Hosting und Betrieb der Website">
            <p>
              Diese Website wird über den Dienst{" "}
              <strong className="text-zinc-200">Vercel Inc.</strong> (340 Pine
              Street, Suite 701, San Francisco, CA 94104, USA) betrieben. Beim
              Aufruf der Website werden automatisch Verbindungsdaten
              verarbeitet, darunter IP-Adresse, Browsertyp, Betriebssystem,
              Referrer-URL sowie Datum und Uhrzeit des Abrufs.
            </p>
            <p>
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
              Interesse am sicheren und stabilen Betrieb der Website). Vercel
              ist nach dem EU-US Data Privacy Framework zertifiziert. Weitere
              Informationen finden Sie unter{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-400 transition-colors hover:text-brand-300"
              >
                vercel.com/legal/privacy-policy
              </a>
              .
            </p>
          </Block>

          {/* 3. Demo-Anfragen */}
          <Block title="3. Demo-Anfragen (Kontaktformular)">
            <p>
              Wenn Sie über das Demo-Formular eine Anfrage stellen, verarbeiten
              wir folgende Daten:
            </p>
            <ul className="list-inside list-disc space-y-1 text-zinc-300">
              <li>Vor- und Nachname</li>
              <li>Firmenname</li>
              <li>E-Mail-Adresse</li>
              <li>Telefonnummer (optional)</li>
              <li>Branche (Vertical)</li>
              <li>Freitext-Nachricht (optional)</li>
            </ul>
            <p>
              Die Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage und
              zur Kontaktaufnahme verwendet. Eine Weitergabe an Dritte findet
              nicht statt. Die Verarbeitung erfolgt auf Grundlage von Art. 6
              Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) sowie Art. 6
              Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung
              von Anfragen).
            </p>
            <p>
              Eingehende Anfragen werden über unsere interne
              Automatisierungsinfrastruktur (n8n, betrieben auf eigenen
              Servern) weitergeleitet und dort gespeichert. Eine Speicherung
              auf externen Drittdiensten findet nicht statt.
            </p>
          </Block>

          {/* 4. KI-gestützte Sprachverarbeitung */}
          <Block title="4. KI-gestützte Sprachverarbeitung (Voice-Demo)">
            <p>
              Für die interaktive Voice-Demo auf dieser Website wird der Dienst{" "}
              <strong className="text-zinc-200">Ultravox</strong> (Fixie.ai,
              Inc., USA) eingesetzt. Dabei wird eine Audioverbindung zwischen
              Ihrem Browser und dem Dienst aufgebaut.
            </p>
            <p>
              Im Rahmen der Demo werden Sprachdaten zur Verarbeitung
              übermittelt. Diese Verarbeitung dient ausschließlich dem Betrieb
              der Demo. Eine dauerhafte Speicherung oder Verwendung für
              Trainingszwecke durch Ultravox ist vertraglich ausgeschlossen.
            </p>
            <p>
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
              Die Demo ist ein optionales Feature; Sie können die Website
              vollständig ohne Nutzung der Voice-Demo verwenden. Weitere
              Informationen:{" "}
              <a
                href="https://ultravox.ai/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-400 transition-colors hover:text-brand-300"
              >
                ultravox.ai/privacy
              </a>
              .
            </p>
          </Block>

          {/* 5. Cookies */}
          <Block title="5. Cookies und lokale Speicherung">
            <p>
              Diese Website setzt standardmäßig nur technisch notwendige
              Browserfunktionen ein. Optionale Analyse-Cookies werden erst nach
              ausdrücklicher Einwilligung über das Cookie-Banner aktiviert.
            </p>
            <p>
              Wenn Sie nur notwendige Cookies auswählen, werden optionale
              Analyse-Cookies nicht gesetzt bzw. bereits gesetzte nicht
              notwendige Cookies nach Möglichkeit entfernt.
            </p>
          </Block>

          {/* 6. Rechte */}
          <Block title="6. Ihre Rechte">
            <p>
              Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie
              betreffenden personenbezogenen Daten:
            </p>
            <ul className="list-inside list-disc space-y-1 text-zinc-300">
              <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
              <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
              <li>Recht auf Löschung (Art. 17 DSGVO)</li>
              <li>
                Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)
              </li>
              <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>
                Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)
              </li>
            </ul>
            <p>
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte per E-Mail an{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-brand-400 transition-colors hover:text-brand-300"
              >
                {siteConfig.email}
              </a>
              .
            </p>
            <p>
              Sie haben zudem das Recht, sich bei der zuständigen
              Datenschutzaufsichtsbehörde zu beschweren. Für Bayern ist dies
              das{" "}
              <strong className="text-zinc-200">
                Bayerische Landesamt für Datenschutzaufsicht (BayLDA)
              </strong>
              , Promenade 18, 91522 Ansbach,{" "}
              <a
                href="https://www.lda.bayern.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-400 transition-colors hover:text-brand-300"
              >
                www.lda.bayern.de
              </a>
              .
            </p>
          </Block>

          {/* 7. Änderungen */}
          <Block title="7. Aktualität dieser Erklärung">
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf
              anzupassen, um sie an geänderte Rechtslagen oder Änderungen
              unserer Dienste anzupassen. Die jeweils aktuelle Version ist
              stets unter{" "}
              <a
                href="/legal/datenschutz"
                className="text-brand-400 transition-colors hover:text-brand-300"
              >
                dieser Adresse
              </a>{" "}
              abrufbar.
            </p>
            <p className="text-xs text-zinc-500">Stand: März 2026</p>
          </Block>
        </div>
      </div>
    </section>
  );
}
