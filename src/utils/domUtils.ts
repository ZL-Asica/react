/**
 * Get the scroll position of the window
 * @returns - The scroll position of the window in the x and y direction
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
 * @param text - The text to copy to the clipboard.
 * @returns A promise that resolves when the text is copied.
 */
export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error('Failed to copy:', error);
  }
};

/**
 * Retrieves text from the clipboard.
 * @returns A promise that resolves with the text from the clipboard, or an empty string if an error occurs.
 */
export const pasteFromClipboard = async (): Promise<string> => {
  try {
    return await navigator.clipboard.readText();
  } catch (error) {
    console.error('Failed to paste:', error);
    return '';
  }
};

/**
 * Scrolls to the top of the page or a specified position.
 * @param top - The vertical scroll position to scroll to (default is 0).
 * @param behavior - The scroll behavior, either 'auto' or 'smooth' (default is 'smooth').
 */
export const backToTop = (
  top: number = 0,
  behavior: 'auto' | 'smooth' = 'smooth'
): void => {
  window.scrollTo({ top, behavior });
};
