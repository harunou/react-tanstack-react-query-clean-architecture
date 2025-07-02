import type { OrderEntity, OrdersResource, OrderEntityId, ItemEntityId } from "../../types";
import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

export interface OrdersRepository {
  useGetOrders(forceResource?: OrdersResource): UseQueryResult<OrderEntity[], Error>;
  useDeleteOrder(
    forceResource?: OrdersResource,
  ): UseMutationResult<void, Error, { orderId: OrderEntityId }>;
  useIsDeletingOrderMutating(): boolean;
  useDeleteOrderItem(
    forceResource?: OrdersResource,
  ): UseMutationResult<void, Error, { orderId: OrderEntityId; itemId: ItemEntityId }>;
  useIsDeletingOrderItemMutating(): boolean;
}
