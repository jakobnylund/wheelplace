import { useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const faqData = [
  {
    category: 'Köpa & Sälja',
    items: [
      {
        q: 'Hur fungerar det att köpa hjul på Wheelplace?',
        a: 'Sök med ditt registreringsnummer eller bläddra bland kategorier. När du hittar rätt hjul kontaktar du säljaren direkt via plattformen. Vi erbjuder oberoende rådgivning om du behöver hjälp att välja rätt.',
      },
      {
        q: 'Hur lägger jag upp en annons?',
        a: 'Klicka på "Lägg in annons", fyll i uppgifter om dina hjul/däck/fälgar, ladda upp bilder och publicera. Det är kostnadsfritt att annonsera.',
      },
      {
        q: 'Vad är en förfrågan?',
        a: 'Om du inte hittar det du söker kan du skapa en förfrågan. Beskriv vad du letar efter så kan säljare och verkstäder kontakta dig med matchande erbjudanden.',
      },
    ],
  },
  {
    category: 'Däck & Fälgar',
    items: [
      {
        q: 'Hur vet jag vilken däckdimension jag behöver?',
        a: 'Den enklaste metoden är att söka med ditt registreringsnummer — då visar vi automatiskt vilka dimensioner som passar din bil. Du hittar också dimensionen på sidan av dina nuvarande däck (t.ex. 205/55 R16).',
      },
      {
        q: 'Vad är skillnaden mellan friktionsdäck och dubbdäck?',
        a: 'Friktionsdäck använder en mjukare gummiblandning och lameller för grepp. Dubbdäck har metallstift som ger extra grepp på is. Friktionsdäck är tystare och får användas året runt, medan dubbdäck är bäst i nordliga klimat med mycket is.',
      },
      {
        q: 'Hur kontrollerar jag mönsterdjupet?',
        a: 'Lagkravet i Sverige är minst 1,6 mm, men vi rekommenderar minst 3 mm för vinterdäck. Mät i den mest slitna delen med en mönsterdjupsmätare.',
      },
      {
        q: 'Kan jag använda vilka fälgar som helst till min bil?',
        a: 'Nej, fälgar måste matcha din bils bultmönster (t.ex. 5x108), centrumhålet och ha rätt ET-tal. Sök med ditt registreringsnummer så visar vi bara fälgar som passar.',
      },
      {
        q: 'Vad betyder ET-tal?',
        a: 'ET-talet anger hur långt fälgens monteringsyta sitter från fälgens mitt. Ett högre ET-tal = hjulet sitter längre in. Fel ET-tal kan påverka körbarhet.',
      },
      {
        q: 'Vad är kompletta hjul?',
        a: 'Kompletta hjul betyder att däck redan är monterade på fälgar — klara att byta direkt. Det sparar tid och ofta pengar jämfört med att köpa separat.',
      },
    ],
  },
];

export default function FAQAccordion() {
  const [open, setOpen] = useState(null);
  const ref = useScrollReveal();

  const toggle = (id) => setOpen(open === id ? null : id);

  return (
    <div ref={ref} className="fade-in space-y-10">
      {faqData.map((group) => (
        <div key={group.category}>
          <h3 className="text-xs font-bold text-brand-gray-medium uppercase tracking-widest mb-4">
            {group.category}
          </h3>
          <div className="divide-y divide-brand-gray/50">
            {group.items.map((item) => {
              const id = item.q;
              const isOpen = open === id;
              return (
                <div key={id}>
                  <button
                    onClick={() => toggle(id)}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer bg-transparent border-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-brand-dark text-[15px]">{item.q}</span>
                    <svg
                      className={`w-5 h-5 flex-shrink-0 text-brand-gray-medium transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-60 pb-5' : 'max-h-0'}`}
                  >
                    <p className="text-[15px] text-brand-gray-medium leading-relaxed pr-8">
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
