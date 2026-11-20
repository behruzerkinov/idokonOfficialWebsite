import { Phone, Send } from './icons';
import { SITE } from '../data/site';

/** Mobile-only call bar: the call centre one tap away. Appears after the hero; hidden while a dialog is open. */
export const StickyBar = ({ t }) => (
  <div className="sticky-bar fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 px-4 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] md:hidden">
    <a href={`tel:${SITE.phones[0]}`} className="btn-primary"><Phone size={17} strokeWidth={2} aria-hidden="true" />{t.sticky.call}</a>
    <a href={SITE.telegram} target="_blank" rel="noopener noreferrer" className="btn-secondary"><Send size={17} strokeWidth={2} aria-hidden="true" />{t.sticky.telegram}</a>
  </div>
);
