import { renderHook, act } from '@testing-library/react';

import { useLocalStorage } from '@/hooks/state';

describe('useLocalStorage', () => {
  const consoleErrorMock = vi
    .spyOn(console, 'error')
    .mockImplementation(() => {});

  beforeEach(() => {
    localStorage.clear();
    consoleErrorMock.mockClear();
  });

  afterAll(() => {
    consoleErrorMock.mockRestore();
  });

  it('should initialize with the stored value', () => {
    localStorage.setItem('key', JSON.stringify('stored value'));
    const { result } = renderHook(() =>
      useLocalStorage('key', 'default value')
    );

    expect(result.current[0]).toBe('stored value');
  });

  it('should set and persist a new value', () => {
    const { result } = renderHook(() =>
      useLocalStorage('key', 'default value')
    );

    act(() => result.current[1]('new value'));
    expect(result.current[0]).toBe('new value');
    expect(localStorage.getItem('key')).toBe(JSON.stringify('new value'));
  });

  it('should handle invalid stored value gracefully', () => {
    localStorage.setItem('key', 'invalid JSON'); // 模拟无效 JSON
    const { result } = renderHook(() =>
      useLocalStorage('key', 'default value')
    );

    expect(result.current[0]).toBe('default value'); // 无效 JSON 时返回初始值
  });

  it('should support functional updates', () => {
    const { result } = renderHook(() => useLocalStorage<number>('key', 0));

    act(() => result.current[1]((previous: number) => previous + 1));
    expect(result.current[0]).toBe(1);
    expect(localStorage.getItem('key')).toBe(JSON.stringify(1));
  });
});
