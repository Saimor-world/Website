import type { Metadata } from 'next';
import MoraDeepViewLab from '@/components/MoraDeepViewLab';

export const metadata: Metadata = {
  title: 'MÔRA · Das Prinzip dahinter',
  description: 'Optionale technische Prinzipdarstellung mit Beispieldaten, festen Regeln und nachvollziehbaren Entscheidungen.',
  robots: { index: false, follow: false },
};

export default function MoraDeepViewLabPage() {
  return <MoraDeepViewLab locale="de" />;
}
