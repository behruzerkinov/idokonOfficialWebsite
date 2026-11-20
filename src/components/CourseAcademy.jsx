import { SITE } from '../data/site';
import { Img } from './Img';

const SHOTS = [
  ['course_test', 'shot1', 'big'],
  ['course_kassa_sotish', 'shot2'],
  ['course_qurilmalar', 'shot3'],
];

/** Free course: the pitch, then real course screens. */
export const CourseAcademy = ({ t, onOpenLightbox }) => {
  const c = t.course;
  return (
    <section id="course" className="section section-alt">
      <div className="wrap">
        <header className="head">
          <h2 className="t-headline">{c.title}</h2>
          <p className="t-intro">{c.lead}</p>
          <p className="mx-auto mt-4 max-w-[560px]">{c.highlight}</p>
          <a href={SITE.courseUrl} target="_blank" rel="noopener" className="btn-primary mt-8">{c.cta}</a>
        </header>
        <div className="mt-[clamp(3rem,6vw,4.5rem)] grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
          {SHOTS.map(([file, k, big]) => (
            <button key={file} type="button" onClick={() => onOpenLightbox(file, c[k])} aria-label={c[k]} className={`shot cursor-zoom-in ${big ? 'col-span-2 md:row-span-2' : ''}`}>
              <Img name={file} alt={c[k]} sizes={big ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 50vw'} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
