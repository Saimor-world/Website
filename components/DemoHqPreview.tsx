'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, ArrowRight, Building2, CheckCircle2, ExternalLink, FileText, Mail, Orbit, Shield, Sparkles } from 'lucide-react';
import type { DemoCompanyProfile } from '@/lib/demo-company';

type Props = {
  profile: DemoCompanyProfile;
  osHref: string;
  onRequestAccess?: () => void;
  accessState?: 'idle' | 'sending' | 'sent' | 'error';
};

const priorityClass = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-amber-100 text-amber-700',
  low: 'bg-emerald-100 text-emerald-700',
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

function MoraGreeting({ companyName }: { companyName: string }) {
  const [visible, setVisible] = useState(false);
  const [textDone, setTextDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 180);
    const t2 = setTimeout(() => setTextDone(true), 1800);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start gap-3 rounded-2xl border border-cyan-200/18 bg-cyan-300/[0.07] px-4 py-3.5"
    >
      {/* Mora orb */}
      <motion.div
        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
        style={{ background: 'linear-gradient(135deg,#4A6741,#D4A857)' }}
        animate={{ scale: [1, 1.07, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <Sparkles className="h-3.5 w-3.5 text-white" />
      </motion.div>

      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-200/60">Môra</p>
        <p className="mt-0.5 text-sm leading-relaxed text-white/80">
          Ich habe das Dossier für{' '}
          <span className="font-semibold text-cyan-100">{companyName}</span>{' '}
          vorbereitet.{' '}
          {textDone ? (
            <span className="text-white/55">Schau dir an, wie das OS auf deine Situation zugeschnitten ist.</span>
          ) : (
            <motion.span
              className="inline-block h-2.5 w-px bg-cyan-200/70 align-middle"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
          )}
        </p>
      </div>
    </motion.div>
  );
}

export default function DemoHqPreview({ profile, osHref, onRequestAccess, accessState = 'idle' }: Props) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-cyan-200/15 bg-[radial-gradient(circle_at_18%_8%,rgba(34,211,238,0.24),transparent_34%),radial-gradient(circle_at_82%_16%,rgba(168,85,247,0.18),transparent_32%),linear-gradient(135deg,#020617_0%,#061814_50%,#05070f_100%)] text-white shadow-[0_30px_120px_rgba(0,0,0,0.35)] print:hidden">
      <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
        {/* ── Left: identity + signals ── */}
        <div className="relative border-b border-white/10 p-7 lg:border-b-0 lg:border-r lg:p-8">
          <div className="pointer-events-none absolute inset-x-10 top-20 h-px bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent" />
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-cyan-100">
            <Sparkles className="h-3 w-3" />
            Nightwatch zu Mora OS
          </div>

          <div className="mt-7">
            <h2 className="text-4xl font-light leading-none" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              {profile.companyName}
            </h2>
            <p className="mt-3 text-sm text-white/55">
              {profile.industry} / {profile.sizeLabel}
              {profile.domain ? ` / ${profile.domain}` : ''}
            </p>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-white/70">{profile.moraBriefing}</p>

          <div className="mt-6 grid gap-2">
            {profile.nightwatchSignals.map((signal) => (
              <div key={signal.label} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                <span className="text-[10px] uppercase tracking-[0.18em] text-white/32">{signal.label}</span>
                <span className="max-w-[58%] truncate text-xs text-cyan-50/82">{signal.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={osHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-cyan-200"
            >
              OS Preview starten
              <ExternalLink className="h-4 w-4" />
            </a>
            <div className="flex min-w-[220px] items-center gap-2 text-xs text-white/48">
              <Mail className="h-3.5 w-3.5 shrink-0" />
              {accessState === 'sending'
                ? 'HQ-Link wird gesendet...'
                : accessState === 'sent'
                  ? 'HQ-Link wurde gesendet.'
                  : accessState === 'error'
                    ? <span className="text-red-300">E-Mail konnte nicht gesendet werden.</span>
                    : 'Link kommt auch per E-Mail.'}
              {accessState === 'error' && onRequestAccess ? (
                <button
                  type="button"
                  onClick={onRequestAccess}
                  className="text-white/62 underline underline-offset-2 transition-colors hover:text-white"
                >
                  Erneut
                </button>
              ) : null}
            </div>
          </div>
        </div>

        {/* ── Right: living dossier ── */}
        <motion.div
          className="p-7 lg:p-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Môra greeting — first beat */}
          <motion.div variants={fadeUp}>
            <MoraGreeting companyName={profile.companyName} />
          </motion.div>

          <div className="mt-5 grid gap-4 xl:grid-cols-[1fr_0.8fr]">
            <div className="space-y-4">
              {/* OS Rooms */}
              <motion.div variants={fadeUp} className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/38">
                  <Orbit className="h-4 w-4 text-cyan-200" />
                  OS Räume
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-3 xl:grid-cols-1">
                  {profile.rooms.map((room) => (
                    <div key={room.name} className="rounded-xl border border-white/10 bg-black/18 p-3">
                      <div className="flex items-center gap-2 text-white">
                        {room.signal === 'risk' ? <Shield className="h-4 w-4 text-red-300" /> : <Building2 className="h-4 w-4 text-cyan-200" />}
                        <p className="font-semibold">{room.name}</p>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-white/50">{room.purpose}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Finder Context */}
              <motion.div variants={fadeUp} className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/35">Finder Kontext</p>
                <div className="mt-4 space-y-3">
                  {profile.documents.map((doc) => (
                    <div key={doc.title} className="flex gap-3">
                      <FileText className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" />
                      <div>
                        <p className="text-sm font-medium">{doc.title}</p>
                        <p className="text-xs text-white/45">{doc.type} / {doc.summary}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="space-y-4">
              {/* Dashboard Memory */}
              <motion.div variants={fadeUp} className="rounded-2xl border border-amber-200/15 bg-amber-300/[0.075] p-5">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-amber-100/58">
                  <Activity className="h-4 w-4 text-amber-100" />
                  Dashboard Memory
                </div>
                <div className="mt-4 space-y-2">
                  {profile.dashboardMemory.map((item) => (
                    <div key={item.label} className="rounded-xl border border-white/10 bg-black/18 px-3 py-2">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-white/30">{item.label}</p>
                      <p className="mt-1 truncate text-xs text-white/72">{item.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Tasks */}
              <motion.div variants={fadeUp} className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/35">Nächste Aufgaben</p>
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
              </motion.div>

              {/* OS link */}
              <motion.a
                variants={fadeUp}
                href={osHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-cyan-200/16 bg-cyan-300/[0.075] p-4 text-sm text-cyan-50 transition-colors hover:bg-cyan-300/[0.12]"
              >
                <span>Vom Dossier ins OS wechseln</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
