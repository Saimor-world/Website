import Hero from "@/components/Hero";
import OsSection from "@/components/OsSection";
import ContactSection from "@/components/ContactSection";
import MyceliumNetworkLazy from "@/components/MyceliumNetworkLazy";
import StudioSection from "@/components/StudioSection";
import MobileProductShelf from "@/components/MobileProductShelf";

export const metadata = {
  title: 'Saimôr – Sovereign AI systems and digital spaces',
  description: 'Marius Fahrländer’s independent product studio: Saimôr OS, Môra, YORI and selected web projects. Sovereign, traceable and in development.',
};

export default function Page() {
  return (
    <main className="flex flex-col min-h-screen">
      <MyceliumNetworkLazy />
      <div className="relative z-10">
        <Hero locale="en" />
        <OsSection locale="en" />
        <MobileProductShelf locale="en" />
        <StudioSection locale="en" />
        <ContactSection locale="en" />
      </div>
    </main>
  );
}
