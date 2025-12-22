'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  suggestions?: string[];
}

export default function Lichtgespraech() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `licht_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message
      const welcome: Message = {
        id: 'welcome',
        content: 'Willkommen im Lichtgespräch. Ich bin hier, um Klarheit in Ihren Wandel zu bringen. Wie kann ich Sie heute begleiten?',
        role: 'assistant',
        timestamp: new Date(),
        suggestions: [
          'Was ist Saimôr?',
          'Wie funktioniert Orbit?',
          'Lösungen für Schulen'
        ]
      };
      setMessages([welcome]);
    }
  }, [isOpen, messages.length]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: `msg_${Date.now()}_user`,
      content,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // n8n webhook auf api.saimor.world
      const response = await fetch('https://api.saimor.world/webhook/lichtgespraech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: content,
          sessionId,
          context: {
            page: window.location.pathname,
            referrer: document.referrer,
            timestamp: new Date().toISOString()
          }
        })
      });

      if (!response.ok) {
        throw new Error('n8n webhook failed');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: `msg_${Date.now()}_assistant`,
        content: data.reply || data.message || 'Entschuldigung, ich konnte keine Antwort generieren.',
        role: 'assistant',
        timestamp: new Date(),
        suggestions: data.suggestions || []
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error('Lichtgespräch error:', error);

      // Fallback zu lokalem Chatbot
      const fallbackMessage: Message = {
        id: `msg_${Date.now()}_assistant`,
        content: 'Entschuldigung, ich bin gerade nicht erreichbar. Bitte versuchen Sie es später erneut oder buchen Sie direkt ein Klarheitsgespräch.',
        role: 'assistant',
        timestamp: new Date(),
        suggestions: ['Klarheitsgespräch buchen']
      };

      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestion === 'Klarheitsgespräch buchen') {
      window.open('https://cal.com/saimor/30min', '_blank');
      return;
    }
    sendMessage(suggestion);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="relative w-20 h-20 rounded-full shadow-2xl overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #4A6741 0%, #5D7C54 50%, #D4A857 100%)',
              border: '3px solid rgba(212, 180, 131, 0.6)',
              boxShadow: '0 20px 60px rgba(74, 103, 65, 0.4), 0 0 40px rgba(212, 180, 131, 0.3)'
            }}
          >
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'radial-gradient(circle at 30% 30%, rgba(212, 180, 131, 0.4) 0%, transparent 70%)',
                  'radial-gradient(circle at 70% 70%, rgba(212, 180, 131, 0.4) 0%, transparent 70%)',
                  'radial-gradient(circle at 30% 30%, rgba(212, 180, 131, 0.4) 0%, transparent 70%)'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Icon */}
            <motion.div
              className="relative z-10"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>

            {/* Pulse Rings */}
            {[0, 1].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full"
                style={{
                  border: '2px solid rgba(212, 180, 131, 0.6)'
                }}
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.6, 0, 0.6]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 1
                }}
              />
            ))}

            {/* Label */}
            <motion.div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-xs font-semibold text-saimor-green">
                Lichtgespräch
              </span>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="mb-4 w-[400px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 245, 240, 0.95) 100%)',
              backdropFilter: 'blur(30px)',
              border: '2px solid rgba(212, 180, 131, 0.4)',
              boxShadow: '0 30px 80px rgba(74, 103, 65, 0.3)'
            }}
          >
            {/* Header */}
            <div
              className="relative p-6 border-b"
              style={{
                background: 'linear-gradient(135deg, #4A6741 0%, #5D7C54 100%)',
                borderBottom: '1px solid rgba(212, 180, 131, 0.3)'
              }}
            >
              {/* Animated Particles in Header */}
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{
                    background: '#D4A857',
                    left: `${20 + i * 15}%`,
                    top: `${30 + Math.random() * 40}%`
                  }}
                  animate={{
                    y: [-5, 5, -5],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: Infinity
                  }}
                />
              ))}

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Sparkles className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Lichtgespräch</h3>
                    <p className="text-xs text-white/80">Klarheit im Wandel</p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.role === 'user'
                        ? 'ml-4'
                        : 'mr-4'
                    }`}
                    style={{
                      background: message.role === 'user'
                        ? 'linear-gradient(135deg, #D4A857 0%, #E6C897 100%)'
                        : 'linear-gradient(135deg, rgba(74, 103, 65, 0.08) 0%, rgba(212, 180, 131, 0.12) 100%)',
                      border: message.role === 'user'
                        ? '1px solid rgba(212, 180, 131, 0.4)'
                        : '1px solid rgba(74, 103, 65, 0.2)',
                      boxShadow: message.role === 'user'
                        ? '0 4px 15px rgba(212, 180, 131, 0.2)'
                        : '0 4px 15px rgba(74, 103, 65, 0.05)'
                    }}
                  >
                    <p
                      className={`text-sm leading-relaxed ${
                        message.role === 'user' ? 'text-white' : 'text-slate-800'
                      }`}
                    >
                      {message.content}
                    </p>

                    {/* Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {message.suggestions.map((suggestion, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors"
                            style={{
                              background: 'rgba(255, 255, 255, 0.8)',
                              border: '1px solid rgba(74, 103, 65, 0.2)',
                              color: '#4A6741'
                            }}
                          >
                            → {suggestion}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div
                    className="max-w-[80%] p-4 rounded-2xl mr-4"
                    style={{
                      background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.08) 0%, rgba(212, 180, 131, 0.12) 100%)',
                      border: '1px solid rgba(74, 103, 65, 0.2)'
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-saimor-green" />
                      <span className="text-sm text-slate-600">Denke nach...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="p-4 border-t"
              style={{
                borderTop: '1px solid rgba(212, 180, 131, 0.3)',
                background: 'rgba(255, 255, 255, 0.8)'
              }}
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ihre Nachricht..."
                  className="flex-1 px-4 py-3 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-saimor-green/30"
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(74, 103, 65, 0.2)'
                  }}
                  disabled={isLoading}
                />

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!input.trim() || isLoading}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: 'linear-gradient(135deg, #4A6741 0%, #5D7C54 100%)',
                    boxShadow: '0 4px 15px rgba(74, 103, 65, 0.3)'
                  }}
                >
                  <Send className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
