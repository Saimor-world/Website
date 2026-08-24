import Hero from "@/components/Hero";
import YoriSection from "@/components/YoriSection";
import DeskSection from "@/components/DeskSection";
import OsSection from "@/components/OsSection";
import MoraTeaser from "@/components/MoraTeaser";
import CommunityBanner from "@/components/CommunityBanner";
import WaitlistForm from "@/components/WaitlistForm";
import ContactSection from "@/components/ContactSection";
import MoraIntroLazy from "@/components/MoraIntroLazy";
import MyceliumNetworkLazy from "@/components/MyceliumNetworkLazy";
import EntryTeaser from "@/components/EntryTeaser";

export const metadata = {
  title: 'Saimôr – The Ecosystem for Conscious Organizations',
  description: 'Saimôr guides municipalities, companies and people through change. Clarity through semantic intelligence. GDPR-compliant, local & secure.',
};

export default function Page() {
  return (
    <main className="flex flex-col min-h-screen">
      <MoraIntroLazy locale="en" />
      <MyceliumNetworkLazy />
      <div className="relative z-10">
        <Hero locale="en" />
        <OsSection locale="en" />
        <YoriSection locale="en" />
        <DeskSection locale="en" />
        <MoraTeaser locale="en" />
        <EntryTeaser locale="en" />
        <CommunityBanner locale="en" />
        <WaitlistForm locale="en" />
        <ContactSection locale="en" />
      </div>
    </main>
  );
}
