import { DatabaseBackup, GraduationCap, Headset } from './icons';
import { SITE, formatPhone } from '../data/site';

/** "We stay with you": migration, training, support, as ruled rows beside the heading. */
export const CareSection = ({ t, lang }) => {
  const c = t.care;
  const hours = SITE.supportHours?.[lang];
  const items = [[DatabaseBackup, c.migration], [GraduationCap, c.training], [Headset, c.support]];
  return (
    <section id="support" className="section section-alt">
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <header className="head">
          <h2 className="t-h2 stop">{c.title}</h2>
          <p className="t-lead">{c.lead}</p>
        </header>
        <ul className="border-b" style={{ borderColor: 'var(--line)' }}>
          {items.map(([Icon, it], k) => (
            <li key={k} className="rule grid grid-cols-[28px_1fr] gap-x-4 py-6">
              <Icon size={20} strokeWidth={1.5} className="mt-1 fg-3" />
              <div>
                <h3 className="t-h3">{it.title}</h3>
                <p className="fg-2 mt-1.5 max-w-[52ch]">{it.desc}</p>
                {k === 2 && (
                  <div className="mt-3">
                    {hours && <p className="t-small">{c.support.hours}: {hours}</p>}
                    <p className="flex flex-wrap gap-x-5 gap-y-1">{SITE.phones.map((p) => <a key={p} href={`tel:${p}`} className="link num whitespace-nowrap">{formatPhone(p)}</a>)}</p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
