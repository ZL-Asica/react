import { useState, useEffect } from 'react';

import { useEventListener } from './useEventListener';

import { clamp } from '@/utils';

/**
 * useScrollProgress
 *
 * A custom React hook to track the current vertical scroll progress of the page.
 * Returns a percentage (0 to 100) representing how much of the page has been scrolled.
 * If the page has no scrollable area, the progress will be 0.
 *
 * @returns {number} The current scroll progress as a percentage (0-100).
 *
 * @example
 * ```tsx
 * import { useScrollProgress } from '@zl-asica/react';
 *
 * const MyComponent = () => {
 *   const scrollProgress = useScrollProgress();
 *
 *   return (
 *     <div>
 *       <p>Scroll Progress: {scrollProgress}%</p>
 *       <div style={{ height: '200vh', background: 'linear-gradient(to bottom, red, blue)' }} />
 *     </div>
 *   );
 * };
 * ```
 */
export const useScrollProgress = (): number => {
  const [progress, setProgress] = useState(0);

  const calculateScrollProgress = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const scrollableHeight = scrollHeight - clientHeight;

    if (scrollableHeight === 0) {
      setProgress(0); // If no scrollable area, set progress to 0
      return;
    }

    setProgress(clamp((scrollTop / scrollableHeight) * 100, 0, 100));
  };

  useEffect(() => {
    if (typeof globalThis !== 'undefined') {
      calculateScrollProgress();
    }
  }, []);

  useEventListener('scroll', calculateScrollProgress);

  return progress;
};
