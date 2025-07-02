import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import type { OrderEntity, OrderEntityId, ItemEntityId } from "../entities";
import type { OrdersResource } from "../OrdersResource";

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
