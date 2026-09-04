import Hero from '@/components/Hero';
import YoriSection from '@/components/YoriSection';
import DeskSection from '@/components/DeskSection';
import OsSection from '@/components/OsSection';
import ContactSection from '@/components/ContactSection';
import MyceliumNetworkLazy from '@/components/MyceliumNetworkLazy';
import StudioSection from '@/components/StudioSection';

export const metadata = {
  title: 'Saimôr – Souveräne KI-Systeme und digitale Räume',
  description: 'Das unabhängige Produktstudio von Marius Fahrländer: Saimôr OS, Môra, YORI und ausgewählte Webprojekte. Souverän, nachvollziehbar und im Aufbau.',
};

export default function Page() {
  return (
    <main className="flex flex-col min-h-screen">
      <MyceliumNetworkLazy />
      <div className="relative z-10">
        <Hero locale="de" />
        <OsSection locale="de" />
        <YoriSection locale="de" />
        <DeskSection locale="de" />
        <StudioSection locale="de" />
        <ContactSection locale="de" />
      </div>
    </main>
  );
}
