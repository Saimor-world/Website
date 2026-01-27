'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Check, Loader2, Heart, Sparkles, ArrowRight } from 'lucide-react';
import type { CSSProperties } from 'react';

type Locale = 'de' | 'en';

interface WaitlistFormProps {
  locale: Locale;
}

const glassPanelStyle: CSSProperties = {
  background:
    'linear-gradient(135deg, rgba(10, 22, 18, 0.9) 0%, rgba(10, 22, 18, 0.6) 100%)',
  border: '1px solid rgba(212, 180, 131, 0.25)',
  backdropFilter: 'blur(40px)',
  boxShadow:
    '0 40px 100px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
};

const glassFieldStyle: CSSProperties = {
  background:
    'rgba(255, 255, 255, 0.03)',
  border: '1px solid rgba(212, 180, 131, 0.2)',
  backdropFilter: 'blur(20px)',
  boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)'
};

export default function WaitlistForm({ locale }: WaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [interest, setInterest] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const content = {
    de: {
      title: 'Strategischer Vorabzugang',
      subtitle: 'Sichern Sie sich Ihren Platz im Ökosystem und gestalten Sie die Zukunft semantischer Organisationen mit.',
      namePlaceholder: 'Ihr Name',
      emailPlaceholder: 'geschaeftlich@email.de',
      interestTitle: 'Interessensgebiete (optional)',
      interests: [
        { id: 'mora-ai', label: 'Môra Semantic AI', emoji: '✨' },
        { id: 'dashboards', label: 'Analytics & Dashboards', emoji: '📊' },
        { id: 'workshops', label: 'Corporate Transformation', emoji: '🎤' },
        { id: 'orbit', label: 'Systems Coaching', emoji: '🌍' }
      ],
      submit: 'Platz sichern',
      submitting: 'Übermittlung läuft …',
      successTitle: 'Registrierung erfolgreich 🌱',
      successMessage: 'Wir haben Ihre Anfrage erhalten und melden uns mit weiteren Details zur Bereitstellung.',
      errorMessage: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
      privacy: 'Ihre Daten werden exklusiv für den Early Access verwendet. DSGVO-konform.'
    },
    en: {
      title: 'Strategic Early Access',
      subtitle: 'Secure your place in the ecosystem and help shape the future of semantic organizations.',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'business@email.com',
      interestTitle: 'Areas of Interest (optional)',
      interests: [
        { id: 'mora-ai', label: 'Môra Semantic AI', emoji: '✨' },
        { id: 'dashboards', label: 'Analytics & Dashboards', emoji: '📊' },
        { id: 'workshops', label: 'Corporate Transformation', emoji: '🎤' },
        { id: 'orbit', label: 'Systems Coaching', emoji: '🌍' }
      ],
      submit: 'Secure Spot',
      submitting: 'Transmitting …',
      successTitle: 'Registration Successful 🌱',
      successMessage: 'We have received your request and will follow up with deployment details.',
      errorMessage: 'Something went wrong. Please try again.',
      privacy: 'Your data is used exclusively for early access. GDPR-compliant.'
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
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          interests: interest,
          locale: locale,
          timestamp: new Date().toISOString()
        })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setEmail('');
        setName('');
        setInterest([]);

        // Trigger achievement for first contact
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('saimor-contact-submitted'));
        }
      } else {
        setStatus('error');
        setMessage(data.error || 'Submission failed');
      }
    } catch (err) {
      console.error('Waitlist submission error:', err);
      setStatus('error');
    }
  };

  return (
    <section id="waitlist" className="relative py-32 bg-[#081410]">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-emerald-500/10 blur-[200px] rounded-full opacity-40" />
      </div>
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          className="rounded-[3rem] border border-white/10 bg-white/[0.05] backdrop-blur-3xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-5 h-full">

            {/* Left Decor */}
            <div className="md:col-span-2 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 p-12 flex flex-col justify-between border-r border-white/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-noise opacity-20" />
              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-4xl font-light leading-tight text-white tracking-tighter" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {content.title}
                </h3>
                <p className="text-white/40 leading-relaxed">
                  {content.subtitle}
                </p>
              </div>
              <div className="relative z-10 pt-12">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#081410] bg-white/10" />
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-[#081410] bg-emerald-500 flex items-center justify-center text-[10px] font-bold text-black">+120</div>
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] font-black text-white/20 mt-4">System Access Pending</p>
              </div>
            </div>

            {/* Right Form */}
            <div className="md:col-span-3 p-12 relative z-20">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                      <Check className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h4 className="text-2xl font-bold text-white uppercase tracking-wider">{content.successTitle}</h4>
                    <p className="text-white/40 leading-relaxed max-w-sm">{content.successMessage}</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/20 px-2">{content.namePlaceholder}</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/20 px-2">Email</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-[10px] uppercase tracking-[0.3em] font-black text-white/20 px-2">{content.interestTitle}</p>
                      <div className="grid grid-cols-2 gap-3">
                        {content.interests.map((item) => {
                          const isActive = interest.includes(item.id);
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => toggleInterest(item.id)}
                              className={`p-4 rounded-2xl border transition-all text-left group ${isActive ? 'bg-emerald-500 border-emerald-400' : 'bg-white/5 border-white/10 hover:border-white/20'
                                }`}
                            >
                              <div className="flex items-center gap-3">
                                <span className={`text-sm font-bold uppercase tracking-wider ${isActive ? 'text-black' : 'text-white/60 group-hover:text-white'}`}>
                                  {item.label}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full py-5 rounded-2xl bg-white text-black font-bold hover:bg-emerald-400 transition-all hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(255,255,255,0.1)] relative z-30 cursor-pointer pointer-events-auto"
                    >
                      {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                        <>
                          <span className="uppercase tracking-[0.2em] font-black">{content.submit}</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <p className="text-[10px] text-white/20 text-center uppercase tracking-widest leading-relaxed">
                      {content.privacy}
                    </p>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
