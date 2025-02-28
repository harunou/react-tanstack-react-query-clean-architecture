import { useStore } from "zustand";
import { ordersPresentationStore, type OrdersPresentationStore } from "../ordersPresentationStore";

export const useOrdersPresentationStore = <R>(selector: (state: OrdersPresentationStore) => R) =>
  useStore(ordersPresentationStore, selector);
