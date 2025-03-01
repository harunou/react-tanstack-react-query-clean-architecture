import { useEffect, useRef } from "react";

export const useCommandOutput = <T>(deps: T, print: (deps: T) => void) => {
  const commandExecutedRef = useRef(false);

  useEffect(() => {
    if (!commandExecutedRef.current) {
      return;
    }

    print(deps);
    commandExecutedRef.current = false;
  }, [deps, print]);

  return {
    scheduleOutput: () => {
      commandExecutedRef.current = true;
    },
    cancelOutput: () => {
      commandExecutedRef.current = false;
    },
  };
};
