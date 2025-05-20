import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useGetOrdersOptions } from "../../../../gateways";
import { useOrdersResourceSelector } from "../../../../hooks/selectors";
import type { OrderEntityId, OrderEntity } from "../../../../types";

const useOrderIdsSelector = () => {
  const queryClient = useQueryClient();
  const resource = useOrdersResourceSelector();
  const options = useGetOrdersOptions(resource);
  return useCallback(async (): Promise<OrderEntityId[]> => {
    const orders = await queryClient.fetchQuery(options);
    return orders.map((order: OrderEntity) => order.id);
  }, [options, queryClient]);
};

export const usePresenter = (): (() => Promise<string[]>) => {
  const selectOrderIds = useOrderIdsSelector();
  return useCallback(async () => {
    const data = await selectOrderIds();
    return data.map((id: OrderEntityId) => `${id}`);
  }, [selectOrderIds]);
};
