/**
 * Responsive image from public/img (built by scripts/images.mjs): AVIF first, WebP fallback.
 * width/height reserve the space, so nothing shifts. Lazy images fade in once decoded;
 * `priority` (the LCP image) loads eagerly at high priority and shows with no fade.
 */
export const IMAGES = {
  kassa: { w: 1280, h: 542, widths: [640, 960, 1280] },
  showcase_kassirlar: { w: 1359, h: 716, widths: [640, 960, 1359] },
  showcase_savdo: { w: 1353, h: 756, widths: [640, 960, 1353] },
  showcase_ombor: { w: 1359, h: 757, widths: [640, 960, 1359] },
  showcase_analitika: { w: 1347, h: 749, widths: [640, 960, 1347] },
  course_test: { w: 1400, h: 875, widths: [640, 960, 1400] },
  course_kassa_sotish: { w: 700, h: 438, widths: [480, 700] },
  course_qurilmalar: { w: 700, h: 438, widths: [480, 700] },
  hardware: { w: 800, h: 600, widths: [400, 800] },
};

const set = (name, widths, ext) => widths.map((x) => `/img/${name}-${x}.${ext} ${x}w`).join(', ');

const markLoaded = (el) => {
  if (!el) return;
  const done = () => el.setAttribute('data-loaded', '');
  if (el.complete && el.naturalWidth) done();
  else el.addEventListener('load', done, { once: true });
};

export const Img = ({ name, kind = name, alt, sizes, priority = false, className = '', style }) => {
  const { w, h, widths } = IMAGES[kind];
  return (
    <picture>
      <source type="image/avif" srcSet={set(name, widths, 'avif')} sizes={sizes} />
      <img
        src={`/img/${name}-${widths.at(-1)}.webp`} srcSet={set(name, widths, 'webp')} sizes={sizes}
        width={w} height={h} alt={alt} decoding="async"
        loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined}
        ref={priority ? undefined : markLoaded}
        className={`h-auto w-full ${priority ? '' : 'img-fade'} ${className}`} style={style}
      />
    </picture>
  );
};
