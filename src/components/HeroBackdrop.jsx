import React from 'react';
import { SITE } from '../data/site';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Grid behind the hero. Uses the brand image / video when set, otherwise a CSS grid. */
export const HeroBackdrop = () => {
  const { gridImage, heroVideo } = SITE.brand;
  const video = heroVideo && !prefersReducedMotion();
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[780px] overflow-hidden">
      {video ? (
        <video
          src={heroVideo.src} poster={heroVideo.poster} autoPlay muted loop playsInline preload="metadata"
          className="h-full w-full object-cover opacity-70"
        />
      ) : gridImage || heroVideo?.poster ? (
        <img src={gridImage || heroVideo.poster} alt="" width="2400" height="1200" fetchpriority="low" decoding="async" className="h-full w-full object-cover object-top" />
      ) : (
        <div className="grid-backdrop h-full w-full" />
      )}
      <div className="grid-glow absolute inset-0" />
    </div>
  );
};
