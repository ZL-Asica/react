import { renderHook, act } from '@testing-library/react';

import { useIsTop } from '@/hooks/dom';

describe('useIsTop', () => {
  beforeEach(() => {
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 2000,
      writable: true,
    });
    Object.defineProperty(document.documentElement, 'clientHeight', {
      value: 1000,
      writable: true,
    });
    Object.defineProperty(document.documentElement, 'scrollTop', {
      value: 100, // Start with some scroll offset
      writable: true,
    });
  });

  it('should return false when not at the top', () => {
    const { result } = renderHook(() => useIsTop(50));

    expect(result.current).toBe(false);
  });

  it('should return true when scrolled to the top', () => {
    const { result } = renderHook(() => useIsTop(50));

    act(() => {
      document.documentElement.scrollTop = 40; // Within 50px offset
      globalThis.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(true);
  });

  it('should handle offset correctly', () => {
    const { result } = renderHook(() => useIsTop(100));

    act(() => {
      document.documentElement.scrollTop = 110; // 10px away from top with 100px offset
      globalThis.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(false);

    act(() => {
      document.documentElement.scrollTop = 90; // Exactly at the offset
      globalThis.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(true);
  });

  it('should initialize isTop state on mount', () => {
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 0 });

    const { result } = renderHook(() => useIsTop());
    expect(result.current).toBe(true);
  });
});
