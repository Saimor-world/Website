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
    title: "Demo",
    hint: "Sieh dir Môra direkt an – mit Beispieldaten.",
    badge: "Demo",
    pulse: "Home Pulse",
    field: "Feld - Myzel",
    context: "Kontextpanel",
    chat: "Chat - ruhig",
    lines: ["Folder", "Field", "Insights", "Chat"],
    bubble: {
      question: "Welche Signale verdichten sich im Feld?",
      answer: "Drei Cluster, bereit für ein Fokusgespräch."
    },
    contextItems: [
      "Fokus: Entscheidungen & People",
      "Signals: 12 ruhig / 2 offen",
      "Nächster Schritt: Kontext teilen",
      "Beispiel: Café-Szenario"
    ],
    heading: "Demo-Ansicht - MA'ra UI"
  },
  en: {
    title: "Live Demo Panel",
    hint: "Fast preview of the real interface with simulated data. No slides, just UI.",
    badge: "Demo - simulated data",
    pulse: "Home Pulse",
    field: "Field - Mycelium",
    context: "Context panel",
    chat: "Chat - calm",
    lines: ["Folder", "Field", "Insights", "Chat"],
    bubble: {
      question: "Which signals converge in the field?",
      answer: "Three clusters, ready for a focus call."
    },
    contextItems: [
      "Focus: decisions & people",
      "Signals: 12 calm / 2 open",
      "Next step: share context",
      "Example: calm cafe flow"
    ],
    heading: "Demo view - MA'ra UI"
  }
};
