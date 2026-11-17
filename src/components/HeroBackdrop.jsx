import React from 'react';
import { SITE } from '../data/site';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Atmosphere behind the hero. Uses the brand image / video when set, otherwise a CSS gradient mesh. */
export const HeroBackdrop = () => {
  const { gridImage, heroVideo } = SITE.brand;
  const video = heroVideo && !prefersReducedMotion();
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#06110d]">
      {video ? (
        <video src={heroVideo.src} poster={heroVideo.poster} autoPlay muted loop playsInline preload="metadata" className="h-full w-full object-cover opacity-70" />
      ) : gridImage || heroVideo?.poster ? (
        <img src={gridImage || heroVideo.poster} alt="" width="2400" height="1200" fetchpriority="low" decoding="async" className="h-full w-full object-cover object-top" />
      ) : (
        <div className="hero-mesh h-full w-full" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
    </div>
  );
};
