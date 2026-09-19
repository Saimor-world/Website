export type ClientWorldNote = {
  id: string;
  seen: string;
  idea: string;
};

export type ClientWorldAnswerBlock = {
  kind: 'answer';
  id: string;
  title: string;
  lead: string;
  body: string[];
  steps: string[];
  close: string;
};

export type ClientWorldNotesBlock = {
  kind: 'notes';
  id: string;
  title: string;
  lead: string;
  shot?: { src: string; alt: string; caption: string };
  notes: ClientWorldNote[];
};

export type ClientWorldBlock = ClientWorldAnswerBlock | ClientWorldNotesBlock;

export type ClientWorldConfig = {
  slug: string;
  clientName: string;
  brandName: string;
  brandLine: string;
  stand: string;
  intro: string[];
  blocks: ClientWorldBlock[];
  unknown: { title: string; body: string };
  questions: { title: string; lead: string; items: string[] };
  feedback: { title: string; lead: string; placeholder: string; button: string };
};

type ClientWorldDefinition = ClientWorldConfig & {
  accessEnvKey: string;
};

const WORLDS: Record<string, ClientWorldDefinition> = {
  luana: {
    slug: 'luana',
    clientName: 'Luana',
    brandName: 'Luana Lumina',
    brandLine: 'Bewusstseinstraining · Identitätsshift · Energiearbeit',
    accessEnvKey: 'CLIENT_WORLD_LUANA_CODE',
    stand: 'Stand: September 2026',
    intro: [
      'wir haben uns deine Seite angeschaut und deine Sprachnachricht zur E-Mail-Sache gehört. Hier steht beides: eine Antwort auf die Domain-Frage und das, was uns am Auftritt aufgefallen ist.',
      'Du musst nichts davon sofort beantworten. Wenn etwas nicht passt, schreib es unten rein.',
    ],
    blocks: [
      {
        kind: 'answer',
        id: 'mail-domain',
        title: 'Zur E-Mail-Domain',
        lead: 'Dein Verdacht stimmt. Mit einer kostenlosen Gmail- oder Outlook-Adresse kannst du aus einem Automatisierungs-Tool nicht verschicken, und das liegt nicht an dir.',
        body: [
          'Die Tools müssen jede Mail technisch unterschreiben, damit sie beim Empfänger nicht sofort als Spam gilt. Unterschreiben kannst du aber nur für eine Domain, über die du selbst bestimmst. Über gmail.com bestimmt Google, nicht du — deshalb lehnen die Tools solche Absender ab.',
          'Die Domain bei IONOS hast du ja schon gekauft. Damit ist der Teil erledigt, der Geld kostet. Was noch fehlt, sind drei Schritte:',
        ],
        steps: [
          'Bei IONOS ein Postfach auf deiner Domain anlegen. Das findest du im Kundenbereich unter E-Mail. Kostet meistens ein bis drei Euro im Monat.',
          'Diese Adresse im Tool als Absender eintragen, zum Beispiel hallo@ oder kontakt@ vor deiner Domain.',
          'Das Tool zeigt dir danach zwei bis drei Einträge an, die SPF, DKIM und manchmal DMARC heißen. Die kopierst du bei IONOS unter Domains in die DNS-Verwaltung.',
        ],
        close: 'Schritt drei ist der, bei dem sich fast alle vertippen. Wenn du magst, machen wir den zusammen, das dauert zwanzig Minuten. Sag uns nur, welches Tool du nehmen willst, dann schauen wir vorher nach, wie die Einträge dort genau heißen.',
      },
      {
        kind: 'notes',
        id: 'site',
        title: 'Was uns auf deiner Seite aufgefallen ist',
        lead: 'Angeschaut auf dem Handy im Instagram-Browser, also so, wie die meisten sie zuerst sehen. Fünf Sachen, alle am Einstieg.',
        shot: {
          src: '/world/luana-site-hero.webp',
          alt: 'Der Einstieg von luanalumina auf dem Handy: Kopfzeile mit Luana Lumina, darunter das Bild im Grasfeld mit der Überschrift und zwei Buttons.',
          caption: 'Dein Einstieg, wie er auf dem Handy ankommt.',
        },
        notes: [
          {
            id: 'doppelte-zeile',
            seen: 'Bewusstseinstraining · Identitätsshift · Energiearbeit steht zweimal da: oben in der Kopfzeile und nochmal blass im Bild.',
            idea: 'Einmal reicht. Im Bild ist die Zeile ohnehin kaum zu lesen, sie liegt fast auf der Überschrift.',
          },
          {
            id: 'kopfzeile-umbruch',
            seen: 'In der Kopfzeile rutscht „Energiearbeit" auf eine zweite Zeile und läuft dabei unter den Menü-Knopf.',
            idea: 'Auf dem Handy nur „Luana Lumina" stehen lassen und die drei Wörter erst weiter unten bringen.',
          },
          {
            id: 'headline-lesbarkeit',
            seen: 'Die Überschrift steht weiß auf dem Gras, und die mittlere Zeile läuft genau über den Schreibtisch und deinen Kopf.',
            idea: 'Der Satz selbst ist gut, der bleibt. Nur der Hintergrund an der Stelle muss ruhiger werden: anderer Bildausschnitt oder ein weicher dunkler Verlauf hinter dem Text.',
          },
          {
            id: 'zwei-buttons',
            seen: 'Zwei Buttons, gleich groß, gleich gestaltet: „Angebote entdecken" und „Identitätsshift Guide".',
            idea: 'Einer sollte der Hauptweg sein, der andere klein darunter. Nebeneinander entscheidet sich niemand.',
          },
          {
            id: 'versalien',
            seen: 'Fast alles ist in Großbuchstaben und weit gesperrt gesetzt.',
            idea: 'Für Kopfzeile und Buttons passt das. Bei längeren Zeilen würden wir auf normale Schreibweise gehen, das liest sich am Handy schneller.',
          },
        ],
      },
    ],
    unknown: {
      title: 'Was wir nicht wissen',
      body: 'Von Instagram, TikTok und den Besucherzahlen deiner Seite haben wir nichts gesehen. Also sagen wir auch nichts dazu, was dort gut läuft oder nicht — das wäre geraten. Wenn wir da mal draufschauen sollen, sag Bescheid, dann klären wir vorher, was du uns dafür geben müsstest.',
    },
    questions: {
      title: 'Drei Fragen an dich',
      lead: 'Damit kommen wir am schnellsten weiter.',
      items: [
        'Wie heißt deine Domain bei IONOS genau?',
        'Welches Tool soll die Mails verschicken?',
        'Ist der Identitätsshift Guide fertig, oder entsteht der noch?',
      ],
    },
    feedback: {
      title: 'Deine Antwort',
      lead: 'Was nicht passt, was fehlt, was wir falsch verstanden haben.',
      placeholder: 'Zum Beispiel: Die Überschrift bleibt so, aber beim Bild gebe ich dir recht.',
      button: 'Abschicken',
    },
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

export function getClientWorldNoteIds(world: ClientWorldConfig): string[] {
  return world.blocks.flatMap((block) => (block.kind === 'notes' ? block.notes.map((note) => note.id) : []));
}
