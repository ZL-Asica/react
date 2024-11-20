import { renderHook, act } from '@testing-library/react';

import { useScrollProgress } from '@/hooks/dom';

describe('useScrollProgress', () => {
  beforeEach(() => {
    // Mock document properties
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 2000,
      writable: true,
    });
    Object.defineProperty(document.documentElement, 'clientHeight', {
      value: 1000,
      writable: true,
    });
    Object.defineProperty(document.documentElement, 'scrollTop', {
      value: 0,
      writable: true,
    });
  });

  it('should initialize progress to 0 when the page is at the top', () => {
    const { result } = renderHook(() => useScrollProgress());

    expect(result.current).toBe(0); // No scrolling initially
  });

  it('should update progress as the user scrolls down', () => {
    const { result } = renderHook(() => useScrollProgress());

    act(() => {
      document.documentElement.scrollTop = 500; // Scroll halfway
      globalThis.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBeCloseTo(50); // Progress should be 50%
  });

  it('should return 100% when the page is fully scrolled', () => {
    const { result } = renderHook(() => useScrollProgress());

    act(() => {
      document.documentElement.scrollTop = 1000; // Fully scrolled
      globalThis.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(100); // Progress should be 100%
  });

  it('should handle cases where scrollable height is 0', () => {
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 1000,
      writable: true,
    });
    Object.defineProperty(document.documentElement, 'clientHeight', {
      value: 1000,
      writable: true,
    });

    const { result } = renderHook(() => useScrollProgress());

    expect(result.current).toBe(100); // No scrollable area, progress is 100%
  });
});
