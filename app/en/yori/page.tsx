import type { Metadata } from 'next';
import YoriProductPage from '@/components/YoriProductPage';

export const metadata: Metadata = {
  title: 'YORI — Creative Workspace by Saimôr',
  description: 'A workspace for research, drafts, assets, approval and publishing.',
};

export default function YoriPage() {
  return <YoriProductPage locale="en" />;
}
