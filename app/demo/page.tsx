import DemoContent from '@/components/DemoContent';
import { Suspense } from 'react';

export const metadata = {
  title: 'Mora Lab - Saimor',
  description:
    'Lab-Seite fuer Standbein-Softwarepfade mit Live-KPI-Strecke, Use Cases und direkten Einstiegs-CTAs.',
};

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-[#081410] text-white">
      <Suspense fallback={null}>
        <DemoContent />
      </Suspense>
    </main>
  );
}
