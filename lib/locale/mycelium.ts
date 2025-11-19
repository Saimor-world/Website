type Locale = "de" | "en";

export const myceliumCopy: Record<
  Locale,
  {
    kicker: string;
    title: string;
    intro: string;
    forest: { title: string; points: string[] };
    mycelium: { title: string; lines: string[]; badge: string };
    panelTitle: string;
    panelSub: string;
    chatPrompt: string;
    chatAnswer: string;
    demoCaption: string;
    demoLink: string;
  }
> = {
  de: {
    kicker: "Wald · Myzel · Demo-Ansicht",
    title: "Was oben rauscht, fließt unten zusammen",
    intro:
      "Unter jeder Organisation liegt ein Myzel aus Daten, Entscheidungen und Beziehungen. Môra macht dieses Geflecht sichtbar – als Demo-Ansicht, Feld und ruhigen Dialog.",
    forest: {
      title: "Oben: der Wald",
      points: [
        "Teams, Projekte, Signale – viele Stimmen, wenig Zeit",
        "Wir sammeln nur, was für Klarheit nötig ist",
        "Kein Lärm, keine Versprechen, die noch nicht existieren"
      ]
    },
    mycelium: {
      title: "Unten: das Myzel",
      lines: [
        "Quellen verbinden (Connectoren)",
        "Myzel erkennen (Feld)",
        "Kontext & Insights",
        "Dialog mit Môra (Chat)"
      ],
      badge: "Demo-Ansicht (simulierte Daten)"
    },
    panelTitle: "Môra Blick in das Myzel",
    panelSub: "Folder · Field · Insights · Chat",
    chatPrompt: "Welche Signale verbinden People & Process?",
    chatAnswer: "Antwort nach kurzer Reflexion – ruhig, mit Kontext.",
    demoCaption: "Demo-Ansicht ansehen",
    demoLink: "Zum Live Demo Panel"
  },
  en: {
    kicker: "Forest · Mycelium · Demo view",
    title: "What rustles above connects below",
    intro:
      "Every organisation has a mycelium of data, decisions, and relationships. Môra reveals this structure – as demo view, field view, and calm dialogue.",
    forest: {
      title: "Above: the forest",
      points: [
        "Teams, projects, signals – many voices, little time",
        "We only gather what is needed for clarity",
        "No noise, no promises that don’t exist"
      ]
    },
    mycelium: {
      title: "Below: the mycelium",
      lines: [
        "Connect sources (connectors)",
        "See the field (mycelium)",
        "Context & insights",
        "Dialogue with Môra (chat)"
      ],
      badge: "Demo view (simulated data)"
    },
    panelTitle: "Môra view into the mycelium",
    panelSub: "Folder · Field · Insights · Chat",
    chatPrompt: "Which signals connect people & process?",
    chatAnswer: "Response after brief reflection – calm, with context.",
    demoCaption: "See the demo view",
    demoLink: "Go to Live Demo Panel"
  }
};
