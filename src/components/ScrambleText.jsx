import React, { useRef, useEffect } from 'react';
import { useScrambleText } from '../hooks/useScrambleText';

export function ScrambleText({
  text,
  className = '',
  scrambleOnHover = true,
  triggerOnView = false,
  duration = 450,
  as: Component = 'span',
  ...props
}) {
  const { displayText, scramble } = useScrambleText(text, { scrambleDuration: duration });
  const elementRef = useRef(null);

  useEffect(() => {
    if (!triggerOnView || !elementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            scramble();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [triggerOnView, scramble]);

  return (
    <Component
      ref={elementRef}
      onMouseEnter={scrambleOnHover ? scramble : undefined}
      className={`inline-block font-inherit transition-colors ${className}`}
      {...props}
    >
      {displayText}
    </Component>
  );
}
