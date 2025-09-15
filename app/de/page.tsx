import Hero from '@/components/Hero';
import UserStories from '@/components/UserStories';
import Sections from '@/components/Sections';
import AIAgent from '@/components/AIAgent';

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
