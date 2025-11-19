export const metadata = {
  title: "Saimôr · Docs",
  description: "Calm documentation entry point for Saimôr and Môra."
};

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f8f5f0] to-[#f2ece1] text-[#1f2d1f]">
      <div className="max-w-4xl mx-auto px-6 py-20 space-y-6">
        <p className="text-xs uppercase tracking-[0.3em] text-saimor-gold">Docs</p>
        <h1 className="text-4xl font-semibold" style={{ fontFamily: "Cormorant Garamond, serif" }}>
          Saimôr · Documentation Hub
        </h1>
        <p className="text-lg text-slate-700 leading-relaxed">
          Hier entsteht die ruhige Dokumentation für das semantische OS und Môras Resonanzraum.
          Bald findest du hier Anleitungen, API-Hinweise und den Weg in die Demo.
        </p>
      </div>
    </main>
  );
}
