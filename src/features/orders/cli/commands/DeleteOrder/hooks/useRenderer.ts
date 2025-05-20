import { useCallback } from "react";

export const useStringRenderer = () => {
  return useCallback((data: string): void => {
    console.log(data);
  }, []);
};

export const useTableRenderer = <T>() => {
  return useCallback((data: T[]): void => {
    console.table(data);
  }, []);
};
