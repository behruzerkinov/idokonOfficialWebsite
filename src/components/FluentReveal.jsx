import React, { useRef, useState, useCallback } from 'react';

/**
 * Windows 10 Fluent Design "Reveal Highlight" component.
 * Reproduces the luminous radial spotlight effect from the Windows 10 Settings app,
 * illuminating card surfaces and card borders smoothly as the mouse moves.
 */
export const FluentRevealCard = ({ 
  children, 
  className = '', 
  spotlightColor = 'rgba(16, 185, 129, 0.07)', 
  borderColor = 'rgba(16, 185, 129, 0.18)',
  radius = 260,
  ...props 
}) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setMousePos({ x: -1000, y: -1000 });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden transition-all duration-200 ${className}`}
      {...props}
    >
      {/* Surface Reveal Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-200 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${radius}px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 80%)`,
        }}
        aria-hidden="true"
      />

      {/* Border Reveal Highlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-200 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${radius * 0.85}px circle at ${mousePos.x}px ${mousePos.y}px, ${borderColor}, transparent 75%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-0 h-full">{children}</div>
    </div>
  );
};
