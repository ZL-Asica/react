import { useEffect, useState } from 'react';

import { useEventListener } from './useEventListener';

/**
 * useIsTop
 *
 * A custom React hook to track whether the page or a specific element is scrolled to the top.
 *
 * @param {number} [offset=0] - The offset in pixels to consider as "top".
 * @returns {boolean} `isTop` - Whether the page or element is currently scrolled to the top.
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import { useIsTop } from '@zl-asica/react';
 *
 * const MyComponent = () => {
 *   const isTop = useIsTop(50); // Consider 50px offset as top
 *
 *   return (
 *     <div>
 *       <p>{isTop ? "You're at the top!" : "Scroll up!"}</p>
 *       <div style={{ height: '200vh', background: 'linear-gradient(to bottom, red, blue)' }} />
 *     </div>
 *   );
 * };
 * ```
 */
export const useIsTop = (offset: number = 0): boolean => {
  const [isTop, setIsTop] = useState(false);

  const checkTop = () => {
    const { scrollTop } = document.documentElement;
    const isAtTop = scrollTop <= offset;
    setIsTop(isAtTop);
  };

  // Initialize state on component mount
  useEffect(() => {
    if (typeof globalThis !== 'undefined') {
      checkTop();
    }
  }, []); // Empty dependency array ensures it only runs on mount

  useEventListener('scroll', checkTop);
  useEventListener('resize', checkTop);

  return isTop;
};
