'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer({ locale }: { locale: 'de'|'en' }) {
  const footerText = {
    de: {
      imprint: 'Impressum',
      privacy: 'Datenschutz',
      made: 'Made with Klarheit',
      year: 'Saimôr 2025',
      copyright: 'Alle Rechte vorbehalten.'
    },
    en: {
      imprint: 'Imprint',
      privacy: 'Privacy',
      made: 'Made with Clarity',
      year: 'Saimôr 2025',
      copyright: 'All rights reserved.'
    }
  }[locale];

  return (
    <footer
      className="border-t backdrop-blur-lg relative overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg,
            rgba(74, 103, 65, 0.95) 0%,
            rgba(93, 124, 84, 0.9) 25%,
            rgba(58, 82, 49, 0.95) 75%,
            rgba(74, 103, 65, 0.95) 100%
          )
        `,
        borderColor: 'rgba(212, 180, 131, 0.3)'
      }}
    >
      {/* Organic Background Elements */}
      <motion.div
        className="absolute inset-0 opacity-15"
        animate={{
          background: [
            'radial-gradient(ellipse 800px 400px at 30% 70%, rgba(212, 180, 131, 0.3) 0%, transparent 70%)',
            'radial-gradient(ellipse 800px 400px at 70% 30%, rgba(212, 180, 131, 0.3) 0%, transparent 70%)',
            'radial-gradient(ellipse 800px 400px at 50% 50%, rgba(212, 180, 131, 0.3) 0%, transparent 70%)',
            'radial-gradient(ellipse 800px 400px at 30% 70%, rgba(212, 180, 131, 0.3) 0%, transparent 70%)'
          ]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 text-sm text-white/80 z-10" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left: Legal Links */}
          <nav className="flex gap-6 order-2 md:order-1">
            <Link
              href={locale === 'de' ? '/de/rechtliches/impressum' : '/en/legal/imprint'}
              className="hover:text-saimor-gold-light transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-saimor-gold after:transition-all after:duration-300 hover:after:w-full"
            >
              {footerText.imprint}
            </Link>
            <Link
              href={locale === 'de' ? '/de/rechtliches/datenschutz' : '/en/legal/privacy'}
              className="hover:text-saimor-gold-light transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-saimor-gold after:transition-all after:duration-300 hover:after:w-full"
            >
              {footerText.privacy}
            </Link>
          </nav>

          {/* Center: Animated Brand Circle */}
          <motion.div
            className="order-1 md:order-2"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{
              rotate: { duration: 60, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-saimor-gold to-saimor-gold-light flex items-center justify-center text-saimor-green-dark font-bold text-lg shadow-lg">S</div>
          </motion.div>

          {/* Right: Made with Clarity */}
          <div className="order-3 text-right">
            <p className="text-white/60">
              {footerText.made}
            </p>
            <p className="text-white/90 font-medium">
              {footerText.year}
            </p>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="mt-12 pt-8 border-t text-center" style={{ borderColor: 'rgba(212, 180, 131, 0.2)' }}>
          <p className="text-white/60">
            © {new Date().getFullYear()} Saimôr. {footerText.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
