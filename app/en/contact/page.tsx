import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact & Collaboration – Saimôr',
  description: 'Talk to SAIMÔR about workflows, disconnected tools, AI workshops and connected digital workspaces.',
};

const steps = [
  ['01', 'Understand', 'We start with your situation, the needs behind it and the tools already in use.'],
  ['02', 'Focus', 'What would make a meaningful difference? Together we define a manageable next step.'],
  ['03', 'Build', 'When there is a fit, we shape a concrete pilot, workshop or integration with clear boundaries.'],
];

export default function Page() {
  return (
    <main className="min-h-screen bg-[#f4f1e8] px-6 pb-24 pt-28 text-[#193a2b] sm:pt-36">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] font-semibold tracking-[.22em] text-[#53735c]">SAIMÔR / CONTACT</p>
        <h1 className="mt-5 max-w-4xl font-serif text-5xl font-normal leading-[1.02] tracking-[-.04em] sm:text-7xl">
          An open question can become something real.
        </h1>
        <p className="mt-7 max-w-2xl text-base leading-8 text-[#496250] sm:text-lg">
          Maybe context keeps getting lost in your work. Maybe two tools need to work together. Or perhaps you have an idea and need someone to think it through and build with you.
        </p>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_.9fr] lg:gap-20">
          <section aria-labelledby="contact-process">
            <h2 id="contact-process" className="font-serif text-4xl tracking-[-.025em]">How we begin.</h2>
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
            <p className="font-mono text-[10px] tracking-[.2em] text-[#d6c18a]">DIRECT CONTACT</p>
            <h2 id="contact-direct" className="mb-5 mt-4 font-serif text-4xl font-normal leading-tight">A conversation starts with a message.</h2>
            <ContactForm locale="en" />
          </section>
        </div>
      </div>
    </main>
  );
}
