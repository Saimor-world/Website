export const metadata = { title: 'AGB – Saimôr' };

export default function Page() {
  return (
    <main className="section">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-[28px] md:text-[34px] font-medium mb-8">Allgemeine Geschäftsbedingungen</h1>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800">1. Geltungsbereich &amp; Anbieter</h2>
          <p className="mb-6 text-slate-700">
            Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für die Nutzung der Software und Dienste von
            Saimôr (nachfolgend „SAIMÔR"), erreichbar über saimor.world und zugehörige Subdomains. Anbieter ist
            Saimôr, Kontakt: contact@saimor.world. Die vollständigen Anbieterangaben finden Sie im{' '}
            <a href="/de/rechtliches/impressum" className="text-yellow-600 hover:underline">Impressum</a>.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">2. Leistungsbeschreibung</h2>
          <p className="mb-6 text-slate-700">
            SAIMÔR stellt ein semantisches Betriebssystem sowie zugehörige Dienste (u. a. Security-Check,
            Arbeitsbereich/OS, Môra) bereit. Der Funktionsumfang befindet sich in aktiver Entwicklung
            (Early Access) und kann sich weiterentwickeln. Eine bestimmte Beschaffenheit oder ununterbrochene
            Verfügbarkeit wird nur zugesichert, soweit dies ausdrücklich vereinbart ist.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">3. Vertragsschluss &amp; Konto</h2>
          <p className="mb-6 text-slate-700">
            Ein Nutzungsvertrag kommt durch Registrierung eines Kontos bzw. Abschluss eines kostenpflichtigen
            Tarifs zustande. Sie sind für die Vertraulichkeit Ihrer Zugangsdaten verantwortlich. Ein aus einem
            Security-Check entstehender befristeter Trial-Arbeitsbereich stellt noch kein dauerhaftes Konto dar
            (siehe <a href="/de/rechtliches/datenschutz" className="text-yellow-600 hover:underline">Datenschutz</a>).
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">4. Preise &amp; Zahlungsabwicklung</h2>
          <p className="mb-6 text-slate-700">
            Kostenpflichtige Tarife werden zu den bei Vertragsschluss angezeigten Preisen abgerechnet. Die
            Zahlungsabwicklung erfolgt über unseren Reseller und Merchant of Record (Paddle.com), der als
            Verkäufer gegenüber dem Kunden auftritt, die Rechnungsstellung übernimmt und die jeweils geltende
            Umsatzsteuer ausweist. Es gelten ergänzend die Bedingungen des Zahlungsdienstleisters.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">5. Laufzeit &amp; Kündigung</h2>
          <p className="mb-6 text-slate-700">
            Abonnements laufen für den jeweils gewählten Zeitraum und können jederzeit zum Ende der laufenden
            Abrechnungsperiode gekündigt werden, sofern nicht anders vereinbart. Einzelheiten zu Widerruf und
            Erstattung finden Sie in unserer{' '}
            <a href="/de/rechtliches/widerruf" className="text-yellow-600 hover:underline">Widerrufs- &amp; Erstattungsrichtlinie</a>.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">6. Pflichten der Nutzer</h2>
          <p className="mb-6 text-slate-700">
            Die Dienste dürfen nicht rechtswidrig, missbräuchlich oder in einer Weise genutzt werden, die den
            Betrieb, die Sicherheit oder andere Nutzer beeinträchtigt. Eingegebene Inhalte müssen frei von
            Rechten Dritter sein.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">7. Verfügbarkeit &amp; Haftung</h2>
          <p className="mb-6 text-slate-700">
            SAIMÔR haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie nach den zwingenden
            gesetzlichen Vorschriften. Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten ist die
            Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt. Im Übrigen ist die Haftung
            ausgeschlossen. Für den Early-Access-Charakter der Dienste wird keine Gewähr für bestimmte Ergebnisse
            übernommen.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">8. Datenschutz</h2>
          <p className="mb-6 text-slate-700">
            Informationen zur Verarbeitung personenbezogener Daten finden Sie in unserer{' '}
            <a href="/de/rechtliches/datenschutz" className="text-yellow-600 hover:underline">Datenschutzerklärung</a>.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">9. Schlussbestimmungen</h2>
          <p className="mb-6 text-slate-700">
            Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts, soweit dem keine
            zwingenden Verbraucherschutzvorschriften entgegenstehen. Sollten einzelne Bestimmungen unwirksam sein,
            bleibt die Wirksamkeit der übrigen unberührt.
          </p>

          <div className="mt-8 p-4 bg-slate-100 rounded-xl">
            <p className="text-sm text-slate-600">Stand: Juli 2026</p>
          </div>
        </div>
      </div>
    </main>
  );
}
