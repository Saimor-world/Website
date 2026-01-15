import { Metadata } from 'next';
import { AlertCircle, Shield } from 'lucide-react';
// Removed motion import

export const metadata: Metadata = {
  title: 'Impressum & Datenschutz – Saimôr',
  description: 'Rechtliche Informationen – Vorabversion',
};

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-[#081410] text-white pt-32 pb-24 selection:bg-emerald-500/30">
      
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-900/10 blur-[150px] rounded-full" />
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-6">
        
        {/* Warning Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 p-8 rounded-[2.5rem] border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md flex items-start gap-6"
        >
          <AlertCircle className="w-8 h-8 text-emerald-400 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-bold text-white mb-2 uppercase tracking-widest">Vorabversion – Juristische Prüfung folgt</h2>
            <p className="text-white/60 leading-relaxed">
              Diese Seite befindet sich in Bearbeitung. Die rechtlich verbindlichen Dokumente werden vor dem offiziellen Launch finalisiert.
            </p>
          </div>
        </motion.div>

        {/* Title */}
        <section className="mb-24 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-md">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-emerald-400/80">Legal Protocol</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-light tracking-tighter leading-[0.9]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            <span className="block opacity-90">Impressum &</span>
            <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-500">
              Datenschutz.
            </span>
          </h1>
        </section>

        {/* Content */}
        <div className="space-y-24 text-white/60">
          
          {/* Impressum */}
          <section className="space-y-8">
            <h2 className="text-3xl font-light text-white tracking-tight italic" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Impressum</h2>
            <div className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl space-y-6">
              <p><strong className="text-white">Angaben gemäß § 5 TMG:</strong></p>
              <p>Saimôr<br />[Firmenname wird ergänzt]<br />[Adresse wird ergänzt]<br />Deutschland</p>
              <p><strong className="text-white">Kontakt:</strong><br />E-Mail: contact@saimor.world</p>
            </div>
          </section>

          {/* Datenschutz */}
          <section className="space-y-12">
            <h2 className="text-3xl font-light text-white tracking-tight italic" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Datenschutzerklärung</h2>
            
            <div className="space-y-8">
              <div className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl space-y-4">
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">1. Allgemeines</h3>
                <p>Wir nehmen den schutz Ihrer Daten ernst. Diese Erklärung beschreibt, wie wir Daten erheben und verwenden – nämlich so sparsam wie möglich.</p>
              </div>

              <div className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl space-y-4">
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">2. Datenerfassung</h3>
                <p>Diese Website wird auf Vercel gehostet. Es werden nur technisch notwendige Logs gespeichert. Wir setzen keine Marketing-Cookies ein.</p>
              </div>
            </div>
          </section>

        </div>

        {/* Footer info */}
        <div className="mt-24 pt-12 border-t border-white/5 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20">Stand: Januar 2026 · Version 1.0.4</p>
        </div>

      </main>
    </div>
  );
}
