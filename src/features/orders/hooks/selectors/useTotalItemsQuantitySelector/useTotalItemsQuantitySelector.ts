import { useQuery } from "@tanstack/react-query";
import { useGetOrdersOptions } from "../../../repositories";
import type { OrderEntity } from "../../../types";
import { useCallback } from "react";

const DEFAULT_TOTAL_ITEMS_QUANTITY = 0;

export const useTotalItemsQuantitySelector = () => {
  const { data: totalItemsQuantity = DEFAULT_TOTAL_ITEMS_QUANTITY } = useQuery({
    ...useGetOrdersOptions(),
    // NOTE(harunou): memoization select is not working without this
    structuralSharing(oldData, newData) {
      if (oldData === newData) {
        return oldData;
      }
      return newData;
    },
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
