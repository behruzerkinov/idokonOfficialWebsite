import React from 'react';
import { m } from 'motion/react';

export const EASE_OUT = [0.22, 1, 0.36, 1];

/** Fade + rise, once per element; `delay` (s) staggers siblings. Extra props (className, style) pass through. */
export const Reveal = ({ children, as = 'div', delay = 0, ...rest }) => {
  const Tag = m[as];
  return (
    <Tag
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT }}
      {...rest}
    >
      {children}
    </Tag>
  );
};
