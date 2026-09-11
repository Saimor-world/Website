'use client';

import Link from 'next/link';
import { ArrowRight, Eye, ShieldCheck } from 'lucide-react';
import { DemoLaunchButton } from '@/components/DemoLaunchButton';

type Props = { locale: 'de' | 'en' };

const COPY = {
  de: {
    eyebrow: 'MÔRA / IM SYSTEM',
    title: 'Sie weiß, wo du aufgehört hast.',
    lead: 'MÔRA ist keine zweite App neben Saimôr. Sie sitzt im selben Arbeitsraum wie Dateien, Termine und offene Arbeit. Wenn sich etwas ändert, muss der Zusammenhang nicht jedes Mal neu erklärt werden.',
    demo: 'MÔRA im OS erleben',
    deep: 'Deep View öffnen',
    rolesEyebrow: 'WAS SIE TUT',
    rolesTitle: 'Nicht mehr Chat. Mehr Kontinuität.',
    roles: [
      ['Erinnern', 'Der Arbeitsstand bleibt verfügbar, auch wenn du zwischen Dateien, Kalender, Aufgaben und Gesprächen wechselst.'],
      ['Beobachten', 'Verbundene Signale können auffallen, ohne dass du jedes Fenster selbst offenhalten musst.'],
      ['Vorbereiten', 'Offene Fäden werden gebündelt und nächste Schritte können vorbereitet werden, bevor du wieder bei null anfängst.'],
      ['Handeln', 'Über freigegebene Systemfunktionen und Automationen kann MÔRA Arbeit anstoßen – mit sichtbaren Grenzen.'],
    ],
    deepEyebrow: 'LIVE / DEEP VIEW',
    deepTitle: 'Nicht erklären. Zusehen.',
    deepText: 'Deep View nimmt öffentliche Live-Signale und zeigt, wie MÔRA daraus Muster und Zusammenhänge verdichtet. Keine erfundenen Demo-Zahlen, kein Dashboard-Mockup.',
    deepCta: 'Deep View starten',
    osEyebrow: 'LIVE / SAIMÔR OS',
    osTitle: 'Dann mit MÔRA in den Arbeitsraum.',
    osText: 'Der Demo-Start erzeugt einen getrennten Beispielraum. Kein Account nötig und keine privaten Betreiber- oder Kundendaten im Demo-Tenant.',
    security: 'Mit eigener Domain starten',
    realityEyebrow: 'STAND / SEPTEMBER 2026',
    realityTitle: 'Was heute schon real ist',
    realityText: 'Kontext, Dokumente und Beziehungen werden in der jeweiligen Saimôr-Instanz gehalten. Für Sprach- und Denkaufgaben können externe Modellanbieter genutzt werden. Welche Verbindung aktiv ist, soll sichtbar und austauschbar bleiben. Vollständig lokale Inferenz ist ein Zielbild – keine Behauptung über den heutigen Stand.',
  },
  en: {
    eyebrow: 'MÔRA / INSIDE THE SYSTEM',
    title: 'She knows where you left off.',
    lead: 'MÔRA is not a second app next to Saimôr. She lives in the same workspace as files, meetings and open work. When something changes, the context does not have to be explained again from scratch.',
    demo: 'Experience MÔRA in the OS',
    deep: 'Open Deep View',
    rolesEyebrow: 'WHAT SHE DOES',
    rolesTitle: 'Less chat. More continuity.',
    roles: [
      ['Remember', 'The working state stays available while you move between files, calendar, tasks and conversations.'],
      ['Notice', 'Connected signals can surface without you keeping every window open yourself.'],
      ['Prepare', 'Open threads are condensed and next steps can be prepared before you have to reconstruct the situation.'],
      ['Act', 'Through approved system capabilities and automations, MÔRA can trigger work within visible boundaries.'],
    ],
    deepEyebrow: 'LIVE / DEEP VIEW',
    deepTitle: 'Do not explain it. Watch it.',
    deepText: 'Deep View uses public live signals to show how MÔRA condenses patterns and relationships. No invented demo metrics and no dashboard mockup.',
    deepCta: 'Start Deep View',
    osEyebrow: 'LIVE / SAIMÔR OS',
    osTitle: 'Then enter the workspace with MÔRA.',
    osText: 'The demo launch creates an isolated example workspace. No account is required and no private operator or customer data is loaded into the demo tenant.',
    security: 'Start with your own domain',
    realityEyebrow: 'STATE / SEPTEMBER 2026',
    realityTitle: 'What is real today',
    realityText: 'Context, documents and relationships are held inside the relevant Saimôr instance. External model providers may be used for language and reasoning tasks. The active connection is intended to stay visible and replaceable. Fully local inference is a target – not a claim about the current product.',
  },
} as const;

