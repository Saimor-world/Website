import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Saimôr – Souveräne KI-Systeme und digitale Räume',
  description: 'Das unabhängige Produktstudio von Marius Fahrländer: Saimôr OS, Môra, YORI, Vorträge, Schulungen und ausgewählte Webprojekte.',
  metadataBase: new URL('https://saimor.world'),
  robots: 'index, follow',
  openGraph: {
    title: 'Saimôr – Souveräne KI-Systeme und digitale Räume',
    description: 'Das unabhängige Produktstudio von Marius Fahrländer: Saimôr OS, Môra, YORI, Vorträge, Schulungen und ausgewählte Webprojekte.',
    url: 'https://saimor.world/de',
    siteName: 'Saimôr',
    images: ['/og'],
    locale: 'de-DE',
    type: 'website'
  },
  alternates: { canonical: '/de' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RouteLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="min-h-screen font-sans">
      {children}
    </div>
  )
}
