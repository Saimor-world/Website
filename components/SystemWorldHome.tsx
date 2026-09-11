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
    enter: 'Saimôr OS ausprobieren', learn: 'System verstehen', login: 'Einloggen', training: 'Vorträge & Schulungen',
    entryNote: 'Der Security Check prüft öffentliche Signale deiner Domain. Die Ergebnisse bilden den Ausgangspunkt deines persönlichen Vorschau-Raums.',
    orbit: [['DATEIEN', 'im Zusammenhang'], ['MÔRA', 'proaktive Assistenz'], ['ARBEIT', 'Kalender · Inbox · Board'], ['AGENTS', 'Ausführung im Hintergrund']],
    fieldEyebrow: 'INSIDE / SAIMÔR', fieldTitle: 'Nicht noch ein Tool. Ein Zusammenhang.',
    saimor: 'KONTEXT', saimorText: 'Was zusammengehört, bleibt zusammen.', mora: 'MÔRA', moraText: 'Bemerkt, wenn sich etwas verändert.',
    entryLabel: 'ENTRY / SECURITY CHECK', entryTitle: 'Nicht mit einem leeren Chat anfangen.',
    entryText: 'Du startest mit deiner Domain. Der Security Report wird zum ersten echten Objekt im OS. Damit beginnt der Raum bereits mit realem Kontext statt mit einer leeren Promptbox.', entryCta: 'Security Check starten',
    studioEyebrow: 'SAIMÔR · STUDIO', studioTitle: 'Produkte bauen. KI verständlich machen.',
    studioText: 'Saimôr ist unser unabhängiges Produktstudio. Wir verbinden Erfahrung aus IT-Systemmanagement und technischem Vertrieb mit eigener Produktentwicklung und bieten daneben Vorträge, Workshops und Schulungen zu praktischer KI an.',
    offers: [['Vorträge', 'KI verständlich einordnen – ohne Show und Buzzword-Nebel.'], ['Schulungen & Workshops', 'Praxisnah für Teams, die KI sinnvoll in ihre Arbeit bringen wollen.'], ['Prototypen & Webprojekte', 'Ideen schnell in eine testbare, belastbare Form bringen.']],
    talk: 'Vortrag oder Schulung anfragen', experiments: 'Weitere Arbeiten', experimentsText: 'Earth · ausgewählte Experimente, Webprojekte und Prototypen',
    finalEyebrow: 'CONTACT / OPEN CHANNEL', finalTitle: 'Wenn Saimôr zu deinem Problem passt, reden wir darüber.', finalText: 'Schreib kurz, woran du arbeitest oder wo es gerade hängt.', finalCta: 'Kontakt öffnen', scroll: 'SCROLL / MEHR ERFAHREN',
  },
  en: {
    eyebrow: 'SAIMÔR · SOVEREIGN AI SYSTEMS', thesis: 'Files, tasks and AI. One shared workspace.',
    intro: 'Saimôr OS is a digital workspace for everyday work and intelligent assistance. Calendar, files, tasks, integrations and AI live in the same context instead of being scattered across separate apps and chats.',
    enter: 'Try Saimôr OS', learn: 'Understand the system', login: 'Log in', training: 'Talks & training',
    entryNote: 'The Security Check examines public signals from your domain. Its results become the starting point of your personal preview workspace.',
    orbit: [['FILES', 'kept in context'], ['MÔRA', 'proactive assistant'], ['WORK', 'calendar · inbox · board'], ['AGENTS', 'background execution']],
    fieldEyebrow: 'INSIDE / SAIMÔR', fieldTitle: 'Not another tool. A connected whole.',
    saimor: 'CONTEXT', saimorText: 'What belongs together stays together.', mora: 'MÔRA', moraText: 'Notices when something changes.',
    entryLabel: 'ENTRY / SECURITY CHECK', entryTitle: 'Do not start with an empty chat.',
    entryText: 'You start with your domain. The Security Report becomes the first real object inside the OS, so the space begins with real context instead of an empty prompt box.', entryCta: 'Start Security Check',
    studioEyebrow: 'SAIMÔR · STUDIO', studioTitle: 'Build products. Make AI understandable.',
    studioText: 'Saimôr is our independent product studio. We combine experience in IT systems management and technical sales with hands-on product development, and we also offer talks, workshops and practical AI training.',
    offers: [['Talks', 'Putting AI into context without hype or buzzword fog.'], ['Training & workshops', 'Practical sessions for teams that want to use AI meaningfully.'], ['Prototypes & web projects', 'Turning ideas into something robust and testable quickly.']],
    talk: 'Ask about a talk or workshop', experiments: 'Other work', experimentsText: 'Earth · selected experiments, web projects and prototypes',
    finalEyebrow: 'CONTACT / OPEN CHANNEL', finalTitle: 'If Saimôr fits your problem, we should talk.', finalText: 'Send a short note about what you are building or where you are stuck.', finalCta: 'Open contact', scroll: 'SCROLL / LEARN MORE',
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
          <div className="flex items-center justify-between gap-4"><div className="font-mono text-[8px] font-semibold tracking-[0.24em] text-white/68 sm:text-[10px] sm:tracking-[0.28em]">{c.eyebrow}</div><div className="flex items-center gap-2 font-mono text-[8px] tracking-[0.16em] text-white/62 sm:text-[10px]"><span className="s-live h-1.5 w-1.5 rounded-full bg-[#8be0c5] shadow-[0_0_10px_rgba(139,224,197,.45)]" />SYSTEM ONLINE</div></div>
          <div className="grid flex-1 items-center gap-3 py-4 sm:gap-8 sm:py-8 lg:grid-cols-[1.08fr_.92fr] lg:gap-8 lg:py-0">
            <div className="order-2 lg:order-1 lg:pr-8"><div className="max-w-2xl"><h1 className="font-serif text-[clamp(4rem,16vw,8.6rem)] font-light leading-[.8] tracking-[-.065em] text-[#fbfbf5]">Saimôr</h1><p className="mt-5 max-w-2xl text-[clamp(1.65rem,3.2vw,2.8rem)] font-light leading-[1.12] tracking-[-.025em] text-white/96 sm:mt-6">{c.thesis}</p><p className="mt-5 max-w-xl text-sm leading-6 text-[#e4eee6]/78 sm:mt-6 sm:text-lg sm:leading-8">{c.intro}</p><div className="mt-7 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3"><Link href={securityHref} className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-[#eef2e6] px-6 py-3 text-sm font-bold text-[#102219] shadow-[0_14px_36px_rgba(8,29,20,.14)] transition hover:bg-white sm:min-h-14 sm:py-3.5"><ShieldCheck className="h-4 w-4" />{c.enter}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link><a href="#system" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-[#d9eadf]/26 bg-[#214735]/78 px-6 py-3 text-sm font-semibold text-white/88 transition hover:border-white/38 hover:bg-[#28543f] sm:min-h-14 sm:py-3.5">{c.learn}<ArrowRight className="h-4 w-4" /></a></div><div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-white/66 sm:text-xs"><Link href="/login?callbackUrl=%2Faccount%2Fbridge" className="inline-flex items-center gap-1.5 transition hover:text-white"><LogIn className="h-3.5 w-3.5" />{c.login}</Link><span className="hidden h-3 w-px bg-white/20 sm:block" /><a href="#studio" className="inline-flex items-center gap-1.5 text-[#f0d996]/90 transition hover:text-[#ffe7a7]"><Mic2 className="h-3.5 w-3.5" />{c.training}</a></div><p className="mt-4 max-w-lg text-[11px] leading-5 text-[#d5e5da]/62 sm:text-xs">{c.entryNote}</p></div></div>
            <div className="order-1 flex items-center justify-center lg:order-2 lg:justify-end"><div className="relative aspect-square w-[min(62vw,250px)] sm:w-[min(68vw,500px)] lg:w-[min(43vw,570px)]"><div className="s-halo absolute inset-[16%] rounded-full bg-[radial-gradient(circle,rgba(214,168,72,.18),transparent_66%)]" /><div className="s-halo-green absolute inset-[24%] rounded-full bg-[radial-gradient(circle,rgba(127,212,193,.14),transparent_68%)]" /><div className="s-orbit-a absolute inset-[4%] rounded-full border border-white/[0.18]" /><div className="s-orbit-b absolute inset-[16%] rounded-full border border-[#d6a848]/38" /><div className="s-orbit-c absolute inset-[28%] rounded-full border border-[#8be0c5]/30" /><div className="s-orbit-d absolute inset-[10%] rounded-[50%] border border-white/[0.10] [transform:rotate(-24deg)_scaleY(.68)]" /><span className="s-dot-a absolute left-[4%] top-[48%] h-2.5 w-2.5 rounded-full bg-[#e1b958] shadow-[0_0_18px_rgba(225,185,88,.58)]" /><span className="s-dot-b absolute right-[15%] top-[11%] h-2 w-2 rounded-full bg-[#8be0c5] shadow-[0_0_16px_rgba(139,224,197,.52)]" /><span className="s-dot-c absolute bottom-[12%] right-[13%] h-1.5 w-1.5 rounded-full bg-white/84" /><span className="s-dot-d absolute left-[23%] top-[13%] h-1 w-1 rounded-full bg-[#8ee8ef]" /><div className="absolute inset-[29%] flex items-center justify-center rounded-full border border-[#e0bb62]/38 bg-[#183b2d]/92 shadow-[0_0_44px_rgba(214,168,72,.12)]"><div className="absolute inset-[-12%] rounded-full border border-white/[0.10]" /><Image src="/saimor-seal-256.webp" alt="Saimôr" fill sizes="(max-width: 639px) 120px, 220px" priority className="rounded-full object-contain p-[14%] opacity-[0.99] mix-blend-screen" /></div>{c.orbit.map(([name, role], i) => { const positions = ['left-[-2%] top-[25%]', 'right-[-2%] top-[29%]', 'left-[6%] bottom-[16%]', 'right-[4%] bottom-[12%]']; return <div key={name} className={`absolute ${positions[i]} hidden sm:block`}><div className="rounded-full border border-white/[0.16] bg-[#17392c]/94 px-3 py-2 shadow-[0_10px_28px_rgba(7,25,18,.16)]"><div className="font-mono text-[9px] font-semibold tracking-[.18em] text-white/88">{name}</div><div className="mt-0.5 text-[9px] text-white/58">{role}</div></div></div>; })}</div></div>
          </div>
          <a href="#system" className="mx-auto hidden items-center gap-2 pb-1 font-mono text-[9px] tracking-[.22em] text-white/52 transition hover:text-white/78 sm:flex">{c.scroll}<span className="s-down inline-block">↓</span></a>
        </div>
      </section>

      <section id="system" className="relative min-h-[100svh] overflow-hidden border-b border-white/[.07] bg-[#080b09] text-[#f3f0e6]">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,244,216,.035),transparent_28%),radial-gradient(ellipse_at_72%_45%,rgba(92,157,126,.10),transparent_30%),linear-gradient(180deg,#080b09_0%,#0a0f0c_100%)]" />
        <div className="inside-beam pointer-events-none absolute -top-[18%] left-[57%] h-[118%] w-[22%] -rotate-[11deg] bg-[linear-gradient(90deg,transparent,rgba(238,222,176,.08),transparent)] blur-2xl" />
        <div className="inside-haze pointer-events-none absolute -right-[18%] top-[18%] h-[58%] w-[52%] rounded-full bg-[radial-gradient(circle,rgba(91,168,133,.11),transparent_68%)] blur-3xl" />
        <div className="relative mx-auto grid min-h-[100svh] max-w-7xl px-5 py-20 sm:px-8 md:grid-cols-[.72fr_1.28fr] md:items-center md:gap-16 md:py-28 lg:px-10">
          <div className="relative z-20 self-center">
            <p className="font-mono text-[9px] font-semibold tracking-[.30em] text-[#c9ae69]/68 sm:text-[10px]">{c.fieldEyebrow}</p>
            <h2 className="mt-6 max-w-xl font-serif text-[clamp(3.2rem,7vw,6.8rem)] font-light leading-[.88] tracking-[-.05em] text-[#f2efe4]">{c.fieldTitle}</h2>
            <div className="mt-10 h-px w-20 bg-[#c9ae69]/38" />
            <p className="mt-6 max-w-sm text-sm leading-7 text-[#d8d7cf]/48 sm:text-base">{c.saimorText}</p>
          </div>

          <div className="relative mt-14 h-[570px] md:mt-0 md:h-[720px]">
            <div className="absolute inset-y-[7%] left-[6%] right-[2%] [perspective:1200px]">
              <div className="inside-plane plane-back absolute left-[7%] top-[4%] h-[82%] w-[62%] border border-white/[.07] bg-[linear-gradient(145deg,rgba(255,255,255,.035),rgba(255,255,255,.006))] shadow-[0_40px_100px_rgba(0,0,0,.38)] backdrop-blur-[2px] [transform:rotateY(18deg)_rotateX(2deg)]" />
              <div className="inside-plane plane-mid absolute right-[4%] top-[16%] h-[66%] w-[54%] border border-[#b7d8c6]/[.09] bg-[linear-gradient(150deg,rgba(87,139,112,.08),rgba(7,12,9,.20))] shadow-[0_50px_110px_rgba(0,0,0,.46)] backdrop-blur-[3px] [transform:rotateY(-15deg)_translateZ(30px)]" />
              <div className="inside-plane plane-front absolute bottom-[2%] left-[18%] h-[38%] w-[58%] border border-[#d4bd7b]/[.11] bg-[linear-gradient(155deg,rgba(222,201,142,.055),rgba(10,15,12,.34))] shadow-[0_34px_90px_rgba(0,0,0,.5)] backdrop-blur-[4px] [transform:rotateX(7deg)_rotateZ(-2deg)_translateZ(70px)]" />

              <div className="absolute left-[14%] top-[15%] z-20"><div className="font-mono text-[8px] tracking-[.25em] text-white/28">01 / FILES</div><div className="mt-2 h-px w-24 bg-white/[.10]" /></div>
              <div className="absolute right-[9%] top-[34%] z-20 text-right"><div className="font-mono text-[8px] tracking-[.25em] text-white/28">02 / WORK</div><div className="mt-2 ml-auto h-px w-20 bg-white/[.10]" /></div>
              <div className="absolute bottom-[14%] left-[26%] z-20"><div className="font-mono text-[8px] tracking-[.25em] text-[#d5bc78]/42">03 / {c.saimor}</div></div>

              <div className="mora-trace absolute right-[18%] top-[25%] z-30 h-[42%] w-px bg-gradient-to-b from-transparent via-[#91dec7]/70 to-transparent shadow-[0_0_20px_rgba(145,222,199,.45)]" />
              <div className="mora-presence absolute bottom-[18%] right-[5%] z-30 max-w-[220px] text-right"><div className="font-mono text-[9px] tracking-[.26em] text-[#91dec7]/72">{c.mora}</div><div className="mt-3 font-serif text-2xl font-light leading-tight text-[#e8eee8]/82 sm:text-3xl">{c.moraText}</div></div>
              <span className="context-pulse absolute left-[43%] top-[44%] z-30 h-2 w-2 rounded-full bg-[#dfca8d] shadow-[0_0_30px_rgba(223,202,141,.72)]" />
            </div>
            <div className="absolute bottom-0 left-[9%] right-[5%] h-px bg-gradient-to-r from-transparent via-white/[.10] to-transparent" />
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-20 sm:px-8 md:pb-28 lg:px-10"><div className="grid gap-8 border-t border-white/[.09] pt-8 md:grid-cols-[.8fr_1.2fr] md:items-end"><div><div className="flex items-center gap-2 font-mono text-[9px] font-semibold tracking-[.22em] text-[#91dec7]/72"><span className="h-1.5 w-1.5 rounded-full bg-[#91dec7]" />{c.entryLabel}</div><h3 className="mt-4 max-w-md font-serif text-3xl font-light leading-tight text-[#f2efe4] sm:text-4xl">{c.entryTitle}</h3></div><div><p className="max-w-2xl text-sm leading-6 text-[#d7ddd8]/52 sm:text-base sm:leading-7">{c.entryText}</p><Link href={securityHref} className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#e8e6dd] transition hover:text-white">{c.entryCta}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link></div></div></div>
      </section>

      <section id="studio" className="relative border-b border-[#d9eadf]/10 bg-[radial-gradient(circle_at_20%_10%,rgba(214,168,72,.09),transparent_31%),#17352a] px-5 py-20 sm:px-8 md:py-28 lg:px-10"><div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.88fr_1.12fr] lg:gap-20"><div><p className="font-mono text-[9px] font-semibold tracking-[.28em] text-[#e0bd67]/88 sm:text-[10px]">{c.studioEyebrow}</p><h2 className="mt-5 max-w-xl font-serif text-4xl font-light leading-[.98] tracking-[-.035em] text-white/96 sm:text-6xl">{c.studioTitle}</h2><p className="mt-7 max-w-xl text-sm leading-7 text-[#dce9e0]/68 sm:text-base">{c.studioText}</p><Link href={contactHref} className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#f0d38c] transition hover:text-[#ffe3a0]"><Mic2 className="h-4 w-4" />{c.talk}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link></div><div className="border-t border-white/[0.15]">{c.offers.map(([name,text],index)=><div key={name} className="grid gap-3 border-b border-white/[0.12] py-7 sm:grid-cols-[42px_.8fr_1.2fr] sm:items-start sm:gap-6"><div className="font-mono text-[9px] tracking-[.18em] text-white/46">0{index+1}</div><div className="text-lg font-medium text-white/94 sm:text-xl">{name}</div><p className="text-sm leading-6 text-[#dce9e0]/64">{text}</p></div>)}<div className="pt-7"><div className="font-mono text-[9px] uppercase tracking-[.2em] text-white/48">{c.experiments}</div><p className="mt-2 text-sm text-[#dce9e0]/58">{c.experimentsText}</p></div></div></div></section>
      <section id="contact" className="bg-[#112c21] px-5 py-20 sm:px-8 md:py-28 lg:px-10"><div className="mx-auto max-w-7xl"><div className="grid gap-10 border-t border-white/[0.15] pt-10 md:grid-cols-[1fr_auto] md:items-end"><div><p className="font-mono text-[9px] font-semibold tracking-[.25em] text-[#91dec7]/82">{c.finalEyebrow}</p><h2 className="mt-5 max-w-4xl font-serif text-4xl font-light leading-[.98] tracking-[-.035em] text-white/96 sm:text-6xl md:text-7xl">{c.finalTitle}</h2><p className="mt-6 max-w-2xl text-sm leading-7 text-[#dce9e0]/64 sm:text-base">{c.finalText}</p></div><Link href={contactHref} className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-[#e0bd67]/40 px-6 py-3.5 text-sm font-semibold text-[#f0d38c] transition hover:border-[#e0bd67]/68 hover:bg-[#d6a848]/[0.07]">{c.finalCta}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link></div></div></section>

      <style jsx>{`
        @keyframes orbitA{from{transform:rotate(0deg) scaleX(1.08)}to{transform:rotate(360deg) scaleX(1.08)}} @keyframes orbitB{from{transform:rotate(360deg) scaleY(.86)}to{transform:rotate(0deg) scaleY(.86)}} @keyframes orbitC{from{transform:rotate(12deg) scaleX(1.14)}to{transform:rotate(372deg) scaleX(1.14)}} @keyframes orbitD{from{transform:rotate(-24deg) scaleY(.68)}to{transform:rotate(336deg) scaleY(.68)}}
        @keyframes pulseSoft{0%,100%{opacity:.62}50%{opacity:1}} @keyframes down{0%,100%{transform:translateY(0);opacity:.45}50%{transform:translateY(4px);opacity:.82}}
        @keyframes beamDrift{0%,100%{transform:translateX(-4%) rotate(-11deg);opacity:.55}50%{transform:translateX(8%) rotate(-8deg);opacity:1}} @keyframes planeFloat{0%,100%{translate:0 0}50%{translate:0 -8px}} @keyframes traceScan{0%,100%{opacity:.18;transform:translateY(-10%)}50%{opacity:.9;transform:translateY(12%)}} @keyframes contextPulse{0%,100%{transform:scale(.65);opacity:.35}50%{transform:scale(1.35);opacity:1}}
        .s-dot-a,.s-dot-b,.s-dot-c,.s-dot-d,.s-live,.s-halo,.s-halo-green{animation:pulseSoft 6.5s ease-in-out infinite}.s-down{animation:down 2.2s ease-in-out infinite}.inside-beam{animation:beamDrift 14s ease-in-out infinite}.inside-plane{animation:planeFloat 10s ease-in-out infinite}.plane-mid{animation-delay:-3s}.plane-front{animation-delay:-6s}.mora-trace{animation:traceScan 6s ease-in-out infinite}.context-pulse{animation:contextPulse 4.8s ease-in-out infinite}.inside-haze{animation:pulseSoft 12s ease-in-out infinite}.mora-presence{animation:pulseSoft 8s ease-in-out infinite}
        @media(min-width:640px){.s-orbit-a{animation:orbitA 72s linear infinite}.s-orbit-b{animation:orbitB 88s linear infinite}.s-orbit-c{animation:orbitC 106s linear infinite}.s-orbit-d{animation:orbitD 124s linear infinite}}
        @media(max-width:639px){.s-dot-a,.s-dot-b,.s-dot-c,.s-dot-d,.s-halo,.s-halo-green{animation:none!important}}
        @media(prefers-reduced-motion:reduce){.s-orbit-a,.s-orbit-b,.s-orbit-c,.s-orbit-d,.s-dot-a,.s-dot-b,.s-dot-c,.s-dot-d,.s-live,.s-halo,.s-halo-green,.s-down,.inside-beam,.inside-plane,.mora-trace,.context-pulse,.inside-haze,.mora-presence{animation:none!important}}
      `}</style>
    </div>
  );
}