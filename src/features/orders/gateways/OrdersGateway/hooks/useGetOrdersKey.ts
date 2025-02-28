import type { OrdersResource } from "../../../types";

export const useGetOrdersKey = (resource: OrdersResource) => {
  return [resource, "orders"] as const;
};
