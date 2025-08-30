import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../globals.css';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });
const corm = Cormorant_Garamond({ subsets: ['latin'] , weight: ['400','500','600','700'] });

export const metadata: Metadata = {
  title: 'Saimôr – Clarity in Change',
  description: 'A resonance space for clarity. A bridge between people, data, and change.',
  metadataBase: new URL('https://saimor.world'),
  openGraph: {
    title: 'Saimôr – Clarity in Change',
    description: 'A resonance space for clarity. A bridge between people, data, and change.',
    url: 'https://saimor.world',
    siteName: 'Saimôr',
    images: ['/og.png'],
    locale: 'en-EN',
    type: 'website'
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="bg-navy text-paper">
      <body className={inter.className}>
        <div className="min-h-screen bg-radial-orbit">
          <Navbar locale="en" />
          <main className="">{children}</main>
          <Footer locale="en" />
        </div>
      </body>
    </html>
  )
}
