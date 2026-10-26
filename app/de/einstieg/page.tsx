import { localeAlternates } from '@/lib/seo/alternates';
import EntryHub from '@/components/EntryHub';

export const metadata = {
  alternates: localeAlternates('/de/einstieg'),
  title: 'Einstieg: KI & Sicherheit – Saimôr',
  description:
    'Strukturierte Einstiegsebene fuer Digital Self, Security-Check und AI Quick Wins fuer lokale Businesses.',
};

export default function EntryPageDe() {
  return <EntryHub locale="de" />;
}

