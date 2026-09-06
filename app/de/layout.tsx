import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '../globals.css';

const title = 'Saimôr – OS mit proaktiver KI-Assistenz';
const description = 'Saimôr OS verbindet Arbeit, Dateien, Integrationen und KI in einem gemeinsamen Kontext. Mit Môra als proaktiver Assistenz sowie Vorträgen und Schulungen.';

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL('https://saimor.world'),
  robots: 'index, follow',
  openGraph: {
    title,
    description,
    url: 'https://saimor.world/de',
    siteName: 'Saimôr',
    images: ['/og'],
    locale: 'de-DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og'],
  },
  alternates: { canonical: '/de' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RouteLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <div lang="de" className="min-h-screen font-sans">{children}</div>;
}
