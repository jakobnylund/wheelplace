import { useState } from 'react';

export default function ImageGallery({ images = [], title = '' }) {
  const imgs = images.length > 0 ? images : ['/cat-vinterhjul-friktion.avif'];
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i === 0 ? imgs.length - 1 : i - 1));
  const next = () => setActive((i) => (i === imgs.length - 1 ? 0 : i + 1));

  return (
    <div>
      {/* Main image */}
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-brand-gray-light mb-3">
        <img
          src={imgs[active]}
          alt={title}
          className="w-full h-full object-cover"
        />
        {imgs.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors border-none cursor-pointer"
              aria-label="Föregående bild"
            >
              <svg className="w-5 h-5 text-brand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors border-none cursor-pointer"
              aria-label="Nästa bild"
            >
              <svg className="w-5 h-5 text-brand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/50 text-white text-xs font-medium">
              {active + 1} / {imgs.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {imgs.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {imgs.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 cursor-pointer p-0 ${
                i === active ? 'border-brand-blue' : 'border-transparent hover:border-brand-gray'
              }`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
