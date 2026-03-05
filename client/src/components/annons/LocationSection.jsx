export default function LocationSection({ listing }) {
  const details = listing.locationDetails;
  const city = details?.city || listing.location;
  const region = details?.region || listing.location;

  return (
    <div className="bg-white rounded-xl border border-brand-gray/40 p-5">
      <h2 className="text-lg font-bold text-brand-dark mb-4">Plats</h2>

      <div className="flex items-start gap-3 mb-4">
        <svg className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
        <div>
          <p className="font-medium text-brand-dark">{city}</p>
          <p className="text-sm text-brand-gray-medium">{region}</p>
        </div>
      </div>

      {/* Google Maps embed */}
      <div className="aspect-[16/9] rounded-lg overflow-hidden border border-brand-gray/40">
        <iframe
          title="Karta"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(city + ', ' + region + ', Sverige')}&zoom=10`}
          allowFullScreen
        />
      </div>
    </div>
  );
}
