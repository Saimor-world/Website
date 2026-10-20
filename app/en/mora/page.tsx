import type { Metadata } from 'next';
import MoraLandingPage from '@/components/MoraLandingPage';

export const metadata: Metadata = {
  title: 'MÔRA: Clarity in change',
  description:
    'MÔRA is your calm companion for focus and orientation. She works inside Saimôr OS with files, meetings and context.',
  alternates: {
    canonical: '/en/mora',
    languages: {
      de: '/mora',
      en: '/en/mora',
    },
  },
};

export default function MoraPage() {
  return <MoraLandingPage locale="en" />;
}
