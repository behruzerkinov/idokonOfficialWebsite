import React from 'react';

export const EditorialStatement = ({ t }) => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-zinc-50/70 dark:bg-[#07080a] border-y border-black/[0.04] dark:border-white/[0.06] text-zinc-950 dark:text-zinc-50 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-200/60 dark:bg-zinc-900 border border-black/[0.06] dark:border-white/[0.08] text-zinc-600 dark:text-zinc-400 text-xs font-mono font-medium tracking-wide uppercase mb-8">
          <span>{t?.features?.eyebrow || "BIZNES VA NAZORAT"}</span>
        </div>

        {/* Statement Headline */}
        <h2 className="font-sans text-3xl sm:text-5xl lg:text-[56px] font-semibold leading-[1.15] tracking-[-0.03em] text-[#1d1d1f] dark:text-[#f5f5f7] mb-8 [text-wrap:balance]">
          Do‘koningizdagi har bir tovar, har bir tranzaksiya va har bir so‘m —{' '}
          <span className="text-emerald-500 dark:text-emerald-400 font-semibold">
            doim aniq hisobda
          </span>{' '}
          bo‘lishi shart.
        </h2>

        {/* Lead Text */}
        <p className="font-sans text-lg sm:text-2xl text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed max-w-3xl">
          Eski daftarlar, Excel jadvallari va kassadagi uzundan-uzoq navbatlar davri tugadi. 
          Siz qayerda bo‘lishingizdan qat’i nazar, IDO‘KON orqali barcha savdo nuqtalaringizni bitta qulay ekranda boshqarasiz.
        </p>

        {/* Stat metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12 mt-12 border-t border-black/[0.06] dark:border-white/[0.08]">
          <div>
            <div className="font-sans text-3xl sm:text-5xl text-[#1d1d1f] dark:text-white font-semibold tracking-tight tabular-nums">0.8 s</div>
            <div className="text-xs sm:text-sm text-zinc-500 font-sans mt-2">O‘rtacha chek chiqarish tezligi</div>
          </div>
          <div>
            <div className="font-sans text-3xl sm:text-5xl text-[#1d1d1f] dark:text-white font-semibold tracking-tight tabular-nums">900+</div>
            <div className="text-xs sm:text-sm text-zinc-500 font-sans mt-2">Faol savdo nuqtalari</div>
          </div>
          <div>
            <div className="font-sans text-3xl sm:text-5xl text-[#1d1d1f] dark:text-white font-semibold tracking-tight tabular-nums">100%</div>
            <div className="text-xs sm:text-sm text-zinc-500 font-sans mt-2">Davlat Soliq integratsiyasi</div>
          </div>
          <div>
            <div className="font-sans text-3xl sm:text-5xl text-[#1d1d1f] dark:text-white font-semibold tracking-tight tabular-nums">1 kun</div>
            <div className="text-xs sm:text-sm text-zinc-500 font-sans mt-2">1C va Exceldan to‘liq ko‘chish</div>
          </div>
        </div>

      </div>
    </section>
  );
};
