import Hero from '@/components/Hero';
import MoraTeaser from '@/components/MoraTeaser';
import CommunityBanner from '@/components/CommunityBanner';
import WaitlistForm from '@/components/WaitlistForm';
import ContactSection from '@/components/ContactSection';
import dynamic from 'next/dynamic';

const MoraIntroAnimation = dynamic(() => import('@/components/MoraIntroAnimation'), { ssr: false });
const MyceliumNetwork = dynamic(() => import('@/components/MyceliumNetwork'), { ssr: false });

export const metadata = {
  title: 'Saimôr – Das Ökosystem für bewusste Organisationen',
  description: 'Saimôr begleitet Kommunen, Unternehmen und Menschen im Wandel. Klarheit durch semantische Intelligenz. DSGVO-konform, lokal & sicher.',
};

export default function Page() {
  return (
    <main className="flex flex-col min-h-screen">
      <MoraIntroAnimation locale="de" />
      <MyceliumNetwork />
      <div className="relative z-10">
        <Hero locale="de" />
        <MoraTeaser locale="de" />
        <CommunityBanner locale="de" />
        <WaitlistForm locale="de" />
        <ContactSection locale="de" />
      </div>
    </main>
  );
}
