import { useState } from 'react';

export default function PlateSearch({ size = 'large' }) {
  const [plate, setPlate] = useState('');
  const [focused, setFocused] = useState(false);

  const formatPlate = (value) => {
    const cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (cleaned.length <= 3) return cleaned;
    return cleaned.slice(0, 3) + ' ' + cleaned.slice(3, 6);
  };

  const handleChange = (e) => {
    const formatted = formatPlate(e.target.value);
    if (formatted.replace(' ', '').length <= 6) {
      setPlate(formatted);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const clean = plate.replace(/\s/g, '');
    if (clean.length >= 4) {
      window.location.href = `https://www.wheelplace.com/annonser?plate=${clean}`;
    }
  };

  const isLarge = size === 'large';

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div
        className={`
          relative flex items-center overflow-hidden bg-white
          border transition-all duration-200
          ${isLarge ? 'rounded-2xl h-16' : 'rounded-xl h-14'}
          ${focused ? 'border-brand-blue' : 'border-brand-gray'}
        `}
      >
        {/* EU plate badge */}
        <div className={`flex-shrink-0 ${isLarge ? 'w-14 h-16' : 'w-12 h-14'} bg-[#003399] flex flex-col items-center justify-center gap-0.5`}>
          <div className="w-5 h-3.5 rounded-[2px] flex items-center justify-center">
            <svg viewBox="0 0 24 16" className="w-5 h-3.5">
              <circle cx="12" cy="8" r="6" fill="none" stroke="#ffcc00" strokeWidth="0.8" />
              {[...Array(12)].map((_, i) => {
                const angle = (i * 30 - 90) * (Math.PI / 180);
                const x = 12 + 5 * Math.cos(angle);
                const y = 8 + 5 * Math.sin(angle);
                return <polygon key={i} points={`${x},${y - 0.8} ${x + 0.5},${y - 0.2} ${x + 0.8},${y - 0.2} ${x + 0.55},${y + 0.15} ${x + 0.65},${y + 0.7} ${x},${y + 0.35} ${x - 0.65},${y + 0.7} ${x - 0.55},${y + 0.15} ${x - 0.8},${y - 0.2} ${x - 0.5},${y - 0.2}`} fill="#ffcc00" />;
              })}
            </svg>
          </div>
          <span className="text-white text-[9px] font-bold leading-none">S</span>
        </div>

        <input
          type="text"
          value={plate}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="ABC 123"
          aria-label="Sök med registreringsnummer"
          className={`
            flex-1 px-4 font-bold tracking-[0.15em] uppercase
            text-brand-dark placeholder:text-brand-gray
            bg-transparent outline-none
            ${isLarge ? 'text-2xl' : 'text-xl'}
          `}
          style={{ fontFamily: "'Helvetica Neue', monospace" }}
          maxLength={7}
        />

        <button
          type="submit"
          aria-label="Sök"
          className={`
            flex-shrink-0 flex items-center justify-center
            bg-brand-blue hover:bg-brand-blue-dark active:scale-95
            text-white rounded-xl transition-all duration-200 cursor-pointer border-none
            ${isLarge ? 'w-12 h-12 mr-2' : 'w-10 h-10 mr-2'}
          `}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </form>
  );
}
