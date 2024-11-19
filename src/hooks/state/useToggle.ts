import { useBoolean } from './useBoolean';

/**
 * A hook for toggling a boolean value.
 * @param initialValue - initial state of the toggle
 * @returns [value, toggle]
 */
export const useToggle = (
  initialValue: boolean = false
): [boolean, () => void] => {
  const { value, toggle } = useBoolean(initialValue);
  return [value, toggle];
};
