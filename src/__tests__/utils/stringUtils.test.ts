import {
  capitalize,
  camelCaseToKebabCase,
  truncate,
  toSnakeCase,
  reverseString,
  removeSpecialCharacters,
} from '@/utils/stringUtils';

describe('String Utils', () => {
  describe('capitalize', () => {
    it('should capitalize the first letter of a string', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('Hello')).toBe('Hello');
      expect(capitalize('')).toBe('');
    });
  });

  describe('camelCaseToKebabCase', () => {
    it('should convert camelCase to kebab-case', () => {
      expect(camelCaseToKebabCase('camelCase')).toBe('camel-case');
      expect(camelCaseToKebabCase('anotherExample')).toBe('another-example');
    });
  });

  describe('truncate', () => {
    it('should truncate strings exceeding the specified length', () => {
      expect(truncate('This is a long string', 10)).toBe('This is a...');
      expect(truncate('Short', 10)).toBe('Short');
      expect(truncate('', 5)).toBe('');
      expect(truncate('Some text', 0)).toBe('');
    });
  });

  describe('toSnakeCase', () => {
    it('should convert camelCase to snake_case', () => {
      expect(toSnakeCase('camelCase')).toBe('camel_case');
      expect(toSnakeCase('anotherExample')).toBe('another_example');
    });
  });

  describe('reverseString', () => {
    it('should reverse the characters in a string', () => {
      expect(reverseString('hello')).toBe('olleh');
      expect(reverseString('')).toBe('');
    });
  });

  describe('removeSpecialCharacters', () => {
    it('should remove special characters while preserving letters, numbers, and spaces', () => {
      expect(removeSpecialCharacters('Hello, World! 123')).toBe(
        'Hello World 123'
      );
      expect(removeSpecialCharacters('你好，世界！123')).toBe('你好世界123');
      expect(removeSpecialCharacters('@#%*&$')).toBe('');
      expect(removeSpecialCharacters('foo_bar-baz')).toBe('foobarbaz');
      expect(removeSpecialCharacters('123!@#abcABC')).toBe('123abcABC');
    });

    it('should handle strings with only special characters', () => {
      expect(removeSpecialCharacters('!!!@@@###$$$')).toBe('');
      expect(removeSpecialCharacters('....,,,;;;')).toBe('');
    });

    it('should return an empty string if the input is an empty string', () => {
      expect(removeSpecialCharacters('')).toBe('');
    });

    it('should handle strings with spaces and various languages', () => {
      expect(removeSpecialCharacters('Bonjour, le monde!')).toBe(
        'Bonjour le monde'
      );
      expect(removeSpecialCharacters('¡Hola, mundo!')).toBe('Hola mundo');
      expect(removeSpecialCharacters('こんにちは、世界！')).toBe(
        'こんにちは世界'
      );
      expect(removeSpecialCharacters('Привет, мир!')).toBe('Привет мир');
    });
  });
});
