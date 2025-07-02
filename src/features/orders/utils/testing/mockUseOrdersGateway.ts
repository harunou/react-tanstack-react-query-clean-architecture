import { type Mocked, vi } from "vitest";
import * as useOrdersGatewayModule from "../../repositories/ordersRepository/hooks/useOrdersGateway";
import type { OrdersGateway } from "../../repositories/ordersRepository/OrdersGateway/OrdersGateway.types";

export type MockedOrdersGateway = Mocked<OrdersGateway>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const noMockDefined = (..._args: any[]) => {
  throw new Error("Mock: method has no mock defined");
};

export const mockUseOrdersGateway = (): MockedOrdersGateway => {
  const mock: MockedOrdersGateway = {
    getOrders: vi.fn(noMockDefined),
    deleteOrder: vi.fn(noMockDefined),
    deleteItem: vi.fn(noMockDefined),
  };

  vi.spyOn(useOrdersGatewayModule, "useOrdersGateway").mockReturnValue(mock);

  return mock;
};
