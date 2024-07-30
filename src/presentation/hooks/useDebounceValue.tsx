import { useEffect, useState } from 'react';

export const useDebouncedValue = (input: string, time: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(input);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(input);
    }, time);

    return () => {
      clearTimeout(handler);
    };
  }, [input, time]);

  return debouncedValue;
};
