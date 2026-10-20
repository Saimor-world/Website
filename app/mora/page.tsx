import type { Metadata } from 'next';
import MoraLandingPage from '@/components/MoraLandingPage';
import MoraProductPage from '@/components/MoraProductPage';

export const metadata: Metadata = {
  title: 'MÔRA: Klarheit im Wandel',
  description:
    'MÔRA ist dein ruhender Begleiter für Fokus und Orientierung. Sie arbeitet im Saimôr OS mit Dateien, Terminen und Kontext.',
  alternates: {
    canonical: '/mora',
    languages: {
      de: '/mora',
      en: '/en/mora',
    },
  },
};

export default function MoraPage() {
  return (
    <>
      <MoraLandingPage locale="de" />
      <MoraProductPage locale="de" embedded />
    </>
  );
}
