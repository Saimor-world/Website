import Link from 'next/link';
import { ArrowLeft, ArrowRight, CalendarDays, CircleCheck, FileText, MessageSquareText, Sparkles } from 'lucide-react';

type Props = { locale: 'de' | 'en' };

const COPY = {
  de: {
    back: 'MÔRA',
    eyebrow: 'MÔRA / DEEP VIEW',
    title: 'Nicht mehr Informationen. Mehr Zusammenhang.',
    lead: 'Deep View zeigt, welche Kontextstücke MÔRA zusammenführt und warum daraus ein nächster Schritt entsteht. Das Beispiel unten ist bewusst einfach – und keine Behauptung über deine echten Daten.',
    example: 'BEISPIEL · KEINE ECHTDATEN',
    objects: [
      ['Datei', 'Angebot_final.pdf', 'heute geändert'],
      ['Kalender', 'Kundentermin', 'Freitag · 10:30'],
      ['Offen', 'Freigabe', 'noch ausstehend'],
      ['Verlauf', 'Letzte Rückfrage', 'Preisstaffel klären'],
    ],
    center: 'MÔRA',
    centerSub: 'hält den Arbeitsstand zusammen',
    resultLabel: 'NÄCHSTER SINNVOLLER SCHRITT',
    result: 'Freigabe prüfen und das aktuelle Angebot vor dem Termin bereitstellen.',
    whyEyebrow: 'WARUM DAS HILFT',
    whyTitle: 'Nicht raten. Den Weg nachvollziehen.',
    steps: [
      ['01', 'Quellen', 'MÔRA sieht nur Kontext, der im System vorhanden oder ausdrücklich verbunden ist.'],
      ['02', 'Zusammenhang', 'Datei, Termin, offene Aufgabe und Verlauf werden nicht als vier isolierte Dinge behandelt.'],
      ['03', 'Aktion', 'Aus dem gemeinsamen Stand kann ein Vorschlag oder – mit Freigabe – eine Systemaktion entstehen.'],
    ],
    boundaryEyebrow: 'GRENZEN',
    boundaryTitle: 'Deep View soll erklären, nicht mystifizieren.',
    boundary: 'Deshalb zeigt diese Ansicht Beziehungen und Herleitung statt Glitches, vermeintlicher AGI-Signale oder erfundener Live-Metriken. Was nicht verbunden ist, weiß MÔRA nicht. Was eine Freigabe braucht, bleibt eine Freigabe.',
    demo: 'Im OS ansehen',
    home: 'Zur MÔRA-Seite',
  },
  en: {
    back: 'MÔRA',
    eyebrow: 'MÔRA / DEEP VIEW',
    title: 'Not more information. More context.',
    lead: 'Deep View shows which pieces of context MÔRA brings together and why they lead to a next step. The example below is intentionally simple – and it is not a claim about your real data.',
    example: 'EXAMPLE · NO REAL DATA',
    objects: [
      ['File', 'Proposal_final.pdf', 'changed today'],
      ['Calendar', 'Client meeting', 'Friday · 10:30'],
      ['Open', 'Approval', 'still pending'],
      ['History', 'Last question', 'clarify price tiers'],
    ],
    center: 'MÔRA',
    centerSub: 'keeps the working state together',
    resultLabel: 'NEXT USEFUL STEP',
    result: 'Check the approval and have the current proposal ready before the meeting.',
    whyEyebrow: 'WHY THIS HELPS',
    whyTitle: 'Do not guess. Follow the reasoning.',
    steps: [
      ['01', 'Sources', 'MÔRA only sees context that exists in the system or has been explicitly connected.'],
      ['02', 'Relationship', 'The file, meeting, open task and history are not treated as four isolated objects.'],
      ['03', 'Action', 'The shared state can produce a suggestion or – with permission – a system action.'],
    ],
    boundaryEyebrow: 'BOUNDARIES',
    boundaryTitle: 'Deep View should explain, not mystify.',
    boundary: 'That is why this view shows relationships and provenance instead of glitches, supposed AGI signals or invented live metrics. MÔRA does not know what is not connected. Anything that requires approval still requires approval.',
    demo: 'View it in the OS',
    home: 'Back to MÔRA',
  },
} as const;

