import React, { useState } from 'react';
import { X, Phone, User, Send, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { EASE_OUT } from './Reveal';

const FOCUS_RING = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40';
const LABEL = 'mb-1.5 block text-xs font-semibold text-zinc-700 dark:text-zinc-300';
const FIELD =
  'w-full rounded-xl border border-[color:var(--line)] bg-zinc-50 py-2.5 pl-10 pr-3.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors duration-300 focus:border-emerald-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 dark:bg-white/[0.03] dark:text-zinc-100';
const FIELD_ICON = 'pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400';
const TRUST_ICON = 'h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400';
const CONTACT_LINK = `flex items-center gap-2 rounded-sm font-mono text-xs font-semibold text-emerald-600 hover:underline dark:text-emerald-400 ${FOCUS_RING}`;

export const DemoModal = ({ isOpen, onClose, t }) => {
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/60 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          onClick={handleResetAndClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-modal-title"
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[color:var(--line)] bg-white text-zinc-900 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)] dark:bg-zinc-950 dark:text-zinc-100"
            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[color:var(--line)] p-5">
              <div>
                <span className="eyebrow">{t.demoModal.badge || "Bepul Demo"}</span>
                <h3 id="demo-modal-title" className="mt-2 text-lg font-semibold tracking-[-0.02em] text-zinc-950 dark:text-zinc-50">
                  {t.demoModal.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={handleResetAndClose}
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-zinc-500 transition-colors duration-300 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-white/[0.06] dark:hover:text-white ${FOCUS_RING}`}
                aria-label="Yopish"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                  <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {t.demoModal.subtitle}
                  </p>

                  {/* Name Field */}
                  <div>
                    <label htmlFor="demo-name" className={LABEL}>
                      {t.demoModal.nameLabel}
                    </label>
                    <div className="relative">
                      <User className={FIELD_ICON} aria-hidden="true" />
                      <input
                        id="demo-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder={t.demoModal.namePlaceholder}
                        className={FIELD}
                      />
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label htmlFor="demo-phone" className={LABEL}>
                      {t.demoModal.phoneLabel}
                    </label>
                    <div className="relative">
                      <Phone className={FIELD_ICON} aria-hidden="true" />
                      <input
                        id="demo-phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        placeholder={t.demoModal.phonePlaceholder}
                        className={`${FIELD} font-mono`}
                      />
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="flex items-center justify-between pt-1 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className={TRUST_ICON} />
                      <span>{t.demoModal.expertPresentation || "Mutaxassis taqdimoti"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className={TRUST_ICON} />
                      <span>{t.demoModal.responseTiming || "Bog'lanish: ~10 daqiqa"}</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full disabled:cursor-wait disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden="true" />
                        <span>{t.demoModal.submitting || "Yuborilmoqda..."}</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        <span>{t.demoModal.submitBtn}</span>
                      </>
                    )}
                  </button>

                </form>
              ) : (
                <div className="py-6 text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: EASE_OUT }}
                    className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                  >
                    <CheckCircle2 className="h-8 w-8" />
                  </motion.div>

                  <h4 className="mb-2 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                    {t.demoModal.successTitle}
                  </h4>

                  <p className="mx-auto mb-6 max-w-xs text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {t.demoModal.successDesc}
                  </p>

                  <div className="mb-6 space-y-2 rounded-xl border border-[color:var(--line)] bg-zinc-50 p-3.5 text-left dark:bg-white/[0.03]">
                    <div className="mb-1 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                      {t.demoModal?.fastContact || "Tezkor bog'lanish:"}
                    </div>
                    <a href="tel:+998991130999" className={CONTACT_LINK}>
                      <Phone className="h-3.5 w-3.5" />
                      <span>+998 99 113 09 99</span>
                    </a>
                    <a href="tel:+998953600999" className={CONTACT_LINK}>
                      <Phone className="h-3.5 w-3.5" />
                      <span>+998 95 360 09 99</span>
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="btn-secondary w-full"
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
