import { useEffect } from 'react';

/**
 * Event listener with cleanup
 * Use this hook to add an event listener to the target element
 * e.g. useEventListener('click', handleClick, buttonRef.current)
 * @param event - event name
 * @param handler - event handler
 * @param element - event target
 */
export const useEventListener = (
  event: string,
  handler: (event: Event) => void,
  element?: EventTarget | null
) => {
  useEffect(() => {
    if (!element) return;

    element.addEventListener(event, handler);
    return () => {
      element.removeEventListener(event, handler);
    };
  }, [event, handler, element]);
};
