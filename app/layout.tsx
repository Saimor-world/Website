// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import MatomoTracker from '../components/MatomoTracker'
import MatomoPageViews from '../components/MatomoPageViews'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  metadataBase: new URL('https://saimor.world'),
  title: 'Saimôr – Klarheit im Wandel',
  description:
    'Saimôr ist ein digitaler Ort für das, was bleibt, wenn alles andere laut wird.',
  openGraph: {
    title: 'Saimôr – Klarheit im Wandel',
    description: 'Saimôr ist ein digitaler Ort für das, was bleibt, wenn alles andere laut wird.',
    url: 'https://saimor.world',
    siteName: 'Saimôr',
    images: [
      {
        url: '/og',
        width: 1200,
        height: 630,
        alt: 'Saimôr – Klarheit im Wandel',
      },
    ],
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saimôr – Klarheit im Wandel',
    description: 'Saimôr ist ein digitaler Ort für das, was bleibt, wenn alles andere laut wird.',
    images: ['/og'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" data-saimor="pb-1.2">
      <body className="bg-[#0E1526] text-[#F8F7F3] antialiased">
        <MatomoTracker />
        <MatomoPageViews />
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
