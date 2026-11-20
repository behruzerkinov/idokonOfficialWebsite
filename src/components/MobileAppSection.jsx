import { useState } from 'react';
import { ChartColumn, Cloud, ScanLine } from './icons';
import { SITE } from '../data/site';
import { Img } from './Img';

const STEPS = ['catalog', 'cart', 'payment'];
const PLATFORMS = [['ios', 'iOS'], ['android', 'Android']];
const FEATURES = [[ChartColumn, 1], [ScanLine, 2], [Cloud, 3]];

/**
 * The phone app, shown with its own screens: one sale from catalogue to cart to payment.
 * Both platforms stay mounted and cross-fade, so switching never waits on a download.
 * On phones the three screens become a swipeable row.
 */
export const MobileAppSection = ({ t }) => {
  const m = t.mobileApp;
  const [os, setOs] = useState('ios');
  const stores = [[SITE.appStore, m.appStore], [SITE.googlePlay, m.googlePlay]].filter(([url]) => url);

  return (
    <section id="mobile-app" className="section" aria-labelledby="mobile-app-title">
      <div className="wrap">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <header className="head">
            <h2 id="mobile-app-title" className="t-h2 stop">{m.title}</h2>
            <p className="t-lead">{m.lead}</p>
            {stores.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {stores.map(([url, label]) => <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="btn-secondary">{label}</a>)}
              </div>
            )}
          </header>
          <div role="group" aria-label={m.platform} className="segmented self-start lg:self-auto">
            {PLATFORMS.map(([id, label]) => (
              <button key={id} type="button" aria-pressed={os === id} onClick={() => setOs(id)} className="seg min-w-[88px]">{label}</button>
            ))}
          </div>
        </div>

        <p className="t-small mt-12">{m.stepsLabel}</p>
        <ol className="no-scrollbar -mx-5 mt-4 flex snap-x snap-mandatory scroll-px-5 gap-6 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-8 sm:overflow-visible sm:px-0 lg:gap-14">
          {STEPS.map((step, n) => (
            <li key={step} className="w-[64vw] max-w-[280px] shrink-0 snap-start sm:w-auto sm:max-w-none">
              <div className="grid">
                {PLATFORMS.map(([id]) => (
                  <div key={id} className="col-start-1 row-start-1 transition-opacity duration-300" style={{ opacity: os === id ? 1 : 0 }} aria-hidden={os !== id}>
                    <Img
                      name={`${id}-${step}`} kind={id} className="phone-img mx-auto max-w-[300px]"
                      alt={os === id ? `${id === 'ios' ? 'iOS' : 'Android'}: ${m.steps[step].title}` : ''}
                      sizes="(min-width: 1200px) 300px, (min-width: 640px) 30vw, 64vw"
                    />
                  </div>
                ))}
              </div>
              <div className="mx-auto mt-6 max-w-[300px] px-[7%]">
                <h3 className="flex items-baseline gap-2.5 font-medium"><span className="num fg-3 text-[14px]">{n + 1}</span>{m.steps[step].title}</h3>
                <p className="t-small mt-1.5">{m.steps[step].desc}</p>
              </div>
            </li>
          ))}
        </ol>

        <ul className="mt-16 grid gap-x-8 gap-y-6 md:grid-cols-3">
          {FEATURES.map(([Icon, n]) => (
            <li key={n} className="rule flex gap-3 pt-5">
              <Icon size={18} strokeWidth={1.5} className="mt-1 shrink-0 fg-3" />
              <div>
                <h3 className="font-medium">{m[`f${n}_title`]}</h3>
                <p className="t-small mt-1">{m[`f${n}_desc`]}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="t-small mt-8">{m.compatible}</p>
      </div>
    </section>
  );
};
