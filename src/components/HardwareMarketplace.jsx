import React, { useRef } from 'react';
import { hardwareProducts } from '../data/mockData';
import { 
  ChevronLeft, ChevronRight, ShoppingCart, Check, 
  ShieldCheck, Info 
} from 'lucide-react';
import { toast } from 'sonner';
import { FluentRevealCard } from './FluentReveal';
import { ScrambleText } from './ScrambleText';

export const HardwareMarketplace = ({ 
  lang, 
  t, 
  cart, 
  onAddToCart, 
  onOpenSpecsModal, 
  onOpenCart 
}) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 360 * direction;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const isInCart = (id) => cart.some(item => item.id === id);

  const handleAdd = (product) => {
    onAddToCart(product);
    const title = product.title[lang] || product.title.uz;
    toast.success(`${title} ${t.equipment?.addedToCartToast || "savatga qo'shildi"}`, {
      description: `${product.price.toLocaleString()} ${t.equipment?.currency || "so'm"}`,
      action: {
        label: t.nav?.cart || 'Savat',
        onClick: () => onOpenCart()
      }
    });
  };

  return (
    <section id="equipment" className="py-20 lg:py-24 bg-transparent text-zinc-900 dark:text-zinc-100 transition-colors border-b border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Carousel Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <span>{t.equipment.eyebrow}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight [text-wrap:balance]">
              {t.equipment.title}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-[65ch]">
              {t.equipment.lead}
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scroll(-1)}
              className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors shadow-sm cursor-pointer"
              aria-label="Oldingi qurilmalar"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors shadow-sm cursor-pointer"
              aria-label="Keyingi qurilmalar"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Product Cards with Windows 10 Luminous Reveal Effect */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-1 scroll-smooth snap-x snap-mandatory scrollbar-none"
        >
          {hardwareProducts.map((product) => {
            const inCart = isInCart(product.id);
            const title = product.title?.[lang] || product.title?.uz || '';
            const subtitle = product.desc?.[lang] || product.desc?.uz || product.subtitle?.[lang] || product.subtitle?.uz || '';

            return (
              <FluentRevealCard
                key={product.id}
                className="w-[300px] sm:w-[330px] flex-shrink-0 snap-start rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-emerald-500/40 dark:hover:border-emerald-500/40 flex flex-col group tech-box relative"
              >
                <div className="tech-corner-square tech-corner-tl" />
                <div className="tech-corner-square tech-corner-br" />

                {/* Product Image Area */}
                <div className="relative h-48 bg-zinc-100 dark:bg-zinc-950/80 p-6 flex items-center justify-center overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
                  <img
                    src={product.image}
                    alt={title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
                    loading="lazy"
                  />
                  
                  {product.badge && (
                    <span className="absolute top-3 left-3 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                      {typeof product.badge === 'object' ? (product.badge[lang] || product.badge.uz) : product.badge}
                    </span>
                  )}

                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 text-[10px] font-mono text-zinc-600 dark:text-zinc-400">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    <span>{typeof product.warranty === 'object' ? (product.warranty[lang] || product.warranty.uz) : product.warranty}</span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-50 mb-1.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                      <ScrambleText text={title} scrambleOnHover duration={350} />
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                      {subtitle}
                    </p>
                  </div>

                  <div>
                    {/* Price & Action */}
                    <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800">
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">{t.equipment?.priceLabel || "Narxi"}</div>
                        <div className="text-base font-extrabold text-zinc-900 dark:text-zinc-50 font-mono tabular-nums">
                          {product.price.toLocaleString()} <span className="text-xs font-normal text-zinc-500 font-sans">{t.equipment?.currency || "so'm"}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onOpenSpecsModal(product)}
                          className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                          title={t.equipment?.viewSpecs || "Texnik xususiyatlar"}
                        >
                          <Info className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleAdd(product)}
                          className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer ${
                            inCart
                              ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40'
                              : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                          }`}
                        >
                          {inCart ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>{t.equipment?.inCartBadge || "Savatda"}</span>
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-3.5 h-3.5" />
                              <span>{t.equipment?.addBtn || "Qo'shish"}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </FluentRevealCard>
            );
          })}
        </div>

      </div>
    </section>
  );
};
