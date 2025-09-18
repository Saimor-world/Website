import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Values from '@/components/Values';
import TargetGroups from '@/components/TargetGroups';
import VisionMindset from '@/components/VisionMindset';
import Sections from '@/components/Sections';
import dynamic from 'next/dynamic';

const AIAgent = dynamic(() => import('@/components/AIAgent'), { ssr: false });
const LiveChat = dynamic(() => import('@/components/LiveChat'), { ssr: false });

export default function Page() {
  return (
    <div>
      <Hero locale="de" />
      <Services locale="de" />
      <Values locale="de" />
      <TargetGroups locale="de" />
      <VisionMindset locale="de" />
      <Sections locale="de" />
      <AIAgent locale="de" />
      <LiveChat />
    </div>
  )
}
