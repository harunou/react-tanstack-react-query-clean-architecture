import { createStore } from "zustand/vanilla";
import type { OrdersPresentationEntity, OrdersResource } from "../types";

export interface OrdersPresentationStore extends OrdersPresentationEntity {
  setOrdersResource: (resource: OrdersResource) => void;
}

export const ordersPresentationStore = createStore<OrdersPresentationStore>((set) => ({
  ordersResource: "local",
  setOrdersResource: (resource: OrdersResource) =>
    set((state) => ({ ...state, ordersResource: resource })),
}));
