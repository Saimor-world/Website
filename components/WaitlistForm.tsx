'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Check, Loader2, Heart, Sparkles } from 'lucide-react';
import type { CSSProperties } from 'react';

type Locale = 'de' | 'en';

interface WaitlistFormProps {
  locale: Locale;
}

const glassPanelStyle: CSSProperties = {
  background:
    'linear-gradient(135deg, rgba(10, 22, 18, 0.85) 0%, rgba(10, 22, 18, 0.55) 100%)',
  border: '1px solid rgba(212, 180, 131, 0.35)',
  backdropFilter: 'blur(32px)',
  boxShadow:
    '0 35px 80px rgba(10, 22, 18, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
};

const glassFieldStyle: CSSProperties = {
  background:
    'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(212, 180, 131, 0.08) 100%)',
  border: '1px solid rgba(212, 180, 131, 0.3)',
  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.12)'
};

export default function WaitlistForm({ locale }: WaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [interest, setInterest] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const content = {
    de: {
      title: 'Warteliste für Early Access',
      subtitle: 'Erhalte exklusiven Zugang zu Môra und gestalte die Zukunft von Saimôr mit.',
      namePlaceholder: 'Dein Name',
      emailPlaceholder: 'deine@email.de',
      interestTitle: 'Was interessiert dich? (optional)',
      interests: [
        { id: 'mora-ai', label: 'Môra KI-Assistentin', emoji: '🤖' },
        { id: 'dashboards', label: 'Dashboards & Analytics', emoji: '📊' },
        { id: 'workshops', label: 'Workshops & Pulse', emoji: '🎯' },
        { id: 'orbit', label: 'Orbit Coaching', emoji: '🌀' }
      ],
      submit: 'Auf Warteliste setzen',
      submitting: 'Wird gesendet...',
      successTitle: 'Willkommen in der Community! 🎉',
      successMessage: 'Du erhältst in Kürze eine Bestätigungs-E-Mail. Wir melden uns, sobald Môra bereit ist!',
      errorMessage: 'Etwas ist schief gelaufen. Bitte versuche es erneut oder schreib uns direkt.',
      privacy: 'Deine Daten werden nur für Early-Access verwendet. Keine Newsletter ohne deine Zustimmung.',
      position: 'Wartelisten-Position wird nach Anmeldung angezeigt'
    },
    en: {
      title: 'Early Access Waitlist',
      subtitle: 'Get exclusive access to Môra and help shape the future of Saimôr.',
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'your@email.com',
      interestTitle: 'What interests you? (optional)',
      interests: [
        { id: 'mora-ai', label: 'Môra AI Assistant', emoji: '🤖' },
        { id: 'dashboards', label: 'Dashboards & Analytics', emoji: '📊' },
        { id: 'workshops', label: 'Workshops & Pulse', emoji: '🎯' },
        { id: 'orbit', label: 'Orbit Coaching', emoji: '🌀' }
      ],
      submit: 'Join Waitlist',
      submitting: 'Sending...',
      successTitle: 'Welcome to the Community! 🎉',
      successMessage: 'You\'ll receive a confirmation email shortly. We\'ll reach out when Môra is ready!',
      errorMessage: 'Something went wrong. Please try again or contact us directly.',
      privacy: 'Your data is only used for early access. No newsletters without your consent.',
      position: 'Waitlist position will be shown after signup'
    }
  }[locale];

  const toggleInterest = (id: string) => {
    setInterest(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Integration mit n8n Webhook oder Mailchimp
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          interests: interest,
          locale,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        setStatus('success');
        setMessage(content.successMessage);
        // Reset form
        setEmail('');
        setName('');
        setInterest([]);
      } else {
        setStatus('error');
        setMessage(content.errorMessage);
      }
    } catch (error) {
      setStatus('error');
      setMessage(content.errorMessage);
    }
  };

  return (
    <section id="waitlist" className="relative py-20 sm:py-24">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          className="rounded-3xl overflow-hidden"
          style={glassPanelStyle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="bg-gradient-to-br from-[#4A6741] to-[#D4B483] p-8 text-white text-center">
            <motion.div
              className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-8 h-8" />
            </motion.div>
            <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              {content.title}
            </h3>
            <p className="text-white/90">
              {content.subtitle}
            </p>
          </div>

          {/* Form */}
          <div className="p-8 text-white">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                  >
                    <Check className="w-10 h-10 text-white" />
                  </motion.div>
                  <h4 className="text-2xl font-bold text-white mb-3">
                    {content.successTitle}
                  </h4>
                  <p className="text-white/80 mb-6">
                    {content.successMessage}
                  </p>
                  <motion.div
                    className="flex items-center justify-center gap-2 text-[#D4B483]"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart className="w-5 h-5 fill-current" />
                    <span className="font-semibold">Danke, dass du dabei bist!</span>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                >
                  {/* Name */}
                  <div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={content.namePlaceholder}
                      required
                      className="w-full px-6 py-4 rounded-xl bg-transparent text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#D4B483]/30"
                      style={glassFieldStyle}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={content.emailPlaceholder}
                      required
                      className="w-full px-6 py-4 rounded-xl bg-transparent text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#D4B483]/30"
                      style={glassFieldStyle}
                    />
                  </div>

                  {/* Interests */}
                  <div>
                    <p className="text-sm font-medium text-white/80 mb-3">
                      {content.interestTitle}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {content.interests.map((item) => {
                        const isActive = interest.includes(item.id);
                        return (
                          <motion.button
                            key={item.id}
                            type="button"
                            onClick={() => toggleInterest(item.id)}
                            className="p-3 rounded-xl transition-all text-left"
                            style={{
                              ...glassFieldStyle,
                              ...(isActive
                                ? {
                                    borderColor: 'rgba(212, 180, 131, 0.6)',
                                    background:
                                      'linear-gradient(135deg, rgba(212, 180, 131, 0.25) 0%, rgba(74, 103, 65, 0.2) 100%)'
                                  }
                                : {})
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center gap-2 text-white">
                              <span className="text-xl">{item.emoji}</span>
                              <span className="text-sm font-medium">
                                {item.label}
                              </span>
                              {isActive && (
                                <Check className="w-4 h-4 ml-auto text-[#D4B483]" />
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#4A6741] to-[#D4B483] text-white font-bold text-lg shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 flex items-center justify-center gap-3"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {content.submitting}
                      </>
                    ) : (
                      <>
                        <Mail className="w-5 h-5" />
                        {content.submit}
                      </>
                    )}
                  </motion.button>

                  {/* Error */}
                  {status === 'error' && (
                    <motion.p
                      className="text-red-500 text-sm text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {message}
                    </motion.p>
                  )}

                  {/* Privacy */}
                  <p className="text-xs text-white/60 text-center">
                    {content.privacy}
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
