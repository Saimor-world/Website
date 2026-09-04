import Link from 'next/link';
import { ArrowRight, PanelsTopLeft, PencilRuler } from 'lucide-react';
import MoraSystemPreview from '@/components/MoraSystemPreview';

const COPY = {
  de: {
    proof: 'SO ARBEITET MÔRA',
    title: 'Kontext rein. Nächster Schritt raus.',
    status: 'Funktionsprinzip · mit getrennten Demo-Daten',
    open: 'Im OS ausprobieren',
    products: 'PRODUKTE',
    productTitle: 'Eine Grundlage. Mehrere Arbeitsräume.',
    cards: [
      ['YORI', 'Arbeitsraum für Research, Ideen und Publishing.', 'Prototyp', '/yori', PencilRuler],
      ['DESK', 'Tagesansicht für Mail, Termine und offene Vorgänge.', 'Im Aufbau', '/demo?track=ai-business', PanelsTopLeft],
    ],
    pilot: 'PILOTPROJEKTE',
    pilotTitle: 'Ein echter Ablauf. Ein begrenzter Pilot. Danach eine Entscheidung.',
    pilotBody: 'Saimôr wird aktuell nicht als Standard-Abo verkauft. Geeignete Abläufe werden gemeinsam geprüft und in einer getrennten Umgebung prototypisch umgesetzt.',
    pilotCta: 'Projekt anfragen',
  },
  en: {
    proof: 'HOW MÔRA WORKS',
    title: 'Context in. A clear next step out.',
    status: 'Operating principle · isolated demo data',
    open: 'Try it in the OS',
    products: 'PRODUCTS',
    productTitle: 'One foundation. Several workspaces.',
    cards: [
      ['YORI', 'Workspace for research, ideas and publishing.', 'Prototype', '/en/yori', PencilRuler],
      ['DESK', 'Daily view for mail, calendar and open work.', 'In development', '/demo?track=ai-business', PanelsTopLeft],
    ],
    pilot: 'PILOT PROJECTS',
    pilotTitle: 'One real workflow. One limited pilot. Then a decision.',
    pilotBody: 'Saimôr is not currently sold as a standard subscription. Suitable workflows are assessed together and prototyped in a separated environment.',
    pilotCta: 'Discuss a project',
  },
} as const;

export default function HomeShowcase({ locale }: { locale: 'de' | 'en' }) {
  const copy = COPY[locale];
  return (
    <>
      <section id="mora-preview" className="border-t border-white/8 bg-[#081112] px-5 py-16 text-white sm:px-7 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div><p className="font-mono text-xs font-semibold tracking-[.2em] text-[#d6a848]">{copy.proof}</p><h2 className="mt-4 font-serif text-4xl leading-none text-[#f4efe6] sm:text-5xl">{copy.title}</h2></div>
            <div className="flex items-center gap-4"><span className="text-sm text-white/35">{copy.status}</span><Link href={locale === 'de' ? '/de/einstieg/security-check' : '/en/entry/security-check'} className="hidden items-center gap-2 text-sm font-semibold text-[#d6a848] md:inline-flex">{copy.open}<ArrowRight className="h-4 w-4" /></Link></div>
          </div>
          <MoraSystemPreview compact />
          <Link href={locale === 'de' ? '/de/einstieg/security-check' : '/en/entry/security-check'} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#d6a848] md:hidden">{copy.open}<ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      <section id="produkte" className="border-t border-white/8 bg-[#0a0f10] px-5 py-14 text-white sm:px-7 md:py-20">
        <div className="mx-auto max-w-7xl"><p className="font-mono text-xs font-semibold tracking-[.2em] text-[#d6a848]">{copy.products}</p><h2 className="mt-4 font-serif text-3xl text-white/88 sm:text-4xl">{copy.productTitle}</h2>
          <div className="mt-8 grid gap-3 md:grid-cols-2">{copy.cards.map(([name, body, status, href, Icon]) => <Link key={name} href={href} className="group grid grid-cols-[auto_1fr_auto] gap-4 rounded-2xl border border-white/8 bg-white/[.025] p-5 transition hover:border-white/16"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-[#d6a848]"><Icon className="h-5 w-5" /></span><span><strong className="text-sm tracking-[.12em] text-white/88">{name}</strong><span className="mt-2 block text-base text-white/48">{body}</span><span className="mt-3 block text-xs uppercase tracking-[.14em] text-white/28">{status}</span></span><ArrowRight className="mt-1 h-4 w-4 text-white/25 transition-transform group-hover:translate-x-1" /></Link>)}</div>
        </div>
      </section>

      <section id="pilot" className="border-t border-white/8 bg-[#070b0c] px-5 py-16 text-white sm:px-7 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.1fr_.9fr] md:items-end"><div><p className="font-mono text-xs font-semibold tracking-[.2em] text-[#d6a848]">{copy.pilot}</p><h2 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.02] text-white/90 sm:text-5xl">{copy.pilotTitle}</h2></div><div><p className="text-base leading-7 text-white/48">{copy.pilotBody}</p><Link href={`/${locale}#kontakt`} className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#f0ece3] px-6 py-3 text-sm font-bold text-[#0b1111]">{copy.pilotCta}<ArrowRight className="h-4 w-4" /></Link></div></div>
      </section>
    </>
  );
}
