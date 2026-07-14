import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Saimôr – Klarheit im Wandel',
  description: 'Semantisches Betriebssystem für Organisationen im Wandel: Beratung, Dashboards und Workshops, die Komplexität in Klarheit verwandeln. DSGVO-konform, EU-gehostet.',
  metadataBase: new URL('https://saimor.world'),
  robots: 'index, follow',
  openGraph: {
    title: 'Saimôr – Klarheit im Wandel',
    description: 'Semantisches Betriebssystem für Organisationen im Wandel: Beratung, Dashboards und Workshops, die Komplexität in Klarheit verwandeln. DSGVO-konform, EU-gehostet.',
    url: 'https://saimor.world',
    siteName: 'Saimôr',
    images: ['/og'],
    locale: 'de-DE',
    type: 'website'
  }
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
