import { useCallback, useEffect, useRef } from "react";

export const useRenderCounter = (): [() => number, () => void] => {
  const countRef = useRef(0);

  useEffect(() => {
    countRef.current += 1;
  });

  const getCount = useCallback(() => countRef.current, []);
  const resetCount = useCallback(() => {
    countRef.current = 0;
  }, []);

  return [getCount, resetCount];
};

export const output = <T extends object>(data: T): string => {
  return JSON.stringify(data);
};
