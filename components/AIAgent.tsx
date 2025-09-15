'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, ExternalLink, ArrowDown, Send, Loader2 } from 'lucide-react';
import BrandSun from './BrandSun';

interface AIAgentProps {
  locale: 'de' | 'en';
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  suggestions?: string[];
}

export default function AIAgent({ locale }: AIAgentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<'welcome' | 'chat'>('welcome');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      send: 'Senden',
      backToOptions: '← Zurück zu den Optionen',
      chatHelper: 'Stelle deine Frage und ich helfe dir gerne weiter.'
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
      send: 'Send',
      backToOptions: '← Back to options',
      chatHelper: 'Ask your question and I\'ll be happy to help.'
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue,
          locale
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'agent',
        timestamp: new Date(),
        suggestions: data.suggestions
      };

      setMessages(prev => [...prev, agentMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: locale === 'de'
          ? 'Entschuldigung, es gab einen Fehler. Bitte versuche es erneut oder kontaktiere uns direkt.'
          : 'Sorry, there was an error. Please try again or contact us directly.',
        sender: 'agent',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
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
                    {/* Chat Messages */}
                    <div className="h-60 bg-bone-dark rounded-xl p-4 overflow-y-auto">
                      {messages.length === 0 ? (
                        <div className="text-center text-navy/60 text-sm py-8">
                          {content.chatHelper}
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {messages.map((message) => (
                            <div
                              key={message.id}
                              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div
                                className={`max-w-[80%] p-3 rounded-lg text-sm ${
                                  message.sender === 'user'
                                    ? 'bg-navy text-paper ml-4'
                                    : 'bg-paper border border-navy/10 text-navy mr-4'
                                }`}
                              >
                                <p>{message.text}</p>
                                {message.suggestions && (
                                  <div className="mt-2 space-y-1">
                                    {message.suggestions.map((suggestion, index) => (
                                      <button
                                        key={index}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        className="block w-full text-left px-2 py-1 text-xs bg-gold/10 hover:bg-gold/20 rounded border border-gold/20 transition-colors"
                                      >
                                        {suggestion}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                          {isLoading && (
                            <div className="flex justify-start">
                              <div className="bg-paper border border-navy/10 text-navy p-3 rounded-lg mr-4">
                                <Loader2 className="w-4 h-4 animate-spin" />
                              </div>
                            </div>
                          )}
                          <div ref={messagesEndRef} />
                        </div>
                      )}
                    </div>

                    {/* Input */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={content.chatPlaceholder}
                        className="flex-1 p-3 border border-navy/20 rounded-xl focus:border-gold focus:outline-none transition-colors"
                        disabled={isLoading}
                      />
                      <button
                        onClick={sendMessage}
                        disabled={isLoading || !inputValue.trim()}
                        className="px-4 py-3 bg-gold text-navy rounded-xl hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      </button>
                    </div>

                    <button
                      onClick={() => setCurrentStep('welcome')}
                      className="text-sm text-navy/60 hover:text-navy transition-colors"
                    >
                      {content.backToOptions}
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