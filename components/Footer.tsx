import Link from 'next/link';

export default function Footer({ locale }: { locale: 'de'|'en' }) {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-white/60 flex flex-col md:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} Saimôr</p>
        <nav className="flex gap-4">
          <Link href={`/${locale}`}>Home</Link>
          <a href="mailto:contact@saimor.world">contact@saimor.world</a>
          <Link href="/de#kontakt">Kontakt</Link>
        </nav>
      </div>
    </footer>
  );
}
