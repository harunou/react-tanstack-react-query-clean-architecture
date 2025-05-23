import { useMemo } from "react";
import type { Presenter } from "../../Order.types";
import type { ItemEntity, OrderEntityId } from "../../../../../types";
import {
  useOrderByIdSelector,
  useIsLastOrderId,
  useIsOrdersProcessingSelector,
} from "../../../../../hooks/selectors";

const ITEMS_FALLBACK: ItemEntity[] = [];

export const usePresenter = (params: { orderId: OrderEntityId }): Presenter => {
  const order = useOrderByIdSelector(params.orderId);
  const isLastOrder = useIsLastOrderId(params.orderId);
  const isProcessingOrders = useIsOrdersProcessingSelector();

  const items = order?.itemEntities ?? ITEMS_FALLBACK;

  return useMemo(() => {
    if (!order) {
      return {
        hasOrder: false,
      };
    }
    return {
      hasOrder: true,
      userId: order.userId,
      orderId: order.id,
      itemIds: items.map((itemEntity) => itemEntity.id),
      isLastOrder,
      isDeleteOrderButtonDisabled: isProcessingOrders,
    };
  }, [isLastOrder, isProcessingOrders, order, items]);
};
