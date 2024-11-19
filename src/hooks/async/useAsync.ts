import { useState, useCallback, useEffect } from 'react';

/**
 * Async hook
 * @param asyncFunction - async function to execute
 * @param immediate - Should the function be executed immediately (default true)
 * @returns execute, loading, error, result - async function, loading state, error state, result state
 */
export const useAsync = <T, E = Error>(
  asyncFunction: () => Promise<T>,
  immediate = true
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<E | null>(null);
  const [result, setResult] = useState<T | null>(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await asyncFunction();
      setResult(data);
    } catch (error_) {
      setError(error_ as E);
    } finally {
      setLoading(false);
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  return { execute, loading, error, result };
};
