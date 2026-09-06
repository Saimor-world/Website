import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '../globals.css';

const title = 'Saimôr – OS with proactive AI assistance';
const description = 'Saimôr OS connects work, files, integrations and AI in one shared context, with Môra as a proactive assistant plus talks and training.';

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL('https://saimor.world'),
  robots: 'index, follow',
  openGraph: {
    title,
    description,
    url: 'https://saimor.world/en',
    siteName: 'Saimôr',
    images: ['/og'],
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og'],
  },
  alternates: { canonical: '/en' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RouteLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <div lang="en" className="min-h-screen font-sans">{children}</div>;
}
