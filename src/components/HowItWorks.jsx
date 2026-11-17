import React from 'react';
import { PrintLine } from './ReceiptTape';

/** Three steps printed as lines on one tape. Heading sits left, the tape right. */
export const HowItWorks = ({ t }) => (
  <section className="section">
    <div className="container-page grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
      <div>
        <h2 className="h2">{t.how.title}</h2>
        <p className="lede mt-4 max-w-[34ch]">{t.how.lead}</p>
      </div>
      <div className="receipt !max-w-none">
        {[1, 2, 3].map((n) => (
          <PrintLine key={n} i={n - 1} className={n < 3 ? 'receipt-rule-b' : ''}>
            <p className="receipt-row text-[13px] font-bold">
              <span className="!whitespace-normal">{t.how[`s${n}_title`]}</span>
              <span>0{n}</span>
            </p>
            <p className="receipt-muted mt-1">{t.how[`s${n}_desc`]}</p>
          </PrintLine>
        ))}
      </div>
    </div>
  </section>
);
