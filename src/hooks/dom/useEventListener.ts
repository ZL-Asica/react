'use client';

import { useEffect, useRef } from 'react';

import { useDebouncedCallback } from '@/hooks/state';

/**
 * useEventListener
 *
 * A custom React hook for attaching an event listener to a target element with automatic cleanup.
 * This hook is useful for adding event listeners to DOM elements or the global `globalThis`/`document` object.
 * It also supports optional debouncing to limit how often the handler is invoked.
 *
 * @param {string} event - The name of the event to listen for (e.g., 'click', 'keydown').
 * @param {(event: T) => void} handler - The callback function to handle the event. Receives the event object as a parameter.
 * @param {EventTarget | null | undefined} [element=globalThis] - The target element to attach the event listener to. Defaults to `globalThis` if not provided.
 * @param {number} [debounce=0] - The debounce delay in milliseconds. Defaults to 0ms (no debounce).
 * @template T - The type of the event object.
 *
 * @example
 * Example: Adding a click event listener to a button with no debounce
 * ```tsx
 * import { useRef } from 'react';
 * import { useEventListener } from '@zl-asica/react';
 *
 * const MyComponent = () => {
 *   const buttonRef = useRef<HTMLButtonElement | null>(null);
 *
 *   const handleClick = (event: MouseEvent) => {
 *     console.log('Button clicked!', event);
 *   };
 *
 *   useEventListener('click', handleClick, buttonRef.current);
 *
 *   return <button ref={buttonRef}>Click Me</button>;
 * };
 * ```
 *
 * @example
 * Example: Adding a keydown listener to the document with debounce
 * ```tsx
 * import { useEventListener } from '@zl-asica/react';
 *
 * const MyComponent = () => {
 *   const handleKeyDown = (event: KeyboardEvent) => {
 *     console.log('Key pressed:', event.key);
 *   };
 *
 *   useEventListener('keydown', handleKeyDown, document, 300); // Debounced by 300ms
 *
 *   return <div>Press any key!</div>;
 * };
 * ```
 */
export const useEventListener = <T extends Event>(
  event: string,
  handler: (event: T) => void,
  element: EventTarget | null | undefined = globalThis,
  debounce: number = 0
): void => {
  const debouncedCallbackReference = useRef<(event: T) => void>();

  // Update the debounced callback when the handler or debounce delay changes
  useEffect(() => {
    debouncedCallbackReference.current =
      debounce === 0 ? handler : useDebouncedCallback(handler, debounce);
  }, [handler, debounce]);

  useEffect(() => {
    if (!element) return;

    const eventHandler = (event_: Event) =>
      debouncedCallbackReference.current?.(event_ as T); // Safe access with optional chaining
    element.addEventListener(event, eventHandler);

    return () => {
      element.removeEventListener(event, eventHandler);
    };
  }, [event, element]);
};
