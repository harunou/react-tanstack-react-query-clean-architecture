import { useMemo } from "react";
import { ordersRepository } from "../../repositories";
import type { OrderEntity } from "../../types";

export const useTotalItemsQuantitySelector = (): number => {
  const { data } = ordersRepository.useGetOrders();
  return useMemo(() => select(data), [data]);
};

export const select = (orders: OrderEntity[]): number => {
  return orders.reduce(
    (acc, entity) =>
      acc + entity.itemEntities.reduce((itemAcc, item) => itemAcc + item.quantity, 0),
    0,
  );
};
