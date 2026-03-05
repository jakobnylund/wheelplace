import { Link } from 'react-router-dom';

const brandLinks = ['Audi','BMW','BYD','Citroen','Cupra','Dacia','Fiat','Ford','Honda','Hyundai','Kia','Land Rover','Mazda','Mercedes-Benz','MG','Nissan','Peugeot','Polestar','Porsche','Renault','Saab','Seat','Skoda','Subaru','Tesla','Volkswagen','Volvo'];
const dimensionLinks = ['195/65R15','205/55R16','205/60R16','215/60R16','225/45R17','215/55R17','225/50R17','225/40R18','235/45R18','245/45R18','235/45R19','245/45R19','255/45R19','245/40R20','255/40R20','275/40R20','255/35R21','265/35R21','275/35R21'];
const rimLinks = ['Fälgar 15 tum','Fälgar 16 tum','Fälgar 17 tum','Fälgar 18 tum','Fälgar 19 tum','Fälgar 20 tum','Fälgar 21 tum','Fälgar 22 tum','Fälgar 4/100','Fälgar 4/108','Fälgar 5/100','Fälgar 5/108','Fälgar 5/112','Fälgar 5/114.3','Fälgar 5/120','Fälgar 5/130'];

const socials = [
  { label: 'Facebook', href: 'https://facebook.com', icon: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z' },
  { label: 'Instagram', href: 'https://instagram.com', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
  { label: 'YouTube', href: 'https://youtube.com', icon: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
  { label: 'TikTok', href: 'https://tiktok.com', icon: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z' },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-brand-gray/40 overflow-hidden">
      <div className="px-5 sm:px-8"><div className="max-w-site mx-auto pt-16 pb-8">
        {/* Top section — brand + nav links side by side */}
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 mb-14">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-5">
              <img src="/logo.svg" alt="Wheelplace" className="h-10" />
            </Link>
            <p className="text-[15px] text-brand-gray-medium leading-relaxed mb-6">
              Sveriges smartaste marknadsplats för hjul, däck och fälgar. Köp och sälj tryggt — vi hjälper dig hitta rätt.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label} className="w-9 h-9 rounded-full bg-brand-gray flex items-center justify-center text-brand-dark/50 hover:bg-brand-blue hover:text-white transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={s.icon} /></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Nav link columns — consistent 3-col grid */}
          <div className="grid grid-cols-3 gap-8">
            <div>
              <h4 className="text-xs font-semibold text-brand-dark/40 uppercase tracking-wider mb-4">Wheelplace</h4>
              <ul className="space-y-3">
                <li><a href="https://www.wheelplace.com/om-oss" className="text-sm text-brand-gray-medium hover:text-brand-blue transition-colors">Om Wheelplace</a></li>
                <li><Link to="/annonser" className="text-sm text-brand-gray-medium hover:text-brand-blue transition-colors">Alla annonser</Link></li>
                <li><Link to="/logga-in" className="text-sm text-brand-gray-medium hover:text-brand-blue transition-colors">Lägg in annons</Link></li>
                <li><a href="https://www.wheelplace.com" className="text-sm text-brand-gray-medium hover:text-brand-blue transition-colors">Tips & guider</a></li>
                <li><a href="https://www.wheelplace.com" className="text-sm text-brand-gray-medium hover:text-brand-blue transition-colors">Blogg</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-brand-dark/40 uppercase tracking-wider mb-4">Köpare & säljare</h4>
              <ul className="space-y-3">
                <li><a href="https://www.wheelplace.com" className="text-sm text-brand-gray-medium hover:text-brand-blue transition-colors">Privatpersoner</a></li>
                <li><a href="https://www.wheelplace.com" className="text-sm text-brand-gray-medium hover:text-brand-blue transition-colors">Företag</a></li>
                <li><a href="https://www.wheelplace.com" className="text-sm text-brand-gray-medium hover:text-brand-blue transition-colors">Begagnade däck</a></li>
                <li><a href="https://www.wheelplace.com" className="text-sm text-brand-gray-medium hover:text-brand-blue transition-colors">Begagnade fälgar</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-brand-dark/40 uppercase tracking-wider mb-4">Juridiskt</h4>
              <ul className="space-y-3">
                <li><a href="https://www.wheelplace.com/villkor" className="text-sm text-brand-gray-medium hover:text-brand-blue transition-colors">Allmänna villkor</a></li>
                <li><a href="https://www.wheelplace.com/integritetspolicy" className="text-sm text-brand-gray-medium hover:text-brand-blue transition-colors">Integritetspolicy</a></li>
                <li><a href="https://www.wheelplace.com/kontakt" className="text-sm text-brand-gray-medium hover:text-brand-blue transition-colors">Kontakt</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-brand-gray/40 mb-10" />

        {/* SEO links — same 3-col grid aligned with nav columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <h4 className="text-xs font-semibold text-brand-dark/40 uppercase tracking-wider mb-4">Hjul per bilmärke</h4>
            <div className="flex flex-wrap gap-x-1.5 gap-y-1">
              {brandLinks.map((b, i) => (
                <span key={b}>
                  <Link to={`/annonser?brand=${encodeURIComponent(b)}`} className="text-[13px] text-brand-dark/40 hover:text-brand-blue transition-colors">{b}</Link>
                  {i < brandLinks.length - 1 && <span className="text-brand-dark/20 ml-1.5">·</span>}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-brand-dark/40 uppercase tracking-wider mb-4">Populära dimensioner</h4>
            <div className="flex flex-wrap gap-x-1.5 gap-y-1">
              {dimensionLinks.map((d, i) => (
                <span key={d}>
                  <Link to={`/annonser?dimension=${encodeURIComponent(d)}`} className="text-[13px] text-brand-dark/40 hover:text-brand-blue transition-colors">{d}</Link>
                  {i < dimensionLinks.length - 1 && <span className="text-brand-dark/20 ml-1.5">·</span>}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-brand-dark/40 uppercase tracking-wider mb-4">Fälgar</h4>
            <div className="flex flex-wrap gap-x-1.5 gap-y-1">
              {rimLinks.map((r, i) => (
                <span key={r}>
                  <Link to={`/annonser?rim=${encodeURIComponent(r)}`} className="text-[13px] text-brand-dark/40 hover:text-brand-blue transition-colors">{r}</Link>
                  {i < rimLinks.length - 1 && <span className="text-brand-dark/20 ml-1.5">·</span>}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="h-px bg-brand-gray/40 mb-6" />
        <p className="text-[13px] text-brand-dark/30">&copy; {new Date().getFullYear()} Wheelplace AB. Alla rättigheter förbehållna.</p>
      </div></div>
    </footer>
  );
}
