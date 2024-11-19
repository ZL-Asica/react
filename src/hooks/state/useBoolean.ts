import { useState, useCallback } from 'react';

/**
 * Boolean state with toggle and set functions
 * @param initialValue - initial value
 * @returns object with value, toggle, setTrue, setFalse functions
 */
export const useBoolean = (initialValue: boolean = false) => {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue((v) => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  return { value, toggle, setTrue, setFalse };
};
