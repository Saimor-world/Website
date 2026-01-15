// app/layout.tsx
import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import ClientProviders from '../components/ClientProviders'
import AuthProvider from '../components/AuthProvider'
import LayoutWrapper from '../components/LayoutWrapper'

import dynamic from 'next/dynamic'

const CookieBanner = dynamic(() => import('@/components/CookieBanner'), { ssr: false });
const EasterEggs = dynamic(() => import('@/components/EasterEggs'), { ssr: false });
const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'), { ssr: false });
const BackToTop = dynamic(() => import('@/components/BackToTop'), { ssr: false });
const CommandPalette = dynamic(() => import('@/components/CommandPalette'), { ssr: false });
const KeyboardHint = dynamic(() => import('@/components/KeyboardHint'), { ssr: false });

export const metadata: Metadata = {
  metadataBase: new URL('https://saimor.world'),
  title: {
    default: 'Saimôr – Klarheit im Wandel',
    template: '%s | Saimôr'
  },
  description:
    'Saimôr begleitet Kommunen, Unternehmen und Menschen im Wandel – mit Beratung, Dashboards & Workshops. Klar statt komplex. DSGVO-konform, EU-basiert.',
  // Icons are now handled by app/icon.png and app/apple-icon.png (Next.js convention)
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" data-saimor="pb-1.2" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/saimor-logo-new.png" type="image/png" />
        <link rel="apple-touch-icon" href="/saimor-logo-new.png" />
        <meta name="theme-color" content="#10B981" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Saimôr",
              "url": "https://saimor.world",
              "logo": "https://saimor.world/saimor-logo-new.png",
              "description": "Saimôr begleitet Kommunen, Unternehmen und Menschen im Wandel – mit Beratung, Dashboards & Workshops. Klar statt komplex. DSGVO-konform, EU-basiert.",
              "foundingDate": "2024",
              "sameAs": [],
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "contact@saimor.world",
                "contactType": "customer service",
                "availableLanguage": ["German", "English"]
              },
              "areaServed": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "48.137154",
                  "longitude": "11.576124"
                },
                "geoRadius": "2000 km"
              }
            })
          }}
        />
        
        {/* Structured Data - Software Application (Môra) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Môra",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "description": "Semantisches Betriebssystem für zukunftsfähige Organisationen. Strukturierte Übersicht trifft auf tiefe Vernetzung.",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "EUR",
                "availability": "https://schema.org/ComingSoon"
              },
              "featureList": [
                "Semantic Analysis",
                "Real-time Pattern Recognition",
                "DSGVO-compliant",
                "EU-hosted",
                "Local-first Architecture"
              ],
              "author": {
                "@type": "Organization",
                "name": "Saimôr"
              }
            })
          }}
        />
      </head>
      <body className="bg-[#081410] text-white antialiased" suppressHydrationWarning>
        <AuthProvider>
          <ClientProviders />
          <ScrollProgress />
          <EasterEggs />
          <CookieBanner />
          <CommandPalette />
          <KeyboardHint />
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  )
}
