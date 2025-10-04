'use client';

import { motion } from 'framer-motion';
import { Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function VerifyRequestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center space-y-8"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto"
        >
          <Mail className="w-10 h-10 text-white" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/70 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl"
        >
          <h1 className="text-3xl font-serif text-slate-800 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            E-Mail gesendet
          </h1>

          <div className="space-y-4 text-slate-600">
            <p>
              Ein Anmeldelink wurde an Ihre E-Mail-Adresse gesendet.
            </p>

            <p>
              Bitte prüfen Sie Ihr Postfach und klicken Sie auf den Link, um sich anzumelden.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
              <p className="text-blue-800">
                <strong>Hinweis:</strong> Der Link ist 24 Stunden gültig. Prüfen Sie auch Ihren Spam-Ordner.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <Link
            href="/login"
            className="inline-block bg-yellow-500 text-slate-900 px-6 py-3 rounded-xl hover:bg-yellow-400 transition-colors"
          >
            Neue E-Mail anfordern
          </Link>

          <div>
            <Link
              href="/de"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Zurück zur Startseite
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}