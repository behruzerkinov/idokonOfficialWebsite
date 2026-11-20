/** Three real steps, so they carry numbers: a ruled row, step number in till digits. */
export const HowItWorks = ({ t }) => (
  <section className="section">
    <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
      <header className="head">
        <h2 className="t-h2">{t.how.title}</h2>
        <p className="t-lead">{t.how.lead}</p>
      </header>
      <ol className="border-b" style={{ borderColor: 'var(--line)' }}>
        {[1, 2, 3].map((n) => (
          <li key={n} className="rule grid grid-cols-[40px_1fr] gap-x-4 py-6">
            <span className="num fg-3 pt-0.5 text-[15px]" aria-hidden="true">0{n}</span>
            <div>
              <h3 className="t-h3">{t.how[`s${n}_title`]}</h3>
              <p className="fg-2 mt-1.5 max-w-[52ch]">{t.how[`s${n}_desc`]}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);
