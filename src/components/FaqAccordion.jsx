import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus, Minus, Search, HelpCircle, ArrowRight } from 'lucide-react';
import { EASE_OUT, Reveal, RevealWords } from './Reveal';

const MUTED_TEXT = 'text-zinc-600 dark:text-zinc-400';

export const FaqAccordion = ({ t, onScrollToContact }) => {
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = t.faq.items.filter(item =>
    item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="section scroll-mt-20 border-b border-zinc-200/80 dark:border-white/[0.08]">
      <div className="container-page">

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">

          {/* Left: heading and contact action */}
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow mb-4">
                <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t.faq.eyebrow}</span>
              </span>
            </Reveal>

            <RevealWords as="h2" text={t.faq.title} className="display-lg mb-5 text-zinc-950 dark:text-zinc-50" />

            <Reveal as="p" delay={0.15} className={`lede mb-8 ${MUTED_TEXT}`}>
              {t.faq.lead}
            </Reveal>

            <Reveal delay={0.25}>
              <button
                type="button"
                onClick={onScrollToContact}
                className="btn-secondary group"
              >
                <span>{t.faq.askQuestionBtn}</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
              </button>
            </Reveal>
          </div>

          {/* Right: search + accordion */}
          <Reveal delay={0.1} className="space-y-4 lg:col-span-7">

            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" aria-hidden="true" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.faq.searchPlaceholder}
                aria-label={t.faq.searchPlaceholder}
                className="w-full rounded-xl border border-zinc-200 bg-white py-3 pl-10 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors duration-200 focus:border-emerald-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-100"
              />
            </div>

            <div className="space-y-2.5">
              {filteredFaqs.length === 0 ? (
                <div className={`surface p-8 text-center text-sm ${MUTED_TEXT}`}>
                  {t.faq?.noQuestions || "Hech qanday savol topilmadi. To'g'ridan-to'g'ri mutaxassisimizga murojaat qilishingiz mumkin."}
                </div>
              ) : (
                filteredFaqs.map((faq, idx) => {
                  const isOpen = openIndex === idx;
                  return (
                    <div
                      key={idx}
                      className={`surface overflow-hidden transition-colors duration-300 ${
                        isOpen
                          ? 'border-emerald-500/40 bg-zinc-50 dark:bg-white/[0.05]'
                          : 'hover:border-zinc-300 dark:hover:border-white/[0.15]'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                        aria-expanded={isOpen}
                        className="flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500 sm:p-5"
                      >
                        <span className={`text-sm font-semibold ${
                          isOpen ? 'text-zinc-950 dark:text-zinc-50' : 'text-zinc-700 dark:text-zinc-300'
                        }`}>
                          {faq.q}
                        </span>
                        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${
                          isOpen ? 'bg-emerald-600 text-white' : 'bg-zinc-100 text-zinc-500 dark:bg-white/[0.06] dark:text-zinc-400'
                        }`}>
                          {isOpen
                            ? <Minus className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />
                            : <Plus className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: EASE_OUT }}
                            className="overflow-hidden"
                          >
                            <div className={`mx-4 border-t border-zinc-200 py-4 text-sm leading-relaxed sm:mx-5 dark:border-white/[0.08] ${MUTED_TEXT}`}>
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })
              )}
            </div>

          </Reveal>

        </div>

      </div>
    </section>
  );
};
