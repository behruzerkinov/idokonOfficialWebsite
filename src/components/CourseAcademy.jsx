import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { courseModules } from '../data/mockData';
import { Award, CheckCircle2, ChevronDown, ExternalLink, GraduationCap, Maximize2 } from 'lucide-react';
import { EASE_OUT, Reveal, RevealWords } from './Reveal';

const MUTED_TEXT = 'text-zinc-600 dark:text-zinc-400';
const MONO_LABEL = 'font-mono text-[11px] text-zinc-500 dark:text-zinc-400';
const SURFACE_HEAD = 'border-zinc-200 bg-zinc-50 dark:border-white/[0.08] dark:bg-[#0c0d13]';

export const CourseAcademy = ({ lang, t, onOpenLightbox }) => {
  const [activeModule, setActiveModule] = useState(0);
  const [activeShot, setActiveShot] = useState(0);

  const courseScreenshots = [
    {
      url: "/screenshots/course_test.webp",
      title: t?.course?.shots?.test?.title || "Bilim darajasini tekshirish — 20 ta interaktiv test savollari va sertifikatlash (/test)",
      badge: t?.course?.shots?.test?.badge || "Test ishlash (/test)",
      desc: t?.course?.shots?.test?.desc || "Xodimlar va mijozlar uchun 20 ta amaliy test tizimi",
      path: "idokon-course.vercel.app/test"
    },
    {
      url: "/screenshots/course_admin_qabul.webp",
      title: t?.course?.shots?.admin?.title || "Admin Panel: Mahsulot qabul qilish, qayta narxlash va ombor nazorati",
      badge: t?.course?.shots?.admin?.badge || "Admin Panel",
      desc: t?.course?.shots?.admin?.desc || "Ta'minotchilardan qabul, narxlash va partiyalar hisobi",
      path: "idokon-course.vercel.app/admin/mahsulot-qabul"
    },
    {
      url: "/screenshots/course_kassa_sotish.webp",
      title: t?.course?.shots?.kassa?.title || "Kassa Panel: Kassada tezkor sotuv, fiskal cheklar va tovar qaytarish",
      badge: t?.course?.shots?.kassa?.badge || "Kassa Panel",
      desc: t?.course?.shots?.kassa?.desc || "Kassir ish o'rni: shtrix-kod, 0.8 sek sotuv va qaytarish",
      path: "idokon-course.vercel.app/kassa/sotish"
    },
    {
      url: "/screenshots/course_qurilmalar.webp",
      title: t?.course?.shots?.qurilmalar?.title || "Qurilmalar: Shtrix-kod skaneri, chek printeri va tarozi sozlamalari",
      badge: t?.course?.shots?.qurilmalar?.badge || "Qurilmalar",
      desc: t?.course?.shots?.qurilmalar?.desc || "Barcode printer, check printer va savdo tarozisi integratsiyasi",
      path: "idokon-course.vercel.app/qurilmalar/barcode"
    },
    {
      url: "/screenshots/course_kirish.webp",
      title: t?.course?.shots?.docs?.title || "IDOKON Docs: Interaktiv video darsliklar va bosh sahifa",
      badge: t?.course?.shots?.docs?.badge || "IDOKON Docs",
      desc: t?.course?.shots?.docs?.desc || "Dastur bilan tanishuv, imkoniyatlar va yangiliklar",
      path: "idokon-course.vercel.app/kirish"
    }
  ];

  const currentShot = courseScreenshots[activeShot] || courseScreenshots[0];

  return (
    <section id="course" className="section scroll-mt-20 border-b border-zinc-200/80 dark:border-white/[0.08]">
      <div className="container-page">

        {/* Section Header */}
        <div className="mb-12 max-w-3xl">
          <span className="eyebrow mb-4">
            <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t.course.eyebrow}</span>
          </span>
          <RevealWords as="h2" text={t.course.title} className="display-lg text-zinc-950 dark:text-zinc-50" />
          <Reveal as="p" delay={0.15} className={`lede mt-5 ${MUTED_TEXT}`}>
            {t.course.lead}
          </Reveal>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">

          {/* Left: screenshots */}
          <Reveal className="space-y-4 lg:col-span-7">

            {/* Main frame */}
            <div className="surface group overflow-hidden">
              <div className={`flex items-center justify-between gap-3 border-b px-4 py-2.5 ${SURFACE_HEAD}`}>
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  </div>
                  <span className={`truncate max-w-[200px] sm:max-w-xs ${MONO_LABEL}`}>
                    https://{currentShot.path}
                  </span>
                </div>

                <a
                  href={`https://${currentShot.path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 text-[11px] font-medium text-zinc-700 transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-zinc-200 dark:hover:bg-white/[0.08]"
                >
                  <span>{t.course.openLive || "Jonli ochish"}</span>
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </div>

              <div className="relative overflow-hidden bg-zinc-100 dark:bg-zinc-950">
                <img
                  src={currentShot.url}
                  alt={currentShot.title}
                  width={1400}
                  height={875}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full"
                />

                <button
                  type="button"
                  onClick={() => onOpenLightbox(currentShot.url, currentShot.title)}
                  aria-label={t.course.zoomView || "Kattalashtirib ko'rish"}
                  className="absolute inset-0 flex cursor-pointer items-center justify-center gap-2 bg-zinc-950/40 text-xs font-semibold text-white opacity-0 transition-opacity duration-300 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-400 group-hover:opacity-100"
                >
                  <Maximize2 className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                  <span>{t.course.zoomView || "Kattalashtirib ko'rish"}</span>
                </button>
              </div>

              <div className={`flex items-center justify-between gap-3 border-t p-3 text-xs ${SURFACE_HEAD}`}>
                <div className="min-w-0 truncate">
                  <span className="mr-2 font-semibold text-zinc-900 dark:text-zinc-100">
                    {currentShot.badge}:
                  </span>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    {currentShot.desc}
                  </span>
                </div>
                <span className="whitespace-nowrap rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-medium text-emerald-700 dark:text-emerald-300">
                  {t?.course?.realScreenshot || "Haqiqiy skrinshot"}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-5 gap-2">
              {courseScreenshots.map((shot, sIdx) => {
                const isSelected = activeShot === sIdx;
                return (
                  <button
                    key={sIdx}
                    type="button"
                    onClick={() => setActiveShot(sIdx)}
                    aria-pressed={isSelected}
                    className={`overflow-hidden rounded-xl border bg-white text-left transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:bg-zinc-900 ${
                      isSelected
                        ? 'border-emerald-500'
                        : 'border-zinc-200 opacity-70 hover:opacity-100 dark:border-white/[0.08]'
                    }`}
                  >
                    <img
                      src={shot.url}
                      alt={shot.title}
                      width={1400}
                      height={875}
                      loading="lazy"
                      decoding="async"
                      className="block h-14 w-full object-cover sm:h-18"
                    />
                    <div className="border-t border-zinc-200 bg-white p-1 sm:p-1.5 dark:border-white/[0.08] dark:bg-zinc-950">
                      <div className={`truncate text-[9px] font-bold leading-tight sm:text-[10px] ${
                        isSelected ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-700 dark:text-zinc-300'
                      }`}>
                        {shot.badge}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Guarantee */}
            <div className="surface flex items-center gap-3 border-emerald-500/30 p-4 text-sm font-medium leading-relaxed text-zinc-700 dark:text-zinc-300">
              <Award className="h-5 w-5 shrink-0 text-emerald-500" aria-hidden="true" />
              <span>{t.course.highlight}</span>
            </div>

          </Reveal>

          {/* Right: module accordion */}
          <Reveal delay={0.1} className="space-y-3 lg:col-span-5">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3 dark:border-white/[0.08]">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                {t.course.modulesTitle}
              </h3>
              <span className="font-mono text-xs tabular-nums text-zinc-400">{t.course.sixModules || "6 ta modul"}</span>
            </div>

            <div className="space-y-2.5">
              {courseModules.map((module, idx) => {
                const isOpen = activeModule === idx;
                const title = module.title?.[lang] || module.title?.uz || '';
                const desc = module.desc?.[lang] || module.desc?.uz || module.description?.[lang] || module.description?.uz || '';

                return (
                  <div
                    key={module.num || idx}
                    className={`surface overflow-hidden transition-colors duration-300 ${
                      isOpen
                        ? 'border-emerald-500/40 bg-zinc-50 dark:bg-white/[0.05]'
                        : 'hover:border-zinc-300 dark:hover:border-white/[0.15]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveModule(isOpen ? -1 : idx)}
                      aria-expanded={isOpen}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500"
                    >
                      <div className="flex items-center gap-3.5">
                        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-semibold tabular-nums transition-colors duration-300 ${
                          isOpen ? 'bg-emerald-600 text-white' : 'bg-zinc-100 text-zinc-600 dark:bg-white/[0.06] dark:text-zinc-400'
                        }`}>
                          {module.num || idx + 1}
                        </span>
                        <div>
                          <h4 className="font-sans text-sm font-semibold tracking-[-0.015em] text-zinc-950 dark:text-zinc-50 sm:text-base">
                            {title}
                          </h4>
                          <span className="font-mono text-[11px] tabular-nums text-zinc-500 dark:text-zinc-400">
                            {typeof module.duration === 'object' ? (module.duration[lang] || module.duration.uz) : module.duration}
                          </span>
                        </div>
                      </div>

                      <motion.span
                        className="flex shrink-0"
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.4, ease: EASE_OUT }}
                      >
                        <ChevronDown className="h-4 w-4 text-zinc-400" aria-hidden="true" />
                      </motion.span>
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
                          <div className={`mx-4 space-y-2 border-t border-zinc-200 py-4 text-sm leading-relaxed dark:border-white/[0.08] ${MUTED_TEXT}`}>
                            <p className="max-w-[65ch]">{desc}</p>
                            <div className="flex items-center gap-2 font-medium text-emerald-600 dark:text-emerald-400">
                              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>{t.course.hasPractical || "Amaliy topshiriq va test mavjud"}</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Live course links */}
            <div className="flex flex-col gap-2.5 pt-2 sm:flex-row">
              <a
                href="https://idokon-course.vercel.app/test"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1"
              >
                <span>{t.course.testKnowledge || "Bilimni sinash (/test)"}</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <a
                href="https://idokon-course.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex-1"
              >
                <span>{t.course.courseSyllabus || "Kurs darsliklari"}</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>

          </Reveal>

        </div>

      </div>
    </section>
  );
};
