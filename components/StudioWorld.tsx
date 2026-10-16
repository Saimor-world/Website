import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight, CheckCircle2, ChevronDown, Compass, Layers3, MessagesSquare } from 'lucide-react';
import styles from './StudioWorld.module.css';

type Locale = 'de' | 'en';

const copy = {
  de: {
    eyebrow: 'SAIMÔR / STUDIO',
    title: 'Gute Ideen brauchen keinen größeren Werkzeugkasten.',
    titleAccent: 'Sondern einen Anfang.',
    intro: 'Studio ist der Raum für Zusammenarbeit: Wir ordnen das, was gerade kompliziert ist, probieren einen sinnvollen Ansatz aus und bauen erst dann, wenn klar ist, wofür.',
    explore: 'Die Möglichkeiten ansehen',
    talk: 'Über dein Vorhaben sprechen',
    stepsLabel: 'DREI WEGE · EIN ZIEL',
    stepsTitle: 'Was brauchst du gerade?',
    stepsIntro: 'Nicht jedes Anliegen braucht eine Softwareentwicklung. Manchmal reicht eine neue Perspektive. Manchmal ein gemeinsamer Workshop. Und manchmal entsteht daraus ein funktionierender Prototyp.',
    process: ['Frage', 'Verstehen', 'Etwas bewegen'],
    detailsLabel: 'Was dahintersteckt',
    outcomeLabel: 'Was du mitnimmst',
    casesLabel: 'Beispielhafte Ausgangslagen',
    topics: [
      {
        id: 'beratung', number: '01', eyebrow: 'ORIENTIERUNG', title: 'Beratung', lead: 'Erst verstehen. Dann entscheiden.',
        description: 'Wo hakt es wirklich? Welche Werkzeuge helfen bereits, welche bremsen – und was wäre ein sinnvoller nächster Schritt? Wir sortieren ohne vorschnell eine Plattform zu verkaufen.',
        cases: ['Unsere Abläufe sind über zu viele Tools verstreut.', 'Wir überlegen, KI sinnvoll einzusetzen.', 'Wir wollen eine Idee prüfen, bevor wir investieren.'],
        outcomes: ['Eine geordnete Ausgangslage', 'Prioritäten und mögliche nächste Schritte', 'Ein verständlicher Vorschlag statt Tool-Buzzwords'],
        action: 'Beratung besprechen',
      },
      {
        id: 'workshops', number: '02', eyebrow: 'GEMEINSAM LERNEN', title: 'Workshops', lead: 'Weniger Folien. Mehr Verstehen.',
        description: 'KI und digitale Arbeitsweisen lassen sich besser begreifen, wenn Menschen selbst damit arbeiten. Wir entwickeln ein Format anhand der Fragen, Aufgaben und Vorkenntnisse eures Teams.',
        cases: ['Was kann KI – und was sollte sie nicht tun?', 'Wie sieht ein sinnvoller Workflow mit KI aus?', 'Wie kommen wir als Team von Theorie zur Anwendung?'],
        outcomes: ['Ein gemeinsames Verständnis', 'Praktische Übungen anhand passender Beispiele', 'Konkrete Ideen für die nächste Umsetzung'],
        action: 'Workshop anfragen',
      },
      {
        id: 'umsetzung', number: '03', eyebrow: 'VOM GEDANKEN ZUM OBJEKT', title: 'Umsetzung', lead: 'Etwas bauen, das wirklich gebraucht wird.',
        description: 'Wenn die Richtung klar ist, können daraus verbundene Abläufe, ein kleines digitales Werkzeug oder ein begrenzter Pilot entstehen. Quellen, Freigaben und der reale Nutzen werden von Anfang an mitgedacht.',
        cases: ['Zwei bestehende Werkzeuge sollen Informationen austauschen.', 'Wir brauchen einen übersichtlichen Arbeitsraum.', 'Ein kleiner Pilot soll eine Annahme überprüfbar machen.'],
        outcomes: ['Ein eingegrenzter Lösungsansatz', 'Klar definierte Funktionen und Grenzen', 'Ein besprechbarer Prototyp oder Umsetzungsplan'],
        action: 'Projektidee teilen',
      },
    ],
    noteEyebrow: 'KEINE PAKETE VON DER STANGE',
    noteTitle: 'Der richtige Anfang ist oft kleiner, als man denkt.',
    noteText: 'Es gibt hier bewusst keine künstlich festen Leistungsversprechen oder Standardpreise. Zuerst klären wir gemeinsam Umfang, Ziel und Machbarkeit. Danach lässt sich sagen, welches Format wirklich passt.',
    footerTitle: 'Erzähl uns, was dich gerade beschäftigt.',
    footerBody: 'Eine kurze Nachricht reicht. Du musst noch kein fertiges Briefing haben.',
    footerCTA: 'Kontakt aufnehmen',
    home: 'Zurück zur Startseite',
  },
  en: {
    eyebrow: 'SAIMÔR / STUDIO',
    title: 'Good ideas do not need a bigger toolbox.',
    titleAccent: 'They need a place to start.',
    intro: 'Studio is where we work together: understand what is complex, try a useful approach, and build only when we know what it is for.',
    explore: 'Explore the ways to work together',
    talk: 'Talk about your idea',
    stepsLabel: 'THREE WAYS · ONE DIRECTION',
    stepsTitle: 'What do you need right now?',
    stepsIntro: 'Not every question needs new software. Sometimes a different perspective is enough; sometimes a team workshop; sometimes that leads to a working prototype.',
    process: ['Question', 'Understand', 'Make progress'],
    detailsLabel: 'What it means',
    outcomeLabel: 'What you take away',
    casesLabel: 'Example situations',
    topics: [
      {
        id: 'beratung', number: '01', eyebrow: 'ORIENTATION', title: 'Consulting', lead: 'Understand first. Decide second.',
        description: 'Where is the friction? Which tools help, which slow things down, and what would be a useful next step? We make sense of the situation without trying to sell a platform first.',
        cases: ['Work is scattered across too many tools.', 'We are exploring responsible AI use.', 'We want to test an idea before investing.'],
        outcomes: ['A clearer view of your situation', 'Priorities and potential next steps', 'A comprehensible proposal without buzzwords'],
        action: 'Discuss consulting',
      },
      {
        id: 'workshops', number: '02', eyebrow: 'LEARN TOGETHER', title: 'Workshops', lead: 'Fewer slides. More understanding.',
        description: 'AI and modern workflows become clearer when people try them for themselves. We shape a format around your team’s questions, real tasks and starting point.',
        cases: ['What can AI do – and where are the limits?', 'What does an AI-assisted workflow look like?', 'How do we move from theory to practice together?'],
        outcomes: ['Shared understanding', 'Practical exercises with relevant examples', 'Concrete ideas for what to try next'],
        action: 'Ask about a workshop',
      },
      {
        id: 'umsetzung', number: '03', eyebrow: 'IDEA TO OBJECT', title: 'Implementation', lead: 'Build only what matters.',
        description: 'When the direction is clear, that can become connected processes, a small digital tool or a limited pilot. Sources, permissions and practical value are considered from the start.',
        cases: ['Existing tools need to exchange information.', 'We need a more connected workspace.', 'A small pilot should make an idea testable.'],
        outcomes: ['A focused solution approach', 'Clearly defined capabilities and boundaries', 'A discussable prototype or implementation plan'],
        action: 'Share a project idea',
      },
    ],
    noteEyebrow: 'NO ONE-SIZE-FITS-ALL PACKAGES',
    noteTitle: 'The right first step may be smaller than you think.',
    noteText: 'No invented fixed guarantees or standard prices here. We first discuss scope, goals and feasibility, then choose the format that actually fits.',
    footerTitle: 'Tell us what is on your mind.',
    footerBody: 'A short message is enough. You do not need a complete brief.',
    footerCTA: 'Get in touch',
    home: 'Back to home',
  },
} as const;

