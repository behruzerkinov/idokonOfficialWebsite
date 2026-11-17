import React from 'react';
import { m } from 'motion/react';

export const EASE_OUT = [0.22, 1, 0.36, 1];

/** Fade + 12px rise, 400ms, once per element. */
export const Reveal = ({ children, className = '', as = 'div' }) => {
  const Tag = m[as];
  return (
    <Tag
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, ease: EASE_OUT }}
      className={className}
    >
      {children}
    </Tag>
  );
};
