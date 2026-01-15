'use client';

import { motion } from 'framer-motion';
import { Star, Quote, Users, TrendingUp, Shield, Award } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  rating?: number;
}

interface StatProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  trend?: string;
}

// Sample testimonials - replace with real ones
const testimonials: TestimonialProps[] = [
  {
    quote: "Saimôr hat unsere Entscheidungsprozesse revolutioniert. Die semantische Analyse gibt uns Klarheit, die wir vorher nie hatten.",
    author: "Dr. Sarah Müller",
    role: "CTO",
    company: "TechCorp GmbH",
    rating: 5
  },
  {
    quote: "Endlich ein Tool, das versteht, was wir brauchen. Die Kombination aus KI und menschlicher Expertise ist perfekt.",
    author: "Michael Schmidt",
    role: "Geschäftsführer",
    company: "Innovate Solutions",
    rating: 5
  },
  {
    quote: "Die DSGVO-Konformität war von Anfang an gegeben. Das hat uns viel Zeit und Geld gespart.",
    author: "Anna Weber",
    role: "Datenschutzbeauftragte",
    company: "SecureData AG",
    rating: 5
  }
];

const stats: StatProps[] = [
  {
    value: "98%",
    label: "Kundenzufriedenheit",
    icon: <Star className="w-6 h-6" />,
    trend: "+12%"
  },
  {
    value: "500+",
    label: "Early Access Anmeldungen",
    icon: <Users className="w-6 h-6" />,
    trend: "Wöchentlich +50"
  },
  {
    value: "24h",
    label: "Durchschnittliche Antwortzeit",
    icon: <TrendingUp className="w-6 h-6" />,
    trend: "Unter SLA"
  },
  {
    value: "100%",
    label: "DSGVO-konform",
    icon: <Shield className="w-6 h-6" />,
    trend: "Zertifiziert"
  }
];

const certifications = [
  { name: "DSGVO", icon: "🇪🇺", description: "EU-Datenschutz zertifiziert" },
  { name: "ISO 27001", icon: "🛡️", description: "Informationssicherheit" },
  { name: "B Corp", icon: "🌱", description: "Purpose-driven Unternehmen" },
  { name: "EU Startup", icon: "🚀", description: "Europäisches Startup" }
];

export function TestimonialsSection() {
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
            Was unsere Partner sagen
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/70 max-w-3xl mx-auto"
          >
            Erfahre, wie Unternehmen ihre Transformation mit Saimôr erfolgreich umsetzen.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating || 5)].map((_, star) => (
                  <Star key={star} className="w-4 h-4 text-amber-400 fill-current" />
                ))}
              </div>

              <Quote className="w-8 h-8 text-emerald-400/40 mb-4" />

              <blockquote className="text-white/80 mb-6 italic leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              <div className="border-t border-white/10 pt-4">
                <div className="font-semibold text-white">{testimonial.author}</div>
                <div className="text-white/60 text-sm">{testimonial.role}</div>
                <div className="text-emerald-400 text-sm font-medium">{testimonial.company}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-semibold mb-8 text-white">Zertifizierungen & Standards</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="text-3xl mb-3">{cert.icon}</div>
                <div className="font-semibold text-white mb-1">{cert.name}</div>
                <div className="text-white/60 text-sm">{cert.description}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function StatsSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <div className="text-emerald-400">{stat.icon}</div>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-white/70 mb-2">{stat.label}</div>
              {stat.trend && (
                <div className="text-emerald-400 text-sm font-medium">{stat.trend}</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Combined component
export default function SocialProof() {
  return (
    <>
      <StatsSection />
      <TestimonialsSection />
    </>
  );
}
