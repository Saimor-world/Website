import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, LogIn, Mic2, ShieldCheck, FileText, CalendarDays, CircleCheck, Sparkles } from 'lucide-react';

import styles from './SystemWorldHome.module.css';
import OrbitalScene from './OrbitalScene';
import MoraSignalPreview from './MoraSignalPreview';
import SaimorShowcase from './SaimorShowcase';

type Locale = 'de' | 'en';
type Props = { locale: Locale };

const COPY = {
  de: {
    eyebrow: 'SAIMÔR · KLARHEIT IM WANDEL',
    thesis: 'Arbeitsräume, die Kontext behalten.',
    intro: 'Deine Arbeit lebt in vielen Apps. Dein Zusammenhang sollte das nicht müssen. SAIMÔR bringt Wissen, Werkzeuge und Entscheidungen in eine gemeinsame Arbeitswelt – mit MÔRA als Begleitung.',
    enter: 'SAIMÔR entdecken', learn: 'Security Check', login: 'Einloggen', training: 'Beratung · Workshops · Umsetzung', yori: 'YORI für Creator',
    entryNote: 'Ein konkreter Einstieg: Der Security Check prüft öffentliche Signale deiner Domain.',
    orbit: [['DATEIEN', 'im Zusammenhang'], ['MÔRA', 'proaktive Assistenz'], ['ARBEIT', 'Kalender · Inbox · Board'], ['AGENTS', 'Ausführung im Hintergrund']],
    fieldEyebrow: 'MÔRA / KONTEXT', fieldTitle: 'Kontext soll mitkommen, nicht jedes Mal neu erklärt werden.',
    saimor: 'SAIMÔR', saimorText: 'Dateien, Termine, Entscheidungen und offene Dinge bleiben zusammen. MÔRA arbeitet mit diesem Zusammenhang, statt bei jedem Kontakt wieder bei null zu beginnen.', mora: 'MÔRA', moraText: 'merkt, was sich verändert',
    entryLabel: 'EINSTIEG / SECURITY CHECK', entryTitle: 'Mit etwas Echtem statt mit einer leeren Promptbox starten.',
    entryText: 'Du startest mit deiner Domain. Der Security Report wird zum ersten echten Objekt im OS. Damit beginnt der Raum bereits mit realem Kontext.', entryCta: 'Security Check starten',
    studioEyebrow: 'SAIMÔR · BERATUNG / WORKSHOPS / UMSETZUNG', studioTitle: 'Klarheit im Wandel – vom ersten Gespräch bis zur Umsetzung.',
    studioText: 'Wir beginnen nicht mit einem Tool, sondern mit dem Zusammenhang. Erst klären wir, was wirklich gebraucht wird. Dann bringen wir Teams gemeinsam ins Arbeiten und setzen Integrationen, Automatisierungen und Arbeitsräume belastbar um.',
    offers: [['Beratung', 'Erstgespräch und Standortbestimmung: Wo entsteht Reibung, was ist schon da und wo lohnt sich ein nächster Schritt?'], ['Workshops', 'Gemeinsame Arbeitsformate, in denen Teams KI verständlich einordnen und praktisch anwenden.'], ['Umsetzung', 'Integrationen, Automatisierungen und Arbeitsräume – mit klaren Grenzen, echten Daten und nachvollziehbaren Aktionen.']],
    talk: 'Gespräch anfragen', experiments: 'Produkte', experimentsText: 'ausgewählte Experimente und Prototypen',
    intelligenceEyebrow: 'SAIMÔR / INTELLIGENCE LAYER',
    intelligenceTitle: 'Modelle ändern sich. Kontext bleibt.',
    intelligenceText: 'AI, Agents, neue Modelle und künftige Formen von Intelligence können wechseln. Saimôr hält Kontext, Regeln, Verbindungen und Freigaben stabil – damit dein System nicht mit jedem Modellwechsel neu gebaut werden muss.',
    intelligenceMora: 'MÔRA hält den Zusammenhang',
    intelligenceCore: 'CORE hält Wahrheit, Identität und Grenzen',
    intelligenceWorkers: 'Modelle, Agents und Tools bleiben austauschbar',
    pathsEyebrow: 'DEIN EINSTIEG', pathsTitle: 'Drei Wege. Ein gemeinsamer Gedanke.', pathsIntro: 'Du musst nicht gleich ein ganzes System einführen. Entdecke die Idee, einen Raum für Creator oder den direkten Weg zu einem gemeinsamen Projekt.',
    pathsMora: 'MÔRA kennenlernen', pathsMoraText: 'Wie eine Assistenz Zusammenhänge sichtbar macht – mit einer öffentlichen Vorschau, ohne Zugriff auf private Konten.',
    pathsYori: 'YORI entdecken', pathsYoriText: 'Ein ruhiges digitales Haus für Creator: Termine, Kundenarbeit und Überblick an einem Ort. Beispiele sind als solche gekennzeichnet.',
    pathsStudio: 'Gemeinsam etwas bauen', pathsStudioText: 'Ein bestehender Prozess, eine schwierige Schnittstelle oder eine Idee? Wir klären zuerst, welcher nächste Schritt wirklich sinnvoll ist.',
    pathsExplore: 'Mehr erfahren', pathsContact: 'Projekt besprechen',
    finalEyebrow: 'KONTAKT / NÄCHSTER SCHRITT', finalTitle: 'Wenn Arbeit, Wissen und Intelligenz auseinanderfallen, bauen wir den Zusammenhang.', finalText: 'Schreib kurz, woran du arbeitest, was heute verloren geht oder wo dein Team immer wieder neu anfangen muss.', finalCta: 'Kontakt öffnen', scroll: 'SCROLL / MEHR ERFAHREN',
  },
  en: {
    eyebrow: 'SAIMÔR · CLARITY THROUGH CHANGE', thesis: 'Workspaces that keep context.',
    intro: 'Your work lives across many apps. Your context should not have to. SAIMÔR brings knowledge, tools and decisions into a connected workspace – with MÔRA alongside you.',
    enter: 'Discover SAIMÔR', learn: 'Security Check', login: 'Log in', training: 'Consulting · Workshops · Implementation', yori: 'YORI for creators',
    entryNote: 'One practical starting point: the Security Check examines public signals from your domain.',
    orbit: [['FILES', 'kept in context'], ['MÔRA', 'proactive assistant'], ['WORK', 'calendar · inbox · board'], ['AGENTS', 'background execution']],
    fieldEyebrow: 'MÔRA / CONTEXT', fieldTitle: 'Context should come with you instead of being explained again every time.',
    saimor: 'SAIMÔR', saimorText: 'Files, meetings, decisions and open work stay together. MÔRA works with that shared context instead of starting from zero on every interaction.', mora: 'MÔRA', moraText: 'notices when something changes',
    entryLabel: 'ENTRY / SECURITY CHECK', entryTitle: 'Start with something real instead of an empty prompt box.',
    entryText: 'You start with your domain. The Security Report becomes the first real object inside the OS, so the space begins with real context.', entryCta: 'Start Security Check',
    studioEyebrow: 'SAIMÔR · CONSULTING / WORKSHOPS / IMPLEMENTATION', studioTitle: 'Clarity through change — from first conversation to implementation.',
    studioText: 'We do not begin with a tool; we begin with the context. First we clarify what is actually needed. Then we help teams work with it and implement integrations, automations and workspaces in a robust way.',
    offers: [['Consulting', 'A first conversation and clear assessment: where is the friction, what already exists and where is the next useful move?'], ['Workshops', 'Shared formats that help teams understand AI and apply it in real work.'], ['Implementation', 'Integrations, automations and workspaces with clear boundaries, real data and auditable actions.']],
    talk: 'Start a conversation', experiments: 'Products', experimentsText: 'selected experiments and prototypes',
    intelligenceEyebrow: 'SAIMÔR / INTELLIGENCE LAYER',
    intelligenceTitle: 'Models change. Context remains.',
    intelligenceText: 'AI, agents, new models and future forms of intelligence can change. Saimôr keeps context, rules, connections and permissions stable — so your system does not need to be rebuilt every time the model changes.',
    intelligenceMora: 'MÔRA keeps the thread',
    intelligenceCore: 'CORE keeps truth, identity and boundaries',
    intelligenceWorkers: 'Models, agents and tools stay replaceable',
    pathsEyebrow: 'FIND YOUR START', pathsTitle: 'Three paths. One connected idea.', pathsIntro: 'You do not need to adopt an entire system at once. Explore the idea, enter a creator workspace or start a practical conversation about your project.',
    pathsMora: 'Meet MÔRA', pathsMoraText: 'See how an assistant can make context visible, with a public preview that never accesses private accounts.',
    pathsYori: 'Explore YORI', pathsYoriText: 'A calmer digital home for creators: appointments, client work and clarity in one place. Example data is identified as such.',
    pathsStudio: 'Build something together', pathsStudioText: 'A messy workflow, a disconnected tool or an early idea? First we find the next step worth taking.',
    pathsExplore: 'Explore', pathsContact: 'Discuss a project',
    finalEyebrow: 'CONTACT / NEXT STEP', finalTitle: 'When work, knowledge and intelligence drift apart, we rebuild the connection.', finalText: 'Send a short note about what you are building, what keeps getting lost or where your team repeatedly has to start over.', finalCta: 'Open contact', scroll: 'SCROLL / LEARN MORE',
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
                <a href="#system" className={styles.primary}>{c.enter}<ArrowRight size={19} aria-hidden="true" /></a>
                <Link href={securityHref} className={styles.textLink}><ShieldCheck size={16} aria-hidden="true" />{c.learn}<ArrowRight size={16} aria-hidden="true" /></Link>
              </div>
              <div className={styles.utilityLinks}>
                <Link href="/login?callbackUrl=%2Faccount%2Fbridge"><LogIn size={14} aria-hidden="true" />{c.login}</Link>
                <Link href={locale === 'de' ? '/yori' : '/en/yori'}><Sparkles size={14} aria-hidden="true" />{c.yori}</Link>
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
          {/* Marius 14.09.: "wenn man links die Rundung der Erde nachzeichnen
              wuerde, kaeme man beim Portal raus". Die Linie fuehrt die
              beleuchtete Horizontkante des Planeten weiter - ueber die
              Abschnittsgrenze hinweg - bis in die obere Ecke des Portals. */}
          <svg className={styles.earthThread} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="earth-thread-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#f3d68f" stopOpacity="0" />
                <stop offset=".35" stopColor="#f3d68f" stopOpacity=".55" />
                <stop offset="1" stopColor="#fff2c6" stopOpacity=".95" />
              </linearGradient>
            </defs>
            <path className={styles.earthThreadGlow} d="M0 0 C -38 22, -30 72, 100 100" vectorEffect="non-scaling-stroke" />
            <path className={styles.earthThreadLine} d="M0 0 C -38 22, -30 72, 100 100" vectorEffect="non-scaling-stroke" />
          </svg>
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

      <section id="studio" className={`${styles.daylightStudio} relative px-5 py-20 sm:px-8 md:py-28 lg:px-10`}><div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.88fr_1.12fr] lg:gap-20"><div><p className="font-mono text-[9px] font-semibold tracking-[.28em] text-[#637a58] sm:text-[10px]">{c.studioEyebrow}</p><h2 className="mt-5 max-w-xl font-serif text-4xl font-light leading-[.98] tracking-[-.035em] text-[#163b2a] sm:text-6xl">{c.studioTitle}</h2><p className="mt-7 max-w-xl text-sm leading-7 text-[#425d4a] sm:text-base">{c.studioText}</p><Link href={contactHref} className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#276447] transition hover:text-[#123c28]"><Mic2 className="h-4 w-4" />{c.talk}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link></div><div className="border-t border-[#3a5e46]/25">{c.offers.map(([name,text],index)=><div key={name} className="grid gap-3 border-b border-[#3a5e46]/20 py-7 sm:grid-cols-[42px_.8fr_1.2fr] sm:items-start sm:gap-6"><div className="font-mono text-[9px] tracking-[.18em] text-[#718675]">0{index+1}</div><div className="text-lg font-medium text-[#1b422f] sm:text-xl">{name}</div><p className="text-sm leading-6 text-[#405c48]">{text}</p></div>)}<div className="pt-7"><div className="font-mono text-[9px] uppercase tracking-[.2em] text-[#617966]">{c.experiments}</div><p className="mt-2 text-sm text-[#536b58]"><Link href={locale === 'de' ? '/yori' : '/en/yori'} className="text-[#2b6344] underline decoration-[#2b6344]/30 underline-offset-4 transition hover:text-[#123c28] hover:decoration-[#123c28]/60">YORI</Link> · <Link href="/earth" className="text-[#2b6344] underline decoration-[#2b6344]/30 underline-offset-4 transition hover:text-[#123c28] hover:decoration-[#123c28]/60">Saimôr Earth</Link> · {c.experimentsText}</p></div></div></div></section>
      <section id="contact" className={`${styles.daylightContact} px-5 py-20 sm:px-8 md:py-28 lg:px-10`}><div className="mx-auto max-w-7xl"><div className="grid gap-10 border-t border-[#3a5e46]/25 pt-10 md:grid-cols-[1fr_auto] md:items-end"><div><p className="font-mono text-[9px] font-semibold tracking-[.25em] text-[#476e55]">{c.finalEyebrow}</p><h2 className="mt-5 max-w-4xl font-serif text-4xl font-light leading-[.98] tracking-[-.035em] text-[#173a2b] sm:text-6xl md:text-7xl">{c.finalTitle}</h2><p className="mt-6 max-w-2xl text-sm leading-7 text-[#405c49] sm:text-base">{c.finalText}</p></div><Link href={contactHref} className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-[#225c40] bg-[#225c40] px-6 py-3.5 text-sm font-semibold text-[#fff9ed] transition hover:border-[#17462f] hover:bg-[#17462f]">{c.finalCta}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link></div></div></section>


    </div>
  );
}