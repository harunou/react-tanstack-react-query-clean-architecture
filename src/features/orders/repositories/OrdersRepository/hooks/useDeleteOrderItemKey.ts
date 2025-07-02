import type { OrdersResource } from "../../../types";

export const useDeleteOrderItemKey = (resource: OrdersResource) => {
  return [resource, "orders", "order", "item", "delete"] as const;
};
