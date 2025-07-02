import type { OrdersResource } from "../../../types";

export const useDeleteOrderKey = (resource: OrdersResource) => {
  return [resource, "orders", "order", "delete"] as const;
};
