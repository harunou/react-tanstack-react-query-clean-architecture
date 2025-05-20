import { useCallback } from "react";

export const useLogRenderer = () => {
  return useCallback((data: string | Error): void => {
    console.log(data);
  }, []);
};
