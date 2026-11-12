import React, { useState } from 'react';
import { courseModules } from '../data/mockData';
import { 
  GraduationCap, PlayCircle, Award, BookOpen, Clock, 
  ExternalLink, ChevronDown, CheckCircle2, Maximize2 
} from 'lucide-react';

export const CourseAcademy = ({ lang, t, onOpenLightbox }) => {
  const [activeModule, setActiveModule] = useState(0);
  const [activeShot, setActiveShot] = useState(0);

  const courseScreenshots = [
    { 
      url: "/screenshots/course_test.png", 
      title: "Bilim darajasini tekshirish — 20 ta interaktiv test savollari va sertifikatlash (/test)",
      badge: "Test ishlash (/test)",
      desc: "Xodimlar va mijozlar uchun 20 ta amaliy test tizimi",
      path: "idokon-course.vercel.app/test"
    },
    { 
      url: "/screenshots/course_admin_qabul.png", 
      title: "Admin Panel: Mahsulot qabul qilish, qayta narxlash va ombor nazorati",
      badge: "Admin Panel",
      desc: "Ta'minotchilardan qabul, narxlash va partiyalar hisobi",
      path: "idokon-course.vercel.app/admin/mahsulot-qabul"
    },
    { 
      url: "/screenshots/course_kassa_sotish.png", 
      title: "Kassa Panel: Kassada tezkor sotuv, fiskal cheklar va tovar qaytarish",
      badge: "Kassa Panel",
      desc: "Kassir ish o'rni: shtrix-kod, 0.8 sek sotuv va qaytarish",
      path: "idokon-course.vercel.app/kassa/sotish"
    },
    { 
      url: "/screenshots/course_qurilmalar.png", 
      title: "Qurilmalar: Shtrix-kod skaneri, chek printeri va tarozi sozlamalari",
      badge: "Qurilmalar",
      desc: "Barcode printer, check printer va savdo tarozisi integratsiyasi",
      path: "idokon-course.vercel.app/qurilmalar/barcode"
    },
    { 
      url: "/screenshots/course_kirish.png", 
      title: "IDOKON Docs: Interaktiv video darsliklar va bosh sahifa",
      badge: "IDOKON Docs",
      desc: "Dastur bilan tanishuv, imkoniyatlar va yangiliklar",
      path: "idokon-course.vercel.app/kirish"
    }
  ];

  const currentShot = courseScreenshots[activeShot] || courseScreenshots[0];

  return (
    <section id="course" className="py-20 lg:py-24 bg-white dark:bg-[#090a0f] text-zinc-900 dark:text-zinc-100 transition-colors border-b border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <GraduationCap className="w-4 h-4 text-emerald-500" />
            <span>{t.course.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight">
            {t.course.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {t.course.lead}
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Real Course Screenshots & Platform Preview */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Main Interactive Screen with Foundation Frame */}
            <div className="relative rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl group">
              
              {/* Browser chrome header */}
              <div className="px-4 py-2.5 bg-zinc-100 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80"></span>
                  </div>
                  <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400 pl-2 truncate max-w-[200px] sm:max-w-xs">
                    https://{currentShot.path}
                  </span>
                </div>

                <a
                  href={`https://${currentShot.path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  <span>Jonli ochish</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Screenshot image */}
              <div className="relative overflow-hidden bg-zinc-950">
                <img
                  src={currentShot.url}
                  alt={currentShot.title}
                  className="w-full h-auto object-cover transition-transform duration-200"
                  loading="lazy"
                />
                
                <button
                  type="button"
                  onClick={() => onOpenLightbox(currentShot.url, currentShot.title)}
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-xs cursor-pointer backdrop-blur-xs"
                  aria-label="Kattalashtirib ko'rish"
                >
                  <Maximize2 className="w-4 h-4 text-emerald-400" />
                  <span>Kattalashtirib ko'rish</span>
                </button>
              </div>

              {/* Caption Bar */}
              <div className="p-3 bg-zinc-50 dark:bg-zinc-900/90 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-3 text-xs">
                <div className="truncate">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 mr-2">
                    {currentShot.badge}:
                  </span>
                  <span className="text-zinc-500 dark:text-zinc-400 text-[11px]">
                    {currentShot.desc}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20 whitespace-nowrap">
                  Haqiqiy skrinshot
                </span>
              </div>
            </div>

            {/* Thumbnail Gallery of all 5 real course pages */}
            <div className="grid grid-cols-5 gap-2">
              {courseScreenshots.map((shot, sIdx) => {
                const isSelected = activeShot === sIdx;
                return (
                  <button
                    key={sIdx}
                    type="button"
                    onClick={() => setActiveShot(sIdx)}
                    className={`relative rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'border-emerald-500 ring-2 ring-emerald-500/30 shadow-sm'
                        : 'border-zinc-200 dark:border-zinc-800 opacity-75 hover:opacity-100 hover:border-zinc-300 dark:hover:border-zinc-700'
                    }`}
                  >
                    <img
                      src={shot.url}
                      alt={shot.title}
                      className="w-full h-14 sm:h-18 object-cover"
                      loading="lazy"
                    />
                    <div className="p-1 sm:p-1.5 bg-white dark:bg-zinc-950/90 border-t border-zinc-200 dark:border-zinc-800">
                      <div className={`text-[9px] sm:text-[10px] font-bold truncate leading-tight ${
                        isSelected ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-700 dark:text-zinc-300'
                      }`}>
                        {shot.badge}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Guarantee Highlight Banner */}
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-emerald-500/30 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium flex items-center gap-3">
              <Award className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <span>{t.course.highlight}</span>
            </div>

          </div>

          {/* Right Column: Module Syllabus Accordion & Direct Course CTA */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                {t.course.modulesTitle}
              </h3>
              <span className="text-xs text-zinc-400 font-mono">6 ta modul</span>
            </div>

            <div className="space-y-2">
              {courseModules.map((module, idx) => {
                const isOpen = activeModule === idx;
                const title = module.title?.[lang] || module.title?.uz || '';
                const desc = module.desc?.[lang] || module.desc?.uz || module.description?.[lang] || module.description?.uz || '';

                return (
                  <div
                    key={module.num || idx}
                    className={`rounded-xl border transition-all duration-150 overflow-hidden ${
                      isOpen
                        ? 'bg-zinc-50 dark:bg-zinc-900/90 border-emerald-500/40 shadow-sm'
                        : 'bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveModule(isOpen ? -1 : idx)}
                      className="w-full p-3.5 flex items-center justify-between text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-xs font-bold ${
                          isOpen ? 'bg-emerald-500 text-slate-950' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                        }`}>
                          {module.num || idx + 1}
                        </span>
                        <div>
                          <h4 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100">
                            {title}
                          </h4>
                          <span className="text-[11px] text-zinc-400 font-mono">
                            {module.duration} dars davomiyligi
                          </span>
                        </div>
                      </div>

                      <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isOpen && (
                      <div className="px-3.5 pb-3.5 pt-1 text-xs text-zinc-600 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800/80 mt-1 animate-in fade-in duration-150">
                        <p className="mb-2 leading-relaxed">{desc}</p>
                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Amaliy topshiriq va test mavjud</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Direct Link to live course & test web app */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <a
                href="https://idokon-course.vercel.app/test"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 shadow-sm transition-all duration-150 cursor-pointer active:scale-98"
              >
                <span>Bilimni sinash (/test)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://idokon-course.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-750 border border-zinc-200 dark:border-zinc-700 transition-all duration-150 cursor-pointer"
              >
                <span>Kurs darsliklari</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
