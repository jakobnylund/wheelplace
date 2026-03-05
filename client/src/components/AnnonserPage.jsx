import { useState, useRef, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PlateSearch from './ui/PlateSearch';
import mockListings from '../data/mockListings';
import Navbar from './ui/Navbar';
import Footer from './ui/Footer';

/* ─── Filter Data ─── */
const brandOptions = [
  'Aiways', 'Alfa Romeo', 'Audi', 'BMW', 'BYD', 'Chevrolet', 'Citroën', 'Cupra',
  'Dacia', 'DS', 'Fiat', 'Ford', 'Honda', 'Hyundai', 'Jaguar', 'Jeep', 'Kia',
  'Lamborghini', 'Land Rover', 'Lexus', 'Lynk & Co', 'Maserati', 'Mazda',
  'Mercedes', 'MG', 'Mini', 'Mitsubishi', 'Nissan', 'Opel', 'Peugeot',
  'Polestar', 'Porsche', 'Renault', 'Seat', 'Skoda', 'Smart', 'Subaru',
  'Suzuki', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo', 'Xpeng',
];

const productOptions = [
  { value: 'kompletta-hjul', label: 'Kompletta hjul' },
  { value: 'dack', label: 'Däck' },
  { value: 'falg', label: 'Fälg' },
];

const tireTypeOptions = [
  { value: 'sommardack', label: 'Sommardäck' },
  { value: 'vinterdack-friktion', label: 'Vinterdäck friktion' },
  { value: 'vinterdack-dubb', label: 'Vinterdäck dubb' },
  { value: 'r-dack', label: 'R-Däck' },
  { value: 'c-dack', label: 'C-Däck' },
];

const widthOptions = ['135', '145', '155', '165', '175', '185', '195', '205', '215', '225', '235', '245', '255', '265', '275', '285', '295', '305', '315', '325', '335', '345', '355'];
const profileOptions = ['20', '25', '30', '35', '40', '45', '50', '55', '60', '65', '70', '75', '80', '85'];
const diameterOptions = ['12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];

const boltCountOptions = [
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '8', label: '8' },
  { value: 'centrumbult', label: 'Centrumbult' },
];

const boltCircleOptions = ['98', '100', '105', '108', '110', '112', '114.3', '115', '118', '120', '127', '130', '139.7', '150', '160', '170', '180', '205'];

const conditionOptions = [
  { value: 'nya', label: 'Nya' },
  { value: 'mycket-bra', label: 'Begagnade - Mycket bra skick' },
  { value: 'bra', label: 'Begagnade - Bra skick' },
  { value: 'ok', label: 'Begagnade - Ok skick' },
  { value: 'atgard', label: 'Begagnade - Kräver åtgärd' },
];

const hubBoreOptions = ['54.1', '56.1', '56.6', '57.1', '60.1', '63.3', '63.4', '64.1', '65.1', '66.1', '66.5', '66.6', '67.1', '71.5', '72.5', '72.6', '73.1', '74.1', '78.1', '84.1', '87', '93.1', '95.3', '100', '106', '110', '161'];

const rimTypeOptions = [
  { value: 'original', label: 'Original' },
  { value: 'eftermarknad', label: 'Eftermarknad' },
];

const rimWidthOptions = ['4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13'];

const locationOptions = [
  'Blekinge', 'Dalarna', 'Gotland', 'Gävleborg', 'Halland',
  'Jämtland', 'Jönköping', 'Kalmar', 'Kronoberg', 'Norrbotten',
  'Skåne', 'Stockholm', 'Södermanland', 'Uppsala', 'Värmland',
  'Västerbotten', 'Västernorrland', 'Västmanland', 'Västra Götaland',
  'Örebro', 'Östergötland',
];

/* ─── Filter Components ─── */
function FilterSection({ title, children, defaultOpen = true, onClear }) {
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

function CheckboxGroup({ options, selected, onChange }) {
  return (
    <div className="space-y-2">
      {options.map((opt) => {
        const value = typeof opt === 'string' ? opt : opt.value;
        const label = typeof opt === 'string' ? opt : opt.label;
        return (
          <label key={value} className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              checked={selected.includes(value)}
              onChange={() => onChange(value)}
              className="w-4 h-4 rounded border-brand-gray text-brand-blue accent-brand-blue"
            />
            <span className="text-[13px] text-brand-dark/80 group-hover:text-brand-dark">{label}</span>
          </label>
        );
      })}
    </div>
  );
}

function SelectFilter({ value, onChange, options, placeholder }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-brand-gray/60 rounded-lg px-2.5 py-2 text-[13px] text-brand-dark bg-white outline-none"
    >
      <option value="">{placeholder || 'Alla'}</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );
}

/* ─── Price Range Slider ─── */
function PriceRangeSlider({ min, max, step, valueMin, valueMax, onChange }) {
  const [dragging, setDragging] = useState(null);
  const trackRef = useRef(null);

  const pct = (v) => ((v - min) / (max - min)) * 100;
  const fromPct = (p) => Math.round((p / 100) * (max - min) / step) * step + min;

  const getValueFromEvent = (e) => {
    const rect = trackRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const p = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    return Math.max(min, Math.min(max, fromPct(p)));
  };

  const handlePointerDown = (thumb) => (e) => {
    e.preventDefault();
    setDragging(thumb);
  };

  useEffect(() => {
    if (!dragging) return;
    const handleMove = (e) => {
      const v = getValueFromEvent(e);
      if (dragging === 'min') onChange(Math.min(v, valueMax - step), valueMax);
      else onChange(valueMin, Math.max(v, valueMin + step));
    };
    const handleUp = () => setDragging(null);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, [dragging, valueMin, valueMax]);

  const format = (v) => v === 0 ? '0' : v >= max ? `${(max / 1000).toFixed(0)}k+` : v.toLocaleString('sv-SE');

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[13px] text-brand-dark font-medium">{format(valueMin)} kr</span>
        <span className="text-[13px] text-brand-dark font-medium">{format(valueMax)} kr</span>
      </div>
      <div ref={trackRef} className="relative h-10 flex items-center select-none">
        {/* Track background */}
        <div className="absolute left-0 right-0 h-1.5 rounded-full bg-brand-gray/40" />
        {/* Active range */}
        <div
          className="absolute h-1.5 rounded-full bg-brand-blue"
          style={{ left: `${pct(valueMin)}%`, right: `${100 - pct(valueMax)}%` }}
        />
        {/* Min thumb */}
        <div
          onMouseDown={handlePointerDown('min')}
          onTouchStart={handlePointerDown('min')}
          className="absolute w-5 h-5 rounded-full bg-white border-2 border-brand-blue shadow-sm cursor-grab active:cursor-grabbing -translate-x-1/2 hover:scale-110 transition-transform"
          style={{ left: `${pct(valueMin)}%` }}
        />
        {/* Max thumb */}
        <div
          onMouseDown={handlePointerDown('max')}
          onTouchStart={handlePointerDown('max')}
          className="absolute w-5 h-5 rounded-full bg-white border-2 border-brand-blue shadow-sm cursor-grab active:cursor-grabbing -translate-x-1/2 hover:scale-110 transition-transform"
          style={{ left: `${pct(valueMax)}%` }}
        />
      </div>
    </div>
  );
}

/* ─── Sidebar ─── */
const initialFilters = {
  brand: [],
  product: [],
  tireType: [],
  width: '',
  profile: '',
  diameter: '',
  boltCount: [],
  boltCircle: '',
  condition: [],
  priceMin: '',
  priceMax: '',
  hubBore: '',
  rimType: [],
  rimWidth: '',
  etMin: '',
  etMax: '',
  location: [],
};

function Sidebar({ filters, setFilters }) {
  const toggleFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  const clearField = (key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: Array.isArray(prev[key]) ? [] : '',
    }));
  };

  const [brandSearch, setBrandSearch] = useState('');
  const filteredBrands = brandOptions.filter((b) =>
    b.toLowerCase().includes(brandSearch.toLowerCase())
  );

  return (
    <aside className="w-full lg:w-[280px] flex-shrink-0">
      <div className="bg-white rounded-xl border border-brand-gray/40 p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-brand-dark">Filter</h2>
          <button
            onClick={() => setFilters({ ...initialFilters })}
            className="text-xs text-brand-blue hover:text-brand-blue-dark bg-transparent border-none cursor-pointer font-medium"
          >
            Återställ allt
          </button>
        </div>

        {/* Bilmärke */}
        <FilterSection title="Bilmärke" onClear={() => clearField('brand')}>
          <input
            type="text"
            placeholder="Sök märke..."
            value={brandSearch}
            onChange={(e) => setBrandSearch(e.target.value)}
            className="w-full border border-brand-gray/60 rounded-lg px-3 py-2 text-[13px] text-brand-dark bg-white outline-none mb-2 placeholder:text-brand-gray-medium"
          />
          <div className="max-h-40 overflow-y-auto space-y-1.5">
            {filteredBrands.map((brand) => (
              <label key={brand} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.brand.includes(brand)}
                  onChange={() => toggleFilter('brand', brand)}
                  className="w-4 h-4 rounded border-brand-gray text-brand-blue accent-brand-blue"
                />
                <span className="text-[13px] text-brand-dark/80 group-hover:text-brand-dark">{brand}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Produkt */}
        <FilterSection title="Produkt" onClear={() => clearField('product')}>
          <CheckboxGroup
            options={productOptions}
            selected={filters.product}
            onChange={(v) => toggleFilter('product', v)}
          />
        </FilterSection>

        {/* Däcktyp */}
        <FilterSection title="Däcktyp" onClear={() => clearField('tireType')}>
          <CheckboxGroup
            options={tireTypeOptions}
            selected={filters.tireType}
            onChange={(v) => toggleFilter('tireType', v)}
          />
        </FilterSection>

        {/* Däckbredd */}
        <FilterSection title="Däckbredd" defaultOpen={false} onClear={() => clearField('width')}>
          <SelectFilter value={filters.width} onChange={(v) => setFilters((p) => ({ ...p, width: v }))} options={widthOptions} placeholder="Alla bredder" />
        </FilterSection>

        {/* Profil */}
        <FilterSection title="Profil" defaultOpen={false} onClear={() => clearField('profile')}>
          <SelectFilter value={filters.profile} onChange={(v) => setFilters((p) => ({ ...p, profile: v }))} options={profileOptions} placeholder="Alla profiler" />
        </FilterSection>

        {/* Diameter */}
        <FilterSection title="Diameter" defaultOpen={false} onClear={() => clearField('diameter')}>
          <SelectFilter value={filters.diameter} onChange={(v) => setFilters((p) => ({ ...p, diameter: v }))} options={diameterOptions} placeholder="Alla diametrar" />
        </FilterSection>

        {/* Antal bultar */}
        <FilterSection title="Antal bultar" defaultOpen={false} onClear={() => clearField('boltCount')}>
          <CheckboxGroup
            options={boltCountOptions}
            selected={filters.boltCount}
            onChange={(v) => toggleFilter('boltCount', v)}
          />
        </FilterSection>

        {/* Bultcirkel */}
        <FilterSection title="Bultcirkel" defaultOpen={false} onClear={() => clearField('boltCircle')}>
          <SelectFilter value={filters.boltCircle} onChange={(v) => setFilters((p) => ({ ...p, boltCircle: v }))} options={boltCircleOptions} placeholder="Alla bultcirklar" />
        </FilterSection>

        {/* Skick */}
        <FilterSection title="Skick" defaultOpen={false} onClear={() => clearField('condition')}>
          <CheckboxGroup
            options={conditionOptions}
            selected={filters.condition}
            onChange={(v) => toggleFilter('condition', v)}
          />
        </FilterSection>

        {/* Pris */}
        <FilterSection title="Pris" defaultOpen={false}>
          <PriceRangeSlider
            min={0}
            max={50000}
            step={500}
            valueMin={filters.priceMin ? Number(filters.priceMin) : 0}
            valueMax={filters.priceMax ? Number(filters.priceMax) : 50000}
            onChange={(min, max) => setFilters((p) => ({
              ...p,
              priceMin: min === 0 ? '' : String(min),
              priceMax: max === 50000 ? '' : String(max),
            }))}
          />
        </FilterSection>

        {/* Navhål */}
        <FilterSection title="Navhål" defaultOpen={false} onClear={() => clearField('hubBore')}>
          <SelectFilter value={filters.hubBore} onChange={(v) => setFilters((p) => ({ ...p, hubBore: v }))} options={hubBoreOptions} placeholder="Alla navhål" />
        </FilterSection>

        {/* Fälgtyp */}
        <FilterSection title="Fälgtyp" defaultOpen={false} onClear={() => clearField('rimType')}>
          <CheckboxGroup
            options={rimTypeOptions}
            selected={filters.rimType}
            onChange={(v) => toggleFilter('rimType', v)}
          />
        </FilterSection>

        {/* Fälgbredd */}
        <FilterSection title="Fälgbredd" defaultOpen={false} onClear={() => clearField('rimWidth')}>
          <SelectFilter value={filters.rimWidth} onChange={(v) => setFilters((p) => ({ ...p, rimWidth: v }))} options={rimWidthOptions} placeholder="Alla fälgbredder" />
        </FilterSection>

        {/* ET */}
        <FilterSection title="ET" defaultOpen={false}>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.etMin}
              onChange={(e) => setFilters((p) => ({ ...p, etMin: e.target.value }))}
              className="w-full border border-brand-gray/60 rounded-lg px-2.5 py-2 text-[13px] text-brand-dark bg-white outline-none"
            />
            <span className="text-brand-gray-medium text-xs">—</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.etMax}
              onChange={(e) => setFilters((p) => ({ ...p, etMax: e.target.value }))}
              className="w-full border border-brand-gray/60 rounded-lg px-2.5 py-2 text-[13px] text-brand-dark bg-white outline-none"
            />
          </div>
        </FilterSection>

        {/* Län */}
        <FilterSection title="Län" defaultOpen={false} onClear={() => clearField('location')}>
          <div className="max-h-48 overflow-y-auto space-y-1.5">
            {locationOptions.map((loc) => (
              <label key={loc} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.location.includes(loc)}
                  onChange={() => toggleFilter('location', loc)}
                  className="w-4 h-4 rounded border-brand-gray text-brand-blue accent-brand-blue"
                />
                <span className="text-[13px] text-brand-dark/80 group-hover:text-brand-dark">{loc}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      </div>
    </aside>
  );
}

