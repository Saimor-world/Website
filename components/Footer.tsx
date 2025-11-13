'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Footer({ locale }: { locale: 'de'|'en' }) {
  const [year, setYear] = useState('2025'); // Default to avoid hydration mismatch

  useEffect(() => {
    // Set actual year client-side only
    setYear(new Date().getFullYear().toString());
  }, []);

  const footerText = {
    de: {
      quickLinks: 'Navigation',
      services: 'Leistungen',
      mission: 'Mission',
      contact: 'Kontakt',
      legal: 'Rechtliches',
      trust: 'Trust & Sicherheit',
      portal: 'Portal (Demo)',
      imprint: 'Impressum',
      privacy: 'Datenschutz',
      connect: 'Verbinden',
      tagline: 'Klarheit im Wandel – Ein Ort für das, was bleibt.',
      made: 'Made with Klarheit',
      year: 'Saimôr 2025',
      copyright: 'Alle Rechte vorbehalten.'
    },
    en: {
      quickLinks: 'Quick Links',
      services: 'Services',
      mission: 'Mission',
      contact: 'Contact',
      legal: 'Legal',
      trust: 'Trust & Security',
      portal: 'Portal (demo)',
      imprint: 'Imprint',
      privacy: 'Privacy',
      connect: 'Connect',
      tagline: 'Clarity in transformation – A space for what remains.',
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

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(212, 180, 131, 0.6) 0%, transparent 70%)',
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 30}%`
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3
          }}
        />
      ))}

      <div className="relative mx-auto max-w-7xl px-4 py-20 z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className="w-12 h-12 rounded-full bg-gradient-to-br from-saimor-gold to-saimor-gold-light flex items-center justify-center text-saimor-green-dark font-bold text-xl shadow-lg"
                animate={{
                  rotate: 360,
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  rotate: { duration: 60, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                S
              </motion.div>
              <span className="font-serif text-2xl text-white tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                Saimôr
              </span>
            </div>
            <p className="text-white/70 text-base leading-relaxed mb-6 max-w-md" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
              {footerText.tagline}
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              <motion.a
                href="mailto:contact@saimor.world"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(212, 180, 131, 0.15) 100%)',
                  border: '1px solid rgba(212, 180, 131, 0.3)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Mail size={18} />
              </motion.a>
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-semibold text-white mb-6 text-base" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
              {footerText.quickLinks}
            </h3>
            <nav className="flex flex-col gap-2">
              <a
                href="#angebot"
                className="relative inline-flex min-h-[44px] items-center rounded-xl px-2 text-white/80 text-sm transition-colors duration-300 hover:text-saimor-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/40 after:absolute after:bottom-2 after:left-2 after:w-0 after:h-0.5 after:bg-saimor-gold after:transition-all after:duration-300 hover:after:w-[calc(100%-1rem)]"
              >
                {footerText.services}
              </a>
              <a
                href="#kontakt"
                className="relative inline-flex min-h-[44px] items-center rounded-xl px-2 text-white/80 text-sm transition-colors duration-300 hover:text-saimor-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/40 after:absolute after:bottom-2 after:left-2 after:w-0 after:h-0.5 after:bg-saimor-gold after:transition-all after:duration-300 hover:after:w-[calc(100%-1rem)]"
              >
                {footerText.contact}
              </a>
              <Link
                href={locale === 'de' ? '/portal' : '/en/portal'}
                className="relative inline-flex min-h-[44px] items-center rounded-xl px-2 text-white/80 text-sm transition-colors duration-300 hover:text-saimor-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/40 after:absolute after:bottom-2 after:left-2 after:w-0 after:h-0.5 after:bg-saimor-gold after:transition-all after:duration-300 hover:after:w-[calc(100%-1rem)]"
              >
                {footerText.portal}
              </Link>
            </nav>
          </motion.div>

          {/* Column 3: Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-semibold text-white mb-6 text-base" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
              {footerText.legal}
            </h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/trust"
                className="relative inline-flex min-h-[44px] items-center rounded-xl px-2 text-white/80 text-sm transition-colors duration-300 hover:text-saimor-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/40 after:absolute after:bottom-2 after:left-2 after:w-0 after:h-0.5 after:bg-saimor-gold after:transition-all after:duration-300 hover:after:w-[calc(100%-1rem)]"
              >
                {footerText.trust}
              </Link>
              <Link
                href="/legal"
                className="relative inline-flex min-h-[44px] items-center rounded-xl px-2 text-white/80 text-sm transition-colors duration-300 hover:text-saimor-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/40 after:absolute after:bottom-2 after:left-2 after:w-0 after:h-0.5 after:bg-saimor-gold after:transition-all after:duration-300 hover:after:w-[calc(100%-1rem)]"
              >
                {footerText.imprint} &nbsp;/&nbsp; {footerText.privacy}
              </Link>
            </nav>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'rgba(212, 180, 131, 0.2)' }}
        >
          <p className="text-white/60 text-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
            © {year} Saimôr. {footerText.copyright}
          </p>
          <div className="text-center md:text-right">
            <p className="text-white/50 text-sm">
              {footerText.made}
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
