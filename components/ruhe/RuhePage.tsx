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
          <p className="arrival-claim">Klarheit im Wandel</p>
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
                alt="Studio Kontor Arbeitsplatz"
                width={800}
                height={500}
                className="section-img"
              />
            </div>
            <div className="studio-text-block">
              <span className="section-label">STUDIO</span>
              <h2 className="section-title font-serif">Systeme mit Haltung.</h2>
              <p className="section-paragraph">
                Wir klären den Zusammenhang deiner Arbeitsumgebung, bevor Software gebaut wird. 
                Gemeinsam schaffen wir ruhige Systeme, die Daten, Kommunikation und KI nahtlos verbinden 
                – verlässlich, nachvollziehbar und ohne Medienbrüche.
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
              <h2 className="section-title font-serif">Vier Domänen. Ein Universum.</h2>
              <p className="section-paragraph os-lead">
                Eine Arbeitsstation, die Organisationen in klaren Räumen verbindet: 
                R&D, Product, Growth und Intelligence.
              </p>
            </div>
            <div className="os-image-frame">
              <Image unoptimized
                src="/ruhe/os-universe.webp"
                alt="SAIMÔR OS Universum mit Planeten"
                width={1200}
                height={675}
                className="section-img os-preview-img"
              />
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
                  alt="YORI Haus im Morgennebel"
                  width={600}
                  height={400}
                  className="section-img"
                />
              </div>
              <div className="creation-info">
                <span className="section-label">CREATOR HOUSE</span>
                <h3 className="creation-title font-serif">YORI</h3>
                <p className="section-paragraph">
                  Das Backstage-Haus für Mentorinnen und Begleiterinnen. 
                  Echte Räume für Sitzungen, Notizen und Buchungen, ohne Formular-Hektik.
                </p>
                <a 
                  href="https://yori-raum.vercel.app/luana" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ruhe-text-link"
                >
                  YORI erkunden →
                </a>
              </div>
            </div>

            {/* ORIGIN // 001 */}
            <div className="creation-col">
              <div 
                className={`creation-media origin-interactive ${originZoom ? 'is-zoomed' : ''}`}
                onClick={() => setOriginZoom(!originZoom)}
                title="Klick zum Vergrößern"
              >
                <Image unoptimized
                  src="/ruhe/origin-001.webp"
                  alt="ORIGIN // 001 Quarz-Basalt-Relikt"
                  width={600}
                  height={400}
                  className="section-img origin-img"
                />
              </div>
              <div className="creation-info">
                <span className="section-label">DIGITAL ARTEFACT</span>
                <h3 className="creation-title font-serif">ORIGIN // 001</h3>
                <p className="section-paragraph">
                  Persistente architektonische Relikte: Basaltischer Stein, gewachsenes Quarz 
                  und verifizierte XRPL-Provenienz. 111 Unikate.
                </p>
                <button 
                  onClick={() => setOriginZoom(!originZoom)} 
                  className="ruhe-text-link origin-zoom-btn"
                >
                  {originZoom ? '← Verkleinern' : 'Artefakt betrachten →'}
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
          <span className="section-label">GESPRÄCH</span>
          <h2 className="contact-heading font-serif">Gute Systeme beginnen mit einer guten Frage.</h2>
          <p className="contact-sub">Was soll einfacher werden?</p>
          <div className="contact-action">
            <a href="mailto:hi@saimor.world" className="contact-email font-serif">
              hi@saimor.world
            </a>
          </div>

          <div className="ruhe-footer-bar">
            <span className="footer-brand">SAIMÔR</span>
            <div className="footer-legal">
              <Link href="/de/rechtliches/impressum" className="legal-link">
                Impressum
              </Link>
              <span className="legal-sep">·</span>
              <Link href="/de/rechtliches/datenschutz" className="legal-link">
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
