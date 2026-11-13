'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './ruhe.css';

interface RuhePageProps {
  locale?: 'de' | 'en';
}

export default function RuhePage({ locale = 'de' }: RuhePageProps) {
  const [originZoom, setOriginZoom] = useState(false);
  const L = (de: string, en: string) => locale === 'en' ? en : de;

  return (
    <div className="ruhe-container">
      {/* ========================================================= */}
      {/* 1. ABSCHNITT: ANKUNFT (GANZER BILDSCHIRM 100vh)          */}
      {/* ========================================================= */}
      <section className="ruhe-section section-arrival">
        <div 
          className="arrival-bg" 
          style={{ backgroundImage: "url('/ruhe/arrival-scene.webp')" }} 
        />
        <div className="arrival-mist-layer" />

        {/* Fliegende MÔRA: Ruhiger Flug beim Ankommen, danach still */}
        <div className="mora-flight-track" aria-hidden="true">
          <div className="mora-flight-actor">
            <Image unoptimized
              src="/ruhe/jade-mora.webp"
              alt="MÔRA"
              width={110}
              height={140}
              priority
              className="mora-jade-actor"
            />
          </div>
        </div>

        {/* Reiner Titel & Claim: Keine Buttons, kein Textschwall */}
        <div className="arrival-content">
          <h1 className="arrival-title font-serif">SAIMÔR</h1>
          <p className="arrival-claim">{L('Klarheit im Wandel', 'Clarity through change')}</p>
        </div>

        <div className="arrival-scroll-indicator" aria-hidden="true">
          <span className="scroll-line" />
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. ABSCHNITT: STUDIO                                     */}
      {/* ========================================================= */}
      <section className="ruhe-section section-studio" id="studio">
        <div className="section-inner max-w-5xl">
          <div className="studio-grid">
            <div className="studio-image-frame">
              <Image unoptimized
                src="/ruhe/studio-kontor.webp"
                alt={L('Studio Kontor Arbeitsplatz', 'Studio workspace')}
                width={800}
                height={500}
                className="section-img"
              />
            </div>
            <div className="studio-text-block">
              <span className="section-label">STUDIO</span>
              <h2 className="section-title font-serif">{L('Systeme mit Haltung.', 'Systems with purpose.')}</h2>
              <p className="section-paragraph">
                {L('Wir klären den Zusammenhang deiner Arbeitsumgebung, bevor Software gebaut wird. Gemeinsam schaffen wir ruhige Systeme, die Daten, Kommunikation und KI verbinden – verlässlich und nachvollziehbar.',
                  'We understand your working environment before building software. Together, we create calm systems that connect data, communication and AI with clarity and accountability.')}
              </p>
              <div className="studio-contact-line">
                <a href="mailto:hi@saimor.world" className="ruhe-text-link">
                  hi@saimor.world →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. ABSCHNITT: SAIMÔR OS                                  */}
      {/* ========================================================= */}
      <section className="ruhe-section section-os" id="os">
        <div className="section-inner max-w-5xl">
          <div className="os-block">
            <div className="os-text-center">
              <span className="section-label">SAIMÔR OS</span>
              <h2 className="section-title font-serif">{L('Deine Arbeit. Ein Universum.', 'Your work. One universe.')}</h2>
              <p className="section-paragraph os-lead">
                {L('Ein räumlicher Arbeitsplatz für Aufgaben, Wissen und Zusammenarbeit. MÔRA hält den Kontext und schlägt nächste Schritte vor. Du entscheidest.',
                  'A spatial workspace for tasks, knowledge and collaboration. MÔRA keeps the context and suggests next steps. You decide.')}
              </p>
            </div>
            <div className="os-image-frame">
              <Image unoptimized
                src="/ruhe/os-universe.webp"
                alt={L('SAIMÔR OS Universum mit Planeten', 'SAIMÔR OS universe with planets')}
                width={1200}
                height={675}
                className="section-img os-preview-img"
              />
            </div>
            <p className="ruhe-preview-label">{L('Produktvorschau', 'Product preview')}</p>
            <div className="ruhe-entry-links">
              <Link href={locale === 'en' ? '/en/mora/deep-view' : '/mora/deep-view'} className="ruhe-text-link">{L('MÔRA entdecken →', 'Discover MÔRA →')}</Link>
              <Link href={locale === 'en' ? '/en/entry/security-check' : '/de/einstieg/security-check'} className="ruhe-text-link">Security Check →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. ABSCHNITT: YORI & ORIGIN (NEBENEINANDER)              */}
      {/* ========================================================= */}
      <section className="ruhe-section section-creations" id="welten">
        <div className="section-inner max-w-5xl">
          <div className="creations-grid">
            
            {/* YORI */}
            <div className="creation-col">
              <div className="creation-media">
                <Image unoptimized
                  src="/ruhe/yori-house.webp"
                  alt={L('YORI Haus im Morgennebel', 'YORI house in the morning mist')}
                  width={600}
                  height={400}
                  className="section-img"
                />
              </div>
              <div className="creation-info">
                <span className="section-label">CREATOR HOUSE</span>
                <h3 className="creation-title font-serif">YORI</h3>
                <p className="section-paragraph">
                  {L('Ein Creative House für Mentorinnen und Begleiterinnen. Die Hausvorschau zeigt Räume für Sitzungen, Notizen und die eigene Arbeit.',
                    'A Creative House for mentors and guides. The house preview explores rooms for sessions, notes and your own work.')}
                </p>
                <a 
                  href={locale === 'en' ? '/en/yori' : '/yori'}
                  className="ruhe-text-link"
                >
                  {L('YORI erkunden →', 'Explore YORI →')}
                </a>
              </div>
            </div>

            {/* ORIGIN // 001 */}
            <div className="creation-col">
              <button type="button"
                className={`creation-media origin-interactive ${originZoom ? 'is-zoomed' : ''}`}
                onClick={() => setOriginZoom(zoom => !zoom)}
                aria-pressed={originZoom}
                aria-label={originZoom ? L('ORIGIN verkleinern', 'Zoom out of ORIGIN') : L('ORIGIN vergrößern', 'Zoom into ORIGIN')}
              >
                <Image unoptimized
                  src="/ruhe/origin-001.webp"
                  alt={L('ORIGIN // 001 Quarz-Basalt-Relikt', 'ORIGIN // 001 quartz and basalt study')}
                  width={600}
                  height={400}
                  className="section-img origin-img"
                />
              </button>
              <div className="creation-info">
                <span className="section-label">DIGITAL ARTEFACT</span>
                <h3 className="creation-title font-serif">ORIGIN // 001</h3>
                <p className="section-paragraph">
                  {L('Ein architektonisches Relikt aus Basalt, Quarz und Metall. Geplante Edition: 111 Artefakte. ORIGIN // 001 ist die erste Studie.',
                    'An architectural relic of basalt, quartz and metal. Planned edition: 111 artefacts. ORIGIN // 001 is the first study.')}
                </p>
                <button 
                  type="button"
                  onClick={() => setOriginZoom(zoom => !zoom)}
                  aria-expanded={originZoom}
                  className="ruhe-text-link origin-zoom-btn"
                >
                  {originZoom ? L('← Verkleinern', '← Zoom out') : L('Artefakt betrachten →', 'View the artefact →')}
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. ABSCHNITT: KONTAKT + IMPRESSUM / DATENSCHUTZ          */}
      {/* ========================================================= */}
      <footer className="ruhe-section section-contact">
        <div className="section-inner max-w-4xl text-center">
          <span className="section-label">{L('GESPRÄCH', 'CONVERSATION')}</span>
          <h2 className="contact-heading font-serif">{L('Gute Systeme beginnen mit einer guten Frage.', 'Good systems start with a good question.')}</h2>
          <p className="contact-sub">{L('Was soll einfacher werden?', 'What should become simpler?')}</p>
          <div className="contact-action">
            <a href="mailto:hi@saimor.world" className="contact-email font-serif">
              hi@saimor.world
            </a>
          </div>

          <div className="ruhe-footer-bar">
            <span className="footer-brand">SAIMÔR</span>
            <div className="footer-legal">
              <Link href="/login" className="legal-link">{L('Zugang', 'Sign in')}</Link>
              <Link href={locale === 'en' ? '/de' : '/en'} className="legal-link" hrefLang={locale === 'en' ? 'de' : 'en'}>{L('English', 'Deutsch')}</Link>
              <Link href={`/${locale}/${locale === 'en' ? 'legal/imprint' : 'rechtliches/impressum'}`} className="legal-link">
                {L('Impressum', 'Imprint')}
              </Link>
              <span className="legal-sep">·</span>
              <Link href={`/${locale}/${locale === 'en' ? 'legal/privacy' : 'rechtliches/datenschutz'}`} className="legal-link">
                {L('Datenschutz', 'Privacy')}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
