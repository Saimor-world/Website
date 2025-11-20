import Link from "next/link";
import { memo } from "react";
import { Leaf, Network, PanelsTopLeft } from "lucide-react";
import { myceliumCopy } from "@/lib/locale/mycelium";

type Locale = "de" | "en";

type InfoCardProps = {
  title: string;
  items: string[];
  icon: React.ElementType;
};

const cardBase =
  "rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl p-6 shadow-[0_18px_50px_rgba(0,0,0,0.22)]";

function InfoCard({ title, items, icon: Icon }: InfoCardProps) {
  return (
    <div className={cardBase}>
      <div className="flex items-center gap-3 text-white">
        <span className="rounded-2xl bg-white/10 border border-white/10 p-2 inline-flex">
          <Icon className="h-5 w-5 text-saimor-gold" />
        </span>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-white/80">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="text-saimor-gold mt-0.5">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DemoCard({
  title,
  subtitle,
  rows,
  note,
  cta,
  locale
}: {
  title: string;
  subtitle: string;
  rows: { label: string; value: string }[];
  note: string;
  cta: string;
  locale: Locale;
}) {
  return (
    <div className={cardBase}>
      <div className="flex items-center gap-3 text-white">
        <span className="rounded-2xl bg-white/10 border border-white/10 p-2 inline-flex">
          <PanelsTopLeft className="h-5 w-5 text-saimor-gold" />
        </span>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-xs text-white/65">{subtitle}</p>
        </div>
      </div>
      <dl className="mt-4 space-y-3 text-sm text-white/85">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-3 border-b border-white/10 pb-2">
            <dt className="text-white/60">{row.label}</dt>
            <dd className="font-medium text-white">{row.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-xs text-white/60">{note}</p>
      <Link
        href="#demo-preview"
        className="mt-5 inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:border-saimor-gold hover:text-saimor-gold transition-colors"
      >
        {cta}
      </Link>
    </div>
  );
}

function QuickFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/85 flex flex-col gap-1">
      <span className="text-xs uppercase tracking-[0.3em] text-white/55">{label}</span>
      <span className="text-lg font-semibold" style={{ fontFamily: "Cormorant Garamond, serif" }}>
        {value}
      </span>
    </div>
  );
}

function MyceliumSection({ locale }: { locale: Locale }) {
  const t = myceliumCopy[locale];

  return (
    <section
      id="mycelium"
      className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#0c1813] via-[#0f1f17] to-[#0c1813]"
    >
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 15%, rgba(212,168,87,0.15), transparent 55%)," +
            "radial-gradient(circle at 80% 10%, rgba(74,103,65,0.18), transparent 60%)"
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8 space-y-8 text-white">
        <header className="text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-saimor-gold">{t.kicker}</p>
          <h2 className="text-3xl sm:text-4xl font-semibold" style={{ fontFamily: "Cormorant Garamond, serif" }}>
            {t.title}
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">{t.intro}</p>
          <div className="flex flex-wrap justify-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/65">
            {t.badges.map((badge) => (
              <span key={badge} className="rounded-full border border-white/10 bg-white/5 px-4 py-1">
                {badge}
              </span>
            ))}
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          <InfoCard title={t.forest.title} items={t.forest.items} icon={Leaf} />
          <InfoCard title={t.mycelium.title} items={t.mycelium.items} icon={Network} />
          <DemoCard {...t.demo} locale={locale} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.quickFacts.map((fact) => (
            <QuickFact key={fact.label} {...fact} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(MyceliumSection);


