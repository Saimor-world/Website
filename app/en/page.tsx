import YoriGate from '@/components/YoriGate';
import HomepageReframe from '@/components/HomepageReframe';
import LivingForestWorld from '@/components/LivingForestWorld';

export const metadata = {
  title: 'Saimôr – OS, Môra and sovereign AI systems',
  description: 'Saimôr connects workspace, data and AI into a system that keeps context. With Saimôr OS, Môra, talks, training and prototypes.',
};

export default function Page() {
  return (
    <>
      <HomepageReframe />
      <LivingForestWorld locale="en" />
      <YoriGate locale="en" />
    </>
  );
}
