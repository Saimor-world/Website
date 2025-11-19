type Locale = "de" | "en";

export const useCasesCopy: Record<
  Locale,
  {
    kicker: string;
    title: string;
    intro: string;
    cta: string;
    cards: { title: string; body: string }[];
  }
> = {
  de: {
    kicker: "Anwendungen",
    title: "Wo Môra sofort Resonanz stiftet",
    intro:
      "Klare Einsatzfelder aus dem aktuellen Produkt: ruhig, fokussiert, nah an echten Abläufen.",
    cta: "Kontakt aufnehmen",
    cards: [
      {
        title: "Teams & Projekte",
        body:
          "Sprint-Signale, Entscheidungsnotizen, ruhige Zusammenfassung in Folder und Field. Keine Lärmwände."
      },
      {
        title: "Café / kleiner Standort",
        body:
          "Oben: Gästezahlen, Tagesumsatz, ruhige/volle Tage. Unten im Myzel: Öffnungszeiten, Angebote, Events und Auslastung. Môra schlägt keine Preise vor, zeigt aber Muster."
      },
      {
        title: "Kommunale Einrichtungen",
        body:
          "Beteiligungs-Impulse, Anfragen, Beschlüsse im Kontextpanel. Nachvollziehbar, auditierbar."
      }
    ]
  },
  en: {
    kicker: "Use cases",
    title: "Where Môra creates resonance right now",
    intro:
      "Clear scenarios from the current product: calm, focused, aligned with real workflows.",
    cta: "Contact us",
    cards: [
      {
        title: "Teams & projects",
        body:
          "Sprint signals, decision notes, calm summaries in folder and field. No noise walls."
      },
      {
        title: "Small café / location",
        body:
          "Above: guest counts, daily revenue, calm/busy days. Below in the mycelium: opening hours, offers, events, occupancy. Môra never sets prices; it just shows where patterns change."
      },
      {
        title: "Public institutions",
        body:
          "Engagement signals, requests, resolutions inside the context panel. Traceable and calm."
      }
    ]
  }
};
