import type { ItemEntityId, OrderEntity, OrderEntityId } from "../../../types/entities";

export interface OrdersService {
  getOrders(): Promise<OrderEntity[]>;
  deleteOrder(orderId: OrderEntityId): Promise<void>;
  deleteItem(orderId: OrderEntityId, itemId: ItemEntityId): Promise<void>;
}
