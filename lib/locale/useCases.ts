type Locale = "de" | "en";

type UseCaseCopy = {
  kicker: string;
  title: string;
  intro: string;
  cta: string;
  cards: { title: string; body: string }[];
};

export const useCasesCopy: Record<Locale, UseCaseCopy> = {
  de: {
    kicker: "Anwendungen",
    title: "Kurz und funktional",
    intro: "Drei Felder, in denen wir MA'ra heute nutzen koennen – jeweils mit klaren Datenstroemen.",
    cta: "Kontakt aufnehmen",
    cards: [
      {
        title: "Teams & Projekte",
        body: "Sprint-Signale, Entscheidungsnotizen, ruhige Ordner-Ansicht. Keine Laermwaende."
      },
      {
        title: "Café / Standort",
        body: "Oben Zahlen & Auslastung, unten oeffnungszeiten, Events, Angebote. Muster statt Hype."
      },
      {
        title: "Kommunale Einrichtungen",
        body: "Beteiligung, Anfragen, Beschluesse im Kontextpanel – auditierbar und ruhig."
      }
    ]
  },
  en: {
    kicker: "Use cases",
    title: "Short and functional",
    intro: "Three areas where MA'ra already works – each with a clear data stream.",
    cta: "Reach out",
    cards: [
      {
        title: "Teams & projects",
        body: "Sprint signals, decision notes, calm folder view. Zero noise walls."
      },
      {
        title: "Café / venue",
        body: "Top view for numbers & load, bottom view for hours, events, offers. Patterns, not hype."
      },
      {
        title: "Public institutions",
        body: "Engagement, requests, resolutions inside the context panel – traceable and calm."
      }
    ]
  }
};


