import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { useGetOrdersOptions } from "../../../../repositories";
import type { OrderEntityId, OrderEntity } from "../../../../types";
import type { ViewModel } from "../DeleteOrder.types";
import type { UseCaseResult } from "../../../../../../@types";

type PresenterParams = { orderId: OrderEntityId; result: UseCaseResult };

export const usePresenter = () => {
  const selectOrderIds = useOrderIdsSelector();
  return useCallback(
    async (params: PresenterParams): Promise<ViewModel> => {
      if (params.result) {
        return params.result;
      }
      const data = await selectOrderIds();
      const ids = data.map((id: OrderEntityId) => `"${id}"`);
      return `Order with id "${params.orderId}" has been deleted.\nAvailable order ids: ${ids.join(", ")}`;
    },
    [selectOrderIds],
  );
};

const useOrderIdsSelector = () => {
  const options = useGetOrdersOptions();
  const { refetch } = useQuery({ ...options });
  return useCallback(async (): Promise<OrderEntityId[]> => {
    const { data: orders = [] } = await refetch();
    return orders.map((order: OrderEntity) => order.id);
  }, [refetch]);
};
