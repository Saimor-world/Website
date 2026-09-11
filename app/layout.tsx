// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import './brand.css';
import ClientProviders from '../components/ClientProviders';
import AuthProvider from '../components/AuthProvider';
import LayoutWrapper from '../components/LayoutWrapper';
import CookieBanner from '@/components/CookieBanner';
import ScrollProgress from '@/components/ScrollProgress';
import PWARegistration from '@/components/PWARegistration';
import DesktopDiscoveries from '@/components/DesktopDiscoveries';
import CommandPalette from '@/components/CommandPalette';
import ErrorBoundary from '@/components/ErrorBoundary';
import SkipLink from '@/components/SkipLink';

const SYSTEM_TITLE = 'Saimôr OS – Arbeit, Dateien und KI an einem Ort';
const SYSTEM_DESCRIPTION = 'Saimôr OS bringt Dateien, Termine, Aufgaben und KI in einen gemeinsamen Arbeitsraum. MÔRA behält den Stand im Blick und kann dort weitermachen, wo du aufgehört hast.';

export const metadata: Metadata = {
  metadataBase: new URL('https://saimor.world'),
  title: {
    default: SYSTEM_TITLE,
    template: '%s | Saimôr',
  },
  description: SYSTEM_DESCRIPTION,
  icons: {
    icon: [{ url: '/saimor-mark.svg', type: 'image/svg+xml' }],
    shortcut: '/saimor-mark.svg',
  },
  keywords: [
    'Saimôr',
    'Saimôr OS',
    'MÔRA',
    'KI Arbeitsraum',
    'AI Workspace',
    'proaktive KI Assistenz',
    'souveräne KI',
    'Dateien und KI',
    'Arbeitsorganisation mit KI',
    'Security Check',
    'KI Schulung',
    'KI Workshop',
  ],
  authors: [{ name: 'Saimôr' }],
  creator: 'Saimôr',
  publisher: 'Saimôr',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: SYSTEM_TITLE,
    description: SYSTEM_DESCRIPTION,
    url: '/de',
    siteName: 'Saimôr',
    images: [
      {
        url: '/og',
        width: 1200,
        height: 630,
        alt: 'Saimôr OS – Arbeit, Dateien und KI an einem Ort',
      },
    ],
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SYSTEM_TITLE,
    description: SYSTEM_DESCRIPTION,
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
    canonical: '/de',
    languages: {
      de: '/de',
      en: '/en',
      'x-default': '/de',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" data-saimor="pb-1.2" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#050706" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Saimôr',
              url: 'https://saimor.world',
              logo: 'https://saimor.world/saimor-mark.svg',
              description: 'Unabhängiges Produktstudio hinter Saimôr OS, MÔRA sowie Vorträgen und Schulungen zu praktischer KI.',
              foundingDate: '2024',
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'contact@saimor.world',
                contactType: 'customer service',
                availableLanguage: ['German', 'English'],
              },
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Saimôr OS',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              url: 'https://saimor.world/de',
              description: 'Arbeitsraum für Dateien, Termine, Aufgaben, Integrationen und KI. MÔRA behält den Arbeitsstand im Blick und kann auf vorhandenem Kontext aufbauen.',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'EUR',
                availability: 'https://schema.org/ComingSoon',
              },
              featureList: [
                'Gemeinsamer Arbeitskontext',
                'MÔRA Assistenz',
                'Dateien, Kalender und Aufgaben',
                'Security Check als Einstieg',
              ],
              author: {
                '@type': 'Organization',
                name: 'Saimôr',
              },
            }),
          }}
        />
      </head>
      <body className="bg-[#050706] text-white antialiased" suppressHydrationWarning>
        <ErrorBoundary>
          <SkipLink />
          <AuthProvider>
            <ClientProviders />
            <PWARegistration />
            <DesktopDiscoveries />
            <CommandPalette />
            <ScrollProgress />
            <CookieBanner />
            <LayoutWrapper>
              <main id="main-content" role="main">
                {children}
              </main>
            </LayoutWrapper>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}