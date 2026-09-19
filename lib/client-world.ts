export type ClientWorldTruth = 'live' | 'preview' | 'not_connected';

export type ClientWorldLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type ClientWorldIdea = {
  id: string;
  title: string;
  body: string;
  why: string;
  state: ClientWorldTruth;
};

export type ClientWorldModule = {
  id: string;
  name: string;
  eyebrow: string;
  description: string;
  state: ClientWorldTruth;
  link?: ClientWorldLink;
};

export type ClientWorldPresence = {
  id: string;
  label: string;
  handle?: string;
  state: ClientWorldTruth;
  note: string;
};

export type ClientWorldConfig = {
  slug: string;
  clientName: string;
  title: string;
  intro: string;
  today: {
    note: string;
    focus: string[];
  };
  perspective: {
    preserve: string[];
    clarify: string[];
    explore: string[];
  };
  websiteDirection: {
    lead: string;
    moves: Array<{ title: string; body: string }>;
  };
  presence: ClientWorldPresence[];
  modules: ClientWorldModule[];
  connections: Array<{
    id: string;
    from: string;
    to: string;
    purpose: string;
    state: ClientWorldTruth;
  }>;
  ideas: ClientWorldIdea[];
  nextQuestions: string[];
};

type ClientWorldDefinition = ClientWorldConfig & {
  accessEnvKey: string;
};

