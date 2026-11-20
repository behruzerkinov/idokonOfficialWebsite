/** Who it is for: a station board, one row per shop format, the name large and its line beside it. */
export const SectorSolutions = ({ t }) => (
  <section id="users" className="section section-alt">
    <div className="wrap">
      <header className="head">
        <h2 className="t-h2">{t.sectors.title}</h2>
        <p className="t-lead">{t.sectors.lead}</p>
      </header>
      <ul className="mt-12 border-b" style={{ borderColor: 'var(--line)' }}>
        {[1, 2, 3].map((n) => (
          <li key={n} className="rule grid gap-1 py-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:items-baseline sm:gap-8">
            <h3 className="text-[clamp(1.25rem,1rem+1.2vw,1.75rem)] font-medium tracking-[-0.02em]" style={{ fontFamily: 'var(--font-sign)' }}>{t.sectors[`s${n}`]}</h3>
            <p className="fg-2">{t.sectors[`s${n}_desc`]}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
