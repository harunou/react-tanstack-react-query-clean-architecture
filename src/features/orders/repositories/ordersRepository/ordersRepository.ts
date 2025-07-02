import type { OrderEntityId, ItemEntityId, OrdersRepository } from "../../types";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useIsMutating,
  useMutationState,
} from "@tanstack/react-query";
import { useGatewayResource, useOrdersGateway } from "./hooks";
import { ordersRepositoryKeys } from "./ordersRepositoryKeys";
import { isOrderItemMutationVariables } from "./ordersRepository.utils";

const useGetOrders: OrdersRepository["useGetOrders"] = (forceResource) => {
  const resource = useGatewayResource(forceResource);
  const gateway = useOrdersGateway(resource);
  const getOrdersKey = ordersRepositoryKeys.makeGetOrdersKey(resource);

  return useQuery({
    queryFn: async () => await gateway.getOrders(),
    queryKey: getOrdersKey,
  });
};

const useDeleteOrder: OrdersRepository["useDeleteOrder"] = (forceResource) => {
  const queryClient = useQueryClient();
  const resource = useGatewayResource(forceResource);
  const gateway = useOrdersGateway(resource);
  const deleteOrderKey = ordersRepositoryKeys.makeDeleteOrderKey(resource);
  const getOrdersKey = ordersRepositoryKeys.makeGetOrdersKey(resource);

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
  const gateway = useOrdersGateway(resource);
  const deleteOrderItemKey = ordersRepositoryKeys.makeDeleteOrderItemKey(resource);
  const getOrdersKey = ordersRepositoryKeys.makeGetOrdersKey(resource);

  return useMutation({
    mutationKey: deleteOrderItemKey,
    mutationFn: (params: { orderId: OrderEntityId; itemId: ItemEntityId }) =>
      gateway.deleteItem(params.orderId, params.itemId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: getOrdersKey }),
  });
};

const useIsDeletingOrderItemMutating: OrdersRepository["useIsDeletingOrderItemMutating"] = () => {
  return !!useIsMutating({
    mutationKey: ordersRepositoryKeys.makeDeleteOrderItemKey(useGatewayResource()),
  });
};

const useIsDeletingOrderMutating: OrdersRepository["useIsDeletingOrderMutating"] = () => {
  return !!useIsMutating({
    mutationKey: ordersRepositoryKeys.makeDeleteOrderKey(useGatewayResource()),
  });
};

const useCancelAllQueries: OrdersRepository["useCancelAllQueries"] = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.cancelQueries({
      queryKey: ordersRepositoryKeys.ORDERS_NAMESPACE,
    });
};

const useOrderItemMutationState: OrdersRepository["useOrderItemMutationState"] = (
  orderId: OrderEntityId,
  itemId: ItemEntityId,
) => {
  return useMutationState({
    filters: {
      mutationKey: ordersRepositoryKeys.makeDeleteOrderItemKey(useGatewayResource()),
      predicate(mutation) {
        const variables = mutation.state.variables;
        if (!isOrderItemMutationVariables(variables)) {
          return false;
        }

        return variables.orderId === orderId && variables.itemId === itemId;
      },
    },
  });
};

export const ordersRepository: OrdersRepository = {
  useGetOrders,
  useDeleteOrder,
  useDeleteOrderItem,
  useIsDeletingOrderMutating,
  useIsDeletingOrderItemMutating,
  useOrderItemMutationState,
  useCancelAllQueries,
};
