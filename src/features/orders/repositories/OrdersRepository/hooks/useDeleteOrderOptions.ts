import { useQueryClient } from "@tanstack/react-query";
import type { OrderEntityId, OrdersResource } from "../../../types";
import { mutationOptions } from "../../../../../utils";
import { makeOrdersService } from "../OrdersService";
import { useGatewayResource } from "./useGatewayResource";
import { keys } from "./keys";

export const useDeleteOrderOptions = (forceResource?: OrdersResource) => {
  const queryClient = useQueryClient();
  const resource = useGatewayResource(forceResource);
  const deleteOrderKey = keys.makeDeleteOrderKey(resource);
  const getOrdersKey = keys.makeGetOrdersKey(resource);
  const gateway = makeOrdersService(resource);

  // NOTE(harunou): to make the view updated correctly the mutationFn and
  // onSuccess should be async functions
  return mutationOptions({
    mutationKey: deleteOrderKey,
    mutationFn: async (params: { orderId: OrderEntityId }) => {
      await gateway.deleteOrder(params.orderId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: getOrdersKey });
    },
  });
};
