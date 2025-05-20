import { useCallback } from "react";
import { useDeleteOrderUseCase } from "../../../../hooks/useCases";
import type { DeleteOrderController } from "../DeleteOrder.types";
import type { OrderEntityId } from "../../../../types";
import { usePresenter } from "./usePresenter";

export const useController = (): DeleteOrderController => {
  const presenter = usePresenter();
  const { execute: executeDeleteOrderUseCase } = useDeleteOrderUseCase();
  return useCallback(
    async (id: unknown) => {
      try {
        if (!assertIdIsOrderEntityId(id)) {
          throw new Error("Invalid ID");
        }
        await executeDeleteOrderUseCase({ orderId: id });
        return presenter(id);
      } catch (error) {
        if (error instanceof Error) {
          return error;
        }
        return "Unknown error";
      }
    },
    [executeDeleteOrderUseCase, presenter],
  );
};

const assertIdIsOrderEntityId = (id: unknown): id is OrderEntityId => {
  return typeof id === "string" && id.length > 0;
};
