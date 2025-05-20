import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useGetOrdersOptions } from "../../../../gateways";
import { useOrdersResourceSelector } from "../../../../hooks/selectors";
import type { OrderEntityId, OrderEntity } from "../../../../types";
import type { ViewModel } from "../DeleteOrder.types";

const useOrderIdsSelector = () => {
  const queryClient = useQueryClient();
  const resource = useOrdersResourceSelector();
  const options = useGetOrdersOptions(resource);
  return useCallback(async (): Promise<OrderEntityId[]> => {
    const orders = await queryClient.fetchQuery(options);
    return orders.map((order: OrderEntity) => order.id);
  }, [options, queryClient]);
};

export const usePresenter = () => {
  const selectOrderIds = useOrderIdsSelector();
  return useCallback(
    async (id: OrderEntityId): Promise<ViewModel> => {
      const data = await selectOrderIds();
      const ids = data.map((id: OrderEntityId) => `${id}`);
      return `Order with id '${id}' has been deleted.\nAvailable order ids: '${ids.join("', '")}'`;
    },
    [selectOrderIds],
  );
};