/* ─── Listing Card ─── */
function ListingCard({ listing }) {
  const [imgIdx, setImgIdx] = useState(0);
  const images = listing.images || [listing.image];
  const hasMultiple = images.length > 1;

  return (
    <Link
      to={`/annons/${listing.id}`}
      className="group bg-white rounded-xl border border-brand-gray/40 overflow-hidden hover:shadow-lg hover:border-brand-gray transition-all duration-200"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-gray-light">
        <img
          src={images[imgIdx]}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Arrows */}
        {hasMultiple && (
          <>
            <button
              onClick={(e) => { e.preventDefault(); setImgIdx((i) => (i - 1 + images.length) % images.length); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors border-none cursor-pointer opacity-0 group-hover:opacity-100"
            >
              <svg className="w-4 h-4 text-brand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.preventDefault(); setImgIdx((i) => (i + 1) % images.length); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors border-none cursor-pointer opacity-0 group-hover:opacity-100"
            >
              <svg className="w-4 h-4 text-brand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <span key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === imgIdx ? 'bg-white' : 'bg-white/50'}`} />
              ))}
            </div>
          </>
        )}
        {/* Favorite */}
        <button
          onClick={(e) => e.preventDefault()}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors border-none cursor-pointer"
        >
          <svg className="w-[18px] h-[18px] text-brand-dark/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
        {/* Badges */}
        {listing.condition === 'Nya' && (
          <span className="absolute top-3 left-3 text-[11px] font-bold px-2 py-0.5 rounded-md bg-brand-blue text-white">Nya</span>
        )}
      </div>

      <div className="p-4">
        {/* Title */}
        <h3 className="text-[15px] font-bold text-brand-dark leading-snug mb-1.5 line-clamp-2">
          {listing.title}
        </h3>

        {/* Specs */}
        <p className="text-[13px] text-brand-gray-medium mb-3">
          {listing.specs.width}/{listing.specs.profile}R{listing.specs.diameter}
          {listing.specs.depth && <> · {listing.specs.depth}</>}
          {' · '}{listing.condition}
        </p>

        {/* Seller + location row */}
        <div className="flex items-center justify-between mb-3 pt-3 border-t border-brand-gray/30">
          <div className="flex items-center gap-1.5">
            <span className="text-[13px] text-brand-dark">{listing.seller.name}</span>
            {listing.seller.type === 'Företag' && (
              <svg className="w-4 h-4 text-green-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <div className="flex items-center gap-1 text-brand-gray-medium">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span className="text-xs">{listing.location}</span>
          </div>
        </div>

        {/* Price */}
        <p className="text-lg font-bold text-brand-blue">
          {listing.price.toLocaleString('sv-SE')} kr
        </p>
      </div>
    </Link>
  );
}

