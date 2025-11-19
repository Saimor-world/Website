'use client';

import { memo, useCallback, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  BadgeCheck,
  Leaf,
  MessageCircle,
  PanelsTopLeft,
  Sparkles
} from "lucide-react";
import { demoPreviewCopy } from "@/lib/locale/demoPreview";
import { generateDemoMetrics } from "@/lib/demoMetrics";
import { logEvent } from "@/lib/logEvent";

type Locale = "de" | "en";

const gold = "#D4A857";

function DemoPreview({ locale }: { locale: Locale }) {
  const t = demoPreviewCopy[locale];
  const seedRef = useRef(
    process.env.NODE_ENV === "test" ? 42 : Date.now()
  );
  const metrics = useMemo(() => generateDemoMetrics(seedRef.current), []);
  const viewedRef = useRef(false);

  const handleView = useCallback(() => {
    if (viewedRef.current) return;
    viewedRef.current = true;
    void logEvent("demo-preview-view", { locale });
  }, [locale]);

  const handleCardEvent = useCallback(
    (action: string) => {
      void logEvent("demo-preview-interaction", { locale, action });
    },
    [locale]
  );

  const frameStyle = useMemo(
    () => ({
      background:
        "linear-gradient(180deg, rgba(17,34,27,0.95) 0%, rgba(12,24,19,0.9) 100%)",
      border: `1px solid ${gold}`,
      boxShadow:
        "0 30px 80px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
      backdropFilter: "blur(24px)"
    }),
    []
  );

  const progressLabels = ["Signals", "Resonanz", "Rhythmus"];
  const progressValues = [metrics.signals, metrics.resonance, metrics.rhythm];

  return (
    <section id="demo-preview" className="py-16 sm:py-20 lg:py-24 bg-[#0c1813]">
      <div
        className="relative mx-auto max-w-6xl px-6 lg:px-8"
        onMouseEnter={handleView}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-35"
          style={{
            background:
              "radial-gradient(900px 320px at 20% 10%, rgba(212,168,87,0.12), transparent 60%)," +
              " radial-gradient(900px 320px at 80% 10%, rgba(74,103,65,0.14), transparent 60%)"
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative space-y-6"
        >
          <div className="text-center text-white space-y-3 max-w-3xl mx-auto">
            <p
              className={[
                "inline-flex items-center gap-2 rounded-full border border-white/20",
                "bg-white/10 px-4",
                "py-2 text-xs uppercase tracking-[0.28em] text-saimor-gold shadow-sm"
              ].join(" ")}
            >
              <BadgeCheck className="h-4 w-4" strokeWidth={1.6} />
              {t.title}
            </p>
            <h2
              className="text-3xl sm:text-4xl font-semibold"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              {t.heading}
            </h2>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed">
              {t.hint}
            </p>
          </div>

          <div
            className="rounded-3xl overflow-hidden border border-white/10 relative"
            style={frameStyle}
          >
            <div
              className={[
                "absolute inset-x-0 top-0 h-px bg-gradient-to-r",
                "from-transparent via-white/35 to-transparent"
              ].join(" ")}
            />
            <div
              className={[
                "flex items-center justify-between gap-3 px-4 sm:px-6 py-4",
                "border-b border-white/10 bg-white/5"
              ].join(" ")}
            >
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <Sparkles className="h-4 w-4 text-saimor-gold" />
                <span>{t.badge}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-white/60">Live · Mock</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-[1.2fr,1fr] gap-4 sm:gap-6 p-4 sm:p-6">
              <div className="space-y-4">
                <div
                  className={[
                    "rounded-2xl border border-white/12 bg-white/8 p-4 sm:p-5",
              "shadow-[0_16px_40px_rgba(0,0,0,0.28)]"
            ].join(" ")}
          >
            <div
              className="flex items-center justify-between mb-3 text-white"
              onClick={() => handleCardEvent("metrics-row")}
            >
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Activity className="h-4 w-4 text-saimor-gold" />
                {t.pulse}
                    </div>
                    <span className="text-xs text-white/60">Calm · Focus</span>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {progressLabels.map((label, index) => (
                      <div
                        key={label}
                        className={[
                          "rounded-xl border border-white/10 bg-white/5 px-3 py-2",
                          "text-white/80 text-sm flex flex-col gap-1"
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "flex items-center justify-between text-xs uppercase",
                            "tracking-[0.1em] text-white/60"
                          ].join(" ")}
                        >
                          {label}
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: gold }}
                          />
                        </span>
                        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-saimor-gold"
                            style={{
                              width: `${progressValues[index]}%`
                            }}
                          />
                        </div>
                        <p className="text-xs text-white/65">
                          {label === "Signals"
                            ? locale === "de"
                              ? "Frische Impulse sichtbar"
                              : "Fresh impulses visible"
                            : label === "Resonanz"
                              ? locale === "de"
                                ? "Cluster im Feld"
                                : "Clusters in the field"
                              : locale === "de"
                                ? "Ruhige Taktung für Gespräche"
                                : "Calm cadence for talks"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className={[
                    "rounded-2xl border border-white/12 bg-white/8 p-4 sm:p-5",
                    "shadow-[0_16px_40px_rgba(0,0,0,0.28)] space-y-3"
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <Leaf className="h-4 w-4 text-saimor-gold" />
                      {t.field}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/70">
                      <span className="h-2 w-2 rounded-full bg-emerald-300" />
                      <span>Calm sync</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-white/85 text-sm">
                    {t.lines.map((line, index) => (
                      <div
                        key={line}
                        className={[
                          "rounded-xl bg-[#102018] border border-white/10 px-3 py-2",
                          "flex items-center gap-2"
                        ].join(" ")}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: gold }}
                        />
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                <div
                  className={[
                    "rounded-2xl border border-white/10 bg-gradient-to-r",
                    "from-white/6 to-white/2 p-3 text-sm text-white/70"
                  ].join(" ")}
                  onClick={() => handleCardEvent("field-card")}
                >
                  <p className="flex items-center gap-2">
                    <PanelsTopLeft className="h-4 w-4 text-saimor-gold" />
                    {locale === "de"
                      ? "Myzel-Karte aktualisiert · Folder · Field 12 / Insights 4"
                      : "Mycelium map updated · Folder · Field 12 / Insights 4"}
                  </p>
                </div>
              </div>
            </div>

              <div className="space-y-4">
                <div
                  className={[
                    "rounded-2xl border border-white/12 bg-white/8 p-4 sm:p-5",
                    "shadow-[0_16px_40px_rgba(0,0,0,0.28)] space-y-3"
                  ].join(" ")}
                  onClick={() => handleCardEvent("context-panel")}
                >
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <PanelsTopLeft className="h-4 w-4 text-saimor-gold" />
                      {t.context}
                    </div>
                    <span className="text-xs text-white/60">Folder · Field</span>
                  </div>
                  <ul className="space-y-2 text-sm text-white/80">
                    {t.contextItems.map((item) => (
                      <li
                        key={item}
                        className={[
                          "rounded-xl border border-white/10 bg-[#102018] px-3 py-2",
                          "flex items-center gap-2"
                        ].join(" ")}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={[
                    "rounded-2xl border border-white/12 bg-gradient-to-br",
                    "from-[#102018] to-[#0d1a14] p-4 sm:p-5",
                    "shadow-[0_16px_40px_rgba(0,0,0,0.28)] space-y-3"
                  ].join(" ")}
                  onClick={() => handleCardEvent("chat-panel")}
                >
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <MessageCircle className="h-4 w-4 text-saimor-gold" />
                      {t.chat}
                    </div>
                    <span className="text-xs text-white/65">Calm reply</span>
                  </div>
                  <div className="space-y-2 text-sm text-white/85">
                    <div
                      className={[
                        "rounded-2xl bg-white/5 border border-white/12",
                        "px-3 py-3 shadow-inner"
                      ].join(" ")}
                    >
                      <p>{t.bubble.question}</p>
                    </div>
                    <div
                      className={[
                        "rounded-2xl bg-[#0f1f17] border border-white/12",
                        "px-3 py-3 shadow-inner text-white/80"
                      ].join(" ")}
                    >
                      <p>{t.bubble.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(DemoPreview);
