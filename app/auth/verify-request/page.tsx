export default function VerifyRequestPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto">
          <span className="text-white text-3xl">âœ‰ï¸</span>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl">
          <h1 className="text-3xl font-serif text-slate-800 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            E-Mail gesendet
          </h1>

          <div className="space-y-4 text-slate-600">
            <p>Ein Anmeldelink wurde an Ihre E-Mail-Adresse gesendet.</p>
            <p>Bitte prÃ¼fen Sie Ihr Postfach und klicken Sie auf den Link, um sich anzumelden.</p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
              <p className="text-blue-800">
                <strong>Hinweis:</strong> Der Link ist 24 Stunden gÃ¼ltig. PrÃ¼fen Sie auch Ihren Spam-Ordner.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <a
            href="/login"
            className="inline-block bg-yellow-500 text-slate-900 px-6 py-3 rounded-xl hover:bg-yellow-400 transition-colors"
          >
            Neue E-Mail anfordern
          </a>

          <div>
            <a href="/de" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors">
              <span>â†</span>
              ZurÃ¼ck zur Startseite
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
