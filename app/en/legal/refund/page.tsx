export const metadata = { title: 'Refund & Cancellation – Saimôr' };

export default function Page() {
  return (
    <main className="section">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-[28px] md:text-[34px] font-medium mb-8">Refund &amp; Cancellation</h1>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Right of Withdrawal (Consumers)</h2>
          <p className="mb-6 text-slate-700">
            Consumers have the right to withdraw from a contract for digital services within 14 days without giving
            a reason. The period begins when the contract is formed. To exercise it, a clear statement (e.g. by
            email to contact@saimor.world) is sufficient.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Early Performance of Digital Content</h2>
          <p className="mb-6 text-slate-700">
            If we begin performing the digital service before the end of the withdrawal period with your express
            consent, and you acknowledge that your right of withdrawal lapses upon full performance, the right of
            withdrawal expires in accordance with statutory provisions.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Cancellation &amp; Refunds</h2>
          <p className="mb-6 text-slate-700">
            Subscriptions may be cancelled at any time effective at the end of the current billing period; access
            remains until then. Fees already paid for a current period are generally not refunded on a pro-rata
            basis, unless mandatory statutory rights (such as the right of withdrawal) or an express commitment
            provide otherwise.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Payment Processing &amp; Invoices</h2>
          <p className="mb-6 text-slate-700">
            Payments and invoices are handled by our Merchant of Record (Paddle.com). Refunds are issued via the
            same channel and payment method. For invoice or refund questions, contact contact@saimor.world.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Contact</h2>
          <p className="mb-6 text-slate-700">
            For withdrawal, cancellation, or refunds: <strong>contact@saimor.world</strong>. Further terms are in
            our <a href="/en/legal/terms" className="text-yellow-600 hover:underline">Terms of Service</a>.
          </p>

          <div className="mt-8 p-4 bg-slate-100 rounded-xl">
            <p className="text-sm text-slate-600">Status: July 2026</p>
          </div>
        </div>
      </div>
    </main>
  );
}
