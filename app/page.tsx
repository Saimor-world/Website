import Hero from '@/components/Hero';
import MoraTeaser from '@/components/MoraTeaser';
import CommunityBanner from '@/components/CommunityBanner';
import WaitlistForm from '@/components/WaitlistForm';
import ContactSection from '@/components/ContactSection';
import dynamic from 'next/dynamic';

const MoraIntroAnimation = dynamic(() => import('@/components/MoraIntroAnimation'), { ssr: false });
const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'), { ssr: false });
const EasterEggs = dynamic(() => import('@/components/EasterEggs'), { ssr: false });
const CookieBanner = dynamic(() => import('@/components/CookieBanner'), { ssr: false });
const MyceliumNetwork = dynamic(() => import('@/components/MyceliumNetwork'), { ssr: false });

export const metadata = {
  title: 'Saimôr – Das Ökosystem für bewusste Organisationen',
  description: 'Saimôr begleitet Kommunen, Unternehmen und Menschen im Wandel. Klarheit durch semantische Intelligenz. DSGVO-konform, lokal & sicher.',
  openGraph: {
    title: 'Saimôr – Das Ökosystem für bewusste Organisationen',
    description: 'Klarheit durch semantische Intelligenz. DSGVO-konform, lokal & sicher.',
    images: ['/og-saimor.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saimôr – Das Ökosystem für bewusste Organisationen',
    description: 'Klarheit durch semantische Intelligenz.',
  }
};

export default function Page() {
  return (
    <main className="flex flex-col min-h-screen">
      <MoraIntroAnimation locale="de" />
      <MyceliumNetwork />
      <ScrollProgress />
      <EasterEggs />
      <CookieBanner />
      <div className="relative z-40">
        <Hero locale="de" />
        <MoraTeaser locale="de" />
        <CommunityBanner locale="de" />
        <WaitlistForm locale="de" />
        <ContactSection locale="de" />
      </div>
    </main>
  );
}
