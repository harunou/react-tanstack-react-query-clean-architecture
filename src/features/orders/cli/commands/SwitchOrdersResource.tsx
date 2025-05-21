import { memo, useCallback, useEffect, type FC } from "react";
import { useOrdersPresentationStore } from "../../stores";
import { isOrdersResource } from "../../utils";
import { useConsoleRenderer } from "../hooks/useConsoleRenderer";

declare global {
  interface Window {
    switchOrdersResource?: (resource: unknown) => void;
  }
}

type SwitchOrdersResourceController = (resource: unknown) => Promise<string | Error>;

const useController = (): SwitchOrdersResourceController => {
  const setOrdersResource = useOrdersPresentationStore((state) => state.setOrdersResource);
  return useCallback(
    async (resource: unknown) => {
      if (!isOrdersResource(resource)) {
        return new Error("Invalid orders resource");
      }
      setOrdersResource(resource);
      return `Orders resource switched to "${resource}"`;
    },
    [setOrdersResource],
  );
};

export const SwitchOrdersResource: FC = memo(() => {
  const renderer = useConsoleRenderer();
  const controller = useController();
  void controller;
  useEffect(() => {
    window.switchOrdersResource = async (resource: unknown) => renderer(await controller(resource));

    return () => {
      delete window.switchOrdersResource;
    };
  }, [controller, renderer]);

  return null;
});
