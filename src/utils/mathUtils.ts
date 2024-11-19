/**
 * Returns a random integer between min and max
 * @param min - minimum value
 * @param max - maximum value
 * @returns - random integer between min and max
 */
export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Returns a random float between min and max
 * @param min - minimum value
 * @param max - maximum value
 * @returns - random float between min and max
 */
export const randomFloat = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

/**
 * Clamps a number between min and max
 * @param value - number to clamp
 * @param min - minimum value
 * @param max - maximum value
 * @returns - clamped number
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};
