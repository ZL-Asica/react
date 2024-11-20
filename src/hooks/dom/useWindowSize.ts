import { useState } from 'react';

import { useEventListener } from './useEventListener'; // 假设它在同目录下

/**
 * useWindowSize
 *
 * A custom React hook to track the current window size.
 * Automatically updates whenever the window is resized.
 *
 * @returns {{ width: number; height: number }} An object containing the current window width and height.
 *
 * @example
 * ```tsx
 * import { useWindowSize } from '@zl-asica/react';
 *
 * const MyComponent = () => {
 *   const { width, height } = useWindowSize();
 *
 *   return (
 *     <div>
 *       <p>Width: {width}px</p>
 *       <p>Height: {height}px</p>
 *     </div>
 *   );
 * };
 * ```
 */
export const useWindowSize = (): { width: number; height: number } => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Use our custom event listener hook for the resize event
  useEventListener(
    'resize',
    () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    },
    globalThis
  );

  return size;
};
