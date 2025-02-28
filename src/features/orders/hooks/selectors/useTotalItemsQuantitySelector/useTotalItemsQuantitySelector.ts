import { useQuery } from "@tanstack/react-query";
import { useGetOrdersOptions } from "../../../gateways";
import { useOrdersResourceSelector } from "../useOrdersResourceSelector";
import { useCallback } from "react";
import type { OrderEntity } from "../../../types";

const DEFAULT_TOTAL_ITEMS_QUANTITY = 0;

export const useTotalItemsQuantitySelector = () => {
  const resource = useOrdersResourceSelector();
  const { data: totalItemsQuantity = DEFAULT_TOTAL_ITEMS_QUANTITY } = useQuery({
    ...useGetOrdersOptions(resource),
    select: useCallback((orderEntities: OrderEntity[]) => {
      return orderEntities.reduce(
        (acc, entity) =>
          acc + entity.itemEntities.reduce((itemAcc, item) => itemAcc + item.quantity, 0),
        0,
      );
    }, []),
  });

  return totalItemsQuantity;
};
