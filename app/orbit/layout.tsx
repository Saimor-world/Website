import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Orbit – Rhythmus statt Meetings | Saimôr',
  description: 'Systematische Begleitung für wiederkehrende Transformation. Regelmäßige Orientierung statt Meeting-Overload. Verlässlicher Resonanzraum für Entscheidungen mit Môra.',
  openGraph: {
    title: 'Orbit – Rhythmus statt Meetings | Saimôr',
    description: 'Systematische Begleitung für wiederkehrende Transformation. 1-6 Monate · Regelmäßiger Takt · Môra-unterstützt.',
    images: ['/og-saimor.png'],
  },
};

export default function OrbitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
