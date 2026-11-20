/** Four equal tiles. Each leads with what it covers, then the claim, then the detail. */
export const ValueGrid = ({ t }) => {
  const f = t.features;
  return (
    <section id="features" className="section">
      <div className="wrap">
        <header className="head">
          <h2 className="t-headline">{f.title}</h2>
          <p className="t-intro">{f.lead}</p>
        </header>
        <div className="mt-[clamp(3rem,6vw,4.5rem)] grid gap-4 md:grid-cols-2 md:gap-5">
          {[1, 2, 3, 4].map((n) => (
            <article key={n} className="tile flex min-h-[240px] flex-col">
              <p className="t-caption font-semibold" style={{ color: 'var(--accent)' }}>{f[`f${n}_tag`]}</p>
              <h3 className="t-title mt-3">{f[`f${n}_title`]}</h3>
              <p className="muted mt-3 max-w-[44ch]">{f[`f${n}_desc`]}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
