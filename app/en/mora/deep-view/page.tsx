import type { Metadata } from 'next';
import MoraDeepView from '@/components/MoraDeepView';

export const metadata: Metadata = {
  title: 'MÔRA – Deep View',
  description: 'MÔRA Deep View transparently shows which pieces of context belong together and how they lead to a useful next step.',
  alternates: { canonical: '/en/mora/deep-view' },
};

export default function MoraDeepViewPage() {
  return <MoraDeepView locale="en" />;
}
