/**
 * Get the value of a nested property in an object
 * @param obj - object to clone
 * @returns - deep clone of the object
 */
export const deepClone = <T>(object: T): T => {
  return structuredClone(object);
};

/**
 * Check if a value is an object
 * @param value - value to check
 * @returns - true if the value is an object
 */
export const isObject = (
  value: unknown = null
): value is Record<string, unknown> => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

/**
 * Merge two objects deeply
 * @param obj1 - first object
 * @param obj2 - second object
 * @returns - merged object
 */
export const mergeObjects = <
  T extends Record<string, unknown>,
  U extends Record<string, unknown>,
>(
  object1: T,
  object2: U
): T & U => {
  const result = { ...object1 } as T & U;

  for (const key in object2) {
    if (isObject(object2[key]) && isObject(object1[key])) {
      result[key as keyof U] = mergeObjects(
        object1[key as keyof T] as Record<string, unknown>,
        object2[key as keyof U] as Record<string, unknown>
      ) as unknown as (T & U)[keyof U];
    } else {
      result[key as keyof U] = object2[key as keyof U] as (T & U)[keyof U];
    }
  }

  return result;
};
