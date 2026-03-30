import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/* ── Shared components (bright Wheelplace theme) ───────── */

function Slide({ children, className = '' }) {
  return (
    <div
      className={`slide relative bg-white overflow-hidden ${className}`}
      style={{ width: '1280px', height: '720px', flexShrink: 0 }}
    >
      {children}
      <img src="/logo.svg" alt="" className="absolute bottom-5 right-8 h-5 opacity-20" />
    </div>
  );
}

function Tag({ children }) {
  return (
    <div className="mb-3">
      <span className="text-[11px] font-semibold tracking-[2px] uppercase text-brand-blue">{children}</span>
      <div className="w-[48px] h-[3px] bg-brand-blue rounded-full mt-2" />
    </div>
  );
}

function Title({ children, className = '' }) {
  return <h2 className={`text-[30px] font-bold text-brand-dark leading-tight font-heading ${className}`}>{children}</h2>;
}

function Body({ children, className = '' }) {
  return <p className={`text-[15px] text-brand-gray-medium leading-relaxed ${className}`}>{children}</p>;
}

function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-xl border border-brand-gray/40 p-5 ${className}`}>
      {children}
    </div>
  );
}

function GrayCard({ children, className = '' }) {
  return (
    <div className={`bg-brand-gray-light rounded-xl p-5 ${className}`}>
      {children}
    </div>
  );
}

function StatBlock({ number, label }) {
  return (
    <div className="text-center">
      <div className="text-[42px] font-bold text-brand-blue leading-none font-heading">{number}</div>
      <div className="text-[12px] font-medium text-brand-gray-medium uppercase tracking-wider mt-2">{label}</div>
    </div>
  );
}

function SlideNum({ n }) {
  return <span className="absolute bottom-5 left-8 text-[11px] text-brand-gray-medium">{n}</span>;
}

function Icon({ name, className = '' }) {
  return <img src={`/icons/${name}.svg`} alt="" className={`w-5 h-5 opacity-50 ${className}`} />;
}

function IconBox({ name }) {
  return (
    <div className="w-10 h-10 rounded-lg bg-brand-blue-50 flex items-center justify-center mb-3 shrink-0">
      <Icon name={name} />
    </div>
  );
}

function Chk() { return <span className="text-brand-green font-bold text-[14px]">&#10003;</span>; }
function Crs() { return <span className="text-brand-gray-medium font-bold text-[14px]">&#10007;</span>; }

/* ══════════════════════════════════════════════════════════
   SLIDES (all copy in Swedish)
   ══════════════════════════════════════════════════════════ */

/* ── 1: Cover ────────────────────────────────────────── */
function SlideCover() {
  return (
    <Slide className="flex">
      {/* Left content */}
      <div className="flex-1 flex flex-col justify-center px-14">
        <span className="text-[11px] font-semibold tracking-[2px] uppercase text-brand-blue mb-4">Investeringsmöjlighet</span>
        <div className="w-[48px] h-[3px] bg-brand-blue rounded-full mb-6" />
        <h1 className="text-[48px] font-bold text-brand-dark leading-[1.08] font-heading mb-4">
          Wheelplace
        </h1>
        <p className="text-[20px] text-brand-gray-medium leading-snug max-w-[420px]">
          Den vertikala marknadsplatsen för begagnade hjul, däck och fälgar
        </p>
        <p className="text-[16px] text-brand-blue font-medium mt-6">
          Skapar värde genom cirkulär mobilitet
        </p>
        <p className="text-[11px] text-brand-gray-medium mt-auto mb-2">Konfidentiellt · Mars 2026 · wheelplace.com</p>
      </div>
      {/* Right image */}
      <div className="w-[560px] shrink-0 relative">
        <img src="/hero-bg.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent" />
      </div>
    </Slide>
  );
}

/* ── 2: Problem ──────────────────────────────────────── */
function SlideProblem() {
  const cards = [
    { icon: 'grid', title: 'Extremt fragmenterad', body: 'Miljontals begagnade däck och fälgar byter ägare varje år via privatpersoner, verkstäder, bilhandlare och exportkanaler. Ingen struktur, inga standarder.' },
    { icon: 'search', title: 'Noll transparens', body: 'Köpare kan inte verifiera passform, skick eller rimligt pris. Säljare når inte rätt målgrupp. Dimensioner, bultmönster och kompatibilitet är en gissningslek.' },
    { icon: 'close', title: 'I stort sett offline', body: 'Majoriteten av begagnade hjultransaktioner sker utanför plattformar — i verkstäder, via mun till mun eller genom exportkanaler osynliga för marknaden.' },
  ];
  return (
    <Slide>
      <div className="px-14 pt-12">
        <Tag>Problemet</Tag>
        <Title>En enorm marknad — trasig by design</Title>
      </div>
      <div className="px-14 mt-8 grid grid-cols-3 gap-5">
        {cards.map((c) => (
          <GrayCard key={c.title}>
            <IconBox name={c.icon} />
            <h3 className="text-[15px] font-semibold text-brand-dark mb-2">{c.title}</h3>
            <Body className="text-[13px]">{c.body}</Body>
          </GrayCard>
        ))}
      </div>
      <div className="px-14 mt-8">
        <Body className="text-center max-w-[880px] mx-auto italic text-[14px]">
          Att köpa begagnade hjul idag är lika opålitligt som att köpa en begagnad bil var för 15 år sedan. Det finns ingen kategorledare. Marknaden väntar på att bli organiserad.
        </Body>
      </div>
      <SlideNum n={2} />
    </Slide>
  );
}

/* ── 3: Solution ─────────────────────────────────────── */
function SlideSolution() {
  const features = [
    { title: 'Regnummersökning', desc: 'Ange ditt regnummer och se direkt vilka hjul som passar din bil. Inget gissande.' },
    { title: 'Smart filtrering', desc: 'Bultcirkel, ET-offset, navhål, däckdimensioner, märke, skick — allt strukturerat och sökbart.' },
    { title: 'Oberoende kundsupport', desc: 'Expertråd hjälper köpare och säljare säkerställa korrekt passform och en smidig affär.' },
    { title: 'B2B + B2C', desc: 'Betjänar privatpersoner, däckverkstäder, bilhandlare och leasingbolag på en plattform.' },
  ];
  return (
    <Slide>
      <div className="px-14 pt-12">
        <Tag>Lösningen</Tag>
        <Title>Sveriges smartaste marknadsplats för begagnade hjul</Title>
      </div>
      <div className="px-14 mt-6 flex gap-10">
        <div className="flex-1">
          <Body className="mb-6">
            Wheelplace är en dedikerad vertikal marknadsplats för begagnade och nya däck, fälgar och kompletta hjulsatser. Vi gör det säkert, enkelt och effektivt att köpa och sälja — för konsumenter och företag.
          </Body>
          <div className="space-y-4">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-blue mt-2 shrink-0" />
                <div>
                  <span className="text-[14px] font-semibold text-brand-dark">{f.title}</span>
                  <span className="text-[13px] text-brand-gray-medium ml-1">— {f.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[380px] shrink-0 relative rounded-xl overflow-hidden">
          <img src="/hero-kopa.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-brand-dark/50" />
          <div className="relative flex flex-col items-center justify-center h-full p-6 text-center">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-5 w-full max-w-[300px]">
              <div className="bg-brand-gray-light rounded-lg px-4 py-2.5 text-[15px] font-mono font-bold tracking-widest text-brand-dark mb-4 border border-brand-gray/40">ABC 123</div>
              <div className="flex gap-2 flex-wrap justify-center">
                {['Volvo', '225/45R17', '5×108'].map((c) => (
                  <span key={c} className="px-2.5 py-1 rounded-full bg-brand-blue-50 text-brand-blue text-[11px] font-medium border border-brand-blue-100">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <SlideNum n={3} />
    </Slide>
  );
}

/* ── 4: Traction ─────────────────────────────────────── */
function SlideTraction() {
  const stats = [
    { number: '4 650', label: 'Aktiva annonser (mars 2026)' },
    { number: '5M+', label: 'Besökare sedan lansering' },
    { number: '35M', label: 'SEK transaktionsvärde' },
    { number: '3 min', label: 'Snittlig sessionstid' },
  ];
  return (
    <Slide>
      <div className="px-14 pt-12">
        <Tag>Traktion</Tag>
        <Title>Stark tillväxt sedan lansering april 2024</Title>
      </div>
      <div className="px-14 mt-8 grid grid-cols-4 gap-5">
        {stats.map((s) => (
          <GrayCard key={s.label} className="text-center py-6">
            <div className="text-[38px] font-bold text-brand-blue leading-none font-heading">{s.number}</div>
            <div className="text-[11px] font-medium text-brand-gray-medium uppercase tracking-wider mt-2">{s.label}</div>
          </GrayCard>
        ))}
      </div>
      <div className="px-14 mt-6 grid grid-cols-2 gap-5">
        <Card>
          <h3 className="text-[14px] font-bold text-brand-dark mb-3">Milstolpar</h3>
          {['April 2024: Lansering', '19 aktiva B2B-prenumerationer (3 000 SEK/mån)', '0 → 4 650 annonser på under 2 år'].map((m, i) => (
            <div key={i} className="flex items-start gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2 shrink-0" />
              <span className="text-[13px] text-brand-gray-medium">{m}</span>
            </div>
          ))}
        </Card>
        <Card>
          <h3 className="text-[14px] font-bold text-brand-dark mb-3">Nyckelkunder</h3>
          <div className="mb-3">
            <span className="text-[11px] font-semibold text-brand-blue uppercase tracking-wider">Signerade</span>
            {['Hedin Automotive (Sveriges största bilkoncern)', 'Frontbilar', 'Toveks'].map((s) => (
              <p key={s} className="text-[13px] text-brand-gray-medium mt-1">{s}</p>
            ))}
          </div>
          <div>
            <span className="text-[11px] font-semibold text-brand-gray-medium uppercase tracking-wider">I förhandling</span>
            <p className="text-[13px] text-brand-gray-medium mt-1">Börjessons Bil · Bilia · Ehrlings Bil · Cetira</p>
          </div>
        </Card>
      </div>
      <p className="absolute bottom-12 left-14 right-14 text-[10px] text-brand-gray-medium">Not: Besöksantal och transaktionsvärde är ungefärliga och föremål för slutgiltig verifiering.</p>
      <SlideNum n={4} />
    </Slide>
  );
}

/* ── 5: Business Model ───────────────────────────────── */
function SlideBusinessModel() {
  return (
    <Slide>
      <div className="px-14 pt-12">
        <Tag>Affärsmodell</Tag>
        <Title>Två intäktsströmmar — återkommande + transaktionell</Title>
      </div>
      <div className="px-14 mt-8 grid grid-cols-2 gap-6">
        <GrayCard className="flex flex-col">
          <span className="text-[11px] font-semibold text-brand-blue uppercase tracking-wider mb-2">Prenumerationer (SaaS)</span>
          <h3 className="text-[20px] font-bold text-brand-dark mb-1">B2B-prenumerationer</h3>
          <p className="text-[20px] font-bold text-brand-blue mb-3">3 000 SEK/mån</p>
          <Body className="text-[13px] mb-4">Däckverkstäder, bilhandlare och leasingbolag prenumererar för obegränsade annonser, prioriterad synlighet och företagsprofil.</Body>
          <div className="mt-auto flex justify-between text-[12px]">
            <span className="text-brand-gray-medium">Nuvarande: <span className="text-brand-dark font-semibold">19 prenumeranter</span></span>
            <span className="text-brand-gray-medium">Mål: <span className="text-brand-dark font-semibold">100–300</span></span>
          </div>
        </GrayCard>
        <GrayCard className="flex flex-col">
          <span className="text-[11px] font-semibold text-brand-blue uppercase tracking-wider mb-2">Marknadsplats</span>
          <h3 className="text-[20px] font-bold text-brand-dark mb-1">Transaktionsavgift</h3>
          <p className="text-[20px] font-bold text-brand-blue mb-3">5 % (~300 SEK)</p>
          <Body className="text-[13px] mb-4">Tillämpas på transaktioner genomförda via plattformen. Genomsnittligt transaktionsvärde: 3 000–8 000 SEK per set.</Body>
          <div className="mt-auto text-[12px] text-brand-gray-medium">
            Adresserbar marknad: <span className="text-brand-dark font-semibold">~200 000 transaktioner/år</span> i Sverige
          </div>
        </GrayCard>
      </div>
      <div className="px-14 mt-6 text-center">
        <p className="text-[14px] font-semibold text-brand-blue italic">
          "Återkommande intäkter med konservativa antaganden — betydande uppsida från skala och expansion"
        </p>
      </div>
      <SlideNum n={5} />
    </Slide>
  );
}

/* ── 6: Market ───────────────────────────────────────── */
function SlideMarket() {
  const pyramid = [
    { label: 'Global däckmarknad', value: '$150–300B', w: '100%' },
    { label: 'Eftermarknad (ersättning)', value: '$150B+', w: '82%' },
    { label: 'Begagnade däck & fälgar', value: '$30–45B', w: '55%' },
    { label: 'Begagnade hjul online', value: 'Kraftigt underdigitaliserad', w: '30%' },
  ];
  const sweden = [
    { label: 'Sålda däck/år i Sverige', value: '~6,3 miljoner' },
    { label: 'Ersättningsdäck', value: '~5–6 miljoner/år' },
    { label: 'Uppskattad andraliv', value: '0,5–1,5 milj. däck/år' },
    { label: 'Svensk begagnad hjulmarknad', value: '~1–2 miljarder SEK' },
  ];
  return (
    <Slide>
      <div className="px-14 pt-12">
        <Tag>Marknad</Tag>
        <Title>$30–45B global marknad — ingen kategorledare</Title>
      </div>
      <div className="px-14 mt-6 flex gap-8">
        <div className="flex-1">
          <h3 className="text-[13px] font-bold text-brand-dark uppercase tracking-wider mb-4">Global marknadshierarki</h3>
          <div className="space-y-3">
            {pyramid.map((p, i) => (
              <div key={i}>
                <div className="flex justify-between text-[12px] mb-1">
                  <span className="text-brand-gray-medium">{p.label}</span>
                  <span className="text-brand-dark font-semibold">{p.value}</span>
                </div>
                <div className="h-3 rounded-full bg-brand-gray-light overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-blue-light" style={{ width: p.w }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-2">
            {['Ekonomisk press → fler köper begagnat', 'Leasingboom → överskottshjul från återlämnade fordon', 'Större fälgar & SUV-trend → högre andrahandsvärde'].map((d, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2 shrink-0" />
                <span className="text-[12px] text-brand-gray-medium">{d}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[400px] shrink-0">
          <Card>
            <h3 className="text-[13px] font-bold text-brand-dark uppercase tracking-wider mb-4">Sverige i detalj</h3>
            {sweden.map((s) => (
              <div key={s.label} className="flex justify-between py-2 border-b border-brand-gray/30 last:border-0">
                <span className="text-[13px] text-brand-gray-medium">{s.label}</span>
                <span className="text-[13px] text-brand-dark font-semibold">{s.value}</span>
              </div>
            ))}
            <p className="text-[11px] text-brand-gray-medium mt-3">Idag: ~6 000–7 000 aktiva Blocket-annonser + Wheelplace växer snabbt</p>
          </Card>
        </div>
      </div>
      <div className="px-14 mt-4">
        <p className="text-[13px] text-brand-blue italic text-center">"En stor, etablerad marknad — strukturellt trasig och snabbt på väg online. Ingen global ledare finns."</p>
      </div>
      <SlideNum n={6} />
    </Slide>
  );
}

/* ── 7: Competition ──────────────────────────────────── */
function SlideCompetition() {
  const headers = ['Funktion', 'Blocket', 'Facebook MP', 'Tradera', 'WheelPrice (US)', 'Wheelplace'];
  const rows = [
    ['Regnummersökning', false, false, false, false, true],
    ['Teknisk passformsfilter', false, false, false, 'Delvis', true],
    ['Expert kundsupport', false, false, false, 'Enbart AI', 'Mänskliga experter'],
    ['B2B-prenumeration', false, false, false, false, true],
    ['Dedikerad till hjul', false, false, false, 'US/entusiaster', 'Norden/massmarknad'],
    ['Cirkulär ekonomi', false, false, false, 'Delvis', 'Kärnuppdrag'],
  ];
  return (
    <Slide>
      <div className="px-14 pt-12">
        <Tag>Konkurrenslandskap</Tag>
        <Title>Vertikal specialisering vinner</Title>
      </div>
      <div className="px-14 mt-6">
        <table className="w-full text-[12px] border-collapse">
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i} className={`px-4 py-3 text-left font-semibold border-b-2 border-brand-gray/30 ${i === headers.length - 1 ? 'text-brand-blue bg-brand-blue-50' : 'text-brand-dark'}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-brand-gray-light' : 'bg-white'}>
                {row.map((cell, j) => (
                  <td key={j} className={`px-4 py-2.5 border-b border-brand-gray/20 ${j === row.length - 1 ? 'text-brand-blue font-semibold bg-brand-blue-50/50' : ''}`}>
                    {cell === true ? <Chk /> : cell === false ? <Crs /> : <span className={j === row.length - 1 ? 'text-brand-blue' : 'text-brand-gray-medium'}>{cell}</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-14 mt-5">
        <Body className="text-[12px] max-w-[960px]">
          Horisontella marknadsplatser kan inte lösa passformsproblemet. Wheelplace kombinerar djup domänexpertis, strukturerad produktdata och mänsklig support — och skapar en försvarbar vertikal vallgrav.
        </Body>
      </div>
      <SlideNum n={7} />
    </Slide>
  );
}

/* ── 8: Team ─────────────────────────────────────────── */
function SlideTeam() {
  return (
    <Slide>
      <div className="px-14 pt-12">
        <Tag>Team</Tag>
        <Title>Andra generationens branschexpertis</Title>
      </div>
      <div className="px-14 mt-6 flex gap-8">
        <GrayCard className="w-[340px] shrink-0 text-center flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-white border-2 border-brand-blue/30 flex items-center justify-center mb-3 overflow-hidden">
            <img src="/founder.avif" alt="Christofer Hertel" className="w-full h-full object-cover" />
          </div>
          <h3 className="text-[17px] font-bold text-brand-dark">Christofer Hertel</h3>
          <p className="text-[13px] text-brand-blue mb-4">Grundare & VD</p>
          <div className="text-left space-y-2">
            {[
              'Uppvuxen i branschen — produkt, inköp & försäljning',
              'Drev Special Fälgar (premium aftermarket, Norden)',
              'Familjebolaget förvärvat av Storskogen',
              '2 år på däckverkstad före Wheelplace-grundandet',
            ].map((p, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2 shrink-0" />
                <span className="text-[12px] text-brand-gray-medium">{p}</span>
              </div>
            ))}
          </div>
        </GrayCard>
        <div className="flex-1 flex flex-col gap-5">
          <Card>
            <h3 className="text-[14px] font-bold text-brand-dark mb-2">Arvet</h3>
            <Body className="text-[13px]">
              Byggt på ett arv av nordisk hjulexpertis. Christofers far Svante Hertel var en pionjär inom premium-eftermarknaden för fälgar och byggde ett marknadsledande företag med djup produktkunskap och etablerade branschrelationer.
            </Body>
          </Card>
          <Card>
            <h3 className="text-[14px] font-bold text-brand-dark mb-2">Utvecklingen</h3>
            <Body className="text-[13px]">
              Efter Svantes bortgång tog Christofer över tillsammans med familjen och fortsatte att växa verksamheten med stark lönsamhet — vilket så småningom ledde till förvärv av Storskogen. Nu kanaliserar Christofer samma expertis in i att digitalisera och strukturera en hel marknadskategori.
            </Body>
          </Card>
          <p className="text-[14px] font-semibold text-brand-blue italic mt-auto">
            "Andra generationens branschexpertis — bygger nu kategorledaren inom cirkulär hjulhandel."
          </p>
        </div>
      </div>
      <SlideNum n={8} />
    </Slide>
  );
}

/* ── 9: Financials ───────────────────────────────────── */
function SlideFinancials() {
  const scenarios = [
    { name: 'Bas', share: '5 %', txns: '10 000', txnRev: '3M', subs: '100', subRev: '3,6M', total: '6,6 MSEK', val: '40–70 MSEK' },
    { name: 'Mellan', share: '15 %', txns: '30 000', txnRev: '9M', subs: '200', subRev: '7,2M', total: '16,2 MSEK', val: '110–200 MSEK' },
    { name: 'Bull', share: '30 %', txns: '60 000', txnRev: '18M', subs: '300', subRev: '10,8M', total: '28,8 MSEK', val: '230–400 MSEK' },
  ];
  return (
    <Slide>
      <div className="px-14 pt-12">
        <Tag>Finansiella prognoser</Tag>
        <Title>Konservativ bas — massiv uppsida</Title>
      </div>
      <p className="px-14 mt-2 text-[11px] text-brand-gray-medium">Take rate: 5 % (~300 SEK/transaktion) · Adresserbar marknad: ~200 000 txn/år · Prenumeration: 3 000 SEK/mån</p>
      <div className="px-14 mt-5 grid grid-cols-3 gap-5">
        {scenarios.map((s, i) => (
          <Card key={s.name} className={i === 1 ? 'border-brand-blue' : ''}>
            <span className="text-[11px] font-semibold text-brand-blue uppercase tracking-wider">{s.name}</span>
            <h3 className="text-[26px] font-bold text-brand-dark mt-1 font-heading">{s.total}</h3>
            <div className="space-y-1.5 mt-3 text-[12px]">
              <div className="flex justify-between"><span className="text-brand-gray-medium">Marknadsandel</span><span className="text-brand-dark font-semibold">{s.share}</span></div>
              <div className="flex justify-between"><span className="text-brand-gray-medium">Transaktioner</span><span className="text-brand-dark font-semibold">{s.txns} → {s.txnRev}</span></div>
              <div className="flex justify-between"><span className="text-brand-gray-medium">Prenumeranter</span><span className="text-brand-dark font-semibold">{s.subs} → {s.subRev}</span></div>
            </div>
            <div className="mt-3 pt-3 border-t border-brand-gray/30">
              <span className="text-[11px] text-brand-gray-medium">Värderingsintervall</span>
              <p className="text-[15px] font-bold text-brand-blue">{s.val}</p>
            </div>
          </Card>
        ))}
      </div>
      <div className="px-14 mt-5">
        <GrayCard className="flex items-center justify-between">
          <div>
            <h3 className="text-[17px] font-bold text-brand-dark">Europa = 10× Sverige</h3>
            <Body className="text-[13px] mt-1">Mellanscenario europeisk omsättning: ~160–200 MSEK · Värdering: 1,5–3+ miljarder SEK</Body>
          </div>
          <div className="flex items-end gap-2 h-14">
            <div className="w-6 bg-brand-blue/25 rounded-t" style={{ height: '20%' }} />
            <div className="w-6 bg-brand-blue rounded-t" style={{ height: '100%' }} />
          </div>
        </GrayCard>
      </div>
      <SlideNum n={9} />
    </Slide>
  );
}

/* ── 10: The Ask ─────────────────────────────────────── */
function SlideAsk() {
  const cards = [
    { icon: 'arrow-right', title: 'Kapital', body: 'Tillväxtkapital för att accelerera plattformsutveckling, expandera B2B-säljteamet och förbereda nordisk och europeisk utrullning.' },
    { icon: 'share', title: 'Strategisk partner', body: 'En partner med räckvidd i fordonsbranschen, internationell marknadsplatserfarenhet eller europeiska distributionsnätverk.' },
    { icon: 'send', title: 'Go-to-market', body: 'Stöd i att bygga företagspartnerskap med stora bilkoncerner, leasingbolag och fleet-operatörer i hela Europa.' },
  ];
  return (
    <Slide>
      <div className="px-14 pt-12">
        <Tag>Möjligheten</Tag>
        <Title>Bli med och bygg den globala kategorledaren</Title>
      </div>
      <div className="px-14 mt-8 grid grid-cols-3 gap-5">
        {cards.map((c) => (
          <GrayCard key={c.title}>
            <IconBox name={c.icon} />
            <h3 className="text-[15px] font-semibold text-brand-dark mb-2">{c.title}</h3>
            <Body className="text-[13px]">{c.body}</Body>
          </GrayCard>
        ))}
      </div>
      <div className="px-14 mt-7 max-w-[880px] mx-auto text-center">
        <Body className="text-[14px]">
          Marknaden rör sig online med ~14 % CAGR. Ingen global kategorledare finns. Vi har bevisat produkt-marknadsanpassning i Sverige med verkliga intäkter, stora bilkoncerner som kunder och 5M+ besökare på under två år. Fönstret att äga kategorin är öppet — men det kommer inte stå öppet för evigt.
        </Body>
      </div>
      <div className="absolute bottom-14 left-0 right-0 text-center">
        <p className="text-[22px] font-bold text-brand-blue font-heading">Skapar värde ur avfall.</p>
        <p className="text-[11px] text-brand-gray-medium mt-3">Christofer Hertel · christofer@wheelplace.com · wheelplace.com</p>
      </div>
      <SlideNum n={10} />
    </Slide>
  );
}

/* ── 11: Sustainability ──────────────────────────────── */
function SlideSustainability() {
  const cards = [
    { icon: 'check-circle', title: 'Förlänger produktens livslängd', body: 'Minskar behovet av ny däckproduktion. En återanvänd däcksats sparar ~50–80 kg CO₂ jämfört med nytillverkning.' },
    { icon: 'shield-check', title: 'Minskar avfall', body: 'Sverige skickar ~100 000 ton däck till materialåtervinning årligen. Återanvändning är alltid bättre än återvinning.' },
    { icon: 'sparkles', title: 'Möjliggör cirkulär mobilitet', body: 'Wheelplace skapar infrastrukturen för en strukturerad andrahandsmarknad — förvandlar sovande lager hos verkstäder till tillgängligt, sökbart utbud.' },
  ];
  return (
    <Slide>
      {/* Background image */}
      <div className="absolute inset-0">
        <img src="/sustainability-bg.jpg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-white/92" />
      </div>
      <div className="relative px-14 pt-12">
        <Tag>Hållbarhet</Tag>
        <Title>Cirkulär ekonomi i praktiken</Title>
      </div>
      <div className="relative px-14 mt-8 grid grid-cols-3 gap-5">
        {cards.map((c) => (
          <Card key={c.title} className="bg-white/95 backdrop-blur-sm">
            <IconBox name={c.icon} />
            <h3 className="text-[15px] font-semibold text-brand-dark mb-2">{c.title}</h3>
            <Body className="text-[13px]">{c.body}</Body>
          </Card>
        ))}
      </div>
      <div className="relative px-14 mt-10 text-center">
        <p className="text-[17px] font-semibold text-brand-blue italic max-w-[780px] mx-auto">
          "Återanvänd före återvinn. Struktur före skala. Wheelplace gör cirkulär mobilitet möjlig."
        </p>
      </div>
      <SlideNum n={11} />
    </Slide>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN DECK
   ══════════════════════════════════════════════════════════ */

export default function Deck() {
  const deckRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  const slides = [
    SlideCover, SlideProblem, SlideSolution, SlideTraction,
    SlideBusinessModel, SlideMarket, SlideCompetition, SlideTeam,
    SlideFinancials, SlideAsk, SlideSustainability,
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
            <img src="/logo.svg" alt="Wheelplace" className="h-5 opacity-60" />
            <span className="text-[13px] text-brand-gray-medium">Investeringsdeck · Mars 2026</span>
          </div>
          <button
            onClick={downloadPDF}
            disabled={downloading}
            className="flex items-center gap-2 px-5 py-2 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-xl text-[13px] font-semibold transition-colors cursor-pointer disabled:opacity-50"
          >
            {downloading ? (
              'Genererar PDF...'
            ) : (
              <>
                <Icon name="document" className="invert opacity-100" />
                Ladda ner PDF
              </>
            )}
          </button>
        </div>
      </div>

      {/* Slides */}
      <div ref={deckRef} className="max-w-[1320px] mx-auto px-5 py-8 space-y-6">
        {slides.map((S, i) => (
          <div key={i} className="rounded-xl overflow-hidden shadow-lg border border-brand-gray/30">
            <S />
          </div>
        ))}
      </div>
    </div>
  );
}
