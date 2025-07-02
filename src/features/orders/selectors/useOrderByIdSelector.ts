import type { OrderEntity, OrderEntityId } from "../types";
import { ordersRepository } from "../repositories";

const DEFAULT_ORDERS: OrderEntity[] = [];

export const useOrderByIdSelector = (orderId: OrderEntityId): OrderEntity | undefined => {
  const { data = DEFAULT_ORDERS } = ordersRepository.useGetOrders();

  return data.find((orderEntity) => orderEntity.id === orderId);
};
