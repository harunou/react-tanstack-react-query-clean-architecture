import { useQuery } from "@tanstack/react-query";
import { useGetOrdersOptions } from "../../gateways";
import type { OrderEntity, OrderEntityId } from "../../types";
import { useCallback } from "react";
import { useOrdersResourceSelector } from "./useOrdersResourceSelector";

const DEFAULT_ORDER_IDS: OrderEntityId[] = [];

export const useOrderIdsSelector = () => {
  const resource = useOrdersResourceSelector();
  const { data: orderIds = DEFAULT_ORDER_IDS } = useQuery({
    ...useGetOrdersOptions(resource),
    select: useCallback((orderEntities: OrderEntity[]) => orderEntities.map((d) => d.id), []),
  });

  return orderIds;
};
