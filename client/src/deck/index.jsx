import { useRef, useState, useEffect, useCallback } from 'react';
import { toJpeg } from 'html-to-image';
import { jsPDF } from 'jspdf';

/* ── Scroll-triggered animation hook ───────────────────── */

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

/* ── Animated number counter ───────────────────────────── */

function useCountUp(target, visible, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const num = parseFloat(String(target).replace(/[^0-9.,]/g, '').replace(',', '.')) || 0;
    if (num === 0) { setValue(0); return; }
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * num));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, target, duration]);

  return value;
}

function AnimatedStat({ number, label, visible }) {
  // Parse the display format: "4 650" → count to 4650, display with space
  const raw = String(number).replace(/\s/g, '');
  const isM = raw.includes('M');
  const numericTarget = parseFloat(raw.replace(/[^0-9.]/g, '')) || 0;
  const counted = useCountUp(numericTarget, visible, 1400);

  let display;
  if (isM) {
    display = counted + 'M' + (raw.includes('+') ? '+' : '');
  } else if (numericTarget >= 1000) {
    display = counted.toLocaleString('sv-SE');
  } else {
    display = String(counted);
  }

  return (
    <div>
      <div className="text-[40px] font-bold text-brand-blue leading-none font-heading">{visible ? display : '0'}</div>
      <div className="text-[13px] font-medium uppercase tracking-wider mt-2 text-brand-gray-medium">{label}</div>
    </div>
  );
}

/* ── Animated bar fill ─────────────────────────────────── */

