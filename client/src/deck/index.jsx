import { useRef, useState } from 'react';
import { toJpeg } from 'html-to-image';
import { jsPDF } from 'jspdf';

/* ── Shared primitives ─────────────────────────────────── */

function Slide({ children, dark = false, className = '' }) {
  return (
    <div
      className={`slide relative overflow-hidden ${dark ? 'bg-brand-dark text-white' : 'bg-white text-brand-dark'} ${className}`}
      style={{ width: '1280px', height: '720px', flexShrink: 0 }}
    >
      {children}
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

        <div className="mt-10 grid grid-cols-3 gap-6">
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
        </div>

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
        {/* Right: image */}
        <div className="w-[480px] shrink-0 relative">
          <img src="/hero-kopa.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent" />
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
function SlideProduct3() { return <ScreenshotSlide src="/deck/ui-categories.png" label="Kategorier & regnummersökning" n={7} />; }

/* ══════════════════════════════════════════════════════════
   ACT 2 — THE ARGUMENT
   ══════════════════════════════════════════════════════════ */

/* ── 5: Traction (light) ─────────────────────────────── */
function SlideTraction() {
  return (
    <Slide>
      <div className="px-14 pt-14">
        <Tag>Traktion</Tag>
        <H1 className="mt-3">4 650 annonser och 5M besökare på 22 månader</H1>

        <div className="mt-10 grid grid-cols-4 gap-5">
          {[
            ['4 650', 'Aktiva annonser'],
            ['5M+', 'Besökare sedan start'],
            ['35M', 'SEK transaktionsvärde'],
            ['19', 'B2B-prenumeranter'],
          ].map(([num, label]) => (
            <div key={label} className="bg-brand-gray-light rounded-xl p-5">
              <div className="text-[40px] font-bold text-brand-blue leading-none font-heading">{num}</div>
              <div className="text-[13px] font-medium uppercase tracking-wider mt-2 text-brand-gray-medium">{label}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-5">
          {/* Hedin — hero customer */}
          <div className="bg-brand-blue-50 rounded-xl p-5 flex-1">
            <p className="text-[13px] font-semibold text-brand-blue uppercase tracking-wider mb-2">Signerad ankarkund</p>
            <p className="text-[24px] font-bold text-brand-dark font-heading">Hedin Automotive</p>
            <p className="text-[14px] text-brand-gray-medium mt-1">Sveriges största bilkoncern — centralt avtal</p>
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
          <div style={{ width: '740px' }}>
            <div className="space-y-4">
              {bars.map((b, i) => (
                <div key={i}>
                  <div className="flex items-baseline gap-3 mb-1.5">
                    <span className="text-[14px] text-brand-gray-medium">{b.label}</span>
                    <span className="text-[14px] text-brand-dark font-semibold whitespace-nowrap ml-auto">{b.value}</span>
                  </div>
                  <div className="h-3 rounded bg-brand-gray-light overflow-hidden">
                    <div className="h-full rounded bg-brand-blue" style={{ width: b.w, opacity: 1 - i * 0.15 }} />
                  </div>
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
            <div className="absolute left-1/2 top-6 bottom-6 w-px bg-brand-gray/30" />
            <div className="absolute top-1/2 left-6 right-6 h-px bg-brand-gray/30" />

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
              <div className="w-3 h-3 rounded-full bg-brand-gray mx-auto mb-1" />
              <div className="text-[12px] text-brand-gray-medium font-medium">Facebook</div>
            </div>
            <div className="absolute bottom-[18%] right-[25%] text-center">
              <div className="w-3 h-3 rounded-full bg-brand-gray mx-auto mb-1" />
              <div className="text-[12px] text-brand-gray-medium font-medium">Blocket</div>
            </div>
            <div className="absolute bottom-[30%] right-[15%] text-center">
              <div className="w-3 h-3 rounded-full bg-brand-gray mx-auto mb-1" />
              <div className="text-[12px] text-brand-gray-medium font-medium">Tradera</div>
            </div>
            <div className="absolute top-[35%] left-[22%] text-center">
              <div className="w-3 h-3 rounded-full bg-brand-gray mx-auto mb-1" />
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
              <div className="space-y-1.5 text-[14px] text-brand-dark font-medium">
                <p>Regnummersökning — skriv reg.nr, se vad som passar</p>
                <p>Passformskontroll — bara det som faktiskt passar</p>
                <p>B2B-prenumeration — verkstäder och bilhandlare</p>
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
                <img src="/team-calle.avif" alt="Calle Kock" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-[15px] font-bold text-brand-dark">Calle Kock</p>
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

        <div className="mt-8 grid grid-cols-3 gap-6">
          {sc.map((s, i) => (
            <div key={s.name} className={`rounded-xl p-5 ${i === 1 ? 'bg-brand-blue-50 border-2 border-brand-blue' : 'bg-brand-gray-light'}`}>
              <div className="text-[14px] font-semibold text-brand-blue uppercase tracking-wider">{s.name}</div>
              <div className="text-[34px] font-bold text-brand-dark font-heading leading-none mt-2">{s.total}</div>
              <div className="text-[14px] text-brand-gray-medium">MSEK</div>
              <div className="space-y-1 mt-4 text-[14px]">
                <div className="flex justify-between"><span className="text-brand-gray-medium">Andel</span><span className="text-brand-dark font-semibold">{s.share}</span></div>
                <div className="flex justify-between"><span className="text-brand-gray-medium">Transaktioner</span><span className="text-brand-dark font-semibold">{s.txn}</span></div>
                <div className="flex justify-between"><span className="text-brand-gray-medium">Prenumeranter</span><span className="text-brand-dark font-semibold">{s.sub}</span></div>
              </div>
              <div className="mt-4 pt-3 border-t border-brand-gray/20">
                <div className="text-[14px] text-brand-gray-medium">Värdering</div>
                <div className="text-[16px] font-bold text-brand-blue">{s.val} MSEK</div>
              </div>
            </div>
          ))}
        </div>

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

        <div className="mt-10 grid grid-cols-3 gap-6">
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
        </div>

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

        <div className="mt-10 grid grid-cols-3 gap-6">
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
        </div>
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

export default function Deck() {
  const deckRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

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
    <div className="min-h-screen bg-brand-gray-light">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-brand-gray/40">
        <div className="max-w-[1320px] mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <img src="/wheelplace-symbol.svg" alt="Wheelplace" className="h-7" />
            <span className="text-[13px] text-brand-gray-medium">Investeringsdeck · 16 slides</span>
          </div>
          <button
            onClick={downloadPDF}
            disabled={downloading}
            className="flex items-center gap-2 px-5 py-2 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-xl text-[13px] font-semibold transition-colors cursor-pointer disabled:opacity-50"
          >
            {downloading ? 'Genererar PDF...' : 'Ladda ner PDF'}
          </button>
        </div>
      </div>

      {/* Slides */}
      <div ref={deckRef} className="max-w-[1320px] mx-auto px-5 py-8 space-y-6">
        {slides.map((S, i) => (
          <div key={i} className="rounded-xl overflow-hidden shadow-lg">
            <S />
          </div>
        ))}
      </div>
    </div>
  );
}
