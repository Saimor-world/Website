import type { Metadata } from 'next';
import YoriGate from '@/components/YoriGate';
import LivingForestWorld from '@/components/LivingForestWorld';

const PAGE_TITLE = 'Saimôr – Clarity through change';
const PAGE_DESCRIPTION = 'Saimôr connects work, data and AI into a system that keeps context. With MÔRA, Saimôr OS, YORI plus consulting, workshops and implementation.';

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/en',
    siteName: 'Saimôr',
    images: ['/og'],
    locale: 'en_US',
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
      <LivingForestWorld locale="en" />
      <YoriGate locale="en" />
    </>
  );
}
