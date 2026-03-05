export default function TestimonialCard({ quote, author, rating = 5, dark }) {
  return (
    <div className={`flex flex-col gap-4 p-7 rounded-2xl ${dark ? 'bg-white/5 border border-white/10' : 'bg-white border border-brand-gray/40'}`}>
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < rating ? 'text-brand-blue' : dark ? 'text-white/20' : 'text-brand-gray'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className={`leading-relaxed text-[15px] ${dark ? 'text-white/70' : 'text-brand-dark'}`}>&ldquo;{quote}&rdquo;</p>
      <div className="flex items-center gap-2.5 mt-auto pt-2">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${dark ? 'bg-brand-blue/20' : 'bg-brand-blue/10'}`}>
          <span className="text-xs font-bold text-brand-blue">{author.charAt(0)}</span>
        </div>
        <span className={`text-sm font-medium ${dark ? 'text-white' : 'text-brand-dark'}`}>{author}</span>
      </div>
    </div>
  );
}
