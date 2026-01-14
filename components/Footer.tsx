'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Footer({ locale }: { locale: 'de' | 'en' }) {
  const [year, setYear] = useState('2025');
  const router = useRouter();

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

  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const kontaktSection = document.getElementById('kontakt');
    if (kontaktSection) {
      kontaktSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If not on homepage, navigate there first
      router.push(`/${locale}#kontakt`);
    }
  };

  return (
    <footer className="relative py-24 border-t border-white/10 bg-[#081410] overflow-hidden">
      {/* Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full opacity-40" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          
          {/* Brand */}
          <div className="md:col-span-2 space-y-8">
            <Link href={`/${locale}`} className="flex items-center gap-4 group">
              <div className="w-11 h-11 rounded-xl bg-white shadow-lg flex items-center justify-center overflow-hidden group-hover:shadow-emerald-500/20 transition-shadow">
                <Image 
                  src="/saimor-logo-new.png"
                  alt="Saimôr"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-light tracking-tight text-white uppercase group-hover:text-emerald-400 transition-colors" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Saimôr</span>
            </Link>
            <p className="text-white/40 max-w-sm text-lg leading-relaxed">
              {footerText.tagline}
            </p>
          </div>

          {/* Nav */}
          <div className="space-y-6">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20">{footerText.quickLinks}</h3>
            <div className="flex flex-col gap-4">
              <Link href={`/${locale}`} className="text-white/50 hover:text-emerald-400 transition-colors cursor-pointer">{footerText.services}</Link>
              <Link href={locale === 'de' ? '/mora' : '/en/mora'} className="text-white/50 hover:text-emerald-400 transition-colors cursor-pointer">Môra</Link>
              <button onClick={handleScrollToContact} className="text-left text-white/50 hover:text-emerald-400 transition-colors cursor-pointer">{footerText.contact}</button>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20">{footerText.legal}</h3>
            <div className="flex flex-col gap-4">
              <Link href={locale === 'de' ? '/de/trust' : '/en/trust'} className="text-white/50 hover:text-emerald-400 transition-colors cursor-pointer">{footerText.trust}</Link>
              <Link href={locale === 'de' ? '/de/rechtliches/impressum' : '/en/legal/imprint'} className="text-white/50 hover:text-emerald-400 transition-colors cursor-pointer">{footerText.imprint}</Link>
              <Link href={locale === 'de' ? '/de/rechtliches/datenschutz' : '/en/legal/privacy'} className="text-white/50 hover:text-emerald-400 transition-colors cursor-pointer">{footerText.privacy}</Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-8">
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
