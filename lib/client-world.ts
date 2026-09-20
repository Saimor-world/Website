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
  /**
   * The concrete editorial observation (verbatim from `perspective`) this
   * idea was drawn from. Makes the suggestion traceable to something
   * Saimôr actually looked at, instead of reading as unexplained AI output.
   */
  observedFrom: string;
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

export type ClientWorldConnectionStage = 'in' | 'core' | 'out';

export type ClientWorldConnection = {
  id: string;
  from: string;
  to: string;
  purpose: string;
  state: ClientWorldTruth;
  stage: ClientWorldConnectionStage;
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
  connections: ClientWorldConnection[];
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
    title: 'Deine Website. Der aktuelle Stand.',
    intro:
      'Hier siehst du auf einen Blick, woran wir gerade arbeiten, welche Entscheidungen offen sind und was als Nächstes passiert. Wenn etwas nicht zu dir passt, kannst du es direkt hier korrigieren.',
    accessEnvKey: 'CLIENT_WORLD_LUANA_CODE',
    today: {
      note:
        'Im Moment konzentrieren wir uns auf die Website: klare Struktur, ein stimmiger Einstieg und ein eindeutiger Weg für Besucher. Andere Saimôr-Bereiche kommen erst dazu, wenn sie dafür wirklich nützlich sind.',
      focus: [
        'Die nächste Website-Struktur festziehen',
        'Klären, was Besucher zuerst verstehen sollen',
        'Deine Entscheidungen direkt in die nächste Version übernehmen',
      ],
    },
    perspective: {
      preserve: [
        'Du sollst vor dem System sichtbar bleiben.',
        'Der Auftritt darf ruhig und hochwertig wirken, ohne kalt zu werden.',
      ],
      clarify: [
        'Besucher sollen schneller verstehen, was du anbietest und welcher Schritt für sie der richtige ist.',
        'Website und Social-Auftritt sollen dieselbe Geschichte erzählen.',
      ],
      explore: [
        'Ein ruhiger Bereich für Content, Ideen und Kooperationen, falls du ihn später brauchst.',
        'Später ein gemeinsamer Arbeitsbereich für Termine, Aufgaben und Dateien.',
        'MÔRA könnte später aus verbundenen Quellen konkrete Vorschläge vorbereiten.',
      ],
    },
    websiteDirection: {
      lead:
        'Die vier Schritte zeigen die geplante Nutzerführung. Texte, Bilder und Angebote werden erst mit dir finalisiert.',
      moves: [
        {
          title: 'Ankunft',
          body: 'In wenigen Sekunden verständlich machen, für wen du da bist und wie sich die Zusammenarbeit anfühlt.',
        },
        {
          title: 'Angebote',
          body: 'Eine klare Reihenfolge vom ersten Interesse bis zur Anfrage, damit nicht alle Optionen gleich schwer wiegen.',
        },
        {
          title: 'Persönlichkeit',
          body: 'Bilder, Sprache und Haltung als tragende Ebene der Seite behandeln.',
        },
        {
          title: 'Nächster Schritt',
          body: 'Jede wichtige Seite bekommt genau einen offensichtlichen nächsten Schritt.',
        },
      ],
    },
    presence: [
      {
        id: 'domain',
        label: 'Domain / Website',
        state: 'not_connected',
        note: 'Sobald die Domain feststeht, können wir Technik, Struktur und Sichtbarkeit mit belegter Quelle prüfen.',
      },
      {
        id: 'tiktok',
        label: 'TikTok',
        state: 'not_connected',
        note: 'Noch keine Verbindung. Später können echte Posts und wiederkehrende Muster hier einfließen.',
      },
      {
        id: 'instagram',
        label: 'Instagram',
        state: 'not_connected',
        note: 'Noch keine Verbindung. Bis dahin zeigen wir Konzepte und erfinden keine Reichweiten.',
      },
    ],
    modules: [
      {
        id: 'yori',
        name: 'YORI',
        eyebrow: 'Creator world',
        state: 'preview',
        description:
          'Ein ruhiger Arbeitsraum für Content, Ideen, Kooperationen und Termine. Was du hier siehst, ist das Produkt selbst. Deine Accounts sind damit nicht verbunden.',
        link: { label: 'YORI ansehen', href: '/yori' },
      },
      {
        id: 'os',
        name: 'Saimôr OS',
        eyebrow: 'Operating world',
        state: 'preview',
        description:
          'Der größere Arbeitsraum für Dateien, Termine, Aufgaben und verbundene Dienste. Für dich vorerst eine Vorschau, mögliche Erweiterung später.',
        link: { label: 'OS-Prinzip ansehen', href: '/de#system' },
      },
      {
        id: 'mora',
        name: 'MÔRA',
        eyebrow: 'Context & suggestions',
        state: 'preview',
        description:
          'Die Schicht, die verbundene Quellen liest und daraus Vorschläge vorbereitet. Die Beispiele hier sind eine Demo, keine Auswertung deiner Daten.',
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
        stage: 'in',
      },
      {
        id: 'social-yori',
        from: 'TikTok + Instagram',
        to: 'YORI',
        purpose: 'Content-Ideen, Entwürfe und Rückblicke in einem Creator-Raum bündeln.',
        state: 'not_connected',
        stage: 'in',
      },
      {
        id: 'feedback-context',
        from: 'Dein Feedback',
        to: 'Client World',
        purpose: 'Wünsche und Grenzen fließen schon jetzt als echter Input in den gemeinsamen Stand.',
        state: 'live',
        stage: 'in',
      },
      {
        id: 'mora-os',
        from: 'MÔRA',
        to: 'Saimôr OS',
        purpose: 'Aus verbundenem Kontext später konkrete nächste Schritte und Arbeitsobjekte vorbereiten.',
        state: 'preview',
        stage: 'core',
      },
      {
        id: 'yori-world',
        from: 'YORI',
        to: 'Client World',
        purpose: 'Creator-Arbeit nicht isoliert lassen, sondern als Teil der gesamten Business-Story sichtbar machen.',
        state: 'preview',
        stage: 'out',
      },
      {
        id: 'direction-website',
        from: 'Website Direction (Preview)',
        to: 'Website',
        purpose: 'Die gezeigte Struktur später Schritt für Schritt mit dir in die echte Website übersetzen.',
        state: 'preview',
        stage: 'out',
      },
    ],
    ideas: [
      {
        id: 'content-bridge',
        title: 'Ein Gedanke, mehrere Kanäle',
        body: 'Ein Gedanke beginnt in YORI. Daraus entstehen ein Website-Text, ein TikTok-Entwurf und ein offener nächster Schritt.',
        why: 'Damit nicht jeder Kanal wieder bei null anfängt.',
        observedFrom: 'Website und Social-Auftritt sollen dieselbe Geschichte erzählen.',
        state: 'preview',
      },
      {
        id: 'booking-path',
        title: 'Ein ruhiger Buchungsweg',
        body: 'Je nachdem, was jemanden interessiert, führt der Weg direkt zum passenden Angebot oder zu einem Gespräch.',
        why: 'Weniger Auswahl macht den nächsten Schritt klarer.',
        observedFrom: 'Besucher sollen schneller verstehen, was du anbietest und welcher Schritt für sie der richtige ist.',
        state: 'preview',
      },
      {
        id: 'presence-brief',
        title: 'Wochenüberblick',
        body: 'Sobald Quellen verbunden sind, fasst MÔRA einmal pro Woche Veränderungen, offene Fragen und auffällige Muster zusammen.',
        why: 'Damit du nicht drei Plattformen einzeln durchsehen musst.',
        observedFrom: 'MÔRA könnte später aus verbundenen Quellen konkrete Vorschläge vorbereiten.',
        state: 'preview',
      },
    ],
    nextQuestions: [
      'Welches Angebot soll ein neuer Besucher als Erstes verstehen?',
      'Was darf sich auf der neuen Seite auf keinen Fall falsch oder fremd anfühlen?',
      'Welche Seite oder Domain ist die verbindliche Basis, sobald wir technisch weitergehen?',
    ],
  },
};

export const CLIENT_WORLD_CONNECTION_STAGES: Record<
  ClientWorldConnectionStage,
  { label: string; hint: string }
> = {
  in: {
    label: 'Was hereinkommt',
    hint: 'Quellen, die später zusammengeführt werden.',
  },
  core: {
    label: 'Was MÔRA daraus macht',
    hint: 'Aus verbundenem Kontext werden konkrete nächste Schritte.',
  },
  out: {
    label: 'Was bei dir ankommt',
    hint: 'Ergebnisse, die wieder auf dieser Seite auftauchen.',
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
