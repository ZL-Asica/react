import { useEffect } from 'react';

/**
 * Click outside event listener
 * Use this hook to detect clicks outside the target element
 * e.g. useClickOutside(ref, () => setOpen(false))
 * @param ref - target element reference
 * @param handler - event handler
 * @returns void
 */
export const useClickOutside = (
  reference: React.RefObject<HTMLElement>,
  handler: () => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        !reference.current ||
        reference.current.contains(event.target as Node)
      ) {
        return;
      }
      handler();
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [reference, handler]);
};
