import Hero from '@/components/Hero';
import YoriSection from '@/components/YoriSection';
import DeskSection from '@/components/DeskSection';
import OsSection from '@/components/OsSection';
import MoraTeaser from '@/components/MoraTeaser';
import CommunityBanner from '@/components/CommunityBanner';
import WaitlistForm from '@/components/WaitlistForm';
import ContactSection from '@/components/ContactSection';
import MoraIntroLazy from '@/components/MoraIntroLazy';
import MyceliumNetworkLazy from '@/components/MyceliumNetworkLazy';
import SocialProof from '@/components/SocialProof';
import EntryTeaser from '@/components/EntryTeaser';

export const metadata = {
  title: 'Saimôr – Das Ökosystem für bewusste Organisationen',
  description: 'Saimôr begleitet Kommunen, Unternehmen und Menschen im Wandel. Klarheit durch semantische Intelligenz. DSGVO-konform, lokal & sicher.',
};

export default function Page() {
  return (
    <main className="flex flex-col min-h-screen">
      <MoraIntroLazy locale="de" />
      <MyceliumNetworkLazy />
      <div className="relative z-10">
        <Hero locale="de" />
        <OsSection locale="de" />
        <YoriSection locale="de" />
        <DeskSection locale="de" />
        <MoraTeaser locale="de" />
        <EntryTeaser locale="de" />
        <CommunityBanner locale="de" />
        <SocialProof />
        <WaitlistForm locale="de" />
        <ContactSection locale="de" />
      </div>
    </main>
  );
}
