import { renderHook } from '@testing-library/react';

import { useEventListener } from '@/hooks/dom';

describe('useEventListener', () => {
  it('should attach and detach event listeners', () => {
    const element = document.createElement('div');
    const handler = vi.fn();

    const addSpy = vi.spyOn(element, 'addEventListener');
    const removeSpy = vi.spyOn(element, 'removeEventListener');

    const { unmount } = renderHook(() =>
      useEventListener('click', handler, element)
    );

    expect(addSpy).toHaveBeenCalledWith('click', handler);
    unmount();
    expect(removeSpy).toHaveBeenCalledWith('click', handler);
  });

  it('should handle null element gracefully', () => {
    const handler = vi.fn();
    const { unmount } = renderHook(() =>
      useEventListener('click', handler, null)
    );

    // No listener should be attached or removed
    expect(handler).not.toHaveBeenCalled();
    unmount();
  });
});
