import { useCallback } from "react";

export const useConsoleRenderer = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useCallback((...args: any[]): void => {
    console.log(...args);
  }, []);
};
