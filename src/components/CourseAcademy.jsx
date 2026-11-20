import { ArrowUpRight } from './icons';
import { SITE } from '../data/site';
import { Img } from './Img';

const SHOTS = [
  ['course_test', 'shot1', 'big'],
  ['course_kassa_sotish', 'shot2'],
  ['course_qurilmalar', 'shot3'],
];

/** Free course: the pitch on the left, real course screens on the right. */
export const CourseAcademy = ({ t, onOpenLightbox }) => {
  const c = t.course;
  return (
    <section id="course" className="section">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <header className="head">
            <h2 className="t-h2">{c.title}</h2>
            <p className="t-lead">{c.lead}</p>
          </header>
          <p className="mt-5 max-w-[46ch]">{c.highlight}</p>
          <a href={SITE.courseUrl} target="_blank" rel="noopener" className="btn-primary mt-8">{c.cta}<ArrowUpRight size={16} strokeWidth={1.75} /></a>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {SHOTS.map(([file, k, big]) => (
            <button key={file} type="button" onClick={() => onOpenLightbox(file, c[k])} aria-label={c[k]} className={`shot cursor-zoom-in !rounded-[10px] ${big ? 'col-span-2' : ''}`}>
              <Img name={file} alt={c[k]} sizes={big ? '(min-width: 1024px) 620px, 100vw' : '(min-width: 1024px) 310px, 50vw'} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
