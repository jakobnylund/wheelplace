import { useState, useRef } from 'react';

export default function TryOnCar({ listing }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [compatibility, setCompatibility] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileRef = useRef();

  const handleFile = (file) => {
    if (!file) return;
    setResult(null);
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
      setImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const buildWheelDescription = () => {
    const parts = [];
    if (listing.tireBrand) parts.push(`${listing.tireBrand} brand`);
    if (listing.title) parts.push(`"${listing.title}"`);
    if (listing.specs?.diameter) parts.push(`${listing.specs.diameter}-inch`);
    if (listing.specs?.width && listing.specs?.profile) {
      parts.push(`${listing.specs.width}/${listing.specs.profile} tire size`);
    }
    if (listing.tireType) parts.push(listing.tireType.toLowerCase());
    if (listing.product) parts.push(listing.product.toLowerCase());
    if (listing.brand) parts.push(`designed to fit ${listing.brand}`);
    return parts.join(', ');
  };

  // Convert a same-origin image URL to a data URL
  const toDataUrl = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.onerror = () => resolve(null);
      img.src = src;
    });
  };

  const handleGenerate = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const wheelSrc = listing.images?.[0] || listing.image;
      const wheelDataUrl = await toDataUrl(wheelSrc);

      const res = await fetch('/api/visualize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image,
          wheel_image: wheelDataUrl || wheelSrc,
          listing_title: listing.title,
          listing_brand: listing.brand || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Något gick fel');
      } else {
        setResult(data.output);
        if (data.compatibility) setCompatibility(data.compatibility);
      }
    } catch {
      setError('Kunde inte ansluta till servern');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-brand-gray/40 p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-bold text-brand-dark">Prova på din bil</h2>
          <p className="text-xs text-brand-gray-medium">Ladda upp en bild och se hur hjulen ser ut med AI</p>
        </div>
      </div>

      {!preview ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-brand-gray hover:border-brand-blue rounded-xl p-8 text-center cursor-pointer transition-colors group"
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => handleFile(e.target.files[0])}
          />
          <div className="w-12 h-12 rounded-full bg-brand-gray-light flex items-center justify-center mx-auto mb-3 group-hover:bg-brand-blue/10 transition-colors">
            <svg className="w-6 h-6 text-brand-gray-medium group-hover:text-brand-blue transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-brand-dark mb-0.5">Ta en bild eller ladda upp</p>
          <p className="text-xs text-brand-gray-medium">Se hur dessa hjul ser ut på din bil</p>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <p className="text-[10px] font-semibold text-brand-dark/40 uppercase tracking-wider mb-2">Din bil</p>
              <div className="rounded-xl overflow-hidden bg-brand-gray-light border border-brand-gray/30 aspect-[4/3]">
                <img src={preview} alt="Din bil" className="w-full h-full object-cover" />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-brand-dark/40 uppercase tracking-wider mb-2">Med nya hjul</p>
              <div className="rounded-xl overflow-hidden bg-brand-gray-light border border-brand-gray/30 aspect-[4/3] flex items-center justify-center">
                {loading ? (
                  <div className="relative w-full h-full overflow-hidden">
                    {/* Animated gradient background */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(-45deg, #1a3a5c, #2563eb, #3b82f6, #60a5fa, #1e40af, #1a3a5c)',
                        backgroundSize: '400% 400%',
                        animation: 'aiGradient 6s ease infinite',
                      }}
                    />
                    {/* Shimmer overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.15) 37%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.15) 63%, transparent 75%)',
                        backgroundSize: '200% 100%',
                        animation: 'aiShimmer 2s ease-in-out infinite',
                      }}
                    />
                    {/* Floating sparkles */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <svg className="w-8 h-8 text-white/90 drop-shadow-lg" style={{ animation: 'aiPulse 2s ease-in-out infinite' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                        </svg>
                      </div>
                    </div>
                    {/* Label */}
                    <div className="absolute inset-x-0 bottom-0 pb-4 text-center">
                      <p className="text-xs font-medium text-white/80 tracking-wide">AI genererar...</p>
                    </div>
                    <style>{`
                      @keyframes aiGradient {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                      }
                      @keyframes aiShimmer {
                        0% { background-position: 200% 0; }
                        100% { background-position: -200% 0; }
                      }
                      @keyframes aiPulse {
                        0%, 100% { transform: scale(1); opacity: 0.9; }
                        50% { transform: scale(1.15); opacity: 1; }
                      }
                    `}</style>
                  </div>
                ) : result ? (
                  <img src={typeof result === 'string' ? result : result[0]} alt="Resultat" className="w-full h-full object-cover" />
                ) : error ? (
                  <p className="text-xs text-red-500 p-4 text-center">{error}</p>
                ) : (
                  <div className="text-center p-4">
                    <svg className="w-8 h-8 text-brand-gray-medium/30 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                    <p className="text-xs text-brand-gray-medium">Tryck generera</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {compatibility && !compatibility.fits && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200 mb-4">
              <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-amber-800">Passar troligtvis inte</p>
                <p className="text-xs text-amber-700 mt-0.5">{compatibility.message}</p>
              </div>
            </div>
          )}

          {compatibility && compatibility.fits && (
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-green-50 border border-green-200 mb-4">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-green-800">
                <span className="font-medium">Bra matchning!</span> Dessa hjul är avsedda för {compatibility.listing_brand} och bör passa din {compatibility.car}.
              </p>
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark disabled:opacity-50 text-white font-medium text-sm transition-colors cursor-pointer border-none"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
              {loading ? 'Genererar...' : 'Generera'}
            </button>
            <button
              onClick={() => { setPreview(null); setImage(null); setResult(null); setError(null); setCompatibility(null); }}
              className="px-4 py-2.5 rounded-xl border border-brand-gray text-brand-dark text-sm font-medium hover:bg-brand-gray-light transition-colors cursor-pointer bg-white"
            >
              Ny bild
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
