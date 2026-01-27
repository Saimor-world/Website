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
        <section className="relative py-32 sm:py-48 overflow-hidden bg-[#081410]">
            {/* Background Atmosphere - Brighter */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/15 blur-[150px] rounded-full opacity-70" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/15 blur-[120px] rounded-full opacity-50" />
                <div className="absolute bottom-0 left-0 w-full h-[20vh] bg-gradient-to-t from-emerald-500/10 to-transparent" />
            </div>

            <div className="relative z-10 mx-auto max-w-6xl px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Text Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-md">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-emerald-400/80">Semantic Intelligence</span>
                        </div>

                        <h2 className="text-5xl sm:text-7xl font-light tracking-tighter leading-[0.9]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                            <span className="block opacity-90">{t('Kein Spiegel.', 'Not a mirror.')}</span>
                            <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-500">
                                {t('Ein Gedächtnis.', 'A memory.')}
                            </span>
                        </h2>

                        <p className="text-xl text-white/40 leading-relaxed max-w-xl">
                            {t(
                                'Môra ist die semantische Analyse-Ebene Ihres Systems. Sie erkennt strategische Zusammenhänge in Echtzeit – vollständig lokal, hochverfügbar und sicher.',
                                'Môra is the semantic analysis layer of your system. It recognizes strategic connections in real-time – fully local, highly available and secure.'
                            )}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 pt-4 relative z-30 pointer-events-auto">
                            <Link
                                href={locale === 'en' ? '/en/mora' : '/mora'}
                                className="group px-10 py-5 rounded-2xl bg-white text-black font-bold hover:bg-emerald-400 transition-all hover:scale-105 flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(255,255,255,0.1)] cursor-pointer"
                            >
                                <span>{t('Showcase öffnen', 'Open Showcase')}</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link
                                href={locale === 'en' ? '/en/mora/analog-affect' : '/mora/analog-affect'}
                                className="px-10 py-5 rounded-2xl border border-white/10 text-white font-semibold hover:bg-white/5 backdrop-blur-md transition-all flex items-center justify-center hover:scale-105 cursor-pointer"
                            >
                                {t('Technische Details', 'Technical Details')}
                            </Link>
                        </div>
                    </motion.div>

                    {/* Visual Side - High Fidelity Semantic Network */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative h-[450px] flex items-center justify-center"
                    >
                        <div className="absolute w-80 h-80 bg-emerald-500/20 blur-[100px] rounded-full animate-pulse" />
                        <div className="relative w-full max-w-md aspect-square rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl rotate-3 flex items-center justify-center overflow-hidden shadow-2xl group hover:rotate-0 transition-all duration-700">
                            <img
                                src="/images/mora_showcase.png"
                                alt="Mora Semantic Intelligence"
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 blur-[0.5px] group-hover:blur-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#081410] via-transparent to-transparent opacity-60" />
                        </div>

                        {/* Orbiting particles */}
                        <motion.div
                            className="absolute w-full h-full pointer-events-none"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        >
                            <div className="absolute top-10 left-1/2 w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,1)]" />
                            <div className="absolute bottom-20 right-20 w-1.5 h-1.5 bg-cyan-400 rounded-full blur-[1px]" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
