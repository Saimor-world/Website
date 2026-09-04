import ContactSection from '@/components/ContactSection';
import Hero from '@/components/Hero';
import HomeShowcase from '@/components/HomeShowcase';

export const metadata = {
  title: 'Saimôr – KI-Arbeitsräume mit eigenem Kontext',
  description: 'Saimôr entwickelt KI-Arbeitsräume mit Môra: getrennte Datenräume, nachvollziehbare Handlungen und konkrete Pilotprojekte.',
};

export default function Page() {
  return <main className="min-h-screen"><Hero locale="de" /><HomeShowcase locale="de" /><ContactSection locale="de" /></main>;
}
