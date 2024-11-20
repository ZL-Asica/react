import { useEffect } from 'react';

/**
 * useEventListener
 *
 * A custom React hook for attaching an event listener to a target element with automatic cleanup.
 * It ensures that the event listener is removed when the component unmounts or dependencies change.
 *
 * @param {string} event - The name of the event to listen for (e.g., 'click', 'keydown').
 * @param {(event: T) => void} handler - The callback function that will handle the event. Receives the event object as a parameter.
 * @param {EventTarget | null | undefined} [element=window] - The target element to attach the event listener to. Defaults to `window` if not provided.
 * @template T - The type of the event object.
 * @example
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
 */

export const useEventListener = <T extends Event>(
  event: string,
  handler: (event: T) => void,
  element?: EventTarget | null
): void => {
  useEffect(() => {
    if (!element) return;

    const eventHandler = (event_: Event) => handler(event_ as T); // Type cast to match generic event type
    element.addEventListener(event, eventHandler);
    return () => {
      element.removeEventListener(event, eventHandler);
    };
  }, [event, handler, element]);
};
