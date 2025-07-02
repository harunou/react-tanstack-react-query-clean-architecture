import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import type { UseCase } from "../../../../../@types";
import { useDeleteOrderOptions } from "../../../repositories";
import type { OrderEntityId } from "../../../types";

export const useDeleteOrderUseCase = (): UseCase<{ orderId: OrderEntityId }> => {
  const { mutateAsync: deleteOrder } = useMutation({ ...useDeleteOrderOptions() });

  const execute = useCallback(
    async (params: { orderId: OrderEntityId }) => {
      try {
        await deleteOrder(params);
      } catch (e) {
        if (e instanceof Error) {
          return e;
        }
        return new Error("Unknown error");
      }
    },
    [deleteOrder],
  );

  return { execute };
};
