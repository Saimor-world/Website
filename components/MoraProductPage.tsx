import Link from 'next/link';
import { ArrowRight, Brain, Database, Network, Plug, ShieldCheck } from 'lucide-react';

type Props = { locale: 'de' | 'en' };

const COPY = {
  de: {
    badge: 'MÔRA · KONTEXT- UND AGENTENSCHICHT', title: 'Sie hält den Zusammenhang.',
    lead: 'Môra ist die KI-Schicht innerhalb von Saimôr. Sie verbindet Wissen, erinnert offene Fäden und bereitet nächste Schritte vor — nicht als allwissende Figur, sondern als nachvollziehbares System im eigenen Arbeitskontext.',
    statusTitle: 'Was heute schon stimmt',
    statusBody: 'Kontext, Dokumente und Beziehungen werden in der jeweiligen Saimôr-Instanz gehalten. Für Sprach- und Denkaufgaben können aktuell externe Modellanbieter genutzt werden. Welche Verbindung aktiv ist, soll sichtbar und austauschbar bleiben. Vollständig lokale Inferenz ist Zielbild, keine gegenwärtige Pauschalbehauptung.',
    cta: 'Isolierte OS-Demo starten', secondary: 'Technischen Ansatz lesen',
    cards: [['Gedächtnis', 'Hält fest, was zusammengehört, damit Kontext nicht mit jedem neuen Chat verschwindet.'], ['Orientierung', 'Verdichtet offene Vorgänge, Signale und Entscheidungen zu einem nächsten nachvollziehbaren Schritt.'], ['Handlung', 'Bereitet Aktionen vor und macht sichtbar, was automatisiert wurde und was noch Freigabe braucht.'], ['Souveränität', 'Eigene Datenräume, transparente Modellanbindung und keine heimliche Vermischung mit fremden Kundenkonten.']],
    note: 'Môra ist Teil des OS und zugleich die gemeinsame Agentenschicht für YORI, Desk und künftige Saimôr-Produkte.',
  },
  en: {
    badge: 'MÔRA · CONTEXT AND AGENT LAYER', title: 'She keeps the context intact.',
    lead: 'Môra is the AI layer inside Saimôr. She connects knowledge, remembers open threads and prepares next steps — not as an all-knowing character, but as a traceable system within your own working context.',
    statusTitle: 'What is true today',
    statusBody: 'Context, documents and relationships are held inside the relevant Saimôr instance. External model providers may currently be used for language and reasoning tasks. The active connection is intended to stay visible and replaceable. Fully local inference is a target, not a blanket claim about the current product.',
    cta: 'Launch isolated OS demo', secondary: 'Read the technical approach',
    cards: [['Memory', 'Keeps related information together so context does not disappear with every new chat.'], ['Orientation', 'Condenses open work, signals and decisions into one traceable next step.'], ['Action', 'Prepares actions and shows what was automated and what still needs approval.'], ['Sovereignty', 'Dedicated data spaces, transparent model connections and no hidden mixing with other customer accounts.']],
    note: 'Môra is part of the OS and the shared agent layer for YORI, Desk and future Saimôr products.',
  },
} as const;

const ICONS = [Database, Brain, Network, ShieldCheck] as const;

export default function MoraProductPage({ locale }: Props) {
  const copy = COPY[locale];
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070c0d] px-6 pb-24 pt-32 text-white sm:pt-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(214,168,72,.18),transparent_34%),radial-gradient(circle_at_15%_70%,rgba(127,212,193,.10),transparent_35%)]" />
      <div className="relative mx-auto max-w-6xl">
        <header className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D6A848]/25 bg-[#D6A848]/8 px-4 py-2 font-mono text-[10px] font-bold tracking-[.24em] text-[#E9C981]"><Plug className="h-3.5 w-3.5" />{copy.badge}</span>
          <h1 className="mt-8 font-serif text-5xl font-light leading-[.98] tracking-[-.04em] sm:text-7xl lg:text-8xl">{copy.title}</h1>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-white/62 sm:text-xl">{copy.lead}</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/demo" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D6A848] px-7 py-3.5 text-sm font-bold text-[#171006] transition hover:-translate-y-0.5">{copy.cta}<ArrowRight className="h-4 w-4" /></Link>
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
