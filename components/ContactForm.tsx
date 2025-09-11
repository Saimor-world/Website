"use client";
export default function ContactForm({ locale = "de" as "de" | "en" }) {
  const t = (de: string, en: string) => (locale === "de" ? de : en);
  const cal = process.env.NEXT_PUBLIC_CAL_URL;
  return (
    <div className="grid gap-4">
      <p className="text-sm text-white/80">
        {t(
          "In einem kostenlosen Erstgespräch finden wir heraus, wie Klarheit für euch aussehen kann.",
          "In a free intro call we’ll explore how clarity can look for you."
        )}
      </p>

      {cal ? (
        <a href={cal} target="_blank" rel="noreferrer"
           className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#FFCE45] text-[#0E1526] font-medium hover:opacity-90">
          {t("Gespräch buchen", "Book a call")}
        </a>
      ) : (
        <div className="text-sm text-rose-300">
          {t("CAL_URL fehlt. Bitte NEXT_PUBLIC_CAL_URL setzen.", "CAL_URL missing. Please set NEXT_PUBLIC_CAL_URL.")}
        </div>
      )}

      <p className="text-xs text-white/60">
        {t("Hinweis: keine Profile; Buchung via Cal.com.", "Note: no profiling; booking via Cal.com.")}
      </p>
    </div>
  );
}
