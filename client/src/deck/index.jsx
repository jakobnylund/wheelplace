import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/* ── Design tokens (Wheelplace-branded) ────────────────── */
const C = {
  bg: '#232933',
  bgAlt: '#2a3140',
  card: '#313847',
  border: '#3d4555',
  blue: '#477bf4',
  blueDark: '#3a66d4',
  blue50: '#f0f4fe',
  green: '#22c55e',
  white: '#ffffff',
  gray: '#94a3b8',
  grayDark: '#64748b',
  grayLight: '#f5f5f7',
};

/* ── Shared components ─────────────────────────────────── */

function Slide({ children, className = '' }) {
  return (
    <div
      className={`slide relative bg-[#232933] text-white overflow-hidden ${className}`}
      style={{ width: '1280px', height: '720px', flexShrink: 0 }}
    >
      {children}
      <img src="/logo.svg" alt="" className="absolute bottom-5 right-8 h-5 opacity-30 invert" />
    </div>
  );
}

function Tag({ children }) {
  return (
    <div className="mb-3">
      <span className="text-[12px] font-semibold tracking-[2px] uppercase text-brand-blue">{children}</span>
      <div className="w-[60px] h-[3px] bg-brand-blue rounded-full mt-2" />
    </div>
  );
}

function Title({ children, className = '' }) {
  return <h2 className={`text-[32px] font-bold text-white leading-tight font-heading ${className}`}>{children}</h2>;
}

function HeroTitle({ children }) {
  return <h1 className="text-[44px] font-bold text-white leading-[1.1] font-heading">{children}</h1>;
}

function Body({ children, className = '' }) {
  return <p className={`text-[16px] text-[#94a3b8] leading-relaxed ${className}`}>{children}</p>;
}

function Card({ children, className = '' }) {
  return (
    <div className={`bg-[#313847] border border-[#3d4555] rounded-[10px] p-6 ${className}`}>
      {children}
    </div>
  );
}

function StatBlock({ number, label }) {
  return (
    <div className="text-center">
      <div className="text-[48px] font-bold text-brand-blue leading-none">{number}</div>
      <div className="text-[13px] font-medium text-[#94a3b8] uppercase tracking-wider mt-2">{label}</div>
    </div>
  );
}

function SlideNumber({ n }) {
  return <span className="absolute bottom-5 left-8 text-[11px] text-[#64748b]">{n}</span>;
}

function IconCircle({ children }) {
  return (
    <div className="w-10 h-10 rounded-lg bg-brand-blue/15 flex items-center justify-center mb-3 shrink-0">
      <img src={`/icons/${children}.svg`} alt="" className="w-5 h-5 opacity-60 invert" />
    </div>
  );
}

function Check() {
  return <span className="text-brand-green font-bold">&#10003;</span>;
}
function Cross() {
  return <span className="text-red-400 font-bold">&#10007;</span>;
}

/* ══════════════════════════════════════════════════════════
   SLIDES
   ══════════════════════════════════════════════════════════ */

