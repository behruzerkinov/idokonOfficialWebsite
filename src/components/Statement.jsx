/** Closing: the owner's two lines and the one action. Short, so centred. */
export const Statement = ({ t, onOpenDemo }) => (
  <section className="section section-alt">
    <div className="wrap text-center">
      <h2 className="t-h2 mx-auto max-w-[24ch]">
        <span className="block">{t.closing.w1}</span>
        <span className="block fg-2">{t.closing.w2}</span>
      </h2>
      <button type="button" onClick={onOpenDemo} className="btn-primary mt-8">{t.hero.ctaPrimary}</button>
    </div>
  </section>
);
