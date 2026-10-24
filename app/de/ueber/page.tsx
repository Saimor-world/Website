import AboutFounder from '@/components/AboutFounder';

export const metadata = {
  title: 'Über uns – Saimôr',
  description: 'SAIMÔR wird von Marius Fahrländer gebaut, Solo-Gründer aus Stuttgart mit Hintergrund in IT-Systemmanagement und technischer Beratung.',
  alternates: { languages: { de: '/de/ueber', en: '/en/about' } },
};

export default function Page() {
  return <AboutFounder locale="de" />;
}
