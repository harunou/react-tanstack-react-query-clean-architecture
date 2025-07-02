import { useQuery } from "@tanstack/react-query";
import { useGetOrdersOptions } from "../../repositories";
import type { OrderEntity, OrderEntityId } from "../../types";
import { useCallback } from "react";

const DEFAULT_ORDER_IDS: OrderEntityId[] = [];

export const useOrderIdsSelector = () => {
  const { data: orderIds = DEFAULT_ORDER_IDS } = useQuery({
    ...useGetOrdersOptions(),
    select: useCallback((orderEntities: OrderEntity[]) => orderEntities.map((d) => d.id), []),
  });

  return orderIds;
};
