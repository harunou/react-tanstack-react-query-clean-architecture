import type { ItemEntityId, OrderEntity, OrderEntityId } from "../entities";

export interface OrdersGateway {
  getOrders(): Promise<OrderEntity[]>;
  deleteOrder(orderId: OrderEntityId): Promise<void>;
  deleteItem(orderId: OrderEntityId, itemId: ItemEntityId): Promise<void>;
}
