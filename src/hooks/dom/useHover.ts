import { useState, useCallback } from 'react';
import type { RefObject } from 'react';

import { useEventListener } from './useEventListener';

/**
 * Detect hover state with ref
 * e.g. const [ref, isHovered] = useHover<HTMLDivElement>()
 * @param element - A ref object pointing to the target element
 * @returns isHovered - Whether the element is hovered
 */
export const useHover = <T extends HTMLElement = HTMLElement>(
  element: RefObject<T>
): boolean => {
  const [isHovered, setHovered] = useState(false);

  const handleMouseOver = useCallback(() => setHovered(true), []);
  const handleMouseOut = useCallback(() => setHovered(false), []);

  useEventListener('mouseover', handleMouseOver, element.current);
  useEventListener('mouseout', handleMouseOut, element.current);

  return isHovered;
};
