import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, LogIn, Mic2, ShieldCheck, Sparkles } from 'lucide-react';

import styles from './SystemWorldHome.module.css';
import OrbitalScene from './OrbitalScene';
import AiRealityTeaser from './AiRealityTeaser';
import SaimorShowcase from './SaimorShowcase';
import PortalExperience from './PortalExperience';
import EarthEntry from './EarthEntry';

type Locale = 'de' | 'en';
type Props = { locale: Locale };

const COPY = {
  de: {
    eyebrow: 'SAIMÔR · KLARHEIT IM WANDEL',
    thesis: 'Arbeitsräume, die Kontext behalten.',
    intro: 'Deine Arbeit lebt in vielen Apps. Dein Zusammenhang sollte das nicht müssen. SAIMÔR bringt Wissen, Werkzeuge und Entscheidungen in eine gemeinsame Arbeitswelt – mit MÔRA als Begleitung.',
    enter: 'Produkte entdecken', learn: 'Security Check', login: 'Einloggen', training: 'Beratung · Workshops · Umsetzung', yori: 'YORI für Creator',
    orbit: [['DATEIEN', 'im Zusammenhang'], ['MÔRA', 'proaktive Assistenz'], ['ARBEIT', 'Kalender · Inbox · Board'], ['AGENTS', 'Ausführung im Hintergrund']],
    fieldEyebrow: 'MÔRA / KONTEXT', fieldTitle: 'Kontext soll mitkommen, nicht jedes Mal neu erklärt werden.',
    saimor: 'SAIMÔR', saimorText: 'Manches sollte nicht verloren gehen, nur weil der Tag weiterzieht.', mora: 'MÔRA', moraText: 'merkt, was sich verändert',
    entryLabel: 'EINSTIEG / SECURITY CHECK', entryTitle: 'Mit etwas Echtem statt mit einer leeren Promptbox starten.',
    entryText: 'Du startest mit deiner Domain. Der Security Report wird zum ersten echten Objekt im OS. Damit beginnt der Raum bereits mit realem Kontext.', entryCta: 'Security Check starten',
    studioEyebrow: 'SAIMÔR · BERATUNG / WORKSHOPS / UMSETZUNG', studioTitle: 'Aus einer Frage wird ein nächster Schritt.',
    studioText: 'Wir beginnen nicht mit einem Tool, sondern mit dem Zusammenhang. Erst klären wir, was wirklich gebraucht wird. Dann entsteht, was hilft: ein Workshop, ein Pilot oder eine sauber integrierte Arbeitslösung.',
    offers: [['Beratung', 'Erstgespräch und Standortbestimmung: Wo entsteht Reibung, was ist schon da und wo lohnt sich ein nächster Schritt?'], ['Workshops', 'Gemeinsame Arbeitsformate, in denen Teams KI verständlich einordnen und praktisch anwenden.'], ['Umsetzung', 'Integrationen, Automatisierungen und Arbeitsräume – mit klaren Grenzen, echten Daten und nachvollziehbaren Aktionen.']],
    talk: 'Gespräch anfragen', experiments: 'Produkte', experimentsText: 'ausgewählte Experimente und Prototypen',
    intelligenceEyebrow: 'SAIMÔR / INTELLIGENCE LAYER',
    intelligenceTitle: 'Modelle ändern sich. Kontext bleibt.',
    intelligenceText: 'Modelle und Werkzeuge werden sich verändern. Was Menschen entscheiden, wissen und freigeben, braucht einen verlässlichen Zusammenhang. Dafür bauen wir SAIMÔR.',
    intelligenceMora: 'MÔRA hält den Zusammenhang',
    intelligenceCore: 'CORE hält Wahrheit, Identität und Grenzen',
    intelligenceWorkers: 'Modelle, Agents und Tools bleiben austauschbar',
    finalEyebrow: 'KONTAKT / NÄCHSTER SCHRITT', finalTitle: 'Gute Systeme beginnen mit einer guten Frage.', finalText: 'Was sollte einfacher werden? Was geht heute zwischen Menschen und Werkzeugen verloren? Daraus lässt sich etwas Konkretes machen.', finalCta: 'Kontakt öffnen', scroll: 'SCROLL / MEHR ERFAHREN',
  },
  en: {
    eyebrow: 'SAIMÔR · CLARITY THROUGH CHANGE', thesis: 'Workspaces that keep context.',
    intro: 'Your work lives across many apps. Your context should not have to. SAIMÔR brings knowledge, tools and decisions into a connected workspace – with MÔRA alongside you.',
    enter: 'Explore products', learn: 'Security Check', login: 'Log in', training: 'Consulting · Workshops · Implementation', yori: 'YORI for creators',
    orbit: [['FILES', 'kept in context'], ['MÔRA', 'proactive assistant'], ['WORK', 'calendar · inbox · board'], ['AGENTS', 'background execution']],
    fieldEyebrow: 'MÔRA / CONTEXT', fieldTitle: 'Context should come with you instead of being explained again every time.',
    saimor: 'SAIMÔR', saimorText: 'Some things should not get lost just because the day moves on.', mora: 'MÔRA', moraText: 'notices when something changes',
    entryLabel: 'ENTRY / SECURITY CHECK', entryTitle: 'Start with something real instead of an empty prompt box.',
    entryText: 'You start with your domain. The Security Report becomes the first real object inside the OS, so the space begins with real context.', entryCta: 'Start Security Check',
    studioEyebrow: 'SAIMÔR · CONSULTING / WORKSHOPS / IMPLEMENTATION', studioTitle: 'A question becomes a next step.',
    studioText: 'We do not begin with a tool; we begin with the context. First we clarify what is needed. Then we shape what helps: a workshop, a pilot or a thoughtfully connected workspace.',
    offers: [['Consulting', 'A first conversation and clear assessment: where is the friction, what already exists and where is the next useful move?'], ['Workshops', 'Shared formats that help teams understand AI and apply it in real work.'], ['Implementation', 'Integrations, automations and workspaces with clear boundaries, real data and auditable actions.']],
    talk: 'Start a conversation', experiments: 'Products', experimentsText: 'selected experiments and prototypes',
    intelligenceEyebrow: 'SAIMÔR / INTELLIGENCE LAYER',
    intelligenceTitle: 'Models change. Context remains.',
    intelligenceText: 'Models and tools will change. What people decide, know and approve deserves a reliable thread. That is what we are building SAIMÔR for.',
    intelligenceMora: 'MÔRA keeps the thread',
    intelligenceCore: 'CORE keeps truth, identity and boundaries',
    intelligenceWorkers: 'Models, agents and tools stay replaceable',
    finalEyebrow: 'CONTACT / NEXT STEP', finalTitle: 'Better systems start with a better question.', finalText: 'What should become easier? What gets lost between people and tools? That is where we can begin.', finalCta: 'Open contact', scroll: 'SCROLL / LEARN MORE',
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
        <Image src="/images/saimor-cosmos-layer.webp" alt="" fill priority quality={95} sizes="(max-width: 390px) 185vw, (max-width: 700px) 175vw, (min-resolution: 2.5dppx) 557px, (max-width: 836px) 100vw, 836px" className={styles.heroImage} />
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>{c.eyebrow}</p>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <h1 id="world-title">Saimôr</h1>
              <p className={styles.thesis}>{c.thesis}</p>
              <p className={styles.intro}>{c.intro}</p>
              <div className={styles.actions}>
                <Link href="#products" className={styles.primary}>{c.enter}<ArrowRight size={19} aria-hidden="true" /></Link>
                <Link href={securityHref} className={styles.textLink}><ShieldCheck size={16} aria-hidden="true" />{c.learn}<ArrowRight size={16} aria-hidden="true" /></Link>
              </div>
              <div className={styles.utilityLinks}>
                <Link href="/login?callbackUrl=%2Faccount%2Fbridge"><LogIn size={14} aria-hidden="true" />{c.login}</Link>
                <Link href={locale === 'de' ? '/yori' : '/en/yori'}><Sparkles size={14} aria-hidden="true" />{c.yori}</Link>
                <a href={locale === 'de' ? '/studio' : '/en/studio'}><Mic2 size={14} aria-hidden="true" />{c.training}</a>
              </div>
            </div>
            <OrbitalScene />
          </div>
          <div className={styles.sceneFooter}><span>{locale === 'de' ? 'EIN ORT · ALLES IM KONTEXT' : 'ONE PLACE · EVERYTHING IN CONTEXT'}</span><Link href="#system">{c.scroll}<ArrowRight size={14} aria-hidden="true" /></Link></div>
        </div>
        <EarthEntry locale={locale} />
      </section>

      <section id="system" className={styles.system} aria-labelledby="inside-title">
        <div className={styles.threshold}>
          <Image src="/images/saimor-forest-threshold.webp" alt="" fill quality={90} sizes="100vw" className={styles.forestImage} />
          <div className={styles.forestShade} aria-hidden="true" />
          <div className={styles.thresholdInner}>
            <div className={styles.contextCopy}>
              <p className={styles.eyebrow}>{c.fieldEyebrow}</p>
              <h2 id="inside-title">{c.fieldTitle}</h2>
              <p className={styles.contextBody}>{c.saimorText}</p>
            </div>
            <div className={styles.contextStage}>
              <div className={styles.portalCanvas}>
                <PortalExperience locale={locale} />
              </div>

            </div>
          </div>
        </div>
        <div className={styles.moraIntroduction}>
          <div><p className={styles.eyebrow}>{locale === 'de' ? 'DIE WELT DER KI / REALITY CHECK' : 'THE WORLD OF AI / REALITY CHECK'}</p>
            <h3>{locale === 'de' ? 'Überzeugend. Aber wahr?' : 'Convincing. But true?'}</h3>
            <p>{locale === 'de' ? 'Zwischen dem, was KI möglich macht, und dem, worauf du dich verlassen kannst, liegt ein entscheidender Unterschied.' : 'There is a meaningful distance between what AI makes possible and what you can rely on.'}</p>
          </div>
          <AiRealityTeaser locale={locale} />
        </div>
        <div className={styles.entry}>
          <div><p className={styles.eyebrow}>{c.entryLabel}</p><h3>{c.entryTitle}</h3></div>
          <div><p>{c.entryText}</p><Link href={securityHref} className={styles.textLink}>{c.entryCta}<ArrowRight size={17} aria-hidden="true" /></Link></div>
        </div>
      </section>

      <SaimorShowcase locale={locale} />

      <section className={`${styles.daylightIntelligence} relative overflow-hidden px-5 py-20 sm:px-8 md:py-28 lg:px-10`} aria-labelledby="intelligence-title">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_32%,rgba(118,164,128,.15),transparent_28%),radial-gradient(circle_at_18%_72%,rgba(214,168,72,.12),transparent_30%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl">
          <p className="font-mono text-[9px] font-semibold tracking-[.28em] text-[#3b6a52] sm:text-[10px]">{c.intelligenceEyebrow}</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
            <h2 id="intelligence-title" className="max-w-4xl font-serif text-4xl font-light leading-[.95] tracking-[-.04em] text-[#17392b] sm:text-6xl md:text-7xl">{c.intelligenceTitle}</h2>
            <p className="max-w-2xl text-sm leading-7 text-[#415c4b] sm:text-base">{c.intelligenceText}</p>
          </div>
          <div className="mt-12 grid border-t border-[#335343]/20 md:grid-cols-3">
            {[
              ['01', 'MÔRA', c.intelligenceMora],
              ['02', 'CORE', c.intelligenceCore],
              ['03', locale === 'de' ? 'WORKER / MODELLE' : 'WORKERS / MODELS', c.intelligenceWorkers],
            ].map(([index, title, text]) => (
              <div key={index} className="border-b border-[#335343]/20 py-7 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                <div className="font-mono text-[9px] tracking-[.18em] text-[#718264]">{index}</div>
                <div className="mt-3 text-lg font-medium text-[#244a36]">{title}</div>
                <p className="mt-2 text-sm leading-6 text-[#4b6454]">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-9 font-mono text-[10px] uppercase tracking-[.18em] text-[#4c694b]">
            {locale === 'de' ? 'Die Intelligenz darf sich verändern. Der Kontext bleibt deiner.' : 'The intelligence may change. The context remains yours.'}
          </p>
        </div>
      </section>

      <section id="studio" className={`${styles.daylightStudio} relative px-5 py-20 sm:px-8 md:py-28 lg:px-10`}><div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.88fr_1.12fr] lg:gap-20"><div><p className="font-mono text-[9px] font-semibold tracking-[.28em] text-[#637a58] sm:text-[10px]">{c.studioEyebrow}</p><h2 className="mt-5 max-w-xl font-serif text-4xl font-light leading-[.98] tracking-[-.035em] text-[#163b2a] sm:text-6xl">{c.studioTitle}</h2><p className="mt-7 max-w-xl text-sm leading-7 text-[#425d4a] sm:text-base">{c.studioText}</p><Link href={locale === 'de' ? '/studio' : '/en/studio'} className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#276447] transition hover:text-[#123c28]"><Mic2 className="h-4 w-4" />{locale === 'de' ? 'Studio entdecken' : 'Explore Studio'}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link></div><div className="border-t border-[#3a5e46]/25">{c.offers.map(([name,text],index)=><div key={name} className="group grid gap-3 border-b border-[#3a5e46]/20 py-7 transition-colors hover:bg-[#b8d5b4]/10 sm:grid-cols-[42px_.8fr_1.2fr_auto] sm:items-start sm:gap-6"><div className="font-mono text-[9px] tracking-[.18em] text-[#718675]">0{index+1}</div><div className="text-lg font-medium text-[#1b422f] sm:text-xl">{name}</div><p className="text-sm leading-6 text-[#405c48]">{text}</p><Link href={`${locale === 'de' ? '/studio' : '/en/studio'}#${index === 0 ? 'beratung' : index === 1 ? 'workshops' : 'umsetzung'}`} className="inline-flex min-h-11 items-center gap-1 text-xs font-semibold text-[#225e42] underline-offset-4 transition group-hover:gap-2 hover:underline" aria-label={`${name} ${locale === 'de' ? 'entdecken' : 'explore'}`}>{locale === 'de' ? 'Ansehen' : 'Explore'}<ArrowUpRight size={15} aria-hidden="true" /></Link></div>)}<div className="pt-7"><div className="font-mono text-[9px] uppercase tracking-[.2em] text-[#617966]">{c.experiments}</div><p className="mt-2 text-sm text-[#536b58]"><Link href={locale === 'de' ? '/yori' : '/en/yori'} className="text-[#2b6344] underline decoration-[#2b6344]/30 underline-offset-4 transition hover:text-[#123c28] hover:decoration-[#123c28]/60">YORI</Link> · <Link href="/earth" className="text-[#2b6344] underline decoration-[#2b6344]/30 underline-offset-4 transition hover:text-[#123c28] hover:decoration-[#123c28]/60">Saimôr Earth</Link> · {c.experimentsText}</p></div></div></div></section>
      <section id="contact" className={`${styles.daylightContact} px-5 py-20 sm:px-8 md:py-28 lg:px-10`}><div className="mx-auto max-w-7xl"><div className="grid gap-10 border-t border-[#3a5e46]/25 pt-10 md:grid-cols-[1fr_auto] md:items-end"><div><p className="font-mono text-[9px] font-semibold tracking-[.25em] text-[#476e55]">{c.finalEyebrow}</p><h2 className="mt-5 max-w-4xl font-serif text-4xl font-light leading-[.98] tracking-[-.035em] text-[#173a2b] sm:text-6xl md:text-7xl">{c.finalTitle}</h2><p className="mt-6 max-w-2xl text-sm leading-7 text-[#405c49] sm:text-base">{c.finalText}</p></div><Link href={contactHref} className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-[#225c40] bg-[#225c40] px-6 py-3.5 text-sm font-semibold text-[#fff9ed] transition hover:border-[#17462f] hover:bg-[#17462f]">{c.finalCta}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link></div></div></section>


    </div>
  );
}
