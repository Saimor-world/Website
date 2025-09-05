// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import Navbar from '../components/Navbar'

export const metadata: Metadata = {
  metadataBase: new URL('https://saimor.world'),
  title: 'Saimôr – Klarheit im Wandel',
  description:
    'Saimôr ist ein digitaler Ort für das, was bleibt, wenn alles andere laut wird.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" data-saimor="pb-1.2">
      <body className="bg-[#0E1526] text-[#F8F7F3] antialiased">
        <Navbar locale="de" />
        {children}
      </body>
    </html>
  )
}
