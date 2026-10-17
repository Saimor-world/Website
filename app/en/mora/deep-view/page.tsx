import type { Metadata } from 'next';
import MoraDeepView from '@/components/MoraDeepView';

export const metadata: Metadata = {
  title: 'MÔRA Deep View – Saimôr',
  description: 'A cinematic encounter with MÔRA: from AI uncertainty toward clarity. Meet her presence and see through her eyes.',
  alternates: { canonical: '/en/mora/deep-view' },
};

export default function MoraDeepViewPage() {
  return <MoraDeepView locale="en" />;
}
