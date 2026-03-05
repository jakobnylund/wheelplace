import { useState, useRef } from 'react';
import Navbar from './ui/Navbar';
import Footer from './ui/Footer';

const wheelStyles = [
  { label: 'Sport', value: 'sleek 19-inch gunmetal alloy sport rims with low-profile performance tires' },
  { label: 'Classic', value: 'classic 17-inch chrome wire spoke rims with whitewall tires' },
  { label: 'Off-road', value: 'rugged 18-inch matte black off-road alloy wheels with chunky all-terrain tires' },
  { label: 'Luxury', value: 'premium 20-inch polished multi-spoke luxury alloy rims with ultra-low-profile tires' },
  { label: 'Rally', value: 'lightweight 18-inch white rally wheels with gravel tires' },
  { label: 'Minimalist', value: 'clean 19-inch flat-faced aero wheels in matte silver with slim tires' },
];

export default function VisualiseraPage() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(wheelStyles[0]);
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

  const handleGenerate = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/visualize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image, wheel_style: selectedStyle.value }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong');
      } else {
        setResult(data.output);
      }
    } catch {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-[72px]">
        {/* Hero */}
        <section className="py-16 sm:py-24 px-5 sm:px-8 bg-gradient-to-b from-brand-gray-light to-white">
          <div className="max-w-site mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
              </svg>
              AI-driven prototyp
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-brand-dark tracking-tight mb-4">
              Visualisera hjul på din bil
            </h1>
            <p className="text-brand-gray-medium text-base sm:text-lg max-w-xl mx-auto">
              Ladda upp en bild på din bil och se hur olika hjulstilar ser ut — direkt med AI.
            </p>
          </div>
        </section>

        {/* Main content */}
        <section className="py-12 px-5 sm:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Upload area */}
            {!preview ? (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed border-brand-gray hover:border-brand-blue rounded-2xl p-12 sm:p-20 text-center cursor-pointer transition-colors group"
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files[0])}
                />
                <div className="w-16 h-16 rounded-full bg-brand-gray-light flex items-center justify-center mx-auto mb-5 group-hover:bg-brand-blue/10 transition-colors">
                  <svg className="w-8 h-8 text-brand-gray-medium group-hover:text-brand-blue transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                  </svg>
                </div>
                <p className="text-brand-dark font-medium mb-1">Ta en bild eller ladda upp</p>
                <p className="text-sm text-brand-gray-medium">Dra och släpp, eller klicka för att välja en bild på din bil</p>
              </div>
            ) : (
              <div>
                {/* Style picker */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-brand-dark mb-3">Välj hjulstil</h3>
                  <div className="flex flex-wrap gap-2">
                    {wheelStyles.map((style) => (
                      <button
                        key={style.label}
                        onClick={() => setSelectedStyle(style)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all border cursor-pointer ${
                          selectedStyle.label === style.label
                            ? 'bg-brand-blue text-white border-brand-blue'
                            : 'bg-white text-brand-dark border-brand-gray hover:border-brand-blue'
                        }`}
                      >
                        {style.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Images side by side */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <p className="text-xs font-semibold text-brand-dark/40 uppercase tracking-wider mb-3">Original</p>
                    <div className="rounded-2xl overflow-hidden bg-brand-gray-light border border-brand-gray/30">
                      <img src={preview} alt="Din bil" className="w-full aspect-[16/10] object-cover" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-brand-dark/40 uppercase tracking-wider mb-3">Med nya hjul</p>
                    <div className="rounded-2xl overflow-hidden bg-brand-gray-light border border-brand-gray/30 aspect-[16/10] flex items-center justify-center">
                      {loading ? (
                        <div className="text-center p-8">
                          <div className="w-10 h-10 border-3 border-brand-gray border-t-brand-blue rounded-full animate-spin mx-auto mb-4" />
                          <p className="text-sm text-brand-gray-medium">Genererar med AI...</p>
                          <p className="text-xs text-brand-gray-medium mt-1">Detta kan ta 15–30 sekunder</p>
                        </div>
                      ) : result ? (
                        <img src={typeof result === 'string' ? result : result[0]} alt="Resultat" className="w-full h-full object-cover" />
                      ) : error ? (
                        <div className="text-center p-8">
                          <p className="text-sm text-red-500">{error}</p>
                        </div>
                      ) : (
                        <div className="text-center p-8">
                          <svg className="w-10 h-10 text-brand-gray-medium/40 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                          </svg>
                          <p className="text-sm text-brand-gray-medium">Klicka "Generera" för att se resultatet</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-blue hover:bg-brand-blue-dark disabled:opacity-50 text-white font-medium text-sm transition-colors cursor-pointer border-none"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                    {loading ? 'Genererar...' : 'Generera'}
                  </button>
                  <button
                    onClick={() => { setPreview(null); setImage(null); setResult(null); setError(null); }}
                    className="px-6 py-3 rounded-xl border border-brand-gray text-brand-dark text-sm font-medium hover:bg-brand-gray-light transition-colors cursor-pointer bg-white"
                  >
                    Ny bild
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
