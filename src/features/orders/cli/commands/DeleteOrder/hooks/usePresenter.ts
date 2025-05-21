import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { useGetOrdersOptions } from "../../../../gateways";
import { useOrdersResourceSelector } from "../../../../hooks/selectors";
import type { OrderEntityId, OrderEntity } from "../../../../types";
import type { ViewModel } from "../DeleteOrder.types";

const useOrderIdsSelector = () => {
  const resource = useOrdersResourceSelector();
  const options = useGetOrdersOptions(resource);
  const { refetch } = useQuery({ ...options });
  return useCallback(async (): Promise<OrderEntityId[]> => {
    const { data: orders = [] } = await refetch();
    return orders.map((order: OrderEntity) => order.id);
  }, [refetch]);
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
