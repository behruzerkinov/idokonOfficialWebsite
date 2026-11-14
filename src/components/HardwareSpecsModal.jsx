import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, ShieldCheck, ShoppingCart, Check } from 'lucide-react';
import { EASE_OUT } from './Reveal';

const FOCUS_RING = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500';

const getWarrantyText = (product, currentLang) => {
  if (typeof product.warranty === 'object') {
    return product.warranty[currentLang] || product.warranty.uz;
  }
  if (product.warranty === '6 oy') {
    return currentLang === 'ru' ? '6 месяцев гарантии' : currentLang === 'en' ? '6 months warranty' : '6 oy kafolat';
  }
  return currentLang === 'ru' ? '1 год гарантии' : currentLang === 'en' ? '1 year warranty' : '1 yil kafolat';
};

export const HardwareSpecsModal = ({ isOpen, onClose, product, lang = 'uz', t, onAddToCart, isInCart }) => {
  const currentLang = ['uz', 'ru', 'en'].includes(lang) ? lang : 'uz';
  const warrantyText = product ? getWarrantyText(product, currentLang) : '';
  const title = product?.title?.[currentLang] || product?.title?.uz;

  return (
    <AnimatePresence>
      {isOpen && product && (
        <motion.div
          key="specs-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="hardware-specs-title"
            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-[color:var(--line)] bg-white text-zinc-900 shadow-2xl dark:bg-zinc-900 dark:text-zinc-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[color:var(--line)] p-5 sm:p-6">
              <div className="min-w-0">
                <span className="eyebrow">
                  {t?.equipment?.technicalSpecs || "Texnik Xususiyatlar"}
                </span>
                <h3 id="hardware-specs-title" className="mt-2 text-lg font-semibold tracking-[-0.02em] text-zinc-900 dark:text-zinc-50">
                  {title}
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                className={`flex-shrink-0 cursor-pointer rounded-full p-2 text-zinc-500 transition-colors duration-200 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/[0.08] dark:hover:text-white ${FOCUS_RING}`}
                aria-label={t?.equipment?.close || "Yopish"}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-6 overflow-y-auto p-5 sm:p-6">

              {/* Image & price */}
              <div className="flex items-center gap-5 rounded-2xl border border-[color:var(--line)] bg-zinc-50 p-4 dark:bg-white/[0.03]">
                <img
                  src={product.image}
                  alt={title}
                  width="96"
                  height="96"
                  decoding="async"
                  className="h-24 w-24 flex-shrink-0 rounded-xl border border-[color:var(--line)] bg-white object-contain p-2"
                />
                <div className="min-w-0">
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                    {t?.equipment?.officialPrice || "Rasmiy Narxi:"}
                  </div>
                  <div className="mt-0.5 font-mono text-2xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
                    {product.price.toLocaleString()}{' '}
                    <span className="font-sans text-xs font-normal text-zinc-500">{t?.equipment?.currency || "so'm"}</span>
                  </div>
                  <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>{warrantyText}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              {product.desc && (
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {product.desc[currentLang] || product.desc.uz}
                </p>
              )}

              {/* Specs */}
              <div className="space-y-2.5">
                <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                  {t?.equipment?.parameters || "Parametrlar:"}
                </h4>
                <div className="divide-y divide-[color:var(--line)] overflow-hidden rounded-2xl border border-[color:var(--line)]">
                  {product.specs.map((s, idx) => {
                    const specKey = typeof s.key === 'object' ? (s.key[currentLang] || s.key.uz) : s.key;
                    const specVal = typeof s.val === 'object' ? (s.val[currentLang] || s.val.uz) : s.val;
                    return (
                      <div key={idx} className="flex items-center justify-between gap-4 p-3 text-xs sm:text-sm">
                        <span className="font-medium text-zinc-500 dark:text-zinc-400">{specKey}</span>
                        <span className="text-right font-semibold text-zinc-900 dark:text-zinc-100">{specVal}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="flex items-center gap-3 border-t border-[color:var(--line)] p-4 sm:p-5">
              <button
                type="button"
                onClick={onClose}
                className={`btn-secondary px-5 py-2.5 text-xs ${FOCUS_RING}`}
              >
                {t?.equipment?.close || "Yopish"}
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!isInCart) onAddToCart(product);
                  onClose();
                }}
                className={`btn-primary flex-1 py-2.5 text-xs ${FOCUS_RING}`}
              >
                {isInCart ? (
                  <>
                    <Check className="h-4 w-4 stroke-[2.5]" />
                    <span>{t?.equipment?.inCart || "Savatda mavjud"}</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4" />
                    <span>{t?.equipment?.addToCart || "Savatga qo'shish"}</span>
                  </>
                )}
              </button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
