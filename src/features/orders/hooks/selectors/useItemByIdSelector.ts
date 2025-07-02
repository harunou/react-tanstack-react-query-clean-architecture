import type { ItemEntity, ItemEntityId, OrderEntity, OrderEntityId } from "../../types";
import { ordersRepository } from "../../repositories";

const DEFAULT_ORDERS: OrderEntity[] = [];

export const useItemByIdSelector = (
  orderId: OrderEntityId,
  itemId: ItemEntityId,
): ItemEntity | undefined => {
  const { data = DEFAULT_ORDERS } = ordersRepository.useGetOrders();

  const order = data.find((orderEntity) => orderEntity.id === orderId);

  if (!order) {
    return;
  }
  return order.itemEntities.find((itemEntity) => itemEntity.id === itemId);
};
