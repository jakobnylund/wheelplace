import { useState } from 'react';

export default function InfoPanel({ listing }) {
  const [deliveryOpen, setDeliveryOpen] = useState(false);

  const dimension = `${listing.specs.width}/${listing.specs.profile}R${listing.specs.diameter}`;

  return (
    <div className="bg-white rounded-xl border border-brand-gray/40 p-5 space-y-5">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-brand-dark leading-snug mb-1">
          {listing.title}
        </h1>
        <p className="text-sm text-brand-gray-medium">{listing.date}</p>
      </div>

      {/* Price */}
      <p className="text-2xl font-bold text-brand-blue">
        {listing.price.toLocaleString('sv-SE')} kr
      </p>

      {/* Quick specs */}
      <div className="space-y-2.5 text-sm">
        <div className="flex justify-between">
          <span className="text-brand-gray-medium">Dimension</span>
          <span className="font-medium text-brand-dark">{dimension}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-brand-gray-medium">Produkt</span>
          <span className="font-medium text-brand-dark">{listing.product}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-brand-gray-medium">Skick</span>
          <span className="font-medium text-brand-dark">{listing.condition}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-brand-gray-medium">Antal</span>
          <span className="font-medium text-brand-dark">{listing.quantity} st</span>
        </div>
        {listing.brand && (
          <div className="flex justify-between">
            <span className="text-brand-gray-medium">Bilmärke</span>
            <span className="font-medium text-brand-dark">{listing.brand}</span>
          </div>
        )}
      </div>

      {/* Seller */}
      <div className="flex items-center gap-2 pt-3 border-t border-brand-gray/30">
        <div className="w-8 h-8 rounded-full bg-brand-gray-light flex items-center justify-center text-sm font-bold text-brand-gray-medium">
          {listing.seller.name.charAt(0)}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium text-brand-dark">{listing.seller.name}</span>
            {listing.seller.type === 'Företag' && (
              <svg className="w-4 h-4 text-green-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <span className="text-xs text-brand-gray-medium">{listing.seller.type}</span>
        </div>
      </div>

      {/* Action buttons row */}
      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-brand-gray/60 bg-white text-sm text-brand-dark hover:bg-brand-gray-light transition-colors cursor-pointer">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
          </svg>
          Dela
        </button>
        <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-brand-gray/60 bg-white text-sm text-brand-dark hover:bg-brand-gray-light transition-colors cursor-pointer">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          Visa PDF
        </button>
        <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-brand-gray/60 bg-white hover:bg-brand-gray-light transition-colors cursor-pointer flex-shrink-0">
          <svg className="w-[18px] h-[18px] text-brand-dark/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
      </div>

      {/* Delivery */}
      {listing.deliveryOptions && listing.deliveryOptions.length > 0 && (
        <div>
          <button
            onClick={() => setDeliveryOpen(!deliveryOpen)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg border border-brand-gray/60 bg-white text-sm text-brand-dark cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-brand-gray-medium" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H18.75m-7.5-3V6.375c0-.621.504-1.125 1.125-1.125H18a2.25 2.25 0 012.25 2.25V11.25" />
              </svg>
              Leveransalternativ
            </span>
            <svg
              className={`w-4 h-4 text-brand-gray-medium transition-transform ${deliveryOpen ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {deliveryOpen && (
            <ul className="mt-2 space-y-1.5 pl-1">
              {listing.deliveryOptions.map((opt) => (
                <li key={opt} className="flex items-start gap-2 text-sm text-brand-dark">
                  <svg className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {opt}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* CTA buttons */}
      <div className="space-y-2.5 pt-2">
        <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-brand-green hover:bg-brand-green-dark text-white font-semibold text-sm transition-colors cursor-pointer border-none shadow-sm">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          Köp nu
        </button>
        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-brand-gray/60 bg-white text-brand-dark font-medium text-sm hover:bg-brand-gray-light transition-colors cursor-pointer">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
          Skicka meddelande
        </button>
      </div>
    </div>
  );
}
