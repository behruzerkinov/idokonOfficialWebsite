import React, { useRef, useState, useEffect, useCallback } from 'react';
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

  // Google Store Carousel State: Paging boundaries & smooth progress tracking
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Drag-to-scroll tracking refs (Google Maps / Play Store physics)
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);

  // Update boundary indicators & progress bar
  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;

    // Accounts for container horizontal padding (px-4 to px-8 = 16px to 32px)
    setCanScrollLeft(scrollLeft > 40);
    setCanScrollRight(scrollLeft < maxScroll - 40);

    const effectiveProgress = maxScroll > 40 ? Math.max(0, scrollLeft - 32) / (maxScroll - 32) : 0;
    setScrollProgress(Math.min(1, Math.max(0, effectiveProgress)));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();

    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  // Google Store Smooth Navigation Arrow Click
  const handleScrollBy = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardStep = 340; // 320px card + 20px gap
    const scrollAmount = direction === 'left' ? -cardStep : cardStep;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // Google Desktop Drag-to-Scroll Physics (does not hijack vertical wheel!)
  const handleMouseDown = (e) => {
    // Only drag on left mouse button
    if (e.button !== 0) return;
    const el = scrollRef.current;
    if (!el) return;

    setIsDragging(true);
    hasMovedRef.current = false;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const el = scrollRef.current;
    if (!el) return;

    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.3; // Responsive fluid multiplier
    if (Math.abs(walk) > 6) {
      hasMovedRef.current = true;
    }
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleCardClick = (product) => {
    // If user dragged horizontally, do not open modal
    if (hasMovedRef.current) {
      hasMovedRef.current = false;
      return;
    }
    onOpenSpecsModal(product);
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
        </div>

        {/* Google Store Carousel Stage with Floating Navigation Controls */}
        <div className="relative group">
          
          {/* Floating Left Navigation Arrow (Google Store style) */}
          <button
            type="button"
            onClick={() => handleScrollBy('left')}
            disabled={!canScrollLeft}
            className={`absolute left-0 sm:-left-5 top-[40%] -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 dark:bg-[#1c1c1e]/95 backdrop-blur-md text-zinc-900 dark:text-zinc-50 shadow-xl border border-black/[0.08] dark:border-white/[0.12] flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95 ${
              canScrollLeft 
                ? 'opacity-100 translate-x-0 pointer-events-auto' 
                : 'opacity-0 -translate-x-3 pointer-events-none'
            }`}
            aria-label="Oldingi qurilmalar"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* Floating Right Navigation Arrow (Google Store style) */}
          <button
            type="button"
            onClick={() => handleScrollBy('right')}
            disabled={!canScrollRight}
            className={`absolute right-0 sm:-right-5 top-[40%] -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 dark:bg-[#1c1c1e]/95 backdrop-blur-md text-zinc-900 dark:text-zinc-50 shadow-xl border border-black/[0.08] dark:border-white/[0.12] flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95 ${
              canScrollRight 
                ? 'opacity-100 translate-x-0 pointer-events-auto' 
                : 'opacity-0 translate-x-3 pointer-events-none'
            }`}
            aria-label="Keyingi qurilmalar"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* ONE-LINE Horizontal Touch & Drag Gallery (Zero Wheel Hijacking) */}
          <div 
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className={`flex items-stretch gap-5 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-6 pt-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 touch-pan-x [webkit-overflow-scrolling:touch] select-none ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          >
            {hardwareProducts.map((product) => {
              const inCart = isInCart(product.id);
              const title = product.title?.[currentLang] || product.title?.uz || '';
              const subtitle = product.desc?.[currentLang] || product.desc?.uz || product.subtitle?.[currentLang] || product.subtitle?.uz || '';

              return (
                <div
                  key={product.id}
                  data-hardware-card="true"
                  onClick={() => handleCardClick(product)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onOpenSpecsModal(product);
                    }
                  }}
                  className="group relative rounded-3xl bg-white dark:bg-[#161617] border border-black/[0.06] dark:border-white/[0.08] shadow-sm hover:shadow-xl dark:hover:shadow-[0_16px_48px_rgba(255,255,255,0.10)] hover:-translate-y-1 hover:border-black/[0.12] dark:hover:border-white/[0.22] flex flex-col justify-between transition-all duration-300 ease-out cursor-pointer overflow-hidden flex-shrink-0 w-[84vw] sm:w-[320px] lg:w-[320px] snap-start"
                  title={`${title} - batafsil ma'lumot olish uchun bosing`}
                >
                  <div>
                    {/* Full-width Minimalist Gallery Image Container */}
                    <div className="relative w-full h-64 sm:h-72 bg-white flex items-center justify-center overflow-hidden border-b border-black/[0.06] dark:border-white/[0.08] flex-shrink-0">
                      <img
                        src={product.image}
                        alt={title}
                        draggable="false"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out pointer-events-none"
                        loading="lazy"
                      />
                    </div>

                    {/* Title & Description with locked sizing */}
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

          {/* Google Material Design 3 Progress Track & Helper Bar */}
          <div className="flex items-center justify-between max-w-xs sm:max-w-sm mx-auto mt-6 px-4">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              {currentLang === 'ru' ? 'Листайте или перетаскивайте' : currentLang === 'en' ? 'Swipe or drag to explore' : "Surish yoki tortish"}
            </span>

            {/* Material 3 Progress Capsule */}
            <div className="w-28 sm:w-36 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full relative overflow-hidden">
              <div 
                className="absolute top-0 bottom-0 bg-emerald-500 rounded-full transition-all duration-100"
                style={{
                  width: '32%',
                  left: `${scrollProgress * 68}%`
                }}
              />
            </div>

            <span className="text-[11px] font-mono font-semibold text-zinc-500 dark:text-zinc-400 tabular-nums">
              {hardwareProducts.length} {currentLang === 'ru' ? 'устройств' : currentLang === 'en' ? 'devices' : 'uskuna'}
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
