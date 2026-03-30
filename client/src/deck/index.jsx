import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
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
      <div className={`text-[12px] font-medium uppercase tracking-wider mt-2 ${dark ? 'text-white/50' : 'text-brand-gray-medium'}`}>{label}</div>
    </div>
  );
}

function SlideNum({ n, dark }) {
  return (
    <>
      <span className={`absolute bottom-5 left-14 text-[11px] ${dark ? 'text-white/25' : 'text-brand-gray/80'}`}>{n}</span>
      <img src="/wheelplace-symbol.svg" alt="" className="absolute bottom-4 right-14 h-7 opacity-20" />
    </>
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
        <div className="absolute inset-0 bg-brand-dark/75" />
      </div>
      <div className="relative h-full flex flex-col justify-end px-14 pb-16">
        <Tag dark>Investeringsmöjlighet · Mars 2026</Tag>
        <h1 className="text-[56px] font-bold text-white leading-[1.05] font-heading mt-4 max-w-[700px]">
          Den vertikala marknadsplatsen för begagnade hjul
        </h1>
        <p className="text-[20px] text-white/60 mt-4 max-w-[520px]">
          Wheelplace skapar värde genom cirkulär mobilitet — för konsumenter och företag
        </p>
        <div className="absolute bottom-5 right-14">
          <img src="/wheelplace-lockup.svg" alt="Wheelplace" className="h-6 opacity-50" />
        </div>
        <p className="absolute bottom-5 left-14 text-[11px] text-white/25">Konfidentiellt · wheelplace.com</p>
      </div>
    </Slide>
  );
}

