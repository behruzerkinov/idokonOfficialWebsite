import React from 'react';

export const EditorialStatement = ({ t }) => {
  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-zinc-100/60 dark:bg-[#07080a] border-y border-zinc-200/80 dark:border-white/[0.08] text-zinc-950 dark:text-zinc-50 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-200/70 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-mono font-medium tracking-wide uppercase mb-8">
          <span>{t?.features?.eyebrow || "BIZNES VA NAZORAT"}</span>
        </div>

        {/* Oversized Twain AI Editorial Statement Headline */}
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-[62px] font-normal leading-[1.08] tracking-[-0.03em] text-zinc-950 dark:text-zinc-100 mb-8 [text-wrap:balance]">
          Do‘koningizdagi har bir tovar, har bir tranzaksiya va har bir so‘m —{' '}
          <span className="text-emerald-600 dark:text-emerald-400 font-serif italic">
            doim aniq hisobda
          </span>{' '}
          bo‘lishi shart.
        </h2>

        {/* Twain AI Editorial Lead Text */}
        <p className="font-sans text-lg sm:text-2xl text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed max-w-3xl">
          Eski daftarlar, Excel jadvallari va kassadagi uzundan-uzoq navbatlar davri tugadi. 
          Siz qayerda bo‘lishingizdan qat’i nazar, IDO‘KON orqali barcha savdo nuqtalaringizni bitta qulay ekranda boshqarasiz.
        </p>

        {/* Stat badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12 mt-12 border-t border-zinc-200/80 dark:border-zinc-800/80">
          <div>
            <div className="font-serif text-3xl sm:text-4xl text-zinc-950 dark:text-white font-normal tracking-tight">0.8 s</div>
            <div className="text-xs sm:text-sm text-zinc-500 font-sans mt-1">O‘rtacha chek chiqarish tezligi</div>
          </div>
          <div>
            <div className="font-serif text-3xl sm:text-4xl text-zinc-950 dark:text-white font-normal tracking-tight">900+</div>
            <div className="text-xs sm:text-sm text-zinc-500 font-sans mt-1">Faol savdo nuqtalari</div>
          </div>
          <div>
            <div className="font-serif text-3xl sm:text-4xl text-zinc-950 dark:text-white font-normal tracking-tight">100%</div>
            <div className="text-xs sm:text-sm text-zinc-500 font-sans mt-1">Davlat Soliq integratsiyasi</div>
          </div>
          <div>
            <div className="font-serif text-3xl sm:text-4xl text-zinc-950 dark:text-white font-normal tracking-tight">1 kun</div>
            <div className="text-xs sm:text-sm text-zinc-500 font-sans mt-1">1C va Exceldan to‘liq ko‘chish</div>
          </div>
        </div>

      </div>
    </section>
  );
};
