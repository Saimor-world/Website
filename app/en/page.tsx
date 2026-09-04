import ContactSection from '@/components/ContactSection';
import Hero from '@/components/Hero';
import HomeShowcase from '@/components/HomeShowcase';

export const metadata = {
  title: 'Saimôr – AI workspaces with dedicated context',
  description: 'Saimôr builds AI workspaces with Môra: separated data spaces, traceable actions and concrete pilot projects.',
};

export default function Page() {
  return <main className="min-h-screen"><Hero locale="en" /><HomeShowcase locale="en" /><ContactSection locale="en" /></main>;
}
