import { useScrollReveal } from '../../hooks/useScrollReveal';

const brands = [
  { name: 'Audi', slug: 'audi' },
  { name: 'BMW', slug: 'bmw' },
  { name: 'Ford', slug: 'ford' },
  { name: 'Kia', slug: 'kia' },
  { name: 'Mercedes', slug: 'mercedes' },
  { name: 'Peugeot', slug: 'peugeot' },
  { name: 'Polestar', slug: 'polestar' },
  { name: 'Porsche', slug: 'porsche' },
  { name: 'Tesla', slug: 'tesla' },
  { name: 'Toyota', slug: 'toyota' },
  { name: 'Volkswagen', slug: 'volkswagen' },
  { name: 'Volvo', slug: 'volvo' },
];

export default function BrandGrid() {
  const ref = useScrollReveal();

  return (
    <div ref={ref} className="fade-in">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {brands.map((brand) => (
          <a
            key={brand.slug}
            href={`https://www.wheelplace.com/annonser?brand=${brand.slug}`}
            className="
              group flex flex-col items-center justify-center gap-3
              aspect-square rounded-xl bg-brand-gray-light
              hover:bg-white hover:shadow-md border border-transparent hover:border-brand-gray
              transition-all duration-200
            "
          >
            <div className="w-16 h-16 flex items-center justify-center">
              <img src={`/brands/${brand.slug}.svg`} alt={brand.name} className="w-14 h-14 transition-[filter] duration-200 opacity-40 group-hover:opacity-100 brand-logo-hover" />
            </div>
            <span className="text-[13px] font-medium text-brand-dark">{brand.name}</span>
          </a>
        ))}
      </div>
      <div className="text-center mt-8">
        <a
          href="https://www.wheelplace.com/annonser"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue hover:text-brand-blue-dark transition-colors"
        >
          Alla märken
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}
