import { useQuery } from "@tanstack/react-query";
import type { OrderEntity, OrderEntityId } from "../../types";
import { useGetOrdersOptions } from "../../gateways";
import { useCallback } from "react";

export const useIsLastOrderId = (orderId: OrderEntityId) => {
  const { data } = useQuery({
    ...useGetOrdersOptions(),
    select: useCallback(
      (orderEntities: OrderEntity[]) => orderEntities.at(-1)?.id === orderId,
      [orderId],
    ),
  });

  return data ?? false;
};
