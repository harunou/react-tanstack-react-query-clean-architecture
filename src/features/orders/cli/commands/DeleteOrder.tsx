import { memo, useEffect, type FC } from "react";
import type { OrderEntityId } from "../../types";
import { useOrderIdsSelector } from "../../hooks/selectors";
import { useDeleteOrderUseCase } from "../../hooks/useCases";
import { useCommandOutput } from "../../../../utils";

declare global {
  interface Window {
    deleteOrder?: (id: OrderEntityId) => void;
  }
}

export const DeleteOrder: FC = memo(() => {
  const { execute: executeDeleteOrder } = useDeleteOrderUseCase();
  const { scheduleOutput, cancelOutput } = useOutput();

  useEffect(() => {
    window.deleteOrder = async (id: OrderEntityId) => {
      try {
        await executeDeleteOrder({ orderId: id });
        scheduleOutput();
      } catch (e) {
        cancelOutput();
        console.log(e);
      }
    };

    return () => {
      delete window.deleteOrder;
    };
  }, [executeDeleteOrder, scheduleOutput, cancelOutput]);

  return null;
});

const useOutput = () => {
  const orderIds = useOrderIdsSelector();

  return useCommandOutput(orderIds, (ids) => console.log(`Available orders with ids: ${ids}`));
};
