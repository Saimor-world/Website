'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, LogIn, Mic2, ShieldCheck } from 'lucide-react';

type Locale = 'de' | 'en';
type Props = { locale: Locale };

const COPY = {
  de: {
    eyebrow: 'SAIMÔR · SOVEREIGN AI SYSTEMS',
    thesis: 'Dateien, Aufgaben und KI. Ein gemeinsamer Arbeitsraum.',
    intro: 'Saimôr OS ist ein digitaler Arbeitsraum für tägliche Arbeit und intelligente Assistenz. Kalender, Dateien, Vorgänge, Integrationen und KI leben im selben Kontext – statt über einzelne Apps und Chats verteilt zu sein.',
    enter: 'Saimôr OS ausprobieren',
    learn: 'System verstehen',
    login: 'Einloggen',
    training: 'Vorträge & Schulungen',
    entryNote: 'Der Security Check prüft öffentliche Signale deiner Domain. Die Ergebnisse bilden den Ausgangspunkt deines persönlichen Vorschau-Raums.',
    orbit: [['DATEIEN', 'im Zusammenhang'], ['MÔRA', 'proaktive Assistenz'], ['ARBEIT', 'Kalender · Inbox · Board'], ['AGENTS', 'Ausführung im Hintergrund']],
    fieldEyebrow: 'SAIMÔR FIELD',
    fieldTitle: 'Ein Raum, in dem Dinge zueinander finden.',
    saimor: 'SAIMÔR',
    saimorText: 'Der Raum, der Kontext hält.',
    mora: 'MÔRA',
    moraText: 'Die Präsenz, die Veränderungen bemerkt.',
    entryLabel: 'ENTRY / SECURITY CHECK',
    entryTitle: 'Nicht mit einem leeren Chat anfangen.',
    entryText: 'Du startest mit deiner Domain. Der Security Report wird zum ersten echten Objekt im OS. Damit beginnt der Raum bereits mit realem Kontext statt mit einer leeren Promptbox.',
    entryCta: 'Security Check starten',
    studioEyebrow: 'SAIMÔR · STUDIO',
    studioTitle: 'Produkte bauen. KI verständlich machen.',
    studioText: 'Saimôr ist unser unabhängiges Produktstudio. Wir verbinden Erfahrung aus IT-Systemmanagement und technischem Vertrieb mit eigener Produktentwicklung und bieten daneben Vorträge, Workshops und Schulungen zu praktischer KI an.',
    offers: [['Vorträge', 'KI verständlich einordnen – ohne Show und Buzzword-Nebel.'], ['Schulungen & Workshops', 'Praxisnah für Teams, die KI sinnvoll in ihre Arbeit bringen wollen.'], ['Prototypen & Webprojekte', 'Ideen schnell in eine testbare, belastbare Form bringen.']],
    talk: 'Vortrag oder Schulung anfragen',
    experiments: 'Weitere Arbeiten',
    experimentsText: 'Earth · ausgewählte Experimente, Webprojekte und Prototypen',
    finalEyebrow: 'CONTACT / OPEN CHANNEL',
    finalTitle: 'Wenn Saimôr zu deinem Problem passt, reden wir darüber.',
    finalText: 'Schreib kurz, woran du arbeitest oder wo es gerade hängt.',
    finalCta: 'Kontakt öffnen',
    scroll: 'SCROLL / MEHR ERFAHREN',
  },
  en: {
    eyebrow: 'SAIMÔR · SOVEREIGN AI SYSTEMS',
    thesis: 'Files, tasks and AI. One shared workspace.',
    intro: 'Saimôr OS is a digital workspace for everyday work and intelligent assistance. Calendar, files, tasks, integrations and AI live in the same context instead of being scattered across separate apps and chats.',
    enter: 'Try Saimôr OS',
    learn: 'Understand the system',
    login: 'Log in',
    training: 'Talks & training',
    entryNote: 'The Security Check examines public signals from your domain. Its results become the starting point of your personal preview workspace.',
    orbit: [['FILES', 'kept in context'], ['MÔRA', 'proactive assistant'], ['WORK', 'calendar · inbox · board'], ['AGENTS', 'background execution']],
    fieldEyebrow: 'SAIMÔR FIELD',
    fieldTitle: 'A space where things find each other.',
    saimor: 'SAIMÔR',
    saimorText: 'The space that holds context.',
    mora: 'MÔRA',
    moraText: 'The presence that notices change.',
    entryLabel: 'ENTRY / SECURITY CHECK',
    entryTitle: 'Do not start with an empty chat.',
    entryText: 'You start with your domain. The Security Report becomes the first real object inside the OS, so the space begins with real context instead of an empty prompt box.',
    entryCta: 'Start Security Check',
    studioEyebrow: 'SAIMÔR · STUDIO',
    studioTitle: 'Build products. Make AI understandable.',
    studioText: 'Saimôr is our independent product studio. We combine experience in IT systems management and technical sales with hands-on product development, and we also offer talks, workshops and practical AI training.',
    offers: [['Talks', 'Putting AI into context without hype or buzzword fog.'], ['Training & workshops', 'Practical sessions for teams that want to use AI meaningfully.'], ['Prototypes & web projects', 'Turning ideas into something robust and testable quickly.']],
    talk: 'Ask about a talk or workshop',
    experiments: 'Other work',
    experimentsText: 'Earth · selected experiments, web projects and prototypes',
    finalEyebrow: 'CONTACT / OPEN CHANNEL',
    finalTitle: 'If Saimôr fits your problem, we should talk.',
    finalText: 'Send a short note about what you are building or where you are stuck.',
    finalCta: 'Open contact',
    scroll: 'SCROLL / LEARN MORE',
  },
} as const;

