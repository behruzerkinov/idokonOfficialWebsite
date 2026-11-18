/** Fade + rise as the element enters the viewport. Pure CSS scroll-driven animation (.reveal); `delay` staggers siblings (0–3). */
export const Reveal = ({ as: Tag = 'div', delay = 0, className = '', style, ...rest }) => (
  <Tag className={`reveal ${className}`} style={delay ? { ...style, '--d': delay } : style} {...rest} />
);
