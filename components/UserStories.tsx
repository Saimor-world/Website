'use client';
import { motion } from 'framer-motion';
import { Building2, Factory, User } from 'lucide-react';

interface UserStoriesProps {
  locale: 'de' | 'en';
}

export default function UserStories({ locale }: UserStoriesProps) {
  const content = {
    de: {
      title: 'Klarheit für alle',
      subtitle: 'Von Kommunen bis Einzelpersonen – Wandel gemeinsam gestalten',
      stories: [
        {
          icon: Building2,
          title: 'Für Kommunen',
          challenge: 'Digitalisierung & Demografie',
          solution: 'Datenbasierte Entscheidungen, Bürgerbeteiligung und zukunftsfähige Strukturen entwickeln.',
          cta: 'Kommune beraten lassen'
        },
        {
          icon: Factory,
          title: 'Für KMU',
          challenge: 'Klare Datenlösungen',
          solution: 'DSGVO-konforme Dashboards, KI-Integration und verständliche Entscheidungsgrundlagen schaffen.',
          cta: 'Einblick erhalten'
        },
        {
          icon: User,
          title: 'Für Menschen',
          challenge: 'Orientierung & Stressprävention',
          solution: 'Klarheit in persönlichen Wandlungsprozessen, Work-Life-Balance und Selbstorganisation finden.',
          cta: 'Klarheitsgespräch starten'
        }
      ]
    },
    en: {
      title: 'Clarity for everyone',
      subtitle: 'From municipalities to individuals – shaping change together',
      stories: [
        {
          icon: Building2,
          title: 'For Municipalities',
          challenge: 'Digitalization & Demographics',
          solution: 'Develop data-driven decisions, citizen participation and future-ready structures.',
          cta: 'Get municipal advice'
        },
        {
          icon: Factory,
          title: 'For SMEs',
          challenge: 'Clear data solutions',
          solution: 'Create GDPR-compliant dashboards, AI integration and comprehensible decision-making foundations.',
          cta: 'Get insights'
        },
        {
          icon: User,
          title: 'For Individuals',
          challenge: 'Orientation & stress prevention',
          solution: 'Find clarity in personal transformation processes, work-life balance and self-organization.',
          cta: 'Start clarity conversation'
        }
      ]
    }
  }[locale];

  return (
    <section className="bg-bone py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl text-navy mb-6"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            {content.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-navy/80 max-w-3xl mx-auto"
          >
            {content.subtitle}
          </motion.p>
        </div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {content.stories.map((story, index) => (
            <motion.div
              key={story.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group bg-paper rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-navy/5"
            >
              {/* Icon */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-gold/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <story.icon className="w-8 h-8 text-gold" />
                </div>
              </div>

              {/* Content */}
              <h3 className="font-serif text-2xl text-navy mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {story.title}
              </h3>

              <h4 className="text-lg font-semibold text-navy/70 mb-4">
                {story.challenge}
              </h4>

              <p className="text-navy/60 leading-relaxed mb-8">
                {story.solution}
              </p>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-4 rounded-xl bg-navy text-paper font-medium hover:bg-navy-light transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
              >
                {story.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}