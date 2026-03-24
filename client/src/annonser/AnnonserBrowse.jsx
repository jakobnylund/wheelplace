import { useState } from 'react';

/* ── Shared small components ───────────────────────────── */

function FilterSection({ title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-xl border border-brand-gray/40 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3.5 py-3 text-[13px] font-semibold text-brand-dark cursor-pointer select-none"
      >
        {title}
        <img
          src="/icons/chevron-down.svg"
          alt=""
          className={`w-3.5 h-3.5 opacity-40 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <div className="px-3.5 pb-3.5">{children}</div>}
    </div>
  );
}

function CheckOption({ label, count, checked = false }) {
  const [on, setOn] = useState(checked);
  return (
    <label className="flex items-center gap-2 py-1 text-[13px] cursor-pointer group">
      <input
        type="checkbox"
        checked={on}
        onChange={() => setOn(!on)}
        className="w-[15px] h-[15px] accent-brand-blue rounded"
      />
      <span className="flex-1 text-brand-dark group-hover:text-brand-blue transition-colors">{label}</span>
      <span className="text-[11px] text-brand-gray-medium">{count}</span>
    </label>
  );
}

function DiamChip({ size, active = false, compat = false }) {
  const [on, setOn] = useState(active);
  return (
    <button
      onClick={() => setOn(!on)}
      className={`px-2.5 py-1 rounded-full text-[12px] font-medium border-[1.5px] transition-all duration-150 cursor-pointer ${
        on
          ? 'border-brand-blue text-brand-blue bg-brand-blue-50'
          : compat
          ? 'border-brand-green/40 text-green-700 hover:border-brand-green'
          : 'border-brand-gray/60 text-brand-gray-medium hover:border-brand-blue/40'
      }`}
    >
      {size}"
    </button>
  );
}

function FilterChip({ label, color = 'blue' }) {
  const styles =
    color === 'green'
      ? 'bg-green-50 border-green-200 text-green-700'
      : 'bg-brand-blue-50 border-brand-blue-100 text-brand-blue';
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium border ${styles}`}>
      {label}
      <button className="text-[13px] leading-none opacity-60 hover:opacity-100 cursor-pointer">&times;</button>
    </span>
  );
}

/* ── Listing card ──────────────────────────────────────── */

function ListingCard({ title, meta, specs, price, location, condition, compat }) {
  const [liked, setLiked] = useState(false);

  return (
    <a href="#" className="group block bg-white rounded-xl border border-brand-gray/40 overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
      {/* Image */}
      <div className="relative aspect-square bg-gradient-to-br from-brand-gray-light to-brand-gray/30 flex items-center justify-center overflow-hidden">
        {/* Placeholder wheel */}
        <div className="w-24 h-24 rounded-full border-[6px] border-brand-gray/50 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-[3px] border-brand-gray/40" />
        </div>

        {/* Badges */}
        {condition === 'new' && (
          <span className="absolute top-2.5 left-2.5 bg-brand-green text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide">
            Nytt
          </span>
        )}
        {condition === 'used' && (
          <span className="absolute top-2.5 left-2.5 bg-brand-gray-medium text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide">
            Begagnat
          </span>
        )}
        {compat && (
          <span className="absolute bottom-0 inset-x-0 bg-brand-green/90 text-white text-[10px] font-bold py-1 text-center tracking-wide">
            Passar din bil
          </span>
        )}

        {/* Heart */}
        <button
          onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
          className="absolute top-2.5 right-2.5 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors cursor-pointer"
        >
          <img src="/icons/heart.svg" alt="" className={`w-4 h-4 ${liked ? 'opacity-100' : 'opacity-40'}`} />
        </button>
      </div>

      {/* Body */}
      <div className="p-3">
        <h3 className="text-[13px] font-semibold text-brand-dark leading-snug line-clamp-2 mb-1 group-hover:text-brand-blue transition-colors">
          {title}
        </h3>
        <p className="text-[12px] text-brand-gray-medium mb-2">{specs}</p>
        <div className="flex items-center gap-1.5 text-[12px] text-brand-dark mb-1">
          <span className="w-2 h-2 rounded-full bg-brand-green shrink-0" />
          {meta}
        </div>
        <div className="flex items-center gap-1 text-[12px] text-brand-gray-medium mb-2.5">
          <img src="/icons/location-pin.svg" alt="" className="w-3.5 h-3.5 opacity-50" />
          {location}
        </div>
        <p className="text-[16px] font-bold text-brand-blue">{price}</p>
      </div>
    </a>
  );
}

