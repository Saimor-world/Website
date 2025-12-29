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
  title: 'Saimôr – The Ecosystem for Conscious Organizations',
  description: 'Saimôr guides municipalities, companies and people through change. Clarity through semantic intelligence. GDPR-compliant, local & secure.',
  openGraph: {
    title: 'Saimôr – The Ecosystem for Conscious Organizations',
    description: 'Clarity through semantic intelligence. GDPR-compliant, local & secure.',
    images: ['/og-saimor.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saimôr – The Ecosystem for Conscious Organizations',
    description: 'Clarity through semantic intelligence.',
  }
};

export default function Page() {
  return (
    <main className="flex flex-col min-h-screen">
      <MoraIntroAnimation locale="en" />
      <MyceliumNetwork />
      <ScrollProgress />
      <EasterEggs />
      <CookieBanner />
      <div className="relative z-40">
        <Hero locale="en" />
        <MoraTeaser locale="en" />
        <CommunityBanner locale="en" />
        <WaitlistForm locale="en" />
        <ContactSection locale="en" />
      </div>
    </main>
  )
}
