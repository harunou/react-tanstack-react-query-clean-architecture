import { useCallback } from "react";
import { useDeleteOrderUseCase } from "../../../../hooks/useCases";
import type { DeleteOrderController } from "../DeleteOrder.types";
import type { OrderEntityId } from "../../../../types";
import { usePresenter } from "./usePresenter";
import { useTableRenderer } from "./useRenderer";

export const useController = (): DeleteOrderController => {
  const renderTable = useTableRenderer<string>();
  const presenter = usePresenter();
  const { execute: executeDeleteOrderUseCase } = useDeleteOrderUseCase();
  return useCallback(
    async (id: OrderEntityId): Promise<void> => {
      await executeDeleteOrderUseCase({ orderId: id });
      renderTable(await presenter());
    },
    [executeDeleteOrderUseCase, presenter, renderTable],
  );
};
