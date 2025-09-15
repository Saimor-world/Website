import Hero from '@/components/Hero';
import UserStories from '@/components/UserStories';
import Sections from '@/components/Sections';
import dynamic from 'next/dynamic';

const AIAgent = dynamic(() => import('@/components/AIAgent'), { ssr: false });

export default function Page() {
  return (
    <div>
      <Hero locale="de" />
      <UserStories locale="de" />
      <Sections locale="de" />
      <AIAgent locale="de" />
    </div>
  )
}
