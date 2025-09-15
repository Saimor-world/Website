'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, ExternalLink, ArrowDown } from 'lucide-react';
import BrandSun from './BrandSun';

interface AIAgentProps {
  locale: 'de' | 'en';
}

export default function AIAgent({ locale }: AIAgentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<'welcome' | 'chat'>('welcome');

  const content = {
    de: {
      greeting: 'Hallo, ich bin der Saimôr-Guide.',
      subtitle: 'Ich helfe dir, Klarheit im Wandel zu finden.',
      question: 'Möchtest du unser Angebot kennenlernen oder direkt ein Lichtgespräch buchen?',
      buttons: {
        showOffer: 'Angebot zeigen',
        bookCall: 'Lichtgespräch buchen',
        askQuestion: 'Frage stellen'
      },
      chatPlaceholder: 'Deine Frage...',
      send: 'Senden'
    },
    en: {
      greeting: 'Hello, I am the Saimôr Guide.',
      subtitle: 'I help you find clarity in change.',
      question: 'Would you like to explore our offering or book a light conversation directly?',
      buttons: {
        showOffer: 'Show offering',
        bookCall: 'Book light conversation',
        askQuestion: 'Ask question'
      },
      chatPlaceholder: 'Your question...',
      send: 'Send'
    }
  }[locale];

  const handleShowOffer = () => {
    const element = document.getElementById('leistungen');
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const handleBookCall = () => {
    window.open('https://cal.com/saimor/30min', '_blank');
    setIsOpen(false);
  };

  const handleAskQuestion = () => {
    setCurrentStep('chat');
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, duration: 0.5, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-br from-gold to-[#FFD700] rounded-full shadow-xl flex items-center justify-center text-navy hover:shadow-2xl transition-all duration-300"
        style={{
          boxShadow: '0 8px 25px rgba(255, 206, 69, 0.4)'
        }}
      >
        <BrandSun className="w-8 h-8" />
      </motion.button>

      {/* Chat Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy/20 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-paper rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-navy to-navy-light text-paper p-6 relative">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-paper/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                    <BrandSun className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                      Saimôr Guide
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-paper/70">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Online
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {currentStep === 'welcome' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="space-y-3">
                      <h4 className="font-serif text-2xl text-navy" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                        {content.greeting}
                      </h4>
                      <p className="text-navy/70">
                        {content.subtitle}
                      </p>
                      <p className="text-navy/60">
                        {content.question}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleShowOffer}
                        className="w-full p-4 bg-navy text-paper rounded-xl hover:bg-navy-light transition-colors duration-200 flex items-center justify-between"
                      >
                        <span>{content.buttons.showOffer}</span>
                        <ArrowDown className="w-5 h-5" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleBookCall}
                        className="w-full p-4 bg-gold text-navy rounded-xl hover:brightness-110 transition-all duration-200 flex items-center justify-between font-semibold"
                      >
                        <span>{content.buttons.bookCall}</span>
                        <ExternalLink className="w-5 h-5" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAskQuestion}
                        className="w-full p-4 border-2 border-navy/20 text-navy rounded-xl hover:border-gold/60 hover:text-gold transition-all duration-200 flex items-center justify-between"
                      >
                        <span>{content.buttons.askQuestion}</span>
                        <MessageCircle className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div className="h-60 bg-bone-dark rounded-xl p-4 overflow-y-auto">
                      <div className="text-center text-navy/60 text-sm py-8">
                        Stelle deine Frage und ich verbinde dich mit dem passenden Ansprechpartner.
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder={content.chatPlaceholder}
                        className="flex-1 p-3 border border-navy/20 rounded-xl focus:border-gold focus:outline-none transition-colors"
                      />
                      <button className="px-4 py-3 bg-gold text-navy rounded-xl hover:brightness-110 transition-all">
                        {content.send}
                      </button>
                    </div>

                    <button
                      onClick={() => setCurrentStep('welcome')}
                      className="text-sm text-navy/60 hover:text-navy transition-colors"
                    >
                      ← Zurück zu den Optionen
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}