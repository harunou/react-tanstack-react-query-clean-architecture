import type { ItemEntityId, OrderEntity, OrderEntityId } from "../../../types";

export const select = (
  orderEntities: OrderEntity[],
  orderId: OrderEntityId,
  itemId: ItemEntityId,
): boolean => {
  const order = orderEntities.find((orderEntity) => orderEntity.id === orderId);
  return order?.itemEntities.at(-1)?.id === itemId;
};
