import MoraProductPage from '@/components/MoraProductPage';

export const metadata = {
  title: 'MÔRA – proaktive Assistenz im Saimôr OS',
  description:
    'MÔRA arbeitet im Saimôr OS mit Dateien, Terminen, Aufgaben und Kontext. Sie behält den Stand im Blick, erkennt Veränderungen und kann nächste Schritte vorbereiten.',
  alternates: {
    canonical: '/mora',
    languages: {
      de: '/mora',
      en: '/en/mora',
    },
  },
};

export default function MoraPage() {
  return <MoraProductPage locale="de" />;
}
