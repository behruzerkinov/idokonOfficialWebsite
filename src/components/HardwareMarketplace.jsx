import React, { useRef, useEffect } from 'react';
import { hardwareProducts } from '../data/mockData';
import { ShoppingCart, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

export const HardwareMarketplace = ({ 
  lang = 'uz', 
  t, 
  cart, 
  onAddToCart, 
  onOpenSpecsModal, 
  onOpenCart 
}) => {
  const currentLang = ['uz', 'ru', 'en'].includes(lang) ? lang : 'uz';
  const isInCart = (id) => cart.some(item => item.id === id);
  const scrollRef = useRef(null);

  // Mouse wheel horizontal scrolling translation (active only when cursor is directly over hardware cards)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e) => {
      // 1. Only intercept if cursor is directly on top of a hardware card
      const card = e.target.closest('[data-hardware-card]');
      if (!card) {
        // Cursor is NOT on top of a card -> scroll page normally
        return;
      }

      // 2. If trackpad horizontal scroll, let browser handle natively
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        return;
      }

      // 3. Scrolling UP (e.deltaY < 0):
      if (e.deltaY < 0) {
        if (el.scrollLeft <= 2) {
          // Already at the start -> allow page to scroll up normally!
          return;
        }
        e.preventDefault();
        el.scrollLeft += e.deltaY;
        return;
      }

      // 4. Scrolling DOWN (e.deltaY > 0):
      if (e.deltaY > 0) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (el.scrollLeft >= maxScroll - 2) {
          // Already at the end -> allow page to scroll down normally!
          return;
        }
        e.preventDefault();
        el.scrollLeft += e.deltaY;
        return;
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleAdd = (e, product) => {
    e.stopPropagation(); // Prevent opening modal when clicking add to cart
    onAddToCart(product);
    const title = product.title?.[currentLang] || product.title?.uz || '';
    toast.success(`${title} ${t.equipment?.addedToCartToast || "savatga qo'shildi"}`, {
      description: `${product.price.toLocaleString()} ${t.equipment?.currency || "so'm"}`,
      action: {
        label: t.nav?.cart || 'Savat',
        onClick: () => onOpenCart()
      }
    });
  };

  return (
    <section id="equipment" className="scroll-mt-20 py-16 sm:py-20 lg:py-24 bg-transparent text-zinc-900 dark:text-zinc-100 transition-colors border-b border-black/[0.04] dark:border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-black/[0.06] dark:border-white/[0.08] text-zinc-600 dark:text-zinc-400 text-xs font-mono font-medium uppercase tracking-wider mb-4">
            <span>{t.equipment.eyebrow}</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-semibold text-[#1d1d1f] dark:text-zinc-50 tracking-[-0.03em] leading-[1.08] [text-wrap:balance]">
            {t.equipment.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-normal max-w-[65ch] mx-auto">
            {t.equipment.lead}
          </p>

          {/* Touch & Mouse Wheel responsive navigation controls */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              type="button"
              onClick={() => scroll('left')}
              className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 flex items-center justify-center transition-colors border border-black/[0.06] dark:border-white/[0.08] active:scale-95 cursor-pointer shadow-xs"
              aria-label="Oldingi qurilmalar"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              {currentLang === 'ru' ? 'Листайте колесиком или свайпом' : currentLang === 'en' ? 'Swipe or scroll with mouse wheel' : "Gorizontal surish yoki g'ildirakcha"}
            </span>
            <button
              type="button"
              onClick={() => scroll('right')}
              className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 flex items-center justify-center transition-colors border border-black/[0.06] dark:border-white/[0.08] active:scale-95 cursor-pointer shadow-xs"
              aria-label="Keyingi qurilmalar"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ONE-LINE Horizontal Touch & Mouse Wheel Responsive Gallery */}
        <div 
          ref={scrollRef}
          className="flex items-stretch gap-5 overflow-x-auto max-md:snap-x max-md:snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-6 pt-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 touch-pan-x [webkit-overflow-scrolling:touch] select-none"
        >
          {hardwareProducts.map((product) => {
            const inCart = isInCart(product.id);
            const title = product.title?.[currentLang] || product.title?.uz || '';
            const subtitle = product.desc?.[currentLang] || product.desc?.uz || product.subtitle?.[currentLang] || product.subtitle?.uz || '';

            return (
              <div
                key={product.id}
                data-hardware-card="true"
                onClick={() => onOpenSpecsModal(product)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenSpecsModal(product);
                  }
                }}
                className="group relative rounded-3xl bg-white dark:bg-[#161617] border border-black/[0.06] dark:border-white/[0.08] shadow-sm hover:shadow-xl dark:hover:shadow-[0_16px_48px_rgba(255,255,255,0.10)] hover:-translate-y-1 hover:border-black/[0.12] dark:hover:border-white/[0.22] flex flex-col justify-between transition-all duration-300 ease-out cursor-pointer overflow-hidden flex-shrink-0 w-[84vw] sm:w-[320px] lg:w-[320px] max-md:snap-start"
                title={`${title} - batafsil ma'lumot olish uchun bosing`}
              >
                <div>
                  {/* Full-width Minimalist Gallery Image Container with fixed height */}
                  <div className="relative w-full h-64 sm:h-72 bg-white flex items-center justify-center overflow-hidden border-b border-black/[0.06] dark:border-white/[0.08] flex-shrink-0">
                    <img
                      src={product.image}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                  </div>

                  {/* Title & Description with locked sizing - full 2-line title without clipping */}
                  <div className="p-5 sm:p-6 pb-2">
                    <h3 className="font-semibold text-base sm:text-lg text-[#1d1d1f] dark:text-[#f5f5f7] mb-1.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 tracking-tight min-h-[3.25rem] leading-snug">
                      {title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed min-h-[2.5rem] overflow-hidden">
                      {subtitle}
                    </p>
                  </div>
                </div>

                {/* Price & Action Footer - Perfectly aligned across all cards */}
                <div className="p-5 sm:p-6 pt-3.5 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between gap-3 mt-auto">
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-0.5 leading-none">
                      {t.equipment?.priceLabel || "Narxi"}
                    </div>
                    <div className="flex items-baseline gap-1 whitespace-nowrap">
                      <span className="text-base sm:text-lg font-bold text-[#1d1d1f] dark:text-zinc-50 font-mono tabular-nums leading-tight">
                        {product.price.toLocaleString()}
                      </span>
                      <span className="text-xs font-normal text-zinc-500 font-sans whitespace-nowrap leading-tight">
                        {t.equipment?.currency || "so'm"}
                      </span>
                    </div>
                  </div>

                  {/* Add to Cart Pill Button (Green accent with crisp white text) */}
                  <button
                    type="button"
                    onClick={(e) => handleAdd(e, product)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-white transition-all duration-150 cursor-pointer shadow-sm active:scale-95 flex-shrink-0 whitespace-nowrap ${
                      inCart
                        ? 'bg-emerald-700 hover:bg-emerald-800'
                        : 'bg-emerald-600 hover:bg-emerald-500'
                    }`}
                  >
                    {inCart ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                        <span className="text-white">{t.equipment?.inCartBadge || "Savatda"}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-3.5 h-3.5 text-white" />
                        <span className="text-white">{t.equipment?.addBtn || "Qo'shish"}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
