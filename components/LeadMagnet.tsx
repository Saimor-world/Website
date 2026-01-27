'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, Check, ArrowRight, X } from 'lucide-react';
import NewsletterSignup from './NewsletterSignup';

interface LeadMagnetProps {
  title: string;
  description: string;
  contentType: 'guide' | 'checklist' | 'template' | 'case-study' | 'whitepaper';
  downloadUrl?: string;
  variant?: 'inline' | 'modal';
  trigger?: React.ReactNode;
}

const contentIcons = {
  guide: '📖',
  checklist: '✅',
  template: '📋',
  'case-study': '📊',
  whitepaper: '📄'
};

const contentLabels = {
  guide: 'Guide',
  checklist: 'Checklist',
  template: 'Template',
  'case-study': 'Case Study',
  whitepaper: 'Whitepaper'
};

export default function LeadMagnet({
  title,
  description,
  contentType,
  downloadUrl,
  variant = 'inline',
  trigger
}: LeadMagnetProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleDownload = () => {
    if (variant === 'modal') {
      setIsModalOpen(true);
    } else {
      // Direct download or trigger signup
      setIsModalOpen(true);
    }
  };

  const handleEmailSubmit = () => {
    setEmailSubmitted(true);
    // Here you would typically trigger the download
    if (downloadUrl) {
      // Simulate download
      setTimeout(() => {
        window.open(downloadUrl, '_blank');
      }, 1000);
    }
  };

  if (variant === 'modal') {
    return (
      <>
        {/* Trigger */}
        {trigger ? (
          <div onClick={() => setIsModalOpen(true)}>
            {trigger}
          </div>
        ) : (
          <motion.button
            onClick={() => setIsModalOpen(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
          >
            <Download className="w-5 h-5" />
            <span>Download</span>
          </motion.button>
        )}

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 z-[10002] bg-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
              />

              {/* Modal Content */}
              <motion.div
                className="fixed top-1/2 left-1/2 z-[10003] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 px-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <div
                  className="relative rounded-3xl p-8 shadow-2xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(8, 20, 16, 0.98) 0%, rgba(16, 32, 24, 0.95) 100%)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(16, 185, 129, 0.1)',
                  }}
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Content */}
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl mb-4">{contentIcons[contentType]}</div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-medium mb-4">
                        <FileText className="w-4 h-4" />
                        {contentLabels[contentType]}
                      </div>
                      <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
                      <p className="text-white/70 mb-6">{description}</p>
                    </div>

                    <AnimatePresence mode="wait">
                      {emailSubmitted ? (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-center space-y-4 py-4"
                        >
                          <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto">
                            <Check className="w-8 h-8 text-emerald-400" />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-2">Download wird vorbereitet...</h4>
                            <p className="text-white/70 text-sm">
                              Du erhältst den Download-Link per Email. Prüfe auch deinen Spam-Ordner.
                            </p>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-4"
                        >
                          <div className="bg-white/5 rounded-xl p-4">
                            <h4 className="font-semibold text-white mb-2">Was du erhältst:</h4>
                            <ul className="space-y-2 text-sm text-white/80">
                              <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-emerald-400" />
                                Vollständiger {contentLabels[contentType].toLowerCase()}
                              </li>
                              <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-emerald-400" />
                                Praktische Vorlagen & Beispiele
                              </li>
                              <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-emerald-400" />
                                Kostenloser Newsletter-Zugang
                              </li>
                            </ul>
                          </div>

                          <NewsletterSignup
                            variant="inline"
                            onClose={() => {
                              setEmailSubmitted(true);
                              handleEmailSubmit();
                            }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Inline variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
    >
      <div className="flex items-start gap-4">
        <div className="text-3xl flex-shrink-0">{contentIcons[contentType]}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs uppercase tracking-wider text-emerald-400 font-medium">
              {contentLabels[contentType]}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
          <p className="text-white/70 text-sm mb-4">{description}</p>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 hover:text-emerald-200 transition-all text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Pre-configured lead magnets
export function SecurityChecklistLeadMagnet() {
  return (
    <LeadMagnet
      title="DSGVO-Checkliste für SaaS-Unternehmen"
      description="Vollständige Checkliste zur DSGVO-Konformität. 50+ Punkte für Datenschutz, Sicherheit und Compliance."
      contentType="checklist"
      variant="modal"
      trigger={
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
        >
          <FileText className="w-5 h-5" />
          <span>DSGVO-Checkliste downloaden</span>
        </motion.button>
      }
    />
  );
}

export function TransformationGuideLeadMagnet() {
  return (
    <LeadMagnet
      title="Digitale Transformation Guide 2025"
      description="Umfassender Leitfaden für die digitale Transformation. Mit Praxisbeispielen und Implementierungsstrategien."
      contentType="guide"
      variant="modal"
      trigger={
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-all"
        >
          <FileText className="w-5 h-5" />
          <span>Transformation Guide</span>
        </motion.button>
      }
    />
  );
}

