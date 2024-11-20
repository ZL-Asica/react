import { useEffect, useState } from 'react';

/**
 * useIsBottom
 *
 * A custom React hook to track whether the page or a specific element is scrolled to the bottom.
 *
 * @param {number} [offset=0] - The offset in pixels to consider as "bottom".
 * @returns {boolean} `isBottom` - Whether the page or element is currently scrolled to the bottom.
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import { useIsBottom } from '@zl-asica/react';
 *
 * const MyComponent = () => {
 *   const isBottom = useIsBottom(50); // Consider 50px offset as bottom
 *
 *   return (
 *     <div>
 *       <p>{isBottom ? "You're at the bottom!" : "Keep scrolling!"}</p>
 *       <div style={{ height: '200vh', background: 'linear-gradient(to bottom, red, blue)' }} />
 *     </div>
 *   );
 * };
 * ```
 */
export const useIsBottom = (offset: number = 0): boolean => {
  const [isBottom, setIsBottom] = useState(false);

  const checkBottom = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - offset;
    setIsBottom(isAtBottom);
  };

  useEffect(() => {
    window.addEventListener('scroll', checkBottom);
    window.addEventListener('resize', checkBottom);

    // Initial check
    checkBottom();

    return () => {
      window.removeEventListener('scroll', checkBottom);
      window.removeEventListener('resize', checkBottom);
    };
  }, [offset]);

  return isBottom;
};
