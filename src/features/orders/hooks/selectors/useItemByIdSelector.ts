import { useQuery } from "@tanstack/react-query";
import type { ItemEntityId, OrderEntity, OrderEntityId } from "../../types";
import { useGetOrdersOptions } from "../../gateways";
import { useCallback } from "react";

export const useItemByIdSelector = (orderId: OrderEntityId, itemId: ItemEntityId) => {
  const { data } = useQuery({
    ...useGetOrdersOptions(),
    select: useCallback(
      (orderEntities: OrderEntity[]) => {
        const order = orderEntities.find((orderEntity) => orderEntity.id === orderId);
        if (order) {
          return order.itemEntities.find((itemEntity) => itemEntity.id === itemId);
        }
      },
      [itemId, orderId],
    ),
  });

  return data;
};
