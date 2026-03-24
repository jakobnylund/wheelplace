import { NavLink, Outlet, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/annonser-proto', label: 'Annonser', icon: '/icons/grid.svg', end: true },
  { to: '/annonser-proto/skapa', label: 'Skapa annons', icon: '/icons/plus.svg' },
  { to: '/annonser-proto/bulk', label: 'Bulk-uppladdning', icon: '/icons/clipboard.svg' },
  { to: '/annonser-proto/seo/volvo-xc60', label: 'SEO-sida', icon: '/icons/document.svg' },
];

export default function AnnonserLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-brand-gray-light">
      {/* Top navigator bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-brand-gray/40 backdrop-blur-md bg-white/95">
        <div className="max-w-site mx-auto px-5 md:px-8">
          <div className="flex items-center h-16 gap-6">
            {/* Logo / back link */}
            <a href="/" className="flex items-center gap-2 shrink-0 mr-2">
              <img src="/logo.svg" alt="Wheelplace" className="h-6" />
            </a>

            {/* Prototype badge */}
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold text-brand-blue bg-brand-blue-50 px-2.5 py-1 rounded-full shrink-0 tracking-wide uppercase">
              Prototyp
            </span>

            {/* Nav items */}
            <nav className="flex items-center gap-1 ml-auto overflow-x-auto scrollbar-hide">
              {navItems.map(({ to, label, icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium whitespace-nowrap transition-colors duration-150 ${
                      isActive
                        ? 'bg-brand-blue-50 text-brand-blue font-semibold'
                        : 'text-brand-gray-medium hover:text-brand-dark hover:bg-brand-gray-light'
                    }`
                  }
                >
                  <img src={icon} alt="" className="w-4 h-4 opacity-60" />
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Page content */}
      <Outlet />
    </div>
  );
}
