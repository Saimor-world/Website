import Link from 'next/link';
import { ArrowRight, PanelsTopLeft, PencilRuler } from 'lucide-react';

type Props = { locale: 'de' | 'en' };

const COPY = {
  de: {
    eyebrow: 'WEITERE RÄUME · IM AUFBAU',
    title: 'Zwei Ideen, bewusst noch nicht als fertige Produkte verkauft.',
    products: [
      {
        name: 'YORI',
        line: 'Ein ruhiger Arbeitsraum für Ideen, Recherche, Assets und Publishing.',
        href: '/yori',
        status: 'Konzept & Prototyp',
        icon: PencilRuler,
      },
      {
        name: 'DESK',
        line: 'Eine kompakte Tagesansicht für Mail, Termine, Rechnungen und offene Vorgänge.',
        href: '/demo?track=ai-business',
        status: 'Im aktiven Aufbau',
        icon: PanelsTopLeft,
      },
    ],
  },
  en: {
    eyebrow: 'MORE SPACES · IN DEVELOPMENT',
    title: 'Two ideas deliberately not presented as finished products yet.',
    products: [
      {
        name: 'YORI',
        line: 'A calm workspace for ideas, research, assets and publishing.',
        href: '/en/yori',
        status: 'Concept & prototype',
        icon: PencilRuler,
      },
      {
        name: 'DESK',
        line: 'A compact daily view for mail, calendar, invoices and open work.',
        href: '/demo?track=ai-business',
        status: 'In active development',
        icon: PanelsTopLeft,
      },
    ],
  },
} as const;

export default function MobileProductShelf({ locale }: Props) {
  const copy = COPY[locale];

  return (
    <section className="border-t border-white/8 bg-[#080f10] px-5 py-14 text-white md:hidden">
      <div className="mx-auto max-w-xl">
        <p className="font-mono text-[9px] font-bold tracking-[.24em] text-[#D6A848]">{copy.eyebrow}</p>
        <h2 className="mt-4 font-serif text-3xl leading-tight text-white/90">{copy.title}</h2>
        <div className="mt-7 grid gap-3">
          {copy.products.map((product) => {
            const Icon = product.icon;
            return (
              <Link
                key={product.name}
                href={product.href}
                className="group rounded-2xl border border-white/10 bg-white/[0.035] p-5 active:bg-white/[0.07]"
              >
                <div className="flex items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#D6A848]/10 text-[#E7C77E]">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-3">
                      <strong className="text-sm tracking-[.12em]">{product.name}</strong>
                      <span className="text-right text-[9px] uppercase tracking-[.12em] text-white/35">{product.status}</span>
                    </span>
                    <span className="mt-2 block text-sm leading-6 text-white/55">{product.line}</span>
                  </span>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-white/30 transition-transform group-active:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
