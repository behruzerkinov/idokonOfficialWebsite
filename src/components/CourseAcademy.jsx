import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SITE } from '../data/site';
import { Reveal } from './Reveal';

const SHOTS = [
  ['course_test', 'shot1', 'big'],
  ['course_kassa_sotish', 'shot2'],
  ['course_qurilmalar', 'shot3'],
];

/** Course teaser: real course screens on the left, short pitch and link on the right. */
export const CourseAcademy = ({ t, onOpenLightbox }) => {
  const c = t.course;
  return (
    <section id="course" className="section scroll-mt-16">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <Reveal>
          <div className="spot grid grid-cols-2 gap-2 rounded-3xl p-3" style={{ background: 'var(--alt)', boxShadow: 'inset 0 0 0 1px var(--line), var(--shadow-card)' }}>
            {SHOTS.map(([file, k, big]) => (
              <button key={file} type="button" onClick={() => onOpenLightbox(`/screenshots/${file}.webp`, c[k])} aria-label={c[k]} className={`overflow-hidden rounded-xl bg-white ${big ? 'col-span-2' : ''}`} style={{ boxShadow: 'var(--ring)' }}>
                <img src={`/screenshots/${file}.webp`} alt={c[k]} width="800" height="450" loading="lazy" decoding="async" className="h-auto w-full object-cover" />
              </button>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <span className="eyebrow">{c.eyebrow}</span>
          <h2 className="h2 mt-5">{c.title}</h2>
          <p className="lede mt-5 max-w-[48ch]">{c.lead}</p>
          <p className="mt-6 max-w-[48ch] rounded-r-xl border-l-4 p-5 text-[15px] font-semibold" style={{ borderColor: 'var(--accent)', background: 'var(--accent-soft)' }}>{c.highlight}</p>
          <a href={SITE.courseUrl} target="_blank" rel="noopener" className="btn-primary mt-8 !px-7">{c.cta}<ArrowRight size={18} strokeWidth={2} aria-hidden="true" /></a>
        </Reveal>
      </div>
    </section>
  );
};
