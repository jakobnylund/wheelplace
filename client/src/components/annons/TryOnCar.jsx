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
          <div className="mb-4">
            <div className="rounded-xl overflow-hidden bg-brand-gray-light border border-brand-gray/30 aspect-[4/3] flex items-center justify-center">
              {loading ? (
                <div className="relative w-full h-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #f5f0ff 50%, #eef6ff 100%)' }}>
                  <div className="absolute inset-0">
                    <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full blur-2xl" style={{ background: 'radial-gradient(circle, rgba(96,165,250,0.4), transparent 65%)', animation: 'aiFloat1 6s ease-in-out infinite' }} />
                    <div className="absolute bottom-[-15%] right-[-10%] w-[65%] h-[65%] rounded-full blur-2xl" style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.35), transparent 65%)', animation: 'aiFloat2 7s ease-in-out infinite' }} />
                    <div className="absolute top-[20%] right-[-15%] w-[55%] h-[55%] rounded-full blur-2xl" style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.3), transparent 65%)', animation: 'aiFloat3 5s ease-in-out infinite' }} />
                    <div className="absolute bottom-[10%] left-[-5%] w-[50%] h-[50%] rounded-full blur-2xl" style={{ background: 'radial-gradient(circle, rgba(192,132,252,0.3), transparent 65%)', animation: 'aiFloat2 8s ease-in-out infinite 1.5s' }} />
                    <div className="absolute top-[30%] left-[20%] w-[45%] h-[45%] rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(129,140,248,0.25), transparent 60%)', animation: 'aiFloat1 9s ease-in-out infinite 3s' }} />
                  </div>
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.5) 42%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.5) 58%, transparent 70%)',
                      backgroundSize: '250% 100%',
                      animation: 'aiShimmer 3s ease-in-out infinite',
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <svg className="w-7 h-7" style={{ animation: 'aiPulse 2.5s ease-in-out infinite' }} fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
                      <defs>
                        <linearGradient id="aiSparkle" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#818cf8" />
                          <stop offset="50%" stopColor="#60a5fa" />
                          <stop offset="100%" stopColor="#c084fc" />
                        </linearGradient>
                      </defs>
                      <path stroke="url(#aiSparkle)" strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                    </svg>
                    <p className="text-xs font-medium bg-gradient-to-r from-indigo-400 via-sky-400 to-purple-400 bg-clip-text text-transparent tracking-wide">AI genererar...</p>
                  </div>
                  <style>{`
                    @keyframes aiFloat1 {
                      0%, 100% { transform: translate(0, 0) scale(1); }
                      33% { transform: translate(20px, 15px) scale(1.1); }
                      66% { transform: translate(-15px, 8px) scale(0.95); }
                    }
                    @keyframes aiFloat2 {
                      0%, 100% { transform: translate(0, 0) scale(1); }
                      50% { transform: translate(-18px, -12px) scale(1.15); }
                    }
                    @keyframes aiFloat3 {
                      0%, 100% { transform: translate(0, 0) scale(1); }
                      40% { transform: translate(12px, -18px) scale(1.1); }
                      70% { transform: translate(-10px, -8px) scale(1.05); }
                    }
                    @keyframes aiShimmer {
                      0% { background-position: 250% 0; }
                      100% { background-position: -250% 0; }
                    }
                    @keyframes aiPulse {
                      0%, 100% { transform: scale(1); opacity: 0.7; }
                      50% { transform: scale(1.1); opacity: 1; }
                    }
                  `}</style>
                </div>
              ) : result ? (
                <img src={typeof result === 'string' ? result : result[0]} alt="Resultat" className="w-full h-full object-cover" />
              ) : error ? (
                <div className="text-center p-4">
                  <p className="text-xs text-red-500 mb-1">{error}</p>
                  <img src={preview} alt="Din bil" className="w-full h-full object-cover rounded-lg opacity-60" />
                </div>
              ) : (
                <img src={preview} alt="Din bil" className="w-full h-full object-cover" />
              )}
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
