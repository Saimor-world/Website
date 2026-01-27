'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Globe, Server } from 'lucide-react';
import { SecurityChecklistLeadMagnet } from './LeadMagnet';
import { ContactCTA } from './BusinessCTA';

const techItems = [
  { title: 'Datenerzeugung', desc: 'Vollständig lokal (Mock/Simulation)', icon: Server },
  { title: 'Verarbeitung', desc: 'Saimôr Core → Môra UI → Lokal im Browser', icon: Shield },
  { title: 'Tracking', desc: 'Keine Cookies, keine Profilbildung', icon: Lock },
  { title: 'Datenschutz', desc: 'EU-basiert, 100% DSGVO-konform', icon: Globe }
];

export default function TrustContent() {
  return (
    <div className="space-y-24">
      {/* Header */}
      <section className="space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-md">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-emerald-400/80">Trust Protocol</span>
        </div>
        
        <h1 className="text-5xl sm:text-7xl font-light tracking-tighter leading-[0.9]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          <span className="block opacity-90">Bewusst. Sicher.</span>
          <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-500">
            Nachvollziehbar.
          </span>
        </h1>
        
        <p className="text-xl text-white/40 leading-relaxed max-w-2xl">
          Saimôr befindet sich in der Prototyp-Phase. Transparenz ist unser wichtigstes Fundament. Alle Daten bleiben dort, wo sie hingehören: Bei dir.
        </p>
      </section>

      {/* Grid */}
      <section className="grid sm:grid-cols-2 gap-6">
        {techItems.map((item, i) => (
          <div key={i} className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl space-y-6 group hover:bg-white/[0.05] transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <item.icon className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">{item.title}</h3>
              <p className="text-white/40 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* DSGVO Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-10 rounded-[3rem] border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md"
      >
        <div className="flex flex-col sm:flex-row items-start gap-8">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <Shield className="w-8 h-8 text-emerald-400" />
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white uppercase tracking-widest">DSGVO Standard</h4>
            <p className="text-white/60 leading-relaxed italic">
              {
                '"In der Demo werden ausschließlich lokal generierte Daten verwendet. Es findet keine Übertragung an externe Server statt. Für zukünftige Produktivsysteme gilt unser Versprechen: Datensparsamkeit und EU-Hosting sind unverhandelbar."'
              }
            </p>
          </div>
        </div>
      </motion.section>

      {/* Security Certifications */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <div className="text-center">
          <h3 className="text-3xl font-semibold mb-4 text-white">Sicherheitsstandards</h3>
          <p className="text-white/70 max-w-2xl mx-auto">
            Wir setzen von Anfang an auf Enterprise-Level-Sicherheit und Transparenz.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'EU-Hosting',
              description: 'Alle Daten bleiben in der EU. Keine US-Clouds.',
              icon: '🇪🇺',
              status: 'Aktiv'
            },
            {
              title: 'Ende-zu-Ende Verschlüsselung',
              description: 'Alle Datenverbindungen sind verschlüsselt.',
              icon: '🔐',
              status: 'Geplant'
            },
            {
              title: 'Audit-Ready',
              description: 'Vollständige Protokollierung für Compliance.',
              icon: '📋',
              status: 'Geplant'
            }
          ].map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl">{cert.icon}</div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  cert.status === 'Aktiv'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {cert.status}
                </span>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-white">{cert.title}</h4>
              <p className="text-white/70 text-sm">{cert.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Trust Signals */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <div className="text-center">
          <h3 className="text-3xl font-semibold mb-4 text-white">Warum uns vertrauen?</h3>
          <p className="text-white/70 max-w-2xl mx-auto">
            Wir bauen keine Blackbox-Produkte. Jeder Aspekt unserer Arbeit ist nachvollziehbar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-white">Open Source Philosophy</h4>
            <p className="text-white/70">
              Soweit möglich setzen wir auf Open-Source-Technologien. Transparenz beginnt bei der Technologie-Auswahl.
            </p>

            <h4 className="text-xl font-semibold text-white">Privacy by Design</h4>
            <p className="text-white/70">
              Datenschutz ist kein Add-on, sondern integraler Bestandteil unserer Architektur.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-white">Audit-Trail</h4>
            <p className="text-white/70">
              {'Alle Änderungen sind dokumentiert und nachvollziehbar. Keine "magischen" Algorithmen.'}
            </p>

            <h4 className="text-xl font-semibold text-white">EU-First</h4>
            <p className="text-white/70">
              Wir sind ein EU-Unternehmen für EU-Unternehmen. Lokale Gesetze haben Priorität.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Lead Magnet Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-white">Kostenloser DSGVO-Leitfaden</h3>
          <p className="text-white/70">
            Sichere dir unsere umfassende Checkliste für DSGVO-Konformität im Unternehmen.
          </p>
        </div>
        <SecurityChecklistLeadMagnet />
      </motion.section>

      {/* Contact CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <ContactCTA />
      </motion.section>
    </div>
  );
}

