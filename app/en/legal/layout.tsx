import LegalShell from '@/components/LegalShell';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  description: 'Legal information and transparent terms for Saimôr World.',
};

export default function EnglishLegalLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <LegalShell locale="en">{children}</LegalShell>;
}
