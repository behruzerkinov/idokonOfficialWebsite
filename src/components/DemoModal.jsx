import React, { useState } from 'react';
import { 
  X, Phone, User, Send, CheckCircle2, 
  Sparkles, ShieldCheck, Clock 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

export const DemoModal = ({ isOpen, onClose, t, lang = 'uz' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '+998 '
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
    }, 500);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setFormData({ name: '', phone: '+998 ' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleResetAndClose}
        >
          <motion.div 
            className="relative w-full max-w-md rounded-2xl bg-white dark:bg-[#0c0e15] border border-zinc-200/90 dark:border-white/[0.1] text-zinc-900 dark:text-zinc-100 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Highlight Accent Line */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />

            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-zinc-200/80 dark:border-white/[0.08] bg-zinc-50/80 dark:bg-white/[0.02]">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  {t.demoModal.badge || "Bepul Demo"}
                </span>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mt-1">
                  {t.demoModal.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-white/[0.06] hover:bg-zinc-200 dark:hover:bg-white/[0.12] text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Yopish"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {t.demoModal.subtitle}
                  </p>

                  {/* Name Field */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      {t.demoModal.nameLabel}
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder={t.demoModal.namePlaceholder}
                        className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-50 dark:bg-white/[0.04] border border-zinc-200 dark:border-white/[0.08] rounded-xl text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-emerald-500 transition-colors shadow-xs"
                      />
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      {t.demoModal.phoneLabel}
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        placeholder={t.demoModal.phonePlaceholder}
                        className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-50 dark:bg-white/[0.04] border border-zinc-200 dark:border-white/[0.08] rounded-xl text-sm font-mono text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-emerald-500 transition-colors shadow-xs"
                      />
                    </div>
                  </div>

                  {/* Trust Badges */}
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
                    className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 cursor-pointer active:scale-98"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>{t.demoModal.submitting || "Yuborilmoqda..."}</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>{t.demoModal.submitBtn}</span>
                      </>
                    )}
                  </button>

                </form>
              ) : (
                <div className="text-center py-6">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                    {t.demoModal.successTitle}
                  </h4>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xs mx-auto mb-6">
                    {t.demoModal.successDesc}
                  </p>

                  <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-white/[0.04] border border-zinc-200 dark:border-white/[0.08] text-left mb-6 space-y-2">
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
                    className="w-full py-2.5 rounded-xl bg-zinc-100 dark:bg-white/[0.06] text-xs font-bold text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    {t.demoModal?.closeBtn || t.menu?.close || "Yopish"}
                  </button>
                </div>
              )}
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
