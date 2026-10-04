import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '../globals.css';

const title = 'Saimôr OS – Work, data and intelligence in context';
const description = 'Saimôr OS brings files, meetings, tasks and intelligence into one shared workspace. MÔRA keeps the context even as models and tools change.';

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
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og'],
  },
  alternates: {
    canonical: '/en',
    languages: { de: '/de', en: '/en', 'x-default': '/de' },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RouteLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <div lang="en" className="min-h-screen font-sans">{children}</div>;
}
