import { ShoppingBasket, ShoppingCart, Store } from './icons';

const ICONS = [Store, ShoppingCart, ShoppingBasket];

/** Who it is for: three shop formats on one ruled row. */
export const SectorSolutions = ({ t }) => (
  <section id="users" className="section section-alt">
    <div className="wrap">
      <header className="head">
        <h2 className="t-h2">{t.sectors.title}</h2>
        <p className="t-lead">{t.sectors.lead}</p>
      </header>
      <ul className="mt-12 grid md:grid-cols-3">
        {ICONS.map((Icon, k) => (
          <li key={k} className="rule flex gap-4 py-6 md:block md:pr-8 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:pl-8" style={{ borderColor: 'var(--line)' }}>
            <Icon size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 fg-3" />
            <div className="md:mt-6">
              <h3 className="t-h3">{t.sectors[`s${k + 1}`]}</h3>
              <p className="fg-2 mt-1">{t.sectors[`s${k + 1}_desc`]}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
