import FinanceSection from '@/components/FinanceSection';

export const metadata = {
  title: 'Saimôr Finance – Finanzen klar im Blick',
  description: 'Einnahmen, Ausgaben und Kontostände an einem Ort – auch mit XRP/RLUSD-Zahlungen.',
  alternates: { canonical: '/de/finance', languages: { de: '/de/finance', en: '/en/finance' } },
};

export default function FinancePageDE() {
  return (
    <div className="min-h-screen bg-[#081410] text-white pt-32 pb-24 selection:bg-emerald-500/30">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-cyan-900/10 blur-[150px] rounded-full" />
      </div>
      <main className="relative z-10 max-w-4xl mx-auto px-6">
        <FinanceSection locale="de" />
      </main>
    </div>
  );
}
