'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

type Props = { locale: 'de' | 'en' };

export default function ContactFormEnhanced({ locale }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    licht: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const t = (de: string, en: string) => (locale === 'de' ? de : en);

  const translations = {
    name: t('Name', 'Name'),
    email: t('E-Mail', 'Email'),
    message: t('Nachricht', 'Message'),
    send: t('Nachricht senden', 'Send message'),
    book: t('Lichtgespräch buchen', 'Book light conversation'),
    disclaimer: t('Alle Anfragen werden DSGVO-konform behandelt.', 'All inquiries are handled in compliance with GDPR.'),
    lichtgespräch: t('Interesse an einem kostenlosen Lichtgespräch', 'Interest in a free light conversation'),
    successMessage: t('Nachricht erfolgreich gesendet!', 'Message sent successfully!'),
    errorMessage: t('Fehler beim Senden. Bitte versuchen Sie es erneut.', 'Error sending message. Please try again.'),
    sending: t('Wird gesendet...', 'Sending...')
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '', licht: false });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="max-w-4xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6 mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          <input
            className="px-6 py-4 rounded-xl bg-white/[0.06] border border-white/20 text-[#F9F9F6] placeholder-[#F9F9F6]/50 focus:border-[#FFCE45]/60 focus:outline-none focus:ring-2 focus:ring-[#FFCE45]/20 transition-all duration-200"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder={translations.name}
            required
          />
          <input
            className="px-6 py-4 rounded-xl bg-white/[0.06] border border-white/20 text-[#F9F9F6] placeholder-[#F9F9F6]/50 focus:border-[#FFCE45]/60 focus:outline-none focus:ring-2 focus:ring-[#FFCE45]/20 transition-all duration-200"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder={translations.email}
            required
          />
        </div>

        <textarea
          className="w-full px-6 py-4 rounded-xl bg-white/[0.06] border border-white/20 text-[#F9F9F6] placeholder-[#F9F9F6]/50 focus:border-[#FFCE45]/60 focus:outline-none focus:ring-2 focus:ring-[#FFCE45]/20 transition-all duration-200 resize-none"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder={translations.message}
          rows={6}
          required
        />

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="licht"
            name="licht"
            checked={formData.licht}
            onChange={handleInputChange}
            className="w-5 h-5 rounded border border-white/20 bg-white/[0.06] text-[#FFCE45] focus:ring-[#FFCE45]/20 focus:ring-2"
          />
          <label htmlFor="licht" className="text-[#F9F9F6]/80 text-sm">
            {translations.lichtgespräch}
          </label>
        </div>

        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400"
          >
            {translations.successMessage}
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400"
          >
            {translations.errorMessage}
          </motion.div>
        )}
      </form>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={!isSubmitting ? { scale: 1.02 } : {}}
          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          onClick={handleSubmit}
          className="px-8 py-4 rounded-xl border-2 border-[#F9F9F6]/20 text-[#F9F9F6] font-semibold hover:border-[#FFCE45]/60 hover:text-[#FFCE45] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#FFCE45] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E1526] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? translations.sending : translations.send}
        </motion.button>

        <motion.a
          href={process.env.NEXT_PUBLIC_CAL_URL ?? 'https://cal.com/saimor/30min'}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-4 rounded-xl bg-[#FFCE45] text-[#0E1526] font-semibold hover:brightness-110 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#FFCE45] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E1526] text-center"
        >
          {translations.book}
        </motion.a>
      </div>

      <p className="text-sm text-[#F9F9F6]/60 leading-relaxed">
        {translations.disclaimer}
      </p>
    </motion.div>
  );
}