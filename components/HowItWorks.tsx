'use client';

import { useEffect, useRef } from "react";
import { Radar, Brain, PanelsTopLeft } from "lucide-react";
import clsx from "clsx";

type Locale = "de" | "en";

const steps = {
  de: [
    {
      title: "Signale sammeln",
      body: "Beobachtungen und Pulse kommen sortiert an – kein Lärm.",
      icon: Radar
    },
    {
      title: "Bedeutung lesen",
      body: "Eine kurze Semantik-Schicht markiert Muster und Risiken.",
      icon: Brain
    },
    {
      title: "Kontext zeigen",
      body: "Die Myzel-Karte erklärt, was zusammengehört.",
      icon: PanelsTopLeft
    }
  ],
  en: [
    {
      title: "Collect signals",
      body: "Observations and pulses arrive sorted - no noise.",
      icon: Radar
    },
    {
      title: "Read meaning",
      body: "A quick semantic layer flags patterns and risks.",
      icon: Brain
    },
    {
      title: "Show context",
      body: "The mycelium map explains what belongs together.",
      icon: PanelsTopLeft
    }
  ]
} as const;

const copy = {
  de: {
    kicker: "Drei Schritte",
    title: "So arbeitet Môra",
    intro: "Signale sammeln, Muster erkennen, Kontext zeigen.",
    badge: "Ruhig · Klar"
  },
  en: {
    kicker: "Three steps",
    title: "How Môra works",
    intro: "Collect signals, spot patterns, show context.",
    badge: "Calm · Clear"
  }
} as const;

export default function HowItWorks({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#0c1813] via-[#0f1f17] to-[#0c1813]"
      style={{ borderTop: "1px solid rgba(212,168,87,0.18)" }}
    >
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8 space-y-10">
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background:
              "radial-gradient(700px 260px at 20% 20%, rgba(212,168,87,0.12), transparent 60%)," +
              " radial-gradient(900px 320px at 80% 10%, rgba(74,103,65,0.14), transparent 60%)"
          }}
        />

        <div className="relative text-center text-white space-y-3">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-saimor-gold shadow-sm">
            {t.kicker}
          </p>
          <h2
            className="text-3xl sm:text-4xl font-semibold"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            {t.title}
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">{t.intro}</p>
          <span className="text-xs text-white/60">{t.badge}</span>
        </div>

        <div className="relative grid gap-4 sm:gap-6 lg:grid-cols-3">
          {steps[locale].map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                ref={(el) => {
                  cardsRef.current[index] = el as HTMLDivElement;
                }}
                className={clsx(
                  "rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl p-6 sm:p-7",
                  "shadow-[0_18px_50px_rgba(0,0,0,0.22)] flex flex-col gap-3",
                  "opacity-0 translate-y-6 transition-all duration-700 ease-out",
                  "[&.is-visible]:opacity-100 [&.is-visible]:translate-y-0"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-3">
                    <span className="rounded-2xl bg-white/10 border border-white/10 p-2 inline-flex">
                      <Icon className="h-5 w-5 text-saimor-gold" />
                    </span>
                    <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  </div>
                  <span className="text-xs text-white/60">0{index + 1}</span>
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

