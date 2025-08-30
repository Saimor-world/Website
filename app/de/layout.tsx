import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../globals.css';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });
const corm = Cormorant_Garamond({ subsets: ['latin'] , weight: ['400','500','600','700'] });

export const metadata: Metadata = {
  title: 'Saimôr – Klarheit im Wandel',
  description: 'Ein Resonanzraum für Klarheit. Brücke zwischen Menschen, Daten und Wandel.',
  metadataBase: new URL('https://saimor.world'),
  openGraph: {
    title: 'Saimôr – Klarheit im Wandel',
    description: 'Ein Resonanzraum für Klarheit. Brücke zwischen Menschen, Daten und Wandel.',
    url: 'https://saimor.world',
    siteName: 'Saimôr',
    images: ['/og.png'],
    locale: 'de-DE',
    type: 'website'
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="de" className="bg-navy text-paper">
      <body className={inter.className}>
        <div className="min-h-screen bg-radial-orbit">
          <Navbar locale="de" />
          <main className="">{children}</main>
          <Footer locale="de" />
        </div>
      </body>
    </html>
  )
}
