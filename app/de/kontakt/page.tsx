import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Kontakt & Zusammenarbeit – Saimôr',
  description: 'Sprich mit SAIMÔR über Arbeitsprozesse, verknüpfte Werkzeuge, KI-Workshops und digitale Arbeitsräume. Ein direkter Weg von der Idee zum nächsten Schritt.',
};

const steps = [
  ['01', 'Verstehen', 'Worum geht es wirklich? Wir sortieren Ausgangslage, Anforderungen und bereits vorhandene Werkzeuge.'],
  ['02', 'Eingrenzen', 'Was würde einen spürbaren Unterschied machen? Daraus entsteht ein überschaubarer nächster Schritt.'],
  ['03', 'Umsetzen', 'Wenn es passt, entwickeln wir einen konkreten Pilot, Workshop oder eine Integration – mit klaren Grenzen.'],
];

export default function Page() {
  return (
    <div className="min-h-screen bg-[#f4f1e8] px-6 pb-24 pt-28 text-[#193a2b] sm:pt-36">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] font-semibold tracking-[.22em] text-[#53735c]">SAIMÔR / KONTAKT</p>
        <h1 className="mt-5 max-w-4xl font-serif text-5xl font-normal leading-[1.02] tracking-[-.04em] sm:text-7xl">
          Aus einer offenen Frage kann etwas Konkretes werden.
        </h1>
        <p className="mt-7 max-w-2xl text-base leading-8 text-[#496250] sm:text-lg">
          Vielleicht geht in deinem Arbeitsalltag zu viel Kontext verloren. Vielleicht soll ein Werkzeug mit dem anderen sprechen. Oder du hast eine Idee und suchst jemanden, der sie mit dir durchdenkt und umsetzt.
        </p>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_.9fr] lg:gap-20">
          <section aria-labelledby="contact-process">
            <h2 id="contact-process" className="font-serif text-4xl tracking-[-.025em]">So beginnen wir.</h2>
            <ol className="mt-6 border-t border-[#8fa493]/60">
              {steps.map(([number, title, description]) => (
                <li key={number} className="grid grid-cols-[40px_1fr] gap-4 border-b border-[#8fa493]/50 py-6">
                  <span className="pt-1 font-mono text-xs text-[#69806c]">{number}</span>
                  <div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#506759]">{description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
          <section aria-labelledby="contact-direct" className="self-start rounded-[28px] bg-[#173b2b] p-7 text-[#fbf5e9] shadow-[0_22px_60px_rgba(25,58,43,.14)] sm:p-10">
            <p className="font-mono text-[10px] tracking-[.2em] text-[#d6c18a]">DIREKTER KONTAKT</p>
            <h2 id="contact-direct" className="mb-5 mt-4 font-serif text-4xl font-normal leading-tight">Ein Gespräch beginnt mit einer Nachricht.</h2>
            <ContactForm locale="de" />
          </section>
        </div>
      </div>
    </div>
  );
}
