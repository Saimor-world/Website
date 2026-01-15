'use client';

import { motion } from 'framer-motion';
import { Shield, Award, CheckCircle, Sparkles, Code } from 'lucide-react';

const coreValues = [
  {
    title: "100% DSGVO-konform",
    description: "Alle Daten bleiben in der EU. Keine Drittanbieter-Cookies, kein Tracking von persönlichen Daten.",
    icon: <Shield className="w-8 h-8 text-emerald-400" />
  },
  {
    title: "Open Source Philosophy",
    description: "Wir entwickeln Saimôr transparent. Transparenz beginnt bei der Technologie-Auswahl.",
    icon: <Code className="w-8 h-8 text-emerald-400" />
  },
  {
    title: "Privacy by Design",
    description: "Datenschutz ist kein Add-on, sondern integraler Bestandteil unserer Architektur von Anfang an.",
    icon: <CheckCircle className="w-8 h-8 text-emerald-400" />
  }
];

export default function SocialProof() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#081410] via-[#0a1612] to-[#081410]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light mb-6"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Unser Versprechen
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/70 max-w-3xl mx-auto"
          >
            Saimôr befindet sich im Aufbau. Wir setzen auf ehrliche Kommunikation, höchste Standards und Transparenz.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {coreValues.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                {value.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">{value.title}</h3>
              <p className="text-white/60 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span className="text-emerald-300 font-medium">In aktiver Entwicklung • Early Access möglich</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
