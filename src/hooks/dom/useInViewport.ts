'use client';

import { useState, useEffect } from 'react';
import type { RefObject } from 'react';

/**
 * useInViewport
 *
 * A custom React hook to check if a DOM element is within the viewport.
 * Allows specifying an offset to consider elements near the edge of the viewport as "visible".
 *
 * @param {RefObject<HTMLElement>} ref - A React ref object pointing to the target element.
 * @param {number} [offset=0] - Offset in pixels to extend the viewport boundary.
 * @returns {boolean} `isVisible` - Whether the element is within the viewport (considering offset).
 *
 * @example
 * ```tsx
 * import { useRef } from 'react';
 * import { useInViewport } from '@zl-asica/react';
 *
 * const MyComponent = () => {
 *   const ref = useRef<HTMLDivElement>(null);
 *   const isVisible = useInViewport(ref, 50); // 50px offset
 *
 *   return (
 *     <div>
 *       <div style={{ height: '150vh', background: 'lightgray' }}>Scroll down</div>
 *       <div
 *         ref={ref}
 *         style={{
 *           height: '100px',
 *           backgroundColor: isVisible ? 'green' : 'red',
 *         }}
 *       >
 *         {isVisible ? 'Visible' : 'Not Visible'}
 *       </div>
 *       <div style={{ height: '150vh', background: 'lightgray' }} />
 *     </div>
 *   );
 * };
 * ```
 */
export const useInViewport = (
  reference: RefObject<HTMLElement>,
  offset: number = 0
): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  const checkVisibility = () => {
    if (!reference.current) return;

    const rect = reference.current.getBoundingClientRect();
    const inViewport =
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) +
          offset &&
      rect.bottom >= -offset &&
      rect.left <=
        (window.innerWidth || document.documentElement.clientWidth) + offset &&
      rect.right >= -offset;

    setIsVisible(inViewport);
  };

  useEffect(() => {
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);

    // Initial check
    checkVisibility();

    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, [reference, offset]);

  return isVisible;
};
