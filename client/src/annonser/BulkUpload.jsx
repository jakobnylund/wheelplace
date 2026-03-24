import { useState } from 'react';

/* ── Step bar ──────────────────────────────────────────── */

const steps = [
  { id: 1, label: 'Förbered CSV' },
  { id: 2, label: 'Ladda upp & validera' },
  { id: 3, label: 'Granska & publicera' },
  { id: 4, label: 'Klart!' },
];

function StepBar({ current }) {
  return (
    <div className="bg-white border-b border-brand-gray/30 px-5 md:px-8">
      <div className="max-w-[860px] mx-auto flex items-center py-4">
        {steps.map((step, i) => (
          <div key={step.id} className="contents">
            <div className="flex items-center gap-2 shrink-0">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-bold ${
                  step.id < current
                    ? 'bg-brand-blue text-white'
                    : step.id === current
                    ? 'bg-brand-blue text-white shadow-[0_0_0_3px_rgba(71,123,244,0.25)]'
                    : 'bg-brand-gray-light text-brand-gray-medium'
                }`}
              >
                {step.id < current ? '✓' : step.id}
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
  );
}

/* ── Section wrapper ───────────────────────────────────── */

function Section({ children, className = '' }) {
  return <div className={`bg-white rounded-2xl border border-brand-gray/30 p-6 mb-4 ${className}`}>{children}</div>;
}

/* ── Step 1: Prepare CSV ───────────────────────────────── */

function Step1() {
  return (
    <div>
      <h2 className="text-[22px] font-bold text-brand-dark font-heading mb-1">Bulk-uppladdning för företag</h2>
      <p className="text-[14px] text-brand-gray-medium mb-7">Ladda upp hundratals annonser på en gång via CSV</p>

      {/* How it works */}
      <Section>
        <h3 className="text-[15px] font-bold text-brand-dark mb-4 font-heading">Så här fungerar det</h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { num: 1, icon: '📥', title: 'Ladda ner mall', desc: 'Fyll i din lagerlista i vår CSV-mall' },
            { num: 2, icon: '⬆️', title: 'Ladda upp fil', desc: 'Dra & släpp din CSV eller zip med bilder' },
            { num: 3, icon: '🔍', title: 'Automatisk validering', desc: 'Vi kontrollerar kompatibilitet mot bilmodeller' },
            { num: 4, icon: '🚀', title: 'Publicera direkt', desc: 'Godkänn och sätt live med ett klick' },
          ].map((s) => (
            <div key={s.num} className="text-center px-2">
              <div className="w-6 h-6 bg-brand-blue text-white rounded-full text-[11px] font-bold inline-flex items-center justify-center mb-2">
                {s.num}
              </div>
              <div className="text-[28px] mb-2">{s.icon}</div>
              <div className="text-[13px] font-semibold text-brand-dark mb-1">{s.title}</div>
              <div className="text-[12px] text-brand-gray-medium">{s.desc}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Template cards */}
      <Section>
        <h3 className="text-[15px] font-bold text-brand-dark mb-1 font-heading">Välj CSV-mall</h3>
        <p className="text-[13px] text-brand-gray-medium mb-5">Ladda ner rätt mall för din produkttyp</p>

        {[
          {
            icon: '🔩',
            title: 'Fälgar',
            desc: 'Enbart fälgar utan däck',
            fields: ['diameter*', 'width_j*', 'et_offset*', 'condition*', 'price_sek*', 'city*', 'bolt_pattern', 'brand', 'car_make'],
          },
          {
            icon: '🛞',
            title: 'Kompletta hjul',
            desc: 'Fälg + däck monterade',
            fields: ['diameter*', 'width_j*', 'et_offset*', 'tire_size*', 'tread_mm*', 'season*', 'condition*', 'price_sek*', 'city*', 'tire_brand', 'car_make'],
          },
          {
            icon: '⚫',
            title: 'Däck (enbart)',
            desc: 'Lösa däck — vinter, sommar eller allround',
            fields: ['tire_size*', 'tread_mm*', 'season*', 'condition*', 'price_sek*', 'city*', 'tire_brand', 'dot_year'],
          },
        ].map((t) => (
          <div
            key={t.title}
            className="border-2 border-brand-gray/30 rounded-xl p-5 flex items-center gap-4 mb-3 cursor-pointer hover:border-brand-blue hover:bg-brand-blue-50/20 transition-all"
          >
            <span className="text-[32px] shrink-0">{t.icon}</span>
            <div className="flex-1">
              <div className="text-[14px] font-bold text-brand-dark mb-0.5">{t.title}</div>
              <div className="text-[13px] text-brand-gray-medium mb-2">{t.desc}</div>
              <div className="flex gap-1.5 flex-wrap">
                {t.fields.map((f) => (
                  <span
                    key={f}
                    className={`px-2 py-0.5 rounded text-[11px] ${
                      f.endsWith('*')
                        ? 'bg-amber-100 text-amber-800 font-medium'
                        : 'bg-brand-gray-light text-brand-gray-medium'
                    }`}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <button className="px-4 py-2.5 bg-brand-blue text-white rounded-lg text-[13px] font-semibold hover:bg-brand-blue-dark transition-colors cursor-pointer shrink-0">
              Ladda ner
            </button>
          </div>
        ))}

        <div className="flex gap-4 mt-3 text-[12px] text-brand-gray-medium">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-amber-200 shrink-0" /> Obligatoriskt</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-green-200 shrink-0" /> Auto-fylls</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-brand-gray-light shrink-0" /> Valfritt</span>
        </div>
      </Section>

      {/* Tips */}
      <Section>
        <h3 className="text-[15px] font-bold text-brand-dark mb-4 font-heading">Tips för bra annonser</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-[13px] text-green-800">
            ✅ Ange <strong>car_make + car_model + year</strong> → vi matchar automatiskt mot rätt bilmodeller
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-[13px] text-green-800">
            ✅ Lägg bilder i en <strong>zip-fil</strong> med samma namn som image_url-kolumnen
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-[13px] text-amber-800">
            ⚠️ ET-offset i CSV gäller <strong>din specifika fälg</strong> — inte bilens godkända range
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-[13px] text-amber-800">
            ⚠️ Mönsterdjup anges per <strong>enskilt däck</strong> — inte ett medelvärde
          </div>
        </div>
      </Section>
    </div>
  );
}

/* ── Step 2: Upload & validate ─────────────────────────── */

function Step2() {
  const [hasFile, setHasFile] = useState(true);

  return (
    <div>
      <h2 className="text-[22px] font-bold text-brand-dark font-heading mb-1">Ladda upp & validera</h2>
      <p className="text-[14px] text-brand-gray-medium mb-7">Din fil kontrolleras automatiskt mot bilmodeller och OEM-specifikationer</p>

      {/* Upload zone */}
      <Section>
        {hasFile ? (
          <div className="border-2 border-brand-green rounded-2xl p-10 text-center bg-green-50/30">
            <div className="text-[36px] mb-2">✅</div>
            <div className="text-[15px] font-semibold text-green-800">kompletta_hjul_lager_mars2026.csv</div>
            <div className="text-[13px] text-brand-gray-medium mt-1">47 rader · 128 KB · Uppladdad 20:14</div>
          </div>
        ) : (
          <div className="border-2 border-dashed border-brand-gray/40 rounded-2xl p-12 text-center cursor-pointer hover:border-brand-blue hover:bg-brand-blue-50/20 transition-all">
            <div className="text-[36px] mb-3">📂</div>
            <div className="text-[16px] font-semibold text-brand-dark mb-1.5">Dra & släpp din CSV-fil här</div>
            <div className="text-[13px] text-brand-gray-medium">
              eller <span className="text-brand-blue underline">välj fil från din dator</span>
            </div>
            <div className="text-[12px] text-brand-gray-medium mt-2">Accepterade format: .csv, .zip (CSV + bilder)</div>
          </div>
        )}
        {hasFile && (
          <button
            onClick={() => setHasFile(false)}
            className="text-[12px] text-red-500 underline mt-2 block cursor-pointer"
          >
            Ta bort fil och ladda upp en annan
          </button>
        )}
      </Section>

      {/* Validation summary */}
      {hasFile && (
        <>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-green-50 border-[1.5px] border-green-300 rounded-xl p-4">
              <div className="text-[28px] font-extrabold text-green-600">38</div>
              <div className="text-[13px] font-medium text-green-800">✓ Redo att publicera</div>
              <div className="text-[12px] text-brand-gray-medium mt-1">Alla fält godkända</div>
            </div>
            <div className="bg-amber-50 border-[1.5px] border-amber-300 rounded-xl p-4">
              <div className="text-[28px] font-extrabold text-amber-600">6</div>
              <div className="text-[13px] font-medium text-amber-800">⚠ Kräver granskning</div>
              <div className="text-[12px] text-brand-gray-medium mt-1">Varningar — bör ses över</div>
            </div>
            <div className="bg-red-50 border-[1.5px] border-red-300 rounded-xl p-4">
              <div className="text-[28px] font-extrabold text-red-600">3</div>
              <div className="text-[13px] font-medium text-red-800">✕ Kan inte publiceras</div>
              <div className="text-[12px] text-brand-gray-medium mt-1">Obligatoriska fält saknas</div>
            </div>
          </div>

          {/* Table */}
          <Section className="p-0 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b-2 border-brand-gray/20 px-4">
              {[
                { label: 'Alla rader', count: '47', color: 'green' },
                { label: 'Godkända', count: '38', color: 'green' },
                { label: 'Varningar', count: '6', color: 'amber' },
                { label: 'Fel', count: '3', color: 'red' },
              ].map((tab, i) => (
                <button
                  key={tab.label}
                  className={`px-4 py-2.5 text-[13px] font-medium border-b-[3px] -mb-[2px] transition-colors cursor-pointer ${
                    i === 0 ? 'text-brand-blue border-brand-blue font-semibold' : 'text-brand-gray-medium border-transparent hover:text-brand-blue'
                  }`}
                >
                  {tab.label}
                  <span
                    className={`ml-1.5 text-[11px] font-bold px-1.5 py-px rounded-full ${
                      tab.color === 'green'
                        ? 'bg-green-100 text-green-800'
                        : tab.color === 'amber'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Bulk actions */}
            <div className="px-4 py-3 border-b border-brand-gray/20">
              <div className="flex items-center gap-3 bg-brand-gray-light rounded-xl px-4 py-2.5">
                <label className="flex items-center gap-2 text-[13px] font-medium cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-brand-blue" />
                  Välj alla synliga
                </label>
                <div className="w-px h-5 bg-brand-gray/40" />
                <button className="px-3 py-1.5 border-[1.5px] border-brand-green text-green-800 bg-green-50 rounded-lg text-[13px] font-semibold cursor-pointer hover:bg-green-100 transition-colors">
                  ✓ Publicera valda
                </button>
                <button className="px-3 py-1.5 border-[1.5px] border-brand-gray/40 text-brand-gray-medium bg-white rounded-lg text-[13px] font-semibold cursor-pointer hover:bg-brand-gray-light transition-colors">
                  Skippa valda
                </button>
                <span className="ml-auto text-[13px] text-brand-gray-medium">47 rader visas</span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead className="bg-brand-gray-light/50">
                  <tr>
                    <th className="px-4 py-2.5 text-left text-[11px] font-bold text-brand-gray-medium uppercase tracking-wide w-8">
                      <input type="checkbox" className="w-4 h-4 accent-brand-blue" />
                    </th>
                    <th className="px-3 py-2.5 text-left text-[11px] font-bold text-brand-gray-medium uppercase tracking-wide">Status</th>
                    <th className="px-3 py-2.5 text-left text-[11px] font-bold text-brand-gray-medium uppercase tracking-wide">Produkt</th>
                    <th className="px-3 py-2.5 text-left text-[11px] font-bold text-brand-gray-medium uppercase tracking-wide">Specifikationer</th>
                    <th className="px-3 py-2.5 text-left text-[11px] font-bold text-brand-gray-medium uppercase tracking-wide">Kompatibilitet</th>
                    <th className="px-3 py-2.5 text-left text-[11px] font-bold text-brand-gray-medium uppercase tracking-wide">Pris</th>
                    <th className="px-3 py-2.5 text-left text-[11px] font-bold text-brand-gray-medium uppercase tracking-wide">Åtgärd</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { status: 'ok', title: 'Kompletta vinterhjul 18"', meta: 'Rad 1 · Nokian Hakkapeliitta', specs: ['18"', '7.5J', 'ET45', '235/60R18', '8mm ❄️'], compat: '✓ 5x108 verifierat', car: 'Volvo XC60 2015–2022', price: '5 500 kr' },
                    { status: 'ok', title: 'Kompletta sommarhjul 19"', meta: 'Rad 2 · Michelin Pilot Sport', specs: ['19"', '8J', 'ET43', '235/55R19', '6mm ☀️'], compat: '✓ 5x108 verifierat', car: 'Volvo XC60 2017–2022', price: '8 900 kr' },
                    { status: 'warn', title: 'Vinterfälgar 17" stål', meta: 'Rad 5 · Rial', specs: ['17"', '7J', 'ET50'], compat: '⚠ ET50 = gräns', car: 'Volvo XC60', price: '2 800 kr' },
                    { status: 'err', title: 'Komplett 20" sommar', meta: 'Rad 8 · Pirelli', specs: ['20"', '9J', '—', '255/45R20'], compat: '✕ ET saknas', car: 'Volvo XC60', price: '12 500 kr' },
                  ].map((row, i) => (
                    <tr key={i} className={`hover:bg-brand-gray-light/30 border-b border-brand-gray-light ${
                      row.status === 'ok' ? 'border-l-[3px] border-l-brand-green' : row.status === 'warn' ? 'border-l-[3px] border-l-amber-400' : 'border-l-[3px] border-l-red-400'
                    }`}>
                      <td className="px-4 py-3"><input type="checkbox" defaultChecked={row.status === 'ok'} className="w-4 h-4 accent-brand-blue" /></td>
                      <td className="px-3 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[12px] font-semibold ${
                          row.status === 'ok' ? 'bg-green-100 text-green-800' : row.status === 'warn' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {row.status === 'ok' ? '✓ OK' : row.status === 'warn' ? '⚠ Varning' : '✕ Fel'}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <div className="font-semibold text-brand-dark">{row.title}</div>
                        <div className="text-[12px] text-brand-gray-medium">{row.meta}</div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex gap-1 flex-wrap">
                          {row.specs.map((s, j) => (
                            <span key={j} className={`px-1.5 py-0.5 rounded text-[11px] ${
                              s === '—' ? 'bg-red-100 text-red-800' : 'bg-brand-gray-light text-brand-gray-medium'
                            }`}>{s}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className={`text-[12px] font-semibold ${
                          row.status === 'ok' ? 'text-green-700' : row.status === 'warn' ? 'text-amber-700' : 'text-red-700'
                        }`}>{row.compat}</div>
                        <div className="text-[12px] text-brand-gray-medium">{row.car}</div>
                      </td>
                      <td className="px-3 py-3 font-bold text-brand-dark">{row.price}</td>
                      <td className="px-3 py-3">
                        <div className="flex gap-1.5">
                          <button className="px-2.5 py-1 bg-brand-blue-50 text-brand-blue rounded-md text-[11px] font-semibold cursor-pointer hover:bg-brand-blue-100 transition-colors">Redigera</button>
                          <button className="px-2.5 py-1 bg-brand-gray-light text-brand-gray-medium rounded-md text-[11px] font-semibold cursor-pointer hover:bg-brand-gray/30 transition-colors">Skippa</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        </>
      )}
    </div>
  );
}

/* ── Step 3: Review & publish ──────────────────────────── */

function Step3() {
  return (
    <div>
      <h2 className="text-[22px] font-bold text-brand-dark font-heading mb-1">Granska & publicera</h2>
      <p className="text-[14px] text-brand-gray-medium mb-7">Sista kontrollen innan publicering</p>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <Section className="text-center">
          <div className="text-[32px] font-extrabold text-brand-blue">38</div>
          <div className="text-[14px] font-medium text-brand-dark mt-1">Redo att publicera</div>
          <div className="text-[12px] text-brand-gray-medium mt-1">Godkända annonser med alla fält korrekt ifyllda</div>
        </Section>
        <Section className="text-center">
          <div className="text-[32px] font-extrabold text-amber-600">6</div>
          <div className="text-[14px] font-medium text-brand-dark mt-1">Publiceras med varning</div>
          <div className="text-[12px] text-brand-gray-medium mt-1">Varningar noteras men blockar ej</div>
        </Section>
      </div>

      <div className="bg-brand-blue-50 border border-brand-blue-100 rounded-xl px-4 py-3 text-[13px] text-brand-blue flex items-start gap-2.5 mb-4">
        <img src="/icons/sparkles.svg" alt="" className="w-4 h-4 mt-0.5 opacity-70" />
        3 rader med fel har hoppats över. Du kan gå tillbaka och rätta dem när som helst.
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-[13px] text-amber-800 flex items-start gap-2 mb-5">
        ⚠️ Annonserna publiceras direkt på Wheelplace och blir synliga för köpare. Du kan avpublicera när som helst från "Mina annonser".
      </div>

      <button className="w-full py-4.5 bg-brand-green text-white rounded-xl text-[16px] font-bold hover:bg-brand-green-dark transition-colors cursor-pointer shadow-md">
        Publicera 44 annonser
      </button>
    </div>
  );
}

/* ── Step 4: Done ──────────────────────────────────────── */

function Step4() {
  return (
    <div className="text-center py-10">
      <div className="text-[56px] mb-4">🎉</div>
      <h2 className="text-[24px] font-extrabold text-brand-dark font-heading mb-2">Klart!</h2>
      <p className="text-[15px] text-brand-gray-medium mb-8">44 annonser har publicerats på Wheelplace</p>

      <div className="flex justify-center gap-8 mb-10">
        <div className="text-center">
          <div className="text-[28px] font-extrabold text-brand-blue">44</div>
          <div className="text-[13px] text-brand-gray-medium mt-1">Publicerade</div>
        </div>
        <div className="text-center">
          <div className="text-[28px] font-extrabold text-amber-600">6</div>
          <div className="text-[13px] text-brand-gray-medium mt-1">Med varningar</div>
        </div>
        <div className="text-center">
          <div className="text-[28px] font-extrabold text-red-600">3</div>
          <div className="text-[13px] text-brand-gray-medium mt-1">Överhoppade</div>
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <a
          href="/annonser-proto"
          className="px-6 py-3 bg-brand-blue text-white rounded-xl text-[14px] font-semibold hover:bg-brand-blue-dark transition-colors"
        >
          Se publicerade annonser
        </a>
        <button className="px-6 py-3 bg-white border-[1.5px] border-brand-gray/40 text-brand-dark rounded-xl text-[14px] font-semibold hover:bg-brand-gray-light transition-colors cursor-pointer">
          Ladda upp fler
        </button>
      </div>
    </div>
  );
}

/* ── Main page ─────────────────────────────────────────── */

export default function BulkUpload() {
  const [step, setStep] = useState(2);

  const goNext = () => setStep((s) => Math.min(s + 1, 4));
  const goPrev = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="bg-brand-gray-light min-h-screen pb-24">
      <StepBar current={step} />

      {/* Top bar */}
      <div className="bg-white border-b border-brand-gray/30 px-5 md:px-8">
        <div className="max-w-[860px] mx-auto flex items-center justify-between py-2.5">
          <span className="text-[12px] font-semibold text-brand-blue bg-brand-blue-50 px-2.5 py-1 rounded-full">🏢 Företagskonto</span>
          <span className="text-[13px] text-brand-gray-medium">Magnus Hansson · <a href="#" className="text-brand-blue hover:underline">← Mina annonser</a></span>
        </div>
      </div>

      <div className="max-w-[860px] mx-auto px-4 py-8">
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
        {step === 4 && <Step4 />}
      </div>

      {/* Bottom nav */}
      {step < 4 && (
        <div className="fixed bottom-0 inset-x-0 bg-white border-t border-brand-gray/30 px-5 md:px-8 py-3.5 flex items-center justify-between z-40">
          <button
            onClick={goPrev}
            disabled={step === 1}
            className="px-5 py-2.5 border-[1.5px] border-brand-gray/40 rounded-xl text-[14px] font-semibold text-brand-gray-medium hover:bg-brand-gray-light transition-colors cursor-pointer disabled:opacity-30"
          >
            Tillbaka
          </button>
          <span className="text-[13px] text-brand-gray-medium">Steg {step} av 4</span>
          <button
            onClick={goNext}
            className={`px-6 py-2.5 rounded-xl text-[14px] font-bold transition-colors cursor-pointer flex items-center gap-2 ${
              step === 3
                ? 'bg-brand-green text-white hover:bg-brand-green-dark'
                : 'bg-brand-blue text-white hover:bg-brand-blue-dark'
            }`}
          >
            {step === 3 ? 'Publicera' : 'Nästa'} →
          </button>
        </div>
      )}
    </div>
  );
}
