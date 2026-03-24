import { useState } from 'react';

/* ── Listing card (simplified for SEO page) ────────────── */

function ListingCard({ title, specs, price, location, condition }) {
  return (
    <div className="bg-white rounded-xl border border-brand-gray/40 overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 group">
      <div className="relative aspect-[4/3] bg-gradient-to-br from-brand-gray-light to-brand-gray/20 flex items-center justify-center overflow-hidden">
        <div className="w-16 h-16 rounded-full border-[5px] border-brand-gray/40 flex items-center justify-center">
          <div className="w-7 h-7 rounded-full border-[3px] border-brand-gray/30" />
        </div>
        {condition === 'new' && (
          <span className="absolute top-2.5 left-2.5 bg-brand-blue text-white text-[11px] font-bold px-2 py-0.5 rounded-md">Ny</span>
        )}
        {condition === 'used' && (
          <span className="absolute top-2.5 left-2.5 bg-brand-gray-light text-brand-gray-medium text-[11px] font-bold px-2 py-0.5 rounded-md">Begagnad</span>
        )}
        <span className="absolute top-2.5 right-2.5 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm">
          <img src="/icons/verified-badge.svg" alt="" className="w-3.5 h-3.5 opacity-40" />
        </span>
        <span className="absolute bottom-2.5 right-2.5 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm cursor-pointer hover:bg-brand-gray-light">
          <img src="/icons/heart.svg" alt="" className="w-3.5 h-3.5 opacity-30" />
        </span>
      </div>
      <div className="p-3.5">
        <h3 className="text-[14px] font-semibold text-brand-dark leading-snug mb-1.5 group-hover:text-brand-blue transition-colors">{title}</h3>
        <p className="text-[12px] text-brand-gray-medium mb-2">{specs}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-brand-blue">{price}</span>
          <span className="text-[11px] text-brand-gray-medium flex items-center gap-1">
            <img src="/icons/location-pin.svg" alt="" className="w-3 h-3 opacity-40" />
            {location}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Main SEO page ─────────────────────────────────────── */

export default function SEOPage() {
  const [activeTab, setActiveTab] = useState('falgar');

  const tabs = [
    { id: 'falgar', label: 'Fälgar' },
    { id: 'komplett', label: 'Kompletta hjul' },
    { id: 'dack', label: 'Däck' },
    { id: 'vinter', label: 'Vinterdäck' },
  ];

  const listings = [
    { title: 'Vinterhjul Volvo XC60/XC90 Original 19"', specs: '235/55R19 · 5/108 · Bra skick', price: '14 900 kr', location: 'Stockholm', condition: 'used' },
    { title: 'Nya sommarfälgar 20" XC60 II', specs: '20" · 5x108 · ET42 · 8.5J', price: '18 500 kr', location: 'Göteborg', condition: 'new' },
    { title: 'Original 18" 5x108 Volvo XC60', specs: '18" · 5x108 · ET43 · 7.5J', price: '6 200 kr', location: 'Malmö', condition: 'used' },
    { title: 'BBS SR 19" för Volvo 5x108', specs: '19" · 5x108 · ET40 · 8J', price: '22 000 kr', location: 'Uppsala', condition: 'new' },
    { title: 'Vinterdäck Nokian 235/60R18 4st', specs: '235/60R18 · 7mm mönster · DOT2024', price: '4 800 kr', location: 'Linköping', condition: 'used' },
    { title: 'Komplett sommar Michelin 19"', specs: '235/55R19 · 5x108 · ET45 · 6mm', price: '11 900 kr', location: 'Stockholm', condition: 'used' },
  ];

  return (
    <div className="bg-brand-gray-light min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-brand-gray/30 px-5 sm:px-8 py-3">
        <div className="max-w-site mx-auto">
          <nav className="text-[13px] text-brand-gray-medium flex items-center gap-1.5">
            <a href="/" className="hover:text-brand-blue transition-colors">Hem</a>
            <span className="text-brand-gray">›</span>
            <a href="/annonser-proto" className="hover:text-brand-blue transition-colors">Fälgar</a>
            <span className="text-brand-gray">›</span>
            <a href="#" className="hover:text-brand-blue transition-colors">Volvo</a>
            <span className="text-brand-gray">›</span>
            <span className="text-brand-dark font-medium">XC60</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-blue-dark to-brand-blue text-white px-5 sm:px-8 py-9">
        <div className="max-w-site mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold font-heading mb-1.5">Fälgar till Volvo XC60</h1>
          <p className="text-[15px] opacity-85">Bultcirkel 5x108 · Navhål 63,4 mm · 19 annonser tillgängliga just nu</p>
          <div className="flex gap-2 mt-5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 rounded-full text-[13px] font-semibold border-[1.5px] transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-white text-brand-blue border-white'
                    : 'border-white/40 text-white hover:bg-white/10 hover:border-white/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="px-5 sm:px-8">
        <div className="max-w-site mx-auto py-7 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-7">
          {/* Sidebar */}
          <aside className="flex flex-col gap-4">
            {/* Spec card */}
            <div className="bg-white rounded-xl border border-brand-gray/40 p-5">
              <h3 className="text-[13px] font-bold text-brand-gray-medium uppercase tracking-wide mb-3.5">Standardspecifikationer</h3>
              {[
                { label: 'Bultcirkel', value: '5x108' },
                { label: 'Navhål / CB', value: '63,4 mm' },
                { label: 'ET (offset)', value: '40,5–50,5 mm' },
                { label: 'Mutter / Bult', value: 'M14x1,5' },
              ].map((spec) => (
                <div key={spec.label} className="flex justify-between items-start py-2 border-b border-brand-gray-light last:border-0 text-[14px]">
                  <span className="text-brand-gray-medium font-medium">{spec.label}</span>
                  <span className="font-semibold text-brand-dark text-right">{spec.value}</span>
                </div>
              ))}
              <div className="mt-3 pt-2 border-t border-brand-gray-light">
                <span className="text-brand-gray-medium font-medium text-[14px]">Rek. däckdimensioner</span>
                <div className="flex flex-col gap-1 mt-2">
                  {['235/60 R18', '235/55 R19', '255/45 R20', '255/40 R21', '265/35 R22'].map((dim) => (
                    <span key={dim} className="bg-brand-blue-50 text-brand-blue px-2 py-0.5 rounded-md text-[12px] font-semibold w-fit">{dim}</span>
                  ))}
                </div>
              </div>

              {/* Brake warning */}
              <div className="bg-brand-gray-light border border-brand-gray/40 rounded-lg p-3 mt-4 text-[12.5px] text-brand-dark flex gap-2 items-start">
                <img src="/icons/warning-triangle.svg" alt="" className="w-4 h-4 mt-0.5 opacity-70 shrink-0" />
                <div>
                  <strong>T8 Hybrid 2018–2020</strong><br />
                  Kräver minimum 19" fälg p.g.a. bromsok. Kontrollera din variant.
                </div>
              </div>
            </div>

            {/* Reg number card */}
            <div className="bg-gradient-to-br from-[#1e3a8a] to-brand-blue rounded-xl p-5 text-white">
              <h3 className="text-[14px] font-bold mb-1.5">Sök på ditt regnummer</h3>
              <p className="text-[12px] opacity-80 mb-3.5 leading-relaxed">Få exakt rätt däck- och fälgrekommendation för just din XC60</p>
              <div className="flex bg-white rounded-lg overflow-hidden border-2 border-white/30">
                <div className="w-9 bg-[#006aa7] flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                  S
                </div>
                <input
                  type="text"
                  placeholder="ABC 123"
                  maxLength={6}
                  className="flex-1 px-3 py-2.5 text-[15px] font-bold tracking-widest text-brand-dark uppercase outline-none"
                />
                <button className="bg-brand-blue px-4 text-white font-bold text-[13px] hover:bg-brand-blue-dark transition-colors cursor-pointer">
                  Sök →
                </button>
              </div>
            </div>

            {/* Generations */}
            <div className="bg-white rounded-xl border border-brand-gray/40 p-4">
              <h3 className="text-[13px] font-bold text-brand-gray-medium uppercase tracking-wide mb-3">Generationer</h3>
              {[
                { label: 'XC60 I (U)', year: '2008–2017', active: false },
                { label: 'XC60 II (U)', year: '2017 →', active: true },
              ].map((gen) => (
                <div
                  key={gen.label}
                  className={`flex justify-between items-center py-2.5 px-2 rounded-lg cursor-pointer transition-colors ${
                    gen.active ? 'bg-brand-blue-50' : 'hover:bg-brand-gray-light'
                  } border-b border-brand-gray-light last:border-0`}
                >
                  <div>
                    <div className={`text-[13px] font-medium ${gen.active ? 'text-brand-blue font-semibold' : 'text-brand-dark'}`}>{gen.label}</div>
                    <div className="text-[12px] text-brand-gray-medium">{gen.year}</div>
                  </div>
                  <img src="/icons/chevron-right.svg" alt="" className={`w-3 h-3 ${gen.active ? 'opacity-70' : 'opacity-30'}`} />
                </div>
              ))}
            </div>

            {/* Similar bolt pattern */}
            <div className="bg-white rounded-xl border border-brand-gray/40 p-4">
              <h3 className="text-[13px] font-bold text-brand-gray-medium uppercase tracking-wide mb-3">Liknande bultcirkel</h3>
              {['Volvo XC90', 'Volvo S60', 'Ford Edge', 'Land Rover'].map((car) => (
                <div key={car} className="flex justify-between items-center py-2 border-b border-brand-gray-light last:border-0 cursor-pointer hover:text-brand-blue transition-colors">
                  <span className="text-[13px] font-medium text-brand-dark">{car}</span>
                  <span className="text-[11px] text-brand-blue font-semibold">5x108</span>
                </div>
              ))}
            </div>
          </aside>

          {/* Content */}
          <main className="min-w-0">
            {/* Active filters */}
            <div className="flex items-center gap-2 flex-wrap mb-4">
              {['Volvo XC60', '5x108', 'Fälgar'].map((f) => (
                <span key={f} className="inline-flex items-center gap-1.5 bg-brand-blue-50 border border-brand-blue-100 text-brand-blue px-3 py-1 rounded-full text-[12px] font-semibold">
                  {f}
                  <button className="text-[13px] opacity-60 hover:opacity-100 cursor-pointer">&times;</button>
                </span>
              ))}
              <span className="text-[13px] text-brand-gray-medium ml-auto">19 annonser</span>
            </div>

            {/* Listings grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {listings.map((listing, i) => (
                <ListingCard key={i} {...listing} />
              ))}
            </div>

            {/* Show more */}
            <div className="text-center mt-7">
              <button className="px-8 py-3 bg-white border-[1.5px] border-brand-blue text-brand-blue rounded-xl text-[14px] font-semibold hover:bg-brand-blue-50 transition-colors cursor-pointer">
                Visa fler annonser
              </button>
            </div>

            {/* FAQ section */}
            <div className="bg-white rounded-xl border border-brand-gray/40 overflow-hidden mt-8">
              <div className="px-5 py-4 border-b border-brand-gray-light">
                <h2 className="text-[17px] font-bold text-brand-dark font-heading">Vanliga frågor om fälgar till Volvo XC60</h2>
              </div>
              {[
                { q: 'Vilken bultcirkel har Volvo XC60?', a: 'Alla generationer av Volvo XC60 använder bultcirkeln 5x108, vilket är standard för Volvo-modeller.' },
                { q: 'Vilka fälgstorlekar passar XC60?', a: 'Beroende på generation passar 17" till 22". OEM-storlekarna är vanligtvis 18" och 19". För T8-modeller krävs minst 19" p.g.a. storlek på bromsok.' },
                { q: 'Kan jag använda fälgar från andra Volvo-modeller?', a: 'Ja, många Volvo-modeller delar bultcirkeln 5x108, t.ex. XC90, S60, V60 och V90. Kontrollera ET-offset och navhål för att säkerställa kompatibilitet.' },
                { q: 'Vad är rätt ET-offset för XC60?', a: 'Standard ET-offset för Volvo XC60 är 40,5–50,5 mm beroende på fälgbredd och generation.' },
              ].map((faq, i) => (
                <div key={i} className="px-5 py-4 border-b border-brand-gray-light last:border-0">
                  <h3 className="text-[14px] font-semibold text-brand-dark mb-2 flex items-center justify-between cursor-pointer">
                    {faq.q}
                    <img src="/icons/chevron-down.svg" alt="" className="w-3 h-3 opacity-30 shrink-0" />
                  </h3>
                  <p className="text-[13.5px] text-brand-gray-medium leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>

            {/* SEO text block */}
            <div className="bg-white rounded-xl border border-brand-gray/40 p-6 mt-5">
              <h2 className="text-[17px] font-bold text-brand-dark font-heading mb-3">Köp fälgar till Volvo XC60 online</h2>
              <p className="text-[13.5px] text-brand-gray-medium leading-relaxed mb-2.5">
                På Wheelplace hittar du ett brett utbud av fälgar, kompletta hjul och däck som passar din Volvo XC60. Alla annonser valideras mot bilens specifikationer så att du kan handla med trygghet.
              </p>
              <p className="text-[13.5px] text-brand-gray-medium leading-relaxed mb-4">
                Volvo XC60 använder bultcirkeln 5x108 med ett navhål på 63,4 mm. Beroende på motorvariant och årsmodell kan fälgstorlekar variera från 17" upp till 22".
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  'Fälgar Volvo XC90',
                  'Fälgar Volvo S60',
                  'Vinterdäck XC60',
                  '5x108 fälgar',
                  'Volvo XC60 sommarhjul',
                  'BBS Volvo',
                ].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-[12.5px] text-brand-blue bg-brand-blue-50 px-3 py-1 rounded-md font-medium hover:bg-brand-blue-100 transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Related models */}
            <div className="mt-7">
              <h2 className="text-[16px] font-bold text-brand-dark font-heading mb-3">Relaterade modeller</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { name: 'Volvo XC90', bolt: '5x108', count: '142' },
                  { name: 'Volvo V60', bolt: '5x108', count: '89' },
                  { name: 'BMW X3', bolt: '5x120', count: '201' },
                  { name: 'Audi Q5', bolt: '5x112', count: '134' },
                ].map((car) => (
                  <a
                    key={car.name}
                    href="#"
                    className="bg-white border border-brand-gray/40 rounded-xl p-4 text-center cursor-pointer hover:border-brand-blue hover:bg-brand-blue-50/30 transition-all block"
                  >
                    <div className="text-[13px] font-semibold text-brand-dark">{car.name}</div>
                    <div className="text-[11px] text-brand-gray-medium mt-1">{car.bolt} · {car.count} annonser</div>
                  </a>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
