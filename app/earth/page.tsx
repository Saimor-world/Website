import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, History, Map, MapPin, QrCode } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Earth – Ortsgedächtnis von Saimôr',
  description: 'Earth verbindet Geschichten, Wissen und Veränderung mit realen Orten — als ruhige Karte und Zeitleiste statt als Social Feed.',
};

const points = [{ left: '18%', top: '28%', label: 'Erinnerung' }, { left: '56%', top: '18%', label: 'Wissen' }, { left: '72%', top: '58%', label: 'Veränderung' }, { left: '32%', top: '68%', label: 'Stimme' }];

export default function EarthPage() {
  return (
    <main className="min-h-screen bg-[#0b1513] px-6 pb-24 pt-32 text-white sm:pt-40">
      <div className="mx-auto max-w-6xl">
        <Link href="/de" className="inline-flex items-center gap-2 text-sm text-white/45 transition hover:text-white/80"><ArrowLeft className="h-4 w-4" />Zurück zu Saimôr</Link>
        <section className="mt-10 grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <div>
            <p className="font-mono text-[10px] font-bold tracking-[.3em] text-[#92c9a9]">EARTH · PRODUKTIDEE IM AUFBAU</p>
            <h1 className="mt-6 font-serif text-6xl font-light leading-[.95] tracking-[-.04em] sm:text-8xl">Orte erinnern sich.</h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/62">Earth ist ein dezentrales Ortsgedächtnis. Geschichten, lokales Wissen und sichtbare Veränderungen werden an reale Orte geheftet und auf Karte und Zeitleiste erlebbar — nicht als Social Feed, sondern als ruhiges gemeinsames Archiv.</p>
            <p className="mt-6 border-l border-[#D6A848]/50 pl-4 text-sm leading-6 text-[#E9C981]/80">Gedacht für lokale Archive, Kulturorte, Kommunen und Besucher:innen. Beiträge können vor Ort per QR-Code entstehen und bleiben klar ihrer Quelle zugeordnet.</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2.2rem] border border-white/10 bg-[#14231f] shadow-[16px_18px_0_rgba(0,0,0,.25)]">
            <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(146,201,169,.22)_1px,transparent_1px),linear-gradient(90deg,rgba(146,201,169,.22)_1px,transparent_1px)] [background-size:42px_42px]" />
            <div className="absolute inset-[12%] rotate-[-8deg] rounded-[40%_55%_48%_62%] border border-[#92c9a9]/25 bg-[#92c9a9]/5" />
            {points.map((point) => <div key={point.label} className="absolute" style={{ left: point.left, top: point.top }}><span className="block h-4 w-4 rounded-full border-4 border-[#14231f] bg-[#D6A848] shadow-[0_0_24px_rgba(214,168,72,.65)]" /><span className="mt-2 block rounded-full bg-black/45 px-2 py-1 text-[9px] uppercase tracking-[.14em] text-white/65 backdrop-blur">{point.label}</span></div>)}
          </div>
        </section>
        <section className="mt-20 grid gap-4 md:grid-cols-3">
          {[[MapPin, 'Am Ort', 'Ein QR-Code oder Link öffnet genau den Ausschnitt, der hier Bedeutung hat.'], [History, 'Durch die Zeit', 'Beiträge zeigen nicht nur, was da ist, sondern wie ein Ort sich verändert hat.'], [QrCode, 'Mit Herkunft', 'Jede Spur behält Quelle, Zeitpunkt und Freigabe, statt im Feed zu verschwimmen.']].map(([Icon, title, body]) => { const FeatureIcon = Icon as typeof Map; return <article key={String(title)} className="rounded-3xl border border-white/10 bg-white/[0.035] p-7"><FeatureIcon className="h-6 w-6 text-[#92c9a9]" /><h2 className="mt-8 font-serif text-3xl">{String(title)}</h2><p className="mt-3 text-sm leading-6 text-white/52">{String(body)}</p></article>; })}
        </section>
      </div>
    </main>
  );
}
