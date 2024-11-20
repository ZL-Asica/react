import { useState, useEffect } from 'react';

import { useEventListener } from './useEventListener'; // 复用现有的事件监听 Hook

/**
 * useScrollProgress
 *
 * A custom React hook to track the current vertical scroll progress of the page.
 * Returns a percentage (0 to 100) representing how much of the page has been scrolled.
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
      setProgress(100); // If no scrollable area, consider it fully scrolled
      return;
    }

    const currentProgress = (scrollTop / scrollableHeight) * 100;
    setProgress(Math.min(100, Math.max(0, currentProgress))); // Clamp to [0, 100]
  };

  useEventListener('scroll', calculateScrollProgress, globalThis);
  useEffect(calculateScrollProgress, []); // Initialize progress on mount

  return progress;
};
