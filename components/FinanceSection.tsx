/**
 * Public marketing copy for Saimôr Finance as part of SAIMÔR.
 * No real figures, addresses, balances or positions. No investing/trading wording.
 */
type Locale = 'de' | 'en';

const COPY = {
  de: {
    eyebrow: 'Saimôr Finance',
    title: 'Finanzen klar im Blick.',
    lead: 'Saimôr Finance ist der Finanzbereich im Saimôr-System: Einnahmen, Ausgaben und Kontostände an einem Ort – nachvollziehbar und mit Beleg.',
    points: [
      { h: 'Ein Bild statt vieler Tabellen', p: 'Einnahmen, Ausgaben und Konten erscheinen gemeinsam, mit Datum und Herkunft jeder Zahl.' },
      { h: 'Auch mit XRP/RLUSD-Zahlungen', p: 'Zahlungen über das XRP Ledger, etwa in XRP oder RLUSD, laufen neben klassischen Konten in dieselbe Übersicht.' },
      { h: 'Nur lesen, nichts auslösen', p: 'Saimôr Finance zeigt an. Zahlungen und Freigaben bleiben bei Ihnen und Ihrer Bank.' },
      { h: 'Teil des Systems', p: 'MÔRA kennt den Finanzkontext und kann ihn in Gesprächen und Berichten nutzen – ohne Daten weiterzugeben.' },
    ],
    note: 'Saimôr Finance ist Teil von Saimôr OS. Beispiele ohne echte Zahlen.',
  },
  en: {
    eyebrow: 'Saimôr Finance',
    title: 'Your finances, clearly in view.',
    lead: 'Saimôr Finance is the finance area of the Saimôr system: income, expenses and account balances in one place – traceable and backed by evidence.',
    points: [
      { h: 'One picture instead of many sheets', p: 'Income, expenses and accounts appear together, with the date and source of every figure.' },
      { h: 'Including XRP/RLUSD payments', p: 'Payments over the XRP Ledger, such as XRP or RLUSD, flow into the same overview as classic accounts.' },
      { h: 'Read-only, nothing triggered', p: 'Saimôr Finance shows. Payments and approvals stay with you and your bank.' },
      { h: 'Part of the system', p: 'MÔRA knows the finance context and can use it in conversations and reports – without sharing data.' },
    ],
    note: 'Saimôr Finance is part of Saimôr OS. Examples without real figures.',
  },
} as const;

export default function FinanceSection({ locale = 'de' }: { locale?: Locale }) {
  const c = COPY[locale];
  return (
    <section id="finance" className="relative" aria-labelledby="finance-title">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-200/70">{c.eyebrow}</div>
      <h1 id="finance-title" className="mt-4 font-serif text-4xl font-light tracking-tight text-[#f5f3e9] md:text-6xl">{c.title}</h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70">{c.lead}</p>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {c.points.map((pt) => (
          <div key={pt.h} className="border border-emerald-200/10 bg-emerald-950/20 p-6">
            <h2 className="font-serif text-xl font-light text-[#f5f3e9]">{pt.h}</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/60">{pt.p}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">{c.note}</p>
    </section>
  );
}
