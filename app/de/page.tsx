import type { Metadata } from 'next';
import YoriGate from '@/components/YoriGate';
import LivingForestWorld from '@/components/LivingForestWorld';

const PAGE_TITLE = 'Saimôr – Klarheit im Wandel';
const PAGE_DESCRIPTION = 'Saimôr verbindet Arbeit, Daten und KI zu einem System, das Kontext behält. Mit MÔRA, Saimôr OS, YORI sowie Beratung, Workshops und Umsetzung.';

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/de',
    siteName: 'Saimôr',
    images: ['/og'],
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ['/og'],
  },
};

export default function Page() {
  return (
    <>
      <LivingForestWorld locale="de" />
      <YoriGate locale="de" />
    </>
  );
}
