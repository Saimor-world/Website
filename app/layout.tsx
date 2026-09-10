// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
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

const SYSTEM_TITLE = 'Saimôr – OS mit proaktiver KI-Assistenz';
const SYSTEM_DESCRIPTION = 'Saimôr OS verbindet Arbeit, Dateien, Integrationen und KI in einem gemeinsamen Kontext. Môra ist die proaktive Assistenz im System.';

export const metadata: Metadata = {
  metadataBase: new URL('https://saimor.world'),
  title: {
    default: SYSTEM_TITLE,
    template: '%s | Saimôr',
  },
  description: SYSTEM_DESCRIPTION,
  keywords: [
    'Saimôr',
    'Saimôr OS',
    'Môra',
    'KI Arbeitsraum',
    'proaktive KI Assistenz',
    'Kontextsystem',
    'Souveräne KI',
    'AI Workspace',
    'KI Schulung',
    'KI Workshop',
    'Security Check',
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
        alt: SYSTEM_TITLE,
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
              logo: 'https://saimor.world/icon.png',
              description: 'Unabhängiges Produktstudio für souveräne KI-Systeme, digitale Arbeitsräume, Vorträge und Schulungen.',
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
              description: 'Digitaler Arbeitsraum mit gemeinsamem Kontext, proaktiver Môra-Assistenz, Integrationen und nachvollziehbarer Ausführung.',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'EUR',
                availability: 'https://schema.org/ComingSoon',
              },
              featureList: [
                'Shared work context',
                'Proactive Môra assistance',
                'Traceable integrations and agents',
                'Security Check onboarding',
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