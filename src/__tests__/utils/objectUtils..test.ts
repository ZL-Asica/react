import { deepClone, isObject, mergeObjects } from '@/utils/objectUtils';

describe('deepClone', () => {
  it('should deeply clone an object', () => {
    const object = { a: 1, b: { c: 2 } };
    const cloned = deepClone(object);

    expect(cloned).toEqual(object);
    expect(cloned).not.toBe(object); // Make sure it's a deep clone
  });
});

describe('isObject', () => {
  it('should return true for objects', () => {
    expect(isObject({})).toBe(true);
    expect(isObject({ a: 1 })).toBe(true);
  });

  it('should return false for non-objects', () => {
    expect(isObject()).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject('')).toBe(false);
    expect(isObject(1)).toBe(false);
    expect(isObject([])).toBe(false);
  });
});

describe('mergeObjects', () => {
  it('should merge two objects deeply', () => {
    const object1 = { a: 1, b: { c: 2 } };
    const object2 = { b: { d: 3 }, e: 4 };

    const result = mergeObjects(object1, object2);
    expect(result).toEqual({
      a: 1,
      b: { c: 2, d: 3 },
      e: 4,
    });
  });

  it('should not mutate the original objects', () => {
    const object1 = { a: 1 };
    const object2 = { b: 2 };

    const result = mergeObjects(object1, object2);
    expect(result).not.toBe(object1);
    expect(result).not.toBe(object2);
  });
});
