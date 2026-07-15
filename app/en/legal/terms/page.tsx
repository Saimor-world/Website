export const metadata = { title: 'Terms of Service – Saimôr' };

export default function Page() {
  return (
    <main className="section">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-[28px] md:text-[34px] font-medium mb-8">Terms of Service</h1>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800">1. Scope &amp; Provider</h2>
          <p className="mb-6 text-slate-700">
            These Terms of Service govern the use of the software and services provided by Saimôr (&quot;SAIMÔR&quot;),
            available via saimor.world and related subdomains. Provider contact: contact@saimor.world. Full
            provider details are in the <a href="/en/legal/imprint" className="text-yellow-600 hover:underline">Imprint</a>.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">2. Service Description</h2>
          <p className="mb-6 text-slate-700">
            SAIMÔR provides a semantic operating system and related services (including a security check,
            workspace/OS, and Môra). The feature set is in active development (early access) and may evolve.
            Specific characteristics or uninterrupted availability are only warranted where expressly agreed.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">3. Contract &amp; Account</h2>
          <p className="mb-6 text-slate-700">
            A usage contract is formed by registering an account or subscribing to a paid plan. You are responsible
            for keeping your credentials confidential. A time-limited trial workspace created from a security check
            is not yet a permanent account (see <a href="/en/legal/privacy" className="text-yellow-600 hover:underline">Privacy</a>).
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">4. Prices &amp; Payment</h2>
          <p className="mb-6 text-slate-700">
            Paid plans are billed at the prices shown at the time of contract. Payments are processed by our
            reseller and Merchant of Record (Paddle.com), which acts as the seller towards the customer, issues
            invoices, and accounts for applicable VAT. The payment provider&apos;s terms apply in addition.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">5. Term &amp; Cancellation</h2>
          <p className="mb-6 text-slate-700">
            Subscriptions run for the selected period and may be cancelled at any time effective at the end of the
            current billing period, unless otherwise agreed. Details on withdrawal and refunds are in our{' '}
            <a href="/en/legal/refund" className="text-yellow-600 hover:underline">Refund &amp; Cancellation Policy</a>.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">6. User Obligations</h2>
          <p className="mb-6 text-slate-700">
            The services must not be used unlawfully, abusively, or in a way that impairs operation, security, or
            other users. Content you submit must be free of third-party rights.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">7. Availability &amp; Liability</h2>
          <p className="mb-6 text-slate-700">
            SAIMÔR is liable without limitation for intent and gross negligence and under mandatory statutory
            provisions. For slightly negligent breach of essential contractual duties, liability is limited to the
            foreseeable damage typical for the contract. Otherwise liability is excluded. Given the early-access
            nature of the services, no warranty is given for specific results.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">8. Data Protection</h2>
          <p className="mb-6 text-slate-700">
            Information on the processing of personal data is in our{' '}
            <a href="/en/legal/privacy" className="text-yellow-600 hover:underline">Privacy Policy</a>.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">9. Final Provisions</h2>
          <p className="mb-6 text-slate-700">
            German law applies, excluding the UN Convention on Contracts for the International Sale of Goods, unless
            mandatory consumer protection provisions conflict. Should individual provisions be invalid, the validity
            of the remainder is unaffected.
          </p>

          <div className="mt-8 p-4 bg-slate-100 rounded-xl">
            <p className="text-sm text-slate-600">Status: July 2026</p>
          </div>
        </div>
      </div>
    </main>
  );
}
