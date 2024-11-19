import { useState } from 'react';

/**
 * Array state with set, push, remove, clear functions
 * @param initialArray - initial array
 * @returns object with array, set, push, remove, clear functions
 */
export const useArray = <T>(initialArray: T[] = []) => {
  const [array, setArray] = useState(initialArray);

  return {
    array,
    set: setArray,
    push: (item: T) => setArray((a) => [...a, item]),
    remove: (index: number) =>
      setArray((a) => a.filter((_, index_) => index_ !== index)),
    clear: () => setArray([]),
  };
};
