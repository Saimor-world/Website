import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Saimôr – Sovereign AI systems and digital spaces',
  description: 'Marius Fahrländer’s independent product studio: Saimôr OS, Môra, YORI, talks, training and selected web projects.',
  metadataBase: new URL('https://saimor.world'),
  robots: 'index, follow',
  openGraph: {
    title: 'Saimôr – Sovereign AI systems and digital spaces',
    description: 'Marius Fahrländer’s independent product studio: Saimôr OS, Môra, YORI, talks, training and selected web projects.',
    url: 'https://saimor.world/en',
    siteName: 'Saimôr',
    images: ['/og'],
    locale: 'en-US',
    type: 'website'
  },
  alternates: { canonical: '/en' },
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
