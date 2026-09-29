import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: { absolute: 'Einloggen – Saimôr' },
  robots: { index: false, follow: false, noarchive: true },
};
export default function LoginLayout({ children }: { children: React.ReactNode }) { return children; }
