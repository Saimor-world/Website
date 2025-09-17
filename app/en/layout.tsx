import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '../globals.css';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });
const corm = Cormorant_Garamond({ subsets: ['latin'] , weight: ['400','500','600','700'] });

export const metadata: Metadata = {
  title: 'Saimôr – Clarity in Change',
  description: 'A resonance space for clarity. A bridge between people, data, and change.',
  metadataBase: new URL('https://saimor.world'),
  robots: 'index, follow',
  openGraph: {
    title: 'Saimôr – Clarity in Change',
    description: 'A resonance space for clarity. A bridge between people, data, and change.',
    url: 'https://saimor.world',
    siteName: 'Saimôr',
    images: ['/og.png'],
    locale: 'en-US',
    type: 'website'
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="bg-navy text-paper">
      <body className={inter.className}>
        <div className="min-h-screen bg-radial-orbit">
          {/* Skip to main content link for screen readers */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-gold text-navy px-4 py-2 rounded-md z-50 font-semibold"
            tabIndex={1}
          >
            Skip to main content
          </a>
          <Navbar locale="en" />
          <main id="main-content" className="" role="main">{children}</main>
          <Footer locale="en" />
        </div>
      </body>
    </html>
  )
}
