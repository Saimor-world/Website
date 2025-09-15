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
    <section className="bg-bone py-16 sm:py-24 md:py-40" role="region" aria-labelledby="user-stories-title">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-20 md:mb-24">
          <motion.h2
            id="user-stories-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-navy mb-6"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            {content.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-navy/80 max-w-3xl mx-auto"
          >
            {content.subtitle}
          </motion.p>
        </div>

        {/* Stories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {content.stories.map((story, index) => (
            <motion.div
              key={story.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{
                y: -12,
                rotateY: 2,
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 17 }
              }}
              className="group bg-paper rounded-2xl p-6 sm:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border border-navy/5 hover:border-gold/20"
            >
              {/* Icon */}
              <div className="mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-gold/25 to-gold/10 rounded-3xl flex items-center justify-center group-hover:scale-115 group-hover:rotate-3 transition-all duration-300 shadow-md">
                  <story.icon className="w-10 h-10 text-gold" />
                </div>
              </div>

              {/* Content */}
              <h3 className="font-serif text-xl sm:text-2xl text-navy mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {story.title}
              </h3>

              <h4 className="text-base sm:text-lg font-semibold text-navy/70 mb-4">
                {story.challenge}
              </h4>

              <p className="text-navy/60 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                {story.solution}
              </p>

              {/* CTA */}
              <motion.a
                href="https://cal.com/saimor/30min"
                target="_blank"
                rel="noreferrer"
                whileHover={{
                  scale: 1.03,
                  y: -2,
                  boxShadow: "0 8px 20px rgba(14, 21, 38, 0.3)"
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="block w-full px-8 py-5 rounded-2xl bg-gradient-to-br from-navy to-navy-light text-paper font-semibold hover:from-navy-light hover:to-navy transition-all duration-300 focus-visible:ring-4 focus-visible:ring-gold/50 focus-visible:ring-offset-2 shadow-lg text-center"
                aria-label={`${story.cta} for ${story.title} - Book via Cal.com (opens in new tab)`}
              >
                {story.cta}
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}