/* ── 2: Problem (light) ──────────────────────────────── */
function SlideProblem() {
  return (
    <Slide>
      <div className="h-full flex flex-col px-14 pt-14">
        <Tag>Problemet</Tag>
        <H1 className="mt-3 max-w-[700px]">En enorm marknad — trasig by design</H1>

        <div className="mt-10 grid grid-cols-3 gap-6 flex-1">
          <BlueCard>
            <h3 className="text-[16px] font-bold text-brand-dark mb-2">Extremt fragmenterad</h3>
            <Body>Miljontals begagnade däck och fälgar byter ägare varje år via privatpersoner, verkstäder och exportkanaler. Ingen struktur, inga standarder.</Body>
          </BlueCard>
          <BlueCard>
            <h3 className="text-[16px] font-bold text-brand-dark mb-2">Noll transparens</h3>
            <Body>Köpare kan inte verifiera passform, skick eller pris. Dimensioner, bultmönster och kompatibilitet är en gissningslek.</Body>
          </BlueCard>
          <BlueCard>
            <h3 className="text-[16px] font-bold text-brand-dark mb-2">I stort sett offline</h3>
            <Body>Majoriteten av transaktioner sker utanför plattformar — i verkstäder, via mun till mun, eller genom osynliga exportkanaler.</Body>
          </BlueCard>
        </div>

        <p className="text-[14px] text-brand-gray-medium italic mb-10 max-w-[700px]">
          Att köpa begagnade hjul idag är lika opålitligt som att köpa en begagnad bil var för 15 år sedan.
        </p>
        <SlideNum n={2} />
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
            En dedikerad vertikal marknadsplats för begagnade och nya däck, fälgar och hjulsatser. Säkert, enkelt och effektivt — B2C och B2B.
          </Body>
          <div className="mt-8 space-y-4 flex-1">
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
          <SlideNum n={3} />
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

/* ══════════════════════════════════════════════════════════
   ACT 2 — THE ARGUMENT
   ══════════════════════════════════════════════════════════ */

/* ── 4: Traction — hero stats (light) ────────────────── */
function SlideTraction() {
  return (
    <Slide>
      <div className="h-full flex flex-col px-14 pt-14">
        <Tag>Traktion</Tag>
        <H1 className="mt-3">Stark tillväxt sedan april 2024</H1>

        <div className="mt-10 grid grid-cols-4 gap-8">
          <Stat number="4 650" label="Aktiva annonser" />
          <Stat number="5M+" label="Besökare sedan start" />
          <Stat number="35M" label="SEK transaktionsvärde" />
          <Stat number="3 min" label="Snittlig session" />
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6">
          <BlueCard>
            <h3 className="text-[15px] font-bold text-brand-dark mb-3">Milstolpar</h3>
            <div className="space-y-1.5 text-[14px] text-brand-gray-medium">
              <p>April 2024 — Lansering</p>
              <p>19 aktiva B2B-prenumerationer (3 000 SEK/mån)</p>
              <p>Från 0 till 4 650 annonser på under 2 år</p>
            </div>
          </BlueCard>
          <BlueCard>
            <h3 className="text-[15px] font-bold text-brand-dark mb-3">Nyckelkunder</h3>
            <p className="text-[14px] text-brand-dark font-semibold">Hedin Automotive · Frontbilar · Toveks</p>
            <p className="text-[13px] text-brand-gray-medium mt-2">I förhandling: Börjessons Bil, Bilia, Ehrlings Bil, Cetira</p>
          </BlueCard>
        </div>
        <SlideNum n={4} />
      </div>
    </Slide>
  );
}

/* ── 5: Business Model (light) ───────────────────────── */
function SlideBusinessModel() {
  return (
    <Slide>
      <div className="h-full flex flex-col px-14 pt-14">
        <Tag>Affärsmodell</Tag>
        <H1 className="mt-3">Återkommande + transaktionella intäkter</H1>

        <div className="mt-10 grid grid-cols-2 gap-8 flex-1">
          <div>
            <div className="text-[11px] font-semibold text-brand-blue uppercase tracking-wider mb-3">Prenumerationer (SaaS)</div>
            <div className="text-[36px] font-bold text-brand-dark font-heading leading-none">3 000 SEK</div>
            <div className="text-[15px] text-brand-gray-medium mt-1 mb-5">/månad per företag</div>
            <Body>Däckverkstäder, bilhandlare och leasingbolag. Obegränsade annonser, prioriterad synlighet, företagsprofil.</Body>
            <div className="mt-5 flex gap-8 text-[13px]">
              <div><span className="text-brand-gray-medium">Nuvarande</span><br /><span className="text-brand-dark font-semibold">19 prenumeranter</span></div>
              <div><span className="text-brand-gray-medium">Mål Sverige</span><br /><span className="text-brand-dark font-semibold">100–300</span></div>
            </div>
          </div>

          <div>
            <div className="text-[11px] font-semibold text-brand-blue uppercase tracking-wider mb-3">Marknadsplats</div>
            <div className="text-[36px] font-bold text-brand-dark font-heading leading-none">5 %</div>
            <div className="text-[15px] text-brand-gray-medium mt-1 mb-5">take rate (~300 SEK/transaktion)</div>
            <Body>Tillämpas på genomförda transaktioner. Snittligt transaktionsvärde: 3 000–8 000 SEK per set.</Body>
            <div className="mt-5 text-[13px]">
              <span className="text-brand-gray-medium">Adresserbar marknad</span><br />
              <span className="text-brand-dark font-semibold">~200 000 transaktioner/år i Sverige</span>
            </div>
          </div>
        </div>
        <SlideNum n={5} />
      </div>
    </Slide>
  );
}

/* ── 6: Market (light, split) ────────────────────────── */
function SlideMarket() {
  const bars = [
    { label: 'Global däckmarknad', value: '$150–300B', w: '100%' },
    { label: 'Eftermarknad', value: '$150B+', w: '80%' },
    { label: 'Begagnade däck & fälgar', value: '$30–45B', w: '50%' },
    { label: 'Varav online', value: 'Kraftigt underdigitaliserad', w: '22%' },
  ];
  return (
    <Slide>
      <div className="h-full flex flex-col px-14 pt-14">
        <Tag>Marknad</Tag>
        <H1 className="mt-3">$30–45B globalt — ingen kategorledare</H1>

        <div className="mt-8 flex gap-10 flex-1">
          {/* Left: bars */}
          <div className="flex-1">
            <div className="space-y-4">
              {bars.map((b, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[13px] mb-1.5">
                    <span className="text-brand-gray-medium">{b.label}</span>
                    <span className="text-brand-dark font-semibold">{b.value}</span>
                  </div>
                  <div className="h-4 rounded bg-brand-gray-light overflow-hidden">
                    <div className="h-full rounded bg-brand-blue" style={{ width: b.w, opacity: 1 - i * 0.15 }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 space-y-2">
              {['Ekonomisk press → fler köper begagnat', 'Leasingboom → överskottshjul', 'Större fälgar & SUV → högre andrahandsvärde'].map((d, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-[3px] h-4 bg-brand-blue rounded-full mt-0.5 shrink-0" />
                  <span className="text-[13px] text-brand-gray-medium">{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Sweden */}
          <div className="w-[380px] shrink-0">
            <BlueCard className="h-full">
              <h3 className="text-[14px] font-bold text-brand-dark uppercase tracking-wider mb-5">Sverige</h3>
              {[
                ['Sålda däck/år', '~6,3 milj.'],
                ['Ersättningsdäck', '~5–6 milj./år'],
                ['Andrahandsmarknad', '~1–2 mdr SEK'],
                ['Blocket idag', '~6 000–7 000 annonser'],
              ].map(([l, v]) => (
                <div key={l} className="flex justify-between py-2.5 border-b border-brand-gray/20 last:border-0 text-[14px]">
                  <span className="text-brand-gray-medium">{l}</span>
                  <span className="text-brand-dark font-semibold">{v}</span>
                </div>
              ))}
            </BlueCard>
          </div>
        </div>
        <SlideNum n={6} />
      </div>
    </Slide>
  );
}

/* ── 7: Competition (light) ──────────────────────────── */
function SlideCompetition() {
  const cols = ['Blocket', 'Facebook', 'Tradera', 'WheelPrice', 'Wheelplace'];
  const rows = [
    ['Regnummersökning', false, false, false, false, true],
    ['Passformsfilter', false, false, false, '~', true],
    ['Expert kundsupport', false, false, false, '~', true],
    ['B2B-prenumeration', false, false, false, false, true],
    ['Dedikerad till hjul', false, false, false, true, true],
    ['Cirkulär ekonomi', false, false, false, '~', true],
  ];
  return (
    <Slide>
      <div className="h-full flex flex-col px-14 pt-14">
        <Tag>Konkurrens</Tag>
        <H1 className="mt-3">Vertikal specialisering vinner</H1>

        <div className="mt-8 flex-1">
          <table className="w-full text-[13px]">
            <thead>
              <tr>
                <th className="text-left py-3 pr-4 text-brand-gray-medium font-medium w-[200px]" />
                {cols.map((c, i) => (
                  <th key={c} className={`text-center py-3 px-3 font-semibold ${i === cols.length - 1 ? 'text-brand-blue bg-brand-blue-50 rounded-t-lg' : 'text-brand-dark'}`}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className="border-t border-brand-gray/20">
                  <td className="py-3 pr-4 text-[14px] font-medium text-brand-dark">{row[0]}</td>
                  {row.slice(1).map((cell, ci) => (
                    <td key={ci} className={`text-center py-3 px-3 ${ci === cols.length - 1 ? 'bg-brand-blue-50/50' : ''}`}>
                      {cell === true ? <Chk /> : cell === false ? <Crs /> : <span className="text-brand-gray-medium text-[12px]">{cell}</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Body className="mb-10 max-w-[640px] text-[13px]">
          Horisontella marknadsplatser löser inte passformsproblemet. Wheelplace kombinerar domänexpertis, strukturerad data och mänsklig support.
        </Body>
        <SlideNum n={7} />
      </div>
    </Slide>
  );
}

/* ── 8: Team (light, split) ──────────────────────────── */
function SlideTeam() {
  return (
    <Slide>
      <div className="h-full flex">
        {/* Left: founder */}
        <div className="w-[440px] shrink-0 bg-brand-gray-light flex flex-col items-center justify-center px-10">
          <div className="w-28 h-28 rounded-full overflow-hidden mb-5 border-[3px] border-brand-blue/20">
            <img src="/founder.avif" alt="Christofer Hertel" className="w-full h-full object-cover" />
          </div>
          <h3 className="text-[20px] font-bold text-brand-dark font-heading">Christofer Hertel</h3>
          <p className="text-[14px] text-brand-blue mt-1 mb-6">Grundare & VD</p>
          <div className="text-left space-y-3 w-full">
            {[
              'Uppvuxen i branschen — produkt, inköp, försäljning',
              'Drev Special Fälgar (premium aftermarket, Norden)',
              'Familjebolaget förvärvat av Storskogen',
              '2 år på däckverkstad före Wheelplace',
            ].map((p, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-[3px] h-4 bg-brand-blue rounded-full mt-0.5 shrink-0" />
                <span className="text-[13px] text-brand-gray-medium">{p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: heritage */}
        <div className="flex-1 flex flex-col px-14 pt-14">
          <Tag>Team</Tag>
          <H1 className="mt-3">Andra generationens branschexpertis</H1>

          <div className="mt-8 space-y-5 flex-1">
            <BlueCard>
              <h3 className="text-[15px] font-bold text-brand-dark mb-2">Arvet</h3>
              <Body className="text-[14px]">
                Christofers far Svante Hertel var en pionjär inom premium-fälgar i Norden och byggde ett marknadsledande bolag med djup produktkunskap och etablerade branschrelationer.
              </Body>
            </BlueCard>
            <BlueCard>
              <h3 className="text-[15px] font-bold text-brand-dark mb-2">Utvecklingen</h3>
              <Body className="text-[14px]">
                Christofer tog över och växte verksamheten med stark lönsamhet — förvärv av Storskogen. Nu kanaliserar han samma expertis in i att digitalisera en hel marknadskategori.
              </Body>
            </BlueCard>
          </div>

          <p className="text-[15px] font-semibold text-brand-blue italic mb-10">
            "Andra generationens branschexpertis — bygger nu kategorledaren inom cirkulär hjulhandel."
          </p>
          <SlideNum n={8} />
        </div>
      </div>
    </Slide>
  );
}

/* ── 9: Financials (light) ───────────────────────────── */
function SlideFinancials() {
  const sc = [
    { name: 'Bas', share: '5 %', total: '6,6', val: '40–70', txn: '10k → 3M', sub: '100 → 3,6M' },
    { name: 'Mellan', share: '15 %', total: '16,2', val: '110–200', txn: '30k → 9M', sub: '200 → 7,2M' },
    { name: 'Bull', share: '30 %', total: '28,8', val: '230–400', txn: '60k → 18M', sub: '300 → 10,8M' },
  ];
  return (
    <Slide>
      <div className="h-full flex flex-col px-14 pt-14">
        <Tag>Finansiellt</Tag>
        <H1 className="mt-3">Konservativ bas — massiv uppsida</H1>
        <p className="text-[12px] text-brand-gray-medium mt-2">5 % take rate · ~200 000 transaktioner/år · 3 000 SEK/mån prenumeration</p>

        <div className="mt-8 grid grid-cols-3 gap-6">
          {sc.map((s, i) => (
            <div key={s.name} className={`rounded-xl p-5 ${i === 1 ? 'bg-brand-blue-50 border-2 border-brand-blue' : 'bg-brand-gray-light'}`}>
              <div className="text-[11px] font-semibold text-brand-blue uppercase tracking-wider">{s.name}</div>
              <div className="text-[34px] font-bold text-brand-dark font-heading leading-none mt-2">{s.total}</div>
              <div className="text-[14px] text-brand-gray-medium">MSEK</div>
              <div className="space-y-1 mt-4 text-[13px]">
                <div className="flex justify-between"><span className="text-brand-gray-medium">Andel</span><span className="text-brand-dark font-semibold">{s.share}</span></div>
                <div className="flex justify-between"><span className="text-brand-gray-medium">Transaktioner</span><span className="text-brand-dark font-semibold">{s.txn}</span></div>
                <div className="flex justify-between"><span className="text-brand-gray-medium">Prenumeranter</span><span className="text-brand-dark font-semibold">{s.sub}</span></div>
              </div>
              <div className="mt-4 pt-3 border-t border-brand-gray/20">
                <div className="text-[11px] text-brand-gray-medium">Värdering</div>
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
        <SlideNum n={9} />
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
      <div className="h-full flex flex-col px-14 pt-14">
        <Tag>Möjligheten</Tag>
        <H1 className="mt-3 max-w-[600px]">Bli med och bygg kategorledaren</H1>

        <div className="mt-10 grid grid-cols-3 gap-6">
          {[
            ['Kapital', 'Tillväxtkapital för plattformsutveckling, B2B-expansion och nordisk/europeisk utrullning.'],
            ['Strategisk partner', 'Fordonsbranschens räckvidd, internationell marknadsplatserfarenhet eller europeiska distributionsnätverk.'],
            ['Go-to-market', 'Företagspartnerskap med stora bilkoncerner, leasingbolag och fleet-operatörer.'],
          ].map(([title, desc]) => (
            <BlueCard key={title}>
              <h3 className="text-[16px] font-bold text-brand-dark mb-2">{title}</h3>
              <Body className="text-[14px]">{desc}</Body>
            </BlueCard>
          ))}
        </div>

        <Body className="mt-8 max-w-[700px] text-[14px]">
          Marknaden rör sig online med ~14 % CAGR. Vi har bevisat produkt-marknadsanpassning med verkliga intäkter, stora bilkoncerner som kunder och 5M+ besökare på under två år. Fönstret att äga kategorin är öppet.
        </Body>
        <SlideNum n={10} />
      </div>
    </Slide>
  );
}

/* ── 11: Sustainability (light, image bg) ────────────── */
function SlideSustainability() {
  return (
    <Slide>
      <div className="absolute inset-0">
        <img src="/sustainability-bg.jpg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-white/90" />
      </div>
      <div className="relative h-full flex flex-col px-14 pt-14">
        <Tag>Hållbarhet</Tag>
        <H1 className="mt-3">Cirkulär ekonomi i praktiken</H1>

        <div className="mt-10 grid grid-cols-3 gap-6">
          {[
            ['Förlänger livslängden', 'Minskar behovet av ny produktion. En återanvänd däcksats sparar ~50–80 kg CO₂.'],
            ['Minskar avfall', 'Sverige skickar ~100 000 ton däck till materialåtervinning årligen. Återanvändning är alltid bättre.'],
            ['Cirkulär infrastruktur', 'Förvandlar sovande verkstadslager till tillgängligt, sökbart utbud.'],
          ].map(([title, desc]) => (
            <BlueCard key={title} className="bg-white/80">
              <h3 className="text-[16px] font-bold text-brand-dark mb-2">{title}</h3>
              <Body className="text-[14px]">{desc}</Body>
            </BlueCard>
          ))}
        </div>
        <SlideNum n={11} />
      </div>
    </Slide>
  );
}

/* ── 12: Closing (dark, callback to cover) ───────────── */
function SlideClosing() {
  return (
    <Slide dark>
      <div className="absolute inset-0">
        <img src="/hero-bg.jpg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-brand-dark/80" />
      </div>
      <div className="relative h-full flex flex-col items-center justify-center text-center px-14">
        <h2 className="text-[44px] font-bold text-white leading-[1.1] font-heading max-w-[600px]">
          Skapar värde ur avfall.
        </h2>
        <p className="text-[18px] text-white/50 mt-6">Wheelplace — cirkulär mobilitet för alla</p>
        <div className="mt-12 text-[14px] text-white/40">
          <p>Christofer Hertel · christofer@wheelplace.com</p>
          <p className="mt-1">wheelplace.com</p>
        </div>
        <img src="/wheelplace-lockup.svg" alt="Wheelplace" className="absolute bottom-8 right-14 h-6 opacity-40" />
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
    SlideCover, SlideProblem, SlideSolution, SlideTraction,
    SlideBusinessModel, SlideMarket, SlideCompetition, SlideTeam,
    SlideFinancials, SlideAsk, SlideSustainability, SlideClosing,
  ];

  const downloadPDF = async () => {
    setDownloading(true);
    try {
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [1280, 720] });
      const slideEls = deckRef.current.querySelectorAll('.slide');

      for (let i = 0; i < slideEls.length; i++) {
        const canvas = await html2canvas(slideEls[i], {
          scale: 2,
          backgroundColor: '#ffffff',
          useCORS: true,
          logging: false,
        });
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        if (i > 0) pdf.addPage([1280, 720], 'landscape');
        pdf.addImage(imgData, 'JPEG', 0, 0, 1280, 720);
      }

      pdf.save('Wheelplace-Investeringsdeck-2026.pdf');
    } catch (err) {
      console.error('PDF generation failed:', err);
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
            <span className="text-[13px] text-brand-gray-medium">Investeringsdeck · 12 slides</span>
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
