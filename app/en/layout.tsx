import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Saimôr – OS, Môra and sovereign AI systems',
  description: 'Saimôr connects digital workspace, data and AI into a system that keeps context. With Saimôr OS, Môra, Desk, talks and training.',
  metadataBase: new URL('https://saimor.world'),
  robots: 'index, follow',
  openGraph: {
    title: 'Saimôr – OS, Môra and sovereign AI systems',
    description: 'Workspace, data and AI in one system that keeps context. Saimôr OS, Môra, Desk, talks and training.',
    url: 'https://saimor.world/en',
    siteName: 'Saimôr',
    images: ['/og'],
    locale: 'en-US',
    type: 'website',
  },
  alternates: { canonical: '/en' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RouteLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <div className="min-h-screen font-sans">{children}</div>;
}
