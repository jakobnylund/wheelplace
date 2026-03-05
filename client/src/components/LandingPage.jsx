import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import PlateSearch from './ui/PlateSearch';
import CategoryGrid from './ui/CategoryGrid';
import BrandGrid from './ui/BrandGrid';
import TestimonialCard from './ui/TestimonialCard';
import FAQAccordion from './ui/FAQAccordion';
import Navbar from './ui/Navbar';
import Footer from './ui/Footer';

/* ─── Hero ─── */
const heroImages = {
  default: '/hero-bg.jpg',
  kopa: '/hero-kopa.jpg',
  salja: '/hero-salja.jpg',
};

function Hero() {
  const [activeBg, setActiveBg] = useState('default');

  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* Background images with cross-fade */}
      <div className="absolute inset-0">
        {Object.entries(heroImages).map(([key, src]) => (
          <img
            key={key}
            src={src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
            style={{ opacity: activeBg === key || (activeBg === 'default' && key === 'default') ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      <div className="relative z-10 px-5 sm:px-8"><div className="max-w-site mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-white leading-[1.1] tracking-tight mb-5">
          Köp och sälj begagnade eller<br className="hidden sm:block" /> nya hjul, däck och fälgar
        </h1>

        <p className="text-[17px] text-white/60 max-w-lg mx-auto mb-12 leading-relaxed">
          Sveriges smartaste marknadsplats för hjul. Sök med registreringsnummer — vi hjälper dig hitta rätt.
        </p>

        {/* Buy / Sell cards */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto mb-12">
          <Link
            to="/annonser"
            className="group flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 hover:bg-white hover:border-white/80 transition-all duration-300 text-left"
            onMouseEnter={() => setActiveBg('kopa')}
            onMouseLeave={() => setActiveBg('default')}
          >
            <div className="w-12 h-12 rounded-xl bg-brand-blue flex items-center justify-center mb-4 group-hover:bg-brand-blue/10 transition-colors">
              <svg className="w-6 h-6 text-white group-hover:text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white group-hover:text-brand-dark mb-1.5">Köpa</h2>
            <p className="text-sm text-white/50 group-hover:text-brand-gray-medium leading-relaxed">
              Hitta hjul som passar din bil. Sök med regnummer eller bläddra bland annonser.
            </p>
            <div className="flex items-center gap-1.5 mt-4 text-brand-blue-light group-hover:text-brand-blue text-sm font-medium group-hover:gap-2.5 transition-all">
              Sök annonser
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link
            to="/logga-in"
            className="group flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 hover:bg-white hover:border-white/80 transition-all duration-300 text-left"
            onMouseEnter={() => setActiveBg('salja')}
            onMouseLeave={() => setActiveBg('default')}
          >
            <div className="w-12 h-12 rounded-xl bg-brand-blue flex items-center justify-center mb-4 group-hover:bg-brand-blue/10 transition-colors">
              <svg className="w-6 h-6 text-white group-hover:text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white group-hover:text-brand-dark mb-1.5">Sälja</h2>
            <p className="text-sm text-white/50 group-hover:text-brand-gray-medium leading-relaxed">
              Nå tusentals köpare. Skapa en annons på under 2 minuter — helt gratis.
            </p>
            <div className="flex items-center gap-1.5 mt-4 text-brand-blue-light group-hover:text-brand-blue text-sm font-medium group-hover:gap-2.5 transition-all">
              Lägg in annons
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Trustpilot */}
        <div className="flex flex-col items-center gap-2">
          <img src="/trustpilot-logo.svg" alt="Trustpilot" className="h-6" />
          <img src="/trustpilot-stars.svg" alt="4.3 av 5" className="h-9" />
          <p className="text-sm text-white/50">
            <span className="font-semibold text-white/70">TrustScore 4.3</span> · 39 omdömen
          </p>
        </div>

      </div></div>
    </section>
  );
}

/* ─── Featured Listings ─── */
const featuredListings = [
  { id: 1, title: 'Continental VikingContact 7 205/55 R16', specs: '205/55R16 · 5.2 mm · Bra skick', seller: 'Marcus L.', sellerType: 'Privat', location: 'Stockholm', price: 4500, image: '/cat-vinterhjul-friktion.avif' },
  { id: 2, title: 'Nokian Hakkapeliitta R5 225/45 R17', specs: '225/45R17 · 6.8 mm · Mycket bra skick', seller: 'Däckcenter AB', sellerType: 'Företag', location: 'Göteborg', price: 6200, image: '/cat-vinterdack.avif' },
  { id: 3, title: 'Michelin X-Ice Snow 195/65 R15 på fälg', specs: '195/65R15 · 4.5 mm · Bra skick', seller: 'Anna K.', sellerType: 'Privat', location: 'Malmö', price: 3800, image: '/cat-vinterhjul-friktion.avif' },
  { id: 4, title: 'Pirelli Ice Zero FR 205/60 R16', specs: '205/60R16 · 8.0 mm · Nya', seller: 'Hjulmagasinet', sellerType: 'Företag', location: 'Uppsala', price: 5900, image: '/cat-vinterdack.avif' },
  { id: 5, title: 'Bridgestone Blizzak LM005 215/55 R17', specs: '215/55R17 · 6.1 mm · Mycket bra skick', seller: 'Erik S.', sellerType: 'Privat', location: 'Linköping', price: 7500, image: '/cat-vinterhjul-friktion.avif' },
  { id: 6, title: 'Goodyear UltraGrip 9+ 225/50 R17', specs: '225/50R17 · 8.0 mm · Nya', seller: 'Wheelhouse AB', sellerType: 'Företag', location: 'Västerås', price: 4200, image: '/cat-vinterdack.avif' },
  { id: 7, title: 'Hankook Winter i*cept 185/65 R15', specs: '185/65R15 · 3.8 mm · Ok skick', seller: 'Johan P.', sellerType: 'Privat', location: 'Örebro', price: 2800, image: '/cat-vinterhjul-friktion.avif' },
  { id: 8, title: 'Continental WinterContact TS 870 205/55 R16', specs: '205/55R16 · 5.0 mm · Bra skick', seller: 'Sara M.', sellerType: 'Privat', location: 'Norrköping', price: 5100, image: '/cat-vinterdack.avif' },
];

function FeaturedListings() {
  const ref = useScrollReveal();
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.querySelector('a')?.offsetWidth || 300;
    scrollRef.current.scrollBy({ left: dir * (cardWidth + 20), behavior: 'smooth' });
  };

  return (
    <section className="py-20 px-5 sm:px-8">
      <div ref={ref} className="fade-in max-w-site mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark tracking-tight mb-2">
              Senaste annonserna
            </h2>
            <p className="text-brand-gray-medium">
              Nyss inlagda hjul, däck och fälgar.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll(-1)}
              className="w-10 h-10 rounded-full border border-brand-gray/60 bg-white flex items-center justify-center hover:border-brand-gray hover:shadow-sm transition-all cursor-pointer"
              aria-label="Föregående"
            >
              <svg className="w-5 h-5 text-brand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll(1)}
              className="w-10 h-10 rounded-full border border-brand-gray/60 bg-white flex items-center justify-center hover:border-brand-gray hover:shadow-sm transition-all cursor-pointer"
              aria-label="Nästa"
            >
              <svg className="w-5 h-5 text-brand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scroll-smooth pb-4 -mx-5 px-5 sm:-mx-0 sm:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featuredListings.map((listing) => (
            <Link
              key={listing.id}
              to={`/annons/${listing.id}`}
              className="group flex-shrink-0 w-[280px] sm:w-[300px] bg-white rounded-xl border border-brand-gray/40 overflow-hidden hover:shadow-lg hover:border-brand-gray transition-all duration-200"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-brand-gray-light">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {listing.specs.includes('Nya') && (
                  <span className="absolute top-3 left-3 text-[11px] font-bold px-2 py-0.5 rounded-md bg-brand-blue text-white">Nya</span>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-[15px] font-bold text-brand-dark leading-snug mb-1.5 line-clamp-2">
                  {listing.title}
                </h3>
                <p className="text-[13px] text-brand-gray-medium mb-3">{listing.specs}</p>
                <div className="flex items-center justify-between mb-3 pt-3 border-t border-brand-gray/30">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] text-brand-dark">{listing.seller}</span>
                    {listing.sellerType === 'Företag' && (
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
                <p className="text-lg font-bold text-brand-blue">
                  {listing.price.toLocaleString('sv-SE')} kr
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="/annonser"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue hover:text-brand-blue-dark transition-colors"
          >
            Visa alla annonser
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works ─── */
function HowItWorks() {
  const ref = useScrollReveal();
  const cards = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
        </svg>
      ),
      color: 'bg-brand-blue/10 text-brand-blue',
      image: '/step-01.jpg',
      title: 'Sälj',
      desc: 'Skapa en annons med rätt uppgifter, sätt ditt pris och publicera — helt gratis.',
      cta: 'Lägg in annons',
      to: '/logga-in',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
      ),
      color: 'bg-brand-blue/10 text-brand-blue',
      image: '/step-02.jpg',
      title: 'Köp',
      desc: 'Sök med regnummer eller filtrera på dimension. Hitta rätt hjul och kontakta säljaren direkt.',
      cta: 'Bläddra annonser',
      to: '/annonser',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
        </svg>
      ),
      color: 'bg-brand-blue/10 text-brand-blue',
      image: '/step-03.jpg',
      title: 'Efterlys',
      desc: 'Hittar du inte det du söker? Skapa en förfrågan så kontaktar säljare dig.',
      cta: 'Skapa förfrågan',
      to: '/forfragningar',
    },
  ];

  return (
    <section className="py-24 px-5 sm:px-8">
      <div ref={ref} className="fade-in max-w-site mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark tracking-tight text-center mb-4">
          Tre sätt att hitta rätt hjul
        </h2>
        <p className="text-brand-gray-medium text-center max-w-md mx-auto mb-16">
          Oavsett om du vill köpa, sälja eller efterlysa — vi har dig.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c) => (
            <div key={c.title} className="group rounded-2xl bg-brand-gray-light overflow-hidden flex flex-col hover:shadow-lg hover:bg-white transition-all duration-200">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#8b95a8] shadow-md">
                  {c.icon}
                </div>
              </div>
              <div className="p-7 flex flex-col flex-1">
              <h3 className="text-xl font-bold text-brand-dark mb-2">{c.title}</h3>
              <p className="text-[15px] text-brand-gray-medium leading-relaxed mb-6 flex-1">{c.desc}</p>
              {c.to ? (
                <Link
                  to={c.to}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue hover:text-brand-blue-dark transition-colors"
                >
                  {c.cta}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              ) : (
                <a
                  href={c.href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue hover:text-brand-blue-dark transition-colors"
                >
                  {c.cta}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Social Proof / Testimonials ─── */
function SocialProof() {
  const ref = useScrollReveal();
  const testimonials = [
    {
      quote: 'Hittade exakt rätt vinterdäck till min Volvo på bara några minuter. Registreringsnummersökningen är genial!',
      author: 'Anna K.',
      rating: 5,
    },
    {
      quote: 'Sålde mina gamla sommarhjul samma vecka. Enkel process och bra kundsupport.',
      author: 'Marcus L.',
      rating: 5,
    },
    {
      quote: 'Äntligen en seriös marknadsplats bara för hjul. Slipper bläddra igenom tusentals irrelevanta annonser.',
      author: 'Erik S.',
      rating: 4,
    },
  ];

  return (
    <section className="py-24 px-5 sm:px-8">
      <div ref={ref} className="fade-in max-w-site mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark tracking-tight text-center mb-4">
          Vad våra användare säger
        </h2>
        <p className="text-brand-gray-medium text-center max-w-md mx-auto mb-12">
          Köpare och säljare som redan hittat rätt på Wheelplace.
        </p>

        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {testimonials.map((t) => (
            <TestimonialCard key={t.author} {...t} />
          ))}
        </div>

        <div className="flex flex-col items-center gap-2 pt-4">
          <img src="/trustpilot-logo-dark.svg" alt="Trustpilot" className="h-6" />
          <img src="/trustpilot-stars.svg" alt="4.3 av 5" className="h-9" />
          <p className="text-sm text-brand-gray-medium">
            <span className="font-semibold text-brand-dark">TrustScore 4.3</span> · 39 omdömen
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── Product Education ─── */
function ProductEducation() {
  const [activeTab, setActiveTab] = useState('dack');
  const ref = useScrollReveal();

  const tabs = [
    {
      id: 'dack',
      label: 'Däck',
      icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="11" /><circle cx="12" cy="12" r="7" /><path d="M5.5 5.5l3 3M15.5 15.5l3 3M18.5 5.5l-3 3M5.5 18.5l3-3" /></svg>,
      title: 'Allt du behöver veta om däck',
      content: [
        { label: 'Dimension', desc: 'Anges som t.ex. 205/55 R16 — bredd/profil och fälgstorlek.' },
        { label: 'Mönsterdjup', desc: 'Nytt däck: ca 8 mm. Lagkrav: minst 1,6 mm. Rekommenderat vinter: 3+ mm.' },
        { label: 'Hastighetsindex', desc: 'Bokstaven efter storleken (t.ex. "V") anger max hastighet för däcket.' },
        { label: 'DOT-nummer', desc: 'De fyra sista siffrorna visar tillverkningsvecka och år (t.ex. 2423 = vecka 24, 2023).' },
      ],
    },
    {
      id: 'falgar',
      label: 'Fälgar',
      icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /><path d="M12 5v4M12 15v4M5 12h4M15 12h4" /></svg>,
      title: 'Välj rätt fälgar',
      content: [
        { label: 'Bultmönster', desc: 'T.ex. 5x108 — antal bultar × cirkelns diameter i mm.' },
        { label: 'ET-tal', desc: 'Inpressningen i mm. Avgör hur långt ut hjulet sticker.' },
        { label: 'Centrumhål', desc: 'Navhålets diameter. Måste matcha eller använda centrumringar.' },
        { label: 'Material', desc: 'Aluminium (lättare, snyggare) eller stål (billigare, tåligare).' },
      ],
    },
    {
      id: 'kompletta',
      label: 'Kompletta hjul',
      icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
      title: 'Kompletta hjul — redo att rulla',
      content: [
        { label: 'Vad ingår?', desc: 'Däck monterade på fälg — klara att sättas på bilen direkt.' },
        { label: 'Fördelar', desc: 'Sparar tid och pengar vid säsongsbyte.' },
        { label: 'TPMS', desc: 'Nyare bilar kräver tryckventiler — kontrollera att de följer med.' },
        { label: 'Balansering', desc: 'Kompletta hjul bör vara balanserade. Kontrollera med säljaren.' },
      ],
    },
  ];

  const active = tabs.find((t) => t.id === activeTab);

  return (
    <section className="py-24 px-5 sm:px-8">
      <div ref={ref} className="fade-in max-w-site mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark tracking-tight text-center mb-4">
          Hjulguiden
        </h2>
        <p className="text-brand-gray-medium text-center max-w-md mx-auto mb-12">
          Osäker på vad du behöver? Här är grunderna.
        </p>

        <div className="flex justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer border-none
                ${activeTab === tab.id
                  ? 'bg-brand-dark text-white'
                  : 'bg-brand-gray-light text-brand-dark hover:bg-brand-gray'
                }
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-brand-gray-light rounded-2xl p-8 sm:p-10">
          <h3 className="text-xl font-bold text-brand-dark mb-8">{active.title}</h3>
          <div className="grid sm:grid-cols-2">
            {active.content.map((item, i) => (
              <div key={item.label} className={`p-5 ${i < 2 ? 'border-b border-brand-gray/40' : ''} ${i % 2 === 0 ? 'sm:border-r border-brand-gray/40' : ''}`}>
                <h4 className="font-bold text-brand-dark text-[15px] mb-1.5">{item.label}</h4>
                <p className="text-[15px] text-brand-gray-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Sustainability / Vision ─── */
function Sustainability() {
  const ref = useScrollReveal();
  const [playing, setPlaying] = useState(false);

  return (
    <section className="py-24 px-5 sm:px-8 overflow-hidden relative">
      <div className="absolute inset-0">
        <img
          src="/sustainability-bg.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <div ref={ref} className="fade-in relative z-10 max-w-site mx-auto text-center">
        <span className="inline-block text-brand-blue text-sm font-medium tracking-wide uppercase mb-6">
          Hållbarhet
        </span>

        <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
          Varje däck förtjänar<br />en andra chans
        </h2>

        <p className="text-white/60 text-[17px] max-w-xl mx-auto mb-14 leading-relaxed">
          Vi tror på en framtid där varje däck och fälg får en ökad livslängd.
          Genom att ge hjul ett andra liv minskar vi avfall och sparar jordens resurser.
        </p>

        {/* Video */}
        <div className="mx-auto mb-16 rounded-2xl overflow-hidden shadow-2xl aspect-video relative">
          {playing ? (
            <iframe
              src="https://www.youtube.com/embed/X6x1yPQ7n6A?autoplay=1"
              title="Wheelplace — Hållbarhet"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-none"
            />
          ) : (
            <button onClick={() => setPlaying(true)} className="w-full h-full relative cursor-pointer border-none p-0 bg-transparent">
              <img src="/video-thumb.jpg" alt="Spela video" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-brand-dark ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </button>
          )}
        </div>

        <div className="grid sm:grid-cols-4 gap-10">
          {[
            { title: '12 450+', desc: 'Hjul har fått nytt liv via Wheelplace' },
            { title: 'Minskat avfall', desc: 'Återanvända hjul innebär färre på deponi' },
            { title: 'Sparade resurser', desc: 'Tillverkning av nya däck kräver enorma resurser' },
            { title: 'Cirkulär ekonomi', desc: 'Vi kopplar samman säljare och köpare direkt' },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="text-white font-bold mb-2">{item.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── B2B ─── */
function B2BSection() {
  const ref = useScrollReveal();

  return (
    <section className="py-24 px-5 sm:px-8 bg-brand-gray-light">
      <div ref={ref} className="fade-in max-w-site mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block text-brand-blue text-sm font-medium tracking-wide uppercase mb-4">
              För företag
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark tracking-tight mb-5">
              Verkstad eller bilhandlare?
            </h2>
            <p className="text-brand-gray-medium leading-relaxed mb-8">
              Nå tusentals köpare som aktivt letar efter hjul. Wheelplace ger dig en dedikerad kanal
              för att sälja lagersaldo, ta emot förfrågningar och bygga kundrelationer.
            </p>
            <ul className="list-none space-y-4 mb-8">
              {[
                'Eget företagskonto med obegränsade annonser',
                'Synlighet mot köpare som söker med regnummer',
                'Förfrågningar direkt från kunder i ditt område',
                'Oberoende kundsupport som stöttar köpprocessen',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 text-brand-blue mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[15px] text-brand-dark">{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="/kontakt"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-dark hover:bg-brand-black text-white font-medium text-sm transition-colors"
            >
              Kontakta oss
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-gray/30">
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-full bg-brand-blue/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand-dark">Företagskonto</h3>
              <p className="text-sm text-brand-gray-medium mt-1">Nå fler kunder idag</p>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Aktiva annonser', value: 'Obegränsat' },
                { label: 'Förfrågningar', value: 'Direkt' },
                { label: 'Support', value: 'Prioriterad' },
                { label: 'Pris', value: 'Kontakta oss' },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between py-3 px-4 rounded-xl bg-brand-gray-light">
                  <span className="text-sm text-brand-gray-medium">{row.label}</span>
                  <span className="text-sm font-bold text-brand-dark">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */
function FAQSection() {
  return (
    <section id="kontakt" className="py-24 px-5 sm:px-8">
      <div className="max-w-site mx-auto">
        <div className="grid md:grid-cols-[1fr_300px] gap-16">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark tracking-tight mb-4">
              Vanliga frågor
            </h2>
            <p className="text-brand-gray-medium mb-10">
              Hittar du inte svaret? Kontakta oss så hjälper vi dig.
            </p>
            <FAQAccordion />
          </div>

          <div className="hidden md:block">
            <div className="sticky top-24 p-7 rounded-2xl bg-brand-gray-light">
              <h3 className="font-bold text-brand-dark mb-2">Behöver du hjälp?</h3>
              <p className="text-sm text-brand-gray-medium mb-5 leading-relaxed">
                Vår oberoende kundsupport guidar dig till rätt hjul.
              </p>
              <Link
                to="/kontakt"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-medium text-sm transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                Kontakta oss
              </Link>
              <a
                href="/forfragningar"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-brand-gray text-brand-dark font-medium text-sm transition-colors mt-3 hover:bg-white"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
                </svg>
                Skapa förfrågan
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Main Landing Page ─── */
export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Navbar />
      <main>
        <Hero />
        <FeaturedListings />
        <HowItWorks />
        <section className="py-24 px-5 sm:px-8 bg-brand-gray-light">
          <div className="max-w-site mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark tracking-tight text-center mb-4">
              Hitta efter kategori
            </h2>
            <p className="text-brand-gray-medium text-center max-w-md mx-auto mb-12">
              Bläddra bland de populäraste kategorierna.
            </p>
            <CategoryGrid />
          </div>
        </section>
        <section className="relative py-20 px-5 sm:px-8 overflow-hidden">
          <div className="absolute inset-0">
            <img src="/regnummer-hero.jpg" alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-brand-dark/75" />
          </div>
          <div className="relative max-w-site mx-auto">
            <div className="grid md:grid-cols-[1fr_auto] gap-10 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
                  Sök med registreringsnummer
                </h2>
                <p className="text-white/50 leading-relaxed max-w-lg">
                  Skriv in ditt regnummer så visar vi vilka hjul, däck och fälgar som passar just din bil.
                </p>
              </div>
              <div className="w-full md:w-[480px]">
                <PlateSearch size="large" />
              </div>
            </div>
          </div>
        </section>
        <section className="py-24 px-5 sm:px-8">
          <div className="max-w-site mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark tracking-tight text-center mb-4">
              Sök efter bilmärke
            </h2>
            <p className="text-brand-gray-medium text-center max-w-md mx-auto mb-12">
              Hitta hjul som passar just din bil.
            </p>
            <BrandGrid />
          </div>
        </section>
        <SocialProof />
        <ProductEducation />
        <Sustainability />
        <B2BSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
