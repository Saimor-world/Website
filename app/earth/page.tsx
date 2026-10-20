import type { Metadata } from 'next';
import EarthLandingPage from '@/components/EarthLandingPage';

export const metadata: Metadata = {
  title: 'Earth: Orte erinnern sich',
  description:
    'Earth verbindet Geschichten, Wissen und Veränderung mit realen Orten – als ruhige Karte und Zeitleiste. Für Kommunen, Archive und alle, die ihre Geschichte bewahren wollen.',
  alternates: {
    canonical: '/earth',
    languages: {
      de: '/earth',
      en: '/en/earth',
    },
  },
};

export default function EarthPage() {
  return <EarthLandingPage locale="de" />;
}
