import Hero from '@/components/Hero';
import UserStories from '@/components/UserStories';
import Sections from '@/components/Sections';
import AIAgent from '@/components/AIAgent';

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
