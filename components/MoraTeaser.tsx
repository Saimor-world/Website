'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

type Locale = 'de' | 'en';

type Props = {
    locale: Locale;
};

export default function MoraTeaser({ locale }: Props) {
    const t = (de: string, en: string) => (locale === 'de' ? de : en);

    return (
        <section className="relative py-24 sm:py-32 overflow-hidden">
            {/* Smooth gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0F1F17] via-[#13261D] to-[#0F1F17] opacity-95 pointer-events-none" />

            {/* Organic glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(212,168,87,0.3) 0%, transparent 70%)' }}
            />

            <div className="relative z-10 mx-auto max-w-5xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-8"
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-saimor-gold-retro/20 bg-saimor-gold-retro/5 backdrop-blur-sm">
                        <Sparkles className="w-4 h-4 text-saimor-gold-retro" />
                        <span className="text-sm font-medium text-saimor-gold-retro tracking-wider uppercase">
                            {t('Môra · Neu gestaltet', 'Môra · Reimagined')}
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white leading-tight">
                        {t('Kein Spiegel.', 'Not a mirror.')}<br />
                        <span className="text-saimor-teal italic">{t('Ein Gedächtnis.', 'A memory.')}</span>
                    </h2>

                    {/* Description */}
                    <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        {t(
                            'Môra ist das semantische Gedächtnis von Saimôr OS. Sie erkennt Muster, versteht Kontext und reflektiert – vollständig lokal, ohne externe Clouds.',
                            'Môra is the semantic memory of Saimôr OS. It recognizes patterns, understands context, and reflects – completely local, without external clouds.'
                        )}
                    </p>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Link
                            href={locale === 'en' ? '/en/mora/analog-affect' : '/mora/analog-affect'}
                            className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-saimor-teal text-black font-bold text-lg shadow-lg shadow-saimor-teal/20 hover:shadow-saimor-teal/40 hover:scale-105 transition-all duration-300"
                        >
                            <span>{t('Tief eintauchen', 'Dive deep')}</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            href={locale === 'en' ? '/en/mora' : '/mora'}
                            className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all duration-300"
                        >
                            {t('Mehr über Môra', 'Learn about Môra')}
                        </Link>
                    </div>

                    {/* Subtle hint */}
                    <p className="text-sm text-slate-500 pt-4">
                        {t('→ Nur 2 Klicks zur Deep-View-Erfahrung', '→ Just 2 clicks to the deep view experience')}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
