type Locale = "de" | "en";

export const demoPreviewCopy: Record<
  Locale,
  {
    title: string;
    hint: string;
    badge: string;
    pulse: string;
    field: string;
    context: string;
    chat: string;
    lines: string[];
    bubble: { question: string; answer: string };
    contextItems: string[];
    heading: string;
  }
> = {
  de: {
    title: "Live Demo Panel",
    hint:
      "Hier siehst du einen echten Einblick in Môras Resonanzraum — alle Elemente stammen direkt aus der UI (Demo-Daten). So könnte der Raum für ein Café aussehen – mit simulierten Daten.",
    badge: "Demo-Ansicht (simulierte Daten)",
    pulse: "Home Pulse",
    field: "Feld · Myzel",
    context: "Kontextpanel",
    chat: "Chat · ruhiger Modus",
    lines: ["Folder", "Field", "Insights", "Chat (ruhig)"],
    bubble: {
      question: "Welche Signale verdichten sich im Feld?",
      answer: "Antwort: drei Cluster, bereit für Fokusgespräch."
    },
    contextItems: [
      "Fokus: Entscheidungen & People",
      "Signals: 12 ruhig, 2 offen",
      "Nächster Schritt: Kontext teilen",
      "Beispiel: Café-Raum mit simulierten Daten"
    ],
    heading: "Demo-Ansicht · Môra UI"
  },
  en: {
    title: "Live Demo Panel",
    hint:
      "Here’s a real preview of Môra’s resonance space — all elements come directly from the UI (demo data).",
    badge: "Demo view (simulated data)",
    pulse: "Home Pulse",
    field: "Field · Mycelium",
    context: "Context panel",
    chat: "Chat · calm mode",
    lines: ["Folder", "Field", "Insights", "Chat (calm)"],
    bubble: {
      question: "Which signals converge in the field?",
      answer: "Answer: three clusters, ready for a focus call."
    },
    contextItems: [
      "Focus: decisions & people",
      "Signals: 12 calm, 2 open",
      "Next step: share context",
      "Example: calm café view · simulated data"
    ],
    heading: "Demo view · Môra UI"
  }
};
