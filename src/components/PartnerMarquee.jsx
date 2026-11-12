import React from 'react';

export const PartnerMarquee = ({ t }) => {
  const partners = [
    {
      id: "click",
      name: "Click",
      type: "Click Up & Pass",
      logo: (
        <img
          src="/logos/click.svg"
          alt="Click"
          className="h-6 w-auto object-contain"
        />
      )
    },
    {
      id: "payme",
      name: "Payme",
      type: "Payme Business",
      logo: (
        <img
          src="/logos/payme.svg"
          alt="Payme"
          className="h-5 w-auto object-contain"
        />
      )
    },
    {
      id: "uzum",
      name: "Uzum",
      type: "Uzum Pay & Nasiya",
      logo: (
        <img
          src="/logos/uzum.png"
          alt="Uzum"
          className="h-6 w-auto object-contain"
        />
      )
    },
    {
      id: "soliq",
      name: "Multikassa",
      type: "Davlat Soliq Qo'mitasi",
      logo: (
        <div className="flex items-center gap-2">
          <img
            src="/logos/soliq.svg"
            alt="Soliq Qo'mitasi"
            className="h-6 w-auto object-contain"
          />
          <span className="font-bold text-zinc-900 dark:text-zinc-100 text-xs tracking-tight">Multikassa</span>
        </div>
      )
    },
    {
      id: "arco",
      name: "Arco",
      type: "Fiskal kassa tizimi",
      logo: (
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded bg-amber-500 flex items-center justify-center text-slate-950 font-black text-[10px]">
            AR
          </div>
          <span className="font-bold text-zinc-900 dark:text-zinc-100 text-xs tracking-tight">Arco Kassa</span>
        </div>
      )
    },
    {
      id: "eimzo",
      name: "E-imzo / Eskiz",
      type: "SMS va Raqamli imzo",
      logo: (
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded bg-blue-500 flex items-center justify-center text-white font-black text-[10px]">
            EI
          </div>
          <span className="font-bold text-zinc-900 dark:text-zinc-100 text-xs tracking-tight">E-imzo SMS</span>
        </div>
      )
    }
  ];

  return (
    <section className="py-8 bg-zinc-100/60 dark:bg-zinc-950 border-y border-zinc-200 dark:border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-6">
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            {t.partners?.title || t.marquee?.title || "O‘zbekistondagi rasmiy to‘lov va fiskal tizimlar bilan integratsiyalashgan"}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-emerald-500/30 transition-colors group"
            >
              <div className="h-8 flex items-center justify-center">
                {partner.logo}
              </div>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono mt-1.5 tracking-tight text-center">
                {partner.type}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
