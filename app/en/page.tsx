import Hero from '@/components/Hero';
import Services from '@/components/Services';
import TrustProof from '@/components/TrustProof';
import Education from '@/components/Education';
import FAQ from '@/components/FAQ';
import ContactSection from '@/components/ContactSection';
import dynamic from 'next/dynamic';

const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'), { ssr: false });
const EasterEggs = dynamic(() => import('@/components/EasterEggs'), { ssr: false });
const Lichtgespraech = dynamic(() => import('@/components/Lichtgespraech'), { ssr: false });
const CookieBanner = dynamic(() => import('@/components/CookieBanner'), { ssr: false });

export const metadata = {
  title: 'Saimôr – Clarity in Transformation',
  description: 'Saimôr accompanies municipalities, companies and people in transformation – with consulting, dashboards & workshops. Clear instead of complex. GDPR-compliant, EU-based.',
  openGraph: {
    title: 'Saimôr – Clarity in Transformation',
    description: 'Consulting, dashboards & workshops. Clear instead of complex. GDPR-compliant, EU-based.',
    images: ['/og-saimor.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saimôr – Clarity in Transformation',
    description: 'Consulting, dashboards & workshops. Clear instead of complex.',
  }
};

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <EasterEggs />
      <CookieBanner />
      <div>
        <Hero locale="en" />
        <Services locale="en" />
        <TrustProof locale="en" />
        <Education locale="en" />
        <FAQ locale="en" />
        <ContactSection locale="en" />
        <Lichtgespraech />
      </div>
    </>
  )
}
