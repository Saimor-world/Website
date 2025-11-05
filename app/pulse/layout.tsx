import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pulse – Impulse für Klarheit im Moment | Saimôr',
  description: 'Gezielte Impulsformate: Workshops, Keynotes oder stille Räume. Klarheit genau dort, wo sie gebraucht wird. Môra bereitet vor, wertet aus, begleitet nach.',
  openGraph: {
    title: 'Pulse – Impulse für Klarheit im Moment | Saimôr',
    description: 'Workshop (3h) · Keynote (45min) · Stilles Format (90min). Môra-Vorbereitung & Follow-up.',
    images: ['/og-saimor.png'],
  },
};

export default function PulseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
