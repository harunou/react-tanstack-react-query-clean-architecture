import { memo, useEffect, type FC } from "react";
import type { OrdersResource } from "../../types";
import { useOrdersResourceSelector } from "../../hooks/selectors";
import { useCommandOutput } from "../../../../utils";
import { useOrdersPresentationStore } from "../../stores";
import { isOrdersResource } from "../../utils";

declare global {
  interface Window {
    switchOrdersResource?: (resource: OrdersResource) => void;
  }
}

export const SwitchOrdersResource: FC = memo(() => {
  const setOrdersResource = useOrdersPresentationStore((state) => state.setOrdersResource);
  const { scheduleOutput, cancelOutput } = useOutput();

  useEffect(() => {
    window.switchOrdersResource = (resource: OrdersResource) => {
      if (!isOrdersResource(resource)) {
        cancelOutput();
        console.log("Invalid orders resource");
      }
      setOrdersResource(resource);
      scheduleOutput();
    };

    return () => {
      delete window.switchOrdersResource;
    };
  }, [cancelOutput, scheduleOutput, setOrdersResource]);

  return null;
});

const useOutput = () => {
  const resource = useOrdersResourceSelector();

  return useCommandOutput(resource, (r) => console.log(`Current orders resource: ${r}`));
};
