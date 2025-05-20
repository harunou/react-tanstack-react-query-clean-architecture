import type { OrderEntityId } from "../../../types";

export type DeleteOrderController = (id: OrderEntityId) => Promise<void>;

declare global {
  interface Window {
    deleteOrder?: DeleteOrderController;
  }
}
