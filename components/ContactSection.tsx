'use client';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

type Props = { locale: 'de' | 'en' };

export default function ContactSection({ locale }: Props) {
  const t = (de: string, en: string) => (locale === 'de' ? de : en);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate API call
    setTimeout(() => {
      setStatus('sent');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="kontakt" className="py-20 sm:py-32 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #F8F5F0 0%, #FAF0E6 100%)' }}>
      {/* Background elements */}
      <motion.div
        className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212, 180, 131, 0.5) 0%, transparent 70%)',
          filter: 'blur(80px)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -30, 0],
          y: [0, 40, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-6xl px-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="font-serif text-4xl sm:text-5xl md:text-6xl mb-6"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              background: 'linear-gradient(135deg, #4A6741 0%, #D4A857 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {t('Kontakt', 'Contact')}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {t('Kurz sprechen, Fokus klären, nächsten Schritt festlegen.', 'Short call, clear focus, next step.')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="rounded-[2.5rem] p-10 relative overflow-hidden h-full flex flex-col justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.05) 0%, rgba(212, 168, 87, 0.08) 100%)',
                border: '1px solid rgba(212, 168, 87, 0.2)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05)'
              }}>
              <h3 className="font-serif text-3xl mb-8 text-slate-900"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {t('Direkt erreichen', 'Reach out directly')}
              </h3>

              <div className="space-y-6">
                <motion.a
                  href="mailto:contact@saimor.world"
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 text-slate-700 hover:text-saimor-green transition-colors group"
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{
                      background: 'linear-gradient(135deg, rgba(74,103,65,0.15) 0%, rgba(212,168,87,0.2) 100%)',
                      border: '1px solid rgba(212,168,87,0.3)'
                    }}>
                    <Mail size={20} className="text-saimor-green" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-saimor-green/70">E-Mail</p>
                    <p className="font-medium">contact@saimor.world</p>
                  </div>
                </motion.a>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 text-slate-700"
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(74,103,65,0.15) 0%, rgba(212,168,87,0.2) 100%)',
                      border: '1px solid rgba(212,168,87,0.3)'
                    }}>
                    <MapPin size={20} className="text-saimor-green" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-saimor-green/70">
                      {t('Standort', 'Location')}
                    </p>
                    <p className="font-medium">
                      {t('EU-basiert, DSGVO-konform', 'EU-based, GDPR-compliant')}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Cal.com CTA */}
            <motion.a
              href="https://cal.com/saimor/30min"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.05,
                y: -6,
                boxShadow: '0 30px 60px rgba(74, 103, 65, 0.25)'
              }}
              whileTap={{ scale: 0.98 }}
              className="block rounded-[2.5rem] p-8 text-center overflow-hidden group relative"
              style={{
                background: 'linear-gradient(135deg, rgba(26, 60, 50, 0.95) 0%, rgba(42, 90, 74, 0.9) 100%)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(214, 168, 72, 0.4)'
              }}
            >
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    'radial-gradient(circle at 30% 50%, rgba(212,168,87,0.3) 0%, transparent 60%)',
                    'radial-gradient(circle at 70% 50%, rgba(212,168,87,0.3) 0%, transparent 60%)',
                    'radial-gradient(circle at 30% 50%, rgba(212,168,87,0.3) 0%, transparent 60%)'
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <div className="relative z-10">
                <Phone className="w-12 h-12 mx-auto mb-4 text-white" />
                <h4 className="font-serif text-2xl mb-2 text-white"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {t('Klarheitsgespräch buchen', 'Book clarity call')}
                </h4>
                <p className="text-white/90">
                  {t('30 Minuten kostenlos – ohne Verkaufsdruck', '30 minutes free – no sales pressure')}
                </p>
              </div>
            </motion.a>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="rounded-[2.5rem] p-10 space-y-6"
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(212, 168, 87, 0.2)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.05)'
              }}>
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-saimor-green mb-2">
                  {t('Name', 'Name')}
                </label>
                <input
                  type="text"
                  id="name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-saimor-gold/30 focus:border-saimor-green focus:outline-none transition-colors"
                  style={{ background: 'rgba(255,255,255,0.8)' }}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-saimor-green mb-2">
                  {t('E-Mail', 'Email')}
                </label>
                <input
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-saimor-gold/30 focus:border-saimor-green focus:outline-none transition-colors"
                  style={{ background: 'rgba(255,255,255,0.8)' }}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-saimor-green mb-2">
                  {t('Nachricht', 'Message')}
                </label>
                <textarea
                  id="message"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border-2 border-saimor-gold/30 focus:border-saimor-green focus:outline-none transition-colors resize-none"
                  style={{ background: 'rgba(255,255,255,0.8)' }}
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 rounded-xl font-bold text-lg text-white flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: status === 'sent'
                    ? 'linear-gradient(135deg, #4A6741 0%, #5D7C54 100%)'
                    : 'linear-gradient(135deg, rgba(74, 103, 65, 0.95) 0%, rgba(93, 124, 84, 0.9) 100%)',
                  boxShadow: '0 8px 25px rgba(74, 103, 65, 0.25)'
                }}
              >
                {status === 'sending' && t('Wird gesendet...', 'Sending...')}
                {status === 'sent' && t('✓ Gesendet!', '✓ Sent!')}
                {status === 'idle' && (
                  <>
                    <span>{t('Nachricht senden', 'Send message')}</span>
                    <Send size={20} />
                  </>
                )}
              </motion.button>

              <p className="text-xs text-slate-500 text-center">
                {t(
                  'Alle Anfragen werden DSGVO-konform verarbeitet. Keine Profile, keine Weitergabe.',
                  'All inquiries are processed in compliance with GDPR. No profiles, no sharing.'
                )}
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
