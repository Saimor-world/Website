import dynamic from 'next/dynamic';

const TrustContent = dynamic(() => import('@/components/TrustContent'), { ssr: false });

export const metadata = {
  title: 'Trust & Sicherheit – Saimôr',
  description: 'Unsere Standards für Datenschutz, Sicherheit und Transparenz. EU-Hosting und DSGVO-Konformität.',
};

export default function TrustPageDE() {
  return (
    <div className="min-h-screen bg-[#081410] text-white pt-32 pb-24 selection:bg-emerald-500/30">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-cyan-900/10 blur-[150px] rounded-full" />
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-6">
        <TrustContent />
      </main>
    </div>
  );
}
