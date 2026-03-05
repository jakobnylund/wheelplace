import PlateSearch from '../ui/PlateSearch';

export default function CompareSection({ listing }) {
  const dimension = `${listing.specs.width}/${listing.specs.profile}R${listing.specs.diameter}`;

  return (
    <div className="bg-white rounded-xl border border-brand-gray/40 p-5">
      <h2 className="text-lg font-bold text-brand-dark mb-4">Jämför</h2>
      <p className="text-sm text-brand-gray-medium mb-4">
        Ange ditt registreringsnummer för att se om dessa hjul passar din bil.
      </p>

      <div className="mb-5">
        <PlateSearch size="small" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Listing specs */}
        <div className="p-3 rounded-lg bg-brand-gray-light">
          <p className="text-xs font-bold text-brand-gray-medium uppercase tracking-wide mb-2">Annons</p>
          <div className="space-y-1.5 text-sm">
            <p><span className="text-brand-gray-medium">Dimension:</span> <span className="font-medium text-brand-dark">{dimension}</span></p>
            <p><span className="text-brand-gray-medium">Produkt:</span> <span className="font-medium text-brand-dark">{listing.product}</span></p>
            <p><span className="text-brand-gray-medium">Typ:</span> <span className="font-medium text-brand-dark">{listing.tireType}</span></p>
          </div>
        </div>

        {/* Car specs placeholder */}
        <div className="p-3 rounded-lg bg-brand-gray-light border-2 border-dashed border-brand-gray/60 flex items-center justify-center">
          <p className="text-sm text-brand-gray-medium text-center">
            Sök med regnummer för att jämföra
          </p>
        </div>
      </div>
    </div>
  );
}
