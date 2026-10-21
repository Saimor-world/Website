export type EntryLocale = 'de' | 'en';

export type EntryPillar = 'digital-self' | 'security' | 'ai-business';
export type EntryActionKind = 'digital-self-form' | 'security-check-form' | 'demo-track';

export type EntryArticle = {
  slug: string;
  pillar: EntryPillar;
  category: string;
  readTime: string;
  title: string;
  excerpt: string;
  intro: string;
  tags: string[];
  sections: Array<{
    title: string;
    body: string;
  }>;
  ctaLabel: string;
  ctaHref: string;
  actionKind?: EntryActionKind;
};

const deArticles: EntryArticle[] = [
  {
    slug: 'security-check',
    pillar: 'security',
    category: 'Sicherheit',
    readTime: '2 min',
    title: 'Security Check: Was das Internet über deine Domain weiß',
    excerpt:
      'Bevor wir über Werkzeuge sprechen, schauen wir auf das, was öffentlich sichtbar ist. Kostenloser passiver Check — ohne Anmeldung, in 60 Sekunden, mit klaren Befunden.',
    intro:
      'Viele technische Signale einer Website sind öffentlich abrufbar. Der Check ordnet sie übersichtlich ein, damit du weißt, was solide ist und wo Handlungsbedarf besteht.',
    tags: ['Kostenlos', '60 Sekunden', 'Kein Login'],
    sections: [
      {
        title: 'Was der Scan prüft',
        body:
          'Deine Domain, dein TLS-Zertifikat, öffentlich erreichbare Pfade und die wichtigsten Sicherheits-Header. Nightwatch liest ausschließlich öffentliche Signale — ohne Eingriff in deine Systeme.',
      },
      {
        title: 'Ehrliche Ergebnisse',
        body:
          'Wenn etwas nicht stimmt, sagen wir es direkt. Kein Fachjargon, keine Verkaufsabsicht. Score von 0–100 mit konkreten Erklärungen — was gut ist und was nicht.',
      },
      {
        title: 'Was danach passiert',
        body:
          'Aus den Befunden entsteht ein isolierter HQ-Workspace im Saimôr OS. Kein Passwort nötig: Du kannst die Ergebnisse direkt öffnen und mit MÔRA strukturiert durchgehen.',
      },
    ],
    ctaLabel: 'Kostenlos prüfen',
    ctaHref: '/de/einstieg/security-check',
    actionKind: 'security-check-form',
  },
  {
    slug: 'digital-self',
    pillar: 'digital-self',
    category: 'Entlastung',
    readTime: '3 min',
    title: 'Digital AI Self: Dein smarter Zwilling im Alltag',   
    excerpt:
      'Stell dir vor, es gäbe jemanden, der genau weiß, wie du entscheidest – und dir Routineaufgaben abnimmt. Das ist dein Digital AI Self.',
    intro:
      'Ein Digital AI Self ist kein Roboter-Klon, sondern ein digitales Abbild deiner Arbeitsweise. Es hilft dir dabei, den "Mental Load" zu senken, indem es wiederkehrende Aufgaben für dich vorbereitet oder übernimmt.',
    tags: ['Freiraum', 'Fokus', 'Smarte Hilfe'],
    sections: [
      {
        title: 'Was ist das eigentlich?',
        body:
          'Dein Digital Self lernt nicht deine Persönlichkeit, sondern deine Logik: Wie sortierst du Anfragen? Welche Infos brauchst du für eine Entscheidung? Es wird zu deinem persönlichen Filter.',
      },
      {
        title: 'Warum brauche ich das?',
        body:
          'Wir verbringen zu viel Zeit mit "Arbeit über die Arbeit". Dein digitales Gegenüber nimmt dir das Vorsortieren, Planen und Erinnern ab, damit du wieder kreativ sein kannst.',
      },
      {
        title: 'Du behältst die Kontrolle',
        body:
          'Dein AI Self macht nichts ohne deine Erlaubnis. Du setzt die Leitplanken. Es ist wie ein Assistent, der niemals schläft, aber immer auf dein Kommando hört.',
      },
    ],
    ctaLabel: 'Digital AI Self ausprobieren',
    ctaHref: '/de/einstieg/digital-self',
    actionKind: 'digital-self-form',
  },
  {
    slug: 'ai-local-business',
    pillar: 'ai-business',
    category: 'Praxis',
    readTime: '3 min',
    title: 'Einfache Automation für dein Business',
    excerpt:
      'Keine Großprojekte, sondern echte Hilfe ab Tag eins. Wir zeigen dir Workflows, die sofort Zeit sparen.',
    intro:
      'KI muss nicht kompliziert sein. Oft reichen drei kleine Automationen, um den Arbeitsalltag massiv zu entspannen.',        
    tags: ['Zeit sparen', 'Einfach machen', 'Erfolg'],
    sections: [
      { title: 'Schnellere Antworten', body: 'Lass die KI deine E-Mails oder Anfragen vorsortieren. Du siehst nur noch das, was wirklich wichtig ist.' },
      { title: 'Wissen sofort griffbereit', body: 'Nie wieder Dokumente suchen. Dein System weiß, wo alles liegt und gibt dir die Antwort in Sekunden.' },  
      { title: 'Live erleben', body: 'In unseren Demo-Tracks kannst du direkt sehen, wie sich das in der Praxis anfühlt – ohne Risiko.' },
    ],
    ctaLabel: 'Demo starten',
    ctaHref: '/demo?track=ai-business',
    actionKind: 'demo-track',
  },
  {
    slug: 'adaptive-os',
    pillar: 'digital-self',
    category: 'Erlebnis',
    readTime: '2 min',
    title: 'Adaptive Intelligence: Ein OS, das dich versteht',
    excerpt: 'Saimôr OS passt sich deiner Firma an – visuell, inhaltlich und funktional. Erlebe die Symbiose ab der ersten Sekunde.',
    intro: 'Ein Betriebssystem sollte kein starres Gitter sein. Mora transformiert das HQ basierend auf deiner Identität.',
    tags: ['Personalisiert', 'Dynamisch', 'High-Fidelity'],
    sections: [
      { title: 'Deine Identität zählt', body: 'Sobald du deinen Check startest, beginnt die Transformation. Farben, Fokusbereiche und Prioritäten passen sich deinem Unternehmen an.' },
      { title: 'Visuelle Symbiose', body: 'Keine Standard-Themes. Die Atmosphäre des HQ spiegelt die Energie deiner Marke wider – von der Hintergrund-Aura bis zum Puls von Mora.' },
      { title: 'Nahtloser Einstieg', body: 'Vom Web-Scan direkt ins personalisierte Cockpit. Deine Daten sind bereits da, dein Team ist vorbereitet.' },
    ],
    ctaLabel: 'Jetzt erleben',
    ctaHref: '/de/einstieg/security-check',
    actionKind: 'security-check-form',
  },
];

