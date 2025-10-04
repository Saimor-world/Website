'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface LiveChatProps {
  className?: string;
}

export default function LiveChat({ className = '' }: LiveChatProps) {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [sessionInfo, setSessionInfo] = useState<{remaining: number; requiresAuth: boolean; authMessage?: string} | null>(null);
  const [requiresCaptcha, setRequiresCaptcha] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}_user`,
      content,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          sessionId,
          captchaToken
        })
      });

      if (!response.ok) {
        const errorData = await response.json();

        if (response.status === 429) {
          if (errorData.requiresAuth) {
            // Session limit reached
            const errorMessage: ChatMessage = {
              id: `msg_${Date.now()}_error`,
              content: errorData.message + ' Für erweiterten Zugang können Sie sich kostenlos anmelden.',
              role: 'assistant',
              timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
            setSessionInfo({ remaining: 0, requiresAuth: true });
          } else {
            // Rate limit
            const errorMessage: ChatMessage = {
              id: `msg_${Date.now()}_error`,
              content: 'Bitte warten Sie einen Moment, bevor Sie die nächste Nachricht senden.',
              role: 'assistant',
              timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
          }
        } else if (errorData.requiresCaptcha) {
          setRequiresCaptcha(true);
          const errorMessage: ChatMessage = {
            id: `msg_${Date.now()}_error`,
            content: errorData.message,
            role: 'assistant',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, errorMessage]);
        } else {
          throw new Error(errorData.error || 'Chat request failed');
        }
        return;
      }

      const data = await response.json();
      setMessages(prev => [...prev, data.message]);

      // Update session info for public users
      if (data.sessionInfo) {
        setSessionInfo(data.sessionInfo);
      }

      // Reset captcha if successful
      if (captchaToken) {
        setRequiresCaptcha(false);
        setCaptchaToken(null);
      }

    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        id: `msg_${Date.now()}_error`,
        content: 'Entschuldigung, es gab einen Fehler. Bitte versuchen Sie es erneut.',
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full text-slate-900 font-bold text-lg shadow-2xl overflow-hidden relative group"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 215, 102, 0.9) 0%, rgba(251, 191, 36, 0.95) 100%)',
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(255, 255, 255, 0.4)',
              boxShadow: '0 15px 35px rgba(251, 191, 36, 0.4)'
            }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'linear-gradient(45deg, rgba(255, 215, 102, 0.8) 0%, rgba(251, 191, 36, 0.9) 100%)',
                  'linear-gradient(135deg, rgba(251, 191, 36, 0.9) 0%, rgba(255, 215, 102, 0.8) 100%)',
                  'linear-gradient(225deg, rgba(254, 240, 138, 0.8) 0%, rgba(251, 191, 36, 0.9) 100%)',
                  'linear-gradient(315deg, rgba(255, 215, 102, 0.8) 0%, rgba(251, 191, 36, 0.9) 100%)'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            <span className="relative z-10">💬</span>

            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-yellow-400/50"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
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
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="mb-4 w-96 h-[500px] rounded-3xl shadow-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)',
              backdropFilter: 'blur(25px)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-3 h-3 rounded-full bg-green-400"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <h3 className="font-semibold text-slate-800">Lichtgespräch</h3>
              </div>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-slate-600 hover:bg-white/30 transition-colors"
              >
                ✕
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[360px]">
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-slate-600 mt-20"
                >
                  <div className="mb-4 text-4xl">🌟</div>
                  <p className="text-sm leading-relaxed">
                    Willkommen zu Ihrem persönlichen Lichtgespräch.<br />
                    Wie kann ich Sie heute begleiten?
                  </p>
                </motion.div>
              )}

              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'text-slate-900 ml-4'
                        : 'text-slate-800 mr-4'
                    }`}
                    style={{
                      background: message.role === 'user'
                        ? 'linear-gradient(135deg, rgba(255, 215, 102, 0.8) 0%, rgba(251, 191, 36, 0.9) 100%)'
                        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: message.role === 'user'
                        ? '0 4px 15px rgba(251, 191, 36, 0.2)'
                        : '0 4px 15px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
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
                    className="max-w-[80%] p-3 rounded-2xl mr-4"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    <div className="flex space-x-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-slate-400"
                          animate={{
                            y: [0, -8, 0],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Session Info for Public Users */}
              {sessionInfo && !session && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mx-4 mb-2"
                >
                  <div className="bg-yellow-50/80 border border-yellow-200/50 rounded-xl p-3 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-yellow-700">
                        {sessionInfo.remaining > 0
                          ? `Noch ${sessionInfo.remaining} Nachrichten übrig`
                          : 'Nachrichtenlimit erreicht'
                        }
                      </span>
                    </div>
                    {sessionInfo.requiresAuth && (
                      <div className="mt-2 pt-2 border-t border-yellow-200/50">
                        <Link
                          href="/login"
                          className="text-xs bg-yellow-500 text-slate-900 px-3 py-1 rounded-lg hover:bg-yellow-400 transition-colors"
                        >
                          Kostenlos anmelden für vollständigen Zugang
                        </Link>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Auth Status for Logged In Users */}
              {session && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mx-4 mb-2"
                >
                  <div className="bg-green-50/80 border border-green-200/50 rounded-xl p-3 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-sm text-green-700">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Angemeldet als {session.user?.email}
                      {session.user?.role === 'pro' ? ' (Pro)' : ' (Free)'}
                    </div>
                    <div className="text-xs text-green-600 mt-1">
                      {session.user?.role === 'pro'
                        ? 'Unbegrenzte Nachrichten + Vollständiger Verlauf'
                        : 'Erweiterte Limits + Anmelde-Funktionen'
                      }
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-white/20">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ihre Nachricht..."
                  className="flex-1 px-4 py-2 rounded-2xl text-slate-800 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.4)'
                  }}
                  disabled={isLoading}
                />

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!inputValue.trim() || isLoading}
                  className="px-4 py-2 rounded-2xl text-slate-900 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 215, 102, 0.9) 0%, rgba(251, 191, 36, 0.95) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    boxShadow: '0 4px 15px rgba(251, 191, 36, 0.3)'
                  }}
                >
                  ✨
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}