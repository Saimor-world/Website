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
      <Hero locale="en" />
      <Services locale="en" />
      <TrustProof locale="en" />
      <Values locale="en" />
      <TargetGroups locale="en" />
      <VisionMindset locale="en" />
      <Testimonials locale="en" />
      <FAQ locale="en" />
      <Sections locale="en" />
      <ContactSection locale="en" />
      <AIAgent locale="en" />
      <LiveChat />
    </div>
  )
}
