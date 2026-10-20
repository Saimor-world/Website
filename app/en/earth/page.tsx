import type { Metadata } from 'next';
import EarthLandingPage from '@/components/EarthLandingPage';

export const metadata: Metadata = {
  title: 'Earth: Places remember',
  description:
    'Earth connects stories, knowledge and change to real places – as a calm map and timeline. For municipalities, archives and everyone who wants to preserve their history.',
  alternates: {
    canonical: '/en/earth',
    languages: {
      de: '/earth',
      en: '/en/earth',
    },
  },
};

export default function EarthPage() {
  return <EarthLandingPage locale="en" />;
}
