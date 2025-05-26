import type { ItemEntityId, OrderEntityId, OrdersResource } from "../../../types";
import { useGetOrdersKey } from "./useGetOrdersKey";
import { useQueryClient } from "@tanstack/react-query";
import { mutationOptions } from "../../../../../utils";
import { useOrdersGateway } from "./useOrdersGateway";
import { useGatewayResource } from "./useGatewayResource";
import { useDeleteOrderItemKey } from "./useDeleteOrderItemKey";

export const useDeleteOrderItemOptions = (forceResource?: OrdersResource) => {
  const queryClient = useQueryClient();
  const resource = useGatewayResource(forceResource);
  const mutationKey = useDeleteOrderItemKey(resource);
  const getOrdersKey = useGetOrdersKey(resource);
  const gateway = useOrdersGateway(resource);

  return mutationOptions({
    mutationKey,
    mutationFn: (params: { orderId: OrderEntityId; itemId: ItemEntityId }) =>
      gateway.deleteItem(params.orderId, params.itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getOrdersKey });
    },
  });
};
