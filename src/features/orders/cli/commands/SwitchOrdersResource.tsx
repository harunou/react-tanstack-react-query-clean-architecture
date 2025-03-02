import { memo, useEffect, type FC } from "react";
import type { OrdersResource } from "../../types";
import { useOrdersPresentationStore } from "../../stores";
import { isOrdersResource } from "../../utils";

declare global {
  interface Window {
    switchOrdersResource?: (resource: OrdersResource) => void;
  }
}

export const SwitchOrdersResource: FC = memo(() => {
  const setOrdersResource = useOrdersPresentationStore((state) => state.setOrdersResource);

  useEffect(() => {
    window.switchOrdersResource = (resource: OrdersResource) => {
      if (!isOrdersResource(resource)) {
        console.log("Invalid orders resource");
      }
      setOrdersResource(resource);
      console.log(`Orders resource has been switched to ${resource}`);
    };

    return () => {
      delete window.switchOrdersResource;
    };
  }, [setOrdersResource]);

  return null;
});