/* ── Category tabs ─────────────────────────────────────── */

const categories = [
  { id: 'alla', label: 'Alla', count: '1 783' },
  { id: 'falgar', label: 'Falgar', count: '612' },
  { id: 'komplett', label: 'Kompletta hjul', count: '894' },
  { id: 'dack', label: 'Dack', count: '277' },
  { id: 'vinter', label: 'Vinterdack', count: '341' },
  { id: 'sommar', label: 'Sommardack', count: '158' },
];

/* ── Sample listings ───────────────────────────────────── */

const sampleListings = [
  { title: 'Mercedes AMG 19" 5x112 ET35', meta: 'AutoCenter AB', specs: '19" · 5x112 · ET35 · 8.5J', price: '7 500 kr', location: 'Stockholm', condition: 'used', compat: true },
  { title: 'OEM Mercedes 18" AMG-linje', meta: 'DackHuset i Goteborg', specs: '18" · 5x112 · ET48 · 8J', price: '12 000 kr', location: 'Goteborg', condition: 'new', compat: true },
  { title: 'Mercedes 19" Multispoke GLC', meta: 'PrivatAnvandare', specs: '19" · 5x112 · ET44 · 8J', price: '9 900 kr', location: 'Malmo', condition: 'used', compat: false },
  { title: '19" Forged Aluett 5x112', meta: 'HjulHandlaren', specs: '19" · 5x112 · ET40', price: '14 500 kr', location: 'Uppsala', condition: 'used', compat: true },
  { title: 'Mercedes 22" S-klass OEM-design', meta: 'LuxWheels AB', specs: '22" · 5x112 · ET50 · 10J', price: '28 000 kr', location: 'Stockholm', condition: 'new', compat: false },
  { title: '18" Mercedes C43 AMG 4-ek', meta: 'PrivatAnvandare', specs: '18" · 5x112 · ET43', price: '4 800 kr', location: 'Vasteras', condition: 'used', compat: true },
  { title: 'Volvo XC60 Original 19" vinter', meta: 'NordicWheels', specs: '19" · 5x108 · ET42.5 · 8J', price: '11 200 kr', location: 'Linkoping', condition: 'used', compat: true },
  { title: 'Kompletta sommarhjul BMW 18"', meta: 'TireShop Sthlm', specs: '18" · 5x120 · ET45 · 8J · Michelin', price: '8 900 kr', location: 'Stockholm', condition: 'used', compat: false },
  { title: 'Nokian Hakkapeliitta 10 235/55R19', meta: 'DackCenter Nord', specs: '235/55R19 · 8mm · Vinter', price: '6 400 kr', location: 'Umea', condition: 'new', compat: true },
];

/* ── Car spec layer ────────────────────────────────────── */

function CarSpecLayer({ visible }) {
  const [motor, setMotor] = useState('D4');
  if (!visible) return null;

  return (
    <div className="bg-white border-b-2 border-brand-gray/30">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-3.5 flex items-stretch gap-0 overflow-x-auto">
        {/* Plate */}
        <div className="flex flex-col items-center justify-center gap-1.5 pr-5 border-r border-brand-gray/30 shrink-0">
          <span className="bg-yellow-200 border-2 border-yellow-500 rounded-md px-3.5 py-1 text-[17px] font-black tracking-[3px] font-mono text-brand-dark">
            PKE23J
          </span>
          <button className="text-[11px] text-brand-gray-medium underline hover:text-red-500 cursor-pointer">
            Rensa
          </button>
        </div>

        {/* Car info */}
        <div className="px-5 border-r border-brand-gray/30 shrink-0">
          <div className="flex items-center gap-2 text-[15px] font-bold text-brand-dark">
            Volvo XC60 {motor}
            <span className="text-[11px] font-semibold bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Verifierad</span>
          </div>
          <p className="text-[12px] text-brand-gray-medium mt-0.5">Diesel 190hk · AWD · Momentum · 2018</p>
          <div className="flex gap-1.5 mt-2 flex-wrap">
            <span className="bg-brand-blue-50 border border-brand-blue-100 rounded-md px-2.5 py-1 text-[11px] font-semibold text-brand-blue">
              5x108
            </span>
            <span className="bg-brand-blue-50 border border-brand-blue-100 rounded-md px-2.5 py-1 text-[11px] font-semibold text-brand-blue">
              Navhal 63.4mm
            </span>
            <span className="bg-brand-gray-light border border-brand-gray/40 rounded-md px-2.5 py-1 text-[11px] font-medium text-brand-dark">
              ET 40–50.5mm
            </span>
          </div>
        </div>

        {/* Sizes */}
        <div className="px-5 border-r border-brand-gray/30 shrink-0">
          <p className="text-[10px] font-bold text-brand-gray-medium uppercase tracking-wide mb-1.5">Tillatna storlekar</p>
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
  );
}