function AnimatedBar({ width, opacity, visible, delay = 0 }) {
  return (
    <div className="h-3 rounded bg-brand-gray-light overflow-hidden">
      <div
        className="h-full rounded bg-brand-blue"
        style={{
          width: visible ? width : '0%',
          opacity,
          transition: `width 1s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        }}
      />
    </div>
  );
}

/* ── Shared primitives ─────────────────────────────────── */

function Slide({ children, dark = false, className = '' }) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={`slide relative overflow-hidden ${dark ? 'bg-brand-dark text-white' : 'bg-white text-brand-dark'} ${className}`}
      style={{ width: '1280px', height: '720px', flexShrink: 0 }}
    >
      <div
        className="h-full"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* Stagger wrapper — each direct child gets a sequential delay */
function Stagger({ children, delay = 0.12, className = '' }) {
  const { ref, visible } = useReveal();
  const items = Array.isArray(children) ? children : [children];

  return (
    <div ref={ref} className={className}>
      {items.map((child, i) => (
        <div
          key={i}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${i * delay}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * delay}s`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

function Tag({ children, dark }) {
  return (
    <span className={`text-[11px] font-semibold tracking-[2.5px] uppercase ${dark ? 'text-brand-blue-light' : 'text-brand-blue'}`}>
      {children}
    </span>
  );
}

function H1({ children, dark, className = '' }) {
  return (
    <h2 className={`text-[38px] font-bold leading-[1.12] font-heading ${dark ? 'text-white' : 'text-brand-dark'} ${className}`}>
      {children}
    </h2>
  );
}

function Body({ children, dark, className = '' }) {
  return (
    <p className={`text-[15px] leading-[1.6] ${dark ? 'text-white/60' : 'text-brand-gray-medium'} ${className}`}>
      {children}
    </p>
  );
}

/* Motif: left blue border card */
function BlueCard({ children, className = '' }) {
  return (
    <div className={`border-l-[3px] border-l-brand-blue bg-brand-gray-light rounded-r-lg pl-5 pr-5 py-4 ${className}`}>
      {children}
    </div>
  );
}

function DarkCard({ children, className = '' }) {
  return (
    <div className={`border-l-[3px] border-l-brand-blue bg-white/8 rounded-r-lg pl-5 pr-5 py-4 ${className}`}>
      {children}
    </div>
  );
}

function GrayBox({ children, className = '' }) {
  return <div className={`bg-brand-gray-light rounded-xl p-5 ${className}`}>{children}</div>;
}

function Stat({ number, label, dark }) {
  return (
    <div>
      <div className="text-[44px] font-bold text-brand-blue leading-none font-heading">{number}</div>
      <div className={`text-[14px] font-medium uppercase tracking-wider mt-2 ${dark ? 'text-white/50' : 'text-brand-gray-medium'}`}>{label}</div>
    </div>
  );
}

function SlideNum({ n, dark }) {
  return (
    <span className={`absolute bottom-5 left-14 text-[11px] ${dark ? 'text-white/25' : 'text-brand-gray/80'}`}>{n}</span>
  );
}

function Icon({ name, className = '' }) {
  return <img src={`/icons/${name}.svg`} alt="" className={`w-5 h-5 ${className}`} />;
}

function Chk() { return <span className="text-brand-blue font-bold">&#10003;</span>; }
function Crs() { return <span className="text-brand-gray/60">—</span>; }

/* ══════════════════════════════════════════════════════════
   ACT 1 — THE SETUP
   ══════════════════════════════════════════════════════════ */

/* ── 1: Cover (dark, full-bleed image) ───────────────── */
function SlideCover() {
  return (
    <Slide dark>
      {/* Background image */}
      <div className="absolute inset-0">
        <img src="/hero-bg.jpg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-brand-dark/20" />
      </div>
      <div className="relative h-full flex flex-col justify-end px-14 pb-16">
        <Tag dark>Investeringsmöjlighet · Mars 2026</Tag>
        <h1 className="text-[56px] font-bold text-white leading-[1.05] font-heading mt-4 max-w-[700px]">
          Wheelplace
        </h1>
        <p className="text-[20px] text-white/60 mt-4 max-w-[520px]">
          Marknadsplatsen för begagnade hjul, däck och fälgar
        </p>
        <div className="absolute bottom-5 right-14">
          <img src="/wheelplace-lockup.svg" alt="Wheelplace" className="h-10" />
        </div>
        <p className="absolute bottom-5 left-14 text-[11px] text-white/25">Konfidentiellt · wheelplace.com</p>
      </div>
    </Slide>
  );
}

/* ── 2: Video (dark) ─────────────────────────────────── */
function SlideVideo() {
  return (
    <Slide dark>
      <div className="h-full p-10">
        <div className="w-full h-full rounded-xl overflow-hidden border border-white/10">
          <iframe
            src="https://www.youtube.com/embed/X6x1yPQ7n6A?rel=0&modestbranding=1"
            title="Wheelplace"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
            style={{ border: 'none' }}
          />
        </div>
      </div>
      <SlideNum n={2} dark />
    </Slide>
  );
}

/* ── 3: Problem (light) ──────────────────────────────── */
function SlideProblem() {
  return (
    <Slide>
      <div className="px-14 pt-14">
        <Tag>Problemet</Tag>
        <H1 className="mt-3 max-w-[700px]">6 miljoner däck säljs i Sverige varje år — utan struktur</H1>

        <Stagger delay={0.15} className="mt-10 grid grid-cols-3 gap-6">
          {[
            ['01', 'Fragmenterad', 'Privatpersoner, verkstäder, bilhandlare och exportörer. Ingen gemensam plattform.'],
            ['02', 'Ingen transparens', 'Köpare kan inte verifiera passform eller pris. Bultmönster och kompatibilitet är en gissningslek.'],
            ['03', 'Offline', 'Majoriteten av affärerna sker i verkstäder, via mun till mun eller genom osynliga exportkanaler.'],
          ].map(([num, title, desc]) => (
            <div key={num} className="bg-brand-gray-light rounded-xl p-5">
              <span className="text-[28px] font-bold text-brand-blue/20 font-heading">{num}</span>
              <h3 className="text-[16px] font-bold text-brand-dark mt-2 mb-2">{title}</h3>
              <Body>{desc}</Body>
            </div>
          ))}
        </Stagger>

        <p className="text-[14px] text-brand-gray-medium italic mt-10 max-w-[700px]">
          Att köpa begagnade hjul idag är lika opålitligt som att köpa en begagnad bil var för 15 år sedan.
        </p>
        <SlideNum n={3} />
      </div>
    </Slide>
  );
}

/* ── 3: Solution (light, split layout) ───────────────── */
function SlideSolution() {
  return (
    <Slide>
      <div className="h-full flex">
        {/* Left: text */}
        <div className="flex-1 flex flex-col px-14 pt-14 pb-10">
          <Tag>Lösningen</Tag>
          <H1 className="mt-3 max-w-[480px]">Regnummer in — rätt hjul ut</H1>
          <Body className="mt-5 max-w-[440px]">
            Vertikal marknadsplats för däck, fälgar och hjulsatser. Strukturerad data gör det köparen aldrig haft: trygghet.
          </Body>
          <div className="mt-8 space-y-4">
            {[
              ['Regnummersökning', 'Ange din skylt, se direkt vad som passar.'],
              ['Smart filtrering', 'Bultcirkel, ET, navhål, dimension — allt sökbart.'],
              ['Expert kundsupport', 'Mänskliga rådgivare säkerställer korrekt passform.'],
              ['B2B + B2C', 'Privatpersoner, verkstäder, bilhandlare, leasingbolag.'],
            ].map(([title, desc], i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-[3px] h-5 bg-brand-blue rounded-full mt-0.5 shrink-0" />
                <div>
                  <span className="text-[14px] font-semibold text-brand-dark">{title}</span>
                  <span className="text-[14px] text-brand-gray-medium"> — {desc}</span>
                </div>
              </div>
            ))}
          </div>
          <SlideNum n={4} />
        </div>
        {/* Right: product UI showing regnummer search */}
        <div className="w-[520px] shrink-0 relative bg-brand-gray-light flex items-center justify-center p-8">
          <div className="rounded-xl overflow-hidden border border-brand-gray/30 shadow-lg">
            <img src="/deck/ui-categories.png" alt="Regnummersökning" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </Slide>
  );
}

/* ── Screenshots: one per slide, full-bleed ──────────── */
function ScreenshotSlide({ src, label, n }) {
  return (
    <Slide className="bg-brand-dark">
      <div className="h-full flex items-center justify-center p-10">
        <div className="w-full h-full rounded-xl overflow-hidden border border-white/10 shadow-2xl relative">
          <img src={src} alt={label} className="w-full h-full object-cover object-top" />
        </div>
      </div>
      <div className="absolute top-5 left-14"><Tag dark>{label}</Tag></div>
      <SlideNum n={n} dark />
    </Slide>
  );
}

function SlideProduct1() { return <ScreenshotSlide src="/deck/ui-annonser.png" label="Sök & filtrera" n={5} />; }
function SlideProduct2() { return <ScreenshotSlide src="/deck/ui-annons-detail.png" label="Annonsvy" n={6} />; }
function SlideProduct3() { return <ScreenshotSlide src="/deck/ui-hero.png" label="Startsidan" n={7} />; }

/* ══════════════════════════════════════════════════════════
   ACT 2 — THE ARGUMENT
   ══════════════════════════════════════════════════════════ */

/* ── 5: Traction (light) ─────────────────────────────── */
function SlideTraction() {
  const { ref: statsRef, visible: statsVisible } = useReveal();

  return (
    <Slide>
      <div className="px-14 pt-14">
        <Tag>Traktion</Tag>
        <H1 className="mt-3">4 650 annonser och 5M besökare på 22 månader</H1>

        <div ref={statsRef} className="mt-10 grid grid-cols-4 gap-5">
          {[
            ['4 650', 'Aktiva annonser'],
            ['5M+', 'Besökare sedan start'],
            ['35M', 'SEK transaktionsvärde'],
            ['19', 'B2B-prenumeranter'],
          ].map(([num, label], i) => (
            <div key={label} className="bg-brand-gray-light rounded-xl p-5" style={{
              opacity: statsVisible ? 1 : 0,
              transform: statsVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
            }}>
              <AnimatedStat number={num} label={label} visible={statsVisible} />
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-5">
          {/* Hedin — hero customer */}
          <div className="bg-brand-blue-50 rounded-xl overflow-hidden flex-1 flex">
            <div className="p-5 flex-1">
              <p className="text-[13px] font-semibold text-brand-blue uppercase tracking-wider mb-2">Signerad ankarkund</p>
              <p className="text-[24px] font-bold text-brand-dark font-heading">Hedin Automotive</p>
              <p className="text-[14px] text-brand-gray-medium mt-1">Sveriges största bilkoncern — centralt avtal</p>
            </div>
            <div className="w-[220px] shrink-0">
              <img src="/hedin-automotive.jpg" alt="Hedin Automotive" className="w-full h-full object-cover" />
            </div>
          </div>
          {/* Other customers */}
          <div className="border border-brand-gray/30 rounded-xl p-5 flex-1">
            <p className="text-[13px] font-semibold text-brand-gray-medium uppercase tracking-wider mb-2">Signerade</p>
            <p className="text-[16px] font-bold text-brand-dark">Frontbilar · Toveks</p>
            <p className="text-[14px] text-brand-gray-medium mt-3">I förhandling: Börjessons Bil, Bilia, Ehrlings Bil, Cetira</p>
          </div>
        </div>
        <SlideNum n={8} />
      </div>
    </Slide>
  );
}

/* ── 6: Business Model (light) ───────────────────────── */
function SlideBusinessModel() {
  return (
    <Slide>
      <div className="px-14 pt-14">
        <Tag>Affärsmodell</Tag>
        <H1 className="mt-3">3 000 SEK/mån + 5 % per transaktion</H1>

        <div className="mt-10 flex gap-0">
          <div className="flex-1 pr-10">
            <div className="text-[14px] font-semibold text-brand-blue uppercase tracking-wider mb-3">Prenumerationer (SaaS)</div>
            <div className="text-[44px] font-bold text-brand-dark font-heading leading-none">3 000</div>
            <div className="text-[15px] text-brand-gray-medium mt-1 mb-5">SEK/mån per företag</div>
            <Body>Däckverkstäder, bilhandlare och leasingbolag. Obegränsade annonser och prioriterad synlighet.</Body>
            <div className="mt-6 flex gap-10 text-[14px]">
              <div><span className="text-brand-gray-medium">Nuvarande</span><br /><span className="text-brand-dark font-semibold">19 prenumeranter</span></div>
              <div><span className="text-brand-gray-medium">Mål</span><br /><span className="text-brand-dark font-semibold">100–300</span></div>
            </div>
          </div>

          {/* Visual divider — motif line */}
          <div className="w-[3px] h-[200px] bg-brand-blue rounded-full shrink-0 my-2" />

          <div className="flex-1 pl-10">
            <div className="text-[14px] font-semibold text-brand-blue uppercase tracking-wider mb-3">Marknadsplats</div>
            <div className="text-[44px] font-bold text-brand-dark font-heading leading-none">5 %</div>
            <div className="text-[15px] text-brand-gray-medium mt-1 mb-5">take rate (~300 SEK/transaktion)</div>
            <Body>Genomförda transaktioner. Snitt: 3 000–8 000 SEK per hjulset.</Body>
            <div className="mt-6 text-[14px]">
              <span className="text-brand-gray-medium">Adresserbar marknad</span><br />
              <span className="text-brand-dark font-semibold">~200 000 transaktioner/år i Sverige</span>
            </div>
          </div>
        </div>
        <SlideNum n={9} />
      </div>
    </Slide>
  );
}

/* ── 7: Market (light, split) ────────────────────────── */
function SlideMarket() {
  const { ref: barsRef, visible: barsVisible } = useReveal();
  const bars = [
    { label: 'Global däckmarknad', value: '$150–300B', w: '100%' },
    { label: 'Eftermarknad (ersättning)', value: '$150B+', w: '80%' },
    { label: 'Begagnade däck & fälgar', value: '$30–45B', w: '50%' },
    { label: 'Varav online', value: 'Underdigitaliserad', w: '22%' },
  ];
  return (
    <Slide>
      <div className="px-14 pt-14">
        <Tag>Marknad</Tag>
        <H1 className="mt-3">$30–45B marknad — ingen ägare</H1>

        <div className="mt-8" style={{ display: 'flex', gap: '40px' }}>
          {/* Left: bars */}
          <div ref={barsRef} style={{ width: '740px' }}>
            <div className="space-y-4">
              {bars.map((b, i) => (
                <div key={i} style={{
                  opacity: barsVisible ? 1 : 0,
                  transform: barsVisible ? 'translateY(0)' : 'translateY(12px)',
                  transition: `opacity 0.4s ease ${i * 0.1}s, transform 0.4s ease ${i * 0.1}s`,
                }}>
                  <div className="flex items-baseline gap-3 mb-1.5">
                    <span className="text-[14px] text-brand-gray-medium">{b.label}</span>
                    <span className="text-[14px] text-brand-dark font-semibold whitespace-nowrap ml-auto">{b.value}</span>
                  </div>
                  <AnimatedBar width={b.w} opacity={1 - i * 0.15} visible={barsVisible} delay={0.3 + i * 0.15} />
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-2">
              {['Ekonomisk press → fler köper begagnat', 'Leasingboom → överskottshjul', 'Större fälgar & SUV → högre andrahandsvärde'].map((d, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-[3px] h-4 bg-brand-blue rounded-full mt-0.5 shrink-0" />
                  <span className="text-[14px] text-brand-gray-medium">{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Sweden */}
          <div style={{ width: '340px', flexShrink: 0 }}>
            <BlueCard>
              <h3 className="text-[14px] font-bold text-brand-dark uppercase tracking-wider mb-4">Sverige</h3>
              {[
                ['Sålda däck/år', '~6,3 milj.'],
                ['Ersättningsdäck', '~5–6 milj./år'],
                ['Andrahandsmarknad', '~1–2 mdr SEK'],
                ['Blocket idag', '~6–7k annonser'],
              ].map(([l, v]) => (
                <div key={l} className="flex justify-between py-2 border-b border-brand-gray/20 last:border-0 text-[14px]">
                  <span className="text-brand-gray-medium">{l}</span>
                  <span className="text-brand-dark font-semibold">{v}</span>
                </div>
              ))}
            </BlueCard>
          </div>
        </div>
        <SlideNum n={10} />
      </div>
    </Slide>
  );
}

/* ── 8: Competition (light, positioning map) ─────────── */
function SlideCompetition() {
  return (
    <Slide>
      <div className="px-14 pt-14">
        <Tag>Konkurrens</Tag>
        <H1 className="mt-3 max-w-[800px]">Blocket säljer allt till alla — vi löser passform för hjulköpare</H1>

        <div className="mt-6 flex gap-10 h-[380px]">
          {/* 2x2 positioning map */}
          <div className="flex-1 relative">
            {/* Axes */}
            <div className="absolute left-1/2 top-6 bottom-6 w-[2px] bg-brand-gray/60" />
            <div className="absolute top-1/2 left-6 right-6 h-[2px] bg-brand-gray/60" />

            {/* Axis labels */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[11px] font-semibold text-brand-dark uppercase tracking-wider">Specialist</div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[11px] font-semibold text-brand-gray-medium uppercase tracking-wider">Generalist</div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-brand-gray-medium uppercase tracking-wider origin-center -rotate-90">Köpare</div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-brand-gray-medium uppercase tracking-wider origin-center rotate-90">Säljare</div>

            {/* Wheelplace — top right quadrant, prominent */}
            <div className="absolute top-[15%] right-[18%] bg-brand-blue rounded-xl px-4 py-3 text-center shadow-md">
              <div className="text-[15px] font-bold text-white">Wheelplace</div>
              <div className="text-[11px] text-white/70 mt-0.5">Passform + B2B</div>
            </div>

            {/* Competitors — positioned as gray dots */}
            <div className="absolute bottom-[22%] left-[15%] text-center">
              <div className="w-4 h-4 rounded-full bg-brand-gray mx-auto mb-1" />
              <div className="text-[12px] text-brand-gray-medium font-medium">Facebook</div>
            </div>
            <div className="absolute bottom-[18%] right-[25%] text-center">
              <div className="w-4 h-4 rounded-full bg-brand-gray mx-auto mb-1" />
              <div className="text-[12px] text-brand-gray-medium font-medium">Blocket</div>
            </div>
            <div className="absolute bottom-[30%] right-[15%] text-center">
              <div className="w-4 h-4 rounded-full bg-brand-gray mx-auto mb-1" />
              <div className="text-[12px] text-brand-gray-medium font-medium">Tradera</div>
            </div>
            <div className="absolute top-[35%] left-[22%] text-center">
              <div className="w-4 h-4 rounded-full bg-brand-gray mx-auto mb-1" />
              <div className="text-[12px] text-brand-gray-medium font-medium">WheelPrice</div>
              <div className="text-[10px] text-brand-gray-medium">(US, entusiaster)</div>
            </div>
          </div>

          {/* Right: honest comparison */}
          <div className="w-[380px] shrink-0 flex flex-col gap-5">
            <div>
              <h3 className="text-[14px] font-bold text-brand-gray-medium uppercase tracking-wider mb-3">Generalisterna har</h3>
              <div className="space-y-1.5 text-[14px] text-brand-gray-medium">
                <p>Miljonpublik</p>
                <p>Starkt varumärke</p>
                <p>Bred kategoritäckning</p>
              </div>
            </div>
            <div className="bg-brand-blue-50 rounded-xl p-5">
              <h3 className="text-[14px] font-bold text-brand-blue uppercase tracking-wider mb-3">Vi har</h3>
              <div className="space-y-2 text-[14px] text-brand-dark font-medium">
                {['Regnummersökning — skriv reg.nr, se vad som passar', 'Passformskontroll — bara det som faktiskt passar', 'B2B-prenumeration — verkstäder och bilhandlare'].map((t) => (
                  <div key={t} className="flex items-start gap-2">
                    <img src="/icons/check-circle.svg" alt="" className="w-4 h-4 mt-0.5 shrink-0 opacity-50" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Body className="mb-8 max-w-[640px] text-[15px]">
          För en köpare som behöver 225/45 R17 till en 2019 V60 är räckvidd meningslöst utan passform.
        </Body>
        <SlideNum n={11} />
      </div>
    </Slide>
  );
}

/* ── 9: Team (light, split) ──────────────────────────── */
function SlideTeam() {
  return (
    <Slide>
      <div className="h-full flex">
        {/* Left: Christofer full-bleed photo */}
        <div className="w-[440px] shrink-0 relative">
          <img src="/founder.avif" alt="Christofer Hertel" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <h3 className="text-[22px] font-bold text-white font-heading">Christofer Hertel</h3>
            <p className="text-[14px] text-white/70 mt-1">Grundare & VD</p>
            <p className="text-[13px] text-white/50 mt-3 leading-relaxed">
              Andra generationen i branschen. Drev Special Fälgar — förvärvat av Storskogen. 2 år på däckverkstad före Wheelplace.
            </p>
          </div>
        </div>

        {/* Right: team + heritage */}
        <div className="flex-1 px-12 pt-14">
          <Tag>Team</Tag>
          <H1 className="mt-3">Familjebolaget såldes till Storskogen — nu bygger vi kategorin</H1>

          <div className="mt-6 bg-brand-gray-light rounded-xl p-5">
            <Body className="text-[15px]">
              Svante Hertel byggde ett marknadsledande nordiskt bolag inom premium-fälgar. Djup produktkunskap och starka branschrelationer. Christofer tog över, växte med stark lönsamhet — Storskogen förvärvade. Nu digitaliserar han hela marknadskategorin.
            </Body>
          </div>

          {/* Additional team */}
          <div className="mt-5 grid grid-cols-2 gap-5">
            <div className="border border-brand-gray/30 rounded-xl p-4 flex gap-4 items-start">
              <div className="w-14 h-14 rounded-full overflow-hidden shrink-0">
                <img src="/team-calle.avif" alt="Carl Almgren" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-[15px] font-bold text-brand-dark">Carl Almgren</p>
                <p className="text-[13px] text-brand-blue">Rådgivare & nätverk</p>
                <p className="text-[13px] text-brand-gray-medium mt-1">Stort kontaktnät inom svenskt näringsliv. Öppnar dörrar till bilkoncerner och företagskunder.</p>
              </div>
            </div>
            <div className="border border-brand-gray/30 rounded-xl p-4 flex gap-4 items-start">
              <div className="w-14 h-14 rounded-full overflow-hidden shrink-0">
                <img src="/team-jakob.avif" alt="Jakob Nylund" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-[15px] font-bold text-brand-dark">Jakob Nylund</p>
                <p className="text-[13px] text-brand-blue">Varumärke & design</p>
                <p className="text-[13px] text-brand-gray-medium mt-1">Internationell erfarenhet av varumärkesbyggande och digital produktdesign. Kreativ riktning.</p>
              </div>
            </div>
          </div>
          <SlideNum n={12} />
        </div>
      </div>
    </Slide>
  );
}

/* ── 10: Financials (light) ───────────────────────────── */
function SlideFinancials() {
  const sc = [
    { name: 'Bas', share: '5 %', total: '6,6', val: '40–70', txn: '10k → 3M', sub: '100 → 3,6M' },
    { name: 'Mellan', share: '15 %', total: '16,2', val: '110–200', txn: '30k → 9M', sub: '200 → 7,2M' },
    { name: 'Bull', share: '30 %', total: '28,8', val: '230–400', txn: '60k → 18M', sub: '300 → 10,8M' },
  ];
  return (
    <Slide>
      <div className="px-14 pt-14">
        <Tag>Finansiellt</Tag>
        <H1 className="mt-3">6,6 MSEK i basfallet — 10× vid Europa</H1>
        <p className="text-[12px] text-brand-gray-medium mt-2">5 % take rate · ~200 000 transaktioner/år · 3 000 SEK/mån prenumeration</p>

        <Stagger delay={0.15} className="mt-8 grid grid-cols-3 gap-6">
          {sc.map((s, i) => (
            <div key={s.name} className={`rounded-xl p-5 ${i === 1 ? 'bg-brand-blue-50 border-2 border-brand-blue' : 'bg-brand-gray-light border border-brand-gray/50'}`}>
              <div className="text-[14px] font-semibold text-brand-blue uppercase tracking-wider">{s.name}</div>
              <div className="text-[34px] font-bold text-brand-dark font-heading leading-none mt-2">{s.total}</div>
              <div className="text-[14px] text-brand-gray-medium">MSEK</div>
              <div className="space-y-1 mt-4 text-[14px]">
                <div className="flex justify-between"><span className="text-brand-gray-medium">Andel</span><span className="text-brand-dark font-semibold">{s.share}</span></div>
                <div className="flex justify-between"><span className="text-brand-gray-medium">Transaktioner</span><span className="text-brand-dark font-semibold">{s.txn}</span></div>
                <div className="flex justify-between"><span className="text-brand-gray-medium">Prenumeranter</span><span className="text-brand-dark font-semibold">{s.sub}</span></div>
              </div>
              <div className="mt-4 pt-3 border-t border-brand-gray/50">
                <div className="text-[14px] text-brand-gray-medium">Värdering</div>
                <div className="text-[16px] font-bold text-brand-blue">{s.val} MSEK</div>
              </div>
            </div>
          ))}
        </Stagger>

        <div className="mt-6 flex items-center gap-6 bg-brand-gray-light rounded-xl px-6 py-4">
          <div className="flex items-end gap-2 h-10 shrink-0">
            <div className="w-5 bg-brand-blue/25 rounded-t" style={{ height: '30%' }} />
            <div className="w-5 bg-brand-blue rounded-t" style={{ height: '100%' }} />
          </div>
          <div>
            <span className="text-[15px] font-bold text-brand-dark">Europa = 10× Sverige</span>
            <span className="text-[14px] text-brand-gray-medium ml-3">Mellanscenario: ~160–200 MSEK · Värdering: 1,5–3+ miljarder SEK</span>
          </div>
        </div>
        <SlideNum n={13} />
      </div>
    </Slide>
  );
}

/* ══════════════════════════════════════════════════════════
   ACT 3 — THE RESOLUTION
   ══════════════════════════════════════════════════════════ */

/* ── 10: The Ask (light) ─────────────────────────────── */
function SlideAsk() {
  return (
    <Slide>
      <div className="px-14 pt-14">
        <Tag>Möjligheten</Tag>
        <H1 className="mt-3 max-w-[700px]">Vi söker kapital och en partner för nordisk expansion</H1>

        <Stagger delay={0.15} className="mt-10 grid grid-cols-3 gap-6">
          {[
            ['01', 'Kapital', 'Tillväxtkapital för plattformsutveckling, B2B-expansion och nordisk/europeisk utrullning.'],
            ['02', 'Strategisk partner', 'Fordonsbranschens räckvidd, internationell marknadsplatserfarenhet eller europeiska distributionsnätverk.'],
            ['03', 'Go-to-market', 'Företagspartnerskap med stora bilkoncerner, leasingbolag och fleet-operatörer.'],
          ].map(([num, title, desc]) => (
            <div key={num} className="border border-brand-gray/30 rounded-xl p-5">
              <span className="text-[28px] font-bold text-brand-blue/20 font-heading">{num}</span>
              <h3 className="text-[16px] font-bold text-brand-dark mt-2 mb-2">{title}</h3>
              <Body className="text-[14px]">{desc}</Body>
            </div>
          ))}
        </Stagger>

        <Body className="mt-8 max-w-[640px] text-[15px]">
          Marknaden rör sig online med 14 % CAGR. Fönstret att äga kategorin är öppet — men det stängs.
        </Body>
        <SlideNum n={14} />
      </div>
    </Slide>
  );
}

/* ── 12: Sustainability (light, image bg) ────────────── */
function SlideSustainability() {
  return (
    <Slide dark>
      <div className="absolute inset-0">
        <img src="/sustainability-bg.jpg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-brand-dark/20" />
      </div>
      <div className="relative px-14 pt-14">
        <Tag dark>Hållbarhet</Tag>
        <h2 className="text-[38px] font-bold leading-[1.12] font-heading text-white mt-3">Varje återanvänt däckset sparar 50–80 kg CO₂</h2>

        <Stagger delay={0.15} className="mt-10 grid grid-cols-3 gap-6">
          {[
            ['Förlänger livslängden', 'Minskar behovet av ny produktion. Varje set som återanvänds är ett set som inte tillverkas.'],
            ['Minskar avfall', 'Sverige skickar ~100 000 ton däck till materialåtervinning årligen. Återanvändning slår återvinning.'],
            ['Cirkulär infrastruktur', 'Förvandlar sovande verkstadslager till sökbart utbud. Struktur skapar marknad.'],
          ].map(([title, desc]) => (
            <div key={title} className="bg-white/10 backdrop-blur-sm rounded-lg border-t-[3px] border-t-white/30 px-5 pt-4 pb-5">
              <h3 className="text-[16px] font-bold text-white mb-2">{title}</h3>
              <p className="text-[14px] leading-[1.6] text-white/70">{desc}</p>
            </div>
          ))}
        </Stagger>
        <SlideNum n={15} dark />
      </div>
    </Slide>
  );
}

/* ── 13: Closing (dark, callback to cover) ───────────── */
function SlideClosing() {
  return (
    <Slide dark>
      <div className="absolute inset-0">
        <img src="/hero-salja.jpg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-brand-dark/20" />
      </div>
      <div className="relative h-full flex flex-col items-center justify-center text-center px-14">
        <h2 className="text-[40px] font-bold text-white leading-[1.1] font-heading whitespace-nowrap" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
          Fönstret att äga kategorin är öppet.
        </h2>
        <p className="text-[18px] text-white/50 mt-6">Låt oss bygga den globala ledaren — tillsammans.</p>
        <div className="mt-12 text-[14px] text-white/40">
          <p>Christofer Hertel · christofer@wheelplace.com</p>
          <p className="mt-1">wheelplace.com</p>
        </div>
        <img src="/wheelplace-lockup.svg" alt="Wheelplace" className="absolute bottom-8 right-14 h-10" />
      </div>
    </Slide>
  );
}

/* ══════════════════════════════════════════════════════════
   DECK SHELL
   ══════════════════════════════════════════════════════════ */

function PasswordGate({ children }) {
  const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem('deck_auth') === '1');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'wheelplace2027!') {
      setAuthenticated(true);
      setError(false);
      sessionStorage.setItem('deck_auth', '1');
    } else {
      setError(true);
    }
  };

  if (authenticated) return children;

  return (
    <div className="min-h-screen bg-brand-gray-light flex items-center justify-center">
      <div className="bg-white rounded-xl border border-brand-gray/40 p-10 w-full max-w-[400px] text-center">
        <img src="/wheelplace-symbol.svg" alt="Wheelplace" className="h-12 mx-auto mb-6" />
        <h2 className="text-[22px] font-bold text-brand-dark font-heading mb-2">Investeringsdeck</h2>
        <p className="text-[14px] text-brand-gray-medium mb-6">Ange lösenord för att fortsätta</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            placeholder="Lösenord"
            autoFocus
            className={`w-full px-4 py-3 border rounded-xl text-[15px] outline-none transition-colors ${
              error ? 'border-red-400 bg-red-50' : 'border-brand-gray/40 focus:border-brand-blue'
            }`}
          />
          {error && <p className="text-[13px] text-red-500 mt-2">Fel lösenord</p>}
          <button
            type="submit"
            className="w-full mt-4 px-5 py-3 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-xl text-[14px] font-semibold transition-colors cursor-pointer"
          >
            Öppna deck
          </button>
        </form>
      </div>
    </div>
  );
}

/* ── Floating slide navigator ──────────────────────────── */

function SlideNav({ total, deckRef, current, setCurrent, isFullscreen, setIsFullscreen }) {
  // Track which slide is in view (scroll mode only)
  useEffect(() => {
    if (isFullscreen) return;
    const slides = deckRef.current?.querySelectorAll('.slide');
    if (!slides) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Array.from(slides).indexOf(entry.target);
            if (idx >= 0) setCurrent(idx + 1);
          }
        });
      },
      { threshold: 0.5 }
    );
    slides.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [deckRef, isFullscreen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        if (isFullscreen) {
          setCurrent((c) => Math.min(c + 1, total));
        } else {
          goTo(current + 1);
        }
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        if (isFullscreen) {
          setCurrent((c) => Math.max(c - 1, 1));
        } else {
          goTo(current - 1);
        }
      }
      if (e.key === 'Escape' && isFullscreen) exitFullscreen();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [current, isFullscreen, total]);

  // Listen for fullscreen changes
  useEffect(() => {
    const onChange = () => {
      const fs = !!document.fullscreenElement;
      setIsFullscreen(fs);
    };
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const goTo = (n) => {
    const clamped = Math.max(1, Math.min(total, n));
    if (isFullscreen) {
      setCurrent(clamped);
    } else {
      const slides = deckRef.current?.querySelectorAll('.slide');
      if (slides?.[clamped - 1]) {
        slides[clamped - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex items-center gap-1 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-brand-gray/30 px-1.5 py-1.5">
      {/* Up */}
      <button
        onClick={() => goTo(current - 1)}
        disabled={current <= 1}
        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-brand-gray-light transition-colors cursor-pointer disabled:opacity-20"
      >
        <svg className="w-4 h-4 text-brand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>

      {/* Page indicator */}
      <span className="text-[13px] font-semibold text-brand-dark tabular-nums min-w-[52px] text-center">
        {current} / {total}
      </span>

      {/* Down */}
      <button
        onClick={() => goTo(current + 1)}
        disabled={current >= total}
        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-brand-gray-light transition-colors cursor-pointer disabled:opacity-20"
      >
        <svg className="w-4 h-4 text-brand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Divider */}
      <div className="w-px h-5 bg-brand-gray/30 mx-1" />

      {/* Fullscreen */}
      <button
        onClick={toggleFullscreen}
        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-brand-gray-light transition-colors cursor-pointer"
        title={isFullscreen ? 'Avsluta helskärm (Esc)' : 'Helskärm'}
      >
        {isFullscreen ? (
          <svg className="w-4 h-4 text-brand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-brand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
          </svg>
        )}
      </button>
    </div>
  );
}

function FullscreenPresenter({ slides, current }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const calc = () => setScale(Math.min(window.innerWidth / 1280, window.innerHeight / 720));
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  const S = slides[current - 1];
  if (!S) return null;

  return (
    <div className="fixed inset-0 z-[55] bg-black flex items-center justify-center cursor-none">
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}>
        <S />
      </div>
    </div>
  );
}

export default function Deck() {
  const deckRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const slides = [
    SlideCover, SlideVideo, SlideProblem, SlideSolution, SlideProduct1, SlideProduct2, SlideProduct3, SlideTraction,
    SlideBusinessModel, SlideMarket, SlideCompetition, SlideTeam,
    SlideFinancials, SlideAsk, SlideSustainability, SlideClosing,
  ];

  const downloadPDF = async () => {
    setDownloading(true);
    try {
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [1280, 720] });
      const slideEls = deckRef.current.querySelectorAll('.slide');

      for (let i = 0; i < slideEls.length; i++) {
        const dataUrl = await toJpeg(slideEls[i], {
          quality: 0.92,
          pixelRatio: 2,
          width: 1280,
          height: 720,
          backgroundColor: '#ffffff',
        });
        if (i > 0) pdf.addPage([1280, 720], 'landscape');
        pdf.addImage(dataUrl, 'JPEG', 0, 0, 1280, 720);
      }

      pdf.save('Wheelplace-Investeringsdeck-2026.pdf');
    } catch (err) {
      console.error('PDF generation failed:', err);
      alert('PDF-generering misslyckades: ' + err.message);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <PasswordGate>
    {/* Mobile gate */}
    <div className="lg:hidden min-h-screen bg-brand-gray-light flex items-center justify-center p-6">
      <div className="bg-white rounded-xl border border-brand-gray/40 p-8 max-w-[360px] text-center">
        <img src="/wheelplace-symbol.svg" alt="Wheelplace" className="h-10 mx-auto mb-5" />
        <h2 className="text-[20px] font-bold text-brand-dark font-heading mb-2">Investeringsdeck</h2>
        <p className="text-[14px] text-brand-gray-medium mb-6">
          Presentationen är optimerad för desktop. Öppna på en dator för den interaktiva versionen, eller ladda ner som PDF.
        </p>
        <button
          onClick={downloadPDF}
          disabled={downloading}
          className="w-full px-5 py-3 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-xl text-[14px] font-semibold transition-colors cursor-pointer disabled:opacity-50"
        >
          {downloading ? 'Genererar PDF...' : 'Ladda ner PDF'}
        </button>
        <a
          href="mailto:christofer@wheelplace.com?subject=Wheelplace%20Investeringsdeck"
          className="block mt-3 text-[14px] text-brand-blue font-medium"
        >
          Kontakta Christofer
        </a>
      </div>
    </div>

    <div className="hidden lg:block min-h-screen bg-brand-gray-light">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-brand-gray/40">
        <div className="max-w-[1320px] mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <img src="/wheelplace-symbol.svg" alt="Wheelplace" className="h-7" />
            <span className="text-[13px] text-brand-gray-medium">Investeringsdeck · 16 slides</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="mailto:christofer@wheelplace.com?subject=Wheelplace%20Investeringsdeck"
              className="flex items-center gap-2 px-5 py-2 border border-brand-gray/40 text-brand-dark hover:bg-brand-gray-light rounded-xl text-[13px] font-semibold transition-colors"
            >
              Kontakta Christofer
            </a>
            <button
              onClick={downloadPDF}
              disabled={downloading}
              className="flex items-center gap-2 px-5 py-2 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-xl text-[13px] font-semibold transition-colors cursor-pointer disabled:opacity-50"
            >
              {downloading ? 'Genererar PDF...' : 'Ladda ner PDF'}
            </button>
          </div>
        </div>
      </div>

      {/* Floating navigator */}
      <SlideNav total={slides.length} deckRef={deckRef} current={current} setCurrent={setCurrent} isFullscreen={isFullscreen} setIsFullscreen={setIsFullscreen} />

      {/* Fullscreen presentation mode */}
      {isFullscreen && <FullscreenPresenter slides={slides} current={current} />}

      {/* Slides (scroll mode) */}
      <div ref={deckRef} className={`max-w-[1320px] mx-auto px-5 py-8 space-y-6 ${isFullscreen ? 'invisible' : ''}`}>
        {slides.map((S, i) => (
          <div key={i} className="rounded-xl overflow-hidden shadow-lg">
            <S />
          </div>
        ))}
      </div>
    </div>
    </PasswordGate>
  );
}
