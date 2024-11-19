import {
  capitalize,
  camelCaseToKebabCase,
  truncate,
} from '@/utils/stringUtils';

describe('capitalize', () => {
  it('should capitalize the first letter of a string', () => {
    const result = capitalize('string');
    expect(result).toBe('String');
  });

  it('should return an empty string if input is empty', () => {
    const result = capitalize('');
    expect(result).toBe('');
  });

  it('should handle single letters', () => {
    const result = capitalize('a');
    expect(result).toBe('A');
  });
});

describe('camelCaseToKebabCase', () => {
  it('should convert camelCase to kebab-case', () => {
    const result = camelCaseToKebabCase('camelCaseString');
    expect(result).toBe('camel-case-string');
  });

  it('should return an empty string if input is empty', () => {
    const result = camelCaseToKebabCase('');
    expect(result).toBe('');
  });

  it('should handle single words without changes', () => {
    const result = camelCaseToKebabCase('word');
    expect(result).toBe('word');
  });
});

describe('truncate', () => {
  it('should truncate a string to the specified length', () => {
    const result = truncate('string', 3);
    expect(result).toBe('str...');
  });

  it('should return the original string if length is greater than or equal to string length', () => {
    const result = truncate('string', 6);
    expect(result).toBe('string');
  });

  it('should return an empty string if input is empty', () => {
    const result = truncate('', 3);
    expect(result).toBe('');
  });

  it('should handle length of 0', () => {
    const result = truncate('string', 0);
    expect(result).toBe('');
  });
});