/* ─── Category Labels ─── */
const categoryLabels = {
  'vinterhjul-friktion': 'Vinterhjul friktion',
  'vinterhjul-dubb': 'Vinterhjul dubb',
  'vinterdack': 'Vinterdäck',
  'falgar': 'Fälgar',
  'sommarhjul': 'Sommarhjul',
  'sommardack': 'Sommardäck',
};

/* ─── Main Page ─── */
export default function AnnonserPage() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const [sortBy, setSortBy] = useState('newest');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [filters, setFilters] = useState({ ...initialFilters });

  const pageTitle = category && categoryLabels[category]
    ? categoryLabels[category]
    : 'Alla annonser';

  return (
    <div className="min-h-screen bg-brand-gray-light">
      <Navbar activePage="annonser" />

      <div className="pt-[72px]">
        {/* Page header */}
        <div className="bg-white border-b border-brand-gray/40">
          <div className="px-5 sm:px-8"><div className="max-w-site mx-auto py-6">
            <div className="flex items-center gap-2 text-sm text-brand-gray-medium mb-2">
              <Link to="/" className="hover:text-brand-blue transition-colors">Hem</Link>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <Link to="/annonser" className="hover:text-brand-blue transition-colors">Annonser</Link>
              {category && categoryLabels[category] && (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-brand-dark">{categoryLabels[category]}</span>
                </>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-brand-dark">{pageTitle}</h1>
          </div></div>
        </div>

        {/* Content */}
        <div className="px-5 sm:px-8"><div className="max-w-site mx-auto py-6">
          <div className="flex gap-6">
            {/* Sidebar — desktop */}
            <div className="hidden lg:block">
              <Sidebar filters={filters} setFilters={setFilters} />
            </div>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Search area */}
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
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>

                {/* Plate search */}
                <PlateSearch size="small" />

                {/* Advanced search toggle */}
                <button
                  onClick={() => setAdvancedOpen(!advancedOpen)}
                  className="flex items-center gap-1.5 mx-auto text-sm text-brand-gray-medium hover:text-brand-dark transition-colors bg-transparent border-none cursor-pointer"
                >
                  <span className="text-base leading-none">{advancedOpen ? '—' : '+'}</span>
                  {advancedOpen ? 'Dölj avancerad sökning' : 'Avancerad sökning'}
                </button>

                {/* Advanced search fields */}
                {advancedOpen && (
                  <div className="space-y-3 pt-1">
                    <select className="w-full bg-brand-gray-light border border-brand-gray/60 rounded-xl px-4 py-3 text-sm text-brand-gray-medium outline-none appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%238a8f98%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_1rem_center]">
                      <option value="">Märke</option>
                      {brandOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                    <select className="w-full bg-brand-gray-light border border-brand-gray/60 rounded-xl px-4 py-3 text-sm text-brand-gray-medium outline-none appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%238a8f98%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_1rem_center]">
                      <option value="">Modell</option>
                    </select>
                    <select className="w-full bg-brand-gray-light border border-brand-gray/60 rounded-xl px-4 py-3 text-sm text-brand-gray-medium outline-none appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%238a8f98%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_1rem_center]">
                      <option value="">Årsmodell</option>
                      {Array.from({ length: 30 }, (_, i) => 2026 - i).map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                    <select className="w-full bg-brand-gray-light border border-brand-gray/60 rounded-xl px-4 py-3 text-sm text-brand-gray-medium outline-none appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%238a8f98%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_1rem_center]">
                      <option value="">Serie</option>
                    </select>
                    <button className="px-5 py-2.5 rounded-xl border border-brand-gray/60 bg-brand-gray-light text-sm text-brand-gray-medium hover:text-brand-dark hover:border-brand-gray transition-colors cursor-pointer">
                      Sök
                    </button>
                  </div>
                )}
              </div>

              {/* Toolbar */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-brand-gray-medium">
                    <span className="font-bold text-brand-dark">{mockListings.length}</span> resultat
                  </span>

                  <button
                    onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                    className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-lg border border-brand-gray/60 bg-white text-sm text-brand-dark cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                    </svg>
                    Filter
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-brand-gray-medium hidden sm:inline">Sortera efter:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-brand-gray/60 rounded-lg pl-3 pr-8 py-2 text-sm text-brand-dark bg-white appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%238a8f98%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.23%207.21a.75.75%200%20011.06.02L10%2011.168l3.71-3.938a.75.75%200%20111.08%201.04l-4.25%204.5a.75.75%200%2001-1.08%200l-4.25-4.5a.75.75%200%2001.02-1.06z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_8px_center] bg-no-repeat outline-none cursor-pointer"
                  >
                    <option value="newest">Nyast först</option>
                    <option value="price-asc">Lägst pris</option>
                    <option value="price-desc">Högst pris</option>
                  </select>
                </div>
              </div>

              {/* Mobile filters */}
              {mobileFiltersOpen && (
                <div className="lg:hidden mb-5">
                  <Sidebar filters={filters} setFilters={setFilters} />
                </div>
              )}

              {/* Listings grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {mockListings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>

              {/* Load more */}
              <div className="flex justify-center mt-10 mb-6">
                <button className="px-8 py-3 rounded-xl border border-brand-gray/60 bg-white text-sm font-medium text-brand-dark hover:border-brand-gray hover:shadow-sm transition-all cursor-pointer">
                  Visa fler annonser
                </button>
              </div>
            </div>
          </div>
        </div></div>
      </div>

      <Footer />
    </div>
  );
}
