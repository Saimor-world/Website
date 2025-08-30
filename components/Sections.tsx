import { Lightbulb, Orbit, LineChart, PenTool } from 'lucide-react';

const t = {
  de: {
    pulse: { title: "Saimôr Pulse", text: "Workshops & Impulse – Klarheit im Wandel erzeugen, Beteiligung ermöglichen." },
    systems: { title: "Saimôr Systems", text: "Daten, Dashboards, KI – einfach & verständlich. DSGVO-konform." },
    orbit: { title: "Saimôr Orbit", text: "Selbstorganisation & Klarheitsarchitektur – 1:1 oder Gruppe, KI-gestützt." },
    studio: { title: "Saimôr Studio", text: "Texte, Visuals, Storytelling – klar, resonant, modern." },
    missionTitle: "Mission & Haltung",
    missionText: "Saimôr ist ein Resonanzraum für Klarheit. Eine Brücke zwischen Menschen, Daten und Wandel. Start: 1. September 2025.",
    contactTitle: "Kontakt",
    contactText: "Kurz sprechen, Fokus klären, nächsten Schritt festlegen.",
    name: "Name",
    email: "E-Mail",
    msg: "Nachricht",
    send: "Senden"
  },
  en: {
    pulse: { title: "Saimôr Pulse", text: "Workshops & impulses – create clarity in change, enable participation." },
    systems: { title: "Saimôr Systems", text: "Data, dashboards, AI – simple & comprehensible. GDPR-compliant." },
    orbit: { title: "Saimôr Orbit", text: "Self-organization & clarity architecture – 1:1 or group, AI-supported." },
    studio: { title: "Saimôr Studio", text: "Copy, visuals, storytelling – clear, resonant, modern." },
    missionTitle: "Mission & Stance",
    missionText: "Saimôr is a resonance space for clarity. A bridge between people, data, and change. Launch: September 1, 2025.",
    contactTitle: "Contact",
    contactText: "Quick call, sharpen focus, decide the next step.",
    name: "Name",
    email: "Email",
    msg: "Message",
    send: "Send"
  }
} as const;

export default function Sections({ locale }: { locale: 'de'|'en' }) {
  const tr = t[locale];

  const cards = [
    { icon: Lightbulb, ...tr.pulse },
    { icon: LineChart, ...tr.systems },
    { icon: Orbit, ...tr.orbit },
    { icon: PenTool, ...tr.studio },
  ];

  return (
    <>
      <section id="leistungen" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="grid md:grid-cols-4 gap-6">
          {cards.map(({ icon: Icon, title, text }, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-gold/40 transition">
              <Icon className="mb-3" />
              <h3 className="font-serif text-xl">{title}</h3>
              <p className="mt-2 text-sm text-white/80">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="mission" className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <h2 className="font-serif text-3xl">{tr.missionTitle}</h2>
          <p className="mt-4 text-white/80 max-w-3xl">{tr.missionText}</p>
        </div>
      </section>

      <section id="kontakt" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <h2 className="font-serif text-3xl">{tr.contactTitle}</h2>
        <p className="mt-2 text-white/80">{tr.contactText}</p>
        <form className="mt-6 grid md:grid-cols-2 gap-4" action={`/api/contact`} method="post">
          <input className="px-4 py-3 rounded-xl bg-white/[0.06] border border-white/10" name="name" placeholder={tr.name} required />
          <input className="px-4 py-3 rounded-xl bg-white/[0.06] border border-white/10" name="email" type="email" placeholder={tr.email} required />
          <textarea className="md:col-span-2 px-4 py-3 rounded-xl bg-white/[0.06] border border-white/10" name="message" placeholder={tr.msg} rows={6} required />
          <button className="w-max px-5 py-3 rounded-full bg-gold text-navy font-medium hover:brightness-110 transition">{tr.send}</button>
        </form>
        <p className="text-xs text-white/60 mt-3">DSGVO: Keine personenbezogene Analyse. Nur Kontaktaufnahme.</p>
      </section>
    </>
  );
}
