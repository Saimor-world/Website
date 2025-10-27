import Hero from '@/components/Hero';
import Services from '@/components/Services';
import MoraIntro from '@/components/MoraIntro';
import DashboardPreview from '@/components/DashboardPreview';
import SystemsSection from '@/components/SystemsSection';
import TrustProof from '@/components/TrustProof';
import FAQ from '@/components/FAQ';
import LiveKPICard from '@/components/LiveKPICard';
import ContactSection from '@/components/ContactSection';
import dynamic from 'next/dynamic';

const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'), { ssr: false });
const EasterEggs = dynamic(() => import('@/components/EasterEggs'), { ssr: false });
const MoraChat = dynamic(() => import('@/components/MoraChat'), { ssr: false });
const CookieBanner = dynamic(() => import('@/components/CookieBanner'), { ssr: false });

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
      <ScrollProgress />
      <EasterEggs />
      <CookieBanner />
      <div>
        <Hero locale="de" />
        <Services locale="de" />
        <MoraIntro locale="de" />
        <DashboardPreview locale="de" />
        <SystemsSection locale="de" />
        <TrustProof locale="de" />
        <FAQ locale="de" />

        {/* Live Dashboard Section */}
        <section className="py-16 bg-gradient-to-b from-white to-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  background: 'linear-gradient(135deg, #4A6741 0%, #D4B483 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Live Dashboard
              </h2>
              <p className="text-gray-600">Echtzeitdaten von Môras Aktivitäten</p>
            </div>
            <LiveKPICard />
          </div>
        </section>

        <ContactSection locale="de" />
        <MoraChat />
      </div>
    </>
  )
}
