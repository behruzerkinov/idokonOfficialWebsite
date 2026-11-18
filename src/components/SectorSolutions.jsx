import { ShoppingBasket, ShoppingCart, Store } from 'lucide-react';
import { Reveal } from './Reveal';

const ICONS = [Store, ShoppingCart, ShoppingBasket];

/** Three solid cards: icon, title in full-strength text, description in readable muted text. */
export const SectorSolutions = ({ t }) => (
  <section id="users" className="section">
    <div className="container-page">
      <Reveal className="mx-auto max-w-3xl text-center">
        <span className="eyebrow">{t.sectors.eyebrow}</span>
        <h2 className="h2 mt-5">{t.sectors.title}</h2>
        <p className="lede mx-auto mt-5 max-w-[52ch]">{t.sectors.lead}</p>
      </Reveal>
      <ul className="mt-12 grid gap-4 lg:grid-cols-3">
        {ICONS.map((Icon, k) => (
          <Reveal as="li" key={k} delay={k} className="card spot flex min-h-[220px] flex-col justify-between p-7">
            <div className="flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}>
                <Icon size={22} strokeWidth={1.9} aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold tabular-nums" style={{ color: 'var(--muted)' }}>0{k + 1}</span>
            </div>
            <div className="mt-10">
              <h3 className="text-xl font-bold tracking-tight">{t.sectors[`s${k + 1}`]}</h3>
              <p className="mt-1.5 text-[15px]" style={{ color: 'var(--muted)' }}>{t.sectors[`s${k + 1}_desc`]}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </div>
  </section>
);
