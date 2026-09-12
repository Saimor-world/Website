import type { Metadata } from 'next';
import MoraDeepView from '@/components/MoraDeepView';

export const metadata: Metadata = {
  title: 'MÔRA – Deep View',
  description: 'MÔRA Deep View zeigt transparent, welche Kontextstücke zusammengehören und wie daraus ein sinnvoller nächster Schritt entsteht.',
  alternates: { canonical: '/mora/deep-view' },
};

export default function MoraDeepViewPage() {
  return <MoraDeepView locale="de" />;
}
