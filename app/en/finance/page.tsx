import FinanceSection from '@/components/FinanceSection';

// Pure static marketing page: no env, DB or session reads at build or request time.
export const dynamic = 'force-static';

export const metadata = {
  title: 'Saimôr Finance – Your finances, clearly in view',
  description: 'Income, expenses and account balances in one place – including XRP/RLUSD payments.',
  alternates: { canonical: '/en/finance', languages: { de: '/de/finance', en: '/en/finance' } },
};

export default function FinancePageEN() {
  return (
    <div className="min-h-screen bg-[#081410] text-white pt-32 pb-24 selection:bg-emerald-500/30">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-cyan-900/10 blur-[150px] rounded-full" />
      </div>
      <main className="relative z-10 max-w-4xl mx-auto px-6">
        <FinanceSection locale="en" />
      </main>
    </div>
  );
}
