import { chunkArray, uniqueArray } from '@/utils/arrayUtils';

describe('chunkArray', () => {
  it('should split an array into chunks of the specified size', () => {
    const array = [1, 2, 3, 4, 5];
    const chunks = chunkArray(array, 2);
    expect(chunks).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('should return an empty array if the input array is empty', () => {
    const chunks = chunkArray([], 2);
    expect(chunks).toEqual([]);
  });

  it('should handle chunk size larger than array length', () => {
    const array = [1, 2];
    const chunks = chunkArray(array, 5);
    expect(chunks).toEqual([[1, 2]]);
  });
});

describe('uniqueArray', () => {
  it('should remove duplicate elements from an array', () => {
    const array = [1, 2, 3, 2, 4, 1];
    const unique = uniqueArray(array);
    expect(unique).toEqual([1, 2, 3, 4]);
  });

  it('should return an empty array if the input array is empty', () => {
    const unique = uniqueArray([]);
    expect(unique).toEqual([]);
  });
});
