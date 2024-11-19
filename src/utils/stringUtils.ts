/**
 * Capitalizes the first letter of a string
 * @param str - string to capitalize
 * @returns - capitalized string
 */
export const capitalize = (string_: string): string => {
  return string_.charAt(0).toUpperCase() + string_.slice(1);
};

/**
 * Converts a camelCase string to kebab-case
 * @param str - camelCase string
 * @returns - kebab-case string
 */
export const camelCaseToKebabCase = (string_: string): string => {
  return string_.replaceAll(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

/**
 * Truncates a string to a specified length
 * @param str - string to truncate
 * @param maxLength - maximum length of the truncated string
 * @returns - truncated string
 */
export const truncate = (string_: string, maxLength: number): string => {
  if (string_.length === 0 || maxLength === 0) {
    return '';
  }
  return string_.length > maxLength
    ? `${string_.slice(0, maxLength)}...`
    : string_;
};
