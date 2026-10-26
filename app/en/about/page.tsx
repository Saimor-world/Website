import { localeAlternates } from '@/lib/seo/alternates';
import AboutFounder from '@/components/AboutFounder';

export const metadata = {
  title: 'About – Saimôr',
  description: 'SAIMÔR is built by Marius Fahrländer, a solo founder from Stuttgart with a background in IT systems management and technical consulting.',
  alternates: localeAlternates('/en/about'),
};

export default function Page() {
  return <AboutFounder locale="en" />;
}
