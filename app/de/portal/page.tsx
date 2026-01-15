import dynamic from 'next/dynamic';

const PortalContent = dynamic(() => import('@/components/PortalContent'), { ssr: false });

export const metadata = {
  title: 'Saimôr Portal – Sicherer Zugang (Demo)',
  description: 'UI Shell für das kommende Kundenportal – aktuell als Demo mit geführten Bereichen und Dashboard-Vorschau.'
};

export default function PortalPageDe() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#081410] via-[#0a1612] to-[#081410] text-white">
      <div className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle at 70% 25%, rgba(212,168,87,0.15), transparent 50%)' }} />
        
        <PortalContent locale="de" />
      </div>
    </div>
  );
}
