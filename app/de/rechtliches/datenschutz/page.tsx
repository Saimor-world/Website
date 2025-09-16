export const metadata = { title: 'Datenschutz – Saimôr' };

export default function Page() {
  return (
    <main className="section">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-[28px] md:text-[34px] font-medium mb-8">Datenschutz</h1>

        {/* Poetic Introduction */}
        <div className="mb-12 p-6 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl border border-yellow-200">
          <blockquote className="font-serif text-xl italic text-slate-700 leading-relaxed" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            &ldquo;Klarheit braucht Vertrauen. Vertrauen braucht Transparenz.
            Transparenz über das, was wir sammeln, warum wir es tun und wie wir es schützen.&rdquo;
          </blockquote>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Verantwortlicher</h2>
          <p className="mb-6 text-slate-700">
            Saimôr<br />
            [Adresse wird bei Unternehmensregistrierung ergänzt]<br />
            E-Mail: contact@saimor.world
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Hosting & Infrastruktur</h2>
          <p className="mb-6 text-slate-700">
            Diese Website wird gehostet von <strong>Vercel Inc.</strong> (USA).
            Vercel verarbeitet technische Daten wie IP-Adressen und Zugriffszeiten zur Bereitstellung der Website.
            Weitere Informationen finden Sie in der <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline">Datenschutzerklärung von Vercel</a>.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Analyse & Statistiken</h2>
          <p className="mb-6 text-slate-700">
            Wir verwenden <strong>Matomo</strong> (self-hosted, anonymisiert) für Website-Analysen.
            Dabei werden keine personenbezogenen Profile erstellt, sondern nur aggregierte Statistiken zur Verbesserung unserer Website erfasst.
            IP-Adressen werden anonymisiert und Cookies werden nicht für Tracking verwendet.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Kontaktformular & Buchungen</h2>
          <p className="mb-6 text-slate-700">
            Bei der Nutzung unseres Kontaktformulars oder bei Buchungen über Cal.com werden die von Ihnen eingegebenen Daten
            (Name, E-Mail-Adresse, Nachricht) ausschließlich zur Bearbeitung Ihrer Anfrage verwendet und nicht an Dritte weitergegeben.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Externe Dienste</h2>
          <ul className="mb-6 text-slate-700 list-disc pl-6">
            <li><strong>Cal.com:</strong> Für Terminbuchungen. <a href="https://cal.com/privacy" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline">Datenschutzerklärung von Cal.com</a></li>
            <li><strong>Fonts:</strong> Alle Schriftarten werden lokal gehostet, es erfolgt keine Verbindung zu Google Fonts oder anderen externen Diensten.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Ihre Rechte (DSGVO)</h2>
          <p className="mb-4 text-slate-700">Sie haben das Recht auf:</p>
          <ul className="mb-6 text-slate-700 list-disc pl-6">
            <li>Auskunft über die Verarbeitung Ihrer personenbezogenen Daten</li>
            <li>Berichtigung unrichtiger Daten</li>
            <li>Löschung Ihrer Daten</li>
            <li>Einschränkung der Verarbeitung</li>
            <li>Datenübertragbarkeit</li>
            <li>Widerspruch gegen die Verarbeitung</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Kontakt</h2>
          <p className="mb-6 text-slate-700">
            Bei Fragen zum Datenschutz oder zur Ausübung Ihrer Rechte wenden Sie sich bitte an:
            <strong> contact@saimor.world</strong>
          </p>

          <div className="mt-8 p-4 bg-slate-100 rounded-xl">
            <p className="text-sm text-slate-600">
              Stand: September 2024 | Diese Datenschutzerklärung wird regelmäßig überprüft und bei Bedarf aktualisiert.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
