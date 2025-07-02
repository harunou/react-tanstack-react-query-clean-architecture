import { ordersRepository } from "../../../repositories";
import type { OrderEntity } from "../../../types";

const DEFAULT_ORDERS: OrderEntity[] = [];

export const useTotalItemsQuantitySelector = () => {
  const { data = DEFAULT_ORDERS } = ordersRepository.useGetOrders();

  return data.reduce(
    (acc, entity) =>
      acc + entity.itemEntities.reduce((itemAcc, item) => itemAcc + item.quantity, 0),
    0,
  );
};
