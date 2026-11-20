import { ChartColumn, Cloud, ScanLine } from './icons';
import { SITE } from '../data/site';

const FEATURES = [[ChartColumn, 1], [ScanLine, 2], [Cloud, 3]];

/** The phone app, described honestly: what it does, where it runs. Store links appear once SITE has them. */
export const MobileAppSection = ({ t }) => {
  const m = t.mobileApp;
  const stores = [[SITE.appStore, m.appStore], [SITE.googlePlay, m.googlePlay]].filter(([url]) => url);
  return (
    <section id="mobile-app" className="section section-alt" aria-labelledby="mobile-app-title">
      <div className="wrap">
        <header className="head">
          <h2 id="mobile-app-title" className="t-headline">{m.title}</h2>
          <p className="t-intro">{m.lead}</p>
          {stores.length > 0 && (
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {stores.map(([url, label]) => <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="btn-secondary">{label}</a>)}
            </div>
          )}
        </header>
        <ul className="mt-[clamp(3rem,6vw,4.5rem)] grid gap-4 md:grid-cols-3 md:gap-5">
          {FEATURES.map(([Icon, n]) => (
            <li key={n} className="tile">
              <Icon size={32} strokeWidth={1.5} style={{ color: 'var(--accent)' }} />
              <h3 className="t-title mt-8">{m[`f${n}_title`]}</h3>
              <p className="muted mt-2">{m[`f${n}_desc`]}</p>
            </li>
          ))}
        </ul>
        <p className="t-caption mt-8 text-center">{m.compatible}</p>
      </div>
    </section>
  );
};
