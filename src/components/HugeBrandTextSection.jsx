import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, CheckCircle2, Phone } from 'lucide-react';
import { toast } from 'sonner';

export const HugeBrandTextSection = ({ lang = 'uz', t, onOpenDemo }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [activeTab, setActiveTab] = useState('demo');

  const isRu = lang === 'ru';
  const isEn = lang === 'en';

  const texts = {
    eyebrow: isRu ? "ЭКОСИСТЕМА ТОРГОВЛИ И СКЛАДА" : isEn ? "RETAIL & INVENTORY ECOSYSTEM" : "SAVDO VA OMBOR EKOTIZIMI",
    tagline: isRu ? "Торговля во всех точках. Контроль в единой системе." : isEn ? "Retail at every point. Control in a single platform." : "Savdo barcha nuqtalarda. Nazorat yagona tizimda.",
    tabDemo: isRu ? "Bepul sinov" : isEn ? "Free Trial" : "Bepul sinov",
    tabDemoBadge: isRu ? "14 дней" : isEn ? "14 days" : "14 kun",
    tabConsult: isRu ? "Mutaxassis konsultatsiyasi" : isEn ? "Expert Consultation" : "Mutaxassis konsultatsiyasi",
    tabConsultBadge: isRu ? "Бесплатно" : isEn ? "Free" : "Bepul",
    btnDemo: isRu ? "Sinab ko'rish" : isEn ? "Try Now" : "Sinab ko'rish",
    btnConsult: isRu ? "Bog'lanish" : isEn ? "Contact Us" : "Bog'lanish",
    successMsg: isRu ? "Заявка принята!" : isEn ? "Request received!" : "Arizangiz qabul qilindi!",
    successDesc: isRu ? "Наш специалист свяжется с вами в ближайшее время." : isEn ? "Our specialist will contact you shortly." : "Mutaxassisimiz tez orada siz bilan bog'lanadi.",
    invalidPhone: isRu ? "Пожалуйста, введите корректный номер телефона" : isEn ? "Please enter a valid phone number" : "Iltimos, to'g'ri telefon raqamingizni kiriting",
    g1: isRu ? "Полная установка за 1 день" : isEn ? "Full setup in 1 day" : "1 kunda to'liq o'rnatish",
    g2: isRu ? "Бесплатный перенос из 1C и Excel" : isEn ? "Free migration from 1C & Excel" : "1C va Exceldan bepul ko'chirish",
    g3: isRu ? "100% интеграция с ГНК (Soliq)" : isEn ? "100% Tax compliance" : "100% Soliq integratsiyasi"
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 9) {
      toast.error(texts.invalidPhone);
      return;
    }
    toast.success(texts.successMsg, {
      description: texts.successDesc
    });
    setPhoneNumber('');
  };

  return (
    <section 
      id="brand-finale"
      className="relative z-[110] -mt-16 sm:-mt-24 lg:-mt-28 min-h-screen w-full flex flex-col justify-center items-center py-20 sm:py-28 lg:py-32 overflow-hidden rounded-t-[36px] sm:rounded-t-[48px] lg:rounded-t-[60px] bg-white dark:bg-[#07080a] border-t border-black/[0.08] dark:border-white/[0.12] shadow-[0_-30px_70px_-15px_rgba(0,0,0,0.18)] dark:shadow-[0_-40px_100px_-15px_rgba(0,0,0,0.95)] transition-colors"
    >
      {/* Slide Grabber Pill on top edge */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700/80 pointer-events-none" />

      {/* Ambient Radial Depth Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-emerald-500/[0.05] dark:bg-emerald-500/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
        
        {/* Top Eyebrow Tag */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-[#12141c] border border-zinc-200/90 dark:border-white/[0.08] text-zinc-700 dark:text-zinc-300 text-xs font-mono font-medium tracking-wide uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>{texts.eyebrow}</span>
          </div>
        </div>

        {/* Monumental Kinetic Brand Display */}
        <div className="relative select-none text-center mb-12 sm:mb-16 overflow-hidden w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-sans text-[19vw] sm:text-[18vw] lg:text-[220px] xl:text-[260px] font-bold leading-[0.85] tracking-[-0.05em] text-[#1d1d1f] dark:text-white [text-wrap:nowrap] transition-all duration-300">
              IDO<span className="text-emerald-500 font-bold">'KON</span>
            </h2>
          </motion.div>

          <p className="mt-4 sm:mt-6 font-sans text-lg sm:text-2xl lg:text-3xl text-zinc-600 dark:text-zinc-400 font-medium tracking-tight max-w-2xl mx-auto px-4">
            {texts.tagline}
          </p>
        </div>

        {/* Quick Action Connected Form Capsule */}
        <div className="max-w-xl mx-auto w-full">
          
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
              <span>{texts.tabDemo}</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                {texts.tabDemoBadge}
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
              <span>{texts.tabConsult}</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-blue-500/15 text-blue-600 dark:text-blue-400">
                {texts.tabConsultBadge}
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
              <span className="text-white font-medium">{activeTab === 'demo' ? texts.btnDemo : texts.btnConsult}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </form>

          {/* Trust Guarantees */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-zinc-500 dark:text-zinc-400 font-normal">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              {texts.g1}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              {texts.g2}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              {texts.g3}
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
