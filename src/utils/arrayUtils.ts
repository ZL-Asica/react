/**
 * Chunks an array into smaller arrays of a specified size.
 * @param array - array to chunk
 * @param size - size of each chunk
 * @returns - 2D array of chunks
 */
export const chunkArray = <T>(array: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let index = 0; index < array.length; index += size) {
    result.push(array.slice(index, index + size));
  }
  return result;
};

/**
 * Removes duplicates from an array. (with Set)
 * @param array - array to remove duplicates from
 * @returns - array with duplicates removed
 */
export const uniqueArray = <T>(array: T[]): T[] => {
  return [...new Set(array)];
};
