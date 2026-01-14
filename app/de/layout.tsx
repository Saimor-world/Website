import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '../globals.css';
import { Inter, Cormorant_Garamond } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const corm = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: 'Saimôr – Klarheit im Wandel',
  description: 'Ein Resonanzraum für Klarheit. Brücke zwischen Menschen, Daten und Wandel.',
  metadataBase: new URL('https://saimor.world'),
  robots: 'index, follow',
  openGraph: {
    title: 'Saimôr – Klarheit im Wandel',
    description: 'Ein Resonanzraum für Klarheit. Brücke zwischen Menschen, Daten und Wandel.',
    url: 'https://saimor.world',
    siteName: 'Saimôr',
    images: ['/og.png'],
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
    <div className={`${inter.className} min-h-screen`}>
      <main id="main-content" className="" role="main">{children}</main>
    </div>
  )
}
