import { useCallback } from "react";
import type { Controller } from "../../OrderItem.types";
import type { ItemEntityId, OrderEntityId } from "../../../../../types";
import { useMutation } from "@tanstack/react-query";
import { useDeleteOrderItemOptions } from "../../../../../gateways/OrdersGateway";
import { useOrdersResourceSelector } from "../../../../../hooks/selectors";
import { useMemoRecord } from "../../../../../../../utils";

export const useController = (params: {
  orderId: OrderEntityId;
  itemId: ItemEntityId;
}): Controller => {
  const resource = useOrdersResourceSelector();
  const { mutateAsync: deleteOrderItem } = useMutation({ ...useDeleteOrderItemOptions(resource) });

  const deleteOrderItemButtonClicked = useCallback(async () => {
    await deleteOrderItem(params);
  }, [deleteOrderItem, params]);

  return useMemoRecord({
    deleteOrderItemButtonClicked,
  });
};
