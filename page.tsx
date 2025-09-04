import Hero from '../../components/Hero';
import Principles from '../../components/Principles';
import Services from '../../components/Services';
import CallToAction from '../../components/CallToAction';
import Footer from '../../components/Footer';

export const metadata = {
  metadataBase: new URL('https://saimor.world'),
  title: 'Saimôr – Klarheit im Wandel',
  description:
    'Saimôr ist ein digitaler Ort für das, was bleibt, wenn alles andere laut wird. Klarheit im Wandel – Begleitung für Menschen und Organisationen, wenn Systeme schwanken.',
};

export default function Page() {
  return (
    <main className="min-h-screen">
      <Hero locale="de" />
      <Principles locale="de" />
      <Services locale="de" />
      <CallToAction locale="de" />
      <Footer locale="de" />
    </main>
  );
}
