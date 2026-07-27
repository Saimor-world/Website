import LegalShell from '@/components/LegalShell';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  description: 'Rechtliche Informationen und transparente Bedingungen für Saimôr World.',
};

export default function GermanLegalLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <LegalShell locale="de">{children}</LegalShell>;
}
