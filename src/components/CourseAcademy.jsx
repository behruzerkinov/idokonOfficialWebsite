import React, { useState } from 'react';
import { courseModules } from '../data/mockData';
import { 
  GraduationCap, PlayCircle, Award, BookOpen, Clock, 
  ExternalLink, ChevronDown, CheckCircle2, Maximize2 
} from 'lucide-react';

export const CourseAcademy = ({ lang, t, onOpenLightbox }) => {
  const [activeModule, setActiveModule] = useState(0);

  const courseScreenshots = [
    { url: "/screenshots/course_ekran.png", title: "I-Do'kon Kursi Asosiy Ekrani" },
    { url: "/screenshots/course_bildirish.png", title: "Bildirishnoma va Ogohlantirishlar darsi" },
    { url: "/screenshots/course_qoshish.png", title: "Tovarlarni bazaga qo'shish moduli" },
    { url: "/screenshots/course_qoldiq.png", title: "Qoldiq va partiyalar boshqaruvi" }
  ];

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
            
            {/* Main Interactive Screen */}
            <div className="relative rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl group">
              <img
                src={courseScreenshots[0].url}
                alt="I-Do'kon Kursi Dasturi"
                className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-200"
                loading="lazy"
              />
              
              <button
                type="button"
                onClick={() => onOpenLightbox(courseScreenshots[0].url, courseScreenshots[0].title)}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-xs cursor-pointer backdrop-blur-xs"
                aria-label="Kattalashtirib ko'rish"
              >
                <Maximize2 className="w-4 h-4 text-emerald-400" />
                <span>Kattalashtirib ko'rish</span>
              </button>

              <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs shadow-sm">
                <PlayCircle className="w-3.5 h-3.5" />
                <span>Real platforma: idokon-course.vercel.app</span>
              </div>
            </div>

            {/* Thumbnail Gallery of real lessons */}
            <div className="grid grid-cols-3 gap-3">
              {courseScreenshots.slice(1).map((shot, sIdx) => (
                <div
                  key={sIdx}
                  onClick={() => onOpenLightbox(shot.url, shot.title)}
                  className="relative rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs cursor-pointer group hover:border-emerald-500 transition-colors"
                >
                  <img
                    src={shot.url}
                    alt={shot.title}
                    className="w-full h-24 sm:h-28 object-cover group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>
              ))}
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
              <span className="text-xs text-zinc-400 font-mono">10 ta darslik</span>
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

            {/* Direct Link to live course web app */}
            <div className="pt-2">
              <a
                href="https://idokon-course.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-xs font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 shadow-sm transition-all duration-150 cursor-pointer"
              >
                <span>Kurs platformasiga o'tish</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
