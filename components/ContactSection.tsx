'use client';

import { ArrowRight, Calendar, Mail } from 'lucide-react';
import { useState } from 'react';
import { MatomoEvents } from '@/lib/matomo';

export default function ContactSection({ locale }: { locale: 'de' | 'en' }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const copy = locale === 'de' ? {
    eyebrow: 'KONTAKT', title: 'Projekt oder Pilot besprechen.', body: 'Beschreibe kurz den Ablauf, der heute unnötig Zeit kostet. Eine erste Einschätzung ist unverbindlich.', name: 'Name', email: 'E-Mail', message: 'Worum geht es?', placeholder: 'Zum Beispiel: Angebote, Dokumentation, Kundenanfragen oder interne Wissenssuche.', send: 'Anfrage senden', sending: 'Wird gesendet …', sent: 'Anfrage ist angekommen.', error: 'Senden fehlgeschlagen. Bitte per E-Mail melden.', book: '30 Minuten buchen', direct: 'Direkt schreiben'
  } : {
    eyebrow: 'CONTACT', title: 'Discuss a project or pilot.', body: 'Briefly describe the workflow that currently costs unnecessary time. An initial assessment is non-binding.', name: 'Name', email: 'Email', message: 'What is the workflow?', placeholder: 'For example: proposals, documentation, customer requests or internal knowledge search.', send: 'Send inquiry', sending: 'Sending …', sent: 'Your inquiry arrived.', error: 'Sending failed. Please use email.', book: 'Book 30 minutes', direct: 'Email directly'
  };

  async function submit(event: React.FormEvent) {
    event.preventDefault(); setStatus('sending');
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const ok = response.ok; setStatus(ok ? 'sent' : 'error'); MatomoEvents.formSubmit('Contact Form', ok);
      if (ok) { setForm({ name: '', email: '', message: '' }); window.dispatchEvent(new CustomEvent('saimor-contact-submitted')); }
    } catch { setStatus('error'); MatomoEvents.formSubmit('Contact Form', false); }
  }

  return (
    <section id="kontakt" className="border-t border-white/8 bg-world-ink px-5 py-16 text-white sm:px-7 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
        <div><p className="font-mono text-xs font-semibold tracking-[.2em] text-[#d6a848]">{copy.eyebrow}</p><h2 className="mt-5 max-w-xl font-serif text-4xl leading-none text-[#f4efe6] sm:text-5xl">{copy.title}</h2><p className="mt-6 max-w-md text-lg leading-8 text-white/52">{copy.body}</p>
          <div className="mt-8 flex flex-col items-start gap-3"><a href="mailto:contact@saimor.world" className="inline-flex min-h-11 items-center gap-3 text-sm text-white/65 hover:text-white"><Mail className="h-4 w-4 text-[#d6a848]" />{copy.direct}</a><a href="https://cal.com/saimor/30min" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3 text-sm text-white/65 hover:text-white"><Calendar className="h-4 w-4 text-[#d6a848]" />{copy.book}</a></div>
        </div>
        <form onSubmit={submit} className="rounded-[1.75rem] border border-white/10 bg-white/[.025] p-5 sm:p-7">
          <div className="grid gap-5 sm:grid-cols-2"><label className="text-sm text-white/55">{copy.name}<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="mt-2 min-h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-base text-white outline-none transition focus:border-[#d6a848]/55" /></label><label className="text-sm text-white/55">{copy.email}<input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="mt-2 min-h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-base text-white outline-none transition focus:border-[#d6a848]/55" /></label></div>
          <label className="mt-5 block text-sm text-white/55">{copy.message}<textarea required rows={5} placeholder={copy.placeholder} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-base leading-7 text-white outline-none placeholder:text-white/22 focus:border-[#d6a848]/55" /></label>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><p role="status" className={`text-sm ${status === 'error' ? 'text-red-300' : 'text-white/42'}`}>{status === 'sent' ? copy.sent : status === 'error' ? copy.error : ''}</p><button disabled={status === 'sending'} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#f0ece3] px-6 text-sm font-bold text-[#0b1111] disabled:opacity-50">{status === 'sending' ? copy.sending : copy.send}<ArrowRight className="h-4 w-4" /></button></div>
        </form>
      </div>
    </section>
  );
}
