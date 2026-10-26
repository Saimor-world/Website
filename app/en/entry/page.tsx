import { localeAlternates } from '@/lib/seo/alternates';
import EntryHub from '@/components/EntryHub';

export const metadata = {
  alternates: localeAlternates('/en/entry'),
  title: 'Entry: AI & Security – Saimôr',
  description:
    'Structured entry layer for Digital Self, free Security Check and AI quick wins for local businesses.',
};

export default function EntryPageEn() {
  return <EntryHub locale="en" />;
}

