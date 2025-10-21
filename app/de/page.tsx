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
  title: 'Saimôr – Klarheit im Wandel',
  description: 'Saimôr begleitet Kommunen, Unternehmen und Menschen im Wandel – mit Beratung, Dashboards & Workshops. Klar statt komplex. DSGVO-konform, EU-basiert.',
  openGraph: {
    title: 'Saimôr – Klarheit im Wandel',
    description: 'Beratung, Dashboards & Workshops. Klar statt komplex. DSGVO-konform, EU-basiert.',
    images: ['/og-saimor.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saimôr – Klarheit im Wandel',
    description: 'Beratung, Dashboards & Workshops. Klar statt komplex.',
  }
};

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <EasterEggs />
      <CookieBanner />
      <div>
        <Hero locale="de" />
        <Services locale="de" />
        <TrustProof locale="de" />
        <Education locale="de" />
        <FAQ locale="de" />
        <ContactSection locale="de" />
        <Lichtgespraech />
      </div>
    </>
  )
}
