import React from 'react';
import { DatabaseBackup, GraduationCap, BookOpen, Headset, Phone, Send, ExternalLink } from 'lucide-react';
import { SITE, formatPhone } from '../data/site';
import { SectionHead } from './SectionHead';

const SHOTS = [
  ['course_kirish', 'shot1'],
  ['course_kassa_sotish', 'shot2'],
  ['course_qurilmalar', 'shot3'],
];

const Block = ({ icon: Icon, title, children }) => (
  <div className="card p-7">
    <Icon size={20} strokeWidth={1.75} className="text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
    <h3 className="mt-3 text-lg font-semibold">{title}</h3>
    {children}
  </div>
);

export const CareSection = ({ t, lang, onOpenLightbox }) => {
  const c = t.care;
  const hours = SITE.supportHours?.[lang];
  return (
    <section id="support" className="section scroll-mt-16" style={{ background: 'var(--surface)' }}>
      <div className="container-page">
        <SectionHead title={c.title} lead={c.lead} />
        <div className="grid gap-5 md:grid-cols-2">
          <Block icon={DatabaseBackup} title={c.migration.title}>
            <p className="mt-2" style={{ color: 'var(--muted)' }}>{c.migration.desc}</p>
          </Block>
          <Block icon={GraduationCap} title={c.training.title}>
            <p className="mt-2" style={{ color: 'var(--muted)' }}>{c.training.desc}</p>
          </Block>

          <Block icon={BookOpen} title={c.course.title}>
            <p className="mt-2" style={{ color: 'var(--muted)' }}>{c.course.desc}</p>
            <ul className="my-4 grid grid-cols-3 gap-2">
              {SHOTS.map(([file, k]) => (
                <li key={file}>
                  <button type="button" onClick={() => onOpenLightbox(`/screenshots/${file}.webp`, c.course[k])} aria-label={c.course[k]} className="block w-full overflow-hidden rounded-lg border" style={{ borderColor: 'var(--line)' }}>
                    <img src={`/screenshots/${file}.webp`} alt={c.course[k]} width="400" height="225" loading="lazy" decoding="async" className="aspect-video w-full object-cover object-top" />
                  </button>
                </li>
              ))}
            </ul>
            <a href={SITE.courseUrl} target="_blank" rel="noopener" className="btn-primary">
              {c.course.cta}<ExternalLink size={20} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </Block>

          <Block icon={Headset} title={c.support.title}>
            <p className="mt-2" style={{ color: 'var(--muted)' }}>{c.support.desc}</p>
            {hours && <p className="mt-2 text-sm font-medium">{c.support.hours}: {hours}</p>}
            <div className="mt-4 flex flex-col gap-2">
              {SITE.phones.map((p) => (
                <a key={p} href={`tel:${p}`} className="inline-flex min-h-[44px] items-center gap-2 font-medium text-emerald-700 hover:underline dark:text-emerald-400">
                  <Phone size={20} strokeWidth={1.75} aria-hidden="true" />{formatPhone(p)}
                </a>
              ))}
              <a href={SITE.telegram} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-2 font-medium text-emerald-700 hover:underline dark:text-emerald-400">
                <Send size={20} strokeWidth={1.75} aria-hidden="true" />Telegram
              </a>
            </div>
          </Block>
        </div>
      </div>
    </section>
  );
};
