import Link from 'next/link';
import { ArrowRight, ExternalLink, Radio } from 'lucide-react';

type Props = { locale: 'de' | 'en' };

const COPY = {
  de: {
    eyebrow: 'MÔRA / IM SAIMÔR OS',
    title: 'Sie kennt den Stand.',
    lead: 'MÔRA sitzt nicht neben deiner Arbeit in einem Chatfenster. Sie arbeitet mit dem, was im Saimôr OS bereits da ist – Dateien, Termine, Aufgaben, Veränderungen und offene Fäden.',
    note: 'Wenn sich etwas ändert, muss nicht erst wieder alles erklärt werden.',
    demoLabel: 'LIVE / ISOLIERTE OS-DEMO',
    demoTitle: 'Nicht erklären. Ausprobieren.',
    demoText: 'Die Vorschau unten ist die echte getrennte Saimôr-Demo. Keine persönlichen Daten, kein Mockup. Öffne sie direkt hier oder groß in einem eigenen Fenster.',
    demoCta: 'Demo groß öffnen',
    deepCta: 'MÔRA Deep View öffnen',
    close: 'MÔRA verbindet Gedächtnis, Aufmerksamkeit und Handlung. Nicht als eigene Welt neben dem OS – sondern als die Intelligenz darin.',
  },
  en: {
    eyebrow: 'MÔRA / INSIDE SAIMÔR OS',
    title: 'She knows where things stand.',
    lead: 'MÔRA does not sit beside your work in a chat window. She works with what is already present inside Saimôr OS – files, meetings, tasks, changes and unfinished threads.',
    note: 'When something changes, you should not have to explain everything again.',
    demoLabel: 'LIVE / ISOLATED OS DEMO',
    demoTitle: 'Do not explain it. Try it.',
    demoText: 'The preview below is the real isolated Saimôr demo. No personal data and no mockup. Use it here or open it full-size in a separate view.',
    demoCta: 'Open full demo',
    deepCta: 'Open MÔRA Deep View',
    close: 'MÔRA connects memory, attention and action. Not as a separate world beside the OS, but as the intelligence within it.',
  },
} as const;

export default function MoraProductPage({ locale }: Props) {
  const c = COPY[locale];
  const deepHref = locale === 'de' ? '/mora/analog-affect' : '/en/mora/analog-affect';

  return (
    <main className="relative overflow-hidden bg-[#06110d] text-[#f6f5ee]">
      <section className="relative min-h-[92svh] overflow-hidden px-5 pb-20 pt-32 sm:px-8 sm:pt-40 lg:px-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_35%,rgba(132,222,186,.26),transparent_18%),radial-gradient(circle_at_77%_42%,rgba(214,168,72,.16),transparent_12%),radial-gradient(ellipse_at_58%_86%,rgba(77,138,104,.27),transparent_42%),linear-gradient(180deg,#0b2118_0%,#07140f_50%,#050a08_100%)]" />
        <div className="pointer-events-none absolute left-[58%] top-[22%] h-[44vw] w-[44vw] max-h-[620px] max-w-[620px] rounded-full border border-[#d6a848]/25 shadow-[0_0_140px_rgba(123,218,177,.11)]" />
        <div className="pointer-events-none absolute left-[63%] top-[28%] h-[32vw] w-[32vw] max-h-[450px] max-w-[450px] rounded-full border border-[#8bdec5]/20" />
        <div className="pointer-events-none absolute left-[70%] top-[37%] h-3 w-3 rounded-full bg-[#dff8ec] shadow-[0_0_24px_8px_rgba(139,222,197,.35)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] opacity-70 [background-image:radial-gradient(circle_at_20%_70%,rgba(151,223,187,.24)_0_1px,transparent_2px),radial-gradient(circle_at_68%_42%,rgba(233,208,139,.22)_0_1px,transparent_2px),linear-gradient(120deg,transparent_46%,rgba(126,206,168,.09)_47%,transparent_48%)] [background-size:97px_97px,131px_131px,180px_180px] [mask-image:linear-gradient(to_top,black,transparent)]" />

        <div className="relative mx-auto flex min-h-[72svh] max-w-7xl items-center">
          <div className="max-w-4xl">
            <p className="font-mono text-[9px] font-semibold tracking-[.28em] text-[#e0bd67]/90 sm:text-[10px]">{c.eyebrow}</p>
            <h1 className="mt-7 max-w-4xl font-serif text-[clamp(4rem,10vw,9rem)] font-light leading-[.84] tracking-[-.065em]">{c.title}</h1>
            <p className="mt-8 max-w-2xl text-base leading-7 text-[#dfe9e2]/74 sm:text-xl sm:leading-8">{c.lead}</p>
            <p className="mt-5 max-w-2xl font-serif text-2xl font-light italic text-[#f0d792]/85 sm:text-3xl">{c.note}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href="#live" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#eef2e6] px-6 py-3.5 text-sm font-bold text-[#102019] transition hover:bg-white">Live ansehen<ArrowRight className="h-4 w-4" /></a>
              <Link href={deepHref} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 bg-white/[.025] px-6 py-3.5 text-sm font-semibold text-white/74 transition hover:border-white/28 hover:text-white"><Radio className="h-4 w-4" />{c.deepCta}</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="live" className="relative border-t border-white/[.08] bg-[#050907] px-4 py-20 sm:px-8 md:py-28 lg:px-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(105,190,151,.16),transparent_30%)]" />
        <div className="relative mx-auto max-w-[1500px]">
          <div className="mb-8 grid gap-6 md:grid-cols-[.8fr_1.2fr] md:items-end">
            <div>
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold tracking-[.22em] text-[#91dec7]/80"><span className="h-1.5 w-1.5 rounded-full bg-[#91dec7] shadow-[0_0_10px_rgba(145,222,199,.5)]" />{c.demoLabel}</div>
              <h2 className="mt-4 font-serif text-4xl font-light tracking-[-.035em] sm:text-6xl">{c.demoTitle}</h2>
            </div>
            <div>
              <p className="max-w-2xl text-sm leading-7 text-white/58 sm:text-base">{c.demoText}</p>
              <Link href="/demo" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#efd58d] transition hover:text-[#ffe7a8]">{c.demoCta}<ExternalLink className="h-4 w-4" /></Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[1.7rem] border border-[#a6d5bb]/14 bg-[#07100c] shadow-[0_40px_140px_rgba(0,0,0,.55)] sm:rounded-[2.3rem]">
            <div className="flex h-10 items-center justify-between border-b border-white/[.07] px-4 font-mono text-[8px] tracking-[.18em] text-white/38">
              <span>SAIMÔR OS / DEMO</span><span className="flex items-center gap-2"><i className="h-1.5 w-1.5 rounded-full bg-[#91dec7]" />LIVE</span>
            </div>
            <iframe src="/demo?embed=mora" title="Saimôr OS live demo" loading="lazy" className="h-[680px] w-full border-0 bg-[#081410] md:h-[760px]" />
          </div>

          <p className="mx-auto mt-12 max-w-3xl text-center font-serif text-2xl font-light leading-relaxed text-white/72 sm:text-3xl">{c.close}</p>
        </div>
      </section>
    </main>
  );
}
