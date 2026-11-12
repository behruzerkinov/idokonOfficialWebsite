import React from 'react';
import { X, ShieldCheck, ShoppingCart, Check } from 'lucide-react';

export const HardwareSpecsModal = ({ isOpen, onClose, product, lang, t, onAddToCart, isInCart }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950/60">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              Texnik Xususiyatlar
            </span>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 mt-1">
              {product.title[lang] || product.title.uz}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800 transition-colors cursor-pointer"
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
              alt={product.title[lang] || product.title.uz}
              className="w-20 h-20 object-contain bg-white dark:bg-zinc-900 rounded-lg p-1.5 border border-zinc-200 dark:border-zinc-700"
            />
            <div>
              <div className="text-[10px] font-mono uppercase text-zinc-400">Rasmiy Narxi:</div>
              <div className="text-xl font-bold font-mono text-zinc-900 dark:text-zinc-50">
                {product.price.toLocaleString()} <span className="text-xs font-normal text-zinc-500">so'm</span>
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{product.warranty} kafolat</span>
              </div>
            </div>
          </div>

          {/* Specs Table */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Parametrlar:
            </h4>
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-zinc-50 dark:bg-zinc-950/40">
              {product.specs.map((s, idx) => (
                <div key={idx} className="flex justify-between p-2.5 text-xs">
                  <span className="text-zinc-500 dark:text-zinc-400">{s.key}</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-right">{s.val}</span>
                </div>
              ))}
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
            Yopish
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
            <span>{isInCart ? "Savatda mavjud" : "Savatga qo'shish"}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
