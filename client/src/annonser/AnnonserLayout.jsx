import { NavLink, Outlet } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';

const protoNavItems = [
  { to: '/annonser-proto', label: 'Annonser', end: true },
  { to: '/annonser-proto/skapa', label: 'Skapa annons' },
  { to: '/annonser-proto/bulk', label: 'Bulk-uppladdning' },
  { to: '/annonser-proto/seo/volvo-xc60', label: 'SEO-sida' },
];

export default function AnnonserLayout() {
  return (
    <div className="min-h-screen bg-brand-gray-light">
      {/* Production navbar */}
      <Navbar activePage="annonser" />

      {/* Prototype sub-nav — sits below the 72px navbar */}
      <div className="fixed top-[72px] left-0 right-0 z-40 bg-brand-dark/95 backdrop-blur-sm">
        <div className="px-5 sm:px-8">
          <div className="max-w-site mx-auto flex items-center h-10 gap-1 overflow-x-auto">
            <span className="text-[11px] font-bold text-white/40 uppercase tracking-wider mr-3 shrink-0">Prototyp</span>
            {protoNavItems.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md text-[12px] font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-brand-blue text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Page content — offset for both navbar (72px) + proto-nav (40px) */}
      <div className="pt-[112px]">
        <Outlet />
      </div>
    </div>
  );
}
