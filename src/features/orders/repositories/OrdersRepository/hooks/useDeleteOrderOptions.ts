import { useQueryClient } from "@tanstack/react-query";
import type { OrderEntityId, OrdersResource } from "../../../types";
import { useDeleteOrderKey } from "./useDeleteOrderKey";
import { useGetOrdersKey } from "./useGetOrdersKey";
import { mutationOptions } from "../../../../../utils";
import { makeOrdersService } from "../makeOrdersService";
import { useGatewayResource } from "./useGatewayResource";

export const useDeleteOrderOptions = (forceResource?: OrdersResource) => {
  const queryClient = useQueryClient();
  const resource = useGatewayResource(forceResource);
  const mutationKey = useDeleteOrderKey(resource);
  const getOrdersKey = useGetOrdersKey(resource);
  const gateway = makeOrdersService(resource);

  // NOTE(harunou): to make the view updated correctly the mutationFn and
  // onSuccess should be async functions
  return mutationOptions({
    mutationKey,
    mutationFn: async (params: { orderId: OrderEntityId }) => {
      await gateway.deleteOrder(params.orderId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: getOrdersKey });
    },
  });
};