const WORLDS: Record<string, ClientWorldDefinition> = {
  luana: {
    slug: 'luana',
    clientName: 'Luana',
    title: 'Dein Business, als zusammenhängende Welt.',
    intro:
      'Hier sammeln wir nicht einfach Ergebnisse. Wir zeigen dir, wie wir deinen Auftritt weiterdenken würden, welche Wege sich verbinden lassen und wo du selbst mitentscheiden kannst.',
    accessEnvKey: 'CLIENT_WORLD_LUANA_CODE',
    today: {
      note:
        'Wir bauen gerade die erste gemeinsame Sicht: Webauftritt, Außenwirkung und die Frage, wie YORI, Saimôr OS und MÔRA später sinnvoll zusammenkommen könnten.',
      focus: [
        'Website nicht kopieren, sondern als klare nächste Version denken',
        'TikTok, Instagram und Domain später als zusammenhängende Präsenz verstehen',
        'Die größere Saimôr-Welt jetzt schon als ehrliche Preview erlebbar machen',
      ],
    },
    perspective: {
      preserve: [
        'Die Person soll vor dem System sichtbar bleiben.',
        'Der Auftritt darf ruhig und hochwertig wirken, ohne steril zu werden.',
      ],
      clarify: [
        'Besucher sollen schneller verstehen, was du anbietest und welcher nächste Schritt sinnvoll ist.',
        'Website und Social-Auftritt sollen dieselbe Geschichte erzählen statt nebeneinander zu existieren.',
      ],
      explore: [
        'Ein eigener YORI-Raum für Content, Ideen und Kooperationen.',
        'Ein späterer OS-Bereich für Termine, Aufgaben, Dateien und verbundene Quellen.',
        'MÔRA als proaktive Schicht, die aus verbundenen Signalen Vorschläge vorbereitet.',
      ],
    },
    websiteDirection: {
      lead:
        'Nicht deine bestehende Website noch einmal zeigen — sondern sichtbar machen, welche Richtung wir daraus entwickeln würden.',
      moves: [
        {
          title: 'Ankunft',
          body: 'In wenigen Sekunden verständlich machen, für wen du da bist und welches Gefühl die Zusammenarbeit haben soll.',
        },
        {
          title: 'Angebote',
          body: 'Weniger gleichwertige Optionen nebeneinander. Eine klare Reihenfolge vom ersten Interesse bis zur konkreten Buchung oder Anfrage.',
        },
        {
          title: 'Persönlichkeit',
          body: 'Bilder, Sprache und Haltung nicht als Dekoration behandeln, sondern als tragende Ebene der Seite.',
        },
        {
          title: 'Nächster Schritt',
          body: 'Jede wichtige Seite bekommt genau einen offensichtlichen nächsten Schritt statt mehrere konkurrierende Calls-to-Action.',
        },
      ],
    },
    presence: [
      {
        id: 'domain',
        label: 'Domain / Website',
        state: 'not_connected',
        note: 'Sobald die finale Domain feststeht, können Technik, Struktur, SEO und Sichtbarkeit mit belegter Quelle analysiert werden.',
      },
      {
        id: 'tiktok',
        label: 'TikTok',
        state: 'not_connected',
        note: 'Noch keine Live-Verbindung. Später können echte Posts, Muster und Content-Fragen in dieselbe World einfließen.',
      },
      {
        id: 'instagram',
        label: 'Instagram',
        state: 'not_connected',
        note: 'Noch keine Live-Verbindung. Bis dahin zeigen wir nur Konzepte und erfinden keine Reichweiten- oder Performance-Daten.',
      },
    ],
    modules: [
      {
        id: 'yori',
        name: 'YORI',
        eyebrow: 'Creator world',
        state: 'preview',
        description:
          'Ein ruhiger Arbeitsraum für Content, Ideen, Kooperationen und Termine. Hier zeigen wir schon das Produktgefühl — ohne zu behaupten, dass deine Accounts bereits verbunden sind.',
        link: { label: 'YORI ansehen', href: '/yori' },
      },
      {
        id: 'os',
        name: 'Saimôr OS',
        eyebrow: 'Operating world',
        state: 'preview',
        description:
          'Der größere Arbeitsraum für Dateien, Termine, Aufgaben und verbundene Dienste. Für deine World zunächst als Vorschau und mögliche spätere Erweiterung.',
        link: { label: 'OS-Prinzip ansehen', href: '/de#system' },
      },
      {
        id: 'mora',
        name: 'MÔRA',
        eyebrow: 'Context & suggestions',
        state: 'preview',
        description:
          'Die Kontextschicht, die verbundene Signale verstehen und proaktive Vorschläge vorbereiten kann. Die gezeigten Beispiele sind derzeit bewusst Demo.',
        link: { label: 'Deep View ansehen', href: '/mora/deep-view' },
      },
    ],
    connections: [
      {
        id: 'website-mora',
        from: 'Website',
        to: 'MÔRA',
        purpose: 'Struktur, Inhalte und Veränderungen später als belegten Kontext verstehen.',
        state: 'not_connected',
      },
      {
        id: 'social-yori',
        from: 'TikTok + Instagram',
        to: 'YORI',
        purpose: 'Content-Ideen, Entwürfe und Rückblicke in einem Creator-Raum bündeln.',
        state: 'not_connected',
      },
      {
        id: 'feedback-context',
        from: 'Dein Feedback',
        to: 'Client World',
        purpose: 'Wünsche und Grenzen fließen schon jetzt als echter Input in den gemeinsamen Stand.',
        state: 'live',
      },
      {
        id: 'mora-os',
        from: 'MÔRA',
        to: 'Saimôr OS',
        purpose: 'Aus verbundenem Kontext später konkrete nächste Schritte und Arbeitsobjekte vorbereiten.',
        state: 'preview',
      },
      {
        id: 'yori-world',
        from: 'YORI',
        to: 'Client World',
        purpose: 'Creator-Arbeit nicht isoliert lassen, sondern als Teil der gesamten Business-Story sichtbar machen.',
        state: 'preview',
      },
    ],
    ideas: [
      {
        id: 'content-bridge',
        title: 'Eine Idee → mehrere Oberflächen',
        body: 'Ein Gedanke könnte später in YORI beginnen und daraus Website-Text, TikTok-Draft und einen offenen nächsten Schritt erzeugen.',
        why: 'Damit nicht jeder Kanal wieder bei null beginnt.',
        state: 'preview',
      },
      {
        id: 'booking-path',
        title: 'Ein ruhiger Buchungsweg',
        body: 'Social oder Website führt nicht in ein Menü, sondern abhängig vom Interesse direkt zum passenden Angebot oder Gespräch.',
        why: 'Weniger Auswahl kann den nächsten Schritt klarer machen.',
        state: 'preview',
      },
      {
        id: 'presence-brief',
        title: 'Wöchentlicher Presence Brief',
        body: 'Wenn Quellen verbunden sind, könnte MÔRA einmal pro Woche Veränderungen, offene Fragen und auffällige Muster zusammenfassen.',
        why: 'Ein Überblick statt drei Plattformen einzeln prüfen zu müssen.',
        state: 'preview',
      },
    ],
    nextQuestions: [
      'Welche drei Angebote sollen in deinem Auftritt zuerst verstanden werden?',
      'Was soll auf keinen Fall nach „typischer Wellness-/Creator-Seite“ aussehen?',
      'Welche Domain bzw. welcher finale Web-Auftritt soll später die technische Quelle sein?',
    ],
  },
};

export function getClientWorld(slug: string): ClientWorldConfig | null {
  const definition = WORLDS[slug];
  if (!definition) return null;
  const { accessEnvKey: _accessEnvKey, ...world } = definition;
  return world;
}

export function getClientWorldAccessEnvKey(slug: string): string | null {
  return WORLDS[slug]?.accessEnvKey ?? null;
}
