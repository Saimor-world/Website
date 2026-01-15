'use client';

import { Suspense } from 'react';
// Removed motion import
import { AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (errorType: string | null) => {
    switch (errorType) {
      case 'Verification':
        return {
          title: 'Verifizierung fehlgeschlagen',
          message: 'Der Anmeldelink ist ungültig oder abgelaufen. Bitte fordern Sie einen neuen Link an.',
        };
      case 'AccessDenied':
        return {
          title: 'Zugriff verweigert',
          message: 'Sie haben keinen Zugriff auf diese Anwendung.',
        };
      case 'Configuration':
        return {
          title: 'Konfigurationsfehler',
          message: 'Es liegt ein Problem mit der Authentifizierungskonfiguration vor.',
        };
      default:
        return {
          title: 'Anmeldefehler',
          message: 'Bei der Anmeldung ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es erneut.',
        };
    }
  };

  const errorInfo = getErrorMessage(error);

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
          className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto"
        >
          <AlertCircle className="w-10 h-10 text-white" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/70 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl"
        >
          <h1 className="text-3xl font-serif text-slate-800 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {errorInfo.title}
          </h1>

          <div className="space-y-4 text-slate-600">
            <p>{errorInfo.message}</p>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm">
                <p className="text-red-800">
                  <strong>Fehlercode:</strong> {error}
                </p>
              </div>
            )}
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
            Erneut versuchen
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

          <p className="text-xs text-slate-500">
            Problem weiterhin vorhanden?{' '}
            <Link href="/de/kontakt" className="text-yellow-600 hover:underline">
              Kontaktieren Sie uns
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500"></div>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  );
}