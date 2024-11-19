import { renderHook, waitFor } from '@testing-library/react';

import { useFetch } from '@/hooks/async';

globalThis.fetch = vi.fn();

describe('useFetch', () => {
  it('should fetch data successfully', async () => {
    // @ts-expect-error: Unreachable code error
    (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ data: 'test data' }),
    });

    const { result } = renderHook(() =>
      useFetch('https://api.example.com/data')
    );

    expect(result.current.loading).toBe(true);

    // 等待加载完成
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual({ data: 'test data' });
    expect(result.current.error).toBe(null);
  });

  it('should handle fetch error', async () => {
    // @ts-expect-error: Unreachable code error
    (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      json: async () => ({}),
    });

    const { result } = renderHook(() =>
      useFetch('https://api.example.com/error')
    );

    expect(result.current.loading).toBe(true);

    // 等待加载完成
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toEqual(new Error('Internal Server Error'));
  });

  it('should handle network error', async () => {
    // @ts-expect-error: Unreachable code error
    (globalThis.fetch as jest.Mock).mockRejectedValueOnce(
      new Error('Network Error')
    );

    const { result } = renderHook(() =>
      useFetch('https://api.example.com/network-error')
    );

    expect(result.current.loading).toBe(true);

    // 等待加载完成
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toEqual(new Error('Network Error'));
  });

  it('should handle unknown error that is not an instance of Error', async () => {
    class SomeCustomError {
      constructor(public message: string = '') {}
    }
    // @ts-expect-error: Unreachable code error
    (globalThis.fetch as jest.Mock).mockRejectedValueOnce(
      new SomeCustomError('Custom Error')
    );

    const { result } = renderHook(() =>
      useFetch('https://api.example.com/network-error')
    );

    expect(result.current.loading).toBe(true);

    // 等待加载完成
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toEqual(new Error('Unknown error'));
  });

  it('should return Fetch failed Error when code is not ok and statusTex is null', async () => {
    // @ts-expect-error: Unreachable code error
    (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({}),
    });

    const { result } = renderHook(() =>
      useFetch('https://api.example.com/error')
    );

    expect(result.current.loading).toBe(true);

    // 等待加载完成
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toEqual(new Error('Fetch failed'));
  });
});
