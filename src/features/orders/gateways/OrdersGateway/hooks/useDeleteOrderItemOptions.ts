import type { ItemEntityId, OrderEntityId, OrdersResource } from "../../../types";
import { useDeleteOrderKey } from "./useDeleteOrderKey";
import { useGetOrdersKey } from "./useGetOrdersKey";
import { useQueryClient } from "@tanstack/react-query";
import { mutationOptions } from "../../../../../utils";
import { useOrdersGateway } from "./useOrdersGateway";

export const useDeleteOrderItemOptions = (resource: OrdersResource) => {
  const queryClient = useQueryClient();
  const mutationKey = useDeleteOrderKey(resource);
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
