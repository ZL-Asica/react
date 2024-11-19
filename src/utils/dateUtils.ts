/**
 * A utility function to format a date object to a string.
 * @param date - date to format
 * @param format - format string (default 'YYYY-MM-DD')
 * @returns - formatted date string
 */

export const formatDate = (date: Date, format = 'YYYY-MM-DD'): string => {
  const map: Record<string, string> = {
    YYYY: `${date.getFullYear()}`,
    MM: `${date.getMonth() + 1}`.padStart(2, '0'),
    DD: `${date.getDate()}`.padStart(2, '0'),
    HH: `${date.getHours()}`.padStart(2, '0'),
    mm: `${date.getMinutes()}`.padStart(2, '0'),
    ss: `${date.getSeconds()}`.padStart(2, '0'),
  };

  return format.replaceAll(/YYYY|MM|DD|HH|mm|ss/g, (matched) => map[matched]);
};

/**
 * A utility function to check if two dates are the same day.
 * @param date1 - first date
 * @param date2 - second date
 * @returns - true if both dates are the same day
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
