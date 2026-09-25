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

const SYSTEM_TITLE = 'Saimôr – Arbeitsräume, die Kontext behalten';
const SYSTEM_DESCRIPTION = 'Saimôr verbindet Arbeit, Daten und KI zu einem System, das Kontext behält. MÔRA hält den Zusammenhang; Saimôr OS und YORI machen ihn in unterschiedlichen Arbeitsräumen nutzbar.';

export const metadata: Metadata = {
  metadataBase: new URL('https://saimor.world'),
  title: {
    default: SYSTEM_TITLE,
    template: '%s | Saimôr',
  },
  description: SYSTEM_DESCRIPTION,
  icons: {
    icon: [{ url: '/brand/saimor-sigil-restored-v1.png', type: 'image/png' }],
    shortcut: '/brand/saimor-sigil-restored-v1.png',
    apple: '/brand/saimor-sigil-restored-v1.png',
  },
  keywords: [
    'Saimôr',
    'Saimôr OS',
    'YORI',
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
        alt: 'Saimôr – Arbeitsräume, die Kontext behalten',
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
              logo: 'https://saimor.world/brand/saimor-sigil-restored-v1.png',
              description: 'Produktstudio hinter Saimôr OS, YORI und MÔRA sowie Beratung, Workshops und Umsetzung rund um praktische KI-Arbeit.',
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
              description: 'Arbeitsraum für Dateien, Termine, Aufgaben, Integrationen und KI. MÔRA hält den Arbeitskontext; YORI ergänzt Saimôr um einen ruhigeren Creator-Raum.',
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
