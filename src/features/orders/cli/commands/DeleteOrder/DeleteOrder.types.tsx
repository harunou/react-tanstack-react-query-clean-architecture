export type ViewModel = string | Error;
export type DeleteOrderController = (id: unknown) => Promise<ViewModel>;

declare global {
  interface Window {
    deleteOrder?: (id: unknown) => Promise<void>;
  }
}
