import { renderHook, act } from '@testing-library/react';

import { useIsBottom } from '@/hooks/dom';

describe('useIsBottom', () => {
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
      value: 800,
      writable: true,
    });
  });

  it('should return false when not at the bottom', () => {
    const { result } = renderHook(() => useIsBottom(50));
    expect(result.current).toBe(false);
  });

  it('should return true when scrolled to the bottom', () => {
    const { result } = renderHook(() => useIsBottom(50));

    act(() => {
      document.documentElement.scrollTop = 950; // Close enough with offset
      globalThis.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(true);
  });

  it('should handle offset correctly', () => {
    const { result } = renderHook(() => useIsBottom(100));

    act(() => {
      document.documentElement.scrollTop = 890; // Near bottom but not within offset
      globalThis.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(false);

    act(() => {
      document.documentElement.scrollTop = 900; // Exactly at offset
      globalThis.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(true);
  });
});
