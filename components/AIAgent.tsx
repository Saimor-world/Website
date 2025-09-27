'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

interface AIAgentProps {
  locale: 'de' | 'en';
}

interface FAQ {
  question: string;
  answer: string;
}

export default function AIAgent({ locale }: AIAgentProps) {
  const [isOpen, setIsOpen] = useState(false);

  const content = {
    de: {
      title: 'Weisheit - Ihr Begleiter',
      faqs: [
        {
          question: 'Was ist ein Klarheitsgespräch?',
          answer: 'Ein 30-minütiges, kostenfreies Online-Gespräch zur Klärung Ihrer Situation – ohne Verkauf, nur Klarheit. Es dient der ersten Orientierung und dem gegenseitigen Kennenlernen.'
        },
        {
          question: 'Was sind die Prinzipien?',
          answer: 'Unsere vier Grundwerte: Klar (Durchblick schaffen), Resonant (verstärken, was zählt), Modern (zeitgemäße Ansätze) und Kooperativ (gemeinsam statt gegeneinander).'
        },
        {
          question: 'Wie kann ich Kontakt aufnehmen?',
          answer: 'Am einfachsten über ein Klarheitsgespräch via Cal.com oder über unser Kontaktformular. Alle Anfragen werden DSGVO-konform behandelt.'
        }
      ],
      bookCall: 'Klarheitsgespräch buchen',
      contactForm: 'Zum Kontaktformular'
    },
    en: {
      title: 'Wisdom - Your Guide',
      faqs: [
        {
          question: 'What is a clarity conversation?',
          answer: 'A 30-minute, free online conversation to clarify your situation – no sales, just clarity. It serves as initial orientation and mutual acquaintance.'
        },
        {
          question: 'What are the principles?',
          answer: 'Our four core values: Clear (create clarity), Resonant (amplify what matters), Modern (contemporary approaches) and Cooperative (together instead of against each other).'
        },
        {
          question: 'How can I get in touch?',
          answer: 'Easiest via a clarity conversation through Cal.com or through our contact form. All inquiries are handled in compliance with GDPR.'
        }
      ],
      bookCall: 'Book clarity conversation',
      contactForm: 'To contact form'
    }
  }[locale];

  const handleBookCall = () => {
    window.open(process.env.NEXT_PUBLIC_CAL_URL ?? 'https://cal.com/saimor/30min', '_blank');
  };

  const handleContactForm = () => {
    const element = document.getElementById('kontakt');
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Glassmorphism Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, duration: 0.5, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full shadow-xl flex items-center justify-center hover:shadow-2xl transition-all duration-300 backdrop-blur-md border border-white/20"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
          boxShadow: '0 8px 25px rgba(255, 206, 69, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.2)'
        }}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-slate-900 font-bold text-lg">?</div>
      </motion.button>

      {/* FAQ Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden backdrop-blur-md border border-white/20"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%)'
              }}
            >
              {/* Header */}
              <div className="p-6 pb-4 relative">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-black/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-700" />
                </button>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-slate-900 font-bold text-sm">i</div>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-slate-800" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                      {content.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* FAQ Content */}
              <div className="px-6 pb-6">
                <div className="space-y-4 mb-6">
                  {content.faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-xl bg-white/50 border border-white/30"
                    >
                      <h4 className="font-semibold text-slate-800 mb-2">
                        {faq.question}
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBookCall}
                    className="w-full p-4 bg-yellow-500 text-slate-900 rounded-xl hover:bg-yellow-400 transition-all duration-200 flex items-center justify-between font-semibold"
                  >
                    <span>{content.bookCall}</span>
                    <ExternalLink className="w-5 h-5" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleContactForm}
                    className="w-full p-4 border-2 border-slate-300 text-slate-700 rounded-xl hover:border-yellow-500 hover:text-yellow-600 transition-all duration-200"
                  >
                    <span>{content.contactForm}</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}