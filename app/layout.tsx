// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import ClientProviders from '../components/ClientProviders'
import AuthProvider from '../components/AuthProvider'

export const metadata: Metadata = {
  metadataBase: new URL('https://saimor.world'),
  title: 'Saimôr – Klarheit im Wandel',
  description:
    'Saimôr begleitet Kommunen, Unternehmen und Menschen im Wandel – mit Beratung, Dashboards & Workshops. Klar statt komplex. DSGVO-konform, EU-basiert.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '16x16 32x32', type: 'image/x-icon' },
      { url: '/favicon.png', sizes: '192x192', type: 'image/png' }
    ],
    apple: [
      { url: '/favicon.png', sizes: '180x180', type: 'image/png' }
    ],
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Saimôr – Klarheit im Wandel',
    description: 'Saimôr begleitet Kommunen, Unternehmen und Menschen im Wandel – mit Beratung, Dashboards & Workshops. Klar statt komplex. DSGVO-konform, EU-basiert.',
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
    description: 'Saimôr begleitet Kommunen, Unternehmen und Menschen im Wandel – mit Beratung, Dashboards & Workshops. Klar statt komplex. DSGVO-konform, EU-basiert.',
    images: ['/og'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" data-saimor="pb-1.2">
      <body className="bg-forest-primary text-warm-beige antialiased">
        <AuthProvider>
          <ClientProviders />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
