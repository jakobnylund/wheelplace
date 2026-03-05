export default function ReviewsSection() {
  const reviews = [
    {
      author: 'Anna K.',
      rating: 5,
      date: '2025-12-14',
      text: 'Snabb och smidig affär! Däcken var exakt som beskrivet, bra mönsterdjup och inga skador. Säljaren var tydlig och hjälpsam. Rekommenderas!',
    },
    {
      author: 'Johan M.',
      rating: 4,
      date: '2025-11-28',
      text: 'Bra skick på fälgarna, några mindre repor som var nämnda i annonsen. Pålitlig säljare, snabb leverans.',
    },
    {
      author: 'Sara L.',
      rating: 5,
      date: '2025-10-05',
      text: 'Perfekt! Kompletta hjul som passade direkt. Sparade mycket pengar jämfört med nytt. Mycket nöjd.',
    },
  ];

  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="bg-white rounded-xl border border-brand-gray/40 p-5">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-brand-dark">Recensioner</h2>
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.round(Number(avg)) ? 'text-brand-blue' : 'text-brand-gray'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm font-medium text-brand-dark">{avg}</span>
          <span className="text-sm text-brand-gray-medium">({reviews.length})</span>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.author} className="border-t border-brand-gray/40 pt-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-brand-blue">{review.author.charAt(0)}</span>
                </div>
                <span className="text-sm font-medium text-brand-dark">{review.author}</span>
              </div>
              <span className="text-xs text-brand-gray-medium">{review.date}</span>
            </div>
            <div className="flex gap-0.5 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`w-3.5 h-3.5 ${i < review.rating ? 'text-brand-blue' : 'text-brand-gray'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-sm text-brand-dark/80 leading-relaxed">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
