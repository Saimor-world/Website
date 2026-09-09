import Link from 'next/link';
import { ArrowRight, Mic2, Presentation, Wrench } from 'lucide-react';

type Props = { locale: 'de' | 'en' };

const COPY = {
  de: {
    eyebrow: 'SAIMÔR · PRODUKTSTUDIO',
    title: 'Produkte bauen. KI verständlich machen.',
    body: 'Saimôr ist ein unabhängiges Produktstudio für souveräne KI-Systeme, digitale Arbeitsräume und ausgewählte Webprojekte. Wir verbinden Produktentwicklung mit praktischer Vermittlung und arbeiten an Systemen, die nachvollziehbar und im Alltag tatsächlich nutzbar sind.',
    studio: 'Neben der Produktarbeit bieten wir Vorträge, Workshops und Schulungen zu praktischer KI an – verständlich, konkret und ohne Buzzword-Show.',
    cta: 'Unverbindlich sprechen',
    labels: ['Saimôr OS & Môra', 'Vorträge & Schulungen', 'Webprojekte & Prototypen'],
  },
  en: {
    eyebrow: 'SAIMÔR · PRODUCT STUDIO',
    title: 'Build products. Make AI understandable.',
    body: 'Saimôr is an independent product studio for sovereign AI systems, digital workspaces and selected web projects. We combine hands-on product development with practical communication and build systems that are traceable and genuinely useful in everyday work.',
    studio: 'Alongside product work, we offer talks, workshops and practical AI training – clear, concrete and without buzzword theatre.',
    cta: 'Start a conversation',
    labels: ['Saimôr OS & Môra', 'Talks & training', 'Web projects & prototypes'],
  },
} as const;

const ICONS = [Wrench, Mic2, Presentation] as const;

export default function StudioSection({ locale }: Props) {
  const copy = COPY[locale];
  return (
    <section id="studio" className="relative overflow-hidden border-t border-white/8 bg-[#0b1213] px-6 py-20 text-white md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(214,168,72,.10),transparent_34%),radial-gradient(circle_at_85%_80%,rgba(127,212,193,.08),transparent_32%)]" />
      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div>
          <p className="font-mono text-[10px] font-bold tracking-[.28em] text-[#D6A848]">{copy.eyebrow}</p>
          <h2 className="mt-5 max-w-xl font-serif text-4xl font-medium leading-[1.02] tracking-[-.035em] md:text-6xl">{copy.title}</h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/62 md:text-lg">{copy.body}</p>
          <Link href={`/${locale}#kontakt`} className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#D6A848]/35 px-6 py-3 text-sm font-semibold text-[#E9C981] transition hover:border-[#D6A848]/70 hover:bg-[#D6A848]/5">
            {copy.cta}<ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-7 shadow-[12px_14px_0_rgba(0,0,0,.24)] md:p-9">
          <p className="font-serif text-2xl italic leading-relaxed text-white/78 md:text-3xl">{copy.studio}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {copy.labels.map((label, index) => {
              const Icon = ICONS[index];
              return <div key={label} className="rounded-2xl border border-white/8 bg-black/20 p-4"><Icon className="h-5 w-5 text-[#D6A848]" strokeWidth={1.5} /><p className="mt-5 text-sm leading-snug text-white/62">{label}</p></div>;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
