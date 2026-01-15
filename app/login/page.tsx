'use client';

import { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
// Removed motion import
import { Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessage('Bitte geben Sie eine E-Mail-Adresse ein.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const result = await signIn('email', {
        email,
        redirect: false,
      });

      if (result?.error) {
        setMessage('Fehler beim Versenden der E-Mail. Bitte versuchen Sie es erneut.');
      } else {
        setMessage('Ein Anmeldelink wurde an Ihre E-Mail-Adresse gesendet. Bitte prüfen Sie Ihr Postfach.');
      }
    } catch (error) {
      setMessage('Ein unerwarteter Fehler ist aufgetreten.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-slate-900" />
          </motion.div>
          <h2 className="text-3xl font-serif text-slate-800" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Anmelden
          </h2>
          <p className="mt-2 text-slate-600">
            Erhalten Sie Zugang zu erweiterten Chat-Funktionen
          </p>
        </div>

        {/* Form */}
        <divdiv
          }
          }
          }
          className="bg-white/70 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                E-Mail-Adresse
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ihre@email.de"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                disabled={isLoading}
              />
            </div>

            <divbutton
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-slate-900 font-semibold py-3 px-6 rounded-xl hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Wird gesendet...' : 'Anmeldelink senden'}
            </button>

            {message && (
              <divdiv
                }
                }
                className={`p-4 rounded-xl text-sm ${
                  message.includes('gesendet')
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                {message}
              </motion.div>
            )}
          </form>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-xs text-slate-500 text-center">
              Mit der Anmeldung stimmen Sie unseren{' '}
              <Link href="/de/rechtliches/datenschutz" className="text-yellow-600 hover:underline">
                Datenschutzbestimmungen
              </Link>{' '}
              zu.
            </p>
          </div>
        </motion.div>

        {/* Back Link */}
        <divdiv
          }
          }
          }
          className="text-center"
        >
          <Link
            href="/de"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Startseite
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
