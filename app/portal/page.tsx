import Link from 'next/link';
import { Terminal, Shield, HardDrive } from 'lucide-react';

export const metadata = {
  title: 'Saimôr OS · Gateway',
  description: 'Verbindungspunkt zur lokalen Saimôr-Installation.'
};

export default function PortalPage() {
  return (
    <div className="min-h-screen bg-[#0B0F10] text-[#EAEAEA] flex flex-col items-center justify-center relative overflow-hidden font-mono">
      {/* Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(212, 168, 87, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 168, 87, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4A857] rounded-full opacity-5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl w-full p-8 border border-[#333] bg-[#0B0F10]/90 backdrop-blur-xl rounded-xl shadow-2xl">
        <div className="flex items-center gap-4 mb-8 border-b border-[#333] pb-6">
          <div className="w-12 h-12 rounded-full bg-[#1A3C32] flex items-center justify-center border border-[#2A5A4A]">
            <Terminal className="w-6 h-6 text-[#D4A857]" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider uppercase text-[#D4A857]">Saimôr OS Gateway</h1>
            <p className="text-sm text-[#888]">v2.6.4 · Secure Connection</p>
          </div>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-[#CCC]">
          <p>
            <strong className="text-white">Status:</strong> Warte auf lokale Instanz...
          </p>
          <div className="p-4 bg-black/50 rounded border border-[#222] font-mono text-xs">
            <span className="text-[#4A6741]">✔</span> Protocol: HTTPS/WSS<br />
            <span className="text-[#4A6741]">✔</span> Handshake: Ready<br />
            <span className="animate-pulse text-[#D4A857]">➜</span> Target: <span className="text-white">C:/saimor/core/auth_pipe.exe</span>
          </div>
          <p>
            Dieses Portal dient als sichere Brücke zu deiner lokalen Saimôr-Installation.
            Die Login-Logik wird direkt vom Betriebssystem (OS) verarbeitet, um maximale Datensouveränität zu gewährleisten.
          </p>

          <div className="flex gap-4 pt-4">
            <div className="flex items-center gap-2 text-xs text-[#666]">
              <HardDrive className="w-4 h-4" />
              <span>Local Only</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#666]">
              <Shield className="w-4 h-4" />
              <span>End-to-End Encrypted</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#333] flex justify-between items-center">
          <Link href="/" className="text-xs text-[#666] hover:text-white transition-colors">
            &lt; Abbrechen / Zurück
          </Link>
          <button className="px-6 py-2 bg-[#D4A857] text-black font-bold text-sm rounded hover:bg-[#E6C897] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            Verbindung herstellen
          </button>
        </div>
      </div>
    </div>
  );
}
