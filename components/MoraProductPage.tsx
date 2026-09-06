import Link from 'next/link';
import { ArrowRight, Brain, Database, Network, Plug, ShieldCheck } from 'lucide-react';

type Props = { locale: 'de' | 'en' };

const COPY = {
  de: {
    badge: 'MÔRA · PROAKTIVE ASSISTENZ',
    title: 'Sie wartet nicht nur auf Fragen.',
    lead:
      'Môra ist die Assistenz im Saimôr OS. Sie hält offene Fäden und Zusammenhänge verfügbar, erkennt relevante Signale und bereitet nächste Schritte vor. Gespräch ist eine ihrer Fähigkeiten – nicht das Produktprinzip.',
    statusTitle: 'Was heute schon stimmt',
    statusBody:
      'Kontext, Dokumente und Beziehungen werden in der jeweiligen Saimôr-Instanz gehalten. Für Sprach- und Denkaufgaben können aktuell externe Modellanbieter genutzt werden. Welche Verbindung aktiv ist, soll sichtbar und austauschbar bleiben. Vollständig lokale Inferenz ist Zielbild, keine gegenwärtige Pauschalbehauptung.',
    cta: 'Saimôr OS ausprobieren',
    secondary: 'Technischen Ansatz lesen',
    cards: [
      ['Gedächtnis', 'Hält fest, was zusammengehört, damit Kontext nicht bei jedem Tool- oder Gesprächswechsel verschwindet.'],
      ['Aufmerksamkeit', 'Erkennt relevante Signale und entscheidet, was warten kann und was deine Aufmerksamkeit verdient.'],
      ['Vorbereitung', 'Verdichtet offene Arbeit und bereitet nachvollziehbare nächste Schritte vor, bevor du danach fragen musst.'],
      ['Handlung', 'Kann Aktionen über Systemfähigkeiten und Agents anstoßen – mit sichtbaren Grenzen und Freigaben.'],
    ],
    note:
      'Môra ist keine separate Chat-App. Sie ist die Assistenz-Persönlichkeit des Saimôr OS und kann sich über unterschiedliche Oberflächen und Kanäle bemerkbar machen.',
  },
  en: {
    badge: 'MÔRA · PROACTIVE ASSISTANCE',
    title: 'She does not just wait for questions.',
    lead:
      'Môra is the assistant inside Saimôr OS. She keeps open threads and relationships available, notices relevant signals and prepares next steps. Conversation is one of her capabilities – not the product model.',
    statusTitle: 'What is true today',
    statusBody:
      'Context, documents and relationships are held inside the relevant Saimôr instance. External model providers may currently be used for language and reasoning tasks. The active connection is intended to stay visible and replaceable. Fully local inference is a target, not a blanket claim about the current product.',
    cta: 'Try Saimôr OS',
    secondary: 'Read the technical approach',
    cards: [
      ['Memory', 'Keeps related information together so context does not disappear with every tool or conversation switch.'],
      ['Attention', 'Notices relevant signals and distinguishes what can wait from what deserves your attention.'],
      ['Preparation', 'Condenses open work and prepares traceable next steps before you have to ask for them.'],
      ['Action', 'Can trigger work through system capabilities and agents within visible boundaries and approval rules.'],
    ],
    note:
      'Môra is not a separate chat app. She is the assistant personality of Saimôr OS and can appear across different surfaces and channels.',
  },
} as const;

const ICONS = [Database, Brain, Network, ShieldCheck] as const;

export default function MoraProductPage({ locale }: Props) {
  const copy = COPY[locale];
  const securityHref = locale === 'de' ? '/de/einstieg/security-check' : '/en/entry/security-check';

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070c0d] px-6 pb-24 pt-32 text-white sm:pt-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(214,168,72,.18),transparent_34%),radial-gradient(circle_at_15%_70%,rgba(127,212,193,.10),transparent_35%)]" />
      <div className="relative mx-auto max-w-6xl">
        <header className="mx-auto max-w-4xl text-center">
          <span className="inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-[#D6A848]/25 bg-[#D6A848]/8 px-4 py-2 font-mono text-[9px] font-bold tracking-[.2em] text-[#E9C981] sm:text-[10px] sm:tracking-[.24em]"><Plug className="h-3.5 w-3.5 shrink-0" />{copy.badge}</span>
          <h1 className="mt-8 font-serif text-5xl font-light leading-[.98] tracking-[-.04em] sm:text-7xl lg:text-8xl">{copy.title}</h1>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-white/62 sm:text-xl">{copy.lead}</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={securityHref} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D6A848] px-7 py-3.5 text-sm font-bold text-[#171006] transition hover:-translate-y-0.5">{copy.cta}<ArrowRight className="h-4 w-4" /></Link>
            <Link href={locale === 'de' ? '/mora/analog-affect' : '/en/mora/analog-affect'} className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white/75 transition hover:border-white/30 hover:text-white">{copy.secondary}</Link>
          </div>
        </header>
        <section className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {copy.cards.map(([title, body], index) => { const Icon = ICONS[index]; return <article key={title} className="rounded-[1.6rem] border border-white/10 bg-white/[0.035] p-6"><Icon className="h-6 w-6 text-[#D6A848]" strokeWidth={1.5} /><h2 className="mt-8 font-serif text-2xl text-white/90">{title}</h2><p className="mt-3 text-sm leading-6 text-white/50">{body}</p></article>; })}
        </section>
        <section className="mt-12 grid gap-8 rounded-[2rem] border border-[#7fd4c1]/20 bg-[#7fd4c1]/[0.045] p-7 md:grid-cols-[.8fr_1.2fr] md:p-10">
          <div><p className="font-mono text-[10px] font-bold tracking-[.25em] text-[#7fd4c1]">STATUS · SEPTEMBER 2026</p><h2 className="mt-4 font-serif text-4xl font-light">{copy.statusTitle}</h2></div>
          <div><p className="text-base leading-7 text-white/65">{copy.statusBody}</p><p className="mt-6 border-l border-[#D6A848]/45 pl-4 font-serif text-xl italic text-[#E9C981]/85">{copy.note}</p></div>
        </section>
      </div>
    </main>
  );
}
