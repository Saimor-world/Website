'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, X, Loader2, User, Bot } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface Suggestion {
  text: string;
  id: string;
}

export default function MoraChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Session ID (persists across messages)
  const sessionIdRef = useRef<string>(
    typeof window !== 'undefined'
      ? `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      : ''
  );

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opening
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: 'Hallo! Ich bin Môra, deine KI-Begleiterin für Klarheit im Wandel. Wie kann ich dir heute helfen?',
        timestamp: Date.now()
      }]);
      setSuggestions([
        { id: '1', text: 'Was ist Saimôr?' },
        { id: '2', text: 'Wie funktioniert Orbit?' },
        { id: '3', text: 'Termin buchen' }
      ]);
    }
  }, [isOpen, messages.length]);

  // Listen for open event from MoraShowcase
  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('openMoraChat', handleOpenChat);
    return () => window.removeEventListener('openMoraChat', handleOpenChat);
  }, []);

  const sendMessage = async (text: string = input.trim()) => {
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setSuggestions([]);

    try {
      const response = await fetch('/api/mora', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          conversationId,
          sessionId: sessionIdRef.current
        })
      });

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => ({}));
        throw new Error(errorPayload?.error || 'Môra ist gerade nicht erreichbar');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply || data.response || 'Ich habe verstanden. Wie kann ich dir weiterhelfen?',
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, assistantMessage]);

      if (data.conversationId) {
        setConversationId(data.conversationId);
      }

      if (data.suggestions && data.suggestions.length > 0) {
        setSuggestions(
          data.suggestions.map((s: string, i: number) => ({
            id: `sug-${i}`,
            text: s
          }))
        );
      }
    } catch (error) {
      console.error('Chat error:', error);

      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Entschuldigung, ich bin gerade nicht erreichbar. Bitte versuche es später noch einmal oder buche direkt einen Termin auf Cal.com.',
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    sendMessage(suggestion.text);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed bottom-24 right-6 z-50 w-[400px] h-[600px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-8rem)] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          style={{
            background: 'linear-gradient(135deg, rgba(248, 247, 243, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(212, 180, 131, 0.3)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
          }}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 180, damping: 22 }}
        >
          {/* Header */}
          <div
            className="relative p-4 border-b"
            style={{
              background: 'linear-gradient(135deg, #4A6741 0%, #5D7C54 100%)',
              borderColor: 'rgba(212, 180, 131, 0.3)'
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4A857] to-[#E6C897] flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Môra
                </h3>
                <p className="text-xs text-white/80">
                  KI-Begleiterin für Klarheit
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.map((message, i) => (
              <motion.div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#4A6741] to-[#5D7C54] flex items-center justify-center shadow-md">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}

                <div
                  className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${message.role === 'user'
                      ? 'bg-gradient-to-br from-[#D4A857] to-[#E6C897] text-white'
                      : 'bg-white border border-gray-200 text-gray-800'
                    }`}
                  style={{
                    boxShadow: message.role === 'user'
                      ? '0 4px 12px rgba(212, 180, 131, 0.3)'
                      : '0 2px 8px rgba(0, 0, 0, 0.08)'
                  }}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>

                {message.role === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#D4A857] to-[#E6C897] flex items-center justify-center shadow-md">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </motion.div>
            ))}

            {isLoading && (
              <motion.div
                className="flex gap-3 justify-start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4A6741] to-[#5D7C54] flex items-center justify-center shadow-md">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="px-4 py-2.5 rounded-2xl bg-white border border-gray-200 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-[#4A6741]" />
                  <span className="text-sm text-gray-600">Denke nach...</span>
                </div>
              </motion.div>
            )}

            {/* Suggestions */}
            {suggestions.length > 0 && !isLoading && (
              <div className="flex flex-wrap gap-2 pt-2">
                {suggestions.map((suggestion) => (
                  <motion.button
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-3 py-1.5 rounded-full text-sm font-medium bg-white border border-[#D4A857]/30 text-[#4A6741] hover:bg-[#D4A857]/10 hover:border-[#D4A857] transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    {suggestion.text}
                  </motion.button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="p-4 border-t"
            style={{ borderColor: 'rgba(212, 180, 131, 0.2)' }}
          >
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nachricht eingeben..."
                className="flex-1 px-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4A857]/50 focus:border-[#D4A857] text-sm transition-all"
                disabled={isLoading}
              />
              <motion.button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4A6741] to-[#5D7C54] text-white flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!isLoading && input.trim() ? { scale: 1.05 } : {}}
                whileTap={!isLoading && input.trim() ? { scale: 0.95 } : {}}
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
