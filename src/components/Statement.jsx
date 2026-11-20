/** Closing: the owner's two lines and the one action. */
export const Statement = ({ t, onOpenDemo }) => (
  <section className="section">
    <div className="wrap text-center">
      <h2 className="t-headline mx-auto max-w-[880px]">
        <span className="block">{t.closing.w1}</span>
        <span className="mt-1 block" style={{ color: 'var(--accent)' }}>{t.closing.w2}</span>
      </h2>
      <button type="button" onClick={onOpenDemo} className="btn-primary mt-10">{t.hero.ctaPrimary}</button>
    </div>
  </section>
);