export default function MoraProductPage({ locale }: Props) {
  const c = COPY[locale];
  const securityHref = locale === 'de' ? '/de/einstieg/security-check' : '/en/entry/security-check';
  const deepHref = locale === 'de' ? '/mora/deep-view' : '/en/mora/deep-view';

  return (
    <main className="overflow-hidden bg-[#07110d] text-[#f5f4ec]">
      <section className="relative min-h-[92svh] overflow-hidden border-b border-white/[.08] bg-[radial-gradient(circle_at_72%_34%,rgba(117,205,171,.24),transparent_24%),radial-gradient(circle_at_64%_58%,rgba(214,168,72,.13),transparent_23%),linear-gradient(145deg,#183b2d_0%,#0a1712_56%,#050807_100%)] px-5 pb-14 pt-28 sm:px-8 sm:pt-36 lg:px-10">
        <div className="mora-stars absolute inset-0" aria-hidden="true" />
        <div className="mora-hyphae absolute inset-0" aria-hidden="true"><span className="mh mh1" /><span className="mh mh2" /><span className="mh mh3" /><span className="mh mh4" /><span className="mh mh5" /><i className="mn mn1" /><i className="mn mn2" /><i className="mn mn3" /><i className="mn mn4" /></div>

        <div className="relative z-10 mx-auto grid min-h-[72svh] max-w-7xl items-center gap-10 md:grid-cols-[.88fr_1.12fr]">
          <div className="max-w-2xl">
            <p className="font-mono text-[9px] font-semibold tracking-[.30em] text-[#e3c878]/82 sm:text-[10px]">{c.eyebrow}</p>
            <h1 className="mt-6 font-serif text-[clamp(3.8rem,8vw,7.8rem)] font-light leading-[.86] tracking-[-.055em] text-[#fbfaf2]">{c.title}</h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-[#dce9e0]/70 sm:text-lg sm:leading-8">{c.lead}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <DemoLaunchButton label={c.demo} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#eef2e6] px-7 py-3.5 text-sm font-bold text-[#102219] transition hover:bg-white disabled:opacity-60" />
              <Link href={deepHref} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/18 bg-white/[.035] px-7 py-3.5 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:bg-white/[.06] hover:text-white"><Eye className="h-4 w-4" />{c.deep}</Link>
            </div>
          </div>

          <div className="relative mx-auto h-[430px] w-full max-w-[680px] sm:h-[560px] md:h-[650px]" aria-hidden="true">
            <div className="absolute left-[7%] top-[8%] h-[84%] w-[84%] rounded-full border border-[#9ce3cb]/10" />
            <div className="absolute left-[18%] top-[18%] h-[64%] w-[64%] rounded-[48%] border border-[#e0bd67]/18 [transform:rotate(-22deg)_scaleY(.72)]" />
            <div className="absolute left-[28%] top-[27%] h-[46%] w-[46%] rounded-[50%] border border-white/[.08] [transform:rotate(31deg)_scaleY(.64)]" />
            <div className="mora-orb absolute left-[47%] top-[42%] h-6 w-6 rounded-full bg-[#baf2df] shadow-[0_0_20px_rgba(186,242,223,.8),0_0_80px_rgba(107,210,172,.42)]" />
            <div className="absolute left-[50%] top-[45%] h-px w-[42%] origin-left -rotate-[11deg] bg-[linear-gradient(90deg,rgba(186,242,223,.75),rgba(214,168,72,.25),transparent)] shadow-[0_0_16px_rgba(186,242,223,.28)]" />
            <div className="absolute left-[12%] top-[56%] h-px w-[58%] rotate-[7deg] bg-[linear-gradient(90deg,transparent,rgba(145,222,199,.20),rgba(240,218,157,.58),transparent)]" />
            <div className="absolute bottom-[11%] right-[5%] font-serif text-[clamp(4rem,11vw,9rem)] font-light tracking-[-.06em] text-white/[.055]">MÔRA</div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 md:py-28 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[9px] font-semibold tracking-[.28em] text-[#93ddc7]/72">{c.rolesEyebrow}</p>
          <h2 className="mt-5 max-w-4xl font-serif text-4xl font-light leading-[.96] tracking-[-.04em] text-white/95 sm:text-6xl md:text-7xl">{c.rolesTitle}</h2>
          <div className="mt-12 border-t border-white/[.11]">{c.roles.map(([title, body], index) => <article key={title} className="grid gap-4 border-b border-white/[.09] py-7 sm:grid-cols-[48px_.75fr_1.25fr] sm:items-start sm:gap-8"><div className="font-mono text-[9px] tracking-[.18em] text-white/26">0{index + 1}</div><h3 className="text-xl font-medium text-white/90 sm:text-2xl">{title}</h3><p className="max-w-2xl text-sm leading-7 text-white/48 sm:text-base">{body}</p></article>)}</div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/[.08] bg-[#0d2119] px-5 py-24 sm:px-8 md:py-32 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(125,220,187,.20),transparent_24%),radial-gradient(circle_at_53%_75%,rgba(214,168,72,.10),transparent_24%)]" />
        <div className="absolute inset-y-0 right-0 w-[70%] opacity-45 [background-image:radial-gradient(circle_at_20%_20%,rgba(202,241,226,.36)_0_1px,transparent_1.5px),radial-gradient(circle_at_68%_42%,rgba(225,193,112,.30)_0_1px,transparent_1.5px)] [background-size:91px_91px,137px_137px]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 md:grid-cols-[.8fr_1.2fr] md:items-center">
          <div><p className="font-mono text-[9px] font-semibold tracking-[.28em] text-[#e0bd67]/78">{c.deepEyebrow}</p><h2 className="mt-5 font-serif text-5xl font-light leading-[.92] tracking-[-.045em] sm:text-7xl">{c.deepTitle}</h2><p className="mt-6 max-w-xl text-sm leading-7 text-[#dce9e0]/58 sm:text-base">{c.deepText}</p><Link href={deepHref} className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#f0d38c] transition hover:text-[#ffe3a0]"><Eye className="h-4 w-4" />{c.deepCta}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link></div>
          <div className="relative h-[360px] sm:h-[460px]" aria-hidden="true"><div className="absolute inset-[8%] rounded-full border border-[#8be0c5]/12" /><div className="absolute inset-[18%] rounded-full border border-[#d6a848]/14 [transform:scaleY(.58)_rotate(24deg)]" /><div className="absolute inset-[30%] rounded-full bg-[radial-gradient(circle,rgba(190,243,224,.42),rgba(72,146,119,.16)_35%,transparent_68%)] shadow-[0_0_110px_rgba(117,205,171,.18)]" /><div className="absolute left-[50%] top-[48%] h-2.5 w-2.5 rounded-full bg-[#dff9ef] shadow-[0_0_18px_rgba(223,249,239,.95),0_0_60px_rgba(125,220,187,.55)]" /></div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 md:py-28 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[.9fr_1.1fr] md:items-end">
          <div><p className="font-mono text-[9px] font-semibold tracking-[.28em] text-[#93ddc7]/72">{c.osEyebrow}</p><h2 className="mt-5 max-w-2xl font-serif text-4xl font-light leading-[.96] tracking-[-.04em] sm:text-6xl">{c.osTitle}</h2></div>
          <div><p className="max-w-2xl text-sm leading-7 text-white/50 sm:text-base">{c.osText}</p><div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><DemoLaunchButton label={c.demo} className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#eef2e6] px-6 py-3 text-sm font-bold text-[#102219] transition hover:bg-white disabled:opacity-60" /><Link href={securityHref} className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/14 px-6 py-3 text-sm font-semibold text-white/72 transition hover:border-white/28 hover:text-white"><ShieldCheck className="h-4 w-4" />{c.security}</Link></div></div>
        </div>
      </section>

      <section className="border-t border-white/[.08] bg-[#050907] px-5 py-16 sm:px-8 md:py-20 lg:px-10"><div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[.65fr_1.35fr]"><div><p className="font-mono text-[9px] font-semibold tracking-[.26em] text-white/36">{c.realityEyebrow}</p><h2 className="mt-4 font-serif text-3xl font-light text-white/90 sm:text-4xl">{c.realityTitle}</h2></div><p className="max-w-3xl text-sm leading-7 text-white/45 sm:text-base">{c.realityText}</p></div></section>

      <style jsx>{`
        .mora-stars{opacity:.58;background-image:radial-gradient(circle at 12% 20%,rgba(255,255,255,.35) 0 1px,transparent 1.4px),radial-gradient(circle at 76% 24%,rgba(158,227,204,.30) 0 1px,transparent 1.4px),radial-gradient(circle at 58% 72%,rgba(229,198,118,.28) 0 1px,transparent 1.4px);background-size:149px 149px,211px 211px,263px 263px;mask-image:linear-gradient(to bottom,transparent,black 12%,black 88%,transparent)}
        .mora-hyphae{opacity:.66}.mh{position:absolute;height:1px;transform-origin:left center;background:linear-gradient(90deg,transparent,rgba(126,220,190,.13),rgba(219,236,224,.45),transparent)}.mh1{left:42%;top:26%;width:50%;transform:rotate(17deg)}.mh2{left:35%;top:42%;width:58%;transform:rotate(-9deg)}.mh3{left:48%;top:56%;width:44%;transform:rotate(26deg)}.mh4{left:28%;top:70%;width:62%;transform:rotate(-6deg)}.mh5{left:57%;top:18%;width:33%;transform:rotate(51deg)}.mn{position:absolute;width:5px;height:5px;border-radius:999px;background:#c8f4e4;box-shadow:0 0 18px rgba(160,235,210,.65)}.mn1{left:58%;top:35%}.mn2{left:72%;top:49%}.mn3{left:52%;top:63%}.mn4{left:83%;top:66%}.mora-orb{animation:moraPulse 5.6s ease-in-out infinite}@keyframes moraPulse{0%,100%{transform:scale(.8);opacity:.64}50%{transform:scale(1.15);opacity:1}}@media(prefers-reduced-motion:reduce){.mora-orb{animation:none}}
      `}</style>
    </main>
  );
}
