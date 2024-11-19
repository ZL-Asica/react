import { useState, useEffect } from 'react';

/**
 * Fetch data from an API
 * @param url - API endpoint
 * @returns data, error, loading
 */
export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(response.statusText || 'Fetch failed');
        }
        const result: T = await response.json();
        setData(result);
      } catch (error_) {
        setError(error_ instanceof Error ? error_ : new Error('Unknown error'));
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};
