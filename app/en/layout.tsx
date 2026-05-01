import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '../globals.css';

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

export default function RouteLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="min-h-screen font-sans">
      {children}
    </div>
  )
}
