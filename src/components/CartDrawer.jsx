import React, { useEffect } from 'react';
import { Drawer } from 'vaul';
import { Minus, Plus, Trash2, X } from 'lucide-react';
import { formatPrice } from '../data/site';
import { LeadForm } from './LeadForm';

export const CartDrawer = ({ isOpen, onClose, cart, onUpdateQty, onRemoveItem, onClearCart, lang, t }) => {
  const [checkout, setCheckout] = React.useState(false);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const c = t.cartDrawer;

  useEffect(() => {
    if (isOpen) document.body.dataset.drawerOpen = '1';
    else { delete document.body.dataset.drawerOpen; setCheckout(false); }
    return () => { delete document.body.dataset.drawerOpen; };
  }, [isOpen]);

  return (
    <Drawer.Root open={isOpen} onOpenChange={(o) => !o && onClose()} direction="right">
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[90] bg-black/50" />
        <Drawer.Content className="fixed bottom-0 right-0 top-0 z-[95] flex w-full max-w-md flex-col bg-[var(--bg)] text-[var(--fg)] shadow-lg outline-none">
          <div className="flex items-center justify-between border-b p-4" style={{ borderColor: 'var(--line)' }}>
            <div>
              <Drawer.Title className="text-lg font-semibold">{c.title}</Drawer.Title>
              <Drawer.Description className="text-sm" style={{ color: 'var(--muted)' }}>{cart.length} {c.items}</Drawer.Description>
            </div>
            <button type="button" onClick={onClose} className="icon-btn" aria-label={t.menu.close}><X size={20} strokeWidth={1.75} /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {checkout ? (
              <LeadForm
                t={t} lang={lang} type="hardware" items={cart} message
                doneLabel={t.menu.close} onDone={onClose} onSuccess={onClearCart}
              />
            ) : cart.length === 0 ? (
              <div className="py-16 text-center">
                <p className="font-semibold">{c.empty}</p>
                <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>{c.emptyDesc}</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {cart.map((item) => {
                  const name = item.title?.[lang] || item.title?.uz;
                  return (
                    <li key={item.id} className="card flex gap-3 p-3">
                      <img src={item.image} alt={name} width="64" height="64" loading="lazy" className="h-16 w-16 shrink-0 rounded-lg bg-white object-contain" />
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm font-medium">{name}</p>
                        <p className="text-sm" style={{ color: 'var(--muted)' }}>{formatPrice(item.price, lang)}</p>
                        <div className="mt-1 flex items-center gap-1">
                          <button type="button" className="icon-btn" aria-label={c.decrease} onClick={() => onUpdateQty(item.id, -1)}><Minus size={20} strokeWidth={1.75} /></button>
                          <span className="w-6 text-center tabular-nums" aria-live="polite">{item.qty}</span>
                          <button type="button" className="icon-btn" aria-label={c.increase} onClick={() => onUpdateQty(item.id, 1)}><Plus size={20} strokeWidth={1.75} /></button>
                          <button type="button" className="icon-btn ml-auto" aria-label={c.remove} onClick={() => onRemoveItem(item.id)}><Trash2 size={20} strokeWidth={1.75} /></button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {cart.length > 0 && (
            <div className="space-y-3 border-t p-4" style={{ borderColor: 'var(--line)' }}>
              <p className="flex justify-between font-semibold"><span>{c.total}</span><span className="tabular-nums">{formatPrice(total, lang)}</span></p>
              {checkout ? (
                <button type="button" className="btn-secondary w-full" onClick={() => setCheckout(false)}>{c.back}</button>
              ) : (
                <>
                  <button type="button" className="btn-primary w-full" onClick={() => setCheckout(true)}>{c.checkout}</button>
                  <button type="button" className="btn-ghost w-full" onClick={onClearCart}>{c.clear}</button>
                </>
              )}
            </div>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
