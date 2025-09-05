import Link from 'next/link';

export default function Footer({ locale = 'de' as 'de' | 'en' }) {
  const impressum = locale === 'de' ? '/de/rechtliches/impressum' : '/en/legal/imprint';
  const datenschutz = locale === 'de' ? '/de/rechtliches/datenschutz' : '/en/legal/privacy';

  return (
    <footer className="bg-[#0B1020] text-[#A7AFBC] py-12 mt-24">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <span>© {new Date().getFullYear()} Saimôr</span>
        <div className="flex gap-6">
          <Link href={impressum} className="hover:underline">{locale === 'de' ? 'Impressum' : 'Imprint'}</Link>
          <Link href={datenschutz} className="hover:underline">{locale === 'de' ? 'Datenschutz' : 'Privacy'}</Link>
        </div>
      </div>
    </footer>
  );
}
