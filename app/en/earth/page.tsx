import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, History, Map, MapPin, QrCode } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Earth: Place Memory',
  description: 'Earth connects stories, knowledge and change with real places — as a calm map and timeline rather than a social feed.',
};

const points = [{ left: '18%', top: '28%', label: 'Memory' }, { left: '56%', top: '18%', label: 'Knowledge' }, { left: '72%', top: '58%', label: 'Change' }, { left: '32%', top: '68%', label: 'Voice' }];

export default function EarthPage() {
  return (
    <main data-earth-page className="min-h-screen bg-[#f6f4ec] px-6 pb-24 pt-32 text-[#17392a] sm:pt-40">
      <div className="mx-auto max-w-6xl">
        <Link href="/en" className="inline-flex items-center gap-2 text-sm text-[#3a5e46] transition hover:text-[#17392a]"><ArrowLeft className="h-4 w-4" />Back to Saimôr</Link>
        <section data-earth-hero className="mt-10 grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <div>
            <p className="font-mono text-[12px] font-bold tracking-[.2em] text-[#4a7d60]">EARTH · PRODUCT CONCEPT IN DEVELOPMENT</p>
            <h1 className="mt-6 font-serif text-6xl font-light leading-[.95] tracking-[-.04em] text-[#17392a] sm:text-8xl">Places remember.</h1>
            <p data-earth-long className="mt-7 max-w-xl text-lg leading-8 text-[#3a5e46]">Earth is a decentralised place memory. Stories, local knowledge and visible changes are attached to real locations and made accessible on map and timeline — not as a social feed, but as a calm shared archive.</p>
            <p data-earth-short className="hidden mt-5 text-[#2a4938]">Stories and knowledge stay connected to their place – on map and timeline.</p>
            <p className="mt-6 border-l-2 border-[#D6A848]/60 pl-4 text-sm leading-6 text-[#506b57]">Intended for local archives, cultural sites, municipalities and visitors. Contributions can be created on location via QR code and remain clearly attributed to their source.</p>
          </div>
          <div data-earth-map className="relative aspect-[4/3] overflow-hidden rounded-[2.2rem] border border-[#3a5e46]/20 bg-[#e8ece3] shadow-[12px_14px_0_rgba(23,57,42,.08)]">
            <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(74,125,96,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(74,125,96,.2)_1px,transparent_1px)] [background-size:42px_42px]" />
            <div className="absolute inset-[12%] rotate-[-8deg] rounded-[40%_55%_48%_62%] border border-[#4a7d60]/20 bg-[#4a7d60]/8" />
            {points.map((point) => <div key={point.label} className="absolute" style={{ left: point.left, top: point.top }}><span className="block h-4 w-4 rounded-full border-4 border-[#e8ece3] bg-[#D6A848] shadow-[0_0_18px_rgba(214,168,72,.45)]" /><span className="mt-2 block rounded-full bg-[#17392a]/80 px-2 py-1 text-[12px] uppercase tracking-[.1em] text-white/90">{point.label}</span></div>)}
          </div>
        </section>
        <section data-earth-features className="mt-20 grid gap-4 md:grid-cols-3">
          {[[MapPin, 'On location', 'A QR code or link opens exactly the section that holds meaning here.'], [History, 'Through time', 'Contributions show not just what is there, but how a place has changed.'], [QrCode, 'With provenance', 'Each trace keeps its source, timestamp and approval, rather than blurring into a feed.']].map(([Icon, title, body]) => { const FeatureIcon = Icon as typeof Map; return <article key={String(title)} className="rounded-3xl border border-[#3a5e46]/15 bg-white/60 p-7"><FeatureIcon className="h-6 w-6 text-[#4a7d60]" /><h2 className="mt-8 font-serif text-3xl text-[#17392a]">{String(title)}</h2><p className="mt-3 text-sm leading-6 text-[#506b57]">{String(body)}</p></article>; })}
        </section>
      </div>
    </main>
  );
}
