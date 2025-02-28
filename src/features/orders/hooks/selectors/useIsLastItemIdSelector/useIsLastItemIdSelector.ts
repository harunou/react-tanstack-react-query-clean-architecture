import { useQuery } from "@tanstack/react-query";
import type { ItemEntityId, OrderEntity, OrderEntityId } from "../../../types";
import { useGetOrdersOptions } from "../../../gateways";
import { useCallback } from "react";
import { select } from "./select";
import { useOrdersResourceSelector } from "../useOrdersResourceSelector";

export const useIsLastItemIdSelector = (orderId: OrderEntityId, itemId: ItemEntityId) => {
  const resource = useOrdersResourceSelector();
  const { data } = useQuery({
    ...useGetOrdersOptions(resource),
    select: useCallback(
      (orderEntities: OrderEntity[]): boolean => select(orderEntities, orderId, itemId),
      [itemId, orderId],
    ),
  });

  return data ?? false;
};
