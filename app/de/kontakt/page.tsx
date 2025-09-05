import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Kontakt – Saimôr',
  description: 'Schreib uns in Ruhe. Wir antworten in Ruhe.',
};

export default function Page() {
  return (
    <main className="section">
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-10 items-start">
        <div className="space-y-4">
          <h1 className="text-[32px] md:text-[40px] font-medium">Kontakt</h1>
          <p className="text-[color:var(--ink)]">Schreib uns in Ruhe. Wir antworten in Ruhe.</p>
        </div>
        <ContactForm locale="de" />
      </div>
    </main>
  );
}
