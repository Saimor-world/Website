'use client';
import { motion } from 'framer-motion';

type Locale = 'de' | 'en';

type DataFlowDiagramProps = {
  locale: Locale;
};

const content: Record<Locale, {
  eyebrow: string;
  title: string;
  intro: string;
  steps: Array<{ label: string; description: string; accent: 'gray' | 'gold' | 'green' }>;
  footnote: string;
}> = {
  de: {
    eyebrow: 'Demo-Datenfluss',
    title: 'Wie Môra aktuell versorgt wird',
    intro: 'Alles läuft mit simulierten Unternehmensdaten innerhalb der Saimôr-Umgebung. Keine externen Clouds, keine Produktivsysteme – aber der komplette Stack wird bereits wie später live getestet.',
    steps: [
      {
        label: 'Mock Company Streams',
        description: 'Generierte KPI- und Voice-Datensätze spiegeln typische Organisationen, bleiben aber vollständig lokal.',
        accent: 'gray'
      },
      {
        label: 'Adapter Layer',
        description: 'Transformiert die Mock-Daten in genau das Schema, das reale Integrationen später nutzen.',
        accent: 'gold'
      },
      {
        label: 'Core API / Môra OS',
        description: 'API-Endpunkte laufen mit Auth, Logging und Audit-Hooks – nur gefüttert aus dem Adapter.',
        accent: 'green'
      },
      {
        label: 'Môra UI Widgets',
        description: 'Dashboard, Chat und Orb greifen ausschließlich auf die Core-API zu (Demo-Modus).',
        accent: 'green'
      },
      {
        label: 'Website Sections',
        description: 'Hero, Dashboard & FAQ zeigen die Core-Werte, stets als „Demo-Daten“ gekennzeichnet.',
        accent: 'green'
      }
    ],
    footnote: 'Quelle: DATA_FLOW_EXPLAINED.md – Stand MVP / Demo-Phase'
  },
  en: {
    eyebrow: 'Demo Data Flow',
    title: 'How Môra is powered today',
    intro: 'Everything runs with simulated company data inside the Saimôr environment. No external clouds, no production backends – yet the full stack behaves exactly like the live setup.',
    steps: [
      {
        label: 'Mock Company Streams',
        description: 'Generated KPI and voice datasets mirror typical organisations while staying fully local.',
        accent: 'gray'
      },
      {
        label: 'Adapter Layer',
        description: 'Transforms the mock payloads into the schema that real integrations will use later on.',
        accent: 'gold'
      },
      {
        label: 'Core API / Môra OS',
        description: 'API endpoints run with auth, logging and audit hooks – only the inputs are simulated.',
        accent: 'green'
      },
      {
        label: 'Môra UI Widgets',
        description: 'Dashboard, chat + orb only talk to the Core API (demo mode).',
        accent: 'green'
      },
      {
        label: 'Website Sections',
        description: 'Hero, dashboard and FAQ surface the Core values, always labelled as simulated data.',
        accent: 'green'
      }
    ],
    footnote: 'Source: DATA_FLOW_EXPLAINED.md – MVP / demo status'
  }
};

const accentStyles: Record<'gray' | 'gold' | 'green', { border: string; glow: string }> = {
  gray: {
    border: 'rgba(148, 163, 184, 0.45)',
    glow: '0 20px 60px rgba(148, 163, 184, 0.25)'
  },
  gold: {
    border: 'rgba(212, 180, 131, 0.55)',
    glow: '0 25px 60px rgba(212, 180, 131, 0.25)'
  },
  green: {
    border: 'rgba(74, 103, 65, 0.5)',
    glow: '0 25px 60px rgba(74, 103, 65, 0.2)'
  }
};

export default function DataFlowDiagram({ locale }: DataFlowDiagramProps) {
  const copy = content[locale];

  return (
    <section className="relative py-16 sm:py-24">
      <div
        className="absolute inset-0 rounded-[48px] opacity-60 pointer-events-none"
        style={{
          background: 'linear-gradient(145deg, rgba(74, 103, 65, 0.08), rgba(212, 180, 131, 0.08))',
          filter: 'blur(80px)'
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-semibold tracking-[0.4em] uppercase text-saimor-gold mb-3">
            {copy.eyebrow}
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 text-slate-900"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            {copy.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {copy.intro}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          {copy.steps.map((step, index) => {
            const accent = accentStyles[step.accent];
            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="relative rounded-3xl bg-white/90 backdrop-blur-xl p-5 flex flex-col gap-3 shadow-lg"
                style={{
                  border: `1px solid ${accent.border}`,
                  boxShadow: accent.glow
                }}
              >
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-slate-500">
                  <span className="inline-flex size-6 items-center justify-center rounded-full border border-current text-[0.7rem]">
                    {index + 1}
                  </span>
                  {step.accent === 'gray' ? 'Mock' : step.accent === 'gold' ? 'Adapter' : 'Core'}
                </div>
                <h3 className="text-lg font-semibold text-slate-900" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {step.label}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>

                {index < copy.steps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-1/2 -right-2 w-4 h-px"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(212,180,131,0.4) 50%, transparent 100%)'
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-xs uppercase tracking-[0.3em] text-slate-400">
          {copy.footnote}
        </p>
      </div>
    </section>
  );
}
