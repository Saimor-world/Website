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
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none z-0"
                style={{ background: 'radial-gradient(circle, rgba(212,168,87,0.3) 0%, transparent 70%)' }}
            />

            <div className="relative z-20 mx-auto max-w-5xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-8"
                >
                    {/* Badge Removed per user request */}

                    {/* Title */}
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white leading-tight space-y-1">
                        <span className="block">{t('Kein Spiegel.', 'Not a mirror.')}</span>
                        <span className="block text-saimor-gold-retro italic">{t('Ein Gedächtnis.', 'A memory.')}</span>
                    </h2>

                    {/* Description */}
                    <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        {t(
                            'Môra ist das semantische Gedächtnis von Saimôr OS. Sie erkennt Muster und Kontext – vollständig lokal, ohne externe Clouds.',
                            'Môra is the semantic memory of Saimôr OS. It recognises patterns and context – fully local, without external clouds.'
                        )}
                    </p>

                    {/* CTA - Swapped prominence per user request */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 relative z-50">
                        <a
                            href={locale === 'en' ? '/en/mora' : '/mora'}
                            className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-saimor-gold-retro text-[#0F1F17] font-semibold text-lg shadow-lg shadow-saimor-gold-retro/20 min-h-[44px] transition-all duration-200 hover:scale-[1.02]"
                        >
                            <span>{t('Mehr über Môra', 'About Môra')}</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>

                        <a
                            href={locale === 'en' ? '/en/mora/analog-affect' : '/mora/analog-affect'}
                            className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/20 text-white hover:bg-white/8 transition-all duration-300 min-h-[44px] hover:scale-[1.02] hover:border-white/30"
                        >
                            {t('Tief eintauchen', 'Dive deep')}
                        </a>
                    </div>

                    {/* Subtle hint */}
                    <p className="text-sm text-slate-500 pt-4">
                        {t('Zwei Klicks bis zur Deep-View-Erfahrung.', 'Two clicks to the deep view experience.')}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
