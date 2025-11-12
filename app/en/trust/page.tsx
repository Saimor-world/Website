import Link from 'next/link';
import type { Metadata } from 'next';

const demoLink = '/docs/architecture/DATA_FLOW_EXPLAINED.md';

const techItems = [
  'Data: local mock/simulation',
  'Flow: Saimôr Core (local) → Môra UI → Website',
  'Tracking: none',
  'Cookies: strictly necessary only (if any)'
];

export const metadata: Metadata = {
  title: 'Trust & Safety – Saimôr',
  description: 'Transparent demo data handling, local processing, GDPR baseline.'
};

export default function TrustPageEn() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8faf9] to-white text-gray-800">
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/en" className="text-2xl font-semibold text-[#4A6741]">
            Saimôr
          </Link>
          <Link href="/en" className="text-sm text-gray-600 transition hover:text-gray-900">
            ← Back to start
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-10 px-6 py-16">
        <section className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#D4B483]">
            Transparency &amp; Safety
          </p>
          <h1 className="font-serif text-4xl text-[#0E1A1B]">Calm, traceable, intentional.</h1>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              We are in a prototype/demo phase. All values are locally generated demo data – no external clouds,
              no profiling.
            </p>
            <p>
              For real projects: data minimization, clear roles &amp; permissions, export anytime. EU law (GDPR)
              is our baseline.
            </p>
            <Link
              href={demoLink}
              target="_blank"
              className="inline-flex items-center text-sm text-[#4A6741] transition hover:text-[#2f4729]"
            >
              Learn more about the demo architecture →
            </Link>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#0E1A1B]">Technical Frame</h2>
          <ul className="space-y-3 text-base leading-relaxed">
            {techItems.map(item => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-[#D4B483]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-2xl border border-[#D4B483]/40 bg-white/70 p-5 text-sm text-gray-700">
            Note: No production claims. No personal data in the demo.
          </div>
        </section>
      </main>
    </div>
  );
}
