import { memo, useEffect, type FC } from "react";
import type { OrderEntityId } from "../../types";
import { useDeleteOrderUseCase } from "../../hooks/useCases";

declare global {
  interface Window {
    deleteOrder?: (id: OrderEntityId) => void;
  }
}

export const DeleteOrder: FC = memo(() => {
  const { execute: executeDeleteOrder } = useDeleteOrderUseCase();

  useEffect(() => {
    window.deleteOrder = async (id: OrderEntityId) => {
      try {
        await executeDeleteOrder({ orderId: id });
        console.log(`Order with id ${id} has been deleted`);
      } catch (e) {
        console.log(e);
      }
    };

    return () => {
      delete window.deleteOrder;
    };
  }, [executeDeleteOrder]);

  return null;
});
