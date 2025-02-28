import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import type { UseCase } from "../../../../../@types";
import { useDeleteOrderOptions } from "../../../gateways";
import type { OrderEntityId } from "../../../types";
import { useOrdersResourceSelector } from "../../selectors";

export const useDeleteOrderUseCase = (): UseCase<{ orderId: OrderEntityId }> => {
  const resource = useOrdersResourceSelector();
  const { mutateAsync: deleteOrder } = useMutation({ ...useDeleteOrderOptions(resource) });

  const execute = useCallback(
    async (params: { orderId: OrderEntityId }) => {
      await deleteOrder(params);
    },
    [deleteOrder],
  );

  return { execute };
};
