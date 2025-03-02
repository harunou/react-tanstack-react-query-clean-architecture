import { useCallback } from "react";
import { useDeleteOrderUseCase } from "../../../../hooks/useCases";
import type { OrderEntityId } from "../../../../types";
import { useMemoRecord } from "../../../../../../utils";

export const useController = () => {
  const { execute: executeDeleteOrder } = useDeleteOrderUseCase();
  const deleteOrderRequested = useCallback(
    async (id: OrderEntityId) => {
      await executeDeleteOrder({ orderId: id });
    },
    [executeDeleteOrder],
  );

  return useMemoRecord({ deleteOrderRequested });
};
