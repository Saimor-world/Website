export const metadata = { title: 'Widerruf & Erstattung – Saimôr' };

export default function Page() {
  return (
    <main className="section">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-[28px] md:text-[34px] font-medium mb-8">Widerruf &amp; Erstattung</h1>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Widerrufsrecht für Verbraucher</h2>
          <p className="mb-6 text-slate-700">
            Verbraucher haben das Recht, einen Vertrag über digitale Dienste innerhalb von 14 Tagen ohne Angabe
            von Gründen zu widerrufen. Die Frist beginnt mit Vertragsschluss. Zur Ausübung genügt eine eindeutige
            Erklärung (z. B. per E-Mail an contact@saimor.world).
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Vorzeitige Ausführung digitaler Inhalte</h2>
          <p className="mb-6 text-slate-700">
            Beginnen wir mit Ihrer ausdrücklichen Zustimmung vor Ablauf der Widerrufsfrist mit der Ausführung des
            digitalen Dienstes und bestätigen Sie zugleich Ihre Kenntnis vom Erlöschen des Widerrufsrechts bei
            vollständiger Vertragserfüllung, erlischt das Widerrufsrecht entsprechend den gesetzlichen Vorgaben.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Kündigung &amp; Erstattung</h2>
          <p className="mb-6 text-slate-700">
            Abonnements können jederzeit zum Ende der laufenden Abrechnungsperiode gekündigt werden; der Zugang
            bleibt bis dahin bestehen. Bereits gezahlte Entgelte für eine laufende Periode werden grundsätzlich
            nicht anteilig erstattet, soweit nicht zwingende gesetzliche Rechte (z. B. das Widerrufsrecht) oder
            eine ausdrückliche Zusage etwas anderes vorsehen.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Zahlungsabwicklung &amp; Rechnungen</h2>
          <p className="mb-6 text-slate-700">
            Zahlungen und Rechnungen werden über unseren Merchant of Record (Paddle.com) abgewickelt. Erstattungen
            erfolgen über denselben Weg und dieselbe Zahlungsmethode. Anfragen zu Rechnungen oder Erstattungen
            richten Sie bitte an contact@saimor.world.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Kontakt</h2>
          <p className="mb-6 text-slate-700">
            Für Widerruf, Kündigung oder Erstattung: <strong>contact@saimor.world</strong>. Weitere Bedingungen
            finden Sie in unseren{' '}
            <a href="/de/rechtliches/agb" className="text-yellow-600 hover:underline">AGB</a>.
          </p>

          <div className="mt-8 p-4 bg-slate-100 rounded-xl">
            <p className="text-sm text-slate-600">Stand: Juli 2026</p>
          </div>
        </div>
      </div>
    </main>
  );
}
