import { type Mocked, vi } from "vitest";
import * as makeOrdersServiceModule from "../../repositories/OrdersRepository/OrdersService/makeOrdersService";
import type { OrdersService } from "../../repositories/OrdersRepository/OrdersService/OrdersService.types";

export type MockedOrdersService = Mocked<OrdersService>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const noMockDefined = (..._args: any[]) => {
  throw new Error("Mock: method has no mock defined");
};

export const stubMakeOrdersService = (): MockedOrdersService => {
  const mock: Mocked<OrdersService> = {
    getOrders: vi.fn(noMockDefined),
    deleteOrder: vi.fn(noMockDefined),
    deleteItem: vi.fn(noMockDefined),
  };

  vi.spyOn(makeOrdersServiceModule, "makeOrdersService").mockReturnValue(mock);

  return mock;
};
