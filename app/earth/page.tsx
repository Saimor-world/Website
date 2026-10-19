import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, History, Map, MapPin, QrCode } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Earth: Ortsgedächtnis',
  description: 'Earth verbindet Geschichten, Wissen und Veränderung mit realen Orten — als ruhige Karte und Zeitleiste statt als Social Feed.',
};

const points = [{ left: '18%', top: '28%', label: 'Erinnerung' }, { left: '56%', top: '18%', label: 'Wissen' }, { left: '72%', top: '58%', label: 'Veränderung' }, { left: '32%', top: '68%', label: 'Stimme' }];

export default function EarthPage() {
  return (
    <main data-earth-page className="min-h-screen bg-[#f6f4ec] px-6 pb-24 pt-32 text-[#17392a] sm:pt-40">
      <div className="mx-auto max-w-6xl">
        <Link href="/de" className="inline-flex items-center gap-2 text-sm text-[#3a5e46] transition hover:text-[#17392a]"><ArrowLeft className="h-4 w-4" />Zurück zu Saimôr</Link>
        <section data-earth-hero className="mt-10 grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <div>
            <p className="font-mono text-[12px] font-bold tracking-[.2em] text-[#4a7d60]">EARTH · PRODUKTIDEE IM AUFBAU</p>
            <h1 className="mt-6 font-serif text-6xl font-light leading-[.95] tracking-[-.04em] text-[#17392a] sm:text-8xl">Orte erinnern sich.</h1>
            <p data-earth-long className="mt-7 max-w-xl text-lg leading-8 text-[#3a5e46]">Earth ist ein dezentrales Ortsgedächtnis. Geschichten, lokales Wissen und sichtbare Veränderungen werden an reale Orte geheftet und auf Karte und Zeitleiste erlebbar — nicht als Social Feed, sondern als ruhiges gemeinsames Archiv.</p>
            <p data-earth-short className="hidden mt-5 text-[#2a4938]">Geschichten und Wissen bleiben mit ihrem Ort verbunden – auf Karte und Zeitleiste.</p>
            <p className="mt-6 border-l-2 border-[#D6A848]/60 pl-4 text-sm leading-6 text-[#506b57]">Gedacht für lokale Archive, Kulturorte, Kommunen und Besucher:innen. Beiträge können vor Ort per QR-Code entstehen und bleiben klar ihrer Quelle zugeordnet.</p>
          </div>
          <div data-earth-map className="relative aspect-[4/3] overflow-hidden rounded-[2.2rem] border border-[#3a5e46]/20 bg-[#e8ece3] shadow-[12px_14px_0_rgba(23,57,42,.08)]">
            <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(74,125,96,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(74,125,96,.2)_1px,transparent_1px)] [background-size:42px_42px]" />
            <div className="absolute inset-[12%] rotate-[-8deg] rounded-[40%_55%_48%_62%] border border-[#4a7d60]/20 bg-[#4a7d60]/8" />
            {points.map((point) => <div key={point.label} className="absolute" style={{ left: point.left, top: point.top }}><span className="block h-4 w-4 rounded-full border-4 border-[#e8ece3] bg-[#D6A848] shadow-[0_0_18px_rgba(214,168,72,.45)]" /><span className="mt-2 block rounded-full bg-[#17392a]/80 px-2 py-1 text-[12px] uppercase tracking-[.1em] text-white/90">{point.label}</span></div>)}
          </div>
        </section>
        <section data-earth-features className="mt-20 grid gap-4 md:grid-cols-3">
          {[[MapPin, 'Am Ort', 'Ein QR-Code oder Link öffnet genau den Ausschnitt, der hier Bedeutung hat.'], [History, 'Durch die Zeit', 'Beiträge zeigen nicht nur, was da ist, sondern wie ein Ort sich verändert hat.'], [QrCode, 'Mit Herkunft', 'Jede Spur behält Quelle, Zeitpunkt und Freigabe, statt im Feed zu verschwimmen.']].map(([Icon, title, body]) => { const FeatureIcon = Icon as typeof Map; return <article key={String(title)} className="rounded-3xl border border-[#3a5e46]/15 bg-white/60 p-7"><FeatureIcon className="h-6 w-6 text-[#4a7d60]" /><h2 className="mt-8 font-serif text-3xl text-[#17392a]">{String(title)}</h2><p className="mt-3 text-sm leading-6 text-[#506b57]">{String(body)}</p></article>; })}
        </section>
      </div>
    </main>
  );
}
