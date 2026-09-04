import type { Metadata } from 'next';
import YoriProductPage from '@/components/YoriProductPage';

export const metadata: Metadata = {
  title: 'YORI — Creative Workspace by Saimôr',
  description: 'Ein Arbeitsraum für Research, Entwurf, Assets, Freigabe und Publishing.',
};

export default function YoriPage() {
  return <YoriProductPage locale="de" />;
}
