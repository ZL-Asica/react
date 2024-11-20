import { useState } from 'react';

import { useEventListener } from './useEventListener'; // 假设它在同目录下

/**
 * useScrollPosition
 *
 * A custom React hook to track the current vertical scroll position of the window.
 * Automatically updates whenever the user scrolls.
 *
 * @returns {number} The current vertical scroll position (`window.scrollY`).
 *
 * @example
 * ```tsx
 * import { useScrollPosition } from '@zl-asica/react';
 *
 * const MyComponent = () => {
 *   const scrollPosition = useScrollPosition();
 *
 *   return <div>Scroll Position: {scrollPosition}</div>;
 * };
 * ```
 */
export const useScrollPosition = (): number => {
  const [scrollPosition, setScrollPosition] = useState(0);

  // Use our custom event listener hook for the scroll event
  useEventListener(
    'scroll',
    () => {
      setScrollPosition(window.scrollY);
    },
    globalThis
  );

  return scrollPosition;
};
