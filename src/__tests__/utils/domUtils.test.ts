import {
  getScrollPosition,
  copyToClipboard,
  pasteFromClipboard,
  backToTop,
} from '@/utils/domUtils';

describe('getScrollPosition', () => {
  it('should return the current scroll position using window.scrollX and window.scrollY', () => {
    Object.defineProperty(globalThis, 'scrollX', {
      value: 100,
      writable: true,
    });
    Object.defineProperty(globalThis, 'scrollY', {
      value: 200,
      writable: true,
    });

    const position = getScrollPosition();
    expect(position).toEqual({ x: 100, y: 200 });
  });

  it('should fall back to document.documentElement.scrollLeft and scrollTop', () => {
    Object.defineProperty(globalThis, 'scrollX', {
      value: undefined,
      writable: true,
    });
    Object.defineProperty(globalThis, 'scrollY', {
      value: undefined,
      writable: true,
    });
    Object.defineProperty(document.documentElement, 'scrollLeft', {
      value: 150,
      writable: true,
    });
    Object.defineProperty(document.documentElement, 'scrollTop', {
      value: 250,
      writable: true,
    });

    const position = getScrollPosition();
    expect(position).toEqual({ x: 150, y: 250 });
  });

  it('should fall back to document.body.scrollLeft and scrollTop', () => {
    Object.defineProperty(globalThis, 'scrollX', {
      value: undefined,
      writable: true,
    });
    Object.defineProperty(globalThis, 'scrollY', {
      value: undefined,
      writable: true,
    });
    Object.defineProperty(document.documentElement, 'scrollLeft', {
      value: undefined,
      writable: true,
    });
    Object.defineProperty(document.documentElement, 'scrollTop', {
      value: undefined,
      writable: true,
    });
    Object.defineProperty(document.body, 'scrollLeft', {
      value: 300,
      writable: true,
    });
    Object.defineProperty(document.body, 'scrollTop', {
      value: 400,
      writable: true,
    });

    const position = getScrollPosition();
    expect(position).toEqual({ x: 300, y: 400 });
  });

  it('should return {x: 0, y: 0} when all scroll positions are undefined', () => {
    Object.defineProperty(globalThis, 'scrollX', {
      value: undefined,
      writable: true,
    });
    Object.defineProperty(globalThis, 'scrollY', {
      value: undefined,
      writable: true,
    });
    Object.defineProperty(document.documentElement, 'scrollLeft', {
      value: undefined,
      writable: true,
    });
    Object.defineProperty(document.documentElement, 'scrollTop', {
      value: undefined,
      writable: true,
    });
    Object.defineProperty(document.body, 'scrollLeft', {
      value: undefined,
      writable: true,
    });
    Object.defineProperty(document.body, 'scrollTop', {
      value: undefined,
      writable: true,
    });

    const position = getScrollPosition();
    expect(position).toEqual({ x: 0, y: 0 });
  });

  it('should handle the case where document.documentElement is null', () => {
    Object.defineProperty(globalThis, 'scrollX', {
      value: 100,
      writable: true,
    });
    Object.defineProperty(globalThis, 'scrollY', {
      value: 200,
      writable: true,
    });
    Object.defineProperty(document, 'documentElement', { value: null });

    const position = getScrollPosition();
    expect(position).toEqual({ x: 100, y: 200 });
  });
});

describe('copyToClipboard', () => {
  it('should copy text to the clipboard', async () => {
    const text = 'Hello, World!';
    const writeText = vi.fn().mockResolvedValue(null);

    Object.assign(navigator, {
      clipboard: { writeText },
    });

    const copied = await copyToClipboard(text);
    expect(writeText).toHaveBeenCalledWith(text);
    expect(copied).toBe(true);
  });

  it('should handle errors when copying to the clipboard', async () => {
    const text = 'Hello, World!';
    const writeText = vi.fn().mockRejectedValue(new Error('Failed to copy'));

    Object.assign(navigator, {
      clipboard: { writeText },
    });

    const copied = await copyToClipboard(text);
    expect(writeText).toHaveBeenCalledWith(text);
    expect(copied).toBe(false);
  });

  it('should run a callback after copying to the clipboard', async () => {
    const text = 'Hello, World!';
    const writeText = vi.fn().mockResolvedValue(null);
    const callback = vi.fn();

    Object.assign(navigator, {
      clipboard: { writeText },
    });

    await copyToClipboard(text, callback);
    expect(writeText).toHaveBeenCalledWith(text);
    expect(callback).toHaveBeenCalled();
  });
});

describe('pasteFromClipboard', () => {
  it('should paste text from the clipboard', async () => {
    const readText = vi.fn().mockResolvedValue('Hello, World!');

    Object.assign(navigator, {
      clipboard: { readText },
    });

    const text = await pasteFromClipboard();
    expect(readText).toHaveBeenCalled();
    expect(text).toBe('Hello, World!');
  });

  it('should handle errors when pasting from the clipboard', async () => {
    const readText = vi.fn().mockRejectedValue(new Error('Failed to paste'));

    Object.assign(navigator, {
      clipboard: { readText },
    });

    const text = await pasteFromClipboard();
    expect(readText).toHaveBeenCalled();
    expect(text).toBe('');
  });
});

describe('backToTop', () => {
  it('should scroll to the top of the page', () => {
    const scrollTo = vi.fn();
    Object.defineProperty(globalThis, 'scrollTo', { value: scrollTo });

    backToTop();
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('should scroll to the top of the page with custom options', () => {
    const scrollTo = vi.fn();
    Object.defineProperty(globalThis, 'scrollTo', { value: scrollTo });

    backToTop(100, 'auto');
    expect(scrollTo).toHaveBeenCalledWith({ top: 100, behavior: 'auto' });
  });
});
