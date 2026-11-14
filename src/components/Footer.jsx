import React from 'react';
import { ArrowUp, Phone } from 'lucide-react';

const SOCIAL_BTN =
  'flex h-8 w-8 items-center justify-center rounded-lg border border-[color:var(--line)] bg-white text-zinc-700 transition-colors duration-300 dark:bg-white/[0.03] dark:text-zinc-300';
const FOOTER_LINK = 'text-zinc-600 transition-colors duration-300 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400';
const COLUMN_HEADING = 'font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-900 dark:text-zinc-100';

export const Footer = ({ t }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[color:var(--line)] bg-zinc-50 pb-28 pt-16 text-zinc-600 transition-colors sm:pb-36 dark:bg-zinc-950 dark:text-zinc-400">
      <div className="container-page">

        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 gap-10 border-b border-[color:var(--line)] pb-12 md:grid-cols-2 lg:grid-cols-12">

          {/* Col 1: Brand Info (6 cols) */}
          <div className="space-y-4 md:col-span-2 lg:col-span-6">
            <a href="#home" className="group inline-flex items-center gap-2" aria-label="IDO'KON Bosh sahifa">
              <img
                src="/idokon_logo.webp"
                alt="IDO'KON"
                width={480}
                height={147}
                loading="lazy"
                decoding="async"
                className="h-8 w-auto transition-transform duration-500 ease-out group-hover:scale-[1.02] sm:h-9"
              />
            </a>

            <p className="max-w-sm text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-400">
              {t.footer.about}
            </p>

            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://t.me/idokonuz"
                target="_blank"
                rel="noopener noreferrer"
                className={`${SOCIAL_BTN} hover:bg-[#229ED9] hover:text-white`}
                title="Telegram: @idokonuz"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l-.313 4.693c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/idokon_uz/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${SOCIAL_BTN} hover:bg-pink-600 hover:text-white`}
                title="Instagram"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="tel:+998991130999"
                className={`${SOCIAL_BTN} hover:bg-emerald-600 hover:text-white`}
                title="Qo'ng'iroq qilish: +998 99 113 09 99"
              >
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Mahsulot (3 cols) */}
          <div className="space-y-4 md:col-span-1 lg:col-span-3">
            <h4 className={COLUMN_HEADING}>
              {t.footer.productCol}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#features" className={FOOTER_LINK}>{t.nav.features}</a></li>
              <li><a href="#terminal" className={FOOTER_LINK}>{t.nav.terminal}</a></li>
              <li><a href="#equipment" className={FOOTER_LINK}>{t.nav.equipment}</a></li>
              <li><a href="#integrations" className={FOOTER_LINK}>{t.nav.integrations}</a></li>
            </ul>
          </div>

          {/* Col 3: Resurslar (3 cols) */}
          <div className="space-y-4 md:col-span-1 lg:col-span-3">
            <h4 className={COLUMN_HEADING}>
              {t.footer.resourceCol}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#pricing" className={FOOTER_LINK}>{t.nav.pricing}</a></li>
              <li><a href="#course" className={FOOTER_LINK}>{t.nav.course}</a></li>
              <li><a href="#faq" className={FOOTER_LINK}>{t.nav.faq}</a></li>
              <li><a href="#contact" className={FOOTER_LINK}>{t.nav.contact}</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-zinc-500 sm:flex-row dark:text-zinc-400">
          <div>
            {t.footer.allRights || `© ${new Date().getFullYear()} IDO'KON. Barcha huquqlar himoyalangan.`}
          </div>

          <div className="flex items-center gap-6">
            <span className="font-mono text-[11px]">{t.footer.location || "Toshkent, O'zbekiston"}</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="btn-secondary px-3.5 py-2 font-mono text-[11px] font-normal"
              title="Yuqoriga qaytish"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              <span>{t.footer.backToTop || "Yuqoriga"}</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
