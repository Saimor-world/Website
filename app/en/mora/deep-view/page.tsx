import type { Metadata } from 'next';
import MoraDeepView from '@/components/MoraDeepView';

export const metadata: Metadata = {
  title: 'MÔRA – Deep View',
  description: 'MÔRA Deep View connects public live signals into a transparent real-time view.',
  alternates: { canonical: '/en/mora/deep-view' },
};

export default function MoraDeepViewPage() {
  return <MoraDeepView locale="en" />;
}
