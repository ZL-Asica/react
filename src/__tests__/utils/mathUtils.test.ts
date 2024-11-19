import { randomInt, clamp, randomFloat } from '@/utils/mathUtils';

describe('randomInt', () => {
  it('should generate a random integer within the range', () => {
    const min = 1;
    const max = 10;

    for (let index = 0; index < 100; index++) {
      const result = randomInt(min, max);
      expect(result).toBeGreaterThanOrEqual(min);
      expect(result).toBeLessThanOrEqual(max);
    }
  });
});

describe('randomFloat', () => {
  it('should generate a random float within the range', () => {
    const min = 1;
    const max = 10;

    for (let index = 0; index < 100; index++) {
      const result = randomFloat(min, max);
      expect(result).toBeGreaterThanOrEqual(min);
      expect(result).toBeLessThanOrEqual(max);
    }
  });
});

describe('clamp', () => {
  it('should return the value if within range', () => {
    expect(clamp(5, 1, 10)).toBe(5);
  });

  it('should return the min if value is less than min', () => {
    expect(clamp(0, 1, 10)).toBe(1);
  });

  it('should return the max if value is greater than max', () => {
    expect(clamp(11, 1, 10)).toBe(10);
  });
});