const enArticles: EntryArticle[] = [
  {
    slug: 'adaptive-os',
    pillar: 'digital-self',
    category: 'Experience',
    readTime: '2 min',
    title: 'Adaptive Intelligence: An OS that understands you',
    excerpt: 'Saimôr OS adapts to your company – visually, contextually, and functionally. Experience symbiosis from second one.',
    intro: 'An operating system should not be a rigid grid. Mora transforms the HQ based on your identity.',
    tags: ['Personalized', 'Dynamic', 'High-Fidelity'],
    sections: [
      { title: 'Your Identity Matters', body: 'As soon as you start your check, the transformation begins. Colors, focus areas, and priorities adapt to your business.' },
      { title: 'Visual Symbiosis', body: 'No generic themes. The atmosphere of the HQ reflects the energy of your brand – from the background aura to Mora\'s pulse.' },
      { title: 'Seamless Entry', body: 'From web scan directly to your personalized cockpit. Your data is already there, your team is prepared.' },
    ],
    ctaLabel: 'Experience Now',
    ctaHref: '/en/entry/security-check',
    actionKind: 'security-check-form',
  },
  {
    slug: 'security-check',
    pillar: 'security',
    category: 'Security',
    readTime: '2 min',
    title: 'Security Check: What the internet knows about your domain',
    excerpt: 'Before talking about tools, look at what is publicly visible. Free passive check — no sign-up, 60 seconds, clear findings.',
    intro: 'Many technical signals of a website are publicly accessible. Our check organizes them clearly so you know what is solid and what needs attention.',
    tags: ['Security', 'Transparency', 'Check'],
    sections: [
      { title: 'What the Scan Checks', body: 'Your domain, TLS certificate, publicly reachable paths and essential security headers. Nightwatch only reads public signals — without touching your systems.' },
      { title: 'Honest Results', body: 'No jargon, no sales pressure. You receive a 0–100 score with concrete explanations of what is in order and what should be improved.' },
      { title: 'What Happens Next', body: 'Your findings open in an isolated HQ workspace inside Saimôr OS. No password required — open your dossier directly and review next steps with MÔRA.' },
    ],
    ctaLabel: 'Start Free Scan',
    ctaHref: '/en/entry/security-check',
    actionKind: 'security-check-form',
  },
  {
    slug: 'digital-self',
    pillar: 'digital-self',
    category: 'Relief',
    readTime: '3 min',
    title: 'Digital AI Self: Your smart twin for daily work',   
    excerpt: 'Imagine someone who knows exactly how you decide – and handles routine tasks for you. That is your Digital AI Self.',
    intro: 'A Digital AI Self is not a robot clone, but a digital reflection of your workflow. It helps reduce mental load by preparing or handling repetitive tasks.',
    tags: ['Freedom', 'Focus', 'Smart Help'],
    sections: [
      { title: 'What is it?', body: 'Your Digital Self doesn’t learn your personality, but your logic: How do you sort requests? What info do you need for a decision?' },
      { title: 'Why do I need it?', body: 'We spend too much time on "work about work". Your digital counterpart handles the sorting and planning so you can be creative again.' },
      { title: 'You stay in control', body: 'Your AI Self does nothing without your permission. You set the guardrails. It is like an assistant that never sleeps.' },
    ],
    ctaLabel: 'Try Digital AI Self',
    ctaHref: '/en/entry/digital-self',
    actionKind: 'digital-self-form',
  },
  {
    slug: 'ai-local-business',
    pillar: 'ai-business',
    category: 'Practice',
    readTime: '3 min',
    title: 'Simple Automation for your Business',
    excerpt: 'No big projects, just real help from day one. We show you workflows that save time immediately.',
    intro: 'AI doesn’t have to be complicated. Often three small automations are enough to massively relax your workday.',
    tags: ['Save Time', 'Keep it Simple', 'Success'],
    sections: [
      { title: 'Faster Answers', body: 'Let AI pre-sort your emails. You only see what really matters.' },
      { title: 'Knowledge at Hand', body: 'Never search for documents again. Your system knows where everything is.' },
      { title: 'Experience Live', body: 'Watch our demo tracks to see how it works in practice – no risk involved.' },
    ],
    ctaLabel: 'Start Demo',
    ctaHref: '/demo?track=ai-business',
    actionKind: 'demo-track',
  },
];

export const entryContent: Record<EntryLocale, EntryArticle[]> = {
  de: deArticles,
  en: enArticles,
};
