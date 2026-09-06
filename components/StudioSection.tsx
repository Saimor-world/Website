import Link from 'next/link';
import { ArrowRight, Mic2, Presentation, Wrench } from 'lucide-react';

type Props = { locale: 'de' | 'en' };

const COPY = {
  de: {
    eyebrow: 'SAIMÔR · PRODUKTSTUDIO',
    title: 'Produkte bauen. Wissen weitergeben.',
    body: 'Saimôr ist ein unabhängiges Produktstudio für souveräne KI-Systeme, digitale Arbeitsräume und ausgewählte Webprojekte.',
    founder: 'Dahinter steht Marius Fahrländer – aus IT-Systemmanagement und technischem Vertrieb. Neben der Produktarbeit bietet er Vorträge, Workshops und Schulungen an: verständlich, praktisch und ohne KI-Show.',
    cta: 'Unverbindlich sprechen',
    labels: ['Saimôr OS & Môra', 'Vorträge & Schulungen', 'Webprojekte & Prototypen'],
  },
  en: {
    eyebrow: 'SAIMÔR · PRODUCT STUDIO',
    title: 'Build products. Share what works.',
    body: 'Saimôr is an independent product studio for sovereign AI systems, digital workspaces and selected web projects.',
    founder: 'Behind it is Marius Fahrländer, with a background in IT systems management and technical sales. Alongside the products, he offers talks, workshops and training that make AI practical and understandable.',
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
      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
        <div>
          <p className="font-mono text-[10px] font-bold tracking-[.28em] text-[#D6A848]">{copy.eyebrow}</p>
          <h2 className="mt-5 max-w-xl font-serif text-4xl font-medium leading-[1.02] tracking-[-.035em] md:text-6xl">{copy.title}</h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/62 md:text-lg">{copy.body}</p>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/46 md:text-base">{copy.founder}</p>
          <Link href={`/${locale}#kontakt`} className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#D6A848]/35 px-6 py-3 text-sm font-semibold text-[#E9C981] transition hover:border-[#D6A848]/70 hover:bg-[#D6A848]/5">
            {copy.cta}<ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {copy.labels.map((label, index) => {
            const Icon = ICONS[index];
            return (
              <div key={label} className="group rounded-[1.6rem] border border-white/8 bg-white/[0.035] p-5 shadow-[8px_10px_0_rgba(0,0,0,.18)] transition hover:border-[#D6A848]/18 hover:bg-white/[0.05] md:p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#D6A848]/18 bg-[#D6A848]/[0.045]">
                    <Icon className="h-5 w-5 text-[#D6A848]" strokeWidth={1.5} />
                  </div>
                  <p className="text-sm font-semibold leading-snug text-white/72 md:text-base">{label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
