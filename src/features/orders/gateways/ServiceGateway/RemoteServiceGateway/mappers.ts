import type { OrdersSnapshotDto } from "../../../api";
import type { OrderEntity } from "../../../types";

export function toOrdersSnapshotDto(orders: OrderEntity[]): OrdersSnapshotDto {
  return {
    timestamp: Date.now(),
    orders: orders.map((order) => ({
      id: order.id,
      userId: order.userId,
      entries: order.itemEntities.map((item) => ({
        id: item.id,
        productId: item.productId,
        number: item.quantity,
      })),
    })),
  };
}
