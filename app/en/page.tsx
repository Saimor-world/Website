import Hero from '@/components/Hero';
import UserStories from '@/components/UserStories';
import Sections from '@/components/Sections';
import dynamic from 'next/dynamic';

const AIAgent = dynamic(() => import('@/components/AIAgent'), { ssr: false });

export default function Page() {
  return (
    <div>
      <Hero locale="en" />
      <UserStories locale="en" />
      <Sections locale="en" />
      <AIAgent locale="en" />
    </div>
  )
}
