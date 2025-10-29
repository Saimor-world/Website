import Hero from '@/components/Hero';
import Services from '@/components/Services';
import MoraShowcase from '@/components/MoraShowcase';
import TrustProof from '@/components/TrustProof';
import FAQ from '@/components/FAQ';
import ContactSection from '@/components/ContactSection';
import CommunityBanner from '@/components/CommunityBanner';
import WaitlistForm from '@/components/WaitlistForm';
import dynamic from 'next/dynamic';

const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'), { ssr: false });
const EasterEggs = dynamic(() => import('@/components/EasterEggs'), { ssr: false });
const MoraAvatar = dynamic(() => import('@/components/MoraAvatar'), { ssr: false });
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
      <MoraAvatar locale="de" />
      <CookieBanner />
      <div>
        <Hero locale="de" />
        <Services locale="de" />
        <MoraShowcase locale="de" />
        <TrustProof locale="de" />
        <CommunityBanner locale="de" />
        <WaitlistForm locale="de" />
        <FAQ locale="de" />
        <ContactSection locale="de" />
        <MoraChat />
      </div>
    </>
  )
}
