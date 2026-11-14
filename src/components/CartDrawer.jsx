import React, { useState } from 'react';
import { Drawer } from 'vaul';
import {
  X, Trash2, Plus, Minus, ShoppingBag,
  ArrowRight, CheckCircle2
} from 'lucide-react';
import NumberFlow from '@number-flow/react';
import { toast } from 'sonner';

const FOCUS_RING = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500';
const FIELD = 'w-full rounded-lg border border-[color:var(--line)] bg-white px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors duration-200 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:bg-white/[0.04] dark:text-zinc-100';
const LABEL = 'mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300';
const QTY_BUTTON = `flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-[color:var(--line)] text-zinc-700 transition-colors duration-200 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/[0.08] ${FOCUS_RING}`;
const FOOTER_BUTTON = `flex cursor-pointer items-center justify-center gap-2 py-2.5 text-xs ${FOCUS_RING}`;

export const CartDrawer = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  lang,
  t
}) => {
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' | 'checkout' | 'success'
  const [buyerInfo, setBuyerInfo] = useState({ name: '', phone: '+998 ', address: '' });
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (!buyerInfo.name.trim() || buyerInfo.phone.length < 9) {
      toast.error(t.cartDrawer?.fillRequired || t.contact?.fillRequired || "Iltimos, ismingiz va telefon raqamingizni to'ldiring!");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCheckoutStep('success');
      onClearCart();
      toast.success(t.cartDrawer.orderSuccess, {
        description: t.cartDrawer?.operatorContactDesc || t.demoModal?.operatorContactDesc || "Operatorimiz buyurtmani tasdiqlash uchun 15 daqiqada bog'lanadi."
      });
    }, 700);
  };

  return (
    <Drawer.Root
      direction="right"
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setCheckoutStep('cart');
          onClose();
        }
      }}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
        <Drawer.Content className="fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-md flex-col border-l border-[color:var(--line)] bg-white text-zinc-900 shadow-2xl focus:outline-none dark:bg-zinc-950 dark:text-zinc-100">

          <Drawer.Title className="sr-only">{t.cartDrawer?.cartTitle || "Savatcha"}</Drawer.Title>
          <Drawer.Description className="sr-only">{t.cartDrawer?.cartSubtitle || "Tanlangan savdo uskunalari"}</Drawer.Description>

          {/* Header */}
          <div className="flex items-center justify-between gap-3 border-b border-[color:var(--line)] p-5">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <ShoppingBag className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {t.cartDrawer.title}
                </h3>
                <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                  {cart.length} {t.cartDrawer?.itemsSelected || "xil qurilma tanlandi"}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className={`flex-shrink-0 cursor-pointer rounded-full p-2 text-zinc-500 transition-colors duration-200 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/[0.08] dark:hover:text-white ${FOCUS_RING}`}
              aria-label={t.menu?.close || "Yopish"}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {checkoutStep === 'cart' && (
              <>
                {cart.length === 0 ? (
                  <div className="space-y-3 py-20 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[color:var(--line)] bg-zinc-100 text-zinc-400 dark:bg-white/[0.04]">
                      <ShoppingBag className="h-6 w-6" />
                    </div>
                    <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">{t.cartDrawer.empty}</h4>
                    <p className="mx-auto max-w-xs text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                      {t.cartDrawer.emptyDesc}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-3 rounded-2xl border border-[color:var(--line)] bg-zinc-50 p-3 dark:bg-white/[0.03]"
                      >
                        <img
                          src={item.image}
                          alt={item.title[lang] || item.title.uz}
                          width="48"
                          height="48"
                          decoding="async"
                          className="h-12 w-12 flex-shrink-0 rounded-lg border border-[color:var(--line)] bg-white object-contain p-1 dark:bg-zinc-900"
                        />

                        <div className="min-w-0 flex-1">
                          <h4 className="truncate text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                            {item.title[lang] || item.title.uz}
                          </h4>
                          <div className="mt-0.5 font-mono text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                            {item.price.toLocaleString()} {t.equipment?.currency || "so'm"}
                          </div>

                          <div className="mt-2 flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => onUpdateQty(item.id, -1)}
                              aria-label={t.cartDrawer?.decrease || "Kamaytirish"}
                              className={QTY_BUTTON}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="min-w-[1.5rem] text-center font-mono text-xs font-semibold tabular-nums">
                              <NumberFlow value={item.qty} />
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQty(item.id, 1)}
                              aria-label={t.cartDrawer?.increase || "Ko'paytirish"}
                              className={QTY_BUTTON}
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>

                        <div className="flex h-full flex-col items-end justify-between text-right">
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.id)}
                            className={`cursor-pointer rounded-full p-1 text-zinc-400 transition-colors duration-200 hover:text-rose-500 ${FOCUS_RING}`}
                            title={t.cartDrawer?.deleteTooltip || "O'chirish"}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                          <div className="mt-2 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                            <NumberFlow value={item.price * item.qty} format={{ useGrouping: true }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {checkoutStep === 'checkout' && (
              <form onSubmit={handleOrderSubmit} id="cartOrderForm" className="space-y-4">
                <div className="border-b border-[color:var(--line)] pb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                  {t.cartDrawer?.shippingAndContact || "Yetkazib berish va Aloqa"}
                </div>

                <div>
                  <label htmlFor="cart-buyer-name" className={LABEL}>
                    {t.cartDrawer?.yourName || "Ismingiz *"}
                  </label>
                  <input
                    id="cart-buyer-name"
                    type="text"
                    required
                    value={buyerInfo.name}
                    onChange={(e) => setBuyerInfo(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Jasur Alimov"
                    className={FIELD}
                  />
                </div>

                <div>
                  <label htmlFor="cart-buyer-phone" className={LABEL}>
                    {t.cartDrawer?.yourPhone || "Telefon Raqamingiz *"}
                  </label>
                  <input
                    id="cart-buyer-phone"
                    type="tel"
                    required
                    value={buyerInfo.phone}
                    onChange={(e) => setBuyerInfo(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+998 90 123 45 67"
                    className={`${FIELD} font-mono`}
                  />
                </div>

                <div>
                  <label htmlFor="cart-buyer-address" className={LABEL}>
                    {t.cartDrawer?.shippingAddress || "Yetkazish Manzili"}
                  </label>
                  <input
                    id="cart-buyer-address"
                    type="text"
                    value={buyerInfo.address}
                    onChange={(e) => setBuyerInfo(prev => ({ ...prev, address: e.target.value }))}
                    placeholder={t.cartDrawer?.addressPlaceholder || "Toshkent sh., Chilonzor tumani..."}
                    className={FIELD}
                  />
                </div>

                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-[11px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {t.cartDrawer?.freeDeliveryNote || "✓ Toshkent bo'ylab bepul yetkazib beriladi va mutaxassisimiz kassa apparatini I-Do'kon tizimiga ulab beradi."}
                </div>
              </form>
            )}

            {checkoutStep === 'success' && (
              <div className="space-y-3 py-14 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h4 className="text-lg font-semibold text-zinc-900 [text-wrap:balance] dark:text-zinc-50">{t.cartDrawer?.successTitle || "Buyurtma Qabul Qilindi!"}</h4>
                <p className="mx-auto max-w-xs text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {t.cartDrawer?.orderSuccess || "Savdo operatorimiz tez orada siz bilan bog'lanib, buyurtmani tasdiqlaydi."}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setCheckoutStep('cart');
                    onClose();
                  }}
                  className={`btn-secondary mt-3 px-5 py-2 text-xs ${FOCUS_RING}`}
                >
                  {t.menu?.close || "Yopish"}
                </button>
              </div>
            )}
          </div>

          {/* Footer totals & actions */}
          {cart.length > 0 && checkoutStep !== 'success' && (
            <div className="space-y-3 border-t border-[color:var(--line)] bg-zinc-50 p-5 dark:bg-zinc-950/80">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-zinc-500 dark:text-zinc-400">{t.cartDrawer.total}</span>
                <span className="font-mono text-lg font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">
                  <NumberFlow value={total} format={{ useGrouping: true }} />{' '}
                  <span className="font-sans text-xs font-normal text-zinc-500">{t.equipment?.currency || "so'm"}</span>
                </span>
              </div>

              {checkoutStep === 'cart' ? (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={onClearCart}
                    className={`btn-secondary ${FOOTER_BUTTON}`}
                  >
                    {t.cartDrawer.clearBtn}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('checkout')}
                    className={`btn-primary ${FOOTER_BUTTON}`}
                  >
                    <span>{t.cartDrawer?.continueShopping || "Davom etish"}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className={`btn-secondary ${FOOTER_BUTTON}`}
                  >
                    {t.cartDrawer?.back || "Orqaga"}
                  </button>
                  <button
                    type="submit"
                    form="cartOrderForm"
                    disabled={loading}
                    className={`btn-primary ${FOOTER_BUTTON}`}
                  >
                    <span>{loading ? (t.cartDrawer?.submitting || 'Yuborilmoqda...') : t.cartDrawer.checkoutBtn}</span>
                  </button>
                </div>
              )}
            </div>
          )}

        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
