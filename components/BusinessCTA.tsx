'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Phone, Zap } from 'lucide-react';
import Link from 'next/link';

interface BusinessCTAProps {
  variant?: 'hero' | 'sticky' | 'inline';
  title?: string;
  subtitle?: string;
  primaryAction?: {
    text: string;
    href: string;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    text: string;
    href: string;
    icon?: React.ReactNode;
  };
}

export default function BusinessCTA({
  variant = 'inline',
  title = "Bereit für Klarheit?",
  subtitle = "30 Minuten kostenloses Gespräch über deine Herausforderungen.",
  primaryAction = {
    text: "Termin buchen",
    href: "https://cal.com/saimor/30min",
    icon: <Calendar className="w-5 h-5" />
  },
  secondaryAction = {
    text: "Live Demo",
    href: "/demo",
    icon: <Zap className="w-5 h-5" />
  }
}: BusinessCTAProps) {

  if (variant === 'hero') {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-24 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border-y border-emerald-500/20"
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {title}
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href={primaryAction.href}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
            >
              {primaryAction.icon}
              <span>{primaryAction.text}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href={secondaryAction.href}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm text-white font-medium hover:bg-white/10 transition-all"
            >
              {secondaryAction.icon}
              <span>{secondaryAction.text}</span>
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-white/60">
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>Kostenlos</span>
            </span>
            <span>•</span>
            <span>Keine Verpflichtung</span>
            <span>•</span>
            <span>24h Antwort</span>
          </div>
        </div>
      </motion.section>
    );
  }

  if (variant === 'sticky') {
    return (
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="fixed bottom-6 left-6 right-6 z-50 md:left-auto md:right-6 md:w-80"
      >
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            <p className="text-white/70 text-sm">{subtitle}</p>
          </div>

          <div className="flex gap-3">
            <Link
              href={primaryAction.href}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold text-sm hover:shadow-lg transition-all"
            >
              {primaryAction.icon}
              <span>{primaryAction.text}</span>
            </Link>

            <Link
              href={secondaryAction.href}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white font-medium text-sm hover:bg-white/10 transition-all"
            >
              {secondaryAction.icon}
              <span>{secondaryAction.text}</span>
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  // Default inline variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-3xl p-12 border border-emerald-500/20 text-center"
    >
      <h3 className="text-3xl font-semibold mb-4 text-white">{title}</h3>
      <p className="text-white/70 mb-8 max-w-2xl mx-auto">{subtitle}</p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href={primaryAction.href}
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
        >
          {primaryAction.icon}
          <span>{primaryAction.text}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          href={secondaryAction.href}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm text-white font-medium hover:bg-white/10 transition-all"
        >
          {secondaryAction.icon}
          <span>{secondaryAction.text}</span>
        </Link>
      </div>
    </motion.div>
  );
}

// Pre-configured CTAs for common use cases
export function DemoCTA() {
  return (
    <BusinessCTA
      variant="hero"
      title="Môra live erleben"
      subtitle="Entdecke das semantische Dashboard in Aktion. Voll funktionsfähig, sicher & kostenlos."
      primaryAction={{
        text: "Demo starten",
        href: "/demo",
        icon: <Zap className="w-5 h-5" />
      }}
      secondaryAction={{
        text: "Persönliche Demo",
        href: "/de/kontakt",
        icon: <Calendar className="w-5 h-5" />
      }}
    />
  );
}

export function ContactCTA() {
  return (
    <BusinessCTA
      title="Direkter Kontakt"
      subtitle="Schreib uns oder buche direkt einen Termin. Wir antworten innerhalb 24h."
      primaryAction={{
        text: "Nachricht schreiben",
        href: "/de/kontakt",
        icon: <ArrowRight className="w-5 h-5" />
      }}
      secondaryAction={{
        text: "30-Minuten Call",
        href: "https://cal.com/saimor/30min",
        icon: <Calendar className="w-5 h-5" />
      }}
    />
  );
}

export function StickyCTA() {
  return (
    <BusinessCTA
      variant="sticky"
      title="Kostenlos beraten lassen"
      subtitle="30 Minuten unverbindlich"
      primaryAction={{
        text: "Termin",
        href: "https://cal.com/saimor/30min",
        icon: <Calendar className="w-4 h-4" />
      }}
      secondaryAction={{
        text: "Demo",
        href: "/demo",
        icon: <Zap className="w-4 h-4" />
      }}
    />
  );
}
