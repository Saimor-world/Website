import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '../globals.css';

const title = 'Saimôr OS – Arbeit, Daten und Intelligenz im Kontext';
const description = 'Saimôr OS bringt Dateien, Termine, Aufgaben und Intelligenz in einen gemeinsamen Arbeitsraum. MÔRA hält den Kontext, auch wenn Modelle und Werkzeuge wechseln.';

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
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og'],
  },
  alternates: {
    canonical: '/de',
    languages: { de: '/de', en: '/en', 'x-default': '/de' },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RouteLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <div lang="de" className="min-h-screen font-sans">{children}</div>;
}
