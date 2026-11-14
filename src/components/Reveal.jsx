import React from 'react';
import { motion } from 'motion/react';

export const EASE_OUT = [0.22, 1, 0.36, 1];

const VIEWPORT = { once: true, margin: '-80px' };

/**
 * Reveal — a block rises and un-blurs as it enters the viewport. Plays once.
 * `delay` (seconds) staggers siblings. Use `as` for semantic tags.
 */
export const Reveal = ({ children, delay = 0, y = 28, className = '', as = 'div' }) => {
  const Tag = motion[as];
  return (
    <Tag
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={VIEWPORT}
      transition={{ duration: 1, ease: EASE_OUT, delay }}
      className={className}
    >
      {children}
    </Tag>
  );
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const item = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: EASE_OUT } },
};

/** Stagger — wraps children that each use <StaggerItem>. */
export const Stagger = ({ children, className = '', as = 'div' }) => {
  const Tag = motion[as];
  return (
    <Tag variants={container} initial="hidden" whileInView="show" viewport={VIEWPORT} className={className}>
      {children}
    </Tag>
  );
};

export const StaggerItem = ({ children, className = '', as = 'div' }) => {
  const Tag = motion[as];
  return (
    <Tag variants={item} className={className}>
      {children}
    </Tag>
  );
};

/**
 * RevealWords — headline reveal where each word rises in sequence.
 * Pass plain text (or ReactNodes with spans) as children.
 */
export const RevealWords = ({ text, className = '', as = 'h2', delay = 0 }) => {
  const Tag = motion[as];
  const words = String(text).split(' ');
  return (
    <Tag variants={container} initial="hidden" whileInView="show" viewport={VIEWPORT} className={className} aria-label={text}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          variants={{
            hidden: { opacity: 0, y: '0.6em', filter: 'blur(6px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: EASE_OUT, delay } },
          }}
          className="inline-block will-change-transform"
        >
          {w}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </Tag>
  );
};
