import { useState, useRef, useCallback, useEffect } from 'react';

const DEFAULT_CHARS = '021ZROTXINSMOPSWEKNM';

/**
 * Hook to create a cybernetic text scramble effect (ChainGPT Labs style)
 * @param {string} text - The original text to scramble
 * @param {object} options - Configuration options
 */
export function useScrambleText(text, options = {}) {
  const {
    chars = DEFAULT_CHARS,
    speed = 25, // ms per character frame
    scrambleDuration = 400, // total duration of scramble in ms
    autoStart = false
  } = options;

  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const frameRef = useRef(null);
  const startTimeRef = useRef(0);

  // Sync when text prop changes
  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  const scramble = useCallback(() => {
    if (!text) return;
    setIsScrambling(true);
    startTimeRef.current = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / scrambleDuration, 1);
      
      // Calculate how many characters are resolved from left to right
      const resolvedCount = Math.floor(progress * text.length);

      let result = '';
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char === ' ' || char === '\n' || char === '\t') {
          result += char;
        } else if (i < resolvedCount) {
          result += char;
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      setDisplayText(result);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(text);
        setIsScrambling(false);
      }
    };

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(animate);
  }, [text, chars, scrambleDuration]);

  const stop = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    setDisplayText(text);
    setIsScrambling(false);
  }, [text]);

  useEffect(() => {
    if (autoStart) {
      scramble();
    }
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [autoStart, scramble]);

  return { displayText, isScrambling, scramble, stop };
}
