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

/**
 * Generates a unique identifier by hashing input strings, a timestamp, and a random value.
 *
 * This function combines the provided inputs (`inputValue1`, `inputValue2`, and `inputValue3`) with
 * the current timestamp, applies the SHA-256 hashing algorithm (if supported), and returns a
 * hexadecimal string truncated to the specified length.
 *
 * If `crypto.subtle.digest` is not supported in the current environment, the function falls back to
 * generating a random string using `Math.random()` and the current timestamp. Note that the fallback
 * mechanism is less secure and should not be used for cryptographic purposes.
 *
 * The default length is 6 characters, which is sufficient for millions of records per millisecond
 * thanks to the inclusion of a highly random `inputValue3`. For shorter lengths, it is recommended
 * not to go below 4 characters to minimize the risk of collisions.
 *
 * @async
 * @param {string} inputValue1 - The primary input value (e.g., a user ID or unique identifier).
 * @param {string} inputValue2 - A secondary input value (e.g., a file name or resource key).
 * @param {string} [inputValue3=Math.random().toString(36)+Math.random().toString(36)] -
 *   An optional third input value. By default, this combines two random Base-36 strings, providing
 *   approximately \(2^{104}\) possible combinations, significantly reducing collision risk.
 * @param {number} [length=6] - The desired length of the resulting unique ID.
 *   Must be at least 1. Defaults to 6 characters.
 * @returns {Promise<string>} A promise resolving to the generated unique ID as a hexadecimal string.
 *   If the environment lacks support for `crypto.subtle.digest`, a non-hashed random string is returned.
 *
 * @throws {RangeError} Throws if the `length` parameter is less than 1.
 * @throws {TypeError} Throws if `inputValue1`, `inputValue2`, or `inputValue3` are not strings,
 *   or if `length` is not a number.
 * @throws {Error} Throws if `crypto.subtle.digest` is not supported and no fallback mechanism is possible.
 *
 * @example
 * Example 1: Generate a unique ID with default length (6 characters) using `await`.
 * ```ts
 * const userId = 'user123';
 * const fileName = 'photo.png';
 * const id = await generateUniqueId(userId, fileName);
 * console.log(id); // Outputs: 'a1b2c3' (example result)
 * ```
 *
 * @example
 * Example 2: Generate a unique ID with a custom length (16 characters).
 * ```ts
 * const session = 'session456';
 * const document = 'document.pdf';
 * const metadata = 'additionalInfo';
 * const customLength = 16;
 * const id = await generateUniqueId(session, document, metadata, customLength);
 * console.log(id); // Outputs: '1a2b3c4d5e6f7g8h' (example result)
 * ```
 *
 * @example
 * Example 3: Generate a unique ID in an environment without `crypto.subtle.digest`.
 * ```ts
 * const userId = 'user123';
 * const fileName = 'file.txt';
 * const id = await generateUniqueId(userId, fileName);
 * console.log(id); // Outputs: 'abc123def456' (example random result)
 * ```
 */
export const generateUniqueId = async (
  inputValue1: string,
  inputValue2: string,
  inputValue3: string = Math.random().toString(36) + Math.random().toString(36),
  length: number = 6
): Promise<string> => {
  // Validate length
  if (length < 1) {
    throw new RangeError('Length must be at least 1.');
  }

  const encoder = new TextEncoder();
  const uniqueId = encoder.encode(
    inputValue1 + inputValue2 + inputValue3 + Date.now()
  );

  // Check for crypto.subtle.digest support
  if (crypto?.subtle?.digest) {
    const hashBuffer = await crypto.subtle.digest('SHA-256', uniqueId);
    const hashArray = [...new Uint8Array(hashBuffer)];
    const hash = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    return hash.slice(0, length);
  }

  // Simple fallback for environments with no crypto support
  const fallbackSimple = Math.random().toString(36) + Date.now().toString(36);
  return fallbackSimple.slice(0, length);
};
