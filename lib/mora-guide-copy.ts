/**
 * MÔRA's lines on the website (homepage tour and Deep View universe).
 * DRAFT copy for Marius' approval before anything goes live: short, warm, honest.
 * Product statements only repeat what the site already says (no new claims).
 */
export type GuideStop = { id: string; label: string; text: string; action?: { label: string; href: string } };

export const GUIDE = {
  de: {
    name: 'MÔRA',
    hello: 'Hallo, ich bin MÔRA. Soll ich dir kurz zeigen, worum es hier geht?',
    sleepy: 'Oh, schon spät. Ich bin trotzdem da, wenn du magst.',
    yes: 'Ja, zeig mal', self: 'Ich schau selbst',
    next: 'Weiter', close: 'Hinweise schließen', poke: 'MÔRA antippen', about: 'ZU',
    stops: [
      { id: 'system', label: 'KONTEXT', text: 'Das ist die Grundidee: Was du einmal erklärst, bleibt da. Dateien, Termine und Nachrichten behalten ihren Zusammenhang.' },
      { id: 'earth-horizon', label: 'ERDE', text: 'Das Geflecht unter der Erde zeigt, wie deine Dinge zusammenhängen. Der kleine Funke darin führt zu YORI, dem Raum für Creator.' },
      { id: 'blick', label: 'DIE WELT DER KI', text: 'KI-Antworten klingen sicher. Hier geht es um die Frage, ob sie auch belegt sind. Im Deep View zeige ich dir, wie ich das sehe.', action: { label: 'Deep View', href: '/mora/deep-view?from=portal' } },
      { id: 'products', label: 'PRODUKTE', text: 'Das sind die Welten: ich, MÔRA, im SAIMÔR OS, und YORI für Creator. Anfangen kannst du am besten bei mir.', action: { label: 'MÔRA im Detail', href: '/mora' } },
      { id: 'studio', label: 'STUDIO', text: 'Lieber mit Menschen reden? Das Studio macht Beratung, Workshops und Umsetzung: Aus einer Frage wird ein nächster Schritt.' },
      { id: 'contact', label: 'KONTAKT', text: 'Das war die Runde. Schreib uns deine Frage, daraus machen wir etwas Konkretes.', action: { label: 'Kontakt', href: '/de/kontakt' } },
    ] as GuideStop[],
  },
  en: {
    name: 'MÔRA',
    hello: 'Hi, I’m MÔRA. Want a quick look at what this is about?',
    sleepy: 'Oh, it’s late. I’m still here if you like.',
    yes: 'Yes, show me', self: 'I’ll look around',
    next: 'Next', close: 'Close hints', poke: 'Tap MÔRA', about: 'ON',
    stops: [
      { id: 'system', label: 'CONTEXT', text: 'This is the core idea: what you explain once stays. Files, meetings and messages keep their context.' },
      { id: 'earth-horizon', label: 'EARTH', text: 'The network below the earth shows how your things connect. The small spark in it leads to YORI, the space for creators.' },
      { id: 'blick', label: 'THE WORLD OF AI', text: 'AI answers sound certain. This part asks whether they are also backed. In the Deep View I show you how I see it.', action: { label: 'Deep View', href: '/en/mora/deep-view?from=portal' } },
      { id: 'products', label: 'PRODUCTS', text: 'These are the worlds: me, MÔRA, in SAIMÔR OS, and YORI for creators. The best place to start is with me.', action: { label: 'MÔRA in detail', href: '/en/mora' } },
      { id: 'studio', label: 'STUDIO', text: 'Rather talk to people? The Studio does consulting, workshops and implementation: a question becomes a next step.' },
      { id: 'contact', label: 'CONTACT', text: 'That’s the tour. Send us your question and we’ll turn it into something concrete.', action: { label: 'Contact', href: '/en/contact' } },
    ] as GuideStop[],
  },
} as const;

export type UniverseStop = { id: string; title: string; sub: string; text: string; moons?: string[]; action?: { label: string; href: string } };

/** Deep View planets: the labels the homepage already uses for SAIMÔR's parts. */
export const UNIVERSE = {
  de: {
    title: 'Das SAIMÔR-Universe', back: 'Zurück', pause: 'Bewegung pausieren', status: 'PRODUKTVORSCHAU · KEINE LIVE-DATEN',
    welcome: 'Willkommen an Bord. Jeder Planet ist ein Teil deiner Arbeit. Tippe einen an, ich fliege mit.',
    start: 'Los geht’s', explore: 'Selbst erkunden', next: 'Weiter', overview: 'Zur Übersicht', again: 'Noch einmal',
    end: 'Das war die Runde. Im OS sehe ich deinen echten Stand, nicht nur eine Vorschau.',
    endAction: { label: 'MÔRA im OS entdecken', href: '/mora#im-os' },
    stops: [
      { id: 'os', title: 'SAIMÔR OS', sub: 'ein Ort · alles im Kontext', text: 'Hier kommt alles zusammen: Dateien, Arbeit und ich. Eigene Daten kommen nur über Quellen, die du verbindest.' },
      { id: 'files', title: 'DATEIEN', sub: 'im Zusammenhang', text: 'Dateien bleiben bei dem, wozu sie gehören, statt in Ordnern zu verschwinden.' },
      { id: 'work', title: 'ARBEIT', sub: 'Kalender · Inbox · Board', moons: ['KALENDER', 'INBOX', 'BOARD'], text: 'Termin, Mail und Aufgabe liegen nebeneinander. Was zusammengehört, wird sichtbar.' },
      { id: 'agents', title: 'AGENTS', sub: 'im Hintergrund', text: 'Manches läuft im Hintergrund. Was wirklich passiert, entscheidest du: Aktionen brauchen deine Freigabe.' },
      { id: 'security', title: 'SECURITY', sub: 'Check', text: 'Fang mit etwas Echtem an: deine Domain, ein Security Report, das erste Objekt im OS.', action: { label: 'Security Check', href: '/de/einstieg/security-check' } },
    ] as UniverseStop[],
  },
  en: {
    title: 'The SAIMÔR universe', back: 'Back', pause: 'Pause motion', status: 'PRODUCT PREVIEW · NO LIVE DATA',
    welcome: 'Welcome aboard. Every planet is a part of your work. Tap one and I’ll fly along.',
    start: 'Let’s go', explore: 'Explore myself', next: 'Next', overview: 'Overview', again: 'Experience again',
    end: 'That’s the tour. In the OS I see your real state, not just a preview.',
    endAction: { label: 'Discover MÔRA in the OS', href: '/en/mora#im-os' },
    stops: [
      { id: 'os', title: 'SAIMÔR OS', sub: 'one place · all in context', text: 'Everything comes together here: files, work and me. Your own data only comes through sources you connect.' },
      { id: 'files', title: 'FILES', sub: 'in context', text: 'Files stay with what they belong to instead of disappearing into folders.' },
      { id: 'work', title: 'WORK', sub: 'Calendar · Inbox · Board', moons: ['CALENDAR', 'INBOX', 'BOARD'], text: 'Meeting, mail and task sit side by side. What belongs together becomes visible.' },
      { id: 'agents', title: 'AGENTS', sub: 'in the background', text: 'Some things run in the background. What really happens is your call: actions need your approval.' },
      { id: 'security', title: 'SECURITY', sub: 'Check', text: 'Start with something real: your domain, a security report, the first object in the OS.', action: { label: 'Security Check', href: '/en/entry/security-check' } },
    ] as UniverseStop[],
  },
} as const;
