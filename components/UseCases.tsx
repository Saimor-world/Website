import Link from "next/link";
import { ArrowUpRight, Building2, Coffee, Users } from "lucide-react";
import { memo } from "react";
import { useCasesCopy } from "@/lib/locale/useCases";

type Locale = "de" | "en";

const badgeClasses = [
  "rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.28em]",
  "text-saimor-gold border border-white/20 inline-flex items-center gap-2"
].join(" ");

const cardClasses = [
  "group rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl p-6 sm:p-7",
  "shadow-[0_18px_50px_rgba(0,0,0,0.24)] transition-transform duration-200",
  "hover:-translate-y-1 hover:border-saimor-gold",
  "hover:shadow-[0_22px_60px_rgba(0,0,0,0.32)]"
].join(" ");

const icons = [Users, Coffee, Building2];

function UseCases({ locale }: { locale: Locale }) {
  const t = useCasesCopy[locale];

  return (
    <section
      className={[
        'py-16 sm:py-20 lg:py-24',
        'bg-gradient-to-b from-[#0f1f17] via-[#0d1b14] to-[#0c1813]'
      ].join(' ')}
    >
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div
          className="absolute inset-0 pointer-events-none opacity-35"
          style={{
            background:
              'radial-gradient(800px 260px at 25% 15%, rgba(212,168,87,0.12), transparent 60%),' +
              ' radial-gradient(900px 320px at 75% 10%, rgba(74,103,65,0.14), transparent 60%)'
          }}
        />

        <div className="relative text-center text-white space-y-3 max-w-3xl mx-auto mb-10">
          <p className={badgeClasses}>{t.kicker}</p>
          <h2
            className="text-3xl sm:text-4xl font-semibold"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            {t.title}
          </h2>
          <p className="text-base sm:text-lg text-white/80 leading-relaxed">{t.intro}</p>
        </div>

        <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.cards.map((card, index) => {
            const Icon = icons[index];
            return (
              <Link key={card.title} href="#kontakt" className={cardClasses}>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={[
                        'rounded-2xl bg-white/10 border border-white/10 p-2',
                        'inline-flex'
                      ].join(' ')}
                    >
                      <Icon className="h-5 w-5 text-saimor-gold" />
                    </span>
                    <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                  </div>
                  <ArrowUpRight
                    className={[
                      'h-5 w-5 text-saimor-gold opacity-80',
                      'transition-opacity duration-200 group-hover:opacity-100'
                    ].join(' ')}
                  />
                </div>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">{card.body}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm text-saimor-gold">
                  <span>{t.cta}</span>
                  <ArrowUpRight
                    className={[
                      'h-4 w-4 transition-transform duration-200',
                      'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                    ].join(' ')}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default memo(UseCases);
