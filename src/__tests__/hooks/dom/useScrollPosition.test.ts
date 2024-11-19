import { renderHook, act } from '@testing-library/react';

import { useScrollPosition } from '@/hooks/dom';

describe('useScrollPosition', () => {
  beforeEach(() => {
    // Initialize scrollY
    Object.defineProperty(globalThis, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    });
  });

  it('should update scroll position on window scroll', () => {
    const { result } = renderHook(() => useScrollPosition());

    // Check initial value
    expect(result.current).toBe(0);

    // Simulate scroll
    act(() => {
      window.scrollY = 100;
      globalThis.dispatchEvent(new Event('scroll'));
    });

    // Check update
    expect(result.current).toBe(100);

    // Simulate another scroll
    act(() => {
      window.scrollY = 200;
      globalThis.dispatchEvent(new Event('scroll'));
    });

    // Check update
    expect(result.current).toBe(200);
  });
});
