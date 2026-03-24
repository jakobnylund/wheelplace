import { useState } from 'react';

/* ── Progress steps ────────────────────────────────────── */

const steps = [
  { id: 1, label: 'Vad säljer du?' },
  { id: 2, label: 'Bilinfo' },
  { id: 3, label: 'Specifikationer' },
  { id: 4, label: 'Bilder & pris' },
  { id: 5, label: 'Publicera' },
];

function StepBar({ current }) {
  return (
    <div className="bg-white border-b border-brand-gray/30 px-5 sm:px-8">
      <div className="max-w-site mx-auto">
        <div className="max-w-[900px] mx-auto flex items-center py-4">
          {steps.map((step, i) => (
            <div key={step.id} className="contents">
              <div className="flex items-center gap-2 shrink-0">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-bold transition-all ${
                    step.id < current
                      ? 'bg-brand-blue text-white'
                      : step.id === current
                      ? 'bg-brand-blue text-white shadow-[0_0_0_3px_rgba(71,123,244,0.25)]'
                      : 'bg-brand-gray-light text-brand-gray-medium'
                  }`}
                >
                  {step.id < current ? (
                    <img src="/icons/check.svg" alt="" className="w-3.5 h-3.5 invert" />
                  ) : (
                    step.id
                  )}
                </div>
                <span
                  className={`text-[13px] font-medium whitespace-nowrap hidden sm:inline ${
                    step.id === current ? 'text-brand-blue font-semibold' : step.id < current ? 'text-brand-dark' : 'text-brand-gray-medium'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 min-w-5 rounded ${step.id < current ? 'bg-brand-blue' : 'bg-brand-gray-light'}`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Reusable form pieces ──────────────────────────────── */

function Section({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-xl border border-brand-gray/40 p-5 mb-4 ${className}`}>
      {children}
    </div>
  );
}

function SectionTitle({ icon, children }) {
  return (
    <h3 className="text-[15px] font-bold text-brand-dark flex items-center gap-2 mb-1 font-heading">
      {icon && <span className="text-[16px]">{icon}</span>}
      {children}
    </h3>
  );
}

function SectionSub({ children }) {
  return <p className="text-[13px] text-brand-gray-medium mb-4">{children}</p>;
}

function FieldLabel({ children, required, auto }) {
  return (
    <label className="text-[13px] font-semibold text-brand-dark mb-1.5 flex items-center gap-1.5">
      {children}
      {required && <span className="text-red-500">*</span>}
      {auto && (
        <span className="text-[10px] font-semibold bg-brand-blue-50 text-brand-blue px-1.5 py-px rounded-full">AUTO</span>
      )}
    </label>
  );
}

function LockedField({ label, value }) {
  return (
    <div className="field">
      <FieldLabel auto>{label}</FieldLabel>
      <div className="bg-brand-blue-50 border-[1.5px] border-brand-blue-100 rounded-lg px-3.5 py-2.5 text-[14px] font-semibold text-brand-blue flex items-center justify-between">
        <span className="flex items-center gap-2">
          <img src="/icons/shield-check.svg" alt="" className="w-3.5 h-3.5 opacity-70" />
          {value}
        </span>
        <button className="text-[12px] text-brand-gray-medium underline font-normal cursor-pointer">Ändra</button>
      </div>
    </div>
  );
}

function SelectableCard({ icon, name, desc, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`text-left border-2 rounded-xl p-5 cursor-pointer transition-all duration-200 ${
        selected
          ? 'border-brand-blue bg-brand-blue-50'
          : 'border-brand-gray/40 bg-white hover:border-brand-blue/40 hover:bg-brand-blue-50/30'
      }`}
    >
      <div className="text-[28px] mb-2">{icon}</div>
      <div className="text-[15px] font-semibold text-brand-dark">{name}</div>
      {desc && <div className="text-[12px] text-brand-gray-medium mt-1">{desc}</div>}
    </button>
  );
}

function Chip({ children, selected, compat, disabled, onClick }) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={`px-3.5 py-2 rounded-xl text-[14px] font-semibold border-2 transition-all cursor-pointer ${
        disabled
          ? 'opacity-30 cursor-not-allowed border-brand-gray/30 text-brand-gray-medium'
          : selected
          ? compat
            ? 'border-brand-green bg-brand-gray-light text-brand-green'
            : 'border-brand-blue bg-brand-blue-50 text-brand-blue'
          : compat
          ? 'border-brand-green/40 text-brand-green bg-brand-gray-light hover:border-brand-green'
          : 'border-brand-gray/40 text-brand-dark bg-white hover:border-brand-blue/40'
      }`}
    >
      {children}
    </button>
  );
}

