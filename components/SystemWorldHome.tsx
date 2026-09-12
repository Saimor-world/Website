import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, LogIn, Mic2, ShieldCheck, FileText, CalendarDays, CircleCheck, Sparkles } from 'lucide-react';

import styles from './SystemWorldHome.module.css';
import OrbitalScene from './OrbitalScene';
import MoraSignalPreview from './MoraSignalPreview';

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
    fieldEyebrow: 'MÔRA / KONTEXT', fieldTitle: 'Du musst nicht jedes Mal von vorn anfangen.',
    saimor: 'SAIMÔR', saimorText: 'Dateien, Termine und offene Dinge bleiben zusammen. MÔRA kennt den Stand und kann dort weitermachen.', mora: 'MÔRA', moraText: 'merkt, was sich verändert',
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
    fieldEyebrow: 'MÔRA / CONTEXT', fieldTitle: 'You should not have to start from scratch every time.',
    saimor: 'SAIMÔR', saimorText: 'Files, meetings and open work stay together. MÔRA knows where things stand and can continue from there.', mora: 'MÔRA', moraText: 'notices when something changes',
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
    <div className={styles.world}>
      <section className={styles.hero} aria-labelledby="world-title">
        <label className={styles.motionControl}><input type="checkbox" name="world-motion" />{locale === 'de' ? 'Bewegung pausieren' : 'Pause motion'}</label>
        <Image src="/images/saimor-cosmos-layer.webp" alt="" fill priority quality={95} sizes="(min-resolution: 2.5dppx) 557px, (max-width: 836px) 100vw, 836px" className={styles.heroImage} />
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>{c.eyebrow}</p>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <h1 id="world-title">Saimôr</h1>
              <p className={styles.thesis}>{c.thesis}</p>
              <p className={styles.intro}>{c.intro}</p>
              <div className={styles.actions}>
                <Link href={securityHref} className={styles.primary}><ShieldCheck size={19} aria-hidden="true" />{c.enter}<ArrowRight size={19} aria-hidden="true" /></Link>
                <a href="#system" className={styles.textLink}>{c.learn}<ArrowRight size={17} aria-hidden="true" /></a>
              </div>
              <div className={styles.utilityLinks}>
                <Link href="/login?callbackUrl=%2Faccount%2Fbridge"><LogIn size={14} aria-hidden="true" />{c.login}</Link>
                <a href="#studio"><Mic2 size={14} aria-hidden="true" />{c.training}</a>
              </div>
              <p className={styles.entryNote}>{c.entryNote}</p>
            </div>
            <OrbitalScene />
          </div>
          <div className={styles.sceneFooter}><span>{locale === 'de' ? 'EIN ORT · ALLES IM KONTEXT' : 'ONE PLACE · EVERYTHING IN CONTEXT'}</span><a href="#system">{c.scroll}<ArrowRight size={14} aria-hidden="true" /></a></div>
        </div>
      </section>

      <section id="system" className={styles.system} aria-labelledby="inside-title">
        <div className={styles.threshold}>
          <Image src="/images/saimor-forest-layer.webp" alt="" fill quality={95} sizes="(min-resolution: 2.5dppx) 557px, (max-width: 836px) 100vw, 836px" className={styles.forestImage} />
          <div className={styles.forestShade} aria-hidden="true" />
          <div className={styles.portalScene} aria-hidden="true"><div className={styles.portalFrame}><span className={styles.portalVeil} /></div><div className={styles.portalReflection} /><span className={styles.moraLight} /><span className={styles.lightThread} /></div>
          <div className={styles.thresholdInner}>
            <div className={styles.contextCopy}>
              <p className={styles.eyebrow}>{c.fieldEyebrow}</p>
              <h2 id="inside-title">{c.fieldTitle}</h2>
              <p className={styles.contextBody}>{c.saimorText}</p>
              <Link href={locale === 'de' ? '/mora' : '/en/mora'} className={styles.outline}>{locale === 'de' ? 'MÔRA kennenlernen' : 'Meet MÔRA'}<ArrowRight size={18} aria-hidden="true" /></Link>
            </div>
            <ul className={styles.contextObjects} aria-label={locale === 'de' ? 'Zusammen im Arbeitsraum' : 'Together in the workspace'}>
              {[{icon: FileText, title: locale === 'de' ? 'Dateien' : 'Files', detail: locale === 'de' ? 'im Kontext' : 'in context'},
                {icon: CalendarDays, title: locale === 'de' ? 'Termine' : 'Meetings', detail: locale === 'de' ? 'verbunden' : 'connected'},
                {icon: CircleCheck, title: locale === 'de' ? 'Offene Dinge' : 'Open work', detail: locale === 'de' ? 'im Blick' : 'in view'},
                {icon: Sparkles, title: 'MÔRA', detail: locale === 'de' ? 'im selben Raum' : 'in the same space'}].map(({icon: Icon, title, detail}) => <li key={title}><Icon size={24} strokeWidth={1.3} aria-hidden="true" /><div><span>{title}</span><small>{detail}</small></div></li>)}
            </ul>
            <div className={styles.thresholdCaption}>{locale === 'de' ? 'KONTEXT · KONTINUITÄT · KLARHEIT' : 'CONTEXT · CONTINUITY · CLARITY'}</div>
          </div>
        </div>
        <div className={styles.moraIntroduction}>
          <div><p className={styles.eyebrow}>{locale === 'de' ? 'VOM SIGNAL ZUM NÄCHSTEN SCHRITT' : 'FROM SIGNAL TO NEXT STEP'}</p>
            <h3>{locale === 'de' ? 'Eine Assistenz, die den Zusammenhang behält.' : 'An assistant that keeps the context.'}</h3>
            <p>{locale === 'de' ? 'MÔRA arbeitet mit dem Kontext deines Arbeitsraums: Was gehört zusammen? Was hat sich verändert? Was ist als Nächstes dran? Verbundene Quellen bilden die Grundlage. Aktionen brauchen die passenden Freigaben.' : 'MÔRA works with the context of your workspace: What belongs together? What has changed? What comes next? Connected sources provide the foundation. Actions require the appropriate permissions.'}</p>
            <Link href={locale === 'de' ? '/mora/deep-view' : '/en/mora/deep-view'} className={styles.textLink}>{locale === 'de' ? 'Öffentliche Signale in Deep View ansehen' : 'Explore public signals in Deep View'}<ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
          <MoraSignalPreview locale={locale} />
        </div>
        <div className={styles.entry}>
          <div><p className={styles.eyebrow}>{c.entryLabel}</p><h3>{c.entryTitle}</h3></div>
          <div><p>{c.entryText}</p><Link href={securityHref} className={styles.textLink}>{c.entryCta}<ArrowRight size={17} aria-hidden="true" /></Link></div>
        </div>
      </section>

      <section id="studio" className="relative border-b border-[#d9eadf]/10 bg-[radial-gradient(circle_at_20%_10%,rgba(214,168,72,.09),transparent_31%),#081710] px-5 py-20 sm:px-8 md:py-28 lg:px-10"><div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.88fr_1.12fr] lg:gap-20"><div><p className="font-mono text-[9px] font-semibold tracking-[.28em] text-[#e0bd67]/88 sm:text-[10px]">{c.studioEyebrow}</p><h2 className="mt-5 max-w-xl font-serif text-4xl font-light leading-[.98] tracking-[-.035em] text-white/96 sm:text-6xl">{c.studioTitle}</h2><p className="mt-7 max-w-xl text-sm leading-7 text-[#dce9e0]/68 sm:text-base">{c.studioText}</p><Link href={contactHref} className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#f0d38c] transition hover:text-[#ffe3a0]"><Mic2 className="h-4 w-4" />{c.talk}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link></div><div className="border-t border-white/[0.15]">{c.offers.map(([name,text],index)=><div key={name} className="grid gap-3 border-b border-white/[0.12] py-7 sm:grid-cols-[42px_.8fr_1.2fr] sm:items-start sm:gap-6"><div className="font-mono text-[9px] tracking-[.18em] text-white/46">0{index+1}</div><div className="text-lg font-medium text-white/94 sm:text-xl">{name}</div><p className="text-sm leading-6 text-[#dce9e0]/64">{text}</p></div>)}<div className="pt-7"><div className="font-mono text-[9px] uppercase tracking-[.2em] text-white/48">{c.experiments}</div><p className="mt-2 text-sm text-[#dce9e0]/58">{c.experimentsText}</p></div></div></div></section>
      <section id="contact" className="bg-[#06110d] px-5 py-20 sm:px-8 md:py-28 lg:px-10"><div className="mx-auto max-w-7xl"><div className="grid gap-10 border-t border-white/[0.15] pt-10 md:grid-cols-[1fr_auto] md:items-end"><div><p className="font-mono text-[9px] font-semibold tracking-[.25em] text-[#91dec7]/82">{c.finalEyebrow}</p><h2 className="mt-5 max-w-4xl font-serif text-4xl font-light leading-[.98] tracking-[-.035em] text-white/96 sm:text-6xl md:text-7xl">{c.finalTitle}</h2><p className="mt-6 max-w-2xl text-sm leading-7 text-[#dce9e0]/64 sm:text-base">{c.finalText}</p></div><Link href={contactHref} className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-[#e0bd67]/40 px-6 py-3.5 text-sm font-semibold text-[#f0d38c] transition hover:border-[#e0bd67]/68 hover:bg-[#d6a848]/[0.07]">{c.finalCta}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link></div></div></section>


    </div>
  );
}