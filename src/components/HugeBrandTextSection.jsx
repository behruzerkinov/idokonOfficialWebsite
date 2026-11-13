import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, CheckCircle2, Phone } from 'lucide-react';
import { toast } from 'sonner';

export const HugeBrandTextSection = ({ t, onOpenDemo }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [activeTab, setActiveTab] = useState('demo');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 9) {
      toast.error("Iltimos, to'g'ri telefon raqamingizni kiriting");
      return;
    }
    toast.success("Arizangiz qabul qilindi!", {
      description: "Mutaxassisimiz tez orada siz bilan bog'lanadi."
    });
    setPhoneNumber('');
  };

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-zinc-50 dark:bg-[#07080a] border-t border-zinc-200/80 dark:border-white/[0.08] transition-colors">
      
      {/* Ambient Radial Depth Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-500/[0.04] dark:bg-emerald-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Eyebrow Tag */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-[#12141c] border border-zinc-200/90 dark:border-white/[0.08] text-zinc-700 dark:text-zinc-300 text-xs font-mono font-medium tracking-wide uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>SAVDO VA OMBOR EKOTIZIMI</span>
          </div>
        </div>

        {/* Monumental Twain-style Kinetic Brand Display */}
        <div className="relative select-none text-center mb-16 sm:mb-20 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-sans text-[18vw] sm:text-[17vw] lg:text-[200px] font-bold leading-[0.88] tracking-[-0.04em] text-[#1d1d1f] dark:text-white [text-wrap:nowrap] transition-all duration-300">
              IDO<span className="text-emerald-500">'KON</span>
            </h2>
          </motion.div>

          <p className="mt-4 font-sans text-xl sm:text-2xl lg:text-3xl text-zinc-600 dark:text-zinc-400 font-medium tracking-tight max-w-2xl mx-auto">
            Savdo barcha nuqtalarda. Nazorat yagona tizimda.
          </p>
        </div>

        {/* Twain Reference Tab & Input Container (Attached Image 1 style) */}
        <div className="max-w-xl mx-auto">
          
          {/* Connected Top Tabs */}
          <div className="flex items-end gap-2 pl-4">
            <button
              type="button"
              onClick={() => setActiveTab('demo')}
              className={`px-5 py-2.5 rounded-t-2xl text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer flex items-center gap-2 border-t border-x ${
                activeTab === 'demo'
                  ? 'bg-white dark:bg-[#12141c] text-zinc-950 dark:text-white border-zinc-200/90 dark:border-white/[0.1] shadow-sm font-semibold'
                  : 'bg-zinc-100/60 dark:bg-zinc-900/40 text-zinc-500 dark:text-zinc-400 border-transparent hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              <span>Bepul sinov</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                14 kun
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('consult')}
              className={`px-5 py-2.5 rounded-t-2xl text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer flex items-center gap-2 border-t border-x ${
                activeTab === 'consult'
                  ? 'bg-white dark:bg-[#12141c] text-zinc-950 dark:text-white border-zinc-200/90 dark:border-white/[0.1] shadow-sm font-semibold'
                  : 'bg-zinc-100/60 dark:bg-zinc-900/40 text-zinc-500 dark:text-zinc-400 border-transparent hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              <span>Mutaxassis konsultatsiyasi</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-blue-500/15 text-blue-600 dark:text-blue-400">
                Bepul
              </span>
            </button>
          </div>

          {/* Connected Glass Input Capsule */}
          <form 
            onSubmit={handleSubmit}
            className="p-3 sm:p-4 rounded-3xl rounded-tl-none bg-white dark:bg-[#12141c] border border-zinc-200/90 dark:border-white/[0.1] shadow-xl backdrop-blur-2xl flex flex-col sm:flex-row items-center gap-3"
          >
            <div className="relative flex-1 w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+998 (90) 123-45-67"
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-zinc-50 dark:bg-[#07080a] border border-zinc-200/80 dark:border-white/[0.08] text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 active:scale-95 flex-shrink-0"
            >
              <span>{activeTab === 'demo' ? "Sinab ko'rish" : "Bog'lanish"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Trust Guarantees */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-zinc-500 dark:text-zinc-400 font-normal">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              1 kunda to'liq o'rnatish
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              1C va Exceldan bepul ko'chirish
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              100% Soliq integratsiyasi
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
