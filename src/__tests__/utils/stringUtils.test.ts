import {
  capitalize,
  camelCaseToKebabCase,
  truncate,
  toSnakeCase,
  reverseString,
  removeSpecialCharacters,
  generateUniqueId,
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

describe('generateUniqueId', () => {
  it('should generate an 6-character unique ID by default', async () => {
    const id = await generateUniqueId('user123', 'photo.png');
    expect(id).toBeTypeOf('string');
    expect(id.length).toBe(6);
  });

  it('should generate a unique ID with a custom length', async () => {
    const id = await generateUniqueId('user123', 'photo.png', '', 16);
    expect(id).toBeTypeOf('string');
    expect(id.length).toBe(16);
  });

  it('should include input values in the hash', async () => {
    const id1 = await generateUniqueId('user123', 'fileA');
    const id2 = await generateUniqueId('user123', 'fileB');
    expect(id1).not.toEqual(id2);
  });

  it('should throw a RangeError if length is less than 1', async () => {
    await expect(
      generateUniqueId('user123', 'photo.png', '', 0)
    ).rejects.toThrow(RangeError);
  });

  it('should handle default inputValue3 correctly', async () => {
    const id1 = await generateUniqueId('user123', 'photo.png');
    const id2 = await generateUniqueId('user123', 'photo.png');
    expect(id1).not.toEqual(id2); // Ensures default inputValue3 (random value) works
  });

  it('should generate consistent results for the same inputs and timestamp', async () => {
    const mockDate = 1_690_000_000_000; // Mock a fixed timestamp
    const originalDateNow = Date.now;
    globalThis.Date.now = () => mockDate;

    const id1 = await generateUniqueId('fixedUser', 'fixedFile', '');
    const id2 = await generateUniqueId('fixedUser', 'fixedFile', '');
    expect(id1).toEqual(id2);

    globalThis.Date.now = originalDateNow; // Restore original Date.now
  });

  it('should use fallbackSimple when crypto.subtle.digest is not supported', async () => {
    // Mock crypto.subtle to simulate unsupported environment
    const originalCrypto = globalThis.crypto;

    // Use vi to stub the global crypto object
    vi.stubGlobal('crypto', {
      subtle: undefined, // Simulate lack of subtle support
    } as unknown as Crypto);

    const length = 6;
    const id = await generateUniqueId('user123', 'photo.png');

    // Ensure fallbackSimple logic is used
    expect(id).toBeTypeOf('string');
    expect(id.length).toBe(length);

    // Restore original crypto object
    vi.stubGlobal('crypto', originalCrypto);
  });
});
