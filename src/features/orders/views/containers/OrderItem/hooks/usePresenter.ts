import { useMemo } from "react";
import type { Presenter } from "../OrderItem.types";
import type { ItemEntityId, OrderEntityId } from "../../../../types";
import { useIsLastItemIdSelector, useItemByIdSelector } from "../../../../hooks/selectors";

export const usePresenter = (params: {
  orderId: OrderEntityId;
  itemId: ItemEntityId;
}): Presenter => {
  const item = useItemByIdSelector(params.orderId, params.itemId);
  const isLastItem = useIsLastItemIdSelector(params.orderId, params.itemId);

  return useMemo(() => {
    if (!item) {
      return {
        hasItem: false,
      };
    }
    return {
      hasItem: true,
      itemId: item.id,
      productId: item.productId,
      productQuantity: item.quantity,
      isLastItem,
    };
  }, [isLastItem, item]);
};
