import type { Metadata } from 'next';
import MoraAliveWebsite from '@/components/MoraAliveWebsite';

export const metadata: Metadata = {
  title: 'MÔRA Alive · Interaktive Vorschau',
  description: 'Erste interaktive Körpervorschau von MÔRA. Keine simulierte OS-Aktivität.',
  robots: { index: false, follow: false },
};

export default function MoraAlivePage() {
  return <MoraAliveWebsite />;
}
