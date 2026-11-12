import React from 'react';
import { ArrowUp, Phone, MessageSquare, ExternalLink } from 'lucide-react';

export const Footer = ({ t, onOpenDemo }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-100/80 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 pt-16 pb-12 border-t border-zinc-200 dark:border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-zinc-200 dark:border-zinc-800">
          
          {/* Col 1: Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <a href="#home" className="inline-flex items-center gap-2 group" aria-label="IDO'KON Bosh sahifa">
              <img
                src="/idokon_logo.png"
                alt="IDO'KON"
                className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              />
            </a>

            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-sm">
              {t.footer.about}
            </p>

            <div className="pt-2 flex items-center gap-2.5">
              <a
                href="https://t.me/idokonuz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white dark:bg-zinc-900 hover:bg-emerald-500 hover:text-slate-950 text-zinc-700 dark:text-zinc-300 flex items-center justify-center transition-colors border border-zinc-200 dark:border-zinc-800 shadow-xs"
                title="Telegram"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/idokon_uz/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white dark:bg-zinc-900 hover:bg-pink-600 hover:text-white text-zinc-700 dark:text-zinc-300 flex items-center justify-center transition-colors border border-zinc-200 dark:border-zinc-800 shadow-xs"
                title="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="tel:+998991180999"
                className="w-8 h-8 rounded-lg bg-white dark:bg-zinc-900 hover:bg-emerald-500 hover:text-slate-950 text-zinc-700 dark:text-zinc-300 flex items-center justify-center transition-colors border border-zinc-200 dark:border-zinc-800 shadow-xs"
                title="Qo'ng'iroq qilish"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Mahsulot (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-200">
              {t.footer.productCol}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-emerald-500 transition-colors">Xususiyatlar</a></li>
              <li><a href="#terminal" className="hover:text-emerald-500 transition-colors">POS Terminal</a></li>
              <li><a href="#equipment" className="hover:text-emerald-500 transition-colors">Qurilmalar</a></li>
              <li><a href="#integrations" className="hover:text-emerald-500 transition-colors">Integratsiyalar</a></li>
            </ul>
          </div>

          {/* Col 3: Resurslar (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-200">
              {t.footer.resourceCol}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#pricing" className="hover:text-emerald-500 transition-colors">Tariflar</a></li>
              <li><a href="#course" className="hover:text-emerald-500 transition-colors">I-Do‘kon Kursi</a></li>
              <li><a href="#faq" className="hover:text-emerald-500 transition-colors">FAQ</a></li>
              <li><a href="#contact" className="hover:text-emerald-500 transition-colors">Aloqa</a></li>
            </ul>
          </div>

          {/* Col 4: Quick Portals & Direct Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-200">
              {t.footer.contactCol}
            </h4>
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={onOpenDemo}
                className="w-full py-2 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center justify-between transition-colors shadow-sm cursor-pointer"
              >
                <span>Bepul Demo Olish</span>
                <span className="text-base leading-none">→</span>
              </button>

              <a
                href="https://idokon-course.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-lg bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-semibold flex items-center justify-between transition-colors border border-zinc-200 dark:border-zinc-800 shadow-xs cursor-pointer"
              >
                <span>I-Do'kon Video Kursi</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              </a>

              <div className="pt-1 text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
                Operator: +998 99 118 09 99
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <div>
            © {new Date().getFullYear()} IDO'KON. Barcha huquqlar himoyalangan.
          </div>

          <div className="flex items-center gap-6">
            <span className="font-mono text-[11px]">Toshkent, O'zbekiston</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 p-1.5 rounded-lg bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 transition-colors shadow-xs cursor-pointer"
              title="Yuqoriga qaytish"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="text-[11px] font-mono">Yuqoriga</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
