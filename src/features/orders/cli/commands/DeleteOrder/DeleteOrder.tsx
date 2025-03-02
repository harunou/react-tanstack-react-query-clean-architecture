import { memo, useEffect, type FC } from "react";
import type { OrderEntityId } from "../../../types";
import { useController } from "./hooks";

declare global {
  interface Window {
    deleteOrder?: (id: OrderEntityId) => void;
  }
}

export const DeleteOrder: FC = memo(() => {
  const controller = useController();

  useEffect(() => {
    window.deleteOrder = async (id: OrderEntityId) => {
      try {
        await controller.deleteOrderRequested(id);
        console.log(`Order with id ${id} has been deleted`);
      } catch (e) {
        console.log(e);
      }
    };

    return () => {
      delete window.deleteOrder;
    };
  }, [controller]);

  return null;
});