/* ── Slide 1: Cover ──────────────────────────────────── */
function SlideCover() {
  return (
    <Slide className="flex flex-col items-center justify-center text-center">
      <span className="text-[12px] font-semibold tracking-[3px] uppercase text-brand-blue mb-6">Investment Opportunity</span>
      <div className="w-[60px] h-[3px] bg-brand-blue rounded-full mb-8" />
      <HeroTitle>Wheelplace</HeroTitle>
      <p className="text-[20px] text-[#94a3b8] mt-4 max-w-[600px]">The vertical marketplace for used wheels, tires & rims</p>
      <p className="text-[16px] text-brand-blue mt-6">Turning waste into value through circular mobility</p>
      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[11px] text-[#64748b]">Confidential · March 2026 · wheelplace.com</p>
    </Slide>
  );
}

/* ── Slide 2: Problem ────────────────────────────────── */
function SlideProblem() {
  const cards = [
    { icon: 'grid', title: 'Extremely fragmented', body: 'Millions of used tires & rims change hands every year through private sellers, small workshops, car dealers, and export channels. No structure, no standards.' },
    { icon: 'search', title: 'Zero transparency', body: 'Buyers can\'t verify fitment, condition, or fair pricing. Sellers can\'t reach the right audience. Dimensions, bolt patterns, and compatibility are a guessing game.' },
    { icon: 'close', title: 'Largely offline', body: 'The majority of second-hand wheel transactions happen off-platform — in workshops, via word of mouth, or through export channels invisible to the market.' },
  ];
  return (
    <Slide>
      <div className="px-12 pt-10">
        <Tag>The Problem</Tag>
        <Title>A massive market — broken by design</Title>
      </div>
      <div className="px-12 mt-8 grid grid-cols-3 gap-5">
        {cards.map((c) => (
          <Card key={c.title}>
            <IconCircle>{c.icon}</IconCircle>
            <h3 className="text-[16px] font-semibold text-white mb-2">{c.title}</h3>
            <Body className="text-[14px]">{c.body}</Body>
          </Card>
        ))}
      </div>
      <div className="px-12 mt-8">
        <Body className="text-center max-w-[900px] mx-auto italic">
          Today, buying used wheels is as unreliable as buying a used car was 15 years ago. There is no category leader. The market is waiting to be organized.
        </Body>
      </div>
      <SlideNumber n={2} />
    </Slide>
  );
}

/* ── Slide 3: Solution ───────────────────────────────── */
function SlideSolution() {
  const features = [
    { title: 'Registration number search', desc: 'Enter your license plate, instantly see wheels that fit your car. No guesswork.' },
    { title: 'Smart filtering', desc: 'Bolt pattern, ET offset, hub bore, tire dimensions, brand, condition — all structured and searchable.' },
    { title: 'Independent customer support', desc: 'Expert advisors help both buyers and sellers ensure correct fitment and a smooth transaction.' },
    { title: 'B2B + B2C', desc: 'Serves private sellers, tire workshops, car dealerships, and leasing companies on one platform.' },
  ];
  return (
    <Slide>
      <div className="px-12 pt-10">
        <Tag>The Solution</Tag>
        <Title>Sweden's smartest marketplace for used wheels</Title>
      </div>
      <div className="px-12 mt-6 flex gap-10">
        <div className="flex-1">
          <Body className="mb-6">
            Wheelplace is a dedicated vertical marketplace for used & new tires, rims, and complete wheel sets. We make it safe, simple, and efficient to buy and sell — for consumers and businesses alike.
          </Body>
          <div className="space-y-4">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-blue mt-2 shrink-0" />
                <div>
                  <span className="text-[15px] font-semibold text-white">{f.title}</span>
                  <span className="text-[14px] text-[#94a3b8] ml-1">— {f.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[400px] shrink-0">
          <Card className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-blue/15 flex items-center justify-center mb-4">
              <img src="/icons/search.svg" alt="" className="w-8 h-8 opacity-60 invert" />
            </div>
            <div className="bg-[#2a3140] rounded-lg px-4 py-2.5 text-[15px] font-mono font-bold tracking-widest text-white mb-4 border border-[#3d4555]">ABC 123</div>
            <div className="flex gap-2 flex-wrap justify-center">
              {['Volvo', '225/45R17', 'Aluminium', '5×108'].map((c) => (
                <span key={c} className="px-2.5 py-1 rounded-full bg-brand-blue/15 text-brand-blue text-[12px] font-medium border border-brand-blue/20">{c}</span>
              ))}
            </div>
            <p className="text-[12px] text-[#64748b] mt-4">Smart search + filter mockup</p>
          </Card>
        </div>
      </div>
      <SlideNumber n={3} />
    </Slide>
  );
}

/* ── Slide 4: Traction ───────────────────────────────── */
function SlideTraction() {
  const stats = [
    { number: '4,650', label: 'Active listings (Mar 2026)' },
    { number: '5M+', label: 'Site visitors since launch' },
    { number: '35M', label: 'SEK transaction value' },
    { number: '3 min', label: 'Avg. session duration' },
  ];
  const milestones = [
    'April 2024: Site launch',
    '19 active B2B subscriptions (3,000 SEK/month)',
    '0 → 4,650 listings in under 2 years',
  ];
  const signed = ['Hedin Automotive (Sweden\'s largest dealer group)', 'Frontbilar', 'Toveks'];
  const negotiating = ['Börjessons Bil', 'Bilia', 'Ehrlings Bil', 'Cetira'];

  return (
    <Slide>
      <div className="px-12 pt-10">
        <Tag>Traction</Tag>
        <Title>Strong momentum since April 2024 launch</Title>
      </div>
      <div className="px-12 mt-8 grid grid-cols-4 gap-6">
        {stats.map((s) => (
          <Card key={s.label} className="text-center py-5">
            <div className="text-[40px] font-bold text-brand-blue leading-none">{s.number}</div>
            <div className="text-[12px] font-medium text-[#94a3b8] uppercase tracking-wider mt-2">{s.label}</div>
          </Card>
        ))}
      </div>
      <div className="px-12 mt-6 grid grid-cols-2 gap-6">
        <Card>
          <h3 className="text-[15px] font-semibold text-white mb-3">Key milestones</h3>
          {milestones.map((m, i) => (
            <div key={i} className="flex items-start gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2 shrink-0" />
              <Body className="text-[14px]">{m}</Body>
            </div>
          ))}
        </Card>
        <Card>
          <h3 className="text-[15px] font-semibold text-white mb-3">Key customers</h3>
          <div className="mb-3">
            <span className="text-[12px] font-semibold text-brand-blue uppercase tracking-wider">Signed</span>
            {signed.map((s) => <p key={s} className="text-[14px] text-[#94a3b8] mt-1">{s}</p>)}
          </div>
          <div>
            <span className="text-[12px] font-semibold text-[#64748b] uppercase tracking-wider">In negotiation</span>
            <p className="text-[14px] text-[#64748b] mt-1">{negotiating.join(' · ')}</p>
          </div>
        </Card>
      </div>
      <p className="absolute bottom-12 left-12 right-12 text-[11px] text-[#64748b]">Note: Visitor count and transaction value are approximate and subject to final verification.</p>
      <SlideNumber n={4} />
    </Slide>
  );
}

/* ── Slide 5: Business Model ─────────────────────────── */
function SlideBusinessModel() {
  return (
    <Slide>
      <div className="px-12 pt-10">
        <Tag>Business Model</Tag>
        <Title>Two revenue streams — recurring + transactional</Title>
      </div>
      <div className="px-12 mt-8 grid grid-cols-2 gap-6">
        <Card className="flex flex-col">
          <span className="text-[12px] font-semibold text-brand-blue uppercase tracking-wider mb-2">Subscriptions (SaaS)</span>
          <h3 className="text-[22px] font-bold text-white mb-1">B2B Subscriptions</h3>
          <p className="text-[20px] font-bold text-brand-blue mb-3">3,000 SEK/month</p>
          <Body className="text-[14px] mb-4">Tire workshops, car dealerships, and leasing companies subscribe for unlimited listings, priority visibility, and business profile features.</Body>
          <div className="mt-auto flex justify-between text-[13px]">
            <span className="text-[#94a3b8]">Current: <span className="text-white font-semibold">19 subscribers</span></span>
            <span className="text-[#94a3b8]">Target: <span className="text-white font-semibold">100–300</span></span>
          </div>
        </Card>
        <Card className="flex flex-col">
          <span className="text-[12px] font-semibold text-brand-blue uppercase tracking-wider mb-2">Marketplace</span>
          <h3 className="text-[22px] font-bold text-white mb-1">Transaction Fee</h3>
          <p className="text-[20px] font-bold text-brand-blue mb-3">5% take rate (~300 SEK)</p>
          <Body className="text-[14px] mb-4">Applied to transactions completed through the platform. Average transaction value: 3,000–8,000 SEK per set.</Body>
          <div className="mt-auto text-[13px] text-[#94a3b8]">
            Addressable: <span className="text-white font-semibold">~200,000 transactions/year</span> in Sweden
          </div>
        </Card>
      </div>
      <div className="px-12 mt-6 text-center">
        <p className="text-[15px] font-semibold text-brand-blue italic">
          "Recurring revenue with conservative assumptions — significant upside from scale and expansion"
        </p>
      </div>
      <SlideNumber n={5} />
    </Slide>
  );
}

/* ── Slide 6: Market ─────────────────────────────────── */
function SlideMarket() {
  const pyramid = [
    { label: 'Global tire market', value: '$150–300B', w: '100%' },
    { label: 'Aftermarket (replacement)', value: '$150B+', w: '82%' },
    { label: 'Used tires & rims', value: '$30–45B', w: '55%' },
    { label: 'Online used wheels', value: 'Massively underdigitalized', w: '30%' },
  ];
  const sweden = [
    { label: 'Total tires sold/year', value: '~6.3 million' },
    { label: 'Replacement tires', value: '~5–6 million/year' },
    { label: 'Second-life estimate', value: '0.5–1.5 million tires/year' },
    { label: 'Swedish used wheel market', value: '~1–2 billion SEK' },
  ];
  return (
    <Slide>
      <div className="px-12 pt-10">
        <Tag>Market</Tag>
        <Title>$30–45B global market — no category leader</Title>
      </div>
      <div className="px-12 mt-6 flex gap-8">
        <div className="flex-1">
          <h3 className="text-[14px] font-semibold text-white uppercase tracking-wider mb-4">Global market hierarchy</h3>
          <div className="space-y-3">
            {pyramid.map((p, i) => (
              <div key={i}>
                <div className="flex justify-between text-[13px] mb-1">
                  <span className="text-[#94a3b8]">{p.label}</span>
                  <span className="text-white font-semibold">{p.value}</span>
                </div>
                <div className="h-3 rounded-full bg-[#2a3140] overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-blue-light" style={{ width: p.w }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-2">
            {['Economic pressure → more people buy used', 'Leasing boom → surplus wheels from returned vehicles', 'Larger rims & SUV trend → higher second-hand value'].map((d, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2 shrink-0" />
                <span className="text-[13px] text-[#94a3b8]">{d}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[420px] shrink-0">
          <Card>
            <h3 className="text-[14px] font-semibold text-white uppercase tracking-wider mb-4">Sweden deep-dive</h3>
            {sweden.map((s) => (
              <div key={s.label} className="flex justify-between py-2 border-b border-[#3d4555] last:border-0">
                <span className="text-[14px] text-[#94a3b8]">{s.label}</span>
                <span className="text-[14px] text-white font-semibold">{s.value}</span>
              </div>
            ))}
            <p className="text-[12px] text-[#64748b] mt-3">Currently: ~6,000–7,000 active Blocket ads + Wheelplace growing fast</p>
          </Card>
        </div>
      </div>
      <div className="px-12 mt-5">
        <p className="text-[14px] text-brand-blue italic text-center">"A large, established market — structurally broken and rapidly moving online. No global market leader exists."</p>
      </div>
      <SlideNumber n={6} />
    </Slide>
  );
}

/* ── Slide 7: Competition ────────────────────────────── */
function SlideCompetition() {
  const headers = ['Feature', 'Blocket', 'Facebook MP', 'Tradera', 'WheelPrice (US)', 'Wheelplace'];
  const rows = [
    ['Reg. number search', false, false, false, false, true],
    ['Technical fitment filter', false, false, false, 'Partial', true],
    ['Expert customer support', false, false, false, 'AI-only', 'Human experts'],
    ['B2B subscription model', false, false, false, false, true],
    ['Dedicated to wheels', false, false, false, 'US/enthusiast', 'Nordics/mass'],
    ['Circular economy focus', false, false, false, 'Partial', 'Core mission'],
  ];
  return (
    <Slide>
      <div className="px-12 pt-10">
        <Tag>Competitive Landscape</Tag>
        <Title>Vertical specialization wins</Title>
      </div>
      <div className="px-12 mt-6">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="bg-[#1a2036]">
              {headers.map((h, i) => (
                <th key={i} className={`px-4 py-3 text-left font-semibold ${i === headers.length - 1 ? 'text-brand-blue' : 'text-white'}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-[#111827]' : 'bg-[#0f1523]'}>
                {row.map((cell, j) => (
                  <td key={j} className={`px-4 py-2.5 border-t border-[#1e293b] ${j === row.length - 1 ? 'text-brand-blue font-semibold' : ''}`}>
                    {cell === true ? <Check /> : cell === false ? <Cross /> : <span className={j === row.length - 1 ? 'text-brand-blue' : 'text-[#94a3b8]'}>{cell}</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-12 mt-5">
        <Body className="text-[13px] max-w-[1000px]">
          Horizontal marketplaces can't solve the fitment problem. Wheelplace combines deep domain expertise, structured product data, and human support — creating a defensible vertical moat.
        </Body>
      </div>
      <SlideNumber n={7} />
    </Slide>
  );
}

/* ── Slide 8: Team ───────────────────────────────────── */
function SlideTeam() {
  return (
    <Slide>
      <div className="px-12 pt-10">
        <Tag>Team</Tag>
        <Title>Second-generation industry expertise</Title>
      </div>
      <div className="px-12 mt-6 flex gap-8">
        <Card className="w-[360px] shrink-0 text-center flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-[#2a3140] border-2 border-brand-blue flex items-center justify-center mb-4">
            <img src="/icons/user.svg" alt="" className="w-10 h-10 opacity-40 invert" />
          </div>
          <h3 className="text-[18px] font-bold text-white">Christofer Hertel</h3>
          <p className="text-[14px] text-brand-blue mb-4">Founder & CEO</p>
          <div className="text-left space-y-2">
            {[
              'Grew up in the industry — product, procurement & sales',
              'Previously ran Special Fälgar (premium aftermarket, Nordics)',
              'Family business acquired by Storskogen — validated value creation',
              'Worked 2 years at a tire workshop before founding Wheelplace',
            ].map((p, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2 shrink-0" />
                <span className="text-[13px] text-[#94a3b8]">{p}</span>
              </div>
            ))}
          </div>
        </Card>
        <div className="flex-1 flex flex-col gap-5">
          <Card>
            <h3 className="text-[15px] font-semibold text-white mb-2">The Legacy</h3>
            <Body className="text-[14px]">
              Founded on a heritage of Nordic wheel expertise. Christofer's father Svante Hertel was a pioneer in the premium aftermarket wheel segment, building a market-leading company with deep product knowledge and established industry relationships.
            </Body>
          </Card>
          <Card>
            <h3 className="text-[15px] font-semibold text-white mb-2">The Evolution</h3>
            <Body className="text-[14px]">
              After Svante's passing, Christofer took over with the family and continued to grow the business with strong profitability — eventually attracting acquisition by Storskogen. Now, Christofer channels that same expertise into digitalizing and structuring an entire market category.
            </Body>
          </Card>
          <p className="text-[15px] font-semibold text-brand-blue italic mt-auto">
            "Second-generation industry expertise — now building the category leader in circular wheel commerce."
          </p>
        </div>
      </div>
      <SlideNumber n={8} />
    </Slide>
  );
}

/* ── Slide 9: Financials ─────────────────────────────── */
function SlideFinancials() {
  const scenarios = [
    { name: 'Base', share: '5%', txns: '10,000', txnRev: '3M', subs: '100', subRev: '3.6M', total: '6.6 MSEK', val: '40–70 MSEK' },
    { name: 'Mid', share: '15%', txns: '30,000', txnRev: '9M', subs: '200', subRev: '7.2M', total: '16.2 MSEK', val: '110–200 MSEK' },
    { name: 'Bull', share: '30%', txns: '60,000', txnRev: '18M', subs: '300', subRev: '10.8M', total: '28.8 MSEK', val: '230–400 MSEK' },
  ];
  return (
    <Slide>
      <div className="px-12 pt-10">
        <Tag>Financials</Tag>
        <Title>Conservative base — massive upside</Title>
      </div>
      <p className="px-12 mt-2 text-[12px] text-[#64748b]">Take rate: 5% (~300 SEK/transaction) · Addressable: ~200,000 txns/year · Subscription: 3,000 SEK/month</p>
      <div className="px-12 mt-5 grid grid-cols-3 gap-5">
        {scenarios.map((s, i) => (
          <Card key={s.name} className={i === 1 ? 'border-brand-blue' : ''}>
            <span className="text-[12px] font-semibold text-brand-blue uppercase tracking-wider">{s.name} case</span>
            <h3 className="text-[28px] font-bold text-white mt-2">{s.total}</h3>
            <div className="space-y-1.5 mt-3 text-[13px]">
              <div className="flex justify-between"><span className="text-[#94a3b8]">Market share</span><span className="text-white font-semibold">{s.share}</span></div>
              <div className="flex justify-between"><span className="text-[#94a3b8]">Transactions</span><span className="text-white font-semibold">{s.txns} → {s.txnRev}</span></div>
              <div className="flex justify-between"><span className="text-[#94a3b8]">Subscribers</span><span className="text-white font-semibold">{s.subs} → {s.subRev}</span></div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#3d4555]">
              <span className="text-[12px] text-[#64748b]">Valuation range</span>
              <p className="text-[16px] font-bold text-brand-blue">{s.val}</p>
            </div>
          </Card>
        ))}
      </div>
      <div className="px-12 mt-5">
        <Card className="border-brand-blue/30 bg-gradient-to-r from-[#313847] to-[#2a3140]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[18px] font-bold text-white">Europe = 10x Sweden</h3>
              <Body className="text-[14px] mt-1">Mid-case European revenue: ~160–200 MSEK · Valuation: 1.5–3+ billion SEK</Body>
            </div>
            <div className="flex items-end gap-3 h-16">
              <div className="w-8 bg-brand-blue/40 rounded-t" style={{ height: '20%' }} />
              <div className="w-8 bg-brand-blue rounded-t" style={{ height: '100%' }} />
            </div>
          </div>
        </Card>
      </div>
      <SlideNumber n={9} />
    </Slide>
  );
}

/* ── Slide 10: The Ask ───────────────────────────────── */
function SlideAsk() {
  const cards = [
    { icon: 'arrow-right', title: 'Capital', body: 'Growth capital to accelerate platform development, expand the B2B sales team, and prepare for Nordic and European rollout.' },
    { icon: 'share', title: 'Strategic partner', body: 'A partner with automotive industry reach, international marketplace experience, or European distribution networks.' },
    { icon: 'send', title: 'Go-to-market', body: 'Support in building enterprise partnerships with large dealer groups, leasing companies, and fleet operators across Europe.' },
  ];
  return (
    <Slide>
      <div className="px-12 pt-10">
        <Tag>The Opportunity</Tag>
        <Title>Join us in building the global category leader</Title>
      </div>
      <div className="px-12 mt-8 grid grid-cols-3 gap-5">
        {cards.map((c) => (
          <Card key={c.title}>
            <IconCircle>{c.icon}</IconCircle>
            <h3 className="text-[16px] font-semibold text-white mb-2">{c.title}</h3>
            <Body className="text-[14px]">{c.body}</Body>
          </Card>
        ))}
      </div>
      <div className="px-12 mt-8 max-w-[900px] mx-auto text-center">
        <Body className="text-[15px]">
          The market is moving online at ~14% CAGR. No global category leader exists. We have proven product-market fit in Sweden with real revenue, major dealer sign-ups, and 5M+ visitors in under two years. The window to own this category is open — but it won't stay open forever.
        </Body>
      </div>
      <div className="absolute bottom-16 left-0 right-0 text-center">
        <p className="text-[24px] font-bold text-brand-blue font-heading">Turning waste into value.</p>
        <p className="text-[12px] text-[#64748b] mt-3">Christofer Hertel · christofer@wheelplace.com · wheelplace.com</p>
      </div>
      <SlideNumber n={10} />
    </Slide>
  );
}

/* ── Slide 11: Sustainability ────────────────────────── */
function SlideSustainability() {
  const cards = [
    { icon: 'check-circle', title: 'Extends product life', body: 'Reduces need for new tire production. A reused tire set saves ~50–80 kg CO₂ vs. manufacturing new.' },
    { icon: 'shield-check', title: 'Reduces waste', body: 'Sweden sends ~100,000 tons of tires to recycling annually. Reuse is always better than recycling.' },
    { icon: 'sparkles', title: 'Enables circular mobility', body: 'Wheelplace creates the infrastructure for a structured second-hand wheel market — turning dormant inventory into accessible, searchable supply.' },
  ];
  return (
    <Slide>
      <div className="px-12 pt-10">
        <Tag>Sustainability</Tag>
        <Title>Circular economy in practice</Title>
      </div>
      <div className="px-12 mt-8 grid grid-cols-3 gap-5">
        {cards.map((c) => (
          <Card key={c.title}>
            <IconCircle>{c.icon}</IconCircle>
            <h3 className="text-[16px] font-semibold text-white mb-2">{c.title}</h3>
            <Body className="text-[14px]">{c.body}</Body>
          </Card>
        ))}
      </div>
      <div className="px-12 mt-12 text-center">
        <p className="text-[18px] font-semibold text-brand-blue italic max-w-[800px] mx-auto">
          "Reuse before recycle. Structure before scale. Wheelplace makes circular mobility happen."
        </p>
      </div>
      <SlideNumber n={11} />
    </Slide>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN DECK COMPONENT
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
          backgroundColor: '#232933',
          useCORS: true,
          logging: false,
        });
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        if (i > 0) pdf.addPage([1280, 720], 'landscape');
        pdf.addImage(imgData, 'JPEG', 0, 0, 1280, 720);
      }

      pdf.save('Wheelplace-Investment-Deck-2026.pdf');
    } catch (err) {
      console.error('PDF generation failed:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1218]">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-[#0f1218]/95 backdrop-blur-sm border-b border-[#1e293b]">
        <div className="max-w-[1320px] mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Wheelplace" className="h-5 invert opacity-60" />
            <span className="text-[13px] text-[#64748b]">Investment Deck · March 2026</span>
          </div>
          <button
            onClick={downloadPDF}
            disabled={downloading}
            className="flex items-center gap-2 px-5 py-2 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-lg text-[13px] font-semibold transition-colors cursor-pointer disabled:opacity-50"
          >
            {downloading ? (
              <>Genererar PDF...</>
            ) : (
              <>
                <img src="/icons/document.svg" alt="" className="w-4 h-4 invert" />
                Ladda ner PDF
              </>
            )}
          </button>
        </div>
      </div>

      {/* Slides */}
      <div ref={deckRef} className="max-w-[1320px] mx-auto px-5 py-8 space-y-6">
        {slides.map((SlideComponent, i) => (
          <div key={i} className="rounded-lg overflow-hidden shadow-2xl">
            <SlideComponent />
          </div>
        ))}
      </div>
    </div>
  );
}
