import Hero from "@/components/Hero";
import MoraTeaser from "@/components/MoraTeaser";
import CommunityBanner from "@/components/CommunityBanner";
import WaitlistForm from "@/components/WaitlistForm";
import ContactSection from "@/components/ContactSection";
import dynamic from "next/dynamic";

const MoraIntroAnimation = dynamic(() => import("@/components/MoraIntroAnimation"), { ssr: false });
const ScrollProgress = dynamic(() => import("@/components/ScrollProgress"), { ssr: false });
const EasterEggs = dynamic(() => import("@/components/EasterEggs"), { ssr: false });
const CookieBanner = dynamic(() => import("@/components/CookieBanner"), { ssr: false });
const MyceliumNetwork = dynamic(() => import("@/components/MyceliumNetwork"), { ssr: false });

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
    </>
  )
}