/* ── Step 1: What are you selling? ─────────────────────── */

function Step1({ onNext }) {
  const [sellerType, setSellerType] = useState('foretag');
  const [productType, setProductType] = useState('komplett');

  return (
    <div>
      <h2 className="text-[22px] font-bold text-brand-dark font-heading mb-1">Vad säljer du?</h2>
      <p className="text-[14px] text-brand-gray-medium mb-7">Välj produkttyp för att få rätt fält</p>

      <Section>
        <SectionTitle>Säljartyp</SectionTitle>
        <SectionSub>Påverkar hur din annons visas</SectionSub>
        <div className="flex gap-2.5">
          {[
            { id: 'privat', icon: '👤', label: 'Privatperson' },
            { id: 'foretag', icon: '🏢', label: 'Företag / handlare' },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setSellerType(s.id)}
              className={`flex-1 py-3 px-4 rounded-xl border-2 text-center text-[14px] font-medium transition-all cursor-pointer ${
                sellerType === s.id
                  ? 'border-brand-blue bg-brand-blue-50 text-brand-blue'
                  : 'border-brand-gray/40 hover:border-brand-blue/40'
              }`}
            >
              <span className="text-[18px] block mb-1">{s.icon}</span>
              {s.label}
            </button>
          ))}
        </div>
      </Section>

      <Section>
        <SectionTitle>Produkttyp</SectionTitle>
        <SectionSub>Välj en — vi anpassar formuläret</SectionSub>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <SelectableCard icon="🔩" name="Fälgar" desc="Enbart fälgar, utan däck" selected={productType === 'falgar'} onClick={() => setProductType('falgar')} />
          <SelectableCard icon="🛞" name="Kompletta hjul" desc="Fälg + däck monterade" selected={productType === 'komplett'} onClick={() => setProductType('komplett')} />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <SelectableCard icon="❄️" name="Vinterdäck" desc="Enbart däck" selected={productType === 'vinter'} onClick={() => setProductType('vinter')} />
          <SelectableCard icon="☀️" name="Sommardäck" desc="Enbart däck" selected={productType === 'sommar'} onClick={() => setProductType('sommar')} />
          <SelectableCard icon="⚫" name="Däck (övrigt)" desc="All-season m.m." selected={productType === 'dack'} onClick={() => setProductType('dack')} />
        </div>
      </Section>
    </div>
  );
}

/* ── Step 2: Car info ──────────────────────────────────── */

