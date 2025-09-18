type Props = { locale: 'de' | 'en' };

export default function CallToAction({ locale }: Props) {
  return (
    <section className="section">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="text-[24px] md:text-[28px] font-medium">
          {locale==='de' ? 'Schreib uns in Ruhe. Wir antworten in Ruhe.' : "Write to us in calm. We'll reply in calm."}
        </h2>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/kontakt?lichtgespraech=1"
            className="rounded-2xl px-6 py-2.5 text-sm font-medium border border-gold text-gold hover:bg-gold/10 transition-colors"
          >
            {locale==='de' ? 'Lichtgespräch buchen' : 'Book intro call'}
          </a>
          <a href="/kontakt" className="text-sm text-ink hover:underline underline-offset-4 transition-colors">
            {locale==='de' ? 'Kontakt' : 'Contact'}
          </a>
        </div>
      </div>
    </section>
  );
}
