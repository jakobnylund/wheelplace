export default function DetailsGrid({ listing }) {
  const dimension = `${listing.specs.width}/${listing.specs.profile}R${listing.specs.diameter}`;

  const items = [
    { label: 'Bilmodell', value: listing.carModel || '—' },
    { label: 'Däckdimension', value: dimension },
    { label: 'Produkt', value: listing.product },
    { label: 'Däcktyp', value: listing.tireType },
    { label: 'Däckmärke', value: listing.tireBrand || '—' },
    { label: 'Län', value: listing.location },
    { label: 'Skick', value: listing.condition },
    { label: 'Mönsterdjup', value: listing.specs.depth || '—' },
    { label: 'Referens', value: listing.reference || '—' },
    { label: 'DOT', value: listing.dot || '—' },
  ];

  return (
    <div className="bg-white rounded-xl border border-brand-gray/40 p-5">
      <h2 className="text-lg font-bold text-brand-dark mb-4">Detaljer</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
        {items.map((item) => (
          <div key={item.label}>
            <p className="text-xs text-brand-gray-medium mb-0.5">{item.label}</p>
            <p className="text-sm font-medium text-brand-dark">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
