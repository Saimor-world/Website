'use client';

export default function ContactForm({ locale = 'de' as 'de' | 'en' }) {
  const de = locale === 'de';
  const cal = process.env.NEXT_PUBLIC_CAL_URL;
  const subject = encodeURIComponent(de ? 'Anfrage an SAIMÔR' : 'SAIMÔR enquiry');

  return (
    <div className="grid gap-5">
      <p className="text-sm leading-7 text-[#e0eade]">
        {de
          ? 'Erzähl kurz, woran du arbeitest oder was in deinen Abläufen nicht zusammenpasst. Wir klären gemeinsam den nächsten sinnvollen Schritt.'
          : 'Tell us what you are working on or which parts of your workflow are disconnected. We can explore a useful next step together.'}
      </p>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a
          href={`mailto:contact@saimor.world?subject=${subject}`}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#e8c985] px-6 py-3 text-sm font-semibold text-[#193c2b] transition hover:bg-[#f6dca1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          {de ? 'E-Mail schreiben' : 'Send an email'}
        </a>
        {cal ? (
          <a
            href={cal}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#d9ddc6]/60 px-6 py-3 text-sm font-semibold text-[#fbf5e9] transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            {de ? 'Gespräch buchen' : 'Book a call'}
          </a>
        ) : null}
      </div>
      <p className="text-xs leading-6 text-[#b8c9b9]">
        {de
          ? 'Kontakt per E-Mail; bei Terminbuchungen öffnet sich der externe Kalenderanbieter.'
          : 'Email contact; if online booking is available, it opens the external calendar provider.'}
      </p>
    </div>
  );
}
