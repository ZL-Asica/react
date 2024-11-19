import { useState } from 'react';

/**
 * Local storage with state
 * @param key - local storage key
 * @param initialValue - initial value
 * @returns stored value and setter
 */
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const getLocalStorageValue = <T>(key: string, initialValue: T): T => {
    try {
      const item = globalThis.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(() =>
    getLocalStorageValue(key, initialValue)
  );

  const setValue = (value: T | ((value_: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      globalThis.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
};
