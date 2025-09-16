import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Values from '@/components/Values';
import TargetGroups from '@/components/TargetGroups';
import VisionMindset from '@/components/VisionMindset';
import Sections from '@/components/Sections';
import dynamic from 'next/dynamic';

const AIAgent = dynamic(() => import('@/components/AIAgent'), { ssr: false });

export default function Page() {
  return (
    <div>
      <Hero locale="en" />
      <Services locale="en" />
      <Values locale="en" />
      <TargetGroups locale="en" />
      <VisionMindset locale="en" />
      <Sections locale="en" />
      <AIAgent locale="en" />
    </div>
  )
}
