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
    title: 'Was Angreifer in 30 Sekunden über dich herausfinden',
    excerpt:
      'Bevor du irgendwas investierst: Sieh erst, was wirklich offen steht. Kostenloser Scan — keine Anmeldung, 60 Sekunden, ehrliche Ergebnisse.',
    intro:
      'Kein Unternehmen ist zu klein für einen Angriff. Die meisten Lücken sind bekannt und in wenigen Minuten zu schließen — wenn man weiß, wo sie sind.',
    tags: ['Kostenlos', '60 Sekunden', 'Kein Login'],
    sections: [
      {
        title: 'Was der Scan prüft',
        body:
          'Deine Domain, dein SSL-Zertifikat, deine öffentlichen Dateien und die wichtigsten Schutz-Header. Alles, was ein Angreifer in der ersten Minute sieht — wir zeigen es dir übersichtlich.',
      },
      {
        title: 'Ehrliche Ergebnisse',
        body:
          'Wenn etwas nicht stimmt, sagen wir es direkt. Kein Fachjargon, keine Verkaufsabsicht. Score von 0–100 mit konkreten Erklärungen — was gut ist und was nicht.',
      },
      {
        title: 'Was danach passiert',
        body:
          'Du bekommst deinen persönlichen HQ-Link — ein Workspace mit deinen Befunden. Kein Passwort nötig. Einfach öffnen und mit Môra arbeiten.',
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
];

const enArticles: EntryArticle[] = [
  {
    slug: 'security-check',
    pillar: 'security',
    category: 'Security',
    readTime: '2 min',
    title: 'Security Check: What the internet knows about you',
    excerpt: 'An honest status report in 60 seconds. We check your domain for common vulnerabilities.',
    intro: 'Before buying expensive software, know where the door is open. Our scan shows you exactly that – no jargon, straight to the point.',
    tags: ['Security', 'Transparency', 'Check'],
    sections: [
      { title: 'Understand Visibility', body: 'Many technical details of your website are public. We summarize this data so you understand what an attacker sees.' },
      { title: 'Honest Feedback', body: 'No marketing fluff. If your SSL certificate is outdated, we tell you directly.' },
      { title: 'Immediate Steps', body: 'After the scan, you know exactly what to do. Most things can be fixed in minutes.' },
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
