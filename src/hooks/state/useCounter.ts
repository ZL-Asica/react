import { useState, useCallback } from 'react';

/**
 * Counter hook
 * @param initialValue - initial value
 * @returns count, increment, decrement, reset - counter value, increment function, decrement function, reset function
 */
export const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => setCount((c) => c + 1), []);
  const decrement = useCallback(() => setCount((c) => c - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  return { count, increment, decrement, reset };
};
