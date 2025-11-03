import HeroNew from '@/components/HeroNew';
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
const MyceliumNetwork = dynamic(() => import('@/components/MyceliumNetwork'), { ssr: false });

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
      <MyceliumNetwork />
      <ScrollProgress />
      <EasterEggs />
      <MoraAvatar locale="en" />
      <CookieBanner />
      <div className="relative z-10">
        <HeroNew locale="en" />
        <Services locale="en" />
        <MoraShowcase locale="en" />
        <TrustProof locale="en" />
        <CommunityBanner locale="en" />
        <WaitlistForm locale="en" />
        <FAQ locale="en" />
        <ContactSection locale="en" />
      </div>
    </>
  )
}
