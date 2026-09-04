import Link from 'next/link';
import { ArrowRight, Check, CircleDot, Server, ShieldCheck } from 'lucide-react';
import MoraSystemPreview from '@/components/MoraSystemPreview';

const COPY = {
  de: {
    eyebrow: 'MÔRA / AGENTENSCHICHT', title: 'Kontext bleibt verfügbar.',
    intro: 'Môra verbindet Informationen aus einem Arbeitsbereich, bereitet nächste Schritte vor und zeigt vor jeder Aktion, was passieren würde.',
    primary: 'Demo prüfen', secondary: 'Technik & Grenzen', state: 'STAND HEUTE', stateTitle: 'Klar getrennt zwischen verfügbar und geplant.',
    facts: [
      ['Arbeitskontext', 'Projektbezogen gespeichert', Server],
      ['Modellzugriff', 'Externe Anbieter möglich', CircleDot],
      ['Aktionen', 'Vorbereitet, Freigabe sichtbar', ShieldCheck],
      ['Lokale Inferenz', 'Zielbild, noch nicht Standard', Check],
    ],
    close: 'Môra im getrennten Demo-Ablauf prüfen.',
    closeBody: 'Der Einstieg beginnt mit einem Security Check und endet in einem isolierten Beispielarbeitsbereich. Kein Konto erforderlich.',
  },
  en: {
    eyebrow: 'MÔRA / AGENT LAYER', title: 'Context stays available.',
    intro: 'Môra connects information inside a workspace, prepares the next step and shows what would happen before any action is taken.',
    primary: 'Review the demo', secondary: 'Technology & limits', state: 'CURRENT STATE', stateTitle: 'A clear line between available and planned.',
    facts: [
      ['Workspace context', 'Stored per project', Server],
      ['Model access', 'External providers possible', CircleDot],
      ['Actions', 'Prepared, approval visible', ShieldCheck],
      ['Local inference', 'Target state, not the default yet', Check],
    ],
    close: 'Review Môra in the isolated demo flow.',
    closeBody: 'The entry starts with a security check and ends in an isolated sample workspace. No account is required.',
  },
} as const;

export default function MoraProductPage({ locale }: { locale: 'de' | 'en' }) {
  const copy = COPY[locale];
  const demoHref = locale === 'de' ? '/de/einstieg/security-check' : '/en/entry/security-check';
  return (
    <main className="min-h-screen bg-[#071011] text-white">
      <section className="px-5 pb-16 pt-32 sm:px-7 md:pb-24 md:pt-40">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
          <div>
            <p className="font-mono text-xs font-semibold tracking-[.22em] text-[#d6a848]">{copy.eyebrow}</p>
            <h1 className="mt-6 max-w-xl font-serif text-[clamp(3.7rem,8vw,7.2rem)] leading-[.88] tracking-[-.045em] text-[#f3eee4]">{copy.title}</h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/52 sm:text-lg">{copy.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={demoHref} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#f0ece3] px-6 py-3 text-sm font-bold text-[#0b1111]">{copy.primary}<ArrowRight className="h-4 w-4" /></Link>
              <Link href={locale === 'de' ? '/de/analog-affect' : '/en/analog-affect'} className="inline-flex min-h-12 items-center rounded-full border border-white/12 px-6 py-3 text-sm font-semibold text-white/65">{copy.secondary}</Link>
            </div>
          </div>
          <MoraSystemPreview />
        </div>
      </section>
      <section className="border-y border-white/8 bg-[#091415] px-5 py-16 sm:px-7 md:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs font-semibold tracking-[.22em] text-[#d6a848]">{copy.state}</p>
          <h2 className="mt-4 max-w-3xl font-serif text-3xl text-white/88 sm:text-4xl">{copy.stateTitle}</h2>
          <div className="mt-9 grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 md:grid-cols-2">
            {copy.facts.map(([label, value, Icon]) => <div key={label} className="flex items-start gap-4 bg-[#091415] p-5 sm:p-6"><Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#78ceb7]" /><div><p className="text-sm font-semibold text-white/82">{label}</p><p className="mt-1 text-sm text-white/42">{value}</p></div></div>)}
          </div>
        </div>
      </section>
      <section className="px-5 py-16 sm:px-7 md:py-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 rounded-[1.75rem] border border-white/9 bg-white/[.025] p-7 md:flex-row md:items-center md:justify-between md:p-10">
          <div><h2 className="font-serif text-3xl text-white/88">{copy.close}</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-white/45">{copy.closeBody}</p></div>
          <Link href={demoHref} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#d6a848] px-6 py-3 text-sm font-bold text-[#17130b]">{copy.primary}<ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </main>
  );
}
