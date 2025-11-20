type Locale = "de" | "en";

type SectionCard = {
  title: string;
  items: string[];
};

type DemoBlock = {
  title: string;
  subtitle: string;
  rows: { label: string; value: string }[];
  note: string;
  cta: string;
};

type QuickFact = { label: string; value: string };

export const myceliumCopy: Record<
  Locale,
  {
    kicker: string;
    title: string;
    intro: string;
    badges: string[];
    forest: SectionCard;
    mycelium: SectionCard;
    demo: DemoBlock;
    quickFacts: QuickFact[];
  }
> = {
  de: {
    kicker: "Wald - Myzel - Demo",
    title: "Was wir zeigen, bleibt funktional",
    intro:
      "Kurzer Überblick über den Flow: oben Signale bündeln, unten das Myzel ordnen und eine ruhige Demo starten.",
    badges: ["Neue Wort-Bildmarke", "Primär Grün"],
    forest: {
      title: "Oben - der Wald",
      items: [
        "Teams & Projekte - wir sortieren nur Relevantes",
        "Keine Versprechen, keine Hypers",
        "Signale laufen geordnet ein"
      ]
    },
    mycelium: {
      title: "Unten - das Myzel",
      items: [
        "Connectoren verknüpfen Quellen",
        "Feld, Folder, Chat bleiben ruhig",
        "Insights zeigen den nächsten Schritt"
      ]
    },
    demo: {
      title: "Demo-Panel",
      subtitle: "Folder - Field - Insights - Chat",
      rows: [
        { label: "Modus", value: "Simulierte Daten - Calm sync" },
        { label: "Fokus", value: "People x Process" },
        { label: "Status", value: "Live Demo Panel" }
      ],
      note: "Direkter Sprung in die UI ohne Marketing-Tour.",
      cta: "Demo öffnen"
    },
    quickFacts: [
      { label: "Signals", value: "12 ruhig" },
      { label: "Dialog", value: "MA'ra antwortet nach Kontext" },
      { label: "Kontext", value: "Folder + Field kombiniert" },
      { label: "Tempo", value: "Calm - keine Hektik" }
    ]
  },
  en: {
    kicker: "Forest - Mycelium - Demo",
    title: "Only the functional bits",
    intro:
      "Compact flow: collect the signals, keep the mycelium tidy, open the demo when needed.",
    badges: ["New wordmark", "Primary green"],
    forest: {
      title: "Above - forest view",
      items: [
        "Teams & projects - only what matters",
        "No hype layers, no empty promises",
        "Signals arrive in a calm queue"
      ]
    },
    mycelium: {
      title: "Below - mycelium",
      items: [
        "Connectors tie sources together",
        "Field, folder, chat stay quiet",
        "Insights point at the next move"
      ]
    },
    demo: {
      title: "Demo panel",
      subtitle: "Folder - Field - Insights - Chat",
      rows: [
        { label: "Mode", value: "Simulated data - calm sync" },
        { label: "Focus", value: "People x Process" },
        { label: "Status", value: "Live demo panel" }
      ],
      note: "Direct jump into the UI, no marketing tour.",
      cta: "Open demo"
    },
    quickFacts: [
      { label: "Signals", value: "12 calm" },
      { label: "Dialogue", value: "MA'ra replies with context" },
      { label: "Context", value: "Folder + field combined" },
      { label: "Pace", value: "Calm - zero rush" }
    ]
  }
};
