import React, { useState } from 'react';
import { Plus, Minus, Search, HelpCircle, ArrowRight } from 'lucide-react';

export const FaqAccordion = ({ t, onScrollToContact }) => {
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = t.faq.items.filter(item => 
    item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-20 lg:py-24 bg-transparent text-zinc-900 dark:text-zinc-100 transition-colors border-b border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heading and Contact Action */}
          <div className="lg:col-span-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <HelpCircle className="w-4 h-4 text-emerald-500" />
              <span>{t.faq.eyebrow}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight mb-4">
              {t.faq.title}
            </h2>

            <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed mb-6">
              {t.faq.lead}
            </p>

            {/* Direct Ask Question Button */}
            <button
              type="button"
              onClick={onScrollToContact}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-emerald-500 hover:text-slate-950 text-zinc-800 dark:text-zinc-200 font-bold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer border border-zinc-200 dark:border-zinc-700"
            >
              <span>{t.faq.askQuestionBtn}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right Column: Search + Accordion Items */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Instant Search Bar */}
            <div className="relative mb-4">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.faq.searchPlaceholder}
                className="w-full pl-9 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-emerald-500 shadow-xs"
              />
            </div>

            {/* Accordion List */}
            <div className="space-y-2.5">
              {filteredFaqs.length === 0 ? (
                <div className="p-8 text-center bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500">
                  {t.faq?.noQuestions || "Hech qanday savol topilmadi. To'g'ridan-to'g'ri mutaxassisimizga murojaat qilishingiz mumkin."}
                </div>
              ) : (
                filteredFaqs.map((faq, idx) => {
                  const isOpen = openIndex === idx;
                  return (
                    <div
                      key={idx}
                      className={`rounded-xl transition-all duration-150 border ${
                        isOpen
                          ? 'bg-zinc-50 dark:bg-zinc-900 border-emerald-500/40 shadow-sm'
                          : 'bg-white dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <span className={`text-xs sm:text-sm font-bold ${
                          isOpen ? 'text-zinc-900 dark:text-zinc-50' : 'text-zinc-700 dark:text-zinc-300'
                        }`}>
                          {faq.q}
                        </span>
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                          isOpen ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
                        }`}>
                          {isOpen ? <Minus className="w-3.5 h-3.5 stroke-[2.5]" /> : <Plus className="w-3.5 h-3.5 stroke-[2.5]" />}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-4 pt-1 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-200 dark:border-zinc-800/80">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
