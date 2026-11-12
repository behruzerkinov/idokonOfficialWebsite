import React, { useState, useRef } from 'react';
import { hardwareProducts } from '../data/mockData';
import { 
  ChevronLeft, ChevronRight, ShoppingCart, Check, 
  ShieldCheck, Info, Star 
} from 'lucide-react';
import { toast } from 'sonner';

export const HardwareMarketplace = ({ 
  lang, 
  t, 
  cart, 
  onAddToCart, 
  onOpenSpecsModal,
  onOpenCart 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const scrollContainerRef = useRef(null);

  const categories = [
    { id: 'all', label: t.equipment.filterAll },
    { id: 'monoblock', label: t.equipment.filterMonoblock },
    { id: 'printers', label: t.equipment.filterPrinters },
    { id: 'scanners', label: t.equipment.filterScanners },
    { id: 'scales', label: t.equipment.filterScales },
    { id: 'drawers', label: t.equipment.filterDrawers }
  ];

  const filteredProducts = selectedCategory === 'all'
    ? hardwareProducts
    : hardwareProducts.filter(p => p.category === selectedCategory);

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
    toast.success(`${title} savatga qo'shildi`, {
      description: `${product.price.toLocaleString()} so'm`,
      action: {
        label: 'Savatni ochish',
        onClick: () => onOpenCart()
      }
    });
  };

  return (
    <section id="equipment" className="py-20 lg:py-24 bg-zinc-50 dark:bg-[#090a0f] text-zinc-900 dark:text-zinc-100 transition-colors border-b border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Carousel Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <span>{t.equipment.eyebrow}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
              {t.equipment.title}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
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

        {/* Category Filters Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 border border-zinc-200 dark:border-zinc-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Horizontal Scrollable Product Cards */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-1 scroll-smooth snap-x snap-mandatory scrollbar-none"
        >
          {filteredProducts.map((product) => {
            const inCart = isInCart(product.id);
            const title = product.title?.[lang] || product.title?.uz || '';
            const subtitle = product.desc?.[lang] || product.desc?.uz || product.subtitle?.[lang] || product.subtitle?.uz || '';

            return (
              <div
                key={product.id}
                className="w-[300px] sm:w-[330px] flex-shrink-0 snap-start rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-150 flex flex-col overflow-hidden group"
              >
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
                      {product.badge}
                    </span>
                  )}

                  <span className="absolute top-3 right-3 text-[10px] font-mono text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-900 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800">
                    {product.brand}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-50 mb-1 group-hover:text-emerald-500 transition-colors">
                      {title}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-3">
                      {subtitle}
                    </p>

                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 mb-4">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{product.warranty} rasmiy kafolat</span>
                    </div>
                  </div>

                  <div>
                    {/* Price & Action */}
                    <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800">
                      <div>
                        <div className="text-[10px] font-mono uppercase text-zinc-400">Narxi</div>
                        <div className="text-base font-extrabold text-zinc-900 dark:text-zinc-50 font-mono">
                          {product.price.toLocaleString()} <span className="text-xs font-normal text-zinc-500">so'm</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onOpenSpecsModal(product)}
                          className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                          title="Texnik xarakteristika"
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
                              <span>Savatda</span>
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-3.5 h-3.5" />
                              <span>Qo'shish</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
