import { useQueryClient } from "@tanstack/react-query";
import type { OrderEntityId, OrdersResource } from "../../../types";
import { useDeleteOrderKey } from "./useDeleteOrderKey";
import { useGetOrdersKey } from "./useGetOrdersKey";
import { mutationOptions } from "../../../../../utils";
import { useOrdersGateway } from "./useOrdersGateway";
import { useGatewayResource } from "./useGatewayResource";

export const useDeleteOrderOptions = (forceResource?: OrdersResource) => {
  const queryClient = useQueryClient();
  const resource = useGatewayResource(forceResource);
  const mutationKey = useDeleteOrderKey(resource);
  const getOrdersKey = useGetOrdersKey(resource);
  const gateway = useOrdersGateway(resource);

  return mutationOptions({
    mutationKey,
    mutationFn: (params: { orderId: OrderEntityId }) => gateway.deleteOrder(params.orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getOrdersKey });
    },
  });
};
