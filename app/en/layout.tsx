import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '../globals.css';

const title = 'Saimôr – OS, Môra and sovereign AI systems';
const description = 'Saimôr connects digital workspace, data and AI into a system that keeps context. With Saimôr OS, Môra, Desk, talks and training.';

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL('https://saimor.world'),
  keywords: [
    'Saimôr',
    'Saimôr OS',
    'Môra',
    'AI workspace',
    'context system',
    'sovereign AI',
    'AI training',
    'AI workshop',
    'Security Check',
  ],
  robots: 'index, follow',
  openGraph: {
    title,
    description: 'Workspace, data and AI in one system that keeps context. Saimôr OS, Môra, Desk, talks and training.',
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
    creator: '@saimorworld',
  },
  alternates: { canonical: '/en' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RouteLayout({ children }: Readonly<{ children: ReactNode }>) {
  // The root document remains shared across localized and non-localized routes.
  // Setting lang here correctly scopes all English page content for assistive tech.
  return <div lang="en" className="min-h-screen font-sans">{children}</div>;
}
