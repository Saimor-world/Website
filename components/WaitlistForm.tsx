'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Check, Loader2, Heart, Sparkles } from 'lucide-react';

type Locale = 'de' | 'en';

interface WaitlistFormProps {
  locale: Locale;
}

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
    <section id="waitlist" className="relative py-20">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          className="bg-white rounded-3xl shadow-2xl border-2 border-[#D4B483]/30 overflow-hidden"
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
          <div className="p-8">
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
                  <h4 className="text-2xl font-bold text-gray-800 mb-3">
                    {content.successTitle}
                  </h4>
                  <p className="text-gray-600 mb-6">
                    {content.successMessage}
                  </p>
                  <motion.div
                    className="flex items-center justify-center gap-2 text-[#4A6741]"
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
                      className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-[#D4B483] focus:outline-none text-gray-800"
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
                      className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-[#D4B483] focus:outline-none text-gray-800"
                    />
                  </div>

                  {/* Interests */}
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-3">
                      {content.interestTitle}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {content.interests.map((item) => (
                        <motion.button
                          key={item.id}
                          type="button"
                          onClick={() => toggleInterest(item.id)}
                          className={`p-3 rounded-xl border-2 transition-all text-left ${
                            interest.includes(item.id)
                              ? 'border-[#D4B483] bg-[#D4B483]/10'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{item.emoji}</span>
                            <span className="text-sm font-medium text-gray-700">
                              {item.label}
                            </span>
                            {interest.includes(item.id) && (
                              <Check className="w-4 h-4 ml-auto text-[#4A6741]" />
                            )}
                          </div>
                        </motion.button>
                      ))}
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
                  <p className="text-xs text-gray-500 text-center">
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