/* ── Main page ─────────────────────────────────────────── */

export default function AnnonserBrowse() {
  const [activeTab, setActiveTab] = useState('alla');
  const [carMode, setCarMode] = useState(false);
  const [regInput, setRegInput] = useState('');

  return (
    <>
      {/* Car spec layer */}
      <CarSpecLayer visible={carMode} />

      {/* Compat notice */}
      {carMode && (
        <div className="bg-green-50 border-b border-green-200 px-5 md:px-8 py-2.5 text-[13px] text-green-700 flex items-center gap-2">
          <img src="/icons/check-circle.svg" alt="" className="w-4 h-4" />
          Visar <strong className="text-green-800">347 kompatibla annonser</strong> for Volvo XC60 D4 — filtrerat pa 5x108 och tillatna dimensioner
        </div>
      )}

      {/* Breadcrumb */}
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 pt-4 pb-1">
        <nav className="text-[13px] text-brand-gray-medium flex items-center gap-1.5">
          <a href="/" className="hover:text-brand-blue transition-colors">Hem</a>
          <span className="text-brand-gray">›</span>
          <span className="text-brand-dark font-medium">Annonser</span>
        </nav>
      </div>

      <h1 className="max-w-[1280px] mx-auto px-5 md:px-8 text-[22px] font-bold text-brand-dark font-heading">
        {carMode ? 'Annonser for Volvo XC60 D4' : 'Alla annonser'}
      </h1>

      {/* Category tabs */}
      <div className="bg-white border-b border-brand-gray/30 mt-3">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 flex overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-3 text-[13px] font-semibold whitespace-nowrap border-b-2 -mb-px transition-colors cursor-pointer ${
                activeTab === cat.id
                  ? 'text-brand-blue border-brand-blue'
                  : 'text-brand-gray-medium border-transparent hover:text-brand-blue'
              }`}
            >
              {cat.label}
              <span
                className={`text-[11px] font-medium px-1.5 py-px rounded-full ${
                  activeTab === cat.id ? 'bg-brand-blue-50 text-brand-blue' : 'bg-brand-gray-light text-brand-gray-medium'
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-5 flex gap-5">
        {/* Sidebar */}
        <aside className="w-[240px] shrink-0 hidden lg:flex flex-col gap-2.5">
          {/* Sidebar header */}
          <div className="flex items-center justify-between pb-1">
            <span className="text-[15px] font-bold text-brand-dark">Filter</span>
            <button className="text-[13px] text-brand-blue hover:underline cursor-pointer">Aterstall</button>
          </div>

          {/* Reg number card */}
          <div className="bg-gradient-to-br from-brand-blue-dark to-brand-blue rounded-xl p-4 text-white">
            <h4 className="text-[13px] font-semibold mb-2">Sok via regnummer</h4>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="ABC123"
                maxLength={7}
                value={regInput}
                onChange={(e) => setRegInput(e.target.value.toUpperCase())}
                className="flex-1 px-2.5 py-2 rounded-lg text-[14px] font-bold tracking-widest uppercase font-mono text-brand-dark placeholder:font-sans placeholder:font-normal placeholder:tracking-normal placeholder:text-[13px]"
              />
              <button
                onClick={() => setCarMode(true)}
                className="px-3 py-2 bg-white text-brand-blue rounded-lg text-[13px] font-bold hover:bg-brand-gray-light transition-colors cursor-pointer"
              >
                Sok
              </button>
            </div>
            <p className="text-[11px] mt-2 opacity-80">Hittar kompatibla falgar, dack och hjul for din bil</p>
          </div>

          {/* Filters */}
          <FilterSection title="Bilmarke" defaultOpen>
            <input
              type="text"
              placeholder="Sok marke..."
              className="w-full px-2.5 py-[7px] border border-brand-gray/50 rounded-lg text-[13px] mb-2 outline-none focus:border-brand-blue transition-colors"
            />
            <CheckOption label="BMW" count="148" />
            <CheckOption label="Mercedes" count="97" checked />
            <CheckOption label="Volvo" count="143" />
            <CheckOption label="Audi" count="88" />
            <CheckOption label="Volkswagen" count="76" />
            <CheckOption label="Tesla" count="42" />
          </FilterSection>

          <FilterSection title="Diameter" defaultOpen>
            <div className="flex flex-wrap gap-1.5">
              {[15, 16, 17, 18, 19, 20, 21, 22].map((d) => (
                <DiamChip key={d} size={d} active={d === 18 || d === 19} compat={d >= 17 && d <= 22} />
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Bultcirkel">
            <CheckOption label="5x112" count="231" />
            <CheckOption label="5x108" count="187" />
            <CheckOption label="5x120" count="109" />
            <CheckOption label="4x108" count="64" />
            <CheckOption label="5x114.3" count="58" />
          </FilterSection>

          <FilterSection title="Skick">
            <CheckOption label="Nytt" count="203" />
            <CheckOption label="Begagnat — gott skick" count="289" />
            <CheckOption label="Begagnat — slitet" count="120" />
          </FilterSection>

          <FilterSection title="Pris (kr)">
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                className="flex-1 px-2.5 py-[7px] border border-brand-gray/50 rounded-lg text-[13px] outline-none focus:border-brand-blue"
              />
              <input
                type="number"
                placeholder="Max"
                className="flex-1 px-2.5 py-[7px] border border-brand-gray/50 rounded-lg text-[13px] outline-none focus:border-brand-blue"
              />
            </div>
          </FilterSection>

          <FilterSection title="Lan">
            <input
              type="text"
              placeholder="Sok lan..."
              className="w-full px-2.5 py-[7px] border border-brand-gray/50 rounded-lg text-[13px] mb-2 outline-none focus:border-brand-blue"
            />
            <CheckOption label="Stockholms lan" count="198" />
            <CheckOption label="Vastra Gotaland" count="134" />
            <CheckOption label="Skane" count="89" />
            <CheckOption label="Uppsala" count="44" />
          </FilterSection>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">
          {/* Results header */}
          <div className="flex items-center justify-between mb-3.5">
            <p className="text-[14px] text-brand-gray-medium">
              <strong className="text-brand-dark">612 annonser</strong> — Falgar
            </p>
            <select className="px-3 py-2 border border-brand-gray/50 rounded-lg text-[13px] bg-white cursor-pointer outline-none focus:border-brand-blue">
              <option>Senast inlagda</option>
              <option>Pris: Lagst forst</option>
              <option>Pris: Hogst forst</option>
              <option>Relevans</option>
            </select>
          </div>

          {/* Active filter chips */}
          <div className="flex gap-2 flex-wrap mb-4 items-center">
            <FilterChip label="Falgar" />
            <FilterChip label="Mercedes" />
            <FilterChip label="18&quot;" />
            <FilterChip label="19&quot;" />
            {carMode && <FilterChip label="5x108" color="green" />}
            <button className="text-[12px] text-brand-blue hover:underline ml-1 cursor-pointer">Rensa alla filter</button>
          </div>

          {/* Listing grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5">
            {sampleListings.map((listing, i) => (
              <ListingCard key={i} {...listing} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-8">
            {[1, 2, 3, 4, '...', 51].map((p, i) => (
              <button
                key={i}
                className={`min-w-[36px] h-9 flex items-center justify-center rounded-lg text-[13px] font-medium border-[1.5px] transition-all cursor-pointer ${
                  p === 1
                    ? 'bg-brand-blue text-white border-brand-blue'
                    : p === '...'
                    ? 'border-transparent text-brand-gray-medium cursor-default'
                    : 'bg-white text-brand-gray-medium border-brand-gray/40 hover:border-brand-blue hover:text-brand-blue'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
