import type { OrderEntity, OrderEntityId } from "../types";
import { ordersRepository } from "../repositories";

const DEFAULT_ORDERS: OrderEntity[] = [];

export const useIsLastOrderIdSelector = (orderId: OrderEntityId): boolean => {
  const { data = DEFAULT_ORDERS } = ordersRepository.useGetOrders();

  return data.at(-1)?.id === orderId;
};
