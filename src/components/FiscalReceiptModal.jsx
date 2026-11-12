import React from 'react';
import { X, Printer, CheckCircle2, QrCode, Download, ArrowRight } from 'lucide-react';

export const FiscalReceiptModal = ({ isOpen, onClose, receipt }) => {
  if (!isOpen || !receipt) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-sm rounded-3xl bg-white shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="p-4 bg-emerald-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-200" />
            <span className="font-black text-xs uppercase tracking-wider">
              Tranzaksiya Muvaffaqiyatli!
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Realistic Thermal Receipt Paper */}
        <div className="p-6 bg-[#FCFDFD] text-slate-900 font-mono text-xs space-y-3">
          
          {/* Header Receipt Center */}
          <div className="text-center space-y-1 pb-3 border-b-2 border-dashed border-slate-300">
            <div className="font-extrabold text-sm tracking-widest uppercase">
              "IDO'KON RETAIL" MCHJ
            </div>
            <div className="text-[10px] text-slate-500">Toshkent sh., Chilonzor 19-mavze</div>
            <div className="text-[10px] text-slate-500">STIR: 309 845 210 | FM: IDK-78401</div>
            <div className="text-[10px] font-bold text-emerald-800 bg-emerald-50 py-0.5 rounded">
              ONLAYN FISKAL CHEK {receipt.orderId}
            </div>
            <div className="text-[10px] text-slate-400">{receipt.date}</div>
          </div>

          {/* Cashier Info */}
          <div className="flex justify-between text-[11px] pb-2 border-b border-slate-200">
            <span className="text-slate-500">Kassir:</span>
            <span className="font-bold">{receipt.cashier}</span>
          </div>

          {/* Items List */}
          <div className="space-y-1.5 py-2 border-b-2 border-dashed border-slate-300">
            {receipt.items.map((item, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex justify-between font-bold">
                  <span>{item.name}</span>
                  <span>{(item.price * item.qty).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>{item.qty} dona x {item.price.toLocaleString()}</span>
                  <span>IKPU: 10801001001000000</span>
                </div>
              </div>
            ))}
          </div>

          {/* Totals & Tax Calculation */}
          <div className="space-y-1 pt-1 text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-500">Oraliq jami:</span>
              <span>{receipt.subtotal.toLocaleString()} so'm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">QQS (12%):</span>
              <span>{Math.round(receipt.subtotal * 0.12).toLocaleString()} so'm</span>
            </div>
            <div className="flex justify-between font-extrabold text-sm pt-1 border-t border-slate-300 text-slate-950">
              <span>JAMI TO'LOV:</span>
              <span>{receipt.total.toLocaleString()} so'm</span>
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 pt-1">
              <span>To'lov usuli:</span>
              <span className="uppercase font-bold text-emerald-700">{receipt.paymentMethod}</span>
            </div>
          </div>

          {/* QR Code Verification Stamp */}
          <div className="pt-3 border-t-2 border-dashed border-slate-300 flex flex-col items-center space-y-1.5 text-center">
            <div className="w-24 h-24 bg-white border-2 border-slate-900 p-1 flex items-center justify-center rounded">
              <QrCode className="w-20 h-20 text-slate-900" />
            </div>
            <div className="text-[9px] text-slate-400">
              soliq.uz elektron fiskal chekni tekshirish
            </div>
            <div className="text-[10px] font-bold text-slate-800">
              XARIDINGIZ UCHUN RAHMAT!
            </div>
          </div>

        </div>

        {/* Modal Buttons */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Yangi Savdo Boshlash</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
