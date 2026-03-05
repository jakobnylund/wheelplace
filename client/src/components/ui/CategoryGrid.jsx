import { useScrollReveal } from '../../hooks/useScrollReveal';

const categories = [
  { name: 'Vinterhjul friktion', slug: 'vinterhjul-friktion', count: 42, image: '/cat-vinterhjul-friktion.avif' },
  { name: 'Vinterhjul dubb', slug: 'vinterhjul-dubb', count: 38, image: '/cat-vinterhjul-dubb.avif' },
  { name: 'Vinterdäck', slug: 'vinterdack', count: 56, image: '/cat-vinterdack.avif' },
  { name: 'Fälgar', slug: 'falgar', count: 71, image: '/cat-falgar.avif' },
  { name: 'Sommarhjul', slug: 'sommarhjul', count: 63, image: '/cat-sommarhjul.avif' },
  { name: 'Sommardäck', slug: 'sommardack', count: 49, image: '/cat-sommardack.avif' },
];

export default function CategoryGrid() {
  const ref = useScrollReveal();

  return (
    <div ref={ref} className="fade-in grid grid-cols-3 md:grid-cols-6 gap-3">
      {categories.map((cat) => (
        <a
          key={cat.slug}
          href={`/annonser?category=${cat.slug}`}
          className="group flex flex-col items-center rounded-xl overflow-hidden bg-brand-gray-light border border-transparent hover:bg-white hover:border-brand-gray hover:shadow-lg transition-all duration-300"
        >
          <div className="w-full aspect-square overflow-hidden">
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="px-3 py-3 text-center">
            <span className="font-medium text-brand-dark text-sm">{cat.name}</span>
            <span className="block text-xs text-brand-gray-medium mt-0.5">{cat.count} annonser</span>
          </div>
        </a>
      ))}
    </div>
  );
}
