import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '../globals.css';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });
const corm = Cormorant_Garamond({ subsets: ['latin'] , weight: ['400','500','600','700'] });

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

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="de" className="bg-forest-primary text-warm-beige">
      <body className={inter.className}>
        <div className="min-h-screen bg-radial-orbit">
          {/* Skip to main content link for screen readers */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-gold-primary text-forest-primary px-4 py-2 rounded-md z-50 font-semibold"
            tabIndex={1}
          >
            Skip to main content
          </a>
          <Navbar locale="de" />
          <main id="main-content" className="" role="main">{children}</main>
          <Footer locale="de" />
        </div>
      </body>
    </html>
  )
}
