// app/layout.tsx
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import Script from 'next/script'
import './globals.css'
import ClientProviders from '../components/ClientProviders'
import AuthProvider from '../components/AuthProvider'
import LayoutWrapper from '../components/LayoutWrapper'
import CookieBanner from '@/components/CookieBanner';
import EasterEggs from '@/components/EasterEggs';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import CommandPalette from '@/components/CommandPalette';
import KeyboardHint from '@/components/KeyboardHint';
import PWARegistration from '@/components/PWARegistration';
import ErrorBoundary from '@/components/ErrorBoundary';
import SkipLink from '@/components/SkipLink';
import * as Sentry from '@sentry/nextjs';
import { canonicalUrlForRequest } from '@/lib/site-estate';

export async function generateMetadata(): Promise<Metadata> {
  const pathname = (await headers()).get('x-saimor-pathname');
  const canonicalUrl = canonicalUrlForRequest(pathname);

  return {
    metadataBase: new URL('https://saimor.world'),
    title: {
      default: 'Saimôr – Souveräne KI-Systeme und digitale Räume',
      template: '%s | Saimôr'
    },
    description:
      'Das unabhängige Produktstudio von Marius Fahrländer: Saimôr OS, Môra, YORI und ausgewählte Webprojekte. Souverän, nachvollziehbar und im Aufbau.',
    keywords: [
      'Saimôr',
      'Môra OS',
      'Semantisches Betriebssystem',
      'Organisationsentwicklung',
      'DSGVO-konform',
      'EU-basiert',
      'Digitale Transformation',
      'Beratung',
      'Dashboard',
      'Workshop',
      'Klarheit',
      'Wandel'
    ],
    authors: [{ name: 'Saimôr' }],
    creator: 'Saimôr',
    publisher: 'Saimôr',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    // Icons are now handled by app/icon.png and app/apple-icon.png (Next.js convention)
    openGraph: {
      title: 'Saimôr – Souveräne KI-Systeme und digitale Räume',
      description: 'Das unabhängige Produktstudio von Marius Fahrländer: Saimôr OS, Môra, YORI und ausgewählte Webprojekte.',
      url: canonicalUrl,
      siteName: 'Saimôr',
      images: [
        {
          url: '/og',
          width: 1200,
          height: 630,
          alt: 'Saimôr – Souveräne KI-Systeme und digitale Räume',
        },
      ],
      locale: 'de_DE',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Saimôr – Souveräne KI-Systeme und digitale Räume',
      description: 'Das unabhängige Produktstudio von Marius Fahrländer: Saimôr OS, Môra, YORI und ausgewählte Webprojekte.',
      images: ['/og'],
      creator: '@saimorworld',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
    },
    verification: {
      // Google Search Console (wenn vorhanden)
      // google: 'verification-code',
    },
    other: {
      ...Sentry.getTraceData()
    },
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" data-saimor="pb-1.2" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/saimor-seal-master.png" type="image/png" />
        <link rel="apple-touch-icon" href="/saimor-seal-master.png" />
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
              "logo": "https://saimor.world/saimor-seal-master.png",
              "description": "Unabhängiges Produktstudio für souveräne KI-Systeme, digitale Arbeitsräume, Vorträge und Schulungen.",
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
              "description": "Nachvollziehbare Kontext- und Agentenschicht für die Saimôr-Produkte.",
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
        <ErrorBoundary>
          <SkipLink />
          <AuthProvider>
            <ClientProviders />
            <PWARegistration />
            <ScrollProgress />
            <EasterEggs />
            <CookieBanner />
            <CommandPalette />
            <KeyboardHint />
            <LayoutWrapper>
              <main id="main-content" role="main">
                {children}
              </main>
            </LayoutWrapper>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
