/** A proverb about honest accounts, which is what iDokon does. Two short lines, so it may be centred. */
export const Proverb = ({ t }) => (
  <section className="section">
    <figure className="wrap max-w-[820px] text-center">
      <blockquote className="t-h2">“{t.hero.quote.replace(/\.$/, '')}”</blockquote>
      <figcaption className="mt-5">
        <p className="t-lead mx-auto max-w-[520px]">{t.hero.quoteNote}</p>
        <p className="t-small mt-3">{t.hero.quoteBy}</p>
      </figcaption>
    </figure>
  </section>
);