function Step2() {
  const [regDone, setRegDone] = useState(true);
  const [motor, setMotor] = useState('D4');

  return (
    <div>
      <h2 className="text-[22px] font-bold text-brand-dark font-heading mb-1">Från vilken bil?</h2>
      <p className="text-[14px] text-brand-gray-medium mb-7">Regnumret läser in bultcirkel, navhål och ET automatiskt</p>

      <Section>
        <SectionTitle icon="🚗">Sök via regnummer <span className="text-[12px] font-normal text-brand-gray-medium">(rekommenderat)</span></SectionTitle>
        <SectionSub>Hämtar bildata från Transportstyrelsen</SectionSub>

        <div className="flex gap-0">
          <input
            type="text"
            defaultValue="PKE23J"
            maxLength={7}
            className="flex-1 px-3.5 py-3 border-2 border-brand-gray/40 border-r-0 rounded-l-xl text-[16px] font-bold tracking-widest uppercase font-mono text-brand-dark outline-none focus:border-brand-blue placeholder:font-sans placeholder:font-normal placeholder:tracking-normal placeholder:text-[14px]"
            placeholder="t.ex. PKE23J"
          />
          <button
            onClick={() => setRegDone(true)}
            className="px-5 py-3 bg-brand-blue text-white rounded-r-xl text-[14px] font-bold hover:bg-brand-blue-dark transition-colors cursor-pointer"
          >
            Sök →
          </button>
        </div>
        <button className="text-[13px] text-brand-gray-medium underline mt-2 block cursor-pointer hover:text-brand-dark">
          Hoppa över — jag vet inte regnumret
        </button>

        {/* Car result */}
        {regDone && (
          <div className="mt-4 bg-brand-gray-light border-[1.5px] border-brand-gray/40 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-yellow-200 border-2 border-yellow-500 rounded-md px-3 py-1 text-[15px] font-black tracking-[3px] font-mono">
                PKE23J
              </span>
              <div className="flex-1">
                <div className="text-[15px] font-bold text-brand-dark">Volvo XC60</div>
                <div className="text-[13px] text-brand-gray-medium">Trafikverket: Bensin · AWD · 2019</div>
              </div>
              <span className="text-brand-green text-xl">✓</span>
            </div>

            <div className="flex gap-2 flex-wrap mb-3">
              {['5x108', 'Navhål 63.4mm', 'ET 40–50.5mm', '5 bultar'].map((spec) => (
                <span key={spec} className="bg-brand-blue-50 border border-brand-blue-100 rounded-lg px-2.5 py-1 text-[12px] font-semibold text-brand-blue flex items-center gap-1.5">
                  <img src="/icons/shield-check.svg" alt="" className="w-3 h-3 opacity-60" />
                  {spec}
                </span>
              ))}
            </div>

            {/* Motor picker */}
            <div className="border-t border-brand-gray/40 pt-3 mt-1">
              <p className="text-[12px] font-semibold text-brand-dark mb-2">Välj motorvariant för korrekt bromsinfo:</p>
              <div className="flex gap-2 flex-wrap">
                {[
                  { id: 'T5', sub: '250hk bensin' },
                  { id: 'D4', sub: '190hk diesel' },
                  { id: 'D5', sub: '235hk diesel' },
                  { id: 'T8', sub: '390hk PHEV ⚠ min 19"' },
                  { id: 'T6', sub: '310hk bensin' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMotor(m.id)}
                    className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold border-[1.5px] transition-all cursor-pointer ${
                      motor === m.id
                        ? 'bg-brand-blue text-white border-brand-blue'
                        : 'bg-white text-brand-dark border-brand-gray/40 hover:border-brand-blue/40'
                    }`}
                  >
                    {m.id}
                    <span className="block text-[10px] font-normal opacity-80">{m.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            <button className="text-[12px] text-brand-gray-medium underline mt-3 block cursor-pointer">Inte rätt bil? Ändra</button>
          </div>
        )}
      </Section>
    </div>
  );
}

/* ── Step 3: Specifications ────────────────────────────── */

function Step3() {
  const [diam, setDiam] = useState('18');
  const [width, setWidth] = useState('8J');
  const [rimType, setRimType] = useState('alu');

  return (
    <div>
      <h2 className="text-[22px] font-bold text-brand-dark font-heading mb-1">Produktspecifikationer</h2>
      <p className="text-[14px] text-brand-gray-medium mb-5">Fälten med lås är hämtade från din bil — bekräfta de övriga</p>

      {/* Info bar */}
      <div className="bg-brand-blue-50 border border-brand-blue-100 rounded-xl px-4 py-3 text-[13px] text-brand-blue flex items-start gap-2.5 mb-5">
        <img src="/icons/sparkles.svg" alt="" className="w-4 h-4 mt-0.5 opacity-70" />
        Du säljer <strong>Kompletta hjul</strong> för <strong>Volvo XC60 D4</strong> — bultcirkel och navhål är låsta.
      </div>

      {/* Locked specs */}
      <Section>
        <SectionTitle icon="🔒">Automatiskt låsta värden</SectionTitle>
        <SectionSub>Hämtat från regnummer PKE23J</SectionSub>
        <div className="grid grid-cols-2 gap-4">
          <LockedField label="Bultcirkel" value="5x108" />
          <LockedField label="Navhål" value="63.4mm" />
          <LockedField label="Antal bultar" value="5" />
          <LockedField label="ET-range (bil)" value="40–50.5mm" />
        </div>
      </Section>

      {/* Diameter */}
      <Section>
        <SectionTitle>Storlek</SectionTitle>
        <SectionSub>Gröna storlekar = OEM-godkänt för din Volvo XC60</SectionSub>

        <div className="mb-5">
          <FieldLabel required>Diameter</FieldLabel>
          <div className="flex flex-wrap gap-2">
            {[15, 16, 17, 18, 19, 20, 21, 22].map((d) => (
              <Chip
                key={d}
                selected={String(d) === diam}
                compat={d >= 17}
                disabled={d < 17}
                onClick={() => setDiam(String(d))}
              >
                {d}"
              </Chip>
            ))}
          </div>
          <p className="text-[12px] text-brand-gray-medium mt-1.5">Grå = passar inte denna bil</p>
        </div>

        <div>
          <FieldLabel required auto>Däckdimension</FieldLabel>
          <div className="flex flex-wrap gap-2">
            <Chip selected compat>235/60R18</Chip>
          </div>
          <p className="text-[12px] text-brand-blue mt-1.5">Baserat på OEM-spec för XC60 + 18"</p>
        </div>
      </Section>

      {/* Separator */}
      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-brand-gray/40" />
        <span className="text-[11px] font-bold text-brand-gray-medium uppercase tracking-wide">Fälgspecifikationer — fyll i manuellt</span>
        <div className="flex-1 h-px bg-brand-gray/40" />
      </div>

      {/* Manual specs */}
      <Section>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <FieldLabel required>Fälgbredd (J)</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {['7J', '7.5J', '8J', '8.5J', '9J'].map((w) => (
                <Chip key={w} selected={w === width} onClick={() => setWidth(w)}>{w}</Chip>
              ))}
            </div>
          </div>
          <div>
            <FieldLabel required>ET-offset (din fälg)</FieldLabel>
            <input
              type="number"
              defaultValue={45}
              className="w-full px-3.5 py-2.5 border-[1.5px] border-brand-gray/40 rounded-lg text-[14px] font-semibold outline-none focus:border-brand-blue focus:shadow-[0_0_0_3px_rgba(71,123,244,0.12)] transition-all"
            />
            <p className="text-[12px] text-brand-gray-medium mt-1">Bilens godkända range: 40–50.5mm ✓</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <FieldLabel>Fälgmärke</FieldLabel>
            <input
              type="text"
              placeholder="t.ex. Volvo OEM, BBS, Enkei"
              className="w-full px-3.5 py-2.5 border-[1.5px] border-brand-gray/40 rounded-lg text-[14px] outline-none focus:border-brand-blue transition-colors"
            />
          </div>
          <div>
            <FieldLabel>Fälgtyp</FieldLabel>
            <div className="flex flex-wrap gap-2">
              <Chip selected={rimType === 'alu'} onClick={() => setRimType('alu')}>Aluminium</Chip>
              <Chip selected={rimType === 'stal'} onClick={() => setRimType('stal')}>Stål</Chip>
            </div>
          </div>
        </div>

        <div>
          <FieldLabel>TPMS (trycksensorer)</FieldLabel>
          <div className="flex items-center justify-between py-2">
            <span className="text-[13px] text-brand-dark">Ingår TPMS-sensorer?</span>
            <ToggleSwitch defaultOn />
          </div>
        </div>
      </Section>
    </div>
  );
}

/* ── Step 4: Photos & price ────────────────────────────── */

function Step4() {
  return (
    <div>
      <h2 className="text-[22px] font-bold text-brand-dark font-heading mb-1">Bilder & pris</h2>
      <p className="text-[14px] text-brand-gray-medium mb-7">Bra bilder ökar chansen att sälja snabbt</p>

      {/* Photos */}
      <Section>
        <SectionTitle icon="📷">Bilder</SectionTitle>
        <SectionSub>Ladda upp upp till 8 bilder — första bilden blir huvudbild</SectionSub>
        <div className="grid grid-cols-4 gap-2.5">
          {/* Filled slots */}
          {[0, 1].map((i) => (
            <div key={i} className="aspect-square rounded-xl bg-gradient-to-br from-brand-gray-light to-brand-gray/20 flex items-center justify-center relative overflow-hidden border-0">
              <div className="w-16 h-16 rounded-full border-4 border-brand-gray/40 flex items-center justify-center">
                <div className="w-7 h-7 rounded-full border-2 border-brand-gray/30" />
              </div>
              <button className="absolute top-1.5 right-1.5 w-5 h-5 bg-black/50 text-white rounded-full text-[11px] flex items-center justify-center hover:bg-black/70 cursor-pointer">
                &times;
              </button>
              {i === 0 && (
                <span className="absolute bottom-1.5 left-1.5 text-[10px] font-semibold text-brand-blue bg-white/90 px-1.5 py-0.5 rounded">
                  Huvudbild
                </span>
              )}
            </div>
          ))}
          {/* Empty slots */}
          {[2, 3, 4, 5, 6, 7].map((i) => (
            <div
              key={i}
              className="aspect-square rounded-xl border-2 border-dashed border-brand-gray/40 flex flex-col items-center justify-center cursor-pointer hover:border-brand-blue hover:bg-brand-blue-50/30 transition-all"
            >
              <img src="/icons/camera.svg" alt="" className="w-5 h-5 opacity-30 mb-1" />
              <span className="text-[11px] text-brand-gray-medium">Ladda upp</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Condition */}
      <Section>
        <SectionTitle>Skick</SectionTitle>
        <SectionSub>Beskriv produktens tillstånd</SectionSub>
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { icon: '✨', name: 'Nyskick', desc: 'Oanvänd / som ny' },
            { icon: '👍', name: 'Gott skick', desc: 'Normal användning' },
            { icon: '🔧', name: 'Slitet', desc: 'Synliga märken' },
          ].map((c, i) => (
            <button
              key={c.name}
              className={`border-2 rounded-xl py-3.5 px-3 text-center cursor-pointer transition-all ${
                i === 1
                  ? 'border-brand-blue bg-brand-blue-50'
                  : 'border-brand-gray/40 hover:border-brand-blue/40'
              }`}
            >
              <div className="text-[20px] mb-1">{c.icon}</div>
              <div className="text-[13px] font-semibold text-brand-dark">{c.name}</div>
              <div className="text-[11px] text-brand-gray-medium mt-0.5">{c.desc}</div>
            </button>
          ))}
        </div>
      </Section>

      {/* Price */}
      <Section>
        <SectionTitle icon="💰">Pris</SectionTitle>
        <SectionSub>Ange ditt pris — vi visar liknande annonser som referens</SectionSub>
        <div className="relative mb-3">
          <input
            type="text"
            defaultValue="8 500"
            className="w-full px-4 py-3.5 pr-12 border-[1.5px] border-brand-gray/40 rounded-xl text-[20px] font-bold outline-none focus:border-brand-blue focus:shadow-[0_0_0_3px_rgba(71,123,244,0.12)] transition-all"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[14px] font-semibold text-brand-gray-medium">kr</span>
        </div>
        <div className="bg-brand-blue-50 border border-brand-blue-100 rounded-xl px-4 py-3 text-[13px] text-brand-blue flex items-center gap-2">
          <img src="/icons/tag.svg" alt="" className="w-4 h-4 opacity-60" />
          Liknande produkter säljs för 6 500–11 000 kr — ditt pris ligger bra!
        </div>
      </Section>

      {/* Title & description */}
      <Section>
        <SectionTitle>Annonsrubrik</SectionTitle>
        <input
          type="text"
          defaultValue="Kompletta vinterhjul Volvo XC60 18&quot; Nokian"
          className="w-full px-3.5 py-2.5 border-[1.5px] border-brand-gray/40 rounded-lg text-[14px] outline-none focus:border-brand-blue transition-colors mb-3"
        />
        <div className="bg-brand-blue-50 border border-brand-blue-100 rounded-lg px-3.5 py-2.5 flex items-center justify-between text-[13px]">
          <span className="text-brand-blue font-medium">Förslag: "Vinterhjul 18" 5x108 Nokian Hakka — Volvo XC60"</span>
          <button className="text-brand-blue underline text-[12px] shrink-0 ml-3 cursor-pointer">Använd</button>
        </div>

        <div className="mt-5">
          <FieldLabel>Beskrivning</FieldLabel>
          <textarea
            rows={4}
            placeholder="Beskriv produkten — skick, användning, eventuella defekter..."
            className="w-full px-3.5 py-2.5 border-[1.5px] border-brand-gray/40 rounded-lg text-[14px] outline-none focus:border-brand-blue transition-colors resize-y"
            defaultValue="Kompletta vinterhjul, körda ca 8000 km. Nokian Hakkapeliitta 10, 8mm mönster. Fälgarna är i perfekt skick. Kan levereras med TPMS-sensorer."
          />
          <p className="text-[12px] text-brand-gray-medium text-right mt-1">142 / 500</p>
        </div>
      </Section>
    </div>
  );
}

/* ── Step 5: Preview & publish ─────────────────────────── */

function Step5() {
  return (
    <div>
      <h2 className="text-[22px] font-bold text-brand-dark font-heading mb-1">Förhandsgranska & publicera</h2>
      <p className="text-[14px] text-brand-gray-medium mb-7">Så här ser din annons ut för köpare</p>

      {/* Preview card */}
      <Section className="p-0 overflow-hidden">
        <div className="aspect-video bg-gradient-to-br from-brand-gray-light to-brand-gray/20 flex items-center justify-center relative">
          <div className="w-28 h-28 rounded-full border-[6px] border-brand-gray/40 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-4 border-brand-gray/30" />
          </div>
          <span className="absolute bottom-3 left-3 bg-brand-gray-medium text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">Begagnat</span>
        </div>
        <div className="p-4">
          <h3 className="text-[14px] font-bold text-brand-dark mb-1">Kompletta vinterhjul Volvo XC60 18" Nokian</h3>
          <p className="text-[12px] text-brand-gray-medium mb-2">18" · 5x108 · ET45 · 8J · 235/60R18 · 8mm</p>
          <div className="flex items-center justify-between">
            <span className="text-[18px] font-bold text-brand-blue">8 500 kr</span>
            <span className="text-[11px] text-brand-gray-medium flex items-center gap-1">
              <img src="/icons/location-pin.svg" alt="" className="w-3 h-3 opacity-50" />
              Stockholm
            </span>
          </div>
        </div>
      </Section>

      {/* Toggles */}
      <Section>
        <SectionTitle>Inställningar</SectionTitle>
        <div className="divide-y divide-brand-gray-light">
          {[
            { label: 'Visa telefonnummer i annons', sub: 'Köpare kan ringa dig direkt', on: true },
            { label: 'Tillåt meddelanden', sub: 'Köpare kan skicka fråga via Wheelplace', on: true },
            { label: 'Marknadsföring (gratis)', sub: 'Vi kan visa din annons på sociala medier', on: false },
          ].map((t) => (
            <div key={t.label} className="flex items-center justify-between py-3">
              <div>
                <p className="text-[14px] font-medium text-brand-dark">{t.label}</p>
                <p className="text-[12px] text-brand-gray-medium mt-0.5">{t.sub}</p>
              </div>
              <ToggleSwitch defaultOn={t.on} />
            </div>
          ))}
        </div>
      </Section>

      {/* Publish button */}
      <button className="w-full py-4.5 bg-brand-blue text-white rounded-xl text-[16px] font-bold hover:bg-brand-blue-dark transition-colors cursor-pointer shadow-md">
        Publicera annons
      </button>
    </div>
  );
}

/* ── Toggle switch ─────────────────────────────────────── */

function ToggleSwitch({ defaultOn = false }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn(!on)}
      className={`w-10 h-[22px] rounded-full relative transition-colors duration-200 cursor-pointer shrink-0 ${
        on ? 'bg-brand-blue' : 'bg-brand-gray/60'
      }`}
    >
      <div
        className={`absolute top-[2px] w-[18px] h-[18px] bg-white rounded-full shadow-sm transition-[left] duration-200 ${
          on ? 'left-5' : 'left-[2px]'
        }`}
      />
    </button>
  );
}

/* ── Main page ─────────────────────────────────────────── */

export default function SkapaAnnons() {
  const [step, setStep] = useState(3);

  const goNext = () => setStep((s) => Math.min(s + 1, 5));
  const goPrev = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="bg-brand-gray-light min-h-screen pb-24">
      <StepBar current={step} />

      <div className="px-5 sm:px-8">
        <div className="max-w-site mx-auto">
          <div className="max-w-[900px] mx-auto py-8">
            {step === 1 && <Step1 onNext={goNext} />}
            {step === 2 && <Step2 />}
            {step === 3 && <Step3 />}
            {step === 4 && <Step4 />}
            {step === 5 && <Step5 />}
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-brand-gray/30 px-5 sm:px-8 py-3.5 flex items-center justify-between z-40">
        <button
          onClick={goPrev}
          disabled={step === 1}
          className="px-5 py-2.5 border-[1.5px] border-brand-gray/40 rounded-xl text-[14px] font-semibold text-brand-gray-medium hover:bg-brand-gray-light transition-colors cursor-pointer disabled:opacity-30"
        >
          Tillbaka
        </button>
        <span className="text-[13px] text-brand-gray-medium">Steg {step} av 5</span>
        <button
          onClick={goNext}
          disabled={step === 5}
          className="px-6 py-2.5 rounded-xl text-[14px] font-bold transition-colors cursor-pointer flex items-center gap-2 bg-brand-blue text-white hover:bg-brand-blue-dark disabled:opacity-30"
        >
          {step === 4 ? 'Förhandsgranska' : step === 5 ? 'Publicera' : 'Nästa'} →
        </button>
      </div>
    </div>
  );
}
