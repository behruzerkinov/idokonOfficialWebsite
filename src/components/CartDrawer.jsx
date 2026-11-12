import React, { useState } from 'react';
import { Drawer } from 'vaul';
import { 
  X, Trash2, Plus, Minus, ShoppingBag, 
  ArrowRight, CheckCircle2, ShieldCheck, Phone, User 
} from 'lucide-react';
import NumberFlow from '@number-flow/react';
import { toast } from 'sonner';

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
        <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 animate-in fade-in" />
        <Drawer.Content className="bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 flex flex-col h-full w-full max-w-md fixed top-0 bottom-0 right-0 z-50 shadow-2xl focus:outline-none">
          
          <Drawer.Title className="sr-only">{t.cartDrawer?.cartTitle || "Savatcha"}</Drawer.Title>
          <Drawer.Description className="sr-only">{t.cartDrawer?.cartSubtitle || "Tanlangan savdo uskunalari"}</Drawer.Description>

          {/* Drawer Header */}
          <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-50">
                  {t.cartDrawer.title}
                </h3>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
                  {cart.length} {t.cartDrawer?.itemsSelected || "xil qurilma tanlandi"}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800 transition-colors cursor-pointer"
              aria-label={t.menu?.close || "Yopish"}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {checkoutStep === 'cart' && (
              <>
                {cart.length === 0 ? (
                  <div className="py-20 text-center space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 mx-auto flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
                      <ShoppingBag className="w-7 h-7" />
                    </div>
                    <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-base">{t.cartDrawer.empty}</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto leading-relaxed">
                      {t.cartDrawer.emptyDesc}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 flex items-center justify-between gap-3"
                      >
                        <img
                          src={item.image}
                          alt={item.title[lang] || item.title.uz}
                          className="w-12 h-12 object-contain bg-white dark:bg-zinc-900 rounded-lg p-1 border border-zinc-200 dark:border-zinc-700"
                        />
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs text-zinc-900 dark:text-zinc-100 truncate">
                            {item.title[lang] || item.title.uz}
                          </h4>
                          <div className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                            {item.price.toLocaleString()} {t.equipment?.currency || "so'm"}
                          </div>

                          {/* Quantity Buttons with NumberFlow */}
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              type="button"
                              onClick={() => onUpdateQty(item.id, -1)}
                              className="w-5 h-5 rounded bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-zinc-800 dark:text-zinc-200 flex items-center justify-center cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold font-mono px-1">
                              <NumberFlow value={item.qty} />
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQty(item.id, 1)}
                              className="w-5 h-5 rounded bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-zinc-800 dark:text-zinc-200 flex items-center justify-center cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        <div className="text-right flex flex-col justify-between items-end h-full">
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.id)}
                            className="text-zinc-400 hover:text-rose-500 p-1 cursor-pointer transition-colors"
                            title={t.cartDrawer?.deleteTooltip || "O'chirish"}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <div className="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100 mt-2">
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
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 pb-2 border-b border-zinc-200 dark:border-zinc-800">
                  {t.cartDrawer?.shippingAndContact || "Yetkazib berish va Aloqa"}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    {t.cartDrawer?.yourName || "Ismingiz *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={buyerInfo.name}
                    onChange={(e) => setBuyerInfo(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Jasur Alimov"
                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    {t.cartDrawer?.yourPhone || "Telefon Raqamingiz *"}
                  </label>
                  <input
                    type="tel"
                    required
                    value={buyerInfo.phone}
                    onChange={(e) => setBuyerInfo(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+998 90 123 45 67"
                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs font-mono text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    {t.cartDrawer?.shippingAddress || "Yetkazish Manzili"}
                  </label>
                  <input
                    type="text"
                    value={buyerInfo.address}
                    onChange={(e) => setBuyerInfo(prev => ({ ...prev, address: e.target.value }))}
                    placeholder={t.cartDrawer?.addressPlaceholder || "Toshkent sh., Chilonzor tumani..."}
                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {t.cartDrawer?.freeDeliveryNote || "✓ Toshkent bo'ylab bepul yetkazib beriladi va mutaxassisimiz kassa apparatini I-Do'kon tizimiga ulab beradi."}
                </div>
              </form>
            )}

            {checkoutStep === 'success' && (
              <div className="py-14 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-500 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-lg text-zinc-900 dark:text-zinc-50 [text-wrap:balance]">{t.cartDrawer?.successTitle || "Buyurtma Qabul Qilindi!"}</h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xs mx-auto">
                  {t.cartDrawer?.orderSuccess || "Savdo operatorimiz tez orada siz bilan bog'lanib, buyurtmani tasdiqlaydi."}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setCheckoutStep('cart');
                    onClose();
                  }}
                  className="mt-3 px-5 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-xs uppercase cursor-pointer"
                >
                  {t.menu?.close || "Yopish"}
                </button>
              </div>
            )}
          </div>

          {/* Drawer Footer with Emil Kowalski NumberFlow Totals */}
          {cart.length > 0 && checkoutStep !== 'success' && (
            <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-zinc-500 dark:text-zinc-400">{t.cartDrawer.total}</span>
                <span className="text-lg font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
                  <NumberFlow value={total} format={{ useGrouping: true }} /> <span className="text-xs font-normal text-zinc-500 font-sans">{t.equipment?.currency || "so'm"}</span>
                </span>
              </div>

              {checkoutStep === 'cart' ? (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={onClearCart}
                    className="py-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    {t.cartDrawer.clearBtn}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('checkout')}
                    className="py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  >
                    <span>{t.cartDrawer?.continueShopping || "Davom etish"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="py-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    {t.cartDrawer?.back || "Orqaga"}
                  </button>
                  <button
                    type="submit"
                    form="cartOrderForm"
                    disabled={loading}
                    className="py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  >
                    {loading ? (t.cartDrawer?.submitting || 'Yuborilmoqda...') : t.cartDrawer.checkoutBtn}
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
