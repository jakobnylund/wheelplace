import Navbar from './ui/Navbar';
import Footer from './ui/Footer';
import mockRequests from '../data/mockRequests';

function RequestCard({ request }) {
  const { brand, model, brandLogo, quantity, tireSize, type, city, comment, date } = request;

  return (
    <div className="bg-white rounded-xl border border-brand-gray/40 p-5 flex flex-col hover:shadow-lg hover:border-brand-gray transition-all duration-200">
      <div className="flex items-center gap-3 mb-4">
        <img src={brandLogo} alt={brand} className="w-10 h-10 object-contain" />
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-bold text-brand-dark truncate">{brand} {model}</h3>
          <span className="text-xs text-brand-gray-medium">{type}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-xs font-medium text-brand-dark bg-brand-gray-light px-2.5 py-1 rounded-full">
          {tireSize}
        </span>
        <span className="text-xs font-medium text-brand-blue bg-brand-blue-50 px-2.5 py-1 rounded-full">
          {quantity} st
        </span>
      </div>

      <div className="flex items-center gap-1.5 text-sm text-brand-gray-medium mb-1">
        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
        {city}
      </div>

      {comment && (
        <p className="text-sm text-brand-dark/50 leading-relaxed line-clamp-2 mt-1">{comment}</p>
      )}

      <div className="flex items-center justify-between mt-auto pt-4">
        <span className="text-xs text-brand-gray-medium">{new Date(date).toLocaleDateString('sv-SE')}</span>
        <button className="px-4 py-2 rounded-lg bg-brand-blue hover:bg-brand-blue-dark text-white text-sm font-medium transition-colors cursor-pointer border-none">
          Kontakta köpare
        </button>
      </div>
    </div>
  );
}

export default function ForfragningarPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-gray-light">
      <Navbar activePage="forfragningar" />

      <main className="flex-1 pt-[72px]">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img src="/forfragningar-hero.jpg" alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-brand-dark/70" />
          </div>
          <div className="relative px-5 sm:px-8">
            <div className="max-w-site mx-auto py-12 sm:py-16">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-5">Förfrågningar</h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 p-5">
                  <h2 className="text-sm font-semibold text-white mb-1">Letar du efter hjul?</h2>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Skapa en förfrågan med vad du söker så kontaktar säljare dig direkt.
                  </p>
                  <a
                    href="/forfragningar"
                    className="inline-flex items-center gap-2 mt-3 px-5 py-2.5 rounded-full bg-brand-blue hover:bg-brand-blue-dark text-white text-sm font-medium transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Skapa förfrågan
                  </a>
                </div>
                <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 p-5">
                  <h2 className="text-sm font-semibold text-white mb-1">Säljer du hjul?</h2>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Bläddra bland förfrågningar nedan och kontakta köpare som letar efter det du har.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 sm:px-8">
          <div className="max-w-site mx-auto py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {mockRequests.map((request) => (
                <RequestCard key={request.id} request={request} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
