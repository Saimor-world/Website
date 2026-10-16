import StudioWorld from '@/components/StudioWorld';

export const metadata = {
  title: 'Studio – Beratung, Workshops und Umsetzung',
  description: 'SAIMÔR Studio: KI verstehen, Arbeitsabläufe gemeinsam gestalten und sinnvolle Prototypen aufbauen.',
  alternates: { canonical: '/studio', languages: { de: '/studio', en: '/en/studio' } },
};

export default function StudioPage() { return <StudioWorld locale="de" />; }
