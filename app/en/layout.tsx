import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Saimôr – Clarity in Change',
  description: 'A semantic operating system for organizations in change: consulting, dashboards, and workshops that turn complexity into clarity. GDPR-compliant, EU-hosted.',
  metadataBase: new URL('https://saimor.world'),
  robots: 'index, follow',
  openGraph: {
    title: 'Saimôr – Clarity in Change',
    description: 'A semantic operating system for organizations in change: consulting, dashboards, and workshops that turn complexity into clarity. GDPR-compliant, EU-hosted.',
    url: 'https://saimor.world',
    siteName: 'Saimôr',
    images: ['/og'],
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
