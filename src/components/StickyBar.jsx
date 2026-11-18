import { Phone, Send } from 'lucide-react';
import { SITE } from '../data/site';

/** Mobile-only bottom action bar. Slides in after the hero (scroll-driven CSS); hidden while a dialog is open. */
export const StickyBar = ({ t }) => (
  <div className="sticky-bar fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:hidden">
    <a href={`tel:${SITE.phones[0]}`} className="btn-primary"><Phone size={18} strokeWidth={1.9} aria-hidden="true" />{t.sticky.call}</a>
    <a href={SITE.telegram} target="_blank" rel="noopener noreferrer" className="btn-outline"><Send size={18} strokeWidth={1.9} aria-hidden="true" />{t.sticky.telegram}</a>
  </div>
);