const icons = [FileText, CalendarDays, CircleCheck, MessageSquareText];

export default function MoraDeepView({ locale }: Props) {
  const c = COPY[locale];
  const moraHref = locale === 'de' ? '/mora' : '/en/mora';
  const securityHref = locale === 'de' ? '/de/einstieg/security-check' : '/en/entry/security-check';

  return (
    <main className="min-h-screen overflow-hidden bg-[#06100c] text-[#f5f3e9]">
      <section className="relative border-b border-white/[.07] px-5 pb-20 pt-24 sm:px-8 sm:pt-28 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_30%,rgba(106,196,159,.14),transparent_27%),radial-gradient(circle_at_52%_68%,rgba(213,175,87,.08),transparent_24%),linear-gradient(180deg,#0c2118_0%,#06100c_68%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl">
          <Link href={moraHref} className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[.2em] text-white/38 transition hover:text-white/70"><ArrowLeft className="h-3.5 w-3.5" />{c.back}</Link>
          <div className="mt-20 max-w-4xl sm:mt-24">
            <p className="font-mono text-[9px] font-semibold tracking-[.29em] text-[#e0c575]/78">{c.eyebrow}</p>
            <h1 className="mt-6 font-serif text-[clamp(3.5rem,7vw,7rem)] font-light leading-[.9] tracking-[-.052em] text-[#fbfaf3]">{c.title}</h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-[#dce8df]/62 sm:text-lg">{c.lead}</p>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 md:py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 font-mono text-[8px] font-semibold tracking-[.25em] text-[#d9c27a]/62">{c.example}</div>
          <div className="relative overflow-hidden rounded-[2rem] border border-[#b8d4c5]/12 bg-[#081610] p-5 shadow-[0_36px_100px_rgba(0,0,0,.24)] sm:p-8 lg:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(101,190,153,.10),transparent_22%)]" aria-hidden="true" />
            <svg viewBox="0 0 1000 620" className="pointer-events-none absolute inset-0 h-full w-full opacity-65" aria-hidden="true">
              <defs><linearGradient id="deepLine" x1="0" x2="1"><stop offset="0" stopColor="#8bd1b5" stopOpacity=".12" /><stop offset=".5" stopColor="#dfca83" stopOpacity=".58" /><stop offset="1" stopColor="#8bd1b5" stopOpacity=".12" /></linearGradient></defs>
              <path d="M500 310 C390 250 300 178 205 128" fill="none" stroke="url(#deepLine)" strokeWidth="1.4" />
              <path d="M500 310 C610 248 705 183 802 138" fill="none" stroke="url(#deepLine)" strokeWidth="1.4" />
              <path d="M500 310 C405 382 324 444 220 493" fill="none" stroke="url(#deepLine)" strokeWidth="1.4" />
              <path d="M500 310 C604 382 690 442 796 492" fill="none" stroke="url(#deepLine)" strokeWidth="1.4" />
              <circle cx="500" cy="310" r="126" fill="none" stroke="#9fd9c1" strokeOpacity=".12" />
              <circle cx="500" cy="310" r="176" fill="none" stroke="#dec77d" strokeOpacity=".07" strokeDasharray="4 11" />
            </svg>

            <div className="relative grid min-h-[640px] gap-4 md:min-h-[610px] md:grid-cols-[1fr_1.1fr_1fr] md:grid-rows-[1fr_1fr] md:items-center">
              {c.objects.map(([kind, title, meta], index) => {
                const Icon = icons[index];
                const positions = ['md:col-start-1 md:row-start-1', 'md:col-start-3 md:row-start-1', 'md:col-start-1 md:row-start-2', 'md:col-start-3 md:row-start-2'];
                return <article key={title} className={`${positions[index]} relative z-10 rounded-2xl border border-white/[.09] bg-[#0a1c14]/92 p-5 backdrop-blur-md sm:p-6`}>
                  <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full border border-[#d9c27a]/18 text-[#e0c878]"><Icon className="h-4 w-4" /></span><span className="font-mono text-[8px] uppercase tracking-[.19em] text-white/35">{kind}</span></div>
                  <h2 className="mt-5 text-lg font-medium text-white/88 sm:text-xl">{title}</h2>
                  <p className="mt-2 text-sm text-[#bcd0c4]/48">{meta}</p>
                </article>;
              })}

              <div className="relative z-20 mx-auto grid h-44 w-44 place-items-center rounded-full border border-[#dec77d]/24 bg-[radial-gradient(circle_at_38%_32%,rgba(225,247,235,.24),rgba(36,83,63,.54)_38%,rgba(6,17,12,.98)_73%)] text-center shadow-[0_0_90px_rgba(103,194,157,.16)] md:col-start-2 md:row-span-2 md:row-start-1 sm:h-52 sm:w-52">
                <div><span className="mx-auto block h-2.5 w-2.5 rounded-full bg-[#c9f1df] shadow-[0_0_24px_rgba(201,241,223,.9)]" /><span className="mt-4 block font-mono text-[10px] tracking-[.25em] text-[#f0dca2]">{c.center}</span><span className="mt-2 block max-w-[130px] text-[11px] leading-5 text-white/35">{c.centerSub}</span></div>
              </div>
            </div>

            <div className="relative z-20 mt-4 border-t border-white/[.09] pt-7 sm:mt-6 sm:pt-8">
              <div className="font-mono text-[8px] tracking-[.23em] text-[#d9c27a]/66">{c.resultLabel}</div>
              <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <p className="max-w-3xl font-serif text-3xl font-light leading-[1.05] text-[#f6f2e5] sm:text-4xl md:text-5xl">{c.result}</p>
                <Sparkles className="h-6 w-6 shrink-0 text-[#9ed8c0]/55" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[.07] bg-[#0a1912] px-5 py-20 sm:px-8 md:py-28 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[9px] font-semibold tracking-[.28em] text-[#92dac1]/68">{c.whyEyebrow}</p>
          <h2 className="mt-5 max-w-4xl font-serif text-4xl font-light leading-[.96] tracking-[-.04em] text-white/94 sm:text-6xl">{c.whyTitle}</h2>
          <div className="mt-12 border-t border-white/[.10]">
            {c.steps.map(([number, title, body]) => <article key={number} className="grid gap-4 border-b border-white/[.08] py-7 sm:grid-cols-[56px_.65fr_1.35fr] sm:gap-8"><span className="font-mono text-[9px] tracking-[.18em] text-[#d9c27a]/45">{number}</span><h3 className="text-xl font-medium text-white/86">{title}</h3><p className="max-w-2xl text-sm leading-7 text-white/48 sm:text-base">{body}</p></article>)}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 md:py-28 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[.78fr_1.22fr] md:items-start">
          <div><p className="font-mono text-[9px] font-semibold tracking-[.27em] text-[#e0c575]/66">{c.boundaryEyebrow}</p><h2 className="mt-5 font-serif text-4xl font-light leading-[.98] tracking-[-.035em] text-white/92 sm:text-5xl">{c.boundaryTitle}</h2></div>
          <div><p className="max-w-3xl text-sm leading-7 text-white/48 sm:text-base">{c.boundary}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href={securityHref} className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#eef1e4] px-6 py-3 text-sm font-bold text-[#102219] transition hover:bg-white">{c.demo}<ArrowRight className="h-4 w-4" /></Link><Link href={moraHref} className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/12 px-6 py-3 text-sm font-semibold text-white/64 transition hover:border-white/26 hover:text-white">{c.home}</Link></div></div>
        </div>
      </section>
    </main>
  );
}
