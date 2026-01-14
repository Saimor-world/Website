import Hero from "@/components/Hero";
import MoraTeaser from "@/components/MoraTeaser";
import CommunityBanner from "@/components/CommunityBanner";
import WaitlistForm from "@/components/WaitlistForm";
import ContactSection from "@/components/ContactSection";

export const metadata = {
  title: 'Saimôr – The Ecosystem for Conscious Organizations',
  description: 'Saimôr guides municipalities, companies and people through change. Clarity through semantic intelligence. GDPR-compliant, local & secure.',
};

export default function Page() {
  return (
    <main className="flex flex-col min-h-screen">
      <div className="relative z-10">
        <Hero locale="en" />
        <MoraTeaser locale="en" />
        <CommunityBanner locale="en" />
        <WaitlistForm locale="en" />
        <ContactSection locale="en" />
      </div>
    </main>
  );
}
