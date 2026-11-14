import React, { useRef, useState, useEffect, useCallback } from 'react';
import { hardwareProducts } from '../data/mockData';
import { ShoppingCart, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { Reveal, RevealWords } from './Reveal';

const FOCUS_RING = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500';
const NAV_BUTTON = `absolute top-[40%] z-20 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[color:var(--line)] bg-white/90 text-zinc-900 shadow-sm backdrop-blur-md transition-[opacity,transform,background-color] duration-300 ease-out hover:bg-zinc-50 disabled:cursor-default dark:bg-zinc-900/90 dark:text-zinc-50 dark:hover:bg-zinc-800 sm:h-12 sm:w-12 ${FOCUS_RING}`;
const PRICE_LABEL = 'mb-1 font-mono text-[10px] uppercase leading-none tracking-[0.14em] text-zinc-500 dark:text-zinc-400';

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

  // Carousel state: paging boundaries & progress tracking
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Drag-to-scroll tracking refs
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

  // Arrow click: scroll by one card step
  const handleScrollBy = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardStep = 340; // 320px card + 20px gap
    const scrollAmount = direction === 'left' ? -cardStep : cardStep;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // Desktop drag-to-scroll (does not hijack vertical wheel)
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
    <section id="equipment" className="section scroll-mt-20 overflow-hidden">
      <div className="container-page">

        <div className="mx-auto mb-12 max-w-3xl text-center">
          <Reveal>
            <span className="eyebrow mb-4">{t.equipment.eyebrow}</span>
          </Reveal>
          <RevealWords as="h2" text={t.equipment.title} className="display-lg text-zinc-900 dark:text-zinc-50" />
          <Reveal delay={0.15}>
            <p className="lede mx-auto mt-5 max-w-[60ch]">{t.equipment.lead}</p>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="relative">

          {/* Left navigation arrow */}
          <button
            type="button"
            onClick={() => handleScrollBy('left')}
            disabled={!canScrollLeft}
            className={`${NAV_BUTTON} left-0 sm:-left-5 ${
              canScrollLeft
                ? 'pointer-events-auto translate-x-0 opacity-100'
                : 'pointer-events-none -translate-x-3 opacity-0'
            }`}
            aria-label="Oldingi qurilmalar"
          >
            <ChevronLeft className="h-5 w-5 stroke-[2.2]" />
          </button>

          {/* Right navigation arrow */}
          <button
            type="button"
            onClick={() => handleScrollBy('right')}
            disabled={!canScrollRight}
            className={`${NAV_BUTTON} right-0 sm:-right-5 ${
              canScrollRight
                ? 'pointer-events-auto translate-x-0 opacity-100'
                : 'pointer-events-none translate-x-3 opacity-0'
            }`}
            aria-label="Keyingi qurilmalar"
          >
            <ChevronRight className="h-5 w-5 stroke-[2.2]" />
          </button>

          {/* Horizontal drag & touch gallery */}
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className={`-mx-5 flex snap-x snap-mandatory items-stretch gap-5 overflow-x-auto px-5 pb-6 pt-2 touch-pan-x select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:-mx-8 sm:px-8 ${
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
                  className={`group surface surface-lift flex w-[84vw] flex-shrink-0 cursor-pointer snap-start flex-col justify-between overflow-hidden sm:w-[320px] ${FOCUS_RING}`}
                  title={`${title} - batafsil ma'lumot olish uchun bosing`}
                >
                  <div>
                    <div className="relative flex h-64 w-full flex-shrink-0 items-center justify-center overflow-hidden border-b border-[color:var(--line)] bg-white sm:h-72">
                      <img
                        src={product.image}
                        alt={title}
                        width="320"
                        height="288"
                        loading="lazy"
                        decoding="async"
                        draggable="false"
                        className="pointer-events-none h-full w-full object-cover"
                      />
                    </div>

                    <div className="p-5 pb-2 sm:p-6">
                      <h3 className="mb-1.5 line-clamp-2 min-h-[3.25rem] text-base font-semibold leading-snug tracking-tight text-zinc-900 transition-colors duration-300 group-hover:text-emerald-600 dark:text-zinc-50 dark:group-hover:text-emerald-400 sm:text-lg">
                        {title}
                      </h3>
                      <p className="line-clamp-2 min-h-[2.5rem] overflow-hidden text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-sm">
                        {subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-[color:var(--line)] p-5 pt-3.5 sm:p-6">
                    <div className="min-w-0">
                      <div className={PRICE_LABEL}>
                        {t.equipment?.priceLabel || "Narxi"}
                      </div>
                      <div className="flex items-baseline gap-1 whitespace-nowrap">
                        <span className="font-mono text-base font-semibold tabular-nums leading-tight text-zinc-900 dark:text-zinc-50 sm:text-lg">
                          {product.price.toLocaleString()}
                        </span>
                        <span className="whitespace-nowrap font-sans text-xs leading-tight text-zinc-500">
                          {t.equipment?.currency || "so'm"}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleAdd(e, product)}
                      className={`btn-primary flex-shrink-0 whitespace-nowrap px-3.5 py-2 text-xs ${inCart ? 'bg-emerald-700 hover:bg-emerald-800' : ''} ${FOCUS_RING}`}
                    >
                      {inCart ? (
                        <>
                          <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                          <span>{t.equipment?.inCartBadge || "Savatda"}</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-3.5 w-3.5" />
                          <span>{t.equipment?.addBtn || "Qo'shish"}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress track & helper bar */}
          <div className="mx-auto mt-6 flex max-w-xs items-center justify-between gap-4 px-4 sm:max-w-sm">
            <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
              {currentLang === 'ru' ? 'Листайте или перетаскивайте' : currentLang === 'en' ? 'Swipe or drag to explore' : "Surish yoki tortish"}
            </span>

            <div className="relative h-1 w-28 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800 sm:w-36">
              <div
                className="absolute inset-y-0 left-0 w-[32%] rounded-full bg-emerald-500 will-change-transform transition-transform duration-150 ease-out"
                style={{ transform: `translateX(${scrollProgress * 212.5}%)` }}
              />
            </div>

            <span className="font-mono text-[11px] font-semibold tabular-nums text-zinc-500 dark:text-zinc-400">
              {hardwareProducts.length} {currentLang === 'ru' ? 'устройств' : currentLang === 'en' ? 'devices' : 'uskuna'}
            </span>
          </div>

        </Reveal>

      </div>
    </section>
  );
};
