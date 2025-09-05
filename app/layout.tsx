import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  metadataBase: new URL('https://saimor.world'),
  title: 'Saimôr – Klarheit im Wandel',
  description: 'Saimôr ist ein digitaler Ort für das, was bleibt, wenn alles andere laut wird.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" data-saimor="pb-1.1b">
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
