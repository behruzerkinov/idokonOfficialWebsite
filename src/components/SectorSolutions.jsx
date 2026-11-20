import { ShoppingBasket, ShoppingCart, Store } from './icons';

const ICONS = [Store, ShoppingCart, ShoppingBasket];

/** Who it is for: three tiles, one symbol each. */
export const SectorSolutions = ({ t }) => (
  <section id="users" className="section">
    <div className="wrap">
      <header className="head">
        <h2 className="t-headline">{t.sectors.title}</h2>
        <p className="t-intro">{t.sectors.lead}</p>
      </header>
      <ul className="mt-[clamp(3rem,6vw,4.5rem)] grid gap-4 md:grid-cols-3 md:gap-5">
        {ICONS.map((Icon, k) => (
          <li key={k} className="tile">
            <Icon size={32} strokeWidth={1.5} style={{ color: 'var(--accent)' }} />
            <h3 className="t-title mt-8">{t.sectors[`s${k + 1}`]}</h3>
            <p className="muted mt-2">{t.sectors[`s${k + 1}_desc`]}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
