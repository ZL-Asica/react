import { useEffect, useState } from 'react';

/**
 * Intersection observer with cleanup
 * Use this hook to detect when an element enters the viewport
 * e.g. useIntersectionObserver(ref, { threshold: 0.5 })
 * @param ref
 * @param options - IntersectionObserver options (default {})
 * @returns boolean - isIntersecting
 */

export const useIntersectionObserver = (
  reference: React.RefObject<HTMLElement>,
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (!reference.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(reference.current);

    return () => {
      if (reference.current) observer.unobserve(reference.current);
      observer.disconnect();
    };
  }, [reference, options]);

  return isIntersecting;
};
