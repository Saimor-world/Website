import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import NewsletterSignup from '@/components/NewsletterSignup';
import Link from 'next/link';

export const metadata = {
  title: 'Kontakt & Beratung – Saimôr',
  description: 'Kostenloses Erstgespräch buchen. Professionelle Beratung für Transformation & digitale Klarheit. Wir antworten innerhalb 24h.',
};

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#081410] via-[#0a1612] to-[#081410] text-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/8 blur-[100px] rounded-full" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center space-y-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20"
            >
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-300">24h Antwortzeit garantiert</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-light"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Lass uns
              <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-500">
                sprechen
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
            >
              Ein kostenloses Erstgespräch über deine Herausforderungen. Kein Pitch, nur ehrliche Beratung
              für Transformation und digitale Klarheit.
            </motion.p>

            {/* Quick CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="https://cal.com/saimor/30min"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
              >
                <span>30-Minuten Gespräch buchen</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <span className="text-sm text-white/50 self-center">oder direkt unten schreiben</span>
            </motion.div>
          </div>

          {/* Trust Elements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-3 gap-8 mb-20"
          >
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="font-semibold text-white">Schnell</h3>
              <p className="text-sm text-white/60">Innerhalb 24h Antwort</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="font-semibold text-white">Kostenlos</h3>
              <p className="text-sm text-white/60">Erstgespräch ohne Verpflichtung</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mx-auto">
                <MapPin className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="font-semibold text-white">Remote</h3>
              <p className="text-sm text-white/60">EU-basiert, sicher & DSGVO-konform</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Info Side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-semibold mb-4 text-white">Warum wir?</h2>
                <p className="text-white/70 leading-relaxed">
                  Wir sind keine typische Beratung. Wir bauen Systeme, die wirklich funktionieren.
                  Unser Fokus liegt auf nachhaltiger Transformation, nicht auf kurzfristigen Projekten.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Mail className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Direkter Kontakt</h3>
                    <p className="text-white/60 text-sm">contact@saimor.world</p>
                    <p className="text-white/50 text-xs mt-1">Für alle Anfragen und Fragen</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Verfügbarkeit</h3>
                    <p className="text-white/60 text-sm">Montag - Freitag, 9:00 - 17:00 CET</p>
                    <p className="text-white/50 text-xs mt-1">Schnelle Reaktionszeit garantiert</p>
                  </div>
                </div>
              </div>

              {/* FAQ Preview */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Häufige Fragen</h3>
                <div className="space-y-3">
                  <div className="border border-white/10 rounded-lg p-4">
                    <h4 className="font-medium text-white mb-2">Wie läuft das Erstgespräch ab?</h4>
                    <p className="text-white/60 text-sm">30 Minuten unverbindlich. Wir hören zu, analysieren deine Situation und besprechen mögliche Lösungswege.</p>
                  </div>
                  <div className="border border-white/10 rounded-lg p-4">
                    <h4 className="font-medium text-white mb-2">Was kostet die Beratung?</h4>
                    <p className="text-white/60 text-sm">Das Erstgespräch ist kostenlos. Anschließende Zusammenarbeit nach individueller Vereinbarung.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form Side */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl font-semibold mb-2 text-white">Schreib uns</h2>
                <p className="text-white/70">Oder buche direkt einen Termin – wie du möchtest.</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <ContactForm locale="de" />
              </div>

              <div className="text-center">
                <p className="text-white/50 text-sm">
                  Deine Daten sind sicher. Wir nutzen sie nur für diese Anfrage.
                  <Link href="/de/rechtliches/datenschutz" className="text-emerald-400 hover:text-emerald-300 ml-1">
                    Datenschutz
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-white">
              Mehr als nur ein Newsletter
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Erhalte exklusive Einblicke in unsere Entwicklung, Early Access zu neuen Features
              und direkten Kontakt zu unserem Team.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold text-white">Was du erhältst:</h3>
              <div className="space-y-4">
                {[
                  '🚀 Early Access zu neuen Features',
                  '📊 Einblicke in unsere Produktentwicklung',
                  '🤝 Direkter Kontakt zum Team',
                  '📈 Business-Updates und Marktanalysen',
                  '🔒 Sicherheitshinweise und Best Practices'
                ].map((benefit, i) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-white/80">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <NewsletterSignup />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
