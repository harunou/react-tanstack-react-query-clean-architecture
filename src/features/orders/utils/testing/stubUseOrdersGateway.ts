import { type Mocked, vi } from "vitest";
import type { OrdersGateway } from "../../types";
import * as useOrdersGatewayModule from "../../gateways/OrdersGateway/hooks/useOrdersGateway";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const noMockDefined = (..._args: any[]) => {
  throw new Error("Mock: method has no mock defined");
};

export const stubUseOrdersGateway = (): Mocked<OrdersGateway> => {
  const mock: Mocked<OrdersGateway> = {
    getOrders: vi.fn(noMockDefined),
    deleteOrder: vi.fn(noMockDefined),
    deleteItem: vi.fn(noMockDefined),
  };

  vi.spyOn(useOrdersGatewayModule, "useOrdersGateway").mockReturnValue(mock);

  return mock;
};
