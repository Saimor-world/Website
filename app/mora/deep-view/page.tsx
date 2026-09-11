import type { Metadata } from 'next';
import MoraDeepView from '@/components/MoraDeepView';

export const metadata: Metadata = {
  title: 'MÔRA – Deep View',
  description: 'MÔRA Deep View verbindet öffentliche Live-Signale zu einer transparenten Echtzeitansicht.',
  alternates: { canonical: '/mora/deep-view' },
};

export default function MoraDeepViewPage() {
  return <MoraDeepView locale="de" />;
}
