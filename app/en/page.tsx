import Hero from '@/components/Hero';
import Services from '@/components/Services';
import MoraDashboard from '@/components/MoraDashboard';
import TrustProof from '@/components/TrustProof';
// import FundingSection from '@/components/FundingSection'; // TODO(CEO): Re-enable after Pre-Seed confirmation
import FAQ from '@/components/FAQ';
import ContactSection from '@/components/ContactSection';
import CommunityBanner from '@/components/CommunityBanner';
import WaitlistForm from '@/components/WaitlistForm';
import dynamic from 'next/dynamic';

const MoraIntroAnimation = dynamic(() => import('@/components/MoraIntroAnimation'), { ssr: false });
const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'), { ssr: false });
const EasterEggs = dynamic(() => import('@/components/EasterEggs'), { ssr: false });
const MoraAvatar = dynamic(() => import('@/components/MoraAvatar'), { ssr: false });
const MoraChat = dynamic(() => import('@/components/MoraChat'), { ssr: false });
const MoraDashboardConnection = dynamic(() => import('@/components/MoraDashboardConnection'), { ssr: false });
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
      <MoraIntroAnimation locale="en" />
      <MyceliumNetwork />
      <ScrollProgress />
      <EasterEggs />
      <MoraAvatar locale="en" />
      <MoraChat />
      <MoraDashboardConnection />
      <CookieBanner />
      <div className="relative z-10">
        <Hero locale="en" />
        <Services locale="en" />
        <MoraDashboard locale="en" />
        <TrustProof locale="en" />
        {/* <FundingSection locale="en" /> */}
        <CommunityBanner locale="en" />
        <WaitlistForm locale="en" />
        <FAQ locale="en" />
        <ContactSection locale="en" />
      </div>
    </>
  )
}
