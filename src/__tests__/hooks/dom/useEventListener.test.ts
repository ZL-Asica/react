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

    // Trigger the event to verify the handler is called
    const clickEvent = new MouseEvent('click');
    element.dispatchEvent(clickEvent);

    expect(handler).toHaveBeenCalledWith(clickEvent);
    expect(addSpy).toHaveBeenCalledWith('click', expect.any(Function));

    unmount();

    expect(removeSpy).toHaveBeenCalledWith('click', expect.any(Function));
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
