import Hero from '@/components/Hero';
import Services from '@/components/Services';
import TrustProof from '@/components/TrustProof';
import Values from '@/components/Values';
import TargetGroups from '@/components/TargetGroups';
import VisionMindset from '@/components/VisionMindset';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Sections from '@/components/Sections';
import ContactSection from '@/components/ContactSection';
import dynamic from 'next/dynamic';

const AIAgent = dynamic(() => import('@/components/AIAgent'), { ssr: false });
const LiveChat = dynamic(() => import('@/components/LiveChat'), { ssr: false });

export default function Page() {
  return (
    <div>
      <Hero locale="de" />
      <Services locale="de" />
      <TrustProof locale="de" />
      <Values locale="de" />
      <TargetGroups locale="de" />
      <VisionMindset locale="de" />
      <Testimonials locale="de" />
      <FAQ locale="de" />
      <Sections locale="de" />
      <ContactSection locale="de" />
      <AIAgent locale="de" />
      <LiveChat />
    </div>
  )
}
