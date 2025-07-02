import type { OrderEntity, OrderEntityId } from "../types";
import { ordersRepository } from "../repositories";

const DEFAULT_ORDERS: OrderEntity[] = [];

export const useOrderIdsSelector = (): OrderEntityId[] => {
  const { data: orders = DEFAULT_ORDERS } = ordersRepository.useGetOrders();

  return orders.map((order) => order.id);
};
