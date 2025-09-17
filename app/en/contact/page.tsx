import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact – Saimôr',
  description: 'Write to us calmly. We respond calmly.',
};

export default function Page() {
  return (
    <main className="section">
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-10 items-start">
        <div className="space-y-4">
          <h1 className="text-[32px] md:text-[40px] font-medium">Contact</h1>
          <p className="text-[color:var(--ink)]">Write to us calmly. We respond calmly.</p>
        </div>
        <ContactForm locale="en" />
      </div>
    </main>
  );
}