import type { ItemEntityId, OrderEntityId, OrdersResource } from "../types";

export const makeItemEntityId = (id: string): ItemEntityId => {
  return id as ItemEntityId;
};

export const makeOrderEntityId = (id: string): OrderEntityId => {
  return id as OrderEntityId;
};

export const isOrdersResource = (resource: unknown): resource is OrdersResource =>
  resource === "local" || resource === "remote";
