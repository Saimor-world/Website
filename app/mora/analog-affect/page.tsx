import type { Metadata } from 'next';
import MoraDeepView from '@/components/MoraDeepView';

export const metadata: Metadata = {
  title: 'Môra – Deep View',
  description: 'Môra Deep View verbindet öffentliche Live-Signale zu einer ruhigen, transparenten Echtzeitansicht.',
};

export default function MoraDeepViewPage() {
  return <MoraDeepView locale="de" />;
}
