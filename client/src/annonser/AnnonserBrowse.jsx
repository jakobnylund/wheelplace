import { useState } from 'react';

/* ── Filter section (matches production: border-bottom dividers, not cards) ── */

function FilterSection({ title, defaultOpen = true, onClear, children }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-brand-gray/40 pb-4 mb-4 last:border-none last:mb-0 last:pb-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between bg-transparent border-none cursor-pointer p-0 mb-3"
      >
        <span className="text-sm font-bold text-brand-dark">{title}</span>
        <div className="flex items-center gap-2">
          {onClear && (
            <span
              onClick={(e) => { e.stopPropagation(); onClear(); }}
              className="text-[11px] text-brand-blue hover:text-brand-blue-dark cursor-pointer"
            >
              Rensa
            </span>
          )}
          <svg
            className={`w-4 h-4 text-brand-gray-medium transition-transform ${open ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      {open && children}
    </div>
  );
}

function CheckOption({ label, count, checked = false }) {
  const [on, setOn] = useState(checked);
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <input
        type="checkbox"
        checked={on}
        onChange={() => setOn(!on)}
        className="w-4 h-4 rounded border-brand-gray text-brand-blue accent-brand-blue"
      />
      <span className="flex-1 text-[13px] text-brand-dark/80 group-hover:text-brand-dark">{label}</span>
      {count && <span className="text-[12px] text-brand-gray-medium">{count}</span>}
    </label>
  );
}

function DiamChip({ size, active = false, compat = false }) {
  const [on, setOn] = useState(active);
  return (
    <button
      onClick={() => setOn(!on)}
      className={`w-9 h-9 rounded-lg text-[12px] font-semibold border-[1.5px] transition-all cursor-pointer flex items-center justify-center ${
        on
          ? 'border-brand-blue text-brand-blue bg-brand-blue-50'
          : compat
          ? 'border-brand-green/40 text-brand-green bg-brand-gray-light hover:border-brand-green'
          : 'border-brand-gray/50 text-brand-gray-medium hover:border-brand-gray'
      }`}
    >
      {size}"
    </button>
  );
}

function FilterChip({ label }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium border border-brand-blue-100 bg-brand-blue-50 text-brand-blue">
      {label}
      <button className="text-brand-blue/50 hover:text-brand-blue cursor-pointer text-[15px] leading-none">&times;</button>
    </span>
  );
}

/* ── Listing card (matches production exactly) ─────────── */

function ListingCard({ title, meta, specs, price, location, condition, compat, image }) {
  return (
    <a
      href="#"
      className="group bg-white rounded-xl border border-brand-gray/40 overflow-hidden hover:shadow-lg hover:border-brand-gray transition-all duration-200 block"
    >
      {/* Image — 4:3 aspect, matching production */}
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-gray-light">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Condition badge — top left */}
        {condition === 'new' && (
          <span className="absolute top-3 left-3 text-[11px] font-bold px-2 py-0.5 rounded-md bg-brand-blue text-white">
            Nya
          </span>
        )}
        {condition === 'used' && (
          <span className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-brand-dark/70 text-white uppercase tracking-wide">
            Begagnat
          </span>
        )}

        {/* Compat ribbon — bottom */}
        {compat && (
          <div className="absolute bottom-0 inset-x-0 bg-brand-green text-white text-[11px] font-bold py-1.5 text-center tracking-wide">
            Passar din bil
          </div>
        )}

        {/* Favorite button */}
        <button
          onClick={(e) => e.preventDefault()}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors border-none cursor-pointer"
        >
          <svg className="w-[18px] h-[18px] text-brand-dark/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="text-[15px] font-bold text-brand-dark leading-snug mb-1.5 line-clamp-2">
          {title}
        </h3>

        <p className="text-[13px] text-brand-gray-medium mb-3">
          {specs}
        </p>

        {/* Seller + location row */}
        <div className="flex items-center justify-between mb-3 pt-3 border-t border-brand-gray/30">
          <div className="flex items-center gap-1.5">
            <span className="text-[13px] text-brand-dark">{meta}</span>
            <svg className="w-4 h-4 text-brand-green flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex items-center gap-1 text-brand-gray-medium">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span className="text-xs">{location}</span>
          </div>
        </div>

        <p className="text-lg font-bold text-brand-blue">{price}</p>
      </div>
    </a>
  );
}

/* ── Category tabs ─────────────────────────────────────── */

const categories = [
  { id: 'alla', label: 'Alla', count: '1 783' },
  { id: 'falgar', label: 'Fälgar', count: '612' },
  { id: 'komplett', label: 'Kompletta hjul', count: '894' },
  { id: 'dack', label: 'Däck', count: '277' },
  { id: 'vinter', label: 'Vinterdäck', count: '341' },
  { id: 'sommar', label: 'Sommardäck', count: '158' },
];

/* ── Sample listings ───────────────────────────────────── */

const sampleListings = [
  { title: 'Coventry Hjul (Jaguar) Good Year Eagle 245/45 R18', meta: 'AutoCenter AB', specs: '245/45R18 · Ca 6 mm · Begagnade - Bra skick', price: '22 000 kr', location: 'Västra Götalands län', condition: 'used', compat: true, image: '/listings/listing-coventry-1.avif' },
  { title: 'Nissan Qashqai originalfälgar 225/45 R19 med TPMS', meta: 'DäckHuset i Göteborg', specs: '225/45R19 · 4–7 mm · Begagnade - Bra skick', price: '5 900 kr', location: 'Jönköpings län', condition: 'used', compat: true, image: '/listings/listing-nissan-1.avif' },
  { title: 'Vinterhjul Audi Q3 17" Nya Goodyear friktion', meta: 'Svenstigs Bil AB', specs: '215/65R17 · Nya · Nya', price: '15 000 kr', location: 'Jönköpings län', condition: 'new', compat: false, image: '/listings/listing-audi-1.avif' },
  { title: 'Audi A6 originalfälgar 19" med sommardäck', meta: 'HjulHandlaren', specs: '19" · 5×112 · ET40 · Begagnade - Mycket bra skick', price: '14 500 kr', location: 'Uppsala län', condition: 'used', compat: true, image: '/listings/listing-audi2-1.avif' },
  { title: 'BMW 3-serie 18" M Sport komplett vinter', meta: 'LuxWheels AB', specs: '18" · 5×120 · ET45 · 8J · Nya', price: '28 000 kr', location: 'Stockholms län', condition: 'new', compat: false, image: '/listings/listing-bmw-1.avif' },
  { title: 'Kia EV6 original 19" med sommardäck', meta: 'PrivatAnvändare', specs: '19" · 5×114.3 · ET55 · Begagnade - Bra skick', price: '8 800 kr', location: 'Västmanlands län', condition: 'used', compat: true, image: '/listings/listing-kia-1.avif' },
  { title: 'Nissan Qashqai 17" stålfälgar vinterdäck', meta: 'NordicWheels', specs: '17" · 5×114.3 · ET40 · Begagnade - Bra skick', price: '4 200 kr', location: 'Östergötlands län', condition: 'used', compat: true, image: '/listings/listing-nissan2-1.avif' },
  { title: 'Seat Leon 18" Cupra fälgar sommar', meta: 'TireShop Sthlm', specs: '18" · 5×112 · ET45 · 8J · Begagnade', price: '8 900 kr', location: 'Stockholms län', condition: 'used', compat: false, image: '/listings/listing-seat-1.avif' },
  { title: 'Audi e-tron 20" original vinterhjul', meta: 'DäckCenter Nord', specs: '20" · 5×112 · ET36 · Nya', price: '16 400 kr', location: 'Västerbottens län', condition: 'new', compat: true, image: '/listings/listing-etron-1.avif' },
];

/* ── Car spec layer ────────────────────────────────────── */

function CarSpecLayer({ visible }) {
  const [motor, setMotor] = useState('D4');
  if (!visible) return null;

  return (
    <div className="bg-white border-b border-brand-gray/40">
      <div className="px-5 sm:px-8">
        <div className="max-w-site mx-auto py-3.5 flex items-stretch gap-0 overflow-x-auto">
          {/* Plate */}
          <div className="flex flex-col items-center justify-center gap-1.5 pr-5 border-r border-brand-gray/30 shrink-0">
            <span className="bg-yellow-200 border-2 border-yellow-500 rounded-md px-3.5 py-1 text-[17px] font-black tracking-[3px] font-mono text-brand-dark">
              PKE23J
            </span>
            <button className="text-[11px] text-brand-gray-medium underline hover:text-brand-blue cursor-pointer">
              ✕ rensa
            </button>
          </div>

          {/* Car info */}
          <div className="px-5 border-r border-brand-gray/30 shrink-0">
            <div className="flex items-center gap-2 text-[15px] font-bold text-brand-dark">
              Volvo XC60 {motor}
              <span className="text-[11px] font-semibold bg-brand-gray-light text-brand-green px-2 py-0.5 rounded-full">✓ Verifierad</span>
            </div>
            <p className="text-[12px] text-brand-gray-medium mt-0.5">Diesel 190hk · AWD · Momentum · 2018</p>
            <div className="flex gap-1.5 mt-2 flex-wrap">
              <span className="bg-brand-blue-50 border border-brand-blue-100 rounded-md px-2.5 py-0.5 text-[11px] font-semibold text-brand-blue">🔒 5×108</span>
              <span className="bg-brand-blue-50 border border-brand-blue-100 rounded-md px-2.5 py-0.5 text-[11px] font-semibold text-brand-blue">Navhål 63.4mm</span>
              <span className="bg-brand-gray-light border border-brand-gray/30 rounded-md px-2.5 py-0.5 text-[11px] font-medium text-brand-dark">ET 40–50.5mm</span>
            </div>
          </div>

          {/* Sizes */}
          <div className="px-5 border-r border-brand-gray/30 shrink-0">
            <p className="text-[10px] font-bold text-brand-gray-medium uppercase tracking-wide mb-1.5">Tillåtna storlekar</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
              {['235/65R17', '235/60R18', '235/55R19', '255/45R20', '255/40R21', '265/35R22'].map((s) => (
                <div key={s} className="flex items-center gap-1.5 text-[11px] text-brand-dark">
                  <span className="w-[5px] h-[5px] rounded-full bg-brand-blue shrink-0" />
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Motor chips */}
          <div className="pl-5 shrink-0">
            <p className="text-[10px] font-bold text-brand-gray-medium uppercase tracking-wide mb-1.5">Motorvariant</p>
            <div className="flex gap-1.5 flex-wrap">
              {[
                { id: 'T5', label: 'T5' },
                { id: 'D4', label: 'D4' },
                { id: 'D5', label: 'D5' },
                { id: 'T6', label: 'T6' },
                { id: 'T8', label: 'T8', warn: 'min 19"' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMotor(m.id)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-semibold border-[1.5px] transition-all cursor-pointer ${
                    motor === m.id
                      ? 'bg-brand-blue text-white border-brand-blue'
                      : 'bg-white text-brand-dark border-brand-gray/40 hover:border-brand-blue/40'
                  }`}
                >
                  {m.label}
                  {m.warn && <span className="block text-[9px] font-normal opacity-80">{m.warn}</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main page ─────────────────────────────────────────── */

export default function AnnonserBrowse() {
  const [activeTab, setActiveTab] = useState('alla');
  const [carMode, setCarMode] = useState(false);
  const [regInput, setRegInput] = useState('');

  return (
    <div className="min-h-screen bg-brand-gray-light">
      {/* Car spec layer */}
      <CarSpecLayer visible={carMode} />

      {/* Compat notice */}
      {carMode && (
        <div className="bg-brand-gray-light border-b border-brand-gray/40">
          <div className="px-5 sm:px-8">
            <div className="max-w-site mx-auto py-2.5 text-[13px] text-brand-dark flex items-center gap-2">
              <svg className="w-4 h-4 text-brand-green shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              Visar <strong className="text-brand-dark mx-1">347 kompatibla annonser</strong> för Volvo XC60 D4 — filtrerat på 5×108 och tillåtna dimensioner
            </div>
          </div>
        </div>
      )}

      {/* Page header — matches production exactly */}
      <div className="bg-white border-b border-brand-gray/40">
        <div className="px-5 sm:px-8">
          <div className="max-w-site mx-auto py-6">
            <div className="flex items-center gap-2 text-sm text-brand-gray-medium mb-2">
              <a href="/" className="hover:text-brand-blue transition-colors">Hem</a>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-brand-dark">Annonser</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-brand-dark">
              {carMode ? 'Annonser för Volvo XC60 D4' : 'Alla annonser'}
            </h1>
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="bg-white border-b border-brand-gray/40">
        <div className="px-5 sm:px-8">
          <div className="max-w-site mx-auto flex overflow-x-auto -mb-px">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-5 py-3.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                  activeTab === cat.id
                    ? 'text-brand-blue border-brand-blue'
                    : 'text-brand-gray-medium border-transparent hover:text-brand-dark'
                }`}
              >
                {cat.label}
                <span
                  className={`text-[11px] font-medium px-1.5 py-0.5 rounded-full ${
                    activeTab === cat.id ? 'bg-brand-blue-50 text-brand-blue' : 'bg-brand-gray-light text-brand-gray-medium'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main layout — same structure as production */}
      <div className="px-5 sm:px-8">
        <div className="max-w-site mx-auto py-6">
          <div className="flex gap-6">
            {/* Sidebar — single white card like production */}
            <aside className="w-[280px] flex-shrink-0 hidden lg:block">
              <div className="bg-white rounded-xl border border-brand-gray/40 p-5">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-base font-bold text-brand-dark">Filter</h2>
                  <button className="text-xs text-brand-blue hover:text-brand-blue-dark bg-transparent border-none cursor-pointer font-medium">
                    Återställ allt
                  </button>
                </div>

                {/* Bilmärke */}
                <FilterSection title="Bilmärke" onClear={() => {}}>
                  <input
                    type="text"
                    placeholder="Sök märke..."
                    className="w-full border border-brand-gray/60 rounded-lg px-3 py-2 text-[13px] text-brand-dark bg-white outline-none mb-2 placeholder:text-brand-gray-medium"
                  />
                  <div className="max-h-40 overflow-y-auto space-y-1.5">
                    <CheckOption label="BMW" count="148" />
                    <CheckOption label="Mercedes" count="97" checked />
                    <CheckOption label="Volvo" count="143" />
                    <CheckOption label="Audi" count="88" />
                    <CheckOption label="Volkswagen" count="76" />
                    <CheckOption label="Tesla" count="42" />
                  </div>
                </FilterSection>

                {/* Produkt */}
                <FilterSection title="Produkt" onClear={() => {}}>
                  <div className="space-y-1.5">
                    <CheckOption label="Kompletta hjul" count="894" />
                    <CheckOption label="Däck" count="277" />
                    <CheckOption label="Fälg" count="612" />
                  </div>
                </FilterSection>

                {/* Diameter */}
                <FilterSection title="Diameter" onClear={() => {}}>
                  <div className="flex flex-wrap gap-1.5">
                    {[15, 16, 17, 18, 19, 20, 21, 22].map((d) => (
                      <DiamChip key={d} size={d} active={d === 18 || d === 19} compat={d >= 17 && d <= 22} />
                    ))}
                  </div>
                </FilterSection>

                {/* Bultcirkel */}
                <FilterSection title="Bultcirkel" defaultOpen={false} onClear={() => {}}>
                  <div className="space-y-1.5">
                    <CheckOption label="5×112" count="231" />
                    <CheckOption label="5×108" count="187" />
                    <CheckOption label="5×120" count="109" />
                    <CheckOption label="4×108" count="64" />
                    <CheckOption label="5×114.3" count="58" />
                  </div>
                </FilterSection>

                {/* Skick */}
                <FilterSection title="Skick" defaultOpen={false} onClear={() => {}}>
                  <div className="space-y-1.5">
                    <CheckOption label="Nya" count="203" />
                    <CheckOption label="Begagnade - Bra skick" count="289" />
                    <CheckOption label="Begagnade - Ok skick" count="120" />
                  </div>
                </FilterSection>

                {/* Pris */}
                <FilterSection title="Pris" defaultOpen={false}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[13px] text-brand-dark font-medium">0 kr</span>
                    <span className="text-[13px] text-brand-dark font-medium">50k+ kr</span>
                  </div>
                  <div className="relative h-10 flex items-center">
                    <div className="absolute left-0 right-0 h-1.5 rounded-full bg-brand-gray/40" />
                    <div className="absolute h-1.5 rounded-full bg-brand-blue" style={{ left: '0%', right: '40%' }} />
                    <div className="absolute w-5 h-5 rounded-full bg-white border-2 border-brand-blue shadow-sm cursor-grab" style={{ left: '0%' }} />
                    <div className="absolute w-5 h-5 rounded-full bg-white border-2 border-brand-blue shadow-sm cursor-grab" style={{ left: '60%' }} />
                  </div>
                </FilterSection>

                {/* Län */}
                <FilterSection title="Län" defaultOpen={false} onClear={() => {}}>
                  <div className="max-h-40 overflow-y-auto space-y-1.5">
                    <CheckOption label="Stockholms län" count="198" />
                    <CheckOption label="Västra Götalands län" count="134" />
                    <CheckOption label="Skåne län" count="89" />
                    <CheckOption label="Uppsala län" count="44" />
                  </div>
                </FilterSection>
              </div>
            </aside>

            {/* Content */}
            <main className="flex-1 min-w-0">
              {/* Search area — white card like production */}
              <div className="bg-white rounded-xl border border-brand-gray/40 p-4 mb-5 space-y-3">
                {/* Text search */}
                <div className="flex items-center bg-brand-gray-light rounded-xl border border-brand-gray/60 focus-within:border-brand-blue transition-colors">
                  <input
                    type="text"
                    placeholder="Sök annonser..."
                    className="flex-1 bg-transparent text-sm text-brand-dark placeholder:text-brand-gray-medium outline-none px-4 py-3"
                  />
                  <button className="flex items-center justify-center w-10 h-10 mr-1 rounded-lg bg-brand-blue hover:bg-brand-blue-dark text-white transition-colors cursor-pointer border-none">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </button>
                </div>

                {/* Plate search row */}
                <div className="flex items-center bg-white rounded-xl border border-brand-gray/60 focus-within:border-brand-blue transition-colors overflow-hidden">
                  <div className="w-10 h-10 bg-[#003399] flex items-center justify-center text-white text-[10px] font-bold shrink-0 ml-1 rounded-lg">
                    <div className="text-center leading-tight">
                      <div className="text-[7px] text-yellow-400">★</div>
                      <div>S</div>
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder="ABC 123"
                    maxLength={7}
                    className="flex-1 bg-transparent text-sm text-brand-dark placeholder:text-brand-gray-medium outline-none px-3 py-3 font-mono font-bold tracking-widest uppercase"
                  />
                  <button className="flex items-center justify-center w-10 h-10 mr-1 rounded-lg bg-brand-blue hover:bg-brand-blue-dark text-white transition-colors cursor-pointer border-none">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </button>
                </div>

                {/* Advanced search link */}
                <button className="text-[13px] text-brand-gray-medium hover:text-brand-blue cursor-pointer bg-transparent border-none w-full text-center">
                  + Avancerad sökning
                </button>
              </div>

              {/* Results header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <p className="text-[14px] text-brand-dark">
                    <strong>{activeTab === 'alla' ? '1 783' : '612'}</strong>
                    <span className="text-brand-gray-medium ml-1">resultat</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] text-brand-gray-medium">Sortera efter:</span>
                  <select className="px-3 py-2 border border-brand-gray/50 rounded-lg text-[13px] bg-white cursor-pointer outline-none focus:border-brand-blue font-medium text-brand-dark">
                    <option>Nyast först</option>
                    <option>Pris: Lägst först</option>
                    <option>Pris: Högst först</option>
                    <option>Relevans</option>
                  </select>
                </div>
              </div>

              {/* Active filter chips */}
              <div className="flex gap-2 flex-wrap mb-5 items-center">
                <FilterChip label="Fälgar" />
                <FilterChip label="Mercedes" />
                <FilterChip label="18&quot;" />
                <FilterChip label="19&quot;" />
                <button className="text-[13px] text-brand-gray-medium hover:text-brand-blue cursor-pointer bg-transparent border-none ml-1">
                  Rensa alla filter
                </button>
              </div>

              {/* Listing grid — 3 cols like production */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {sampleListings.map((listing, i) => (
                  <ListingCard key={i} {...listing} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-2 mt-8">
                {[1, 2, 3, 4, '...', 51].map((p, i) => (
                  <button
                    key={i}
                    className={`min-w-[36px] h-9 flex items-center justify-center rounded-lg text-[14px] font-medium transition-all cursor-pointer ${
                      p === 1
                        ? 'bg-brand-blue text-white'
                        : p === '...'
                        ? 'text-brand-gray-medium cursor-default'
                        : 'bg-white text-brand-gray-medium border border-brand-gray/40 hover:border-brand-blue hover:text-brand-blue'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
