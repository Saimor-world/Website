export const metadata = { title: 'Imprint – Saimôr' };

export default function Page() {
  return (
    <main className="section">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-[28px] md:text-[34px] font-medium mb-8">Imprint</h1>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Information according to § 5 TMG</h2>
          <div className="mb-8 p-6 bg-slate-50 rounded-xl">
            <p className="text-slate-700 mb-2">
              <strong>NextChapter</strong><br />
              Brand: Saimôr<br />
              Owner: Marius Fahrländer<br />
              Wallmerstraße 30<br />
              70327 Stuttgart<br />
              Germany
            </p>
            <p className="text-slate-700 mt-4">
              <strong>Contact:</strong><br />
              E-Mail: contact@saimor.world
            </p>
          </div>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Responsible for content according to § 55 Para. 2 RStV</h2>
          <p className="mb-8 text-slate-700">
            Marius Fahrländer<br />
            Wallmerstraße 30<br />
            70327 Stuttgart
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">EU Dispute Resolution</h2>
          <p className="mb-6 text-slate-700">
            The European Commission provides a platform for online dispute resolution (ODR):
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline ml-1">
              https://ec.europa.eu/consumers/odr/
            </a>
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Consumer Dispute Resolution</h2>
          <p className="mb-8 text-slate-700">
            We are not willing or obligated to participate in dispute resolution procedures
            before a consumer arbitration board.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Liability Disclaimer</h2>

          <h3 className="text-xl font-semibold mb-3 text-slate-800">Content</h3>
          <p className="mb-6 text-slate-700">
            The contents of our pages have been created with the greatest care. However, we cannot
            guarantee the accuracy, completeness and timeliness of the content.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-slate-800">Links</h3>
          <p className="mb-6 text-slate-700">
            Our offer contains links to external websites of third parties, on whose contents we have no influence.
            Therefore, we cannot assume any liability for these external contents.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-slate-800">Copyright</h3>
          <p className="mb-8 text-slate-700">
            The content and works created by the site operators on these pages are subject to German copyright law.
            Duplication, processing, distribution and any kind of exploitation outside the limits of copyright law
            require the written consent of the respective author or creator.
          </p>

          <div className="mt-8 p-4 bg-slate-100 rounded-xl">
            <p className="text-sm text-slate-600">
              Status: January 2025
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}