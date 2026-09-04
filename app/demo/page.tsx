import DemoContent from '@/components/DemoContent';
import { Suspense } from 'react';

export const metadata = {
  title: 'Saimôr OS – Isolierte Demo',
  description:
    'Öffne einen getrennten Saimôr-Beispielarbeitsbereich ohne Anmeldung. Die Demo hat keinen Zugriff auf persönliche oder fremde Kundendaten.',
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
