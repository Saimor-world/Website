'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import BrandSun from './BrandSun';

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
    <footer className="border-t border-gold bg-gradient-to-t from-navy via-navy-light to-navy">
      <div className="mx-auto max-w-7xl px-4 py-16 text-sm text-paper/70">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left: Legal Links */}
          <nav className="flex gap-6 order-2 md:order-1">
            <Link
              href={locale === 'de' ? '/de/rechtliches/impressum' : '/en/legal/imprint'}
              className="hover:text-gold transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold after:transition-all after:duration-200 hover:after:w-full"
            >
              {footerText.imprint}
            </Link>
            <Link
              href={locale === 'de' ? '/de/rechtliches/datenschutz' : '/en/legal/privacy'}
              className="hover:text-gold transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold after:transition-all after:duration-200 hover:after:w-full"
            >
              {footerText.privacy}
            </Link>
          </nav>

          {/* Center: Animated Brand Sun */}
          <motion.div
            className="order-1 md:order-2"
            animate={{ rotate: 360 }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <BrandSun className="w-8 h-8" />
          </motion.div>

          {/* Right: Made with Clarity */}
          <div className="order-3 text-right">
            <p className="text-paper/60">
              {footerText.made}
            </p>
            <p className="text-paper/80 font-medium">
              {footerText.year}
            </p>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="mt-12 pt-8 border-t border-paper/10 text-center">
          <p className="text-paper/50">
            © {new Date().getFullYear()} Saimôr. {footerText.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
