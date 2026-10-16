import StudioWorld from '@/components/StudioWorld';

export const metadata = {
  title: 'Studio – Consulting, workshops and implementation',
  description: 'SAIMÔR Studio: make sense of AI, design better workflows together and build meaningful prototypes.',
  alternates: { canonical: '/en/studio', languages: { de: '/studio', en: '/en/studio' } },
};

export default function StudioPage() { return <StudioWorld locale="en" />; }
