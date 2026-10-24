import Link from 'next/link';

type Locale = 'de' | 'en';

const COPY = {
  en: {
    eyebrow: 'SAIMÔR / ABOUT',
    title: 'One founder, building in the open.',
    intro:
      'SAIMÔR is built by Marius Fahrländer, a 26-year-old solo founder from Stuttgart, Germany.',
    facts: [
      ['Name', 'Marius Fahrländer'],
      ['Based in', 'Stuttgart, Germany'],
      ['Background', 'IT systems management and technical consulting'],
      ['Role', 'Solo founder of SAIMÔR'],
    ],
    storyTitle: 'Not a conventional engineer.',
    story: [
      'My background is IT systems management and technical consulting, not a classic software engineering career. I learn by building: the website, the OS, MÔRA and the infrastructure behind them are how I learn.',
      'SAIMÔR is not another chatbot. It is an operating environment where intelligence, context, infrastructure and real-world execution come together. Models will keep changing. What people decide, know and approve should not get lost along the way.',
      'It is early, and I say so openly. What you see here is work in progress, built carefully and honestly.',
    ],
    ctaTitle: 'Want to talk?',
    ctaText: 'I am happy to hear from people who want to build, test or challenge this.',
    contact: 'Get in touch',
    contactHref: '/en/contact',
    mail: 'contact@saimor.world',
  },
  de: {
    eyebrow: 'SAIMÔR / ÜBER UNS',
    title: 'Ein Gründer, der offen baut.',
    intro: 'SAIMÔR wird von Marius Fahrländer gebaut, 26 Jahre alt, Solo-Gründer aus Stuttgart.',
    facts: [
      ['Name', 'Marius Fahrländer'],
      ['Sitz', 'Stuttgart'],
      ['Hintergrund', 'IT-Systemmanagement und technische Beratung'],
      ['Rolle', 'Solo-Gründer von SAIMÔR'],
    ],
    storyTitle: 'Kein klassischer Entwickler.',
    story: [
      'Mein Hintergrund ist IT-Systemmanagement und technische Beratung, keine klassische Laufbahn als Softwareentwickler. Ich lerne, indem ich baue: Die Website, das OS, MÔRA und die Infrastruktur dahinter sind mein Weg, zu lernen.',
      'SAIMÔR ist kein weiterer Chatbot. Es ist eine Arbeitsumgebung, in der Intelligenz, Kontext, Infrastruktur und echte Umsetzung zusammenkommen. Modelle werden sich weiter verändern. Was Menschen entscheiden, wissen und freigeben, soll dabei nicht verloren gehen.',
      'Es ist früh, und das sage ich offen. Was du hier siehst, ist im Aufbau – sorgfältig und ehrlich gebaut.',
    ],
    ctaTitle: 'Lust auf ein Gespräch?',
    ctaText: 'Ich freue mich über Menschen, die mitbauen, testen oder kritisch nachfragen wollen.',
    contact: 'Kontakt aufnehmen',
    contactHref: '/de/kontakt',
    mail: 'contact@saimor.world',
  },
} as const;

export default function AboutFounder({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  return (
    <div data-contact-page data-about-page className="min-h-screen bg-[#f4f1e8] px-6 pb-24 pt-28 text-[#193a2b] sm:pt-36">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] font-semibold tracking-[.22em] text-[#53735c]">{c.eyebrow}</p>
        <h1 className="mt-5 max-w-4xl font-serif text-5xl font-normal leading-[1.02] tracking-[-.04em] sm:text-7xl">{c.title}</h1>
        <p className="mt-7 max-w-2xl text-base leading-8 text-[#496250] sm:text-lg">{c.intro}</p>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_.9fr] lg:gap-20">
          <section aria-labelledby="about-story">
            <h2 id="about-story" className="font-serif text-4xl tracking-[-.025em]">{c.storyTitle}</h2>
            <div className="mt-6 space-y-5 border-t border-[#8fa493]/60 pt-6 text-[15px] leading-7 text-[#3f5a48]">
              {c.story.map((p) => <p key={p}>{p}</p>)}
            </div>
          </section>

          <aside className="self-start rounded-[1.6rem] bg-[#173a2b] p-7 text-[#f4f1e8] sm:p-9">
            <dl className="divide-y divide-white/10">
              {c.facts.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[110px_1fr] gap-4 py-3.5 text-sm">
                  <dt className="font-mono text-[11px] uppercase tracking-[.16em] text-[#e7cd8c]/80">{k}</dt>
                  <dd className="text-white/85">{v}</dd>
                </div>
              ))}
            </dl>
            <h3 className="mt-8 font-serif text-3xl font-light">{c.ctaTitle}</h3>
            <p className="mt-3 text-sm leading-6 text-white/70">{c.ctaText}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={c.contactHref} className="inline-flex min-h-11 items-center rounded-full bg-[#e7cd8c] px-5 text-sm font-semibold text-[#173a2b] transition hover:bg-[#f3dda4]">{c.contact}</Link>
              <a href={`mailto:${c.mail}`} className="inline-flex min-h-11 items-center rounded-full border border-white/25 px-5 text-sm text-white/85 transition hover:border-white/50">{c.mail}</a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
