import { DatabaseBackup, GraduationCap, Headset } from 'lucide-react';
import { SITE, formatPhone } from '../data/site';
import { Reveal } from './Reveal';

/** "We stay with you": migration, training, support. Course lives in its own section. */
export const CareSection = ({ t, lang }) => {
  const c = t.care;
  const hours = SITE.supportHours?.[lang];
  const Block = ({ icon: Icon, title, children }) => (
    <Reveal>
      <div className="card spot h-full p-7">
        <span className="chip-num"><Icon size={18} strokeWidth={2} aria-hidden="true" /></span>
        <h3 className="mt-6 text-lg font-bold tracking-tight">{title}</h3>
        {children}
      </div>
    </Reveal>
  );
  return (
    <section id="support" className="section section-alt">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <h2 className="h2">{c.title}</h2>
          <p className="lede mt-5">{c.lead}</p>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <Block icon={DatabaseBackup} title={c.migration.title}><p className="mt-2 text-[15px]" style={{ color: 'var(--muted)' }}>{c.migration.desc}</p></Block>
          <Block icon={GraduationCap} title={c.training.title}><p className="mt-2 text-[15px]" style={{ color: 'var(--muted)' }}>{c.training.desc}</p></Block>
          <Block icon={Headset} title={c.support.title}>
            <p className="mt-2 text-[15px]" style={{ color: 'var(--muted)' }}>{c.support.desc}</p>
            {hours && <p className="mt-2 text-sm font-semibold">{c.support.hours}: {hours}</p>}
            <p className="mt-4 text-sm font-bold">{SITE.phones.map(formatPhone).join(' · ')}</p>
          </Block>
        </div>
      </div>
    </section>
  );
};
