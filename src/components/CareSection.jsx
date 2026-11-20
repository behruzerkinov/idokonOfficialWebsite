import { DatabaseBackup, GraduationCap, Headset } from './icons';
import { SITE, formatPhone } from '../data/site';

/** "We stay with you": migration, training, support. */
export const CareSection = ({ t, lang }) => {
  const c = t.care;
  const hours = SITE.supportHours?.[lang];
  const items = [
    [DatabaseBackup, c.migration],
    [GraduationCap, c.training],
    [Headset, c.support],
  ];
  return (
    <section id="support" className="section">
      <div className="wrap">
        <header className="head">
          <h2 className="t-headline">{c.title}</h2>
          <p className="t-intro">{c.lead}</p>
        </header>
        <ul className="mt-[clamp(3rem,6vw,4.5rem)] grid gap-4 md:grid-cols-3 md:gap-5">
          {items.map(([Icon, it], k) => (
            <li key={k} className="tile flex flex-col">
              <Icon size={32} strokeWidth={1.5} style={{ color: 'var(--accent)' }} />
              <h3 className="t-title mt-8">{it.title}</h3>
              <p className="muted mt-2">{it.desc}</p>
              {k === 2 && (
                <div className="mt-auto pt-5">
                  {hours && <p className="t-caption">{c.support.hours}: {hours}</p>}
                  <p className="mt-1 flex flex-wrap gap-x-4">{SITE.phones.map((p) => <a key={p} href={`tel:${p}`} className="link whitespace-nowrap">{formatPhone(p)}</a>)}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
