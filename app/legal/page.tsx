import { Metadata } from 'next';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Impressum & Datenschutz â€“ SaimÃ´r',
  description: 'Rechtliche Informationen â€“ Vorabversion',
};

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold" style={{ color: '#4A6741' }}>
            SaimÃ´r
          </Link>
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
            â† ZurÃ¼ck zur Startseite
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Warning Banner */}
        <div
          className="mb-8 p-6 rounded-2xl border-2 flex items-start gap-4"
          style={{
            background: 'linear-gradient(135deg, rgba(212, 180, 131, 0.1) 0%, rgba(212, 180, 131, 0.05) 100%)',
            borderColor: '#D4A857'
          }}
        >
          <AlertCircle className="w-6 h-6 text-[#D4A857] flex-shrink-0 mt-0.5" />
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">Vorabversion â€“ Juristische Finalisierung folgt</h2>
            <p className="text-gray-700">
              Diese Seite befindet sich in Bearbeitung. Die rechtlich verbindlichen Dokumente (Impressum, DatenschutzerklÃ¤rung)
              werden vor dem offiziellen Launch finalisiert und durch einen Rechtsanwalt geprÃ¼ft.
            </p>
          </div>
        </div>

        {/* Title */}
        <div className="mb-12">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              background: 'linear-gradient(135deg, #4A6741 0%, #D4A857 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Impressum & Datenschutz
          </h1>
        </div>

        {/* Sections */}
        <div className="prose prose-lg max-w-none">
          {/* Impressum */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Impressum</h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <p className="text-gray-700 mb-4">
                <strong>Angaben gemÃ¤ÃŸ Â§ 5 TMG:</strong>
              </p>
              <p className="text-gray-700 mb-2">
                SaimÃ´r<br />
                [Firmenname wird ergÃ¤nzt]<br />
                [Adresse wird ergÃ¤nzt]<br />
                Deutschland
              </p>
              <p className="text-gray-700 mt-4 mb-2">
                <strong>Vertreten durch:</strong><br />
                [GeschÃ¤ftsfÃ¼hrer wird ergÃ¤nzt]
              </p>
              <p className="text-gray-700 mt-4 mb-2">
                <strong>Kontakt:</strong><br />
                E-Mail: [wird ergÃ¤nzt]<br />
                Telefon: [wird ergÃ¤nzt]
              </p>
              <p className="text-gray-700 mt-4 mb-2">
                <strong>Registereintrag:</strong><br />
                [Handelsregister wird ergÃ¤nzt]<br />
                [Registernummer wird ergÃ¤nzt]
              </p>
              <p className="text-gray-700 mt-4">
                <strong>Umsatzsteuer-ID:</strong><br />
                [USt-IdNr. wird ergÃ¤nzt gemÃ¤ÃŸ Â§27 a Umsatzsteuergesetz]
              </p>
            </div>
          </section>

          {/* Datenschutz */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">DatenschutzerklÃ¤rung</h2>

            <div className="space-y-6">
              {/* Allgemeines */}
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">1. Allgemeines</h3>
                <p className="text-gray-700 mb-3">
                  Wir nehmen den Schutz Ihrer persÃ¶nlichen Daten sehr ernst und behandeln Ihre personenbezogenen Daten
                  vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser DatenschutzerklÃ¤rung.
                </p>
                <p className="text-gray-700">
                  Diese DatenschutzerklÃ¤rung gilt fÃ¼r die Website saimor.world und beschreibt,
                  welche Daten wir erheben und wie wir sie verwenden.
                </p>
              </div>

              {/* Verantwortlicher */}
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">2. Verantwortlicher</h3>
                <p className="text-gray-700">
                  Verantwortlich fÃ¼r die Datenverarbeitung auf dieser Website ist:<br />
                  [Angaben wie in Impressum]
                </p>
              </div>

              {/* Datenerfassung */}
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">3. Datenerfassung auf dieser Website</h3>

                <h4 className="font-bold text-gray-900 mb-2 mt-4">Cookies</h4>
                <p className="text-gray-700 mb-3">
                  Diese Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem EndgerÃ¤t gespeichert werden.
                  Wir nutzen Cookies zur Verbesserung der Nutzererfahrung. Sie kÃ¶nnen Ihren Browser so einstellen,
                  dass Sie Ã¼ber das Setzen von Cookies informiert werden.
                </p>

                <h4 className="font-bold text-gray-900 mb-2 mt-4">Server-Log-Dateien</h4>
                <p className="text-gray-700 mb-3">
                  Der Provider der Seiten (Vercel) erhebt und speichert automatisch Informationen in Server-Log-Dateien:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
                  <li>Browsertyp und -version</li>
                  <li>Verwendetes Betriebssystem</li>
                  <li>Referrer URL</li>
                  <li>Hostname des zugreifenden Rechners</li>
                  <li>Uhrzeit der Serveranfrage</li>
                  <li>IP-Adresse</li>
                </ul>
                <p className="text-gray-700">
                  Diese Daten werden nicht mit anderen Datenquellen zusammengefÃ¼hrt.
                  Die Speicherung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
                </p>

                <h4 className="font-bold text-gray-900 mb-2 mt-4">Kontaktformular & Warteliste</h4>
                <p className="text-gray-700">
                  Wenn Sie uns per Kontaktformular oder Warteliste Anfragen zukommen lassen,
                  werden Ihre Angaben (Name, E-Mail-Adresse) zur Bearbeitung der Anfrage und fÃ¼r den Fall von Anschlussfragen
                  bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                </p>
              </div>

              {/* Ihre Rechte */}
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">4. Ihre Rechte</h3>
                <p className="text-gray-700 mb-3">
                  Sie haben jederzeit das Recht auf:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Auskunft Ã¼ber Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
                  <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
                  <li>LÃ¶schung Ihrer Daten (Art. 17 DSGVO)</li>
                  <li>EinschrÃ¤nkung der Verarbeitung (Art. 18 DSGVO)</li>
                  <li>DatenÃ¼bertragbarkeit (Art. 20 DSGVO)</li>
                  <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
                  <li>Beschwerde bei einer AufsichtsbehÃ¶rde (Art. 77 DSGVO)</li>
                </ul>
              </div>

              {/* Drittanbieter */}
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">5. Drittanbieter-Dienste</h3>

                <h4 className="font-bold text-gray-900 mb-2">Vercel (Hosting)</h4>
                <p className="text-gray-700 mb-4">
                  Diese Website wird auf Servern von Vercel Inc. (USA) gehostet.
                  Vercel ist EU-US Data Privacy Framework zertifiziert.
                  Weitere Informationen: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener" className="text-[#4A6741] underline">Vercel Privacy Policy</a>
                </p>

                <h4 className="font-bold text-gray-900 mb-2">Cal.com (Buchungstool)</h4>
                <p className="text-gray-700">
                  FÃ¼r Terminbuchungen nutzen wir Cal.com. Wenn Sie einen Termin buchen,
                  werden Ihre Daten (Name, E-Mail) an Cal.com Ã¼bertragen.
                  Weitere Informationen: <a href="https://cal.com/privacy" target="_blank" rel="noopener" className="text-[#4A6741] underline">Cal.com Privacy</a>
                </p>
              </div>
            </div>
          </section>

          {/* Haftungsausschluss */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Haftungsausschluss</h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-gray-700">
              <h3 className="font-bold mb-2">Haftung fÃ¼r Inhalte</h3>
              <p className="mb-4">
                Die Inhalte unserer Seiten wurden mit grÃ¶ÃŸter Sorgfalt erstellt.
                FÃ¼r die Richtigkeit, VollstÃ¤ndigkeit und AktualitÃ¤t der Inhalte kÃ¶nnen wir jedoch keine GewÃ¤hr Ã¼bernehmen.
              </p>

              <h3 className="font-bold mb-2">Haftung fÃ¼r Links</h3>
              <p>
                Unsere Website enthÃ¤lt Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
                Deshalb kÃ¶nnen wir fÃ¼r diese fremden Inhalte auch keine GewÃ¤hr Ã¼bernehmen.
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            Stand: November 2025 (Vorabversion)<br />
            Letzte Aktualisierung folgt vor offiziellem Launch
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block px-8 py-4 rounded-xl font-semibold text-white transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #4A6741 0%, #5D7C54 100%)',
              boxShadow: '0 8px 24px rgba(74, 103, 65, 0.3)'
            }}
          >
            Zur Startseite
          </Link>
        </div>
      </main>
    </div>
  );
}
