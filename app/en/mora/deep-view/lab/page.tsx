import type { Metadata } from 'next';
import MoraDeepViewLab from '@/components/MoraDeepViewLab';

export const metadata: Metadata = {
  title: 'MÔRA · Explore the principle',
  description: 'Optional technical concept with example inputs, fixed rules and auditable decisions.',
  robots: { index: false, follow: false },
};

export default function MoraDeepViewLabPageEn() {
  return <MoraDeepViewLab locale="en" />;
}
