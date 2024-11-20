import { useState } from 'react';

import { useEventListener } from './useEventListener';

/**
 * useKeyPress
 *
 * A custom React hook to track whether a specific key is pressed.
 *
 * @param {string} targetKey - The key to detect (e.g., 'Enter', 'Escape').
 * @returns {boolean} `true` if the key is pressed, `false` otherwise.
 * @example
 * ```tsx
 * import { useKeyPress } from '@zl-asica/react';
 *
 * const MyComponent = () => {
 *  const isEnterPressed = useKeyPress('Enter');
 *
 * return (
 *  <div>
 *   <p>Press the Enter key: {isEnterPressed ? 'Yes' : 'No'}</p>
 * </div>
 * );
 */
export const useKeyPress = (targetKey: string): boolean => {
  const [keyPressed, setKeyPressed] = useState(false);

  const downHandler = (event: KeyboardEvent) => {
    if (event.key === targetKey) {
      setKeyPressed(true);
    }
  };

  const upHandler = (event: KeyboardEvent) => {
    if (event.key === targetKey) {
      setKeyPressed(false);
    }
  };

  useEventListener('keydown', downHandler, globalThis);
  useEventListener('keyup', upHandler, globalThis);

  return keyPressed;
};
