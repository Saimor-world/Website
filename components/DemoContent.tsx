import Link from 'next/link';
import { ArrowRight, Check, FileSearch, LayoutDashboard, ShieldCheck } from 'lucide-react';

export default function DemoContent() {
  const flow = [
    ['01', 'Prüfen', 'TLS, Mail-Schutz und Header', FileSearch],
    ['02', 'Einordnen', 'Befunde mit klarer Priorität', ShieldCheck],
    ['03', 'Bearbeiten', 'Ergebnis im Môra-Desk', LayoutDashboard],
  ] as const;
  return <>
    <section className="px-5 pb-16 pt-32 sm:px-7 md:pb-24 md:pt-40"><div className="mx-auto max-w-6xl">
      <p className="font-mono text-xs font-semibold tracking-[.22em] text-[#d6a848]">SAIMÔR OS / LIVE DEMO</p>
      <div className="mt-6 grid gap-10 lg:grid-cols-[.88fr_1.12fr] lg:items-end">
        <div><h1 className="font-serif text-[clamp(3.4rem,7vw,6.5rem)] leading-[.9] tracking-[-.04em] text-[#f3eee4]">Ein realer Check. Ein getrennter Arbeitsbereich.</h1><p className="mt-7 max-w-xl text-base leading-7 text-white/50">Die Demo prüft öffentlich erreichbare Domainsignale und führt die Ergebnisse in einen isolierten Môra-Arbeitsbereich. Ohne Konto und ohne Zugriff auf persönliche Daten.</p><Link href="/de/einstieg/security-check" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#f0ece3] px-6 py-3 text-sm font-bold text-[#0b1111]">Security Check starten<ArrowRight className="h-4 w-4" /></Link></div>
        <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0a1112]"><div className="border-b border-white/8 px-5 py-4 font-mono text-xs tracking-[.16em] text-white/36">DEMO-ABLAUF</div><div className="grid gap-px bg-white/8 sm:grid-cols-3">{flow.map(([step, title, body, Icon]) => <div key={step} className="bg-[#0a1112] p-5"><span className="font-mono text-xs text-[#d6a848]">{step}</span><Icon className="mt-8 h-5 w-5 text-[#78ceb7]" /><p className="mt-4 text-base font-semibold text-white/82">{title}</p><p className="mt-2 text-sm leading-6 text-white/38">{body}</p></div>)}</div></div>
      </div>
    </div></section>
    <section className="border-y border-white/8 bg-[#091415] px-5 py-14 sm:px-7 md:py-20"><div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-3">{['Getrennte Demo-Daten', 'Keine Registrierung', 'Keine Aktion ohne Freigabe'].map(item => <div key={item} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[.02] px-4 py-4 text-sm text-white/58"><Check className="h-4 w-4 text-[#78ceb7]" />{item}</div>)}</div></section>
    <section className="px-5 py-16 sm:px-7 md:py-24"><div className="mx-auto max-w-6xl rounded-[1.75rem] border border-[#d6a848]/18 bg-[#d6a848]/[.035] p-7 md:flex md:items-center md:justify-between md:p-10"><div><p className="font-mono text-xs tracking-[.18em] text-[#d6a848]">ZUGANG</p><h2 className="mt-4 font-serif text-3xl text-white/88">Der einzige öffentliche Einstieg führt über den Check.</h2></div><Link href="/de/einstieg/security-check" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#d6a848] px-6 py-3 text-sm font-bold text-[#17130b] md:mt-0">Demo öffnen<ArrowRight className="h-4 w-4" /></Link></div></section>
  </>;
}
