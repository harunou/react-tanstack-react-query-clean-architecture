import type { ItemEntity, OrderEntity } from "../entities";

export interface ServiceGateway {
  logOrders(orders: OrderEntity[], items: ItemEntity[]): Promise<void>;
}
