export const metadata = { title: 'Impressum – Saimôr' };

export default function Page() {
  return (
    <main className="section">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-[28px] md:text-[34px] font-medium mb-8">Impressum</h1>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Angaben gemäß § 5 TMG</h2>
          <div className="mb-8 p-6 bg-slate-50 rounded-xl">
            <p className="text-slate-700 mb-2">
              <strong>Saimôr</strong><br />
              [Unternehmensform wird bei Registrierung ergänzt]<br />
              [Adresse wird bei Unternehmensregistrierung ergänzt]
            </p>
            <p className="text-slate-700">
              <strong>Kontakt:</strong><br />
              E-Mail: contact@saimor.world
            </p>
          </div>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p className="mb-8 text-slate-700">
            [Name der verantwortlichen Person wird ergänzt]<br />
            [Adresse wie oben]
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">EU-Streitschlichtung</h2>
          <p className="mb-6 text-slate-700">
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline ml-1">
              https://ec.europa.eu/consumers/odr/
            </a>
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Verbraucherstreitbeilegung</h2>
          <p className="mb-8 text-slate-700">
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Haftungsausschluss</h2>

          <h3 className="text-xl font-semibold mb-3 text-slate-800">Inhalt</h3>
          <p className="mb-6 text-slate-700">
            Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit
            und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-slate-800">Links</h3>
          <p className="mb-6 text-slate-700">
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
            Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-slate-800">Urheberrecht</h3>
          <p className="mb-8 text-slate-700">
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.
            Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
            bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>

          <div className="mt-8 p-4 bg-slate-100 rounded-xl">
            <p className="text-sm text-slate-600">
              Stand: September 2024 | Dieses Impressum wird bei Unternehmensregistrierung vervollständigt.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
