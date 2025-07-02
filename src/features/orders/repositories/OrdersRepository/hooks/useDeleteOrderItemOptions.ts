import type { ItemEntityId, OrderEntityId, OrdersResource } from "../../../types";
import { useQueryClient } from "@tanstack/react-query";
import { mutationOptions } from "../../../../../utils";
import { makeOrdersService } from "../OrdersService";
import { useGatewayResource } from "./useGatewayResource";
import { keys } from "./keys";

export const useDeleteOrderItemOptions = (forceResource?: OrdersResource) => {
  const queryClient = useQueryClient();
  const resource = useGatewayResource(forceResource);
  const deleteOrderItemKey = keys.makeDeleteOrderItemKey(resource);
  const getOrdersKey = keys.makeGetOrdersKey(resource);
  const gateway = makeOrdersService(resource);

  return mutationOptions({
    mutationKey: deleteOrderItemKey,
    mutationFn: (params: { orderId: OrderEntityId; itemId: ItemEntityId }) =>
      gateway.deleteItem(params.orderId, params.itemId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: getOrdersKey }),
  });
};
