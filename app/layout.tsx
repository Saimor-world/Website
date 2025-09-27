// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import ClientProviders from '../components/ClientProviders'

export const metadata: Metadata = {
  metadataBase: new URL('https://saimor.world'),
  title: 'Saimôr – Klarheit im Wandel',
  description:
    'Saimôr ist ein digitaler Ort für das, was bleibt, wenn alles andere laut wird.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32', type: 'image/x-icon' },
      { url: '/favicon.png', sizes: '192x192', type: 'image/png' }
    ],
    apple: [
      { url: '/favicon.png', sizes: '180x180', type: 'image/png' }
    ]
  },
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
      <body className="bg-forest-primary text-warm-beige antialiased">
        <ClientProviders />
        {children}
      </body>
    </html>
  )
}
