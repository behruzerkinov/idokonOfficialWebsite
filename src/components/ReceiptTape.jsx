import React from 'react';
import { m } from 'motion/react';
import { formatPrice } from '../data/site';

// Sample prices for an illustrative receipt. Labelled "sample" on the paper so nobody reads them as real.
const LINES = [
  { qty: 2, price: 4000 },
  { qty: 1, price: 12000 },
  { qty: 1, price: 18000 },
];

/** The signature element: a till receipt that prints line by line. Decorative, so hidden from screen readers. */
export const ReceiptTape = ({ t, lang, className = '' }) => {
  const r = t.hero.receipt;
  const total = LINES.reduce((sum, l) => sum + l.qty * l.price, 0);
  return (
    <div className={`receipt ${className}`} aria-hidden="true">
      <div className="receipt-line receipt-row" style={{ '--i': 0 }}>
        <span className="font-bold">IDO'KON</span>
        <span className="receipt-stamp">{r.stamp}</span>
      </div>
      <hr className="receipt-rule" />
      {LINES.map((l, i) => (
        <div key={i} className="receipt-line receipt-row" style={{ '--i': i + 1 }}>
          <span>{r.items[i]} <span className="receipt-muted">× {l.qty}</span></span>
          <span>{formatPrice(l.qty * l.price, lang)}</span>
        </div>
      ))}
      <hr className="receipt-rule" />
      <div className="receipt-line receipt-row receipt-total" style={{ '--i': LINES.length + 1 }}>
        <span>{r.total}</span>
        <span>{formatPrice(total, lang)}</span>
      </div>
      <p className="receipt-line receipt-muted mt-3 text-[11px]" style={{ '--i': LINES.length + 2 }}>{r.note}</p>
    </div>
  );
};

/** A line that prints when it scrolls into view. Reduced motion (MotionConfig) shows it without the slide. */
export const PrintLine = ({ i = 0, className = '', children }) => (
  <m.div
    initial={{ opacity: 0, y: -6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.42, ease: [0.23, 1, 0.32, 1], delay: i * 0.2 }} className={className}
  >{children}</m.div>
);
