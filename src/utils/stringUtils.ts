/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} input - The string to capitalize.
 * @returns {string} The capitalized string. Returns an empty string if the input is empty.
 *
 * @example
 * ```tsx
 * capitalize('hello'); // 'Hello'
 * capitalize('Hello'); // 'Hello'
 * capitalize(''); // ''
 * ```
 */
export const capitalize = (input: string): string => {
  if (!input) return '';
  return input.charAt(0).toUpperCase() + input.slice(1);
};

/**
 * Converts a camelCase string to kebab-case.
 *
 * @param {string} input - The camelCase string.
 * @returns {string} The kebab-case string.
 *
 * @example
 * ```tsx
 * camelCaseToKebabCase('camelCaseString'); // 'camel-case-string'
 * camelCaseToKebabCase('anotherExample'); // 'another-example'
 * ```
 */
export const camelCaseToKebabCase = (input: string): string => {
  return input.replaceAll(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

/**
 * Truncates a string to a specified length, appending '...' if truncated.
 *
 * @param {string} input - The string to truncate.
 * @param {number} maxLength - The maximum length of the truncated string.
 * @returns {string} The truncated string. If `maxLength` is 0 or negative, returns an empty string.
 *
 * @example
 * ```tsx
 * truncate('This is a long string', 10); // 'This is a...'
 * truncate('Short', 10); // 'Short'
 * truncate('', 5); // ''
 * ```
 */
export const truncate = (input: string, maxLength: number): string => {
  if (maxLength <= 0 || !input) return '';
  return input.length > maxLength
    ? `${input.slice(0, maxLength).trim()}...`
    : input;
};

/**
 * Converts a string to snake_case.
 *
 * @param {string} input - The string to convert.
 * @returns {string} The snake_case string.
 *
 * @example
 * ```tsx
 * toSnakeCase('camelCaseString'); // 'camel_case_string'
 * toSnakeCase('anotherExample'); // 'another_example'
 * ```
 */
export const toSnakeCase = (input: string): string => {
  return input.replaceAll(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
};

/**
 * Reverses the characters in a string.
 *
 * @param {string} input - The string to reverse.
 * @returns {string} The reversed string.
 *
 * @example
 * ```tsx
 * reverseString('hello'); // 'olleh'
 * reverseString(''); // ''
 * ```
 */
export const reverseString = (input: string): string => {
  return [...input].reverse().join('');
};

/**
 * Removes special characters from a string, preserving letters, numbers, and spaces.
 *
 * @param {string} input - The string to clean.
 * @returns {string} The cleaned string containing only letters, numbers, and spaces.
 *
 * @example
 * ```tsx
 * removeSpecialCharacters('Hello, World! 123'); // 'Hello World 123'
 * removeSpecialCharacters('你好，世界！123'); // '你好世界123'
 * removeSpecialCharacters('@#%*&$'); // ''
 * ```
 */
export const removeSpecialCharacters = (input: string): string => {
  // Regex explanation:
  // \p{L} matches any kind of letter from any language
  // \p{N} matches any kind of numeric character
  // \s matches any kind of whitespace
  return input.replaceAll(/[^\p{L}\p{N}\s]/gu, '');
};
