import type { OrderEntityId, ItemEntityId } from "../../types";
import { useQuery, useMutation, useQueryClient, useIsMutating } from "@tanstack/react-query";
import { useGatewayResource } from "./hooks";
import { keys } from "./keys";
import { makeOrdersService } from "./OrdersService";
import type { OrdersRepository } from "./OrdersRepository.types";

const useGetOrders: OrdersRepository["useGetOrders"] = (forceResource) => {
  const resource = useGatewayResource(forceResource);
  const getOrdersKey = keys.makeGetOrdersKey(resource);
  const gateway = makeOrdersService(resource);

  return useQuery({
    queryFn: async () => await gateway.getOrders(),
    queryKey: getOrdersKey,
  });
};

const useDeleteOrder: OrdersRepository["useDeleteOrder"] = (forceResource) => {
  const queryClient = useQueryClient();
  const resource = useGatewayResource(forceResource);
  const deleteOrderKey = keys.makeDeleteOrderKey(resource);
  const getOrdersKey = keys.makeGetOrdersKey(resource);
  const gateway = makeOrdersService(resource);

  return useMutation({
    mutationKey: deleteOrderKey,
    mutationFn: async (params: { orderId: OrderEntityId }) => {
      await gateway.deleteOrder(params.orderId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: getOrdersKey });
    },
  });
};

const useDeleteOrderItem: OrdersRepository["useDeleteOrderItem"] = (forceResource) => {
  const queryClient = useQueryClient();
  const resource = useGatewayResource(forceResource);
  const deleteOrderItemKey = keys.makeDeleteOrderItemKey(resource);
  const getOrdersKey = keys.makeGetOrdersKey(resource);
  const gateway = makeOrdersService(resource);

  return useMutation({
    mutationKey: deleteOrderItemKey,
    mutationFn: (params: { orderId: OrderEntityId; itemId: ItemEntityId }) =>
      gateway.deleteItem(params.orderId, params.itemId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: getOrdersKey }),
  });
};

const useIsDeletingOrderItemMutating: OrdersRepository["useIsDeletingOrderItemMutating"] = () => {
  return !!useIsMutating({ mutationKey: keys.makeDeleteOrderItemKey(useGatewayResource()) });
};

const useIsDeletingOrderMutating: OrdersRepository["useIsDeletingOrderMutating"] = () => {
  return !!useIsMutating({ mutationKey: keys.makeDeleteOrderKey(useGatewayResource()) });
};

export const ordersRepository: OrdersRepository = {
  useGetOrders,
  useDeleteOrder,
  useDeleteOrderItem,
  useIsDeletingOrderItemMutating,
  useIsDeletingOrderMutating,
};
