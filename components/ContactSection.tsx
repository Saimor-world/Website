'use client';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Sparkles, ArrowRight } from 'lucide-react';
import { useState } from 'react';

type Props = { locale: 'de' | 'en' };

export default function ContactSection({ locale }: Props) {
  const t = (de: string, en: string) => (locale === 'de' ? de : en);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="kontakt" className="relative py-32 sm:py-48 bg-[#081410] overflow-hidden">
      {/* Background Atmosphere - Brighter */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-emerald-500/15 blur-[180px] rounded-full opacity-70" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full opacity-40" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          
          {/* Info Side */}
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-emerald-400/80">Direct Line</span>
              </div>
              <h2 className="text-5xl sm:text-7xl font-light tracking-tighter leading-[0.9]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                <span className="block opacity-90">{t('Bereit für', 'Ready for')}</span>
                <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-500">
                  {t('Resonanz?', 'Resonance?')}
                </span>
              </h2>
              <p className="text-xl text-white/40 leading-relaxed max-w-md">
                {t('Lass uns über deine Vision sprechen. Kurz, fokussiert, wirkungsvoll.', 'Let\'s talk about your vision. Short, focused, impactful.')}
              </p>
            </div>

            <div className="space-y-8">
              <motion.a 
                href="mailto:contact@saimor.world"
                className="flex items-center gap-6 group"
                whileHover={{ x: 10 }}
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                  <Mail className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-black text-white/20">Email</p>
                  <p className="text-lg text-white font-medium">contact@saimor.world</p>
                </div>
              </motion.a>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white/40" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-black text-white/20">{t('Standort', 'Location')}</p>
                  <p className="text-lg text-white/40 font-medium">EU-Based / Remote</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-20"
          >
            <form onSubmit={handleSubmit} className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/20 px-2">{t('Name', 'Name')}</label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/20 px-2">Email</label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/20 px-2">{t('Nachricht', 'Message')}</label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-5 rounded-2xl bg-white text-black font-bold hover:bg-emerald-400 transition-all hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
              >
                {status === 'sending' ? t('Analyse läuft...', 'Analyzing...') : status === 'sent' ? t('✓ Übermittelt', '✓ Transmitted') : (
                  <>
                    <span className="uppercase tracking-[0.2em]">{t('Strategie-Anfrage senden', 'Request Strategy Call')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
