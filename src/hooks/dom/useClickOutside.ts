'use client';

import type { RefObject } from 'react';

import { useEventListener } from './useEventListener';

/**
 * useClickOutside
 *
 * A custom React hook that detects clicks outside the specified target element.
 * Automatically triggers the provided handler when a click occurs outside the element.
 *
 * @param {RefObject<HTMLElement | null>} reference - The reference to the target element.
 * @param {() => void} handler - The callback function to execute when a click is detected outside the element.
 *
 * @example
 * ```tsx
 * import { useRef, useState } from 'react';
 * import { useClickOutside } from '@zl-asica/react';
 *
 * const MyComponent = () => {
 *   const [isOpen, setIsOpen] = useState(false);
 *   const ref = useRef<HTMLDivElement>(null);
 *
 *   useClickOutside(ref, () => setIsOpen(false));
 *
 *   return (
 *     <div>
 *       <button onClick={() => setIsOpen(true)}>Open Menu</button>
 *       {isOpen && (
 *         <div ref={ref} style={{ border: '1px solid black', padding: '10px' }}>
 *           This is a dropdown menu. Click outside to close.
 *         </div>
 *       )}
 *     </div>
 *   );
 * };
 * ```
 */

export const useClickOutside = (
  reference: RefObject<HTMLElement | null>,
  handler: () => void
): void => {
  const listener = (event: MouseEvent | TouchEvent) => {
    if (
      !reference.current ||
      reference.current.contains(event.target as Node)
    ) {
      return;
    }
    handler();
  };

  // Use our custom event listener hook with generic type
  useEventListener('mousedown', listener);
  useEventListener('touchstart', listener);
};
