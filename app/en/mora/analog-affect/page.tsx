import type { Metadata } from 'next';
import MoraDeepView from '@/components/MoraDeepView';

export const metadata: Metadata = {
  title: 'Môra – Deep View',
  description: 'Môra Deep View connects public live signals into a calm, transparent real-time view.',
};

export default function MoraDeepViewPage() {
  return <MoraDeepView locale="en" />;
}
