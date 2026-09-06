import HeroDemo from '@/components/HeroDemo';
import OsSection from '@/components/OsSection';
import ContactSection from '@/components/ContactSection';
import MyceliumNetworkLazy from '@/components/MyceliumNetworkLazy';
import StudioSection from '@/components/StudioSection';
import MobileProductShelf from '@/components/MobileProductShelf';

export const metadata = {
  title: 'Saimôr – Souveräne KI-Systeme und digitale Räume',
  description: 'Das unabhängige Produktstudio von Marius Fahrländer: Saimôr OS, Môra, YORI und ausgewählte Webprojekte. Souverän, nachvollziehbar und im Aufbau.',
};

export default function Page() {
  return (
    <main className="flex flex-col min-h-screen">
      <MyceliumNetworkLazy />
      <div className="relative z-10">
        <HeroDemo locale="de" />
        <OsSection locale="de" />
        <MobileProductShelf locale="de" />
        <StudioSection locale="de" />
        <ContactSection locale="de" />
      </div>
    </main>
  );
}
