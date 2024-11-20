/**
 * Retrieves the current scroll position of the window.
 *
 * This function calculates the horizontal (`x`) and vertical (`y`) scroll positions
 * using `window.scrollX`, `window.scrollY`, or fallback methods for older browsers.
 *
 * @returns {{ x: number; y: number }} An object containing the `x` and `y` scroll positions.
 *
 * @example
 * ```tsx
 * const { x, y } = getScrollPosition();
 * console.log(`Scroll X: ${x}, Scroll Y: ${y}`);
 * ```
 */
export const getScrollPosition = (): { x: number; y: number } => {
  const scrollX =
    window.scrollX ??
    document.documentElement?.scrollLeft ??
    document.body?.scrollLeft ??
    0;

  const scrollY =
    window.scrollY ??
    document.documentElement?.scrollTop ??
    document.body?.scrollTop ??
    0;

  return { x: scrollX, y: scrollY };
};

/**
 * Copies the given text to the clipboard.
 *
 * This function uses the Clipboard API to copy the specified text to the clipboard.
 * It supports an optional callback function that is executed after the text is copied.
 *
 * @param {string} text - The text to copy to the clipboard.
 * @param {() => void} [callback] - An optional callback to run after the text is copied.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the copy was successful, or `false` otherwise.
 *
 * @example
 * ```tsx
 * copyToClipboard('Hello, world!', () => {
 *   console.log('Text copied!');
 * });
 * ```
 * @example
 * ```tsx
 * const success = await copyToClipboard('Hello, world!');
 * console.log(success ? 'Copied!' : 'Failed to copy!');
 * ```
 */
export const copyToClipboard = async (
  text: string,
  callback?: () => void
): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    if (callback) callback();
    return true;
  } catch {
    return false;
  }
};

/**
 * Retrieves text from the clipboard.
 *
 * This function uses the Clipboard API to read text from the clipboard. If an error
 * occurs, it returns an empty string.
 *
 * @returns {Promise<string>} A promise that resolves to the text from the clipboard, or an empty string if an error occurs.
 *
 * @example
 * ```tsx
 * const text = await pasteFromClipboard();
 * console.log(text);
 * ```
 */
export const pasteFromClipboard = async (): Promise<string> => {
  try {
    return await navigator.clipboard.readText();
  } catch {
    return '';
  }
};

/**
 * Scrolls to the top of the page or a specified vertical position.
 *
 * This function uses `window.scrollTo` to scroll to a specified vertical position with
 * a configurable scroll behavior (`auto` or `smooth`).
 *
 * @param {number} [top=0] - The vertical scroll position to scroll to (default is `0`).
 * @param {'auto' | 'smooth'} [behavior='smooth'] - The scroll behavior (default is `'smooth'`).
 *
 * @example
 * ```tsx
 * // Smooth scroll to the top of the page
 * backToTop();
 *
 * // Immediate scroll to 100px from the top
 * backToTop(100, 'auto');
 * ```
 */
export const backToTop = (
  top: number = 0,
  behavior: 'auto' | 'smooth' = 'smooth'
): void => {
  window.scrollTo({ top, behavior });
};
