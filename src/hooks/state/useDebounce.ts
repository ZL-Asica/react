import { useState, useEffect } from 'react';

/**
 * Debounce hook
 * @param value - input value
 * @param delay - delays in ms (default 200 - 0.2s)
 */
export const useDebounce = <T>(value: T, delay: number = 200): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
