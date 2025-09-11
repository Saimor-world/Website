import Hero from '../components/Hero';
import Principles from '../components/Principles';
import Services from '../components/Services';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

export default function Page() {
  return (
    <>
      {/* Root-Fallback zum Debuggen. /de bleibt unverändert. */}
      <Hero locale="de" />
      <Principles locale="de" />
      <Services locale="de" />
      <CallToAction locale="de" />
      <Footer locale="de" />
    </>
  );
}
