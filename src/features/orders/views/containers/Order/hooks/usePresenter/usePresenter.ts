import { useMemo } from "react";
import type { Presenter } from "../../Order.types";
import type { OrderEntityId } from "../../../../../types";
import {
  useOrderByIdSelector,
  useIsLastOrderId,
  useIsOrdersProcessingSelector,
} from "../../../../../hooks/selectors";

export const usePresenter = (params: { orderId: OrderEntityId }): Presenter => {
  const order = useOrderByIdSelector(params.orderId);
  const isLastOrder = useIsLastOrderId(params.orderId);
  const isProcessingOrders = useIsOrdersProcessingSelector();

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
      itemIds: order.itemEntities.map((itemEntity) => itemEntity.id),
      isLastOrder,
      isDeleteOrderButtonDisabled: isProcessingOrders,
    };
  }, [isLastOrder, isProcessingOrders, order]);
};
