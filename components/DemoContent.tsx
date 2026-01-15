'use client';

import { motion } from 'framer-motion';
import { Play, Users, Shield, ArrowRight, CheckCircle, Zap } from 'lucide-react';
import Link from 'next/link';
import NewsletterSignup from './NewsletterSignup';

export default function DemoContent() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      {/* Hero Section */}
      <section className="relative mb-24 overflow-hidden">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20"
          >
            <Play className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-300">Interaktive Live-Demo</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-light"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Môra
            <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-500">
              live erleben
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
          >
            Entdecke das semantische Dashboard in Aktion. Sieh, wie Môra Daten analysiert,
            Muster erkennt und klare Entscheidungsgrundlagen liefert – alles in Echtzeit.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="#demo"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
            >
              <Play className="w-5 h-5" />
              <span>Demo jetzt starten</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/de/kontakt"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm text-white font-medium hover:bg-white/10 transition-all"
            >
              <span>Persönliche Demo buchen</span>
            </Link>
          </motion.div>
        </div>

        {/* Trust Elements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8 mt-20"
        >
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mx-auto">
              <Zap className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="font-semibold text-white">Live & Interaktiv</h3>
            <p className="text-sm text-white/60">Echte Daten, echte Analyse</p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mx-auto">
              <Shield className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="font-semibold text-white">Sicher & DSGVO</h3>
            <p className="text-sm text-white/60">EU-Hosting, verschlüsselt</p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mx-auto">
              <Users className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="font-semibold text-white">Für Unternehmen</h3>
            <p className="text-sm text-white/60">Professionelle Lösungen</p>
          </div>
        </motion.div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-24 border-t border-white/10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light mb-6"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Was du in der Demo siehst
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/70 max-w-3xl mx-auto"
          >
            Eine vollständige Môra-Installation mit simulierten Unternehmensdaten.
            Alle Funktionen sind aktiv und zeigen realistische Szenarien.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <Zap className="w-6 h-6" />,
              title: "Echtzeit-Analyse",
              description: "Sieh, wie Môra Daten in Echtzeit verarbeitet und Muster erkennt."
            },
            {
              icon: <CheckCircle className="w-6 h-6" />,
              title: "Semantische Insights",
              description: "Entdecke verborgene Zusammenhänge in deinen Unternehmensdaten."
            },
            {
              icon: <Users className="w-6 h-6" />,
              title: "Team-Kollaboration",
              description: "Wie Teams gemeinsam Entscheidungen treffen können."
            },
            {
              icon: <Shield className="w-6 h-6" />,
              title: "Enterprise Security",
              description: "Alle Daten bleiben lokal und verschlüsselt."
            },
            {
              icon: <ArrowRight className="w-6 h-6" />,
              title: "Intuitive Navigation",
              description: "Erkunde verschiedene Ansichten und Perspektiven."
            },
            {
              icon: <Play className="w-6 h-6" />,
              title: "Interaktive Elemente",
              description: "Teste alle Funktionen selbst aus."
            }
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
                <div className="text-emerald-400">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
              <p className="text-white/70 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Demo Panel Embed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-24"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold mb-2 text-white">Môra Live Demo</h3>
            <p className="text-white/60">Die interaktive Demo lädt gerade...</p>
          </div>
          <div className="aspect-video bg-white/5 rounded-2xl flex items-center justify-center">
            <div className="text-center space-y-4">
              <Play className="w-16 h-16 text-emerald-400 mx-auto" />
              <p className="text-white/70">Demo wird geladen...</p>
              <p className="text-sm text-white/50">
                Hier wird die vollständige Môra-Demo eingebettet, sobald alle Komponenten bereit sind.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-white">
              Erhalte Early Access
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Sei unter den Ersten, die das vollständige Môra-System in Aktion erleben.
              Wir informieren dich über Updates und geben dir Zugang zu exklusiven Features.
            </p>
          </div>
          <NewsletterSignup />
        </motion.div>
      </section>
    </div>
  );
}

