type Props = { locale: 'de' | 'en' };

export default function Footer({ locale }: Props) {
  return (
    <footer className="band-bottom bg-[#0B1020] text-[#A7AFBC] py-12 mt-24">
      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <span>© {new Date().getFullYear()} Saimôr</span>
        <div className="flex gap-6">
          <a href="/rechtliches/impressum" className="hover:underline">
            {locale === 'de' ? 'Impressum' : 'Imprint'}
          </a>
          <a href="/rechtliches/datenschutz" className="hover:underline">
            {locale === 'de' ? 'Datenschutz' : 'Privacy'}
          </a>
        </div>
      </div>
    </footer>
  );
}
