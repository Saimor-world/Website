import type { Metadata } from 'next';
import LuanaYoriPreview from '@/components/LuanaYoriPreview';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Luana · Deine World',
  description: 'Ein persönlicher erster Blick in die YORI World für Luana.',
  robots: { index: false, follow: false, noarchive: true, nosnippet: true },
  alternates: { canonical: null, languages: {} },
  openGraph: {
    title: 'Luana · Deine World',
    description: 'Ein persönlicher erster Blick in die YORI World für Luana.',
    siteName: 'YORI · Saimôr',
    type: 'website',
    images: [],
  },
  twitter: {
    card: 'summary',
    title: 'Luana · Deine World',
    description: 'Ein persönlicher erster Blick in die YORI World für Luana.',
    images: [],
  },
};

export default function LuanaWorldPreview() {
  return <LuanaYoriPreview />;
}
