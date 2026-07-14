import DemoContent from '@/components/DemoContent';
import { Suspense } from 'react';

export const metadata = {
  title: 'Mora Lab – SAIMÔR ausprobieren',
  description:
    'Sieh SAIMÔR wirklich arbeiten: Starte mit einer echten Analyse deiner Domain und sieh, wie aus Signalen ein Arbeitsbereich wird. Keine erfundenen Zahlen.',
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
