import React from 'react';
import { X, ShieldCheck, ShoppingCart, Check } from 'lucide-react';

export const HardwareSpecsModal = ({ isOpen, onClose, product, lang = 'uz', t, onAddToCart, isInCart }) => {
  if (!isOpen || !product) return null;

  const currentLang = ['uz', 'ru', 'en'].includes(lang) ? lang : 'uz';
  const warrantyText = typeof product.warranty === 'object'
    ? (product.warranty[currentLang] || product.warranty.uz)
    : (product.warranty === '6 oy'
        ? (currentLang === 'ru' ? '6 месяцев гарантии' : currentLang === 'en' ? '6 months warranty' : '6 oy kafolat')
        : (currentLang === 'ru' ? '1 год гарантии' : currentLang === 'en' ? '1 year warranty' : '1 yil kafolat'));

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#161617] border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-zinc-100 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between bg-zinc-50/80 dark:bg-zinc-950/60">
          <div>
            <span className="text-[11px] font-sans font-medium uppercase tracking-wider text-white bg-emerald-600 px-3 py-1 rounded-full shadow-xs">
              {t?.equipment?.technicalSpecs || "Texnik Xususiyatlar"}
            </span>
            <h3 className="text-lg font-bold text-[#1d1d1f] dark:text-zinc-50 mt-2">
              {product.title?.[currentLang] || product.title?.uz}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-black/[0.04] dark:bg-white/[0.08] transition-colors cursor-pointer"
            aria-label={t?.equipment?.close || "Yopish"}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Image & Price banner */}
          <div className="flex items-center gap-5 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-black/[0.05] dark:border-white/[0.06]">
            <img
              src={product.image}
              alt={product.title?.[currentLang] || product.title?.uz}
              className="w-24 h-24 object-contain bg-white dark:bg-[#161617] rounded-xl p-2 border border-black/[0.05] dark:border-white/[0.06]"
            />
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">{t?.equipment?.officialPrice || "Rasmiy Narxi:"}</div>
              <div className="text-2xl font-bold font-mono tabular-nums text-[#1d1d1f] dark:text-zinc-50 mt-0.5">
                {product.price.toLocaleString()} <span className="text-xs font-normal text-zinc-500 font-sans">{t?.equipment?.currency || "so'm"}</span>
              </div>
              <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-medium shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                <span className="text-white">{warrantyText}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          {product.desc && (
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {product.desc[currentLang] || product.desc.uz}
            </p>
          )}

          {/* Specs Table */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {t?.equipment?.parameters || "Parametrlar:"}
            </h4>
            <div className="divide-y divide-black/[0.05] dark:divide-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl overflow-hidden bg-zinc-50/60 dark:bg-zinc-950/40">
              {product.specs.map((s, idx) => {
                const specKey = typeof s.key === 'object' ? (s.key[currentLang] || s.key.uz) : s.key;
                const specVal = typeof s.val === 'object' ? (s.val[currentLang] || s.val.uz) : s.val;
                return (
                  <div key={idx} className="flex justify-between items-center p-3 text-xs sm:text-sm">
                    <span className="text-zinc-500 dark:text-zinc-400 font-medium">{specKey}</span>
                    <span className="font-semibold text-[#1d1d1f] dark:text-zinc-100 text-right">{specVal}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-black/[0.06] dark:border-white/[0.08] bg-zinc-50/80 dark:bg-zinc-950/60 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full border border-black/[0.08] dark:border-white/[0.1] bg-white dark:bg-[#161617] text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white font-medium text-xs cursor-pointer transition-colors"
          >
            {t?.equipment?.close || "Yopish"}
          </button>

          <button
            type="button"
            onClick={() => {
              if (!isInCart) onAddToCart(product);
              onClose();
            }}
            className="flex-1 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs tracking-wide flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all active:scale-[0.98]"
          >
            {isInCart ? (
              <>
                <Check className="w-4 h-4 text-white stroke-[2.5]" />
                <span className="text-white">{t?.equipment?.inCart || "Savatda mavjud"}</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 text-white" />
                <span className="text-white">{t?.equipment?.addToCart || "Savatga qo'shish"}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
