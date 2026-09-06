import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import XrplCanaryCheckout from '@/components/XrplCanaryCheckout';

export const metadata = {
  title: 'XRP Canary Checkout · Saimôr',
  description: 'Saimôrs erster echter XRPL Produkt- und Zahlungsloop.',
};

export default function XrpCanaryPage() {
  return (
    <main className="min-h-screen bg-[#050908] px-5 py-8 text-white md:px-10 md:py-12">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 flex items-center justify-between gap-4">
          <Link href="/de" className="inline-flex items-center gap-2 text-xs text-white/38 transition hover:text-white/72">
            <ArrowLeft size={14} /> Saimôr
          </Link>
          <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-white/28">
            <ShieldCheck size={12} className="text-emerald-300/55" /> no keys on server
          </div>
        </header>

        <div className="mb-8 max-w-3xl">
          <div className="text-[10px] uppercase tracking-[0.26em] text-emerald-200/42">Saimôr · Capital Rail 001</div>
          <h1 className="mt-4 text-[clamp(2.7rem,8vw,6.5rem)] font-light leading-[0.9] tracking-[-0.065em] text-white/94">
            Revenue,
            <br />
            direkt im Ledger.
          </h1>
          <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-white/42 md:text-lg">
            Noch kein Shop-System. Noch kein Finance-Theater. Ein kleiner echter Kauf, der beweist, dass Saimôr Geld als Ereignis verstehen kann.
          </p>
        </div>

        <XrplCanaryCheckout />

        <div className="mt-6 grid gap-3 text-[10px] text-white/28 md:grid-cols-3">
          <div className="rounded-2xl border border-white/[0.05] bg-white/[0.015] p-4">Empfangsadresse kommt ausschließlich aus Server-Environment.</div>
          <div className="rounded-2xl border border-white/[0.05] bg-white/[0.015] p-4">Xaman erzeugt die Signatur. Saimôr erhält nie Seed oder Private Key.</div>
          <div className="rounded-2xl border border-white/[0.05] bg-white/[0.015] p-4">Freischaltung erfolgt erst nach validierter On-chain-Verifikation.</div>
        </div>
      </div>
    </main>
  );
}