export default function SystemWorldHome({ locale }: Props) {
  const c = COPY[locale];
  const securityHref = locale === 'de' ? '/de/einstieg/security-check' : '/en/entry/security-check';
  const contactHref = locale === 'de' ? '/de/kontakt' : '/en/contact';

  return (
    <div className="overflow-hidden bg-[#112a20] text-[#f4f5ed] selection:bg-[#d8b86a] selection:text-[#102219]">
      <section className="relative min-h-[100svh] overflow-hidden border-b border-[#d9eadf]/10 bg-[#16372a]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_10%,rgba(100,181,132,.28),transparent_34%),radial-gradient(ellipse_at_86%_18%,rgba(216,184,106,.18),transparent_29%),radial-gradient(ellipse_at_52%_76%,rgba(80,153,112,.20),transparent_42%),linear-gradient(160deg,#1a402f_0%,#122f24_48%,#18382b_100%)]" />
        <div className="s-fog-a pointer-events-none absolute -left-[16%] top-[2%] h-[52%] w-[60%] rounded-full bg-[radial-gradient(circle,rgba(127,212,193,.17),transparent_68%)]" />
        <div className="s-fog-b pointer-events-none absolute -right-[18%] top-[8%] h-[48%] w-[58%] rounded-full bg-[radial-gradient(circle,rgba(214,168,72,.13),transparent_68%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:58px_58px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col px-5 pb-5 pt-[84px] sm:px-8 sm:pb-8 sm:pt-28 lg:px-10">
          <div className="flex items-center justify-between gap-4">
            <div className="font-mono text-[8px] font-semibold tracking-[0.24em] text-white/68 sm:text-[10px] sm:tracking-[0.28em]">{c.eyebrow}</div>
            <div className="flex items-center gap-2 font-mono text-[8px] tracking-[0.16em] text-white/62 sm:text-[10px]"><span className="s-live h-1.5 w-1.5 rounded-full bg-[#8be0c5] shadow-[0_0_10px_rgba(139,224,197,.45)]" />SYSTEM ONLINE</div>
          </div>

          <div className="grid flex-1 items-center gap-3 py-4 sm:gap-8 sm:py-8 lg:grid-cols-[1.08fr_.92fr] lg:gap-8 lg:py-0">
            <div className="order-2 lg:order-1 lg:pr-8">
              <div className="max-w-2xl">
                <h1 className="font-serif text-[clamp(4rem,16vw,8.6rem)] font-light leading-[.8] tracking-[-.065em] text-[#fbfbf5]">Saimôr</h1>
                <p className="mt-5 max-w-2xl text-[clamp(1.65rem,3.2vw,2.8rem)] font-light leading-[1.12] tracking-[-.025em] text-white/96 sm:mt-6">{c.thesis}</p>
                <p className="mt-5 max-w-xl text-sm leading-6 text-[#e4eee6]/78 sm:mt-6 sm:text-lg sm:leading-8">{c.intro}</p>
                <div className="mt-7 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3">
                  <Link href={securityHref} className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-[#eef2e6] px-6 py-3 text-sm font-bold text-[#102219] shadow-[0_14px_36px_rgba(8,29,20,.14)] transition hover:bg-white sm:min-h-14 sm:py-3.5"><ShieldCheck className="h-4 w-4" />{c.enter}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
                  <a href="#system" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-[#d9eadf]/26 bg-[#214735]/78 px-6 py-3 text-sm font-semibold text-white/88 transition hover:border-white/38 hover:bg-[#28543f] sm:min-h-14 sm:py-3.5">{c.learn}<ArrowRight className="h-4 w-4" /></a>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-white/66 sm:text-xs">
                  <Link href="/login?callbackUrl=%2Faccount%2Fbridge" className="inline-flex items-center gap-1.5 transition hover:text-white"><LogIn className="h-3.5 w-3.5" />{c.login}</Link>
                  <span className="hidden h-3 w-px bg-white/20 sm:block" />
                  <a href="#studio" className="inline-flex items-center gap-1.5 text-[#f0d996]/90 transition hover:text-[#ffe7a7]"><Mic2 className="h-3.5 w-3.5" />{c.training}</a>
                </div>
                <p className="mt-4 max-w-lg text-[11px] leading-5 text-[#d5e5da]/62 sm:text-xs">{c.entryNote}</p>
              </div>
            </div>

            <div className="order-1 flex items-center justify-center lg:order-2 lg:justify-end">
              <div className="relative aspect-square w-[min(62vw,250px)] sm:w-[min(68vw,500px)] lg:w-[min(43vw,570px)]">
                <div className="s-halo absolute inset-[16%] rounded-full bg-[radial-gradient(circle,rgba(214,168,72,.18),transparent_66%)]" />
                <div className="s-halo-green absolute inset-[24%] rounded-full bg-[radial-gradient(circle,rgba(127,212,193,.14),transparent_68%)]" />
                <div className="s-orbit-a absolute inset-[4%] rounded-full border border-white/[0.18]" />
                <div className="s-orbit-b absolute inset-[16%] rounded-full border border-[#d6a848]/38" />
                <div className="s-orbit-c absolute inset-[28%] rounded-full border border-[#8be0c5]/30" />
                <div className="s-orbit-d absolute inset-[10%] rounded-[50%] border border-white/[0.10] [transform:rotate(-24deg)_scaleY(.68)]" />
                <span className="s-dot-a absolute left-[4%] top-[48%] h-2.5 w-2.5 rounded-full bg-[#e1b958] shadow-[0_0_18px_rgba(225,185,88,.58)]" />
                <span className="s-dot-b absolute right-[15%] top-[11%] h-2 w-2 rounded-full bg-[#8be0c5] shadow-[0_0_16px_rgba(139,224,197,.52)]" />
                <span className="s-dot-c absolute bottom-[12%] right-[13%] h-1.5 w-1.5 rounded-full bg-white/84" />
                <span className="s-dot-d absolute left-[23%] top-[13%] h-1 w-1 rounded-full bg-[#8ee8ef]" />
                <div className="absolute inset-[29%] flex items-center justify-center rounded-full border border-[#e0bb62]/38 bg-[#183b2d]/92 shadow-[0_0_44px_rgba(214,168,72,.12)]"><div className="absolute inset-[-12%] rounded-full border border-white/[0.10]" /><Image src="/saimor-seal-256.webp" alt="Saimôr" fill sizes="(max-width: 639px) 120px, 220px" priority className="rounded-full object-contain p-[14%] opacity-[0.99] mix-blend-screen" /></div>
                {c.orbit.map(([name, role], i) => {
                  const positions = ['left-[-2%] top-[25%]', 'right-[-2%] top-[29%]', 'left-[6%] bottom-[16%]', 'right-[4%] bottom-[12%]'];
                  return <div key={name} className={`absolute ${positions[i]} hidden sm:block`}><div className="rounded-full border border-white/[0.16] bg-[#17392c]/94 px-3 py-2 shadow-[0_10px_28px_rgba(7,25,18,.16)]"><div className="font-mono text-[9px] font-semibold tracking-[.18em] text-white/88">{name}</div><div className="mt-0.5 text-[9px] text-white/58">{role}</div></div></div>;
                })}
              </div>
            </div>
          </div>

          <a href="#system" className="mx-auto hidden items-center gap-2 pb-1 font-mono text-[9px] tracking-[.22em] text-white/52 transition hover:text-white/78 sm:flex">{c.scroll}<span className="s-down inline-block">↓</span></a>
        </div>
      </section>

      <section id="system" className="relative min-h-[92svh] overflow-hidden border-b border-[#d9eadf]/10 bg-[#0f271e] px-5 py-20 sm:px-8 md:py-28 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(126,196,161,.13),transparent_18%),radial-gradient(circle_at_67%_60%,rgba(214,184,106,.10),transparent_16%),linear-gradient(180deg,#10281f_0%,#0d211a_100%)]" />
        <div className="field-fog absolute -left-[10%] top-[8%] h-[62%] w-[52%] rounded-full bg-[radial-gradient(circle,rgba(75,141,109,.16),transparent_68%)]" />
        <div className="field-fog-b absolute -right-[14%] bottom-[2%] h-[54%] w-[50%] rounded-full bg-[radial-gradient(circle,rgba(212,177,87,.10),transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="font-mono text-[9px] font-semibold tracking-[.28em] text-[#e0bd67]/72 sm:text-[10px]">{c.fieldEyebrow}</p>
          <h2 className="mt-5 max-w-3xl font-serif text-4xl font-light leading-[.98] tracking-[-.035em] text-white/96 sm:text-6xl md:text-7xl">{c.fieldTitle}</h2>

          <div className="relative mt-12 h-[560px] overflow-hidden rounded-[36px] border border-white/[.07] bg-[radial-gradient(circle_at_48%_48%,rgba(78,137,106,.12),transparent_22%),rgba(8,22,16,.56)] sm:h-[660px]">
            <div className="field-ring ring-a absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[.08]" />
            <div className="field-ring ring-b absolute left-1/2 top-1/2 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d7b96d]/16" />
            <div className="field-ring ring-c absolute left-1/2 top-1/2 h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8ed8c0]/14" />
            <div className="field-thread absolute left-[18%] top-1/2 h-px w-[64%] -translate-y-1/2 bg-gradient-to-r from-transparent via-[#a9d8c0]/14 to-transparent" />
            <div className="field-thread-b absolute left-1/2 top-[18%] h-[64%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#d7b96d]/12 to-transparent" />

            {[['18%','28%','gold'],['77%','20%','mint'],['25%','74%','mint'],['82%','68%','white'],['55%','15%','white'],['45%','82%','gold']].map(([left,top,tone],i)=><span key={i} className={`field-node node-${tone} absolute h-2 w-2 rounded-full`} style={{left,top}} />)}

            <div className="absolute left-[11%] top-[20%] max-w-[260px] sm:left-[14%] sm:top-[24%]">
              <div className="font-mono text-[9px] tracking-[.24em] text-[#dcbf75]/72">{c.saimor}</div>
              <div className="mt-3 font-serif text-2xl font-light leading-tight text-white/92 sm:text-3xl">{c.saimorText}</div>
            </div>

            <div className="mora-presence absolute bottom-[18%] right-[10%] max-w-[260px] text-right sm:bottom-[22%] sm:right-[13%]">
              <div className="font-mono text-[9px] tracking-[.24em] text-[#93d9c3]/72">{c.mora}</div>
              <div className="mt-3 font-serif text-2xl font-light leading-tight text-white/92 sm:text-3xl">{c.moraText}</div>
            </div>

            <div className="field-core absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[.08] bg-[radial-gradient(circle,rgba(139,224,197,.14),rgba(20,48,36,.38)_46%,rgba(11,27,21,.8)_72%)] shadow-[0_0_80px_rgba(94,177,140,.13)] sm:h-36 sm:w-36">
              <div className="absolute inset-[24%] rounded-full border border-[#dcbf75]/20" />
              <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e5cf8d] shadow-[0_0_22px_rgba(229,207,141,.7)]" />
            </div>
          </div>

          <div className="mt-12 grid gap-8 border-l border-[#e0bd67]/24 pl-5 sm:pl-7 md:grid-cols-[.85fr_1.15fr] md:items-end">
            <div><div className="flex items-center gap-2 font-mono text-[9px] font-semibold tracking-[.22em] text-[#91dec7]/88"><span className="h-1.5 w-1.5 rounded-full bg-[#91dec7]" />{c.entryLabel}</div><h3 className="mt-4 max-w-md font-serif text-3xl font-light leading-tight text-white/96 sm:text-4xl">{c.entryTitle}</h3></div>
            <div><p className="max-w-2xl text-sm leading-6 text-[#dce9e0]/68 sm:text-base sm:leading-7">{c.entryText}</p><Link href={securityHref} className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#e5f1e9] transition hover:text-white">{c.entryCta}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link></div>
          </div>
        </div>
      </section>

      <section id="studio" className="relative border-b border-[#d9eadf]/10 bg-[radial-gradient(circle_at_20%_10%,rgba(214,168,72,.09),transparent_31%),#17352a] px-5 py-20 sm:px-8 md:py-28 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.88fr_1.12fr] lg:gap-20">
          <div><p className="font-mono text-[9px] font-semibold tracking-[.28em] text-[#e0bd67]/88 sm:text-[10px]">{c.studioEyebrow}</p><h2 className="mt-5 max-w-xl font-serif text-4xl font-light leading-[.98] tracking-[-.035em] text-white/96 sm:text-6xl">{c.studioTitle}</h2><p className="mt-7 max-w-xl text-sm leading-7 text-[#dce9e0]/68 sm:text-base">{c.studioText}</p><Link href={contactHref} className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#f0d38c] transition hover:text-[#ffe3a0]"><Mic2 className="h-4 w-4" />{c.talk}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link></div>
          <div className="border-t border-white/[0.15]">{c.offers.map(([name,text],index)=><div key={name} className="grid gap-3 border-b border-white/[0.12] py-7 sm:grid-cols-[42px_.8fr_1.2fr] sm:items-start sm:gap-6"><div className="font-mono text-[9px] tracking-[.18em] text-white/46">0{index+1}</div><div className="text-lg font-medium text-white/94 sm:text-xl">{name}</div><p className="text-sm leading-6 text-[#dce9e0]/64">{text}</p></div>)}<div className="pt-7"><div className="font-mono text-[9px] uppercase tracking-[.2em] text-white/48">{c.experiments}</div><p className="mt-2 text-sm text-[#dce9e0]/58">{c.experimentsText}</p></div></div>
        </div>
      </section>

      <section id="contact" className="bg-[#112c21] px-5 py-20 sm:px-8 md:py-28 lg:px-10">
        <div className="mx-auto max-w-7xl"><div className="grid gap-10 border-t border-white/[0.15] pt-10 md:grid-cols-[1fr_auto] md:items-end"><div><p className="font-mono text-[9px] font-semibold tracking-[.25em] text-[#91dec7]/82">{c.finalEyebrow}</p><h2 className="mt-5 max-w-4xl font-serif text-4xl font-light leading-[.98] tracking-[-.035em] text-white/96 sm:text-6xl md:text-7xl">{c.finalTitle}</h2><p className="mt-6 max-w-2xl text-sm leading-7 text-[#dce9e0]/64 sm:text-base">{c.finalText}</p></div><Link href={contactHref} className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-[#e0bd67]/40 px-6 py-3.5 text-sm font-semibold text-[#f0d38c] transition hover:border-[#e0bd67]/68 hover:bg-[#d6a848]/[0.07]">{c.finalCta}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link></div></div>
      </section>

      <style jsx>{`
        @keyframes orbitA{from{transform:rotate(0deg) scaleX(1.08)}to{transform:rotate(360deg) scaleX(1.08)}}
        @keyframes orbitB{from{transform:rotate(360deg) scaleY(.86)}to{transform:rotate(0deg) scaleY(.86)}}
        @keyframes orbitC{from{transform:rotate(12deg) scaleX(1.14)}to{transform:rotate(372deg) scaleX(1.14)}}
        @keyframes orbitD{from{transform:rotate(-24deg) scaleY(.68)}to{transform:rotate(336deg) scaleY(.68)}}
        @keyframes pulseSoft{0%,100%{opacity:.62}50%{opacity:1}}
        @keyframes fieldBreath{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:.72}50%{transform:translate(-50%,-50%) scale(1.035);opacity:1}}
        @keyframes nodePulse{0%,100%{transform:scale(.75);opacity:.34}50%{transform:scale(1.35);opacity:1}}
        @keyframes moraIn{0%,30%{opacity:.18;filter:blur(3px);transform:translateY(8px)}55%,100%{opacity:1;filter:none;transform:none}}
        @keyframes down{0%,100%{transform:translateY(0);opacity:.45}50%{transform:translateY(4px);opacity:.82}}
        .s-dot-a,.s-dot-b,.s-dot-c,.s-dot-d,.s-live,.s-halo,.s-halo-green{animation:pulseSoft 6.5s ease-in-out infinite}.s-down{animation:down 2.2s ease-in-out infinite}
        .field-ring{animation:fieldBreath 14s ease-in-out infinite}.ring-b{animation-delay:-4s}.ring-c{animation-delay:-8s}
        .field-node{animation:nodePulse 5.8s ease-in-out infinite}.field-node:nth-of-type(2n){animation-delay:-1.8s}.field-node:nth-of-type(3n){animation-delay:-3.2s}
        .node-gold{background:#d8b86a;box-shadow:0 0 24px rgba(216,184,106,.55)}.node-mint{background:#8be0c5;box-shadow:0 0 24px rgba(139,224,197,.52)}.node-white{background:rgba(255,255,255,.82);box-shadow:0 0 18px rgba(255,255,255,.28)}
        .mora-presence{animation:moraIn 9s ease-in-out infinite alternate}.field-fog{animation:pulseSoft 10s ease-in-out infinite}.field-fog-b{animation:pulseSoft 13s ease-in-out infinite reverse}
        @media(min-width:640px){.s-orbit-a{animation:orbitA 72s linear infinite}.s-orbit-b{animation:orbitB 88s linear infinite}.s-orbit-c{animation:orbitC 106s linear infinite}.s-orbit-d{animation:orbitD 124s linear infinite}}
        @media(max-width:639px){.s-dot-a,.s-dot-b,.s-dot-c,.s-dot-d,.s-halo,.s-halo-green{animation:none!important}}
        @media(prefers-reduced-motion:reduce){.s-orbit-a,.s-orbit-b,.s-orbit-c,.s-orbit-d,.s-dot-a,.s-dot-b,.s-dot-c,.s-dot-d,.s-live,.s-halo,.s-halo-green,.s-down,.field-ring,.field-node,.mora-presence,.field-fog,.field-fog-b{animation:none!important}}
      `}</style>
    </div>
  );
}
