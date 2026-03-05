export default function SellerCard({ listing }) {
  const details = listing.sellerDetails;

  return (
    <div className="bg-white rounded-xl border border-brand-gray/40 p-5">
      <h2 className="text-lg font-bold text-brand-dark mb-4">Säljes av</h2>

      <div className="flex items-start gap-3 mb-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-brand-gray-light flex items-center justify-center text-lg font-bold text-brand-gray-medium flex-shrink-0">
          {listing.seller.name.charAt(0)}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-brand-dark">{listing.seller.name}</span>
            {listing.seller.type === 'Företag' && (
              <svg className="w-4 h-4 text-green-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <span className="text-sm text-brand-gray-medium">{listing.seller.type}</span>
          {details?.description && (
            <p className="text-sm text-brand-dark/70 mt-1.5 leading-relaxed">{details.description}</p>
          )}
        </div>
      </div>

      {details?.memberSince && (
        <p className="text-xs text-brand-gray-medium mb-3">
          Medlem sedan {details.memberSince}
          {details.responseTime && <> · {details.responseTime}</>}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-blue hover:bg-brand-blue-dark text-white text-sm font-medium transition-colors cursor-pointer border-none">
          Visa profil
        </button>
        {details?.email && (
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-brand-gray/60 bg-white text-sm text-brand-dark hover:bg-brand-gray-light transition-colors cursor-pointer">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            Visa e-post
          </button>
        )}
        {details?.phone && (
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-brand-gray/60 bg-white text-sm text-brand-dark hover:bg-brand-gray-light transition-colors cursor-pointer">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            Visa telefonnummer
          </button>
        )}
      </div>
    </div>
  );
}
