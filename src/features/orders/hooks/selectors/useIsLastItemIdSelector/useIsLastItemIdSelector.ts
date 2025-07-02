import type { ItemEntityId, OrderEntity, OrderEntityId } from "../../../types";
import { ordersRepository } from "../../../repositories";

const DEFAULT_ORDERS: OrderEntity[] = [];

export const useIsLastItemIdSelector = (orderId: OrderEntityId, itemId: ItemEntityId) => {
  const { data = DEFAULT_ORDERS } = ordersRepository.useGetOrders();
  return select(data, orderId, itemId);
};

export const select = (
  orderEntities: OrderEntity[],
  orderId: OrderEntityId,
  itemId: ItemEntityId,
): boolean => {
  const order = orderEntities.find((orderEntity) => orderEntity.id === orderId);
  return order?.itemEntities.at(-1)?.id === itemId;
};
