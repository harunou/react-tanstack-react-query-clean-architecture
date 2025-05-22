import { useQuery } from "@tanstack/react-query";
import { useGetOrdersOptions } from "../../../gateways";
import { useOrdersResourceSelector } from "../useOrdersResourceSelector";
import type { OrderEntity } from "../../../types";

const DEFAULT_TOTAL_ITEMS_QUANTITY = 0;

export const useTotalItemsQuantitySelector = () => {
  const resource = useOrdersResourceSelector();
  const { data: totalItemsQuantity = DEFAULT_TOTAL_ITEMS_QUANTITY } = useQuery({
    ...useGetOrdersOptions(resource),
    // NOTE: Without the structuralSharing patch, the selector does not work as
    // expected. This issue may not originate from this part of the code, but
    // adding structuralSharing here is a workaround. Further investigation
    // might be needed to identify the root cause elsewhere.
    structuralSharing: (oldData, newData) => {
      if (oldData === newData) {
        return oldData;
      }
      return newData;
    },
    select: (orderEntities: OrderEntity[]) => {
      return orderEntities.reduce(
        (acc, entity) =>
          acc + entity.itemEntities.reduce((itemAcc, item) => itemAcc + item.quantity, 0),
        0,
      );
    },
  });

  return totalItemsQuantity;
};
