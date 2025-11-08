import Hero from '@/components/Hero';
import Services from '@/components/Services';
import TrustProof from '@/components/TrustProof';
import FAQ from '@/components/FAQ';
import ContactSection from '@/components/ContactSection';
import CommunityBanner from '@/components/CommunityBanner';
import WaitlistForm from '@/components/WaitlistForm';
import dynamic from 'next/dynamic';

const MoraWorkbench = dynamic(() => import('@/components/MoraWorkbench'), { ssr: false });
const InteractiveMoraDashboard = dynamic(() => import('@/components/InteractiveMoraDashboard'), { ssr: false });

const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'), { ssr: false });
const EasterEggs = dynamic(() => import('@/components/EasterEggs'), { ssr: false });
const MoraAvatar = dynamic(() => import('@/components/MoraAvatar'), { ssr: false });
const CookieBanner = dynamic(() => import('@/components/CookieBanner'), { ssr: false });
const MyceliumNetwork = dynamic(() => import('@/components/MyceliumNetwork'), { ssr: false });
const MoraIntroAnimation = dynamic(() => import('@/components/MoraIntroAnimation'), { ssr: false });

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
      <CookieBanner />
      <div className="relative z-10">
        <Hero locale="en" />
        <MoraWorkbench locale="en" />
        <Services locale="en" />
        <InteractiveMoraDashboard locale="en" />
        <TrustProof locale="en" />
        <CommunityBanner locale="en" />
        <WaitlistForm locale="en" />
        <FAQ locale="en" />
        <ContactSection locale="en" />
      </div>
    </>
  )
}
