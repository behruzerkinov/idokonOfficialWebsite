import React from 'react';

/**
 * FluentRevealCard
 * Apple-inspired clean elevated card surface.
 * Provides subtle elevation, border transition, and zero overhead.
 */
export const FluentRevealCard = ({ 
  children, 
  className = '', 
  ...props 
}) => {
  return (
    <div
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
      {...props}
    >
      <div className="relative z-0 h-full">{children}</div>
    </div>
  );
};
