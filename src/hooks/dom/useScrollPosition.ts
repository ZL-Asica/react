'use client';

import { useEffect, useState } from 'react';

import { useEventListener } from './useEventListener';

/**
 * useScrollPosition
 *
 * A custom React hook to track the vertical scroll position of a specific element or the window.
 * Automatically updates whenever the user scrolls.
 *
 * @param {HTMLElement | null | undefined ｜ typeof globalThis} [element=undefined] - The target element to track. Defaults to `globalThis` which is window (global scroll position).
 * @param {boolean} [percentage=false] - Whether to return the scroll position as a percentage. Defaults to `false`.
 * @param {number} [debounce=0] - The debounce delay in milliseconds for the scroll event. Defaults to 0 (no debounce).
 * @param {number} [initialValue=0] - The initial scroll position value.
 * @returns {number} The current vertical scroll position.
 *
 * @example
 * Example: Tracking the scroll position of the page
 * ```tsx
 * import { useScrollPosition } from '@zl-asica/react';
 *
 * const MyComponent = () => {
 *   const scrollPosition = useScrollPosition();
 *
 *   return <div>Scroll Position: {scrollPosition}</div>;
 * };
 * ```
 *
 * @example
 * Example: Tracking the scroll position of a specific container
 * ```tsx
 * import { useRef } from 'react';
 * import { useScrollPosition } from '@zl-asica/react';
 *
 * const MyComponent = () => {
 *   const containerRef = useRef<HTMLDivElement | null>(null);
 *   const scrollPosition = useScrollPosition(containerRef.current);
 *
 *   return (
 *     <div ref={containerRef} style={{ height: '200px', overflowY: 'scroll' }}>
 *       <div style={{ height: '500px' }}>Content</div>
 *       <div>Scroll Position: {scrollPosition}</div>
 *     </div>
 *   );
 * };
 * ```
 */
export const useScrollPosition = (
  element: HTMLElement | null | undefined | typeof globalThis = globalThis,
  percentage: boolean = false,
  debounce: number = 0,
  initialValue: number = 0
): number => {
  const [scrollPosition, setScrollPosition] = useState(initialValue);

  const updateScrollPosition = () => {
    if (element === globalThis) {
      const { scrollHeight, clientHeight } = document.documentElement;
      const scrollableHeight = scrollHeight - clientHeight;
      const scrollY = window.scrollY || 0;

      if (percentage) {
        setScrollPosition(
          scrollableHeight === 0 ? 0 : (scrollY / scrollableHeight) * 100
        );
      } else {
        setScrollPosition(scrollY);
      }
    } else if (element instanceof HTMLElement) {
      const scrollableHeight = element.scrollHeight - element.clientHeight;

      if (percentage) {
        setScrollPosition(
          scrollableHeight === 0
            ? 0
            : (element.scrollTop / scrollableHeight) * 100
        );
      } else {
        setScrollPosition(element.scrollTop || 0);
      }
    }
  };

  useEffect(() => {
    // Initial synchronization
    if (typeof globalThis !== 'undefined') {
      updateScrollPosition();
    }
  }, [element, percentage]);

  // Attach event listener for scroll events
  useEventListener('scroll', updateScrollPosition, element, debounce);

  return Number.isNaN(scrollPosition) ? 0 : scrollPosition;
};
