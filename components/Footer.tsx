'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Footer({ locale }: { locale: 'de' | 'en' }) {
  const [year, setYear] = useState('2025');

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  const footerText = {
    de: {
      quickLinks: 'Navigation',
      services: 'Leistungen',
      contact: 'Kontakt',
      legal: 'Rechtliches',
      trust: 'Sicherheit',
      portal: 'Portal Demo',
      imprint: 'Impressum',
      privacy: 'Datenschutz',
      tagline: 'Klarheit im Wandel. Saimôr ist das Ökosystem für bewusste Organisationen.',
      made: 'System Status: Active',
      copyright: 'Alle Rechte vorbehalten.'
    },
    en: {
      quickLinks: 'Navigation',
      services: 'Services',
      contact: 'Contact',
      legal: 'Legal',
      trust: 'Security',
      portal: 'Portal Demo',
      imprint: 'Imprint',
      privacy: 'Privacy',
      tagline: 'Clarity in change. Saimôr is the ecosystem for conscious organizations.',
      made: 'System Status: Active',
      copyright: 'All rights reserved.'
    }
  }[locale];

  return (
    <footer className="relative py-24 border-t border-white/10 bg-[#020504] overflow-hidden">
      {/* Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          
          {/* Brand */}
          <div className="md:col-span-2 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-2xl font-light tracking-tight text-white uppercase" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Saimôr</span>
            </div>
            <p className="text-white/40 max-w-sm text-lg leading-relaxed">
              {footerText.tagline}
            </p>
          </div>

          {/* Nav */}
          <div className="space-y-6">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20">{footerText.quickLinks}</h3>
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-white/40 hover:text-emerald-400 transition-colors">{footerText.services}</Link>
              <Link href="/mora" className="text-white/40 hover:text-emerald-400 transition-colors">Môra</Link>
              <Link href="/#kontakt" className="text-white/40 hover:text-emerald-400 transition-colors">{footerText.contact}</Link>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20">{footerText.legal}</h3>
            <div className="flex flex-col gap-4">
              <Link href="/trust" className="text-white/40 hover:text-emerald-400 transition-colors">{footerText.trust}</Link>
              <Link href="/legal" className="text-white/40 hover:text-emerald-400 transition-colors">{footerText.imprint}</Link>
              <Link href="/legal" className="text-white/40 hover:text-emerald-400 transition-colors">{footerText.privacy}</Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-12 border-t border-white/5 flex flex-col sm:row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/10">© {year} Saimôr</span>
            <span className="w-1 h-1 rounded-full bg-white/10" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/10">{footerText.copyright}</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] uppercase tracking-[0.2em] font-black text-emerald-500/60">{footerText.made}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
