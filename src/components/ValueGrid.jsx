/** Features as a spec sheet: the heading holds its column, each feature is one ruled row. */
export const ValueGrid = ({ t }) => {
  const f = t.features;
  return (
    <section id="features" className="section section-alt">
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <header className="head lg:sticky lg:top-24 lg:self-start">
          <h2 className="t-h2 stop">{f.title}</h2>
          <p className="t-lead">{f.lead}</p>
        </header>
        <ol className="border-b" style={{ borderColor: 'var(--line)' }}>
          {[1, 2, 3, 4].map((n) => (
            <li key={n} className="rule grid gap-2 py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-x-8">
              <div>
                <h3 className="t-h3">{f[`f${n}_title`]}</h3>
                <p className="fg-2 mt-2 max-w-[52ch]">{f[`f${n}_desc`]}</p>
              </div>
              <p className="t-small sm:pt-1 sm:text-right">{f[`f${n}_tag`]}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
