import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ activePage } = {}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const annonserClass = activePage === 'annonser'
    ? 'flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg text-brand-blue'
    : 'flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg text-brand-dark/70 hover:text-brand-blue transition-colors';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-brand-gray/40">
      <div className="px-5 sm:px-8"><div className="max-w-site mx-auto">
        <div className="flex items-center h-[72px] gap-6">
          <Link to="/" className="flex-shrink-0">
            <img src="/logo.svg" alt="Wheelplace" className="h-9" />
          </Link>

          <div className="hidden md:flex items-center flex-1 max-w-xl border border-brand-gray rounded-full hover:border-brand-gray-medium transition-colors">
            <div className="pl-4 pr-2 text-brand-gray-medium">
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Sök annonser..."
              className="flex-1 bg-transparent text-sm text-brand-dark placeholder:text-brand-gray-medium outline-none py-2.5 pr-4"
            />
          </div>

          <div className="hidden lg:flex items-center gap-1 flex-shrink-0">
            <Link to="/annonser" className={annonserClass}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
              <span className="text-[11px] font-medium">Annonser</span>
            </Link>
            <Link to="/forfragningar" className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg text-brand-dark/70 hover:text-brand-blue transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
              </svg>
              <span className="text-[11px] font-medium">Förfrågningar</span>
            </Link>
            <Link to="/kontakt" className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg text-brand-dark/70 hover:text-brand-blue transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              <span className="text-[11px] font-medium">Kontakt</span>
            </Link>
            <Link to="/logga-in" className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg text-brand-dark/70 hover:text-brand-blue transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              <span className="text-[11px] font-medium">Logga in</span>
            </Link>
            <div className="w-px h-8 bg-brand-gray/60 mx-2" />
            <a
              href="https://www.wheelplace.com/sökannonser"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-brand-dark/20 text-brand-dark text-sm font-medium hover:border-brand-dark/40 hover:bg-brand-gray-light transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
              </svg>
              Skapa förfrågan
            </a>
            <Link
              to="/logga-in"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-blue hover:bg-brand-blue-dark text-white text-sm font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Lägg in annons
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden ml-auto p-2 text-brand-dark bg-transparent border-none cursor-pointer"
            aria-label="Meny"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden pb-5">
            <div className="flex items-center border border-brand-gray rounded-full mb-4">
              <div className="pl-4 pr-2 text-brand-gray-medium">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input type="text" placeholder="Sök annonser..." className="flex-1 bg-transparent text-sm text-brand-dark placeholder:text-brand-gray-medium outline-none py-2.5 pr-4" />
            </div>
            <Link to="/logga-in" className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-brand-blue text-white text-sm font-medium mb-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
              Lägg in annons
            </Link>
            <a href="https://www.wheelplace.com/sökannonser" className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-brand-dark/20 text-brand-dark text-sm font-medium mb-3">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" /></svg>
              Skapa förfrågan
            </a>
            <div className="h-px bg-brand-gray/40 my-3" />
            {[
              { label: 'Annonser', to: '/annonser' },
              { label: 'Förfrågningar', to: '/forfragningar' },
              { label: 'Kontakt', to: '/kontakt' },
              { label: 'Logga in', to: '/logga-in' },
            ].map((link) =>
              link.to ? (
                <Link key={link.label} to={link.to} className="flex items-center gap-3 px-3 py-3 text-sm text-brand-dark rounded-lg hover:bg-brand-gray-light transition-colors">{link.label}</Link>
              ) : (
                <a key={link.label} href={link.href} className="flex items-center gap-3 px-3 py-3 text-sm text-brand-dark rounded-lg hover:bg-brand-gray-light transition-colors">{link.label}</a>
              )
            )}
          </div>
        )}
      </div></div>
    </nav>
  );
}
