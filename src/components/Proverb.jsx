/** The one quiet, memorable moment: an Uzbek proverb about honest accounts, which is what iDokon does. */
export const Proverb = ({ t }) => (
  <section className="section section-alt">
    <figure className="wrap max-w-[860px] text-center">
      <blockquote className="t-headline">“{t.hero.quote.replace(/\.$/, '')}.”</blockquote>
      <figcaption className="mt-6">
        <p className="t-intro mx-auto max-w-[560px]">{t.hero.quoteNote}</p>
        <p className="t-caption mt-4">{t.hero.quoteBy}</p>
      </figcaption>
    </figure>
  </section>
);
