import { DatabaseBackup, GraduationCap, Headset } from './icons';
import { SITE, formatPhone } from '../data/site';

/** "We stay with you": migration, training, support, as three cards of one height. */
export const CareSection = ({ t, lang }) => {
  const c = t.care;
  const hours = SITE.supportHours?.[lang];
  const items = [[DatabaseBackup, c.migration], [GraduationCap, c.training], [Headset, c.support]];
  return (
    <section id="support" className="section section-alt">
      <div className="wrap">
        <header className="head">
          <h2 className="t-h2">{c.title}</h2>
          <p className="t-lead">{c.lead}</p>
        </header>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {items.map(([Icon, it], k) => (
            <li key={k} className="card flex flex-col p-6">
              <Icon size={20} strokeWidth={1.5} className="fg-3" />
              <h3 className="t-h3 mt-8">{it.title}</h3>
              <p className="fg-2 mt-2">{it.desc}</p>
              {k === 2 && (
                <div className="mt-auto pt-6">
                  {hours && <p className="t-small">{c.support.hours}: {hours}</p>}
                  <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1">{SITE.phones.map((p) => <a key={p} href={`tel:${p}`} className="link num whitespace-nowrap">{formatPhone(p)}</a>)}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
