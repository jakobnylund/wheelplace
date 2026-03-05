import { useState, useEffect } from 'react';

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);

  useEffect(() => {
    if (bubbleDismissed || open) return;
    const showTimer = setTimeout(() => setShowBubble(true), 3000);
    return () => clearTimeout(showTimer);
  }, [bubbleDismissed, open]);

  useEffect(() => {
    if (!showBubble) return;
    const hideTimer = setTimeout(() => {
      setShowBubble(false);
      setBubbleDismissed(true);
    }, 12000);
    return () => clearTimeout(hideTimer);
  }, [showBubble]);

  useEffect(() => {
    if (open) setShowBubble(false);
  }, [open]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Speech bubble */}
      {showBubble && !open && (
        <div
          className="absolute bottom-20 right-0 w-[280px] bg-white rounded-2xl shadow-lg border border-brand-gray/30 p-4 animate-[aiBubbleIn_0.4s_ease-out]"
        >
          <button
            onClick={() => { setShowBubble(false); setBubbleDismissed(true); }}
            className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-brand-gray-light transition-colors cursor-pointer bg-transparent border-none text-brand-gray-medium"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <p className="text-sm text-brand-dark leading-relaxed pr-4">
            Hej! Jag heter Christofer Hertel och är VD på Wheelplace. Har du några frågor? Prata med mig!
          </p>
          {/* Triangle pointer */}
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r border-b border-brand-gray/30 rotate-45" />
          <style>{`
            @keyframes aiBubbleIn {
              0% { opacity: 0; transform: translateY(8px) scale(0.95); }
              100% { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>
        </div>
      )}

      {open && (
        <div className="absolute bottom-20 right-0 w-[380px] bg-[#f0f4fe] rounded-2xl shadow-2xl overflow-hidden flex flex-col" style={{ height: 520 }}>
          {/* Header */}
          <div className="bg-white px-6 py-5 text-center border-b border-gray-100">
            <img src="/logo.svg" alt="Wheelplace" className="h-8 mx-auto" />
          </div>

          {/* Messages */}
          <div className="flex-1 px-5 py-5 overflow-y-auto">
            <div className="flex items-start gap-2.5 mb-3">
              <img src="/avatar.png" alt="" className="w-8 h-8 rounded-full flex-shrink-0 mt-0.5" />
              <span className="text-sm font-semibold text-brand-dark">Wheelbot</span>
            </div>
            <div className="ml-0 bg-white rounded-2xl rounded-tl-sm px-4 py-3.5 shadow-sm max-w-[310px]">
              <p className="text-sm text-brand-dark leading-relaxed">
                Hej! Ställ frågor om din bil, däck, fälgar eller wheelplace här 🛞🚗
              </p>
              <p className="text-sm text-brand-gray-medium leading-relaxed mt-3">
                Beskriv så utförligt som möjligt vad du behöver hjälp med. För mer personlig service vänligen kontakta oss via mail eller telefon.
              </p>
              <p className="text-sm text-brand-gray-medium leading-relaxed mt-1">
                <a href="mailto:info@wheelplace.com" className="text-brand-blue hover:text-brand-blue-dark underline">info@wheelplace.com</a> / 0705686939
              </p>
            </div>
          </div>

          {/* Input */}
          <div className="bg-white px-4 py-3 border-t border-gray-100">
            <div className="flex items-center gap-2 border border-brand-gray rounded-full px-4 py-2.5">
              <input
                type="text"
                placeholder="Ask me anything"
                className="flex-1 bg-transparent text-sm text-brand-dark placeholder:text-brand-gray-medium outline-none"
              />
              <button className="text-brand-gray-medium hover:text-brand-blue transition-colors bg-transparent border-none cursor-pointer p-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-16 h-16 rounded-full overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer border-2 border-white p-0 flex items-center justify-center"
        style={{ backgroundColor: open ? '#477bf4' : '#8b95a8' }}
        aria-label="Chatta med oss"
      >
        {open ? (
          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <img src="/avatar.png" alt="" className="w-full h-full object-cover" />
        )}
      </button>
    </div>
  );
}
