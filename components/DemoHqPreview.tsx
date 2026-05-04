import { ArrowRight, Building2, CheckCircle2, ExternalLink, FileText, Mail, Shield, Sparkles } from 'lucide-react';
import type { DemoCompanyProfile } from '@/lib/demo-company';

type Props = {
  profile: DemoCompanyProfile;
  osHref: string;
  onRequestAccess?: () => void;
  accessState?: 'idle' | 'sending' | 'sent' | 'error';
};

const signalClass = {
  risk: 'border-red-200 bg-red-50 text-red-700',
  setup: 'border-slate-200 bg-slate-50 text-slate-700',
  growth: 'border-emerald-200 bg-emerald-50 text-emerald-700',
};

const priorityClass = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-amber-100 text-amber-700',
  low: 'bg-emerald-100 text-emerald-700',
};

export default function DemoHqPreview({ profile, osHref, onRequestAccess, accessState = 'idle' }: Props) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-slate-950 text-white p-8 print:hidden">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-[34%] space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-cyan-100">
            <Sparkles className="h-3 w-3" />
            Simulierte HQ-Instanz
          </div>
          <div>
            <h2 className="text-4xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              {profile.companyName}
            </h2>
            <p className="mt-2 text-sm text-white/55">
              {profile.industry} · {profile.sizeLabel}
              {profile.domain ? ` · ${profile.domain}` : ''}
            </p>
          </div>
          <p className="text-sm leading-relaxed text-white/70">{profile.moraBriefing}</p>

          {/* Primary CTA: open HQ directly in browser */}
          <a
            href={osHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-200 transition-colors"
          >
            Jetzt im Browser öffnen
            <ExternalLink className="h-4 w-4" />
          </a>

          {/* Secondary: email status (auto-sent after scan) */}
          <div className="flex items-center gap-2 text-xs text-white/45">
            <Mail className="h-3.5 w-3.5 shrink-0" />
            {accessState === 'sending'
              ? 'HQ-Link wird per E-Mail gesendet…'
              : accessState === 'sent'
                ? 'HQ-Link wurde an deine E-Mail gesendet.'
                : accessState === 'error'
                  ? <span className="text-red-300">E-Mail konnte nicht gesendet werden.</span>
                  : 'Du erhältst den Link auch per E-Mail.'}
            {accessState === 'error' && onRequestAccess ? (
              <button
                type="button"
                onClick={onRequestAccess}
                className="underline underline-offset-2 text-white/55 hover:text-white transition-colors"
              >
                Erneut senden
              </button>
            ) : null}
          </div>
        </div>

        <div className="flex-1 grid gap-4">
          <div className="grid md:grid-cols-3 gap-3">
            {profile.rooms.map((room) => (
              <div key={room.name} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-center gap-2 text-white">
                  {room.signal === 'risk' ? <Shield className="h-4 w-4 text-red-300" /> : <Building2 className="h-4 w-4 text-cyan-200" />}
                  <p className="font-semibold">{room.name}</p>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-white/50">{room.purpose}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/35">Vorbereitete Dokumente</p>
              <div className="mt-4 space-y-3">
                {profile.documents.map((doc) => (
                  <div key={doc.title} className="flex gap-3">
                    <FileText className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" />
                    <div>
                      <p className="text-sm font-medium">{doc.title}</p>
                      <p className="text-xs text-white/45">{doc.type} · {doc.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/35">Naechste Aufgaben</p>
              <div className="mt-4 space-y-3">
                {profile.tasks.slice(0, 4).map((task) => (
                  <div key={task.title} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-medium">{task.title}</p>
                        <span className={`rounded-full px-2 py-0.5 text-[9px] uppercase tracking-widest ${priorityClass[task.priority]}`}>
                          {task.priority}
                        </span>
                      </div>
                      <p className="text-xs text-white/45">{task.source}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-xs text-white/35">
            Hinweis: Diese HQ-Ansicht ist simuliert aus deinem Check. Echte Daten entstehen erst, wenn du Tools und Konten verbindest.
          </p>
        </div>
      </div>
    </section>
  );
}
