import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '../globals.css';

const title = 'Saimôr OS – Arbeit, Dateien und KI an einem Ort';
const description = 'Saimôr OS bringt Dateien, Termine, Aufgaben und KI in einen gemeinsamen Arbeitsraum. MÔRA behält den Stand im Blick und kann dort weitermachen, wo du aufgehört hast.';

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL('https://saimor.world'),
  robots: 'index, follow',
  openGraph: {
    title,
    description,
    url: 'https://saimor.world/de',
    siteName: 'Saimôr',
    images: ['/og'],
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og'],
  },
  alternates: {
    canonical: '/de',
    languages: { de: '/de', en: '/en', 'x-default': '/de' },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RouteLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <div lang="de" className="min-h-screen font-sans">{children}</div>;
}
