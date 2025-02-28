import { useQuery } from "@tanstack/react-query";
import type { OrderEntity, OrderEntityId } from "../../types";
import { useGetOrdersOptions } from "../../gateways";
import { useCallback } from "react";
import { useOrdersResourceSelector } from "./useOrdersResourceSelector";

export const useIsLastOrderId = (orderId: OrderEntityId) => {
  const resource = useOrdersResourceSelector();
  const { data } = useQuery({
    ...useGetOrdersOptions(resource),
    select: useCallback(
      (orderEntities: OrderEntity[]) => orderEntities.at(-1)?.id === orderId,
      [orderId],
    ),
  });

  return data ?? false;
};
