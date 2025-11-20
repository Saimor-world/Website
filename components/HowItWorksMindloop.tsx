'use client';

import { Activity, Brain, PanelsTopLeft } from "lucide-react";
import { memo, useCallback } from "react";
import { logEvent } from "@/lib/logEvent";

type Locale = "de" | "en";

const copy = {
  de: {
    kicker: "Überblick",
    title: "Klarheit statt Chaos",
    intro: "Môra bringt Ordnung in deine Daten.",
    steps: [
      {
        title: "Signale sammeln",
        body: "Systeme, Dokumente und Notizen liefern Zustände – wir speichern nur Relevantes."
      },
      {
        title: "Bedeutung erkennen",
        body: "Eine schlanke Semantik-Schicht markiert Muster, Hinweise und Risiken."
      },
      {
        title: "Kontext zeigen",
        body: "Feld, Folder und Chat bleiben ruhig und erklären, was zusammengehört."
      }
    ]
  },
  en: {
    kicker: "Overview",
    title: "Clarity, not chaos",
    intro: "Môra brings order to your data.",
    steps: [
      {
        title: "Collect signals",
        body: "Systems, docs, and notes provide states – only relevant bits stay."
      },
      {
        title: "Read meaning",
        body: "A slim semantic layer marks patterns, hints, and risks."
      },
      {
        title: "Show context",
        body: "Field, folder, and chat stay calm and explain what belongs together."
      }
    ]
  }
} as const;const icons = [Activity, Brain, PanelsTopLeft];

function HowItWorksMindloop({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const handleCard = useCallback(
    (title: string) => {
      void logEvent("mindloop-step", { locale, title });
    },
    [locale]
  );

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#0f1f17] via-[#0d1b14] to-[#0c1813]">
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8 space-y-10">
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background:
              "radial-gradient(900px 320px at 20% 10%, rgba(212,168,87,0.12), transparent 60%)," +
              " radial-gradient(900px 320px at 80% 10%, rgba(74,103,65,0.14), transparent 60%)"
          }}
        />

        <div className="relative text-center text-white space-y-3 max-w-3xl mx-auto">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-saimor-gold shadow-sm">
            {t.kicker}
          </p>
          <h2
            className="text-3xl sm:text-4xl font-semibold"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            {t.title}
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
            {t.intro}
          </p>
        </div>

        <div className="relative grid gap-4 sm:gap-6 lg:grid-cols-3">
          {t.steps.map((step, idx) => {
            const Icon = icons[idx];
            return (
              <div
                key={step.title}
                className={[
                  "rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl p-6 sm:p-7",
                  "shadow-[0_18px_50px_rgba(0,0,0,0.24)] flex flex-col gap-3",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-saimor-gold/60 cursor-pointer"
                ].join(" ")}
                tabIndex={0}
                role="button"
                onClick={() => handleCard(step.title)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleCard(step.title);
                  }
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-3">
                    <span className="rounded-2xl bg-white/10 border border-white/10 p-2 inline-flex">
                      <Icon className="h-5 w-5 text-saimor-gold" />
                    </span>
                    <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  </div>
                  <span className="text-xs text-white/60">0{idx + 1}</span>
                </div>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">{step.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default memo(HowItWorksMindloop);


