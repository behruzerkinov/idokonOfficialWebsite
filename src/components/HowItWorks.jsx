/** Three real steps, so they are numbered. */
export const HowItWorks = ({ t }) => (
  <section className="section section-alt">
    <div className="wrap">
      <header className="head">
        <h2 className="t-headline">{t.how.title}</h2>
        <p className="t-intro">{t.how.lead}</p>
      </header>
      <ol className="mt-[clamp(3rem,6vw,4.5rem)] grid gap-10 md:grid-cols-3 md:gap-8">
        {[1, 2, 3].map((n) => (
          <li key={n} className="text-center md:text-left">
            <span className="block text-[48px] font-semibold leading-none tracking-tight" style={{ color: 'var(--accent)' }} aria-hidden="true">{n}</span>
            <h3 className="t-title mt-5">{t.how[`s${n}_title`]}</h3>
            <p className="muted mx-auto mt-2 max-w-[36ch] md:mx-0">{t.how[`s${n}_desc`]}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);
