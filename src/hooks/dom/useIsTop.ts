'use client';

import { useEffect, useState } from 'react';

import { useEventListener } from './useEventListener';

/**
 * useIsTop
 *
 * A custom React hook to track whether a specific element (or the page) is scrolled to the top.
 * It supports global targets (e.g., `window` or `document.documentElement`) and specific `HTMLElement`s.
 * If the target element does not have a `scrollTop` property, the hook defaults `isTop` to `true`.
 *
 * @param {number} [offset=0] - The offset in pixels to consider as "top". If the scroll position is within this offset, it is considered at the top.
 * @param {EventTarget | null | undefined} [element=globalThis] - The target element to observe scroll position. Defaults to `globalThis` (commonly `window`).
 * @param {number} [debounce=0] - The debounce delay in milliseconds for scroll and resize events. Defaults to `0` (no debounce).
 * @param {boolean} [initialValue=false] - The initial value for `isTop`. Defaults to `false`.
 * @returns {boolean} `isTop` - Whether the target element is currently scrolled to the top.
 *
 * @example
 * Example: Observing the scroll position of the page
 * ```tsx
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
 *
 * @example
 * Example: Observing the scroll position of a specific container
 * ```tsx
 * import { useRef } from 'react';
 * import { useIsTop } from '@zl-asica/react';
 *
 * const MyComponent = () => {
 *   const containerRef = useRef<HTMLDivElement | null>(null);
 *   const isTop = useIsTop(100, containerRef.current); // Observe a specific container
 *
 *   return (
 *     <div>
 *       <p>{isTop ? "Container is at the top!" : "Scroll the container!"}</p>
 *       <div
 *         ref={containerRef}
 *         style={{
 *           height: '200px',
 *           overflowY: 'scroll',
 *           background: 'lightgray',
 *         }}
 *       >
 *         <div style={{ height: '500px' }}>Scrollable content</div>
 *       </div>
 *     </div>
 *   );
 * };
 * ```
 *
 * @example
 * Example: Handling targets without scrollTop
 * ```tsx
 * import { useIsTop } from '@zl-asica/react';
 *
 * const MyComponent = () => {
 *   const mockElement = {
 *     // A mock target without scrollTop
 *     addEventListener: () => {},
 *     removeEventListener: () => {},
 *   };
 *
 *   const isTop = useIsTop(50, mockElement as EventTarget);
 *
 *   return <div>{isTop ? "Mock target is at the top!" : "Scroll down!"}</div>;
 * };
 * ```
 */

export const useIsTop = (
  offset: number = 0,
  element: EventTarget | null | undefined = globalThis,
  debounce: number = 0,
  initialValue: boolean = false
): boolean => {
  const [isTop, setIsTop] = useState(initialValue);

  const checkTop = () => {
    const target =
      element instanceof HTMLElement ? element : document.documentElement;

    // Check if the target has a scrollTop property
    // If not, set isTop to true
    const scrollTop = target.scrollTop || 0;
    setIsTop(scrollTop <= offset);
  };

  useEffect(() => {
    if (typeof globalThis !== 'undefined') {
      checkTop();
    }
  }, [element, offset]);

  // Attach scroll and resize listeners
  useEventListener('scroll', checkTop, element, debounce);
  useEventListener('resize', checkTop, element, debounce);

  return isTop;
};
