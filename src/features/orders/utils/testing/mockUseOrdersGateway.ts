import { type Mocked, vi } from "vitest";
import * as makeOrdersGatewayModule from "../../repositories/ordersRepository/OrdersGateway/makeOrdersGateway";
import type { OrdersGateway } from "../../repositories/ordersRepository/OrdersGateway/OrdersGateway.types";

export type MockedOrdersGateway = Mocked<OrdersGateway>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const noMockDefined = (..._args: any[]) => {
  throw new Error("Mock: method has no mock defined");
};

export const mockMakeOrdersGateway = (): MockedOrdersGateway => {
  const mock: MockedOrdersGateway = {
    getOrders: vi.fn(noMockDefined),
    deleteOrder: vi.fn(noMockDefined),
    deleteItem: vi.fn(noMockDefined),
  };

  vi.spyOn(makeOrdersGatewayModule, "makeOrdersGateway").mockReturnValue(mock);

  return mock;
};
