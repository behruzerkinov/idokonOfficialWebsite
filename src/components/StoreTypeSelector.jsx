import React from 'react';
import { 
  ShoppingCart, Shirt, Hammer, Sparkles, 
  Smartphone, Store, Check
} from 'lucide-react';

export const STORE_TYPES = [
  {
    id: 'grocery',
    icon: ShoppingCart,
    title: {
      uz: "Oziq-ovqat / Market",
      ru: "Продукты / Маркет",
      en: "Grocery / Market"
    },
    hint: {
      uz: "Supermarket, mini-market",
      ru: "Супермаркет, гастроном",
      en: "Supermarket, grocery"
    }
  },
  {
    id: 'clothing',
    icon: Shirt,
    title: {
      uz: "Kiyim & Poyabzal",
      ru: "Одежда и обувь",
      en: "Fashion & Footwear"
    },
    hint: {
      uz: "Kiyim, butik, aksessuarlar",
      ru: "Бутики, обувные магазины",
      en: "Apparel, boutiques"
    }
  },
  {
    id: 'hardware',
    icon: Hammer,
    title: {
      uz: "Qurilish & Xo'jalik",
      ru: "Стройматериалы",
      en: "Hardware & Tools"
    },
    hint: {
      uz: "Xo'jalik mollari, ehtiyot qismlar",
      ru: "Хозтовары, инструменты",
      en: "Home improvement, parts"
    }
  },
  {
    id: 'cosmetics',
    icon: Sparkles,
    title: {
      uz: "Kosmetika & Go'zallik",
      ru: "Косметика и парфюм",
      en: "Beauty & Cosmetics"
    },
    hint: {
      uz: "Parfyumeriya, gigiyena",
      ru: "Парфюмерия, уход",
      en: "Perfume, skincare"
    }
  },
  {
    id: 'electronics',
    icon: Smartphone,
    title: {
      uz: "Maishiy texnika",
      ru: "Техника и гаджеты",
      en: "Electronics & Tech"
    },
    hint: {
      uz: "Smartfonlar, elektronika",
      ru: "Электроника, аксессуары",
      en: "Phones, electronics"
    }
  },
  {
    id: 'other',
    icon: Store,
    title: {
      uz: "Boshqa chakana do'kon",
      ru: "Другой магазин",
      en: "Other Retail Store"
    },
    hint: {
      uz: "Kitob, sovg'alar va boshqalar",
      ru: "Канцтовары, подарки и др.",
      en: "Books, gifts & specialty"
    }
  }
];

export const StoreTypeSelector = ({ 
  value, 
  onChange, 
  lang = 'uz', 
  label, 
  columns = 2 
}) => {
  const currentLang = ['uz', 'ru', 'en'].includes(lang) ? lang : 'uz';

  const defaultLabel = {
    uz: "Do'kon turi / Yo'nalishi",
    ru: "Направление магазина",
    en: "Store Business Category"
  }[currentLang];

  return (
    <div className="space-y-1.5 text-left">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          {label || defaultLabel}
        </label>
        <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
          Tanlang
        </span>
      </div>

      <div 
        role="radiogroup" 
        aria-label={label || defaultLabel}
        className={`grid gap-2 ${columns === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}`}
      >
        {STORE_TYPES.map((type) => {
          const Icon = type.icon;
          const isSelected = value === type.id || value === type.title[currentLang];
          const title = type.title[currentLang] || type.title.uz;
          const hint = type.hint[currentLang] || type.hint.uz;

          return (
            <button
              key={type.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(type.id, title)}
              className={`group relative flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                isSelected
                  ? 'bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500 dark:border-emerald-500 text-zinc-950 dark:text-zinc-50 shadow-xs ring-1 ring-emerald-500/30'
                  : 'bg-zinc-50/70 dark:bg-zinc-800/40 border-zinc-200/90 dark:border-zinc-700/60 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100/90 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600'
              }`}
            >
              {/* Icon Container */}
              <div 
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 shadow-xs'
                    : 'bg-zinc-200/70 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>

              {/* Text Info */}
              <div className="flex-1 min-w-0 pr-1">
                <div className={`text-xs font-semibold leading-tight truncate ${
                  isSelected ? 'text-zinc-950 dark:text-white font-bold' : 'text-zinc-800 dark:text-zinc-200'
                }`}>
                  {title}
                </div>
                <div className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate leading-tight mt-0.5 font-mono">
                  {hint}
                </div>
              </div>

              {/* Indicator */}
              <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                isSelected 
                  ? 'bg-emerald-500 text-slate-950 scale-100' 
                  : 'border border-zinc-300 dark:border-zinc-700 opacity-40 group-hover:opacity-75 scale-90'
              }`}>
                {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
