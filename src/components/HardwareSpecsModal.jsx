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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md rounded-3xl bg-white dark:bg-[#161617] border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-zinc-100 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950/60">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              {t?.equipment?.technicalSpecs || "Texnik Xususiyatlar"}
            </span>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 mt-1">
              {product.title?.[currentLang] || product.title?.uz}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800 transition-colors cursor-pointer"
            aria-label={t?.equipment?.close || "Yopish"}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
          
          {/* Image & Price banner */}
          <div className="flex items-center gap-4 p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80">
            <img
              src={product.image}
              alt={product.title?.[currentLang] || product.title?.uz}
              className="w-20 h-20 object-contain bg-white dark:bg-zinc-900 rounded-lg p-1.5 border border-zinc-200 dark:border-zinc-700"
            />
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">{t?.equipment?.officialPrice || "Rasmiy Narxi:"}</div>
              <div className="text-xl font-bold font-mono tabular-nums text-zinc-900 dark:text-zinc-50">
                {product.price.toLocaleString()} <span className="text-xs font-normal text-zinc-500 font-sans">{t?.equipment?.currency || "so'm"}</span>
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{warrantyText}</span>
              </div>
            </div>
          </div>

          {/* Specs Table */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {t?.equipment?.parameters || "Parametrlar:"}
            </h4>
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-zinc-50 dark:bg-zinc-950/40">
              {product.specs.map((s, idx) => {
                const specKey = typeof s.key === 'object' ? (s.key[currentLang] || s.key.uz) : s.key;
                const specVal = typeof s.val === 'object' ? (s.val[currentLang] || s.val.uz) : s.val;
                return (
                  <div key={idx} className="flex justify-between p-2.5 text-xs">
                    <span className="text-zinc-500 dark:text-zinc-400">{specKey}</span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-right">{specVal}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white font-semibold text-xs cursor-pointer"
          >
            {t?.equipment?.close || "Yopish"}
          </button>

          <button
            type="button"
            onClick={() => {
              if (!isInCart) onAddToCart(product);
              onClose();
            }}
            className="flex-1 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{isInCart ? (t?.equipment?.inCart || "Savatda mavjud") : (t?.equipment?.addToCart || "Savatga qo'shish")}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
