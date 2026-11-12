import React, { useState } from 'react';
import { 
  X, Phone, User, Store, Send, CheckCircle2, 
  Sparkles, ArrowRight, ShieldCheck, Clock 
} from 'lucide-react';
import { toast } from 'sonner';
import { StoreTypeSelector } from './StoreTypeSelector';

export const DemoModal = ({ isOpen, onClose, t, lang = 'uz' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '+998 ',
    storeType: 'grocery'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

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
      toast.error(t.demoModal?.fillRequired || "Iltimos, ismingiz va telefon raqamingizni to'liq kiriting!");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success(t.demoModal.successTitle, {
        description: t.demoModal?.operatorContactDesc || "Savdo bo'limi operatori siz bilan 10 daqiqada bog'lanadi."
      });
    }, 600);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setFormData({ name: '', phone: '+998 ', storeType: 'grocery' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-md rounded-none bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 tech-box"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tech Corner Squares (ChainGPT Labs style) */}
        <div className="tech-corner-square tech-corner-tl" />
        <div className="tech-corner-square tech-corner-tr" />
        <div className="tech-corner-square tech-corner-bl" />
        <div className="tech-corner-square tech-corner-br" />
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              {t.demoModal.badge}
            </span>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mt-1">
              {t.demoModal.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={handleResetAndClose}
            className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Yopish"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {t.demoModal.subtitle}
              </p>

              {/* Name Field */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  {t.demoModal.nameLabel}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder={t.demoModal.namePlaceholder}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  {t.demoModal.phoneLabel}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder={t.demoModal.phonePlaceholder}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm font-mono text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              {/* Retail Shop Type - Foundation Design */}
              <StoreTypeSelector
                value={formData.storeType}
                onChange={(id, title) => setFormData(prev => ({ ...prev, storeType: id, storeTypeTitle: title }))}
                lang={lang}
                label={t.demoModal.storeLabel || "Do'koningiz yo'nalishi"}
                columns={2}
              />

              {/* Trust Badges - Guaranteed Presentation & Prompt Contact */}
              <div className="pt-2 flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{t.demoModal.expertPresentation || "Mutaxassis taqdimoti"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{t.demoModal.responseTiming || "Bog'lanish: ~10 daqiqa"}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-98"
              >
                {isSubmitting ? (
                  <span>{t.demoModal.submitting || "Yuborilmoqda..."}</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>{t.demoModal.submitBtn}</span>
                  </>
                )}
              </button>

            </form>
          ) : (
            <div className="text-center py-6 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                {t.demoModal.successTitle}
              </h4>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xs mx-auto mb-6">
                {t.demoModal.successDesc}
              </p>

              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80 text-left mb-6 space-y-1.5">
                <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mb-1">
                  {t.demoModal?.fastContact || "Tezkor bog'lanish:"}
                </div>
                <a 
                  href="tel:+998991130999" 
                  className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>+998 99 113 09 99</span>
                </a>
                <a 
                  href="tel:+998953600999" 
                  className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>+998 95 360 09 99</span>
                </a>
              </div>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full py-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs font-bold text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                {t.demoModal?.closeBtn || t.menu?.close || "Yopish"}
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
