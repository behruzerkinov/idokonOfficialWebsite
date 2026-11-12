import React from 'react';
import { 
  RefreshCw, ShieldCheck, Headphones, CheckCircle2, 
  ArrowRight, Layers, FileSpreadsheet, Database,
  QrCode, CreditCard, ShoppingBag, Server
} from 'lucide-react';

export const IntegrationMigration = ({ t, onOpenContact }) => {
  const integrationsList = [
    {
      id: 'soliq',
      badge: t.integrations?.badgeTax || "Soliq / Fiskal",
      badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      title: "Davlat Soliq Qo'mitasi",
      desc: "100% rasmiy fiskallashtirish, avtomat QR-kodli cheklar va soliq bazasiga hisobotlar yuborish.",
      icon: <Server className="w-4 h-4 text-emerald-500" />
    },
    {
      id: 'multikassa',
      badge: "Kassa / Apparat",
      badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
      title: "Multikassa & Arco Kassa",
      desc: "O'zbekistonda keng tarqalgan zamonaviy fiskal apparatlar va kassa printerlari bilan sinxronlash.",
      icon: <Layers className="w-4 h-4 text-blue-500" />
    },
    {
      id: 'payments',
      badge: t.integrations?.badgePayments || "To'lov tizimlari",
      badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
      title: "Payme, Click & Uzum Pay",
      desc: "Kassada 0.8 soniyada to'lovni tasdiqlash, QR-skanerlash va har qanday bank kartalarini qabul qilish.",
      icon: <CreditCard className="w-4 h-4 text-purple-500" />
    },
    {
      id: 'marketplaces',
      badge: "E-tijorat / Ombor",
      badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      title: "Uzum Market & Telegram Bot",
      desc: "Onlayn buyurtmalar va do'koningiz ombor qoldiqlarini real vaqtda bir joyda sinxronlashtirish.",
      icon: <ShoppingBag className="w-4 h-4 text-amber-500" />
    }
  ];

  return (
    <section id="integrations" className="py-14 sm:py-16 lg:py-20 bg-transparent text-zinc-900 dark:text-zinc-100 transition-colors border-b border-zinc-200/80 dark:border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-[#12141c] border border-zinc-200 dark:border-white/[0.08] text-zinc-700 dark:text-zinc-300 text-xs font-mono font-medium uppercase tracking-wider mb-4 shadow-sm">
            <span>{t.integrations.eyebrow}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-zinc-950 dark:text-zinc-50 tracking-[-0.025em] leading-[1.08]">
            {t.integrations.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
            {t.integrations.lead}
          </p>
        </div>

        {/* Balanced, Tidy Layout with Zero Gaping White Space */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-8">
          
          {/* Left Column: 1C & Excel Migration Showcase (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl p-7 sm:p-9 bg-white dark:bg-[#0c0d13] border border-zinc-200/90 dark:border-white/[0.09] shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-medium mb-5 border border-emerald-500/20">
                <RefreshCw className="w-3.5 h-3.5 text-emerald-500 animate-spin" style={{ animationDuration: '6s' }} />
                <span>{t.integrations.zeroDowntime || "Nol to'xtalishli migratsiya"}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-zinc-950 dark:text-zinc-50 mb-6 leading-snug">
                {t.integrations?.migrationHeadline || "1C yoki Excel bazangizni 1 kunda xatosiz o'tkazib beramiz"}
              </h3>

              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-100 dark:bg-zinc-850 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 font-bold border border-zinc-200 dark:border-white/[0.06]">
                    <RefreshCw className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">{t.integrations.card1_title}</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 text-xs mt-1 leading-relaxed">
                      {t.integrations.card1_desc}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-100 dark:bg-zinc-850 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 font-bold border border-zinc-200 dark:border-white/[0.06]">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">{t.integrations.card2_title}</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 text-xs mt-1 leading-relaxed">
                      {t.integrations.card2_desc}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-100 dark:bg-zinc-850 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 font-bold border border-zinc-200 dark:border-white/[0.06]">
                    <Headphones className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">{t.integrations.card3_title}</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 text-xs mt-1 leading-relaxed">
                      {t.integrations.card3_desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-zinc-200/80 dark:border-white/[0.07] text-xs text-zinc-500 dark:text-zinc-400 font-mono flex items-center justify-between">
              <span>{t.integrations.transitionService || "O'tish davri xizmati:"}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">{t.integrations.freeBadge || "100% BEPUL"}</span>
            </div>
          </div>

          {/* Right Column: 4-Card Equal Grid filling the space perfectly (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {integrationsList.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-3xl bg-white dark:bg-[#0c0d13] border border-zinc-200/80 dark:border-white/[0.08] shadow-sm hover:border-zinc-300 dark:hover:border-white/[0.15] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-850 flex items-center justify-center border border-zinc-200/80 dark:border-white/[0.06]">
                      {item.icon}
                    </div>
                  </div>
                  <h4 className="font-serif text-lg sm:text-xl font-normal text-zinc-900 dark:text-zinc-100 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-zinc-100 dark:border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>Holat:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Faol integratsiya
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Full-Width Cohesive Callout Banner */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0c0d13] border border-zinc-200/90 dark:border-white/[0.09] shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold flex-shrink-0 border border-emerald-500/20">
              <Database className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <h4 className="font-serif text-lg sm:text-xl font-normal text-zinc-950 dark:text-zinc-50">
                {t.integrations?.calloutTitle || "Eski bazangiz formatidan qat'i nazar"}
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 font-normal">
                {t.integrations?.calloutDesc || "Tovarlar, narxlar va qoldiqlarni to'liq ko'chirib, kassirlaringizni bepul o'qitamiz."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenContact}
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 font-medium text-xs sm:text-sm transition-all duration-150 cursor-pointer shadow-md"
          >
            <span>{t.integrations.contactSpecialist || "Mutaxassis bilan bog'lanish"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
