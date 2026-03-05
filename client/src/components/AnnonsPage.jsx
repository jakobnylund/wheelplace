import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import mockListings from '../data/mockListings';
import ImageGallery from './annons/ImageGallery';
import InfoPanel from './annons/InfoPanel';
import DetailsGrid from './annons/DetailsGrid';
import SellerCard from './annons/SellerCard';
import LocationSection from './annons/LocationSection';
import CompareSection from './annons/CompareSection';
import ReviewsSection from './annons/ReviewsSection';
import TryOnCar from './annons/TryOnCar';
import Navbar from './ui/Navbar';
import Footer from './ui/Footer';

/* ─── Main Detail Page ─── */
export default function AnnonsPage() {
  const { id } = useParams();
  const listing = mockListings.find((l) => l.id === Number(id));

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!listing) {
    return (
      <div className="min-h-screen bg-brand-gray-light">
        <Navbar />
        <div className="pt-[72px]">
          <div className="px-5 sm:px-8"><div className="max-w-site mx-auto py-20 text-center">
            <h1 className="text-2xl font-bold text-brand-dark mb-4">Annons hittades inte</h1>
            <p className="text-brand-gray-medium mb-6">Annonsen du letar efter finns inte eller har tagits bort.</p>
            <Link
              to="/annonser"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white text-sm font-medium transition-colors"
            >
              Tillbaka till annonser
            </Link>
          </div></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-gray-light overflow-x-clip">
      <Navbar />

      <div className="pt-[72px]">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-brand-gray/40">
          <div className="px-5 sm:px-8"><div className="max-w-site mx-auto py-4">
            <div className="flex items-center gap-2 text-sm text-brand-gray-medium">
              <Link to="/" className="hover:text-brand-blue transition-colors">Hem</Link>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <Link to="/annonser" className="hover:text-brand-blue transition-colors">Annonser</Link>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-brand-dark truncate max-w-[200px] sm:max-w-none">{listing.title}</span>
            </div>
          </div></div>
        </div>

        {/* Content */}
        <div className="px-5 sm:px-8"><div className="max-w-site mx-auto py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left column */}
            <div className="flex-1 min-w-0 space-y-6">
              <ImageGallery images={listing.images} title={listing.title} />

              {/* InfoPanel — mobile only (between gallery and details) */}
              <div className="lg:hidden">
                <InfoPanel listing={listing} />
              </div>

              <DetailsGrid listing={listing} />

              {/* Description */}
              {listing.description && (
                <div className="bg-white rounded-xl border border-brand-gray/40 p-5">
                  <h2 className="text-lg font-bold text-brand-dark mb-3">Beskrivning</h2>
                  <p className="text-sm text-brand-dark/80 leading-relaxed whitespace-pre-line">
                    {listing.description}
                  </p>
                </div>
              )}

              <TryOnCar listing={listing} />
              <CompareSection listing={listing} />
              <LocationSection listing={listing} />
              <SellerCard listing={listing} />
              <ReviewsSection />
            </div>

            {/* Right column — sticky info panel (desktop only) */}
            <div className="hidden lg:block w-[340px] flex-shrink-0 self-start sticky top-[88px]">
              <InfoPanel listing={listing} />
            </div>
          </div>
        </div></div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}