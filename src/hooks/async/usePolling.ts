import { useEffect, useRef } from 'react';

/**
 * Polling
 * Use this hook to execute a callback function at a fixed interval.
 * e.g. usePolling(() => console.log('Polling'), 1000).
 * @param callback - function to execute
 * @param delay - interval in milliseconds (null to stop polling)
 */
export const usePolling = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef(callback);

  // Update saved callback if it changes
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    // If delay is null, stop polling
    if (delay === null) {
      return;
    }

    // Create the interval
    const id = setInterval(() => {
      savedCallback.current();
    }, delay);

    // Clear the interval on cleanup or delay change
    return () => clearInterval(id);
  }, [delay]);
};
