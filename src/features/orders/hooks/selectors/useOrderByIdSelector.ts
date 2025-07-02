import { useQuery } from "@tanstack/react-query";
import type { OrderEntity, OrderEntityId } from "../../types";
import { useGetOrdersOptions } from "../../repositories";
import { useCallback } from "react";

export const useOrderByIdSelector = (orderId: OrderEntityId) => {
  const { data } = useQuery({
    ...useGetOrdersOptions(),
    select: useCallback(
      (orderEntities: OrderEntity[]) =>
        orderEntities.find((orderEntity) => orderEntity.id === orderId),
      [orderId],
    ),
  });

  return data;
};