export default function StudioWorld({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const contactHref = locale === 'de' ? '/de/kontakt' : '/en/contact';
  const homeHref = locale === 'de' ? '/de' : '/en';

  return (
    <div className={styles.world}>
      <section className={styles.hero} aria-labelledby="studio-title">
        <div className={styles.ambient} aria-hidden="true" />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>{c.eyebrow}</p>
          <h1 id="studio-title">{c.title}<span>{c.titleAccent}</span></h1>
          <p className={styles.lead}>{c.intro}</p>
          <div className={styles.heroActions}>
            <a href="#wege" className={styles.primary}>{c.explore}<ArrowDown size={17} aria-hidden="true" /></a>
            <Link href={contactHref} className={styles.secondary}>{c.talk}<ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
          <div className={styles.process} aria-label={locale === 'de' ? 'Unser Prozess' : 'Our process'}>
            {c.process.map((step,index) => <div key={step}><span>0{index+1}</span><strong>{step}</strong></div>)}
          </div>
        </div>
      </section>
      <section id="wege" className={styles.paths} aria-labelledby="ways-title">
        <div className={styles.inner}>
          <p className={styles.sectionLabel}>{c.stepsLabel}</p>
          <div className={styles.pathsIntro}>
            <h2 id="ways-title">{c.stepsTitle}</h2>
            <p>{c.stepsIntro}</p>
          </div>
          <div className={styles.services}>
            {c.topics.map((topic, index) => {
              const Icon = index === 0 ? Compass : index === 1 ? MessagesSquare : Layers3;
              return (
                <article id={topic.id} className={styles.service} key={topic.id}>
                  <div className={styles.serviceNumber}><span>{topic.number}</span><Icon size={31} strokeWidth={1.1} aria-hidden="true" /></div>
                  <div className={styles.serviceMain}>
                    <p className={styles.sectionLabel}>{topic.eyebrow}</p>
                    <h3>{topic.title}</h3>
                    <p className={styles.serviceLead}>{topic.lead}</p>
                    <p className={styles.description}>{topic.description}</p>
                    <details className={styles.details}>
                      <summary>{c.detailsLabel}<ChevronDown size={17} aria-hidden="true" /></summary>
                      <div className={styles.detailBody}>
                        <div><h4>{c.casesLabel}</h4><ul>{topic.cases.map(item => <li key={item}>{item}</li>)}</ul></div>
                        <div><h4>{c.outcomeLabel}</h4><ul>{topic.outcomes.map(item => <li key={item}><CheckCircle2 size={16} aria-hidden="true" />{item}</li>)}</ul></div>
                      </div>
                    </details>
                    <Link href={contactHref} className={styles.serviceLink}>{topic.action}<ArrowUpRight size={17} aria-hidden="true" /></Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className={styles.note}>
        <div className={styles.inner}>
          <p className={styles.sectionLabel}>{c.noteEyebrow}</p>
          <h2>{c.noteTitle}</h2>
          <p>{c.noteText}</p>
        </div>
      </section>
      <section className={styles.contact}>
        <div className={styles.inner}>
          <h2>{c.footerTitle}</h2>
          <p>{c.footerBody}</p>
          <div className={styles.endActions}>
            <Link href={contactHref} className={styles.primary}>{c.footerCTA}<ArrowRight size={18} aria-hidden="true" /></Link>
            <Link href={homeHref} className={styles.endBack}>{c.home}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
