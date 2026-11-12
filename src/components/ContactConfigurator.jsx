import React, { useState } from 'react';
import { 
  Phone, Send, MessageSquare, Clock, ShieldCheck, Sparkles, CheckCircle2 
} from 'lucide-react';
import { toast } from 'sonner';
import { StoreTypeSelector } from './StoreTypeSelector';

export const ContactConfigurator = ({ t, lang = 'uz' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '+998 ',
    storeType: 'grocery',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handlePhoneChange = (e) => {
    let val = e.target.value;
    if (!val.startsWith('+998')) {
      val = '+998 ';
    }
    setFormData(prev => ({ ...prev, phone: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || formData.phone.length < 9) {
      toast.error("Iltimos, ismingiz va telefon raqamingizni to'liq kiriting!");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("So'rovingiz qabul qilindi!", {
        description: "Operatorimiz 10 daqiqa ichida siz bilan bog'lanadi."
      });
      setFormData({
        name: '',
        phone: '+998 ',
        storeType: 'Oziq-ovqat / Supermarket',
        message: ''
      });
    }, 600);
  };

  return (
    <section id="contact" className="py-20 lg:py-24 bg-transparent text-zinc-900 dark:text-zinc-100 transition-colors border-b border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>{t.contact.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight">
            {t.contact.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
            {t.contact.lead}
          </p>
        </div>

        {/* 2-Column Architectural Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Direct Communication Channels */}
          <div className="lg:col-span-5 rounded-2xl p-7 sm:p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">
                To'g'ridan-to'g'ri aloqa
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                Do'koningiz hisobini tartibga keltiramiz
              </h3>

              <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6">
                Dasturni sinab ko'rish, uskunalar tanlash yoki narxlar bo'yicha savollaringiz bo'lsa, mutaxassisimizga qo'ng'iroq qiling.
              </p>

              <div className="space-y-3">
                <a 
                  href="tel:+998991180999" 
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 hover:border-emerald-500 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-bold flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">{t.contact.hotlineLabel || "Tezkor operator raqami:"}</div>
                    <div className="text-sm font-bold font-mono tabular-nums text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-500 transition-colors">
                      +998 99 118 09 99
                    </div>
                  </div>
                </a>

                <a 
                  href="https://t.me/idokonuz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 hover:border-emerald-500 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-teal-500 text-slate-950 flex items-center justify-center font-bold flex-shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">{t.contact.telegramLabel || "Telegram orqali bog'lanish:"}</div>
                    <div className="text-sm font-bold font-mono text-zinc-900 dark:text-zinc-100 group-hover:text-teal-500 transition-colors">
                      @idokonuz
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400 font-mono flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-500" />
                <span>{t.contact.workingHoursLabel || "Ish vaqti:"}</span>
              </div>
              <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{t.contact.workHours}</span>
            </div>
          </div>

          {/* Right Column: High Taste Minimalist Consultation Request */}
          <div className="lg:col-span-7 rounded-2xl p-7 sm:p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
            {submitted ? (
              <div className="my-auto text-center py-8">
                <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                  So'rovingiz qabul qilindi!
                </h4>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto mb-6">
                  Mutaxassisimiz tez orada sizga qo'ng'iroq qilib, I-Do'kon tizimini do'koningizga moslashtirish bo'yicha maslahat beradi.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Yana bir so'rov yuborish
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                  Konsultatsiya buyurtma qilish
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      {t.contact.nameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder={t.contact.namePlaceholder}
                      className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      {t.contact.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      placeholder={t.contact.phonePlaceholder}
                      className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm font-mono text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Shop Type - Foundation Design */}
                <StoreTypeSelector
                  value={formData.storeType}
                  onChange={(id, title) => setFormData(prev => ({ ...prev, storeType: id, storeTypeTitle: title }))}
                  lang={lang}
                  label={t.contact.storeTypeLabel || "Do'koningiz turi"}
                  columns={2}
                />

                {/* Optional Message */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    {t.contact.messageLabel} (ixtiyoriy)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Qanday uskunalar yoki savollaringiz bor..."
                    className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                  />
                </div>

                {/* Privacy Notice */}
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {t.contact.privacy}
                </p>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-98"
                >
                  {loading ? (
                    <span>{t.contact.submitting}</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>{t.contact.submitBtn}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
