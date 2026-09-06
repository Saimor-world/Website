import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Saimôr – OS, Môra und souveräne KI-Systeme',
  description: 'Saimôr verbindet digitalen Arbeitsraum, Daten und KI zu einem System, das Kontext behält. Mit Saimôr OS, Môra, Desk sowie Vorträgen und Schulungen.',
  metadataBase: new URL('https://saimor.world'),
  robots: 'index, follow',
  openGraph: {
    title: 'Saimôr – OS, Môra und souveräne KI-Systeme',
    description: 'Arbeitsraum, Daten und KI in einem System, das Kontext behält. Saimôr OS, Môra, Desk sowie Vorträge und Schulungen.',
    url: 'https://saimor.world/de',
    siteName: 'Saimôr',
    images: ['/og'],
    locale: 'de-DE',
    type: 'website',
  },
  alternates: { canonical: '/de' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RouteLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <div className="min-h-screen font-sans">{children}</div>;
}
