export const metadata = { title: 'Privacy – Saimôr' };

export default function Page() {
  return (
    <main className="section">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-[28px] md:text-[34px] font-medium mb-8">Privacy Policy</h1>

        {/* Poetic Introduction */}
        <div className="mb-12 p-6 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl border border-yellow-200">
          <blockquote className="font-serif text-xl italic text-slate-700 leading-relaxed" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            &ldquo;Clarity requires trust. Trust requires transparency.
            Transparency about what we collect, why we do it, and how we protect it.&rdquo;
          </blockquote>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Data Controller</h2>
          <p className="mb-6 text-slate-700">
            Saimôr<br />
            [Address will be added upon business registration]<br />
            E-Mail: contact@saimor.world
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Hosting & Infrastructure</h2>
          <p className="mb-6 text-slate-700">
            This website is hosted by <strong>Vercel Inc.</strong> (USA).
            Vercel processes technical data such as IP addresses and access times to provide the website.
            For more information, see <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline">Vercel&apos;s Privacy Policy</a>.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Analytics & Statistics</h2>
          <p className="mb-6 text-slate-700">
            We use <strong>Matomo</strong> (self-hosted, anonymized) for website analytics.
            No personal profiles are created, only aggregated statistics are collected to improve our website.
            IP addresses are anonymized and cookies are not used for tracking.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Contact Form & Bookings</h2>
          <p className="mb-6 text-slate-700">
            When using our contact form or making bookings via Cal.com, the data you enter
            (name, email address, message) is used exclusively to process your inquiry and is not shared with third parties.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">External Services</h2>
          <ul className="mb-6 text-slate-700 list-disc pl-6">
            <li><strong>Cal.com:</strong> For appointment bookings. <a href="https://cal.com/privacy" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline">Cal.com Privacy Policy</a></li>
            <li><strong>Fonts:</strong> All fonts are hosted locally, no connection to Google Fonts or other external services is made.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Your Rights (GDPR)</h2>
          <p className="mb-4 text-slate-700">You have the right to:</p>
          <ul className="mb-6 text-slate-700 list-disc pl-6">
            <li>Information about the processing of your personal data</li>
            <li>Correction of incorrect data</li>
            <li>Deletion of your data</li>
            <li>Restriction of processing</li>
            <li>Data portability</li>
            <li>Object to processing</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Contact</h2>
          <p className="mb-6 text-slate-700">
            If you have questions about privacy or want to exercise your rights, please contact:
            <strong> contact@saimor.world</strong>
          </p>

          <div className="mt-8 p-4 bg-slate-100 rounded-xl">
            <p className="text-sm text-slate-600">
              Status: September 2024 | This privacy policy is regularly reviewed and updated as needed.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}