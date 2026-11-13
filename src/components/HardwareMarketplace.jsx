import React, { useState } from 'react';
import { hardwareProducts } from '../data/mockData';
import { ShoppingCart, Check, Eye } from 'lucide-react';
import { toast } from 'sonner';

export const HardwareMarketplace = ({ 
  lang = 'uz', 
  t, 
  cart, 
  onAddToCart, 
  onOpenSpecsModal, 
  onOpenCart 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: { uz: 'Barcha qurilmalar', ru: 'Все устройства', en: 'All Devices' } },
    { id: 'monoblock', label: { uz: 'Monobloklar', ru: 'Моноблоки', en: 'Monoblocks' } },
    { id: 'printer', label: { uz: 'Printerlar', ru: 'Принтеры', en: 'Printers' } },
    { id: 'scanner', label: { uz: 'Skanerlar', ru: 'Сканеры', en: 'Scanners' } },
    { id: 'other', label: { uz: 'Tarozi & Kassa', ru: 'Весы и ящики', en: 'Scales & Drawers' } },
  ];

  const currentLang = ['uz', 'ru', 'en'].includes(lang) ? lang : 'uz';

  const filteredProducts = hardwareProducts.filter(product => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'other') {
      return product.category === 'scale' || product.category === 'box';
    }
    return product.category === selectedCategory;
  });

  const isInCart = (id) => cart.some(item => item.id === id);

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
    <section id="equipment" className="scroll-mt-20 py-16 sm:py-20 lg:py-24 bg-transparent text-zinc-900 dark:text-zinc-100 transition-colors border-b border-black/[0.04] dark:border-white/[0.06]">
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

          {/* Category Filter Pills (Apple Store style) */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-sm'
                      : 'bg-zinc-100 dark:bg-[#161617] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-black/[0.04] dark:border-white/[0.06]'
                  }`}
                >
                  {cat.label[currentLang] || cat.label.uz}
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive Apple Store Grid (Mobile friendly 1-2 cols, Desktop 4 cols) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredProducts.map((product) => {
            const inCart = isInCart(product.id);
            const title = product.title?.[currentLang] || product.title?.uz || '';
            const subtitle = product.desc?.[currentLang] || product.desc?.uz || product.subtitle?.[currentLang] || product.subtitle?.uz || '';

            return (
              <div
                key={product.id}
                onClick={() => onOpenSpecsModal(product)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenSpecsModal(product);
                  }
                }}
                className="group relative rounded-3xl bg-white dark:bg-[#161617] border border-black/[0.06] dark:border-white/[0.08] shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-black/[0.12] dark:hover:border-white/[0.16] flex flex-col justify-between transition-all duration-300 cursor-pointer overflow-hidden p-4 sm:p-5"
                title={`${title} - batafsil ma'lumot olish uchun bosing`}
              >
                <div>
                  {/* Product Image Area */}
                  <div className="relative h-48 sm:h-52 bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl p-4 flex items-center justify-center overflow-hidden mb-4">
                    <img
                      src={product.image}
                      alt={title}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    
                    {/* Badge (Green accent with white text) */}
                    {product.badge && (
                      <span className="absolute top-3 left-3 text-[11px] font-sans font-medium px-2.5 py-0.5 rounded-full bg-emerald-600 text-white shadow-xs">
                        {typeof product.badge === 'object' ? (product.badge[currentLang] || product.badge.uz) : product.badge}
                      </span>
                    )}

                    {/* Quick View Hover Indicator */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 dark:bg-white/20 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{t.equipment?.viewSpecs || "Batafsil"}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-semibold text-base text-[#1d1d1f] dark:text-[#f5f5f7] mb-1.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                    {subtitle}
                  </p>
                </div>

                {/* Price & Action Footer */}
                <div className="pt-3.5 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between gap-2">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                      {t.equipment?.priceLabel || "Narxi"}
                    </div>
                    <div className="text-base sm:text-lg font-bold text-[#1d1d1f] dark:text-zinc-50 font-mono tabular-nums">
                      {product.price.toLocaleString()}{' '}
                      <span className="text-xs font-normal text-zinc-500 font-sans">
                        {t.equipment?.currency || "so'm"}
                      </span>
                    </div>
                  </div>

                  {/* Add to Cart Pill Button (Green accent with crisp white text) */}
                  <button
                    type="button"
                    onClick={(e) => handleAdd(e, product)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-white transition-all duration-150 cursor-pointer shadow-sm active:scale-95 flex-shrink-0 ${
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
