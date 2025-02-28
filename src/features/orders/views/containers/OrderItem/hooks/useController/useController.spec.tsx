import { useController } from "./useController";
import { afterEach, beforeEach, describe, expect, it, type Mocked, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import type { PropsWithChildren, FC } from "react";
import { stubUseOrdersGateway } from "../../../../../utils/testing";
import { makeComponentFixture } from "../../../../../utils/testing/makeComponentFixture";
import type { ItemEntityId, OrderEntityId, OrdersGateway } from "../../../../../types";

interface LocalTestContext {
  Fixture: FC<PropsWithChildren<unknown>>;
  gateway: Mocked<OrdersGateway>;
  orderId: OrderEntityId;
  itemId: ItemEntityId;
}

describe(`${useController.name}`, () => {
  beforeEach<LocalTestContext>((context) => {
    vi.useFakeTimers();

    const { Fixture } = makeComponentFixture();
    context.Fixture = Fixture;
    context.gateway = stubUseOrdersGateway();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it<LocalTestContext>("triggers order item deletion on the gateway", async (context) => {
    context.gateway.deleteItem.mockResolvedValue();
    const { result } = renderHook(
      () => useController({ itemId: context.itemId, orderId: context.orderId }),
      {
        wrapper: context.Fixture,
      },
    );

    result.current.deleteOrderItemButtonClicked();
    await vi.runAllTimersAsync();

    expect(context.gateway.deleteItem).toHaveBeenCalledTimes(1);
  });
});